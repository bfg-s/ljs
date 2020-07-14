<?php

namespace Lar\LJS;

use Illuminate\Contracts\Support\Htmlable;
use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

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
     * @var int
     */
    protected $status = 200;

    /**
     * @param  Request  $request
     */
    public function index(Request $request)
    {
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

            return response(['Invalid call event parameters.'], 406);
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
            
            return response(['Invalid call object.'], 403);
        }

        $executor->setParent($this);

        $method = $event[1];

        if (!$method || !is_string($method)) {

            return response(['The specified method is not acceptable.'], 405);
        }

        return response(
            respond()->justMerge(
                $this->call($executor, $method, $params, $executor_class_name)
            ),
            $this->status
        );
    }

    /**
     * @param  JaxExecutor  $executor
     * @param  string  $method
     * @param  array  $arguments
     * @param  string  $executor_class_name
     * @return array|Collection|string|mixed
     * @throws \ReflectionException
     */
    protected function call(JaxExecutor $executor, string $method, array $arguments, string $executor_class_name)
    {
        if (!custom_closure_call([$executor, 'access'])) {

            if (method_exists($executor, 'default')) {

                try {
                    return $executor->default($arguments);
                } catch (\Throwable $throwable) {
                    return method_exists($executor, "failed") ? $executor->failed($throwable) : $this->failed($throwable);
                }
            }

            $this->status(403);

            return ['Access is denied!'];
        }

        if (method_exists($executor, "{$method}_access") && !$executor->{"{$method}_access"}()) {

            if (method_exists($executor, "{$method}_default")) {

                try {
                    return $executor->{"{$method}_default"}($arguments);
                } catch (\Throwable $throwable) {
                    return method_exists($executor, "failed") ? $executor->failed($throwable) : $this->failed($throwable);
                }
            }

            $this->status(405);

            return ['Method not allowed.'];
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

            $result = custom_closure_call([$executor, $method], $arguments, [], function (\Throwable $throwable) use ($executor) {
                return method_exists($executor, "failed") ? $executor->failed($throwable) : $this->failed($throwable);
            });

        } else if ($executor->simple_call) {

            try {
                $result = $executor->{$method}($arguments);
            } catch (\Throwable $throwable) {
                $result = method_exists($executor, "failed") ? $executor->failed($throwable) : $this->failed($throwable);
            }
        }

        if ($result instanceof Htmlable) {

            $result = $result->toHtml();

        } else if ($result instanceof Renderable) {

            $result = $result->render();
        }

        return collect($result);
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

        $executor_camel = ucfirst(\Str::camel($executor));

        if (class_exists("App\\JaxExecutors\\{$executor_camel}")) {

            return "App\\JaxExecutors\\{$executor_camel}";
        }

        else if (class_exists("App\\Http\\JaxExecutors\\{$executor_camel}")) {

            return "App\\Http\\JaxExecutors\\{$executor_camel}";

        } else if (class_exists($executor)) {

            return $executor;
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