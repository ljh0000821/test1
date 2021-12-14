import { RouterMount, createRouter } from "uni-simple-router";
import { getStore } from "@/utils/store";
const router = createRouter({
    platform: process.env.VUE_APP_PLATFORM,
    routes: [...ROUTES]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
    let token = getStore("token");
    if (to.meta.isAuth && !token) {
        uni.navigateTo({
            url: "pages/login/index"
        });
    }
    next();
});

export {
    router,
    RouterMount
};