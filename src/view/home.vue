<template>
  <div class="hello">
    <el-form label-width="120px">
      <config-form-item v-for="(item, index) in items" :config="item" :key="index"></config-form-item>
    </el-form>
  </div>
</template>

<script>
import configFormItem from "@/components/d-config-form-item.vue";

export default {
  components: {
    configFormItem
  },
  props: {
    msg: String
  },
  data() {
    return {
      form: {
        ref: "myForm",
        labelWidth: "100",
        size: "medium",
        disable: false,
        items: [
          {
            type: "input",
            label: "活动名称",
            key: "name",
            name: "",
            required: true
          }
        ]
      },
      items: [
        {
          type: "input",
          label: "活动名称",
          value: "",
          required: true
        },
        {
          type: "textarea",
          label: "活动描述",
          value: "123",
          required: true,
          style: {
            fontFamily: "Arial, Helvetica, sans-serif !important"
          }
        },
        {
          type: "select",
          label: "活动方式",
          value: "1",
          list: [
            {
              text: "现场参加",
              value: "1"
            },
            {
              text: "网上加入",
              value: "2"
            }
          ]
        },
        {
          type: "radio",
          label: "您的性别",
          value: "1",
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
          type: "checkbox",
          label: "兴趣爱好",
          value: [],
          list: [
            {
              text: "足球",
              value: "1"
            },
            {
              text: "排球",
              value: "2"
            },
            {
              text: "篮球",
              value: "3"
            }
          ]
        },
        {
          type: "switch",
          label: "是否准时参加",
          value: ""
        },
        {
          type: "date",
          label: "活动日期",
          placeholder: "开始日期",
          value: "",
          style: {
            width: "100%"
          }
        },
        {
          type: "time",
          label: "活动时间",
          placeholder: "开始时间",
          value: "",
          style: {
            width: "100%"
          }
        },
        {
          type: "dateTime",
          label: "活动时间",
          date: {
            placeholder: "开始日期",
            value: ""
          },
          time: {
            placeholder: "开始时间",
            value: ""
          },
          style: {
            width: "100%"
          }
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
</style>
