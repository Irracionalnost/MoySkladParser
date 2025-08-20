<script setup>
import { ref } from 'vue';
import TextBlock from './TextBlock.vue';

const textBefore = ref('');
const textAfter = ref('');

function clearText() {
  textBefore.value = '';
  textAfter.value = '';
}

function updateText(val) {
  textBefore.value = val;
  textAfter.value = val + '5';
}

function copyText() {
  let btn = document.getElementById('#copy_btn');
  navigator.clipboard
    .writeText(textAfter.value)
    .then(() => {
      if (btn.innerText !== '✔ Готово') {
        const originalText = btn.innerText;
        btn.innerText = '✅ Готово';
        setTimeout(() => {
          btn.innerText = originalText;
        }, 1500);
      }
    })
    .catch(() => {
      alert('something went wrong');
    });
}
</script>

<template>
  <div class="row gap-5">
    <div class="col d-flex justify-content-end">
      <button @click="clearText" type="button" class="btn btn-primary rounded-3 px-4 py-1">
        Очистить
      </button>
    </div>
    <div class="col d-flex justify-content-end">
      <button
        @click="copyText"
        type="button"
        class="btn btn-primary rounded-3 px-4 py-1"
        id="#copy_btn"
      >
        Скопировать
      </button>
    </div>
  </div>
  <div class="row mt-3 gap-5">
    <div class="col">
      <TextBlock :text-value="textBefore" @update-value="(val) => updateText(val)" />
    </div>
    <div class="col">
      <TextBlock :text-value="textAfter" @update-value="(val) => (textAfter = val)" />
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
