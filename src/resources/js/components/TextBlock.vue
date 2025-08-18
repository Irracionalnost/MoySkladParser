<script setup>
defineProps({
  editBlock: {
    type: Boolean,
    dafault: false,
  },
});
</script>
<template>
  <div class="text-block px-4 py-3 rounded-4" contenteditable></div>
</template>

<style lang="scss" scoped>
.text-block {
  background-color: var(--text-block-background);
  color: var(--text-block-color);
  border: 3px solid var(--text-block-border);
  min-height: 600px;
}
</style>
