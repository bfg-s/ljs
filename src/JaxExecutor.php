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
     * @param  JaxController  $controller
     */
    public function setParent(JaxController $controller)
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
    public function httpStatus(int $status)
    {
        if ($this->controller) {
            $this->controller->status($status);
        }

        return $this;
    }

    /**
     * Close Request
     * @return null
     */
    public function stop()
    {
        $this->httpStatus(499);

        return null;
    }

    /**
     * @param  \Throwable  $throwable
     * @return string|\Throwable
     */
    public function controllerFailed(\Throwable $throwable)
    {
        if ($this->controller) {
            return $this->controller->failed($throwable);
        }

        return null;
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

    /**
     * @param $collection
     */
    public static function registerCollection($collection)
    {
        if (is_array($collection) || $collection instanceof Collection) {

            JaxController::$list = array_merge(JaxController::$list, $collection);
        }
    }

    /**
     * @param  array  $subject
     * @param  array  $rules
     * @param  array  $messages
     * @return array|bool
     */
    public function validate(array $subject, array $rules, array $messages = [])
    {
        if ($result = quick_validate($subject, $rules, $messages)) {

            foreach ($result->errors()->messages() as $key => $message) {

                foreach ($message as $item) {

                    $this->toast_error($item);
                }
            }

            return false;
        }
        
        return $subject;
    }
}
