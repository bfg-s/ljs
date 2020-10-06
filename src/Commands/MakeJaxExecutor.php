<?php

namespace Lar\LJS\Commands;

use Illuminate\Console\Command;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Str;
use Lar\Layout\CfgFile;
use Lar\LJS\JaxExecutor;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputOption;

class MakeJaxExecutor extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $name = 'make:jax';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command from make blank Jax executor';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     * @throws \Exception
     */
    public function handle()
    {
        $dir = $this->rp();

        $namespace = $this->jax_namespace();

        foreach ($this->jax_segments() as $component_segment) {

            if ($component_segment !== $this->jax_name()) {

                $normal_part = ucfirst(Str::camel(Str::snake($component_segment)));

                $namespace .= "\\{$normal_part}";

                $dir .= "/{$normal_part}";
            }
        }

        $file = $dir . "/" . $this->class_name() . ".php";

        $class_namespace = "{$namespace}\\{$this->class_name()}";

        if (!is_dir($dir)) {

            mkdir($dir, 0777, 1);
        }

        if (is_file($file)) {

            $this->error("The component [{$this->class_name()}] already exists!"); return ;
        }

        $obj = class_entity($this->class_name())->wrap('php')
            ->namespace($namespace)
            ->extend(JaxExecutor::class);

        $obj->method('access')->line()->dataReturn('true')->docReturnType('bool');

        if ($this->option('demo')) {

            $obj->method("test")
                ->param('name')
                ->line()
                ->line("/**")
                ->line(" * JS Example")
                ->line(" * jax.{$this->name()}.test('you_name');")
                ->line(" */")
                ->line()
                ->line("\$this->toast_success(\"Hello, {\$name}\");");
        }

        if (file_put_contents($file, $obj->render())) {

            $this->info("Executor [{$class_namespace}] created!");
        }

        return 0;
    }

    /**
     * Get class name
     *
     * @return string|string[]|null
     */
    protected function class_name()
    {
        return ucfirst(Str::camel($this->name()));
    }

    /**
     * @return string
     */
    protected function name () {

        return Str::slug(implode('_', $this->jax_segments()), '_');
    }

    /**
     * @return mixed
     */
    protected function jax_name()
    {
        return \Arr::last($this->jax_segments());
    }

    /**
     * @return array
     */
    protected function jax_segments()
    {
        return array_map("Str::snake", explode("/", $this->input->getArgument('name')));
    }

    /**
     * @return string
     */
    protected function jax_namespace()
    {
        return $this->option('dir') ? implode("\\",
            array_map("ucfirst",
                array_map("Str::camel",
                    explode("/", $this->option('dir'))
                )
            )
        ) : "App\\Jax";
    }

    /**
     * Get the console command arguments.
     *
     * @return array
     */
    protected function getArguments()
    {
        return [
            ['name', InputArgument::REQUIRED, 'The jax name of the Executor'],
        ];
    }

    /**
     * Get the console command options.
     *
     * @return array
     */
    protected function getOptions()
    {
        return [
            ['dir', 'd', InputOption::VALUE_OPTIONAL, 'Directory of creation'],
            ['demo', '', InputOption::VALUE_NONE, 'Create demo methods'],
        ];
    }

    /**
     * @param  string  $path
     * @return string
     */
    protected function rp(string $path = "")
    {
        if ($this->option('dir')) {

            return "/". trim(base_path($this->option('dir') . '/' . trim($path, '/')), '/');
        }
        return "/". trim(app_path('Jax/' . trim($path, '/')), '/');
    }
}
