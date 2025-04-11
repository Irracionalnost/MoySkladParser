<script setup>
import { Parser } from '../assets/scripts/Parser.js'
import { ParserInterface } from '@/assets/scripts/ParserInterface.js'
const textAfter = defineModel('textAfter')

const clearText = () => {
  document.getElementById('text-before').innerText = ''
  textAfter.value = ''
}

const copyText = () => {
  let btn = document.getElementById('copy-btn')
  navigator.clipboard
    .writeText(textAfter.value)
    .then(() => {
      if (btn.innerText !== '✔ Готово') {
        const originalText = btn.innerText
        btn.innerText = '✔ Готово'
        setTimeout(() => {
          btn.innerText = originalText
        }, 1500)
      }
    })
    .catch(() => {
      alert('something went wrong')
    })
}

const inputText = (value) => {
  const parser = new Parser(value)
  const myinterface = new ParserInterface(parser.start(), 'kladana')
  textAfter.value = myinterface.start()
}
</script>

<template>
  <div class="content">
    <div class="block">
      <button @click="clearText">Очистить текст</button>
      <div
        id="text-before"
        class="text-block"
        contenteditable="true"
        @input="inputText($event.target.innerHTML)"
      ></div>
    </div>
    <div class="block">
      <button @click="copyText" id="copy-btn">Скопировать</button>
      <textarea class="text-block" v-model="textAfter"></textarea>
    </div>
  </div>
</template>

<style scoped>
.content {
  width: 86%;
  margin: 0 auto;
  display: flex;
  gap: 100px;
}

.flex-between {
  display: flex;
  justify-content: space-between;
}

.block {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 35px;
}

.text-block {
  width: 750px;
  height: 600px;
  border: 3px rgb(11, 163, 11) solid;
  border-radius: 8px;
  background-color: azure;
  padding: 20px 10px 10px 30px;
  white-space: pre-line;
  overflow-y: scroll;
  overflow-x: hidden;
  font-size: 16px;
}

button {
  width: 200px;
  height: 50px;
  border-radius: 30px;
  color: white;
  border: 3px rgb(11, 163, 11) solid;
  background-color: rgb(13, 209, 13);
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
}
</style>
