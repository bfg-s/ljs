<?php

namespace Lar\LJS\Core;

use Composer\Json\JsonFormatter;
use Illuminate\Console\Command;
use Lar\Developer\Commands\Dump\DumpExecute;

/**
 * Class JsRouteGenerator
 * @package Lar\LJS\Core
 */
class JsRouteGenerator implements DumpExecute
{

    /**
     * @param  Command  $command
     * @return mixed|void
     */
    public function handle(Command $command)
    {
        $routes_list = [];
        $host = parse_url(config('app.url'))['host'];

        /** @var \Illuminate\Routing\Route $route */
        foreach (\Route::getRoutes()->getRoutes() as $route) {
            if (isset($route->action['as'])) {
                $domain = $route->getDomain();
                $routes_list[$domain ? $domain : $host][$route->getName()] = [
                    'uri' => $route->uri,
                    'methods' => $route->methods
                ];
            }
        }

        file_put_contents($this->rp('route.json'), JsonFormatter::format(json_encode($routes_list), false, true));
    }

    /**
     * @param  string  $path
     * @return string
     */
    protected function rp(string $path = "")
    {
        return "/". trim(resource_path(config('layout.resource_js_path', 'js') . '/' . trim($path, '/')), '/');
    }
}