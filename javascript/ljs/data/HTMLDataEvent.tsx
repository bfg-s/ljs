import get from 'lodash/get';
import map from 'lodash/map';

export class HTMLDataEvent {

    constructor(event_name: any, event: any, after: any = null) {

        let paramsName = `${event_name}Params`,
            paramName = `${event_name}Param`,
            propsName = `${event_name}Props`,
            propName = `${event_name}Prop`,
            obj = event.currentTarget,
            data = Object.assign({}, obj.dataset),
            storage = {object: obj, target: event.target, event, eventName: event_name},
            params = data[paramsName]? data[paramsName] : (data[paramName] ? data[paramName] : (data.params ? data.params : (data.param ? data.param : null))),
            exec = data[event_name];

        if (obj.executors === undefined) { obj.executors = {}; }

        try { exec = JSON.parse(exec); } catch (e) {}
        try { params = JSON.parse(params); }catch (e) { if (typeof params === "string") { params = params.split('&&').map(i => i.trim().parse(storage)); } }

        if (data.jax) {

            let withs = data.with ? data.with : {},
                props = data[propsName]? data[propsName] : (data[propName] ? data[propName] : data.props ? data.props : (data.prop ? data.prop : []));

            if (typeof after === 'function') {

                after();
            }

            try { withs = JSON.parse(withs); }catch (e) { if (typeof withs === "string") { withs = withs.split('&&').map(i => i.trim()); } }
            try { props = JSON.parse(props); }catch (e) { if (typeof props === "string") { props = props.split('&&').map(i => i.trim().exec(storage)); } }

            let ja = get(window.jax.with(withs)
                .params(params ? params : {})
                .storage(storage), data.jax);

            ja(props).then((datum: any) => {

                let par: any = [];

                map(datum, (i: any,k: any) => {
                    if (!/^([0-9\:]+)\:/.test(k)) par.push(i);
                });

                window.ljs.exec(exec, par, storage);
            });
        }

        else {

            if (typeof after === 'function') {

                after();
            }

            window.ljs.exec(exec, params ? params : [], storage);
        }
    }
}