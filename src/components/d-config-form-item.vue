<template>
  <el-form-item
    :label="config.label"
    :required="config.required"
    :style="config.style"
    :class="[config.className, {'btns-wrap': config.type == 'buttons'}]"
  >
    <!-- input textarea -->
    <el-input v-if="config.type === 'input'" :type="config.type" v-model="config.value"></el-input>
    <el-input v-if="config.type === 'textarea'" :type="config.type" v-model="config.value"></el-input>
    <el-input v-if="config.type === 'tel'" :type="config.type" v-model="config.value"></el-input>
    <!-- select -->
    <el-select
      v-if="config.type === 'select'"
      v-model="config.value"
      :placeholder="config.value || ''"
      style="width: 100%"
    >
      <el-option
        v-for="(item, key) in config.list"
        :label="item.text"
        :value="item.value"
        :key="key"
      ></el-option>
    </el-select>
    <!-- radio -->
    <el-radio-group v-if="config.type === 'radio'" v-model="config.value">
      <el-radio v-for="(item, key) in config.list" :key="key" :label="item.value">{{item.text}}</el-radio>
    </el-radio-group>
    <!-- checkbox -->
    <el-checkbox-group v-if="config.type === 'checkbox'" v-model="config.value">
      <el-checkbox
        v-for="(item, key) in config.list"
        :key="key"
        :label="item.text"
        :value="item.value"
      ></el-checkbox>
    </el-checkbox-group>
    <!-- switch -->
    <el-switch v-if="config.type === 'switch'" v-model="config.value"></el-switch>
    <!-- date -->
    <el-date-picker
      v-if="config.type === 'date'"
      type="date"
      :placeholder="config.placeholder || ''"
      v-model="config.value"
      :style="config.style || {}"
    ></el-date-picker>
    <!-- time -->
    <el-time-picker
      v-if="config.type === 'time'"
      :placeholder="config.placeholder"
      v-model="config.value"
      :style="config.style || {}"
    ></el-time-picker>

    <!-- dateTime -->
    <el-col :span="11" v-if="config.type == 'dateTime'">
      <el-date-picker
        type="date"
        v-model="config.date.value"
        :placeholder="config.date.placeholder"
        :style="config.style"
      ></el-date-picker>
    </el-col>
    <el-col class="line" v-if="config.type == 'dateTime'" :span="2">-</el-col>
    <el-col :span="11" v-if="config.type == 'dateTime'">
      <el-time-picker
        v-model="config.time.value"
        :placeholder="config.time.placeholder"
        :style="config.style"
      ></el-time-picker>
    </el-col>

    <!-- buttons -->
    <template v-if="config.type == 'buttons'">
      <el-button
        v-for="(item, index) in config.list"
        :type="item.type || ''"
        @click="item.handler"
        :key="index"
      >{{item.label}}</el-button>
    </template>
  </el-form-item>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
};
</script>

<style lang="less">
.el-textarea__inner,
.el-input__inner {
  font-size: 0.875rem !important;
  font-family: Arial, Helvetica, sans-serif !important;
}
</style>