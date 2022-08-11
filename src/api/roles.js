import request from "@/utils/request";
/**
 * 获取人员信息
 * @param {Object} data
 * @returns promise
 */
export function getRolesApi(params) {
  return request({
    url: "/sys/role",
    params,
  });
}

/**
 * 添加人员信息
 * @param {Object} data
 * @returns promise
 */
export function addRolesApi(data) {
  return request({
    url: "/sys/role",
    data,
    method: "POST",
  });
}
