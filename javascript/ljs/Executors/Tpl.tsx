import {ExecutorParent} from "../Extends/ExecutorParent";

export class Tpl extends ExecutorParent {

    clearArea ($to: string) {

        let area = document.querySelector(`span[data-tpl="${$to}"]`);

        if (area) {

            area.innerHTML = '';
        }

        else {

            "toast:error".exec(`Template area [${$to}] undefined!`);
        }
    }

    replaceTo ($tpl: string, $to: string = $tpl) {

        this.copyTo($tpl, $to, (area: any) => {
            area.innerHTML = '';
        })
    }

    copyTo ($tpl: string, $to: string = $tpl, $before: any = null) {

        let template: any = document.querySelector(`template[data-tpl="${$tpl}"]`);

        if (template) {

            let area = document.querySelector(`span[data-tpl="${$to}"]`);

            if (area) {

                let cloned = template.content.cloneNode(true);

                if ($before) {

                    $before(area, cloned)
                }
                area.appendChild(cloned);
            }

            else {

                "toast:error".exec(`Template area [${$to}] undefined!`);
            }
        }

        else {

            "toast:error".exec(`Template [${$tpl}] undefined!`);
        }
    }

    static __name () {
    
        return "tpl";
    }
}