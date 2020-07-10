<template>
  <main id="base-info">
    <div>
      <b>基本信息</b>
    </div>
    <br />
    <el-form label-width="120px">
      <config-form-item v-for="(item, index) in baseInfo" :config="item" :key="index"></config-form-item>
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
      baseInfo: [
        {
          type: "radio",
          label: "审批办件类型",
          key: "Type",
          value: "1",
          required: true,
          style: {
            textAlign: "left"
          },
          list: [
            {
              text: "个人",
              value: "1"
            },
            {
              text: "法人",
              value: "2"
            },
            {
              text: "建设项目",
              value: "3"
            }
          ]
        },
        {
          type: "select",
          label: "证件类型",
          key: "CardType",
          value: "",
          required: true,
          list: [
            {
              text: "身份证",
              value: "1"
            },
            {
              text: "护照",
              value: "2"
            },
            {
              text: "驾驶证",
              value: "3"
            }
          ]
        },
        {
          type: "input",
          label: "证件编号",
          key: "CardNo",
          value: "",
          required: true
        },
        {
          type: "radio",
          label: "性别",
          key: "Gender",
          value: "1",
          style: {
            textAlign: "left"
          },
          list: [
            {
              text: "男",
              value: "1"
            },
            {
              text: "女",
              value: "2"
            }
          ]
        },
        {
          type: "input",
          label: "姓名",
          key: "Applyer",
          value: "",
          required: true
        },
        {
          type: "input",
          label: "联系电话",
          key: "PhoneNo",
          value: "",
          required: true
        },
        {
          type: "input",
          label: "联系地址",
          key: "Address",
          value: "",
          required: true
        },
        {
          type: "input",
          label: "邮箱",
          key: "Email",
          value: ""
        },
        {
          type: "buttons",
          className: "btns-wrap",
          list: [
            {
              label: "暂存",
              type: "primary",
              handler: () => {
                let values = util.extractConfigForm(this.baseInfo);
                this.$store.commit("setBaseInfo", values);
                this.$store.dispatch("commitFormData");
              }
            },
            {
              label: "下一步",
              type: "primary",
              handler: () => {
                let values = util.extractConfigForm(this.baseInfo);
                if (!util.VerifyValues(values))
                  return this.$message.error("请完善必填项");
                this.$store.commit("setBaseInfo", values);
                // this.$store.dispatch("commitFormData");
                this.$router.push({
                  path: "/busiInfo"
                });
              }
            }
          ]
        }
      ]
    };
  },
  mounted() {
    if (this.$store.state.baseInfo.Applyer) {
      util.formatConfigForm(this.$store.state.baseInfo, this.baseInfo);
    }
  }
};
</script>

<style lang="less">
#base-info {
  // width: 50%;
  // margin: auto;

  .btns-wrap {
    .el-form-item__content {
      margin-left: 0 !important;
    }
  }
}
</style>
