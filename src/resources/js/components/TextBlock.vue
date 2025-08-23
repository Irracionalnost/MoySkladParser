<script setup>
const emit = defineEmits(['updateText']);

defineProps({
  textAfter: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <textarea
    class="text-block px-4 py-3 rounded-4 overflow-y-auto"
    :value="textAfter"
    @input="
      emit('updateText', $event.target.value);
      console.log($event);
    "
  ></textarea>
</template>

<style lang="scss" scoped>
.text-block {
  background-color: var(--text-block-background);
  color: var(--text-block-color);
  border: 3px solid var(--text-block-border);
  min-height: 650px;
  width: 100%;
  font-size: 18px;

  &:focus {
    outline: none;
    border-color: var(--text-block-focus);
  }
}
</style>
