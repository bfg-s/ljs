<?php

namespace Lar\LJS\Core;

use File;
use Illuminate\Console\Command;
use Lar\Developer\Commands\Dump\DumpExecute;

/**
 * Class JsLangGenerator.
 * @package Lar\LJS\Core
 */
class JsLangGenerator implements DumpExecute
{
    /**
     * @param  Command  $command
     * @return mixed|void
     */
    public function handle(Command $command)
    {
        $dirs = File::directories(resource_path('lang'));
        $data = [];
        foreach ($dirs as $dir) {
            $files = File::allFiles($dir);
            $lang = basename($dir);
            foreach ($files as $file) {
                $group = str_replace('.'.$file->getFileInfo()->getExtension(), '', $file->getFilename());
                $data[$lang][$group][] = 'window.locales = window.locales ? window.locales : {}';
                $arr = include $file->getPathname();
                if (is_array($arr)) {
                    $json = json_encode($arr, JSON_UNESCAPED_UNICODE);
                    $data[$lang][$group][] = "window.locales[\"{$group}\"] = {$json};";
                }
                $data[$lang][$group] = implode("\n", $data[$lang][$group]);
            }
        }

        foreach ($data as $lang => $groups) {
            foreach ($groups as $group => $datum) {
                if (!is_dir($this->rp($lang))) {
                    mkdir($this->rp($lang), 0777, true);
                }
                file_put_contents($this->rp("{$lang}/{$group}.js"), $datum);
            }
        }
    }

    /**
     * @param  string  $path
     * @return string
     */
    protected function rp(string $path = '')
    {
        return '/'.trim(public_path('/locales/'.trim($path, '/')), '/');
    }
}
