import request from "@/utils/request";

/**
 * 提交登录
 * @param {Object} data
 * @returns promise
 */
export function login(data) {
  return request({
    url: "/sys/login",
    method: "post",
    data,
  });
}

export function getUserInfo() {
  return request({
    url: "/sys/profile",
    method: "post",
  });
}

export function getUserDetails(id) {
  return request({
    url: "/sys/user/"+id,
  });
}
