import router from "@/router";
import store from "@/store";
const whiteList = ["/login", "/404"];

router.beforeEach((to, from, next) => {
  const token = store.state.user.token;
  // console.log(token);
  // console.log(to.path);
  if (token) {
    //   1.登录
    // 是否进入登录页面
    if (!store.state.user.userInfo.userId) {
      store.dispatch("user/getUserInfo");
    }

    if (to.path === "/login") {
      // 1.1 是 跳到首页
      next("/");
    } else {
      // 1.2 不是 直接进入
      next();
    }
  } else {
    //   2.未登录
    // 访问的是否在白名单（未登录也能访问的页面）
    const isCludes = whiteList.includes(to.path);
    if (isCludes) {
      // 2.1 在白名单 放行
      next();
    } else {
      // 2.2 不在白名单（不登陆不能访问）跳到登录页
      next("/login");
    }
  }
});
