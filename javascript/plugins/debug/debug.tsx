import {Helper} from "../../Helper";

Helper.before_load((ljs: Ljs) => {

    if (window.phpdebugbar) {

        window.ljs.vue.component('debug-terminal', require('./TerminalTools').default);

        //let phpdebugbar: any = new window.PhpDebugBar.DebugBar();

        let LinkIndicator = window.PhpDebugBar.DebugBar.Tab.extend({

            tagName: 'div',

            render() {
                LinkIndicator.__super__.render.apply(this);
                let body = this.$el;
                body.css({padding: 0, width: '100%', height: '100%', 'background-color': '#101010'});
                body.append('<debug-terminal name="debug_terminal" id="debug_terminal" />');
                body.click(() => {
                    body.find('#debug_terminal [contenteditable]').focus();
                });
                window.ljs.exec("vue::init", null, {
                    target: body.find('#debug_terminal')[0]
                });
            }

        });


        window.phpdebugbar.addTab("ljs_terminal", new LinkIndicator({title: 'Terminal'}));
    }
});
