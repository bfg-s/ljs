import {ExecutorParent} from "../../../ljs/Extends/ExecutorParent";

export class Swal extends ExecutorParent {

    input (title: string, exec: any = null) {

        return window.ljs.swal.fire({
            title: title,
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'OK'
        }).then((state: any) => {

            if (exec) {

                window.ljs.exec(exec, state.value, this.storage);
            }

            return state;
        });
    }

    confirm (title: string, success: any = "", cancel: any = "", options: any = {}) {

        return window.ljs.swal.fire({
            text: title,
            type: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            ...options
        }).then((result: any) => {

            if (result.value) {

                if (typeof success === 'string') {
                    window.ljs.exec(success, null, this.storage);
                } else if (typeof success === 'function') {
                    success();
                }
            }

            else {

                if (typeof cancel === 'string') {
                    window.ljs.exec(cancel, null, this.storage);
                } else if (typeof cancel === 'function') {
                    cancel();
                }
            }

            return result;
        })
    }

    success (title: string, text: string = '', options: any = {}) {

        return window.ljs.swal.fire({title: title, text: text, type: 'success', ...options});
    }

    warning (title: string, text: string = '', options: any = {}) {

        return window.ljs.swal.fire({title: title, text: text, type: 'warning', ...options});
    }

    error (title: string, text: string = '', options: any = {}) {

        return window.ljs.swal.fire({title: title, text: text, type: 'error', ...options});
    }

    info (title: string, text: string = '', options: any = {}) {

        return window.ljs.swal.fire({title: title, text: text, type: 'info', ...options});
    }

    question (title: any, text: string = '', options: any = {}) {

        return window.ljs.swal.fire({title: title, text: text, type: 'question', ...options});
    }

    __invoke (config: any) {

        return window.ljs.swal.fire(config);
    }

    static __name () {

        return 'swal';
    }

    /**
     * Alert systems aliases
     */
    static __aliases () {

        return ["alert"] as any;
    }
}
