<?php

namespace Lar\LJS;

use Exception;
use Illuminate\Support\Arr;
use Illuminate\Support\ServiceProvider as ServiceProviderIlluminate;
use Lar\Developer\Commands\DumpAutoload;
use Lar\Layout\Core\LConfigs;
use Lar\LJS\Commands\MakeJaxExecutor;
use Lar\LJS\Core\JsRouteGenerator;
use Lar\LJS\Middleware\ExecutorMiddleware;
use Route;

/**
 * Class ServiceProvider.
 *
 * @package Lar\Layout
 */
class ServiceProvider extends ServiceProviderIlluminate
{
    /**
     * @var array
     */
    protected $commands = [
        MakeJaxExecutor::class,
    ];

    /**
     * The application's route middleware.
     *
     * @var array
     */
    protected $routeMiddleware = [
        'exec' => ExecutorMiddleware::class,
    ];

    /**
     * @var array
     */
    protected $completion_logic = [

    ];

    /**
     * @var array
     */
    public static array $jaxMiddlewares = [];

    /**
     * Bootstrap services.
     *
     * @return void
     * @throws Exception
     */
    public function boot()
    {
        if (app()->runningInConsole() && is_link(base_path('ljs'))) {
            if (!is_dir(public_path('ljs')) && !is_link(public_path('ljs'))) {
                app()->make('files')->link(
                    __DIR__.'/../assets', public_path('ljs')
                );
            }
        }

        if (app()->runningInConsole()) {
            //DumpAutoload::addToExecute(JsRouteGenerator::class);
            //DumpAutoload::addToExecute(JsLangGenerator::class);
        }

        $this->publishes([__DIR__.'/../assets' => public_path('ljs')], ['laravel-assets', 'ljs-assets']);
        //Tag::registerComponent("ajax_form", ajaxForm::class);

        $jax_route = md5(config('app.url'));
        Route::post($jax_route, '\Lar\LJS\JaxController@index')
            ->middleware(array_merge([
                \App\Http\Middleware\EncryptCookies::class,
                \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
                \Illuminate\Session\Middleware\StartSession::class,
                \Illuminate\View\Middleware\ShareErrorsFromSession::class,
                \Illuminate\Routing\Middleware\SubstituteBindings::class,
                'lang'
            ], static::$jaxMiddlewares))->name('jax.executor');

        LConfigs::add('jax', $jax_route);
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

        JaxController::$list = array_merge(JaxController::$list, Arr::dot(config('executors', [])));
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
