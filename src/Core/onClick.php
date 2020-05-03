<?php

namespace Lar\LJS\Core;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Support\Collection;
use Lar\Layout\Abstracts\Component;
use Lar\LJS\Components\ajaxForm;

class onClick extends Collection implements Renderable
{
    /**
     * @var Component
     */
    protected $tag;

    /**
     * Form Submit event
     *
     * @param $selector
     * @return $this
     * @throws \Exception
     */
    public function submit($selector)
    {
        if ($selector instanceof Component) {

            $selector = $selector->haveAndGetSelectorID();
        }

        $this->push("document.querySelector('{$selector}').submit()");

        return $this;
    }

    /**
     * Ajax Form Submit event
     *
     * @param $selector
     * @return $this
     * @throws \Exception
     */
    public function ajaxSubmit($selector)
    {
        $id = $this->tag->haveAndGetSelectorID();

        $options = [];

        $this->tag->js()->on("click", $id, "\$js.\$jax.form('{$selector}'," . json_encode($options) . ")");

        return $this;
    }

    /**
     * Reload page
     *
     * @return $this
     */
    public function reload()
    {
        $this->push("location.reload()");

        return $this;
    }

    /**
     * Make click command
     *
     * @param $call
     * @param array $call_methods
     * @throws \Exception
     */
    public function command(string $call, $call_methods = [])
    {
        $cache_data = [$call => $call_methods];

        $this->tag->js()
            ->declare($this->tag->getUnique(), "commands", ssl_encrypt(\Opis\Closure\serialize($cache_data)));

        $this->push("\$js.\$jax.execute('" . $this->tag->getUnique() . "')");
    }

    /**
     * Make inserter
     *
     * @param $data
     * @param $to
     * @return $this
     */
    public function insert($data, $to)
    {
        if ($data instanceof Renderable) {

            $data = $data->render();
        }

        $this->tag->js()
            ->declare($this->tag->getUnique(), "insert_data", $data);

        $to = str_replace(["\"", "'"], "", $to);

        $this->put("insert_data", "\$js.insert_data('" . $this->tag->getUnique() . "','{$to}')");

        return $this;
    }

    /**
     * Get the evaluated contents of the object.
     *
     * @return string
     */
    public function render()
    {
        return $this->map(function ($item) {

            if (!preg_match('/.*\;\s*$/', $item)) {

                $item .= ";";
            }

            return $item;

        })->implode("");
    }

    /**
     * @param $tag
     * @return $this
     * @deprecated don't use
     */
    public function setTag($tag)
    {
        $this->tag = $tag;

        return $this;
    }
}
