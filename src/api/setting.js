import request from "@/utils/request";
/**
 * 获取角色列表
 * ***/
export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`,
  });
}
