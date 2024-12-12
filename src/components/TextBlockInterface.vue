<script setup>
import TextBlock from './TextBlock.vue';

const text1 = defineModel('text1')
const text2 = defineModel('text2')


const clearText = () => {
    text1.value = ''
    text2.value = ''
}

const copyText = () => {
let btn = document.getElementById('copy-btn')
navigator.clipboard
.writeText(text2.value)
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
</script>

<template>
<div class="content">
    <div class="block">
        <button @click="clearText">Очистить текст</button>
        <TextBlock id="textBefore" v-model="text1"/>
    </div>
    <div class="block">
        <button @click="copyText" id="copy-btn">Скопировать</button>
        <TextBlock id="textAfter" v-model="text2"/>
    </div>
</div>
</template>

<style scoped>
.content{
    width: 86%;
    margin: 0 auto;
    display: flex;
    gap:100px;
}
.flex-between{
    display: flex;
    justify-content: space-between;
}
.block{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap:35px;
}
button{
    width: 200px;
    height: 50px;
    border-radius: 30px;
    color: white;
    border: 3px rgb(11, 163, 11) solid;
    background-color: rgb(13, 209, 13);
    font-size: 16px;
    font-weight: 700;
}
</style>