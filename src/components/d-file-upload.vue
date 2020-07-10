<template>
  <div class="d-file-upload">
    <div class="upload-name">
      <span style="margin-right: 20px">{{data.name}}</span>
      <upload v-if="value" :title="data.name" :list="data.list" @on-upload="fileUploaded"></upload>

      <el-radio-group v-model="value">
        <el-radio :label="0">窗口提交</el-radio>
        <el-radio :label="1">在线提交</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
import Upload from "./upload";

export default {
  props: {
    data: {
      type: Object,
      required: true
    },
    lot: {
      type: Number,
      required: true
    }
  },
  components: {
    Upload
  },
  watch: {
    value(newVal) {
      if (!newVal) {
        this.$emit("on-updated", ["窗口提交"], this.lot, "offline");
      } else {
        this.$emit("on-updated", [], this.lot, "online");
      }
    }
  },
  data() {
    return {
      value: 1
    };
  },
  methods: {
    fileUploaded(val) {
      this.$emit("on-updated", val, this.lot, "online");
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.value = this.data.type == "online" ? 1 : 0;
    });
  }
};
</script>

<style lang="less">
.d-file-upload {
  margin-bottom: 16px;
}
.upload-name {
  min-height: 44px;
  box-sizing: border-box;
  text-align: left;
  display: flex;
  justify-content: space-between;
  background: #fff;
  padding: 0.5rem 1rem;
  align-items: top;
}
</style>