<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height: 60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="dialogFormVisible = true"
                >新增角色</el-button
              >
            </el-row>
            <!-- 表格 -->
            <el-table :data="tableData" style="width: 100%">
              <el-table-column type="index" label="序号" width="120">
              </el-table-column>
              <el-table-column prop="name" label="角色名称" width="240">
              </el-table-column>
              <el-table-column prop="description" label="描述" width="180">
              </el-table-column>
              <el-table-column label="操作">
                <template>
                  <el-button type="success">分配选取</el-button>
                  <el-button type="primary">编辑</el-button>

                  <el-button type="danger">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->

            <el-row
              type="flex"
              justify="center"
              align="middle"
              style="height: 60px"
            >
              <!-- 分页组件 -->
              <el-pagination
                layout="sizes,prev, pager, next"
                :total="total"
                :page-size="pageSize"
                :page-sizes="[3, 5, 10, 15]"
                @current-change="currentChange"
                @size-change="sizeChange"
              >
              </el-pagination>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top: 50px">
              <el-form-item label="公司名称">
                <el-input
                  disabled
                  style="width: 400px"
                  v-model="companyInfo.name"
                />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input
                  disabled
                  style="width: 400px"
                  v-model="companyInfo.companyAddress"
                />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input
                  disabled
                  style="width: 400px"
                  v-model="companyInfo.mailbox"
                />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  type="textarea"
                  :rows="3"
                  disabled
                  style="width: 400px"
                  v-model="companyInfo.remarks"
                />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
      <!-- 对话框弹层 -->

      <el-dialog
        title="编辑角色"
        :visible.sync="dialogFormVisible"
        @close="dialogClose"
      >
        <el-form :model="form" :rules="formrules" ref="form">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="form.description" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addRoles">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getRolesApi, addRolesApi } from "@/api/roles";
import { getCompanyInfo } from "@/api/setting";

export default {
  data() {
    return {
      tableData: [],
      pageSize: 3,
      total: 0,
      page: 1,
      dialogFormVisible: false,
      form: {
        name: "",
        description: "",
      },
      formrules: {
        name: {
          required: true,
          message: "请输入活动名称",
          trigger: "blur",
        },
      },
      companyInfo: {},
    };
  },

  created() {
    this.getRoles();
    this.getCompanyInfo();
  },

  methods: {
    async getRoles() {
      const { rows, total } = await getRolesApi({
        page: this.page,
        pagesize: this.pageSize,
      });
      this.tableData = rows;
      this.total = total;
    },
    currentChange(val) {
      this.page = val;
      console.log(val);
      this.getRoles();
    },
    sizeChange(val) {
      this.pageSize = val;
      this.getRoles();
    },
    async addRoles() {
      await this.$refs.form.validate();
      await addRolesApi(this.form);
      this.$message.success("添加成功");
      this.dialogFormVisible = false;
      this.getRoles();
    },
    dialogClose() {
      this.$refs.form.resetFields();
      this.form.description = "";
    },
    async getCompanyInfo() {
      const res = await getCompanyInfo(
        this.$store.state.user.userInfo.companyId
      );
      console.log(res);
      this.companyInfo = res;
    },
  },
};
</script>

<style scoped lang="less"></style>
