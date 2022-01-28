<?php

if (!function_exists('ljs_asset')) {
    function ljs_asset($uri)
    {
        if (!empty($uri)) {
            $uri = '/'.trim($uri, '/');
        }

        return asset('ljs'.$uri);
    }
}
