<?php

namespace Lar\LJS\Traits;

use Lar\LJS\LJS;

/**
 * Trait JSable
 *
 * @package Lar\LJS\Traits
 */
trait JSable
{
    /**
     * @var LJS
     */
    static $store;

    /**
     * JS Core
     *
     * @return LJS
     */
    public function js()
    {
        if (!JSable::$store) {

            JSable::$store = new LJS();
        }

        JSable::$store->group(static::class);

        return JSable::$store;
    }
}
