<template>
  <div id="app">
    <div class="form-container">
      <div>
        <h2>申报事项：事项申报Demo</h2>
        <h5>业务办理流程：填写基本信息==&gt;填写申请业务表单==&gt;上传附件==&gt;提交申请</h5>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  .form-container {
    width: 50%;
    margin: auto;
    background: #deeff4;
    padding: 1.5rem;
  }

  .btns-wrap {
    text-align: center;
    .el-form-item__content:last-child {
      margin-left: 0 !important;
    }
  }
}
</style>
