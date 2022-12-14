<?php

namespace Lar\LJS;

use Illuminate\Support\Facades\Facade as FacadeIlluminate;

/**
 * Class Facade.
 *
 * @package Lar
 */
class Facade extends FacadeIlluminate
{
    /**
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return LJS::class;
    }
}
