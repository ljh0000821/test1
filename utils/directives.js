import { getStore } from "@/utils/store.js";
import { getType, getIntersection } from "@/utils/tools";
export default (Vue) => {
    //是否拥有某些权限
    Vue.directive("permission", {
        inserted: function (el, binding, vnode) {
            let info = getStore("userInfo"),
                roles = info.role_name.split(",") || [],
                value = binding.value;
            if (getType(value) === "String") {
                roles.indexOf(value) == -1 && el.remove();
                return;
            }
            if (getType(value) === "Array") {
                let len = getIntersection(roles, value).length;
                len == 0 && el.remove();
                return;
            }
            console.log("请输入权限");
        }
    });
};
