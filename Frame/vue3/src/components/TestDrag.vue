<template>
  <div>
    TestDrag
    <VueDraggableNext
      :list="myArray"
      group="people"
      @start="drag = true"
      @end="drag = false"
      item-key="id"
    >
      <div
        class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
        v-for="element in myArray"
        :key="element.label"
      >
        {{ element.label }}
      </div>
    </VueDraggableNext>
  </div>
</template>

<script setup lang="ts">
// 拖拽组件测试
// import draggable from "vuedraggable"
import { VueDraggableNext } from "vue-draggable-next";

import { ref } from "vue";

const a = [
  {
    prop: "id",
    label: "素材序号",
    fixed: "left",
    stayOrigin: true,
    clipboard: true,
  },
  {
    prop: "name",
    label: "素材名称",
    fixed: "left",
    clipboard: true,
    showOverflowTooltip: true,
    minWidth: 150,
  },
  { prop: "typeTxt", label: "素材分类", width: 80 },
  {
    prop: "video",
    label: "关联剧集",
    clipboard: true,
    showOverflowTooltip: true,
    width: 120,
  },
  { prop: "episodeTypeTxt", label: "剧集类型", width: 80 },
  { prop: "appName", label: "产品名称", width: 80 },
  { prop: "sheetTypeTxt", label: "推广需求类型", width: 120 },
  { prop: "deliverTypeTxtArr", label: "投放类型", width: 80 },
  { prop: "strategyTxtArr", label: "目标策略", width: 130 },
  {
    prop: "activityOrSpecialName",
    label: "活动/专项名称",
    minWidth: 120,
    clipboard: true,
    showOverflowTooltip: true,
  },
  { prop: "pullLinks", label: "拉起链接", minWidth: 120 },
  { prop: "placeCodes", label: "渠道码", width: 110 },
  { prop: "fvCodes", label: "FV码", width: 110 },
  { prop: "desc", label: "素材文案", minWidth: 80, showOverflowTooltip: true },
  {
    prop: "longLink",
    label: "长视频链接",
    width: 120,
    clipboard: true,
    showOverflowTooltip: true,
  },
  {
    prop: "shortLink",
    label: "短视频链接",
    width: 100,
    clipboard: true,
    showOverflowTooltip: true,
  },
  { prop: "uploadTimeTxt", label: "上传时间", width: 150 },
  { prop: "updateTimeTxt", label: "最后修改时间", width: 150 },
  { prop: "lastAuditTimeTxt", label: "最后审核时间", width: 150 },
  {
    prop: "auditReason",
    label: "不通过原因",
    width: 150,
    clipboard: true,
    showOverflowTooltip: true,
  },
  {
    prop: "auditRemark",
    label: "备注",
    width: 150,
    clipboard: true,
    showOverflowTooltip: true,
  },
  { prop: "auditStatusTxt", label: "审核状态", width: 100, fixed: "right" },
  { prop: "operations", label: "操作", minWidth: 200, fixed: "right" },
];
const myArray = ref(a);

const drag = ref(true);
</script>

<style lang="less" scoped>
</style>