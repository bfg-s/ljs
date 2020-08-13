export class HTMLDataEvent {

    constructor(event_name: any, event: any, after: any = null) {

        let paramsName = `${event_name}Params`,
            paramName = `${event_name}Param`,
            obj = event.currentTarget,
            data = Object.assign({}, obj.dataset),
            storage = {object: obj, target: event.target, event, eventName: event_name},
            params = data[paramsName]? data[paramsName] : (data[paramName] ? data[paramName] : (data.params ? data.params : (data.param ? data.param : null))),
            exec = data[event_name];

        if (obj.executors === undefined) { obj.executors = {}; }

        try { exec = JSON.parse(exec); } catch (e) {}
        try { params = JSON.parse(params); }catch (e) { if (typeof params === "string") { params = params.split('&&').map(i => i.trim().parse(storage)); } }

        if (typeof after === 'function') {

            after();
        }

        window.ljs.exec(exec, params ? params : [], storage);
    }
}