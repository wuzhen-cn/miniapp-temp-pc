<template>
  <div class="file-picker-container">
    <div class="file-picker">
      <input type="file" :multiple="multiple" accept="*/*" @change="uploadFile" />
      <span>{{ text }}</span>
    </div>
    <div class="file-item" v-for="(item, index) in list" :key="index">
      <i class="el-icon-document"></i>
      <span class="file-name">{{item.FILE_NAME || '-'}}</span>
      <i class="el-icon-delete" @click="removeFile(index)"></i>
    </div>
  </div>
</template>

<script>
import util from "@/utils/util";

export default {
  props: {
    text: {
      type: String,
      value: "",
      default: "选择文件"
    },
    multiple: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      value: ""
    },
    lot: {
      type: Number,
      default: 0
    },
    list: {
      type: Array,
      required: true
    }
  },
  watch: {
    list(newVal) {
      this.fileList = newVal;
    }
  },
  data() {
    return {
      fileList: []
    };
  },
  methods: {
    uploadFile(event) {
      let file = event.target.files[0];
      if (!file.name) {
        return (event.target.value = "");
      }
      this.$ns.upPic("", file).then(res => {
        if (res.data && res.data[0]) {
          let data = util.parse(res.data[0]);
          let uploadInfo = {
            DOCUMENT_NAME: this.title || "",
            // FILE_PATH: `peojectapi/platform/file/downloadFile?fileName=${scope.row.packName}&uuid=${scope.row.packUrl}` || "",
            FILE_PATH: data.uuid || "",
            FILE_NAME: file.name || "",
            // FILE_NAME: file.name.split(".")[0] || "",
            DOCUMENT_ID: data.uuid || "",
            URL: data.docid || "", //已改为传docId
            TYPE: "1",
            OPERATOR_ID: this.$store.state.user.CARD_NO || "",
            OPERATOR_NAME: this.$store.state.user.USER_NAME || ""
          };
          this.fileList.push(uploadInfo);
          this.$emit("on-upload", this.fileList);
          event.target.value = "";
        }
      });
    },
    removeFile(index) {
      this.$nextTick(() => {
        this.fileList.splice(index, 1);
        this.$emit("on-upload", this.fileList);
      });
    }
  }
};
</script>

<style lang="less">
.file-picker-container {
  position: relative;
}

.file-picker-wrap {
  background: #fff;
  text-align: center;
  flex-direction: column;
}

.file-picker {
  position: relative;
  width: 128px;
  height: 28px;
  font-size: 14px;
  line-height: 28px;
  border-radius: 3px;
  text-align: center;
  background: #13ce66;
  color: #fff;
  margin: 0 auto;

  input[type="file"] {
    position: absolute;
    height: 100%;
    width: 100%;
    opacity: 0;
    left: 0;
    top: 0;
  }
}

.file-item {
  height: 32px;
  border-radius: 5px;
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;
  margin-top: 12px;
  position: relative;

  img {
    max-width: 90%;
    height: 90%;
  }

  .file-name {
    margin-right: 32px;
    font-weight: 600;
  }

  .el-icon-document {
    color: deepskyblue;
    margin-right: 10px;
  }

  .el-icon-delete {
    float: right;
    position: absolute;
    right: 0.5rem;
    top: 0.5rem;
  }
}
</style>
