<template>
  <el-card class="box-card">
    <el-row type="flex">
      <el-col>
        <el-tag
          ><i :class="iconname"></i>
          <slot name="left-tag"></slot>
        </el-tag>
      </el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <slot name="right"></slot>
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: "PageTools",
  data() {
    return {};
  },
  props: {
    iconname: {
      type: String,
      default: "el-icon-info",
    },
  },
  created() {},

  methods: {},
};
</script>

<style scoped></style>
