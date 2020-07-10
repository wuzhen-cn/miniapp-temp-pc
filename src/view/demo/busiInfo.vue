<template>
  <main id="busi-info">
    <div>
      <b>业务表单</b>
    </div>
    <br />
    <el-form label-width="80px">
      <config-form-item v-for="(item, index) in busiInfo" :config="item" :key="index"></config-form-item>
    </el-form>
  </main>
</template>

<script>
import configFormItem from "@/components/d-config-form-item.vue";
import util from "@/utils/util";

export default {
  components: {
    configFormItem
  },
  data() {
    return {
      busiInfo: [
        {
          type: "input",
          label: "名称",
          key: "name",
          value: "",
          required: true
        },
        {
          type: "input",
          label: "年龄",
          key: "age",
          value: "",
          required: true
        },
        {
          type: "input",
          label: "性别",
          key: "gender",
          value: "",
          required: true
        },
        {
          type: "input",
          label: "地址",
          key: "address",
          value: "",
          required: true
        },
        {
          type: "buttons",
          className: "btns-wrap",
          list: [
            {
              label: "上一步",
              type: "",
              handler: () => {
                this.$router.go(-1);
              }
            },
            {
              label: "暂存",
              type: "primary",
              handler: () => {
                let values = util.extractConfigForm(this.busiInfo);
                this.$store.commit("setBusiInfo", values);
                this.$store.dispatch("commitFormData");
              }
            },
            {
              label: "下一步",
              type: "primary",
              handler: () => {
                let values = util.extractConfigForm(this.busiInfo);
                if (!util.VerifyValues(values))
                  return this.$message.error("请完善必填项");
                this.$store.commit("setBusiInfo", values);
                // this.$store.dispatch("commitFormData");
                this.$router.push({
                  path: "/materials"
                });
              }
            }
          ]
        }
      ]
    };
  },
  mounted() {
    if (util.notEmpty(this.$store.state.busiInfo)) {
      util.formatConfigForm(this.$store.state.busiInfo, this.busiInfo);
    }
  }
};
</script>

<style lang="less">
#busi-info {
  // width: 50%;
  margin: auto;
}
</style>