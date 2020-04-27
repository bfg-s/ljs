import {Helper} from "../../Helper";
import {Nav} from "./classes/Nav";

require("./plugins/jquery.lar.pjax");

Helper.before_load((ljs: Ljs) => {

    ljs.$nav = new Nav(ljs);
    window.$nav = ljs.$nav;
});