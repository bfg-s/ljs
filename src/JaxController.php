<?php

namespace Lar\LJS;

use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection;
use Lar\Layout\Core\LConfigs;
use Symfony\Component\HttpFoundation\Response;

/**
 * Class JaxController
 * @package Lar\LJS
 */
class JaxController
{
    /**
     * @var array
     */
    static $list = [];

    /**
     * @var array
     */
    static $namespaces = [
        'app/Jax' => 'App\\Jax'
    ];

    /**
     * @var int
     */
    protected $status = 200;

    /**
     * @var \Closure[]
     */
    static protected $on_start = [];

    /**
     * @param  \Closure  $closure
     */
    public static function on_start(\Closure $closure)
    {
        static::$on_start[] = $closure;
    }

    /**
     * @param  Request  $request
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\JsonResponse|JsonResource|\Illuminate\Http\Response|Collection|string[]|Response|\Throwable
     * @throws \ReflectionException
     */
    public function index(Request $request)
    {
        foreach (static::$on_start as $item) {

            $item($this);
        }

        $param = md5(md5(config('app.url')));

        if (!$request->ajax() || !$request->has($param)) {
            
            return response(['The request is not Ajax or there is no data or event as current.'], 406);
        }

        $exec = $request->get($param);

        if (!is_array($exec)) {

            return response(['Invalid expected call event.'], 406);
        }

        $keys = array_keys($exec);

        if (!isset($keys[0]) || !is_array($exec)) {

            return response(['The expected call event was not found.'], 404);
        }

        $event = array_keys($exec)[0];

        $params = json_decode($exec[$event], 1);

        if ($params === null) {

            $params = $exec[$event];
        }

        if (!is_array($params)) {

            $params = [$params];
        }

        $event = \Str::parseCallback($event, '__invoke');

        if (!isset($event[0]) || !isset($event[1]) || count($event) !== 2) {

            return response(['Invalid call event.'], 406);
        }

        $executor = $this->find_executor($event[0]);

        if (!$executor) {

            return response(['Call object not found.'], 404);
        }

        $executor_class_name = $executor;

        $executor = new $executor_class_name();

        if (!($executor instanceof JaxExecutor)) {
            
            return response(['Object don\'t hav a parent JaxExecutor.'], 403);
        }

        $executor->setParent($this);

        $method = $event[1];

        if (!$method || !is_string($method)) {

            return response(['The specified method is not acceptable.'], 405);
        }

        LConfigs::makeDefaults();

        $result = $this->call($executor, $method, $params, $executor_class_name);

        if ($result instanceof JsonResource) {

            return $result->additional(['exec' => respond()->toArray()]);

        }  else if ($result instanceof Response) {

            foreach (LConfigs::$list as $key => $values) {

                $result->headers->set($key, $values);
            }

            return $result;
        }

        return response()->json(
            $result,
            $this->status
        )->withHeaders(LConfigs::$list);
    }

    /**
     * @param  JaxExecutor  $executor
     * @param  string  $method
     * @param  array  $arguments
     * @param  string  $executor_class_name
     * @return JsonResource|Collection|mixed|string|string[]|Response|\Throwable
     */
    protected function call(JaxExecutor $executor, string $method, array $arguments, string $executor_class_name)
    {
        if (method_exists($executor, "{$method}_access") && !ccc([$executor, "{$method}_access"], $arguments)) {

            if (method_exists($executor, "{$method}_default")) {

                try {
                    return ccc([$executor, "{$method}_default"], $arguments); //$executor->{"{$method}_default"}($arguments);
                } catch (\Throwable $throwable) {
                    return method_exists($executor, "failed") ? $executor->failed($throwable) : $this->failed($throwable);
                }
            }

            $this->status(405);

            return ['Method not allowed.'];
        }

        else if (
            method_exists($executor, 'access') &&
            !ccc([$executor, 'access'])
        ) {

            if (method_exists($executor, 'default')) {

                try {
                    return ccc([$executor, 'default'], $arguments); //$executor->default($arguments);
                } catch (\Throwable $throwable) {
                    return method_exists($executor, "failed") ? $executor->failed($throwable) : $this->failed($throwable);
                }
            }

            $this->status(403);

            return ['Access is denied!'];
        }

        if (!method_exists($executor, $method)) {

            if (method_exists($executor, 'call')) {

                try {
                    $result = $executor->call($method, $arguments);
                } catch (\Throwable $throwable) {
                    $result = method_exists($executor, "failed") ? $executor->failed($throwable) : $this->failed($throwable);
                }

            } else {

                $this->status(404);

                return ['Method not found.'];
            }

        } else if (!$executor->simple_call) {

            $result = ccc([$executor, $method], $arguments, function (\Throwable $throwable) use ($executor) {
                return method_exists($executor, "failed") ? $executor->failed($throwable) : $this->failed($throwable);
            });

        } else if ($executor->simple_call) {

            try {
                $result = $executor->{$method}($arguments);
            } catch (\Throwable $throwable) {
                $result = method_exists($executor, "failed") ? $executor->failed($throwable) : $this->failed($throwable);
            }
        }

        if (
            $result instanceof JsonResource ||
            $result instanceof Response
        ) {

            return $result;

        }

        if ($result instanceof Htmlable) {

            $result = $result->toHtml();

        } else if ($result instanceof Renderable) {

            $result = $result->render();
        }

        $exec = respond()->toArray();

        $return = collect($result);

        if (count($exec)) {

            $return = $return->merge(['$exec' => $exec]);
        }

        return $return;
    }

    /**
     * @param  string  $executor
     * @return string|bool
     */
    protected function find_executor(string $executor)
    {
        if (isset(static::$list[$executor])) {

            return static::$list[$executor];
        }

        $name = implode(
            '\\',
            array_map(
                'ucfirst',
                array_map(
                    'Str::camel',
                    explode(
                        '.', $executor
                    )
                )
            )
        );

        foreach (static::$namespaces as $namespace) {

            if (class_exists("{$namespace}\\{$name}")) {

                return "{$namespace}\\{$name}";
            }
        }

        if (class_exists($name)) {

            return $name;
        }

        return false;
    }

    /**
     * @param  int  $status
     * @return $this
     */
    public function status(int $status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * @param  \Throwable  $throwable
     * @return string|\Throwable
     */
    public function failed(\Throwable $throwable)
    {
        $this->status(500);

        if (config('app.debug')) {

            return $throwable;
        }

        return "Internal server error";
    }
}