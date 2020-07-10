<template>
  <main id="post-info">
    <div>
      <b>邮寄信息</b>
    </div>
    <br />
    <el-form label-width="120px">
      <config-form-item v-for="(item, index) in postType" :config="item" :key="index"></config-form-item>
    </el-form>
    <el-form label-width="120px" v-if="postType[0].value == '1' ">
      <config-form-item v-for="(item, index) in postInfo" :config="item" :key="index"></config-form-item>
    </el-form>
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
      postType: [
        {
          type: "radio",
          label: "邮寄方式",
          key: "postType",
          value: "1",
          style: {
            textAlign: "left"
          },
          list: [
            {
              text: "邮寄",
              value: "1"
            },
            {
              text: "自取",
              value: "2"
            }
          ]
        }
      ],
      postInfo: [
        {
          type: "input",
          label: "姓名",
          key: "postName",
          value: "",
          required: true
        },
        {
          type: "input",
          label: "电话",
          key: "postPhone",
          value: "",
          required: true
        },
        {
          type: "input",
          label: "邮政编码",
          key: "postCode",
          value: "",
          required: true
        },
        {
          type: "input",
          label: "省市区",
          key: "postAddress",
          value: "",
          required: true
        },
        {
          type: "input",
          label: "详细地址",
          key: "postAddressDetail",
          value: "",
          required: true
        }
      ],
      baseInfo: [
        {
          type: "buttons",
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
                if (this.postType[0].value == "1") {
                  let values = util.extractConfigForm(this.postInfo);
                  if (!util.VerifyValues(values))
                    return this.$message.error("请完善邮寄信息");
                  this.$store.commit("setPostInfo", values);
                }
              }
            },
            {
              label: "提交",
              type: "primary",
              handler: () => {
                if (
                  !Object.keys(this.$store.state.baseInfo).length ||
                  !util.VerifyValues(this.$store.state.baseInfo)
                ) {
                  return this.$message.error("请完善基本信息！");
                }
                if (
                  !Object.keys(this.$store.state.busiInfo).length ||
                  !util.VerifyValues(this.$store.state.busiInfo)
                ) {
                  return this.$message.error("请完善业务信息！");
                }
                if (
                  !Object.keys(this.$store.state.materials).length ||
                  !this.checkSingleMaterial()
                ) {
                  return this.$message.error("请返回提交材料！");
                }
                if (this.postType[0].value == "1") {
                  let values = util.extractConfigForm(this.postInfo);
                  if (!util.VerifyValues(values))
                    return this.$message.error("请完善邮寄信息");
                  this.$store.commit("setPostInfo", values);
                  this.$store.dispatch("commitFormData").then(res => {
                    if (res) {
                      this.$router.push({
                        path: "/success"
                      });
                    }
                  });
                } else {
                  this.$router.push({
                    path: "/success"
                  });
                }
              }
            }
            // {
            //   label: "下一步",
            //   type: "primary",
            //   handler: () => {
            //     if (this.postType[0].value == "1") {
            //       let values = util.extractConfigForm(this.postInfo);
            //       if (!util.VerifyValues(values))
            //         return this.$message.error("请完善邮寄信息");
            //       this.$store.commit("setPostInfo", values);
            //       let flag = this.$store.dispatch("commitFormData");
            //       if (flag) {
            //         this.$router.push({
            //           path: "/success"
            //         });
            //       }
            //     }
            //   }
            // }
          ]
        }
      ]
    };
  },
  methods: {
    checkSingleMaterial() {
      let materials = this.$store.state.materials;
      let flag = true;
      for (let i = 0; i < materials.length; i++) {
        let item = materials[i];
        if (item.required && item.list.length <= 0) {
          flag = false;
          break;
        }
      }
      return flag;
    }
  },
  mounted() {
    util.formatConfigForm(this.$store.state.postInfo, this.postInfo);
  }
};
</script>

<style lang="less">
#post-info {
  // width: 50%;
  margin: auto;
}
</style>