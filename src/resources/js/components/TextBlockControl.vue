<script setup>
import TextBlock from './TextBlock.vue';
</script>
<template>
  <div class="row gap-5">
    <div class="col d-flex justify-content-end">
      <button type="button" class="btn btn-primary rounded-3 px-4 py-1">Очистить</button>
    </div>
    <div class="col d-flex justify-content-end">
      <button type="button" class="btn btn-primary rounded-3 px-4 py-1">Скопировать</button>
    </div>
  </div>
  <div class="row mt-3 gap-5">
    <div class="col">
      <TextBlock :edit-block="true" />
    </div>
    <div class="col">
      <TextBlock />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.btn {
  min-width: 150px;
  min-height: 40px;

  &-primary {
    background-color: var(--button-background);
    border-color: var(--button-border) !important;
    color: var(--button-text);

    &:hover {
      background-color: var(--button-hover);
      border-color: var(--button-hover);
    }

    &:active,
    &.active {
      background-color: var(--button-active) !important;
      border-color: var(--button-active) !important;
    }
  }
}
</style>
