<?php

namespace Lar\LJS;

use Illuminate\Contracts\Support\Renderable;
use Lar\Layout\Respond;

/**
 * Class LJS
 *
 * @package Lar\LJS
 */
class LJS implements Renderable
{
    /**
     * JS Global variables
     *
     * @var array
     */
    static $_global_vars = [
        "global" => [

        ]
    ];

    /**
     * @var array
     */
    static $_global_vars_hash = [];

    /**
     * @var array
     */
    static $_lines = [];

    /**
     * @var array
     */
    static $_rows = [];

    /**
     * @var array
     */
    static $_lines_hash = [];

    /**
     * JS events
     *
     * @var array
     */
    static $_events = [];

    /**
     * @var array
     */
    static $_hash = [];

    /**
     * @var Respond[]|array
     */
    static $respond = [];

    /**
     * @var string
     */
    protected $tmp_group = "global";

    /**
     * Execute mode
     *
     * @var bool
     */
    protected $execute = false;

    /**
     * LJS constructor.
     *
     * @param string|null $group
     */
    public function __construct(string $group = null)
    {
       if ($group) {

           $this->tmp_group = $group;
       }
    }

    /**
     * Create event on load ljs
     *
     * @param $data
     * @return $this
     */
    public function onLjsLoad($data)
    {
        if ($data instanceof \Closure) {

            $ns = new static($this->tmp_group . ":ljs:load");

            $data($ns);

            $data = $ns->render();

            $ns->clear();
        }

        $this->row("document.addEventListener(\"ljs:load\",function(e){" . $data . "});");

        return $this;
    }

    /**
     * Insert row
     *
     * @param $data
     * @return $this
     */
    public function row(string $data)
    {
        static::$_rows[] = $data;

        return $this;
    }

    /**
     * Create event
     *
     * @param $event
     * @param $selector
     * @param $data
     * @return LJS
     */
    public function on($event, $selector, $data)
    {
        if (!isset(static::$_events[$this->tmp_group])) {

            static::$_events[$this->tmp_group] = [];
        }

        $var = "\$js.q(\"{$selector}\").on(\"{$event}\",function(e){";

        if ($data instanceof \Closure) {

            $ns = new static($this->tmp_group . ":" . $event);

            $data($ns);

            $data = $ns->render();
        }

        if (!preg_match('/.*\;$/', $data)) {

            $data .= ";";
        }

        if (isset(static::$_events[$this->tmp_group][$var])) {

            if (static::$_events[$this->tmp_group][$var] != $data) {

                static::$_events[$this->tmp_group][$var] .= $data;
            }

        } else {

            static::$_events[$this->tmp_group][$var] = $data;
        }

        return $this;
    }

    /**
     * Add variable in to list
     *
     * @param $static
     * @param $name
     * @param null $value
     * @return LJS
     */
    public function var($name, $value=null)
    {
        if (!isset(static::$_global_vars[$this->tmp_group])) {

            static::$_global_vars[$this->tmp_group] = [];
        }

        if (is_array($name)) {

            foreach ($name as $key => $item) {

                $this->var($key, $item);
            }

        } else if (is_string($name)) {

            if (preg_match('/^\.([a-zA-Z0-9\_\.\@]*)$/', $name, $m)) {

                $k = $m[1];

                if (!isset(static::$_global_vars[$this->tmp_group][$k])) {

                    static::$_global_vars[$this->tmp_group][$k] = $value;

                } else {

                    if (is_array($value) && is_array(static::$_global_vars[$this->tmp_group][$k])) {

                        static::$_global_vars[$this->tmp_group][$k] = array_merge(static::$_global_vars[$this->tmp_group][$k], $value);

                    } else if (is_array(static::$_global_vars[$this->tmp_group][$k])) {

                        static::$_global_vars[$this->tmp_group][$k][] = $value;

                    } else {

                        static::$_global_vars[$this->tmp_group][$k] .= $value;
                    }
                }

            } else if (preg_match('/^([a-zA-Z0-9\_\.\@]*)$/', $name)) {

                static::$_global_vars[$this->tmp_group][$name] = $value;
            }
        }

        return $this;
    }

    /**
     * Set group
     *
     * @param string $static
     * @return $this
     */
    public function group(string $static)
    {
        $this->tmp_group = $static;

        return $this;
    }

    /**
     * Add line JS core
     *
     * @param string $data
     * @param null $key
     * @return $this
     */
    public function line($data = "", string $key = null)
    {
        if (preg_match('/^\!\s(.*)/', $data, $m)) {

            if (request()->ajax()) {

                return $this;

            } else {

                $data = $m[1];
            }
        }

        if (!preg_match('/.*\;$/', $data)) {

            $data .= ";";
        }

        if (!isset(static::$_lines[$this->tmp_group])) {

            static::$_lines[$this->tmp_group] = [];
        }

        if (!is_null($key)) {

            if (!isset(static::$_lines[$this->tmp_group][$key])) {

                static::$_lines[$this->tmp_group][$key] = $data;

            } else {

                static::$_lines[$this->tmp_group][$key] .= $data;
            }

        } else {

            static::$_lines[$this->tmp_group][] = $data;
        }

        return $this;
    }

    /**
     * @param string $key
     * @return bool
     */
    public function removeLine(string $key)
    {
        if (isset(static::$_lines[$this->tmp_group][$key])) {

            unset(static::$_lines[$this->tmp_group][$key]);

            return true;
        }

        return false;
    }

    /**
     * Create exec
     *
     * @param array|string $data
     * @param null $params
     * @return LJS
     */
    public function exec($data, $params = null)
    {
        if (is_string($data)) {

            $data = [$data => $params];
        }

        $this->line("ljs.exec(" . json_encode($data) . ")");

        return $this;
    }

    /**
     * @return \Lar\Layout\Respond
     */
    public function respond()
    {
        $respond = new Respond();

        static::$respond[] = $respond;

        return $respond;
    }

    /**
     * Created declare
     *
     * @param $tag
     * @param $name
     * @param $data
     * @return LJS
     */
    public function declare($tag, $name, $data)
    {
        $data = $this->paramEntity($data);

        $this->line("\$js.declare(\"{$tag}\", \"{$name}\", {$data})");

        return $this;
    }

    /**
     * Render variables
     *
     * @return string
     */
    public function renderVariables()
    {
        $data = "";

        foreach (static::$_global_vars as $class => $variables) {

            if (request()->ajax() && $class == "global") {

                continue;
            }

            if (\App::isLocal() && count($variables)) {

                $data .= "\n/**\n * Variables {$class}\n */\n";
            }

            foreach ($variables as $key => $variable) {

                if (strpos($key, "@") === false) {

                    $key = "var " . $key;

                } else {

                    $key = str_replace("@", "window.", $key);
                }

                if (is_array($variable)) {

                    $variable = json_encode($variable);
                }

                if (preg_match('/^\@(.*)/', $variable, $m)) {

                    $variable = $m[1];

                } else {

                    $variable = $this->paramEntity($variable);
                }

                if (!preg_match('/.*\;$/', $variable)) {

                    $variable .= ";";
                }

                $data .= "{$key}={$variable}";
            }
        }


        return $data;
    }

    /**
     * @param $variable
     * @return false|string
     */
    public function paramEntity($variable)
    {
        if (is_null($variable)) {

            $variable = "null";
        }

        if ($variable === true) {

            $variable = "true";
        }

        if ($variable === false) {

            $variable = "false";
        }

        if (is_array($variable)) {

            $variable = json_encode($variable);
        }

        if (
            !preg_match('/^\{.*\}$/', $variable) &&
            !preg_match('/^\[.*\]$/', $variable)  &&
            !preg_match('/^\".*\"$/', $variable)  &&
            !preg_match('/^\\\'.*\\\'$/', $variable) &&
            strtolower($variable) !== "true" &&
            strtolower($variable) !== "false" &&
            !is_numeric($variable) &&
            strtolower($variable) != "null"
        ) {

            $variable = "\"{$variable}\"";
        }

        return $variable;
    }

    /**
     * Render Events
     *
     * @return string
     */
    public function renderEvents()
    {
        $data = "";

        foreach (static::$_events as $class => $events) {

            $data_n = "";

            if (\App::isLocal()) {

                $data_n .= "\n/**\n * Events {$class}\n */\n";
            }

            if (request()->ajax() || $this->execute) {

                $data_n .= "\$(function (e) {";
            }

            else {

                $data_n .= "document.addEventListener(\"ljs:load\", function (e) {";
            }

            $empty = true;

            foreach ($events as $key => $event) {

                $data_n .= $key.$event."});";

                $empty = false;
            }

            $data_n .= "});";

            if (!$empty) {

                $data .= $data_n;
            }
        }


        return $data;
    }

    /**
     * Render lines
     *
     * @return string
     */
    public function renderLines()
    {
        foreach (static::$respond as $item) {

            static::$_lines['\Lar\Layout\Respond'][] = "ljs.exec(" . $item->toJson() . ");";
        }

        $data = "";

        foreach (static::$_lines as $class => $lines) {

            if (\App::isLocal()) {

                $data .= "\n/**\n * Lines {$class}\n */\n";
            }

            if (request()->ajax()) {

                $data .= "\$(function (e) {";
            }

            else {

                $data .= "document.addEventListener(\"ljs:load\", function (e) {";
            }

            foreach ($lines as $line) {

                $data .= $line;
            }

            $data .= "});";
        }

        foreach (static::$_rows as $row) {

            $data .= $row;
        }


        return $data;
    }

    /**
     * Get the evaluated contents of the object.
     *
     * @return string
     */
    public function render()
    {
        $return = $this->renderVariables() . $this->renderLines() . $this->renderEvents();

        if (request()->ajax()) {

            $this->clear();
        }

        return $return;
    }

    /**
     * Clear global instance
     *
     * @return $this
     */
    public function clear()
    {
        static::$_global_vars = ["global" => []];
        static::$_global_vars_hash = [];
        static::$_rows = [];
        static::$_lines = [];
        static::$_lines_hash = [];
        static::$_events = [];
        static::$_hash = [];

        return $this;
    }
}
