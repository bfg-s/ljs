<?php

namespace Lar\LJS\Middleware;

use Closure;
use Lar\Layout\Core\LConfigs;
use Lar\Layout\Executor;
use Lar\LJS\JaxController;

class ExecutorMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @param null $name
     * @param array $related
     * @return mixed
     * @throws \Exception
     */
    public function handle($request, Closure $next)
    {
        $param = md5(md5(config('app.url')));

        if ($request->ajax() && !$request->pjax() && $request->has($param)) {

            $executor = new JaxController();

            $this->makeConfigs();

            return $executor->index($request);
        }

        return $next($request);
    }

    /**
     * Make configs in header
     */
    private function makeConfigs() {

        LConfigs::makeDefaults();

        LConfigs::add('last_executed', time());

        foreach (LConfigs::$list as $key => $item) {

            header("{$key}: {$item}");
        }
    }
}
