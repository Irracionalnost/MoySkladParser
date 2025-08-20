<script setup>
import { ref, onMounted, watch } from 'vue';

import DOMPurify from 'dompurify';
const props = defineProps({
  textValue: {
    type: String,
    default: '',
  },
});

const editor = ref(null);

const emit = defineEmits(['updateValue']);

function updateContent() {
  emit('updateValue', editor.value.innerHTML);
}

function handlePaste(e) {
  e.preventDefault();

  let html = e.clipboardData.getData('text/html') || e.clipboardData.getData('text/plain');

  html = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['ul', 'ol', 'li', 'b', 'i', 'a'],
    ALLOWED_ATTR: ['href', 'target'],
  }).trim();

  emit('updateValue', html);
}

onMounted(() => {
  editor.value.innerHTML = props.textValue;
});

watch(
  () => props.textValue,
  (val) => {
    if (editor.value && editor.value.innerHTML !== val) {
      editor.value.innerHTML = val;
    }
  }
);
</script>

<template>
  <div
    class="text-block px-4 py-3 rounded-4"
    contenteditable
    ref="editor"
    @input="updateContent"
    @paste="handlePaste"
  ></div>
</template>

<style lang="scss" scoped>
.text-block {
  background-color: var(--text-block-background);
  color: var(--text-block-color);
  border: 3px solid var(--text-block-border);
  min-height: 600px;

  &:focus {
    outline: none;
    border-color: var(--text-block-focus);
  }

  & ul {
    list-style: disc;
    margin-left: 1.5rem;
    padding-left: 0;
  }
  & li {
    margin-bottom: 0.25rem;
  }
}
</style>
