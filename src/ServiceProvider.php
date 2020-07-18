<?php

namespace Lar\LJS;

use Illuminate\Support\ServiceProvider as ServiceProviderIlluminate;
use Lar\Developer\Commands\DumpAutoload;
use Lar\Layout\Core\LConfigs;
use Lar\LJS\Commands\MakeJaxExecutor;
use Lar\LJS\Core\JsLangGenerator;
use Lar\LJS\Core\JsRouteGenerator;
use Lar\LJS\Middleware\ExecutorMiddleware;

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
        MakeJaxExecutor::class
    ];

    /**
     * The application's route middleware.
     *
     * @var array
     */
    protected $routeMiddleware = [
        "exec" => ExecutorMiddleware::class,
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

        if (app()->runningInConsole()){

            DumpAutoload::addToExecute(JsRouteGenerator::class);
            DumpAutoload::addToExecute(JsLangGenerator::class);
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

        $jax_route = md5(config('app.url'));
        \Route::post($jax_route, '\Lar\LJS\JaxController@index')
            ->middleware(['web', 'lang'])->name('jax.executor');

        LConfigs::add('jax', $jax_route);

        JaxController::$list = array_merge(JaxController::$list, \Arr::dot(config('executors', [])));
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

