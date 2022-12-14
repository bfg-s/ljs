import {ExecutorParent} from "../Extends/ExecutorParent";

export class Tpl extends ExecutorParent {

    static __name() {

        return "tpl";
    }

    clearArea($to: string) {

        let area = document.querySelector(`span[data-tpl="${$to}"]`);

        if (area) {

            area.innerHTML = '';
        } else {

            "toast:error".exec(`Template area [${$to}] undefined!`);
        }
    }

    replaceTo($tpl: string, $to: string = $tpl) {

        this.copyTo($tpl, $to, (area: any) => {
            area.innerHTML = '';
        })
    }

    copyTo($tpl: string, $to: string = $tpl, $before: any = null) {

        let template: any = document.querySelector(`template[data-tpl="${$tpl}"]`);

        if (template) {

            let area = document.querySelector(`span[data-tpl="${$to}"]`);

            if (area) {

                let cloned = template.content.cloneNode(true);
                let scripts = cloned.querySelectorAll('script');
                if (scripts.length) {
                    let pull = (func: (node: any) => {}) => {
                        return typeof func === 'function' ? func(cloned) : () => "";
                    };
                    var call_pull = "";
                    Object.values(scripts).map((script: any) => {
                        let tpl_script = script.innerText.trim();
                        if (!/^pull.*/.test(tpl_script)) {
                            tpl_script = "pull(function () {" + tpl_script + "});";
                        }
                        tpl_script = "call_pull = " + tpl_script + ";"
                        eval(tpl_script);
                        if (call_pull) {
                            let temp_element: any = document.createElement('span');
                            temp_element.innerHTML = call_pull;
                            script.replaceWith(...temp_element.children);
                            temp_element = null;
                        } else {
                            script.remove();
                        }
                    });
                }

                if ($before) {

                    $before(area, cloned)
                }
                area.appendChild(cloned);
            } else {

                "toast:error".exec(`Template area [${$to}] undefined!`);
            }
        } else {

            "toast:error".exec(`Template [${$tpl}] undefined!`);
        }
    }

    get_tpl($tpl: any) {

        let template: any = document.querySelector(`template[data-tpl="${$tpl}"]`);

        if (template) {

            return template.content.cloneNode(true);
        }

        return "";
    }
}
