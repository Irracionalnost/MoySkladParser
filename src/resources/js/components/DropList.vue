<script setup>
import { ref } from 'vue';
const emit = defineEmits(['changeMode']);

const selected = ref('moysklad');

function changeMode() {
  emit('changeMode', selected.value);
}
</script>

<template>
  <select
    v-model="selected"
    name="lang"
    class="form-select form-select-lg w-25 droplist"
    @change="changeMode"
  >
    <option value="moysklad" selected>Статья МойСклад</option>
    <option value="kladana">Статья Kladana</option>
  </select>
</template>

<style>
.droplist {
  border: 3px solid var(--select-border) !important;
}

.droplist:focus {
  box-shadow: none !important;
}
</style>
