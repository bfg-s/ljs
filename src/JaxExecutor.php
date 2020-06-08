<?php

namespace Lar\LJS;

use Illuminate\Support\Collection;

/**
 * Class AjaxExecutor
 *
 * @package Lar\Layout
 * @mixin \Lar\Layout\RespondDoc
 */
abstract class JaxExecutor
{
    /**
     * @var bool
     */
    static $name = false;

    /**
     * @var bool
     */
    public $simple_call = false;

    /**
     * @var JaxController
     */
    private $controller;

    /**
     * JaxExecutor constructor.
     * @param  JaxController  $controller
     */
    public function __construct(JaxController $controller)
    {
        $this->controller = $controller;
    }

    /**
     * Public method access
     *
     * @return bool
     */
    public function access() {

        return true;
    }

    /**
     * Magic method if not exists
     *
     * @return mixed|void
     */
    //public function call() {}

    /**
     * Method on throw exception in execute
     *
     * @param  \Throwable  $throwable
     * @return mixed|void
     */
    //public function failed(\Throwable $throwable) {}

    /**
     * Put rule
     *
     * @param $key
     * @param mixed $value
     * @return $this
     */
    public function put($key, $value = null)
    {
        respond()->put($key, $value);

        return $this;
    }

    /**
     * Put rule alias
     *
     * @param $key
     * @param null $value
     * @return $this
     */
    public function insert($key, $value = null)
    {
        respond()->insert($key, $value);

        return $this;
    }

    /**
     * @param $name
     * @param $arguments
     * @return mixed
     */
    public function __call($name, $arguments)
    {
        return respond()->{$name}(...$arguments);
    }

    /**
     * @param  int  $status
     * @return $this
     */
    public function status(int $status)
    {
        $this->controller->status($status);

        return $this;
    }

    /**
     * @param  \Throwable  $throwable
     * @return string|\Throwable
     */
    public function controllerFailed(\Throwable $throwable)
    {
        return $this->controller->failed($throwable);
    }

    /**
     * @param  string  $class
     * @param  string|null  $name
     */
    public static function register(string $class = null, string $name = null)
    {
        if (!$class) {
            $class = static::class;
        }

        /** @var JaxExecutor $class */
        if (!$name) {
            $name = $class::$name;
        }

        if ($name) {

            JaxController::$list[$name] = $class;
        }
    }
}
