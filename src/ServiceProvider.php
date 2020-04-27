<?php

namespace Lar\LJS;

use Illuminate\Support\ServiceProvider as ServiceProviderIlluminate;
use Lar\LJS\Components\ajaxForm;
use Lar\Tagable\Tag;

/**
 * Class ServiceProvider
 *
 * @package Lar\Layout
 */
class ServiceProvider extends ServiceProviderIlluminate
{
    /**
     * @var array
     */
    protected $commands = [

    ];

    /**
     * The application's route middleware.
     *
     * @var array
     */
    protected $routeMiddleware = [

    ];

    /**
     * @var array
     */
    protected $completion_logic = [

    ];

    /**
     * Bootstrap services.
     *
     * @return void
     * @throws \Exception
     */
    public function boot()
    {
        if (app()->runningInConsole() && is_link(base_path('ljs'))) {

            if (!is_dir(public_path("ljs")) && !is_link(public_path("ljs"))) {

                app()->make('files')->link(
                    __DIR__ . "/../assets", public_path('ljs')
                );
            }
        }

        $this->publishes([__DIR__.'/../assets' => public_path('ljs')], 'ljs-assets');

        //Tag::registerComponent("ajax_form", ajaxForm::class);
    }

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->registerRouteMiddleware();
        $this->commands($this->commands);
    }

    /**
     * Register the route middleware.
     *
     * @return void
     */
    protected function registerRouteMiddleware()
    {
        // register route middleware.
        foreach ($this->routeMiddleware as $key => $middleware) {

            app('router')->aliasMiddleware($key, $middleware);
        }
    }
}

