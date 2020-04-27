import {Helper} from "../../Helper";
import {Toast} from "./Executors/Toast";
import {Swal} from "./Executors/Swal";
import {Message} from "./Executors/Message";
import {Errors} from "./Executors/Errors";

Helper.before_load((ljs: Ljs) => {

    ljs.toast = require("toastr");
    ljs.swal = require('sweetalert2/dist/sweetalert2');

    ljs
        .regExec(Message)
        .regExec(Errors)
        .regExec(Toast)
        .regExec(Swal);
});