export class HTMLState {

    constructor(obj: any, create_event: boolean = true) {

        let $name = obj.dataset.state,
            targetName = obj.getAttribute('name');

        let targetValue = obj.value;

        if ('$' in window) {

            let ret = null;
            let hooks = $.valHooks[ obj.type ] ||
                $.valHooks[ obj.nodeName.toLowerCase() ];

            if ( hooks &&
                "get" in hooks &&
                ( ret = (hooks as any).get( obj, "value" ) ) !== undefined
            ) {
                targetValue = ret;
            } else {
                targetValue = obj.value;
            }
        }

        // Handle most common string cases
        if ( typeof targetValue === "string" ) {
            targetValue = targetValue.replace(/\r/g, "" );
        }

        targetValue = targetValue == null ? "" : targetValue;

        if ($name) $name = targetName ? `${$name}.${targetName}` : $name;
        else $name = targetName;

        if ($name && $name !== "") {

            let formParent = obj.closest('form');

            if (formParent) {

                let formName = formParent.getAttribute('name');

                if (formName) {

                    $name = `${formName}.${$name}`;
                }
            }

            if (obj.type === 'checkbox') {

                targetValue = obj.checked;
            }

            if (obj.type === 'radio') {

                targetValue = obj.checked ? targetValue : null;

                if (window.ljs.$state.has($name) && !obj.checked) {

                    targetValue = window.ljs.$state.get($name);
                }
            }

            window.ljs.$state.make_storage($name, {
                target: obj,
                data: obj.dataset
            });

            window.ljs.$state.set($name, targetValue);

            if (create_event) {

                $(obj).on(obj.dataset.live !== undefined ? 'keyup' : 'change', (event) => {

                    if (event.target) {

                        new HTMLState(event.target, false);
                    }
                });
            }
        }

        else {

            if (process.env.NODE_ENV === 'development') {
                window.ljs._error('Undefined name of target.', obj);
            }
        }
    }
}