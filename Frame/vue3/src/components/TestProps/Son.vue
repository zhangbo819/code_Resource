<template>
  <div>
    <h1>son</h1>
    {{ props }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue?: any }>();

const emit = defineEmits(['update:modelValue'])
setTimeout(() => {
    emit('update:modelValue', { b: '子组件传过来的' } )
}, 3000)
</script>
