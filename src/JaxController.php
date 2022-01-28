<?php

namespace Lar\LJS;

use Closure;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Collection;
use Lar\Layout\Core\LConfigs;
use ReflectionException;
use Str;
use Symfony\Component\HttpFoundation\Response;
use Throwable;

/**
 * Class JaxController.
 * @package Lar\LJS
 */
class JaxController
{
    /**
     * @var array
     */
    public static $list = [];

    /**
     * @var array
     */
    public static $namespaces = [
        'app/Jax' => 'App\\Jax',
    ];
    /**
     * @var Closure[]
     */
    protected static $on_start = [];
    /**
     * @var Closure[]
     */
    protected static $on_mounted = [];
    /**
     * @var Closure[]
     */
    protected static $on_finish = [];
    /**
     * @var int
     */
    protected $status = 200;

    /**
     * @param  Closure  $closure
     */
    public static function on_start(Closure $closure)
    {
        static::$on_start[] = $closure;
    }

    /**
     * @param  Closure  $closure
     */
    public static function on_mounted(Closure $closure)
    {
        static::$on_mounted[] = $closure;
    }

    /**
     * @param  Closure  $closure
     */
    public static function on_finish(Closure $closure)
    {
        static::$on_finish[] = $closure;
    }

    /**
     * @param  Request  $request
     * @return Application|ResponseFactory|JsonResponse|JsonResource|\Illuminate\Http\Response|Collection|string[]|Response|Throwable
     * @throws ReflectionException
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

        $event = Str::parseCallback($event, '__invoke');

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

        foreach (static::$on_mounted as $item) {
            $item($executor, $method, $params, $executor_class_name, $this);
        }

        $result = $this->call($executor, $method, $params, $executor_class_name);

        foreach (static::$on_finish as $item) {
            $item($result, $executor, $method, $params, $executor_class_name, $this);
        }

        if ($result instanceof JsonResource) {
            return $result->additional(['exec' => respond()->toArray()]);
        } elseif ($result instanceof Response) {
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
     * @param  JaxExecutor  $executor
     * @param  string  $method
     * @param  array  $arguments
     * @param  string  $executor_class_name
     * @return JsonResource|Collection|mixed|string|string[]|Response|Throwable
     */
    protected function call(JaxExecutor $executor, string $method, array $arguments, string $executor_class_name)
    {
        if (method_exists($executor, "{$method}_access") && !embedded_call([$executor, "{$method}_access"],
                $arguments)) {
            if (method_exists($executor, "{$method}_default")) {
                try {
                    return embedded_call([$executor, "{$method}_default"],
                        $arguments); //$executor->{"{$method}_default"}($arguments);
                } catch (Throwable $throwable) {
                    return method_exists($executor,
                        'failed') ? $executor->failed($throwable) : $this->failed($throwable);
                }
            }

            $this->status(405);

            return ['Method not allowed.'];
        } elseif (
            method_exists($executor, 'access') &&
            !embedded_call([$executor, 'access'])
        ) {
            if (method_exists($executor, 'default')) {
                try {
                    return embedded_call([$executor, 'default'], $arguments);
                } catch (Throwable $throwable) {
                    return method_exists($executor,
                        'failed') ? $executor->failed($throwable) : $this->failed($throwable);
                }
            }

            $this->status(403);

            return ['Access is denied!'];
        }

        if (!method_exists($executor, $method)) {
            if (method_exists($executor, 'call')) {
                try {
                    $result = $executor->call($method, $arguments);
                } catch (Throwable $throwable) {
                    $result = method_exists($executor,
                        'failed') ? $executor->failed($throwable) : $this->failed($throwable);
                }
            } else {
                $this->status(404);

                return ['Method not found.'];
            }
        } elseif (!$executor->simple_call) {
            $result = embedded_call([$executor, $method], $arguments, function (Throwable $throwable) use ($executor) {
                return method_exists($executor, 'failed') ? $executor->failed($throwable) : $this->failed($throwable);
            });
        } elseif ($executor->simple_call) {
            try {
                $result = $executor->{$method}($arguments);
            } catch (Throwable $throwable) {
                $result = method_exists($executor,
                    'failed') ? $executor->failed($throwable) : $this->failed($throwable);
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
        } elseif ($result instanceof Renderable) {
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
     * @param  Throwable  $throwable
     * @return string|Throwable
     */
    public function failed(Throwable $throwable)
    {
        $this->status(500);

        if (config('app.debug')) {
            return $throwable;
        }

        return 'Internal server error';
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
}
