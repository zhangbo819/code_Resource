<template>
  <!-- <h1>form</h1> -->
  <!-- ref="refForm" -->
  <el-form
    :model="dynamicValidateForm"
    label-width="100px"
    class="demo-dynamic"
    @validate="onValidate"
  >
    <el-form-item
      prop="email"
      label="邮箱"
      :rules="[
        { required: true, message: '请输入邮箱地址', trigger: 'change' },
        // {
        //   type: 'email',
        //   message: '请输入正确的邮箱地址',
        //   trigger: ['blur', 'change'],
        // },
      ]"
    >
      <el-input v-model="dynamicValidateForm.email"></el-input>
    </el-form-item>

    <el-form-item
      prop="name"
      label="名字"
      :rules="[
        { required: true, message: '请输入邮箱名字', trigger: 'change' },
      ]"
    >
      <el-input v-model="dynamicValidateForm.name"></el-input>
    </el-form-item>
  </el-form>

  {{ dynamicValidateForm.email }}

  <!-- {{ dynamicValidateForm }} -->
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElForm, ElFormItem, ElInput, FormItemProp } from "element-plus";

const dynamicValidateForm = ref({ email: "", name: "" });


const onValidate = (prop: FormItemProp, isValid: boolean, message: string) => {
  console.log("prop, isValid, message: ", prop, isValid, message);
};
</script>

<style scoped></style>
