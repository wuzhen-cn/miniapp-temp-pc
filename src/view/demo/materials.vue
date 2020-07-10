<template>
  <main id="materials-info">
    <div>
      <b>上传材料</b>
    </div>
    <br />
    <file-upload
      v-for="(item, index) in materials"
      :data="item"
      :lot="index"
      :key="index"
      @on-updated="uploaded"
    ></file-upload>
    <br />

    <el-form label-width="120px">
      <config-form-item v-for="(item, index) in buttons" :config="item" :key="index"></config-form-item>
    </el-form>
  </main>
</template>

<script>
import configFormItem from "@/components/d-config-form-item.vue";
import FileUpload from "@/components/d-file-upload";

export default {
  components: {
    configFormItem,
    FileUpload
  },
  data() {
    return {
      materials: [
        {
          name: "材料一",
          required: true,
          type: "online",
          code: "1",
          list: []
        },
        {
          name: "材料二",
          required: true,
          type: "online",
          code: "2",
          list: []
        },
        {
          name: "材料三",
          required: false,
          type: "online",
          code: "2",
          list: []
        }
      ],
      buttons: [
        {
          type: "buttons",
          className: "btns-wrap",
          list: [
            {
              label: " 上一步",
              type: "",
              handler: () => {
                this.$router.go(-1);
              }
            },
            {
              label: "暂存",
              type: "primary",
              handler: () => {
                if (!this.checkSingleMaterial())
                  return this.$message.error(this.errorMessage);
                this.$store.commit("setMaterialsInfo", this.materials);
                this.$store.dispatch("commitFormData");
              }
            },
            {
              label: "下一步",
              type: "primary",
              handler: () => {
                if (!this.checkSingleMaterial())
                  return this.$message.error(this.errorMessage);
                this.$store.commit("setMaterialsInfo", this.materials);
                // this.$store.dispatch("commitFormData");
                this.$router.push({
                  path: "/postInfo"
                });
              }
            }
          ]
        }
      ],
      errorMessage: ""
    };
  },
  methods: {
    uploaded(list, index, type) {
      this.materials[index].list = list;
      this.materials[index].type = type;
    },
    checkSingleMaterial() {
      let flag = true;
      for (let i = 0; i < this.materials.length; i++) {
        let item = this.materials[i];
        if (item.required && item.list.length <= 0) {
          flag = false;
          this.errorMessage = `请提交${item.name}的申请材料`;
          break;
        }
      }
      return flag;
    }
  },
  mounted() {
    if (this.$store.state.materials.length) {
      this.materials = this.$store.state.materials;
    }
  }
};
</script>

<style lang="less">
#materials-info {
  // width: 50%;
  margin: auto;
}
</style>