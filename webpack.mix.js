const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
    .js('javascript/ljs.tsx', 'assets/js')
    .sass('javascript/scss/ljs.scss', 'assets/css')

    .js('javascript/plugins/vue/vue.tsx', 'assets/js/plugins')
    .js('javascript/plugins/nav/nav.tsx', 'assets/js/plugins')
    .js('javascript/plugins/echo/echo.tsx', 'assets/js/plugins')
    .js('javascript/plugins/alert/alert.tsx', 'assets/js/plugins')
    .js('javascript/plugins/debug/debug.tsx', 'assets/js/plugins')
    .js('javascript/plugins/mask.tsx', 'assets/js/plugins')
    .js('javascript/plugins/select2.tsx', 'assets/js/plugins')
    .js('javascript/plugins/jquery.tsx', 'assets/js/plugins')
    .js('javascript/plugins/jq.tsx', 'assets/js/plugins')
    .js('javascript/plugins/fancy.tsx', 'assets/js/plugins')

    .sass('javascript/scss/plugins/select2.scss', 'assets/css/plugins')
    .sass('javascript/scss/plugins/fancy.scss', 'assets/css/plugins')
    .webpackConfig({
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: ["*", ".js", ".jsx", ".vue", ".ts", ".tsx"]
        }
    });