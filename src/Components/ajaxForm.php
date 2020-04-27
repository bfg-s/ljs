<?php

namespace Lar\LJS\Components;

use Lar\Layout\Tags\FORM;

class ajaxForm extends FORM
{
    /**
     * Identify variable name
     */
    const ID_NAME = "_ajax";

    /**
     * Plugin potions
     *
     * @link https://jquery-form.github.io/form/options/
     * @var array
     */
    protected $options = [

    ];

    /**
     * Execute list
     *
     * @var array
     */
    public $execute = [
        "js_config"
    ];

    /**
     * JS Executor
     * @throws \Exception
     */
    public function js_config()
    {
        $this->lj("submit")->form_submit($this);

        //$id = $this->haveAndGetSelectorID();

        //$this->options["data"] = [static::ID_NAME => ssl_encrypt($id)];

        //$this->js()->on("submit", $id, "e.preventDefault();\$js.\$jax.form(this," . json_encode($this->options) . ")");
    }
}