<script setup>
const text = defineModel()
const update = inptext =>{
    text.value = inptext
}
</script>
<template>
    <div class="text-block" contenteditable="true" @input="update($event.target.innerText)"> {{ text }}  
    </div>
</template>

<style scoped>
.text-block{
    width: 750px;
    height: 600px;
    border: 3px rgb(11, 163, 11) solid;
    border-radius: 8px;
    background-color: azure;
}
</style>