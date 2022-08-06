import request from "@/utils/request";
/**
 * 获取员工列表（简单）
 * @param {Object} data
 * @returns promise
 */
 export function getEmployeesApi() {
    return request({
      url: "/sys/user/simple",
      
    });
  }