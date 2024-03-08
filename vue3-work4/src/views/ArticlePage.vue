<script setup>
import { ref } from 'vue'
import { articleAdd } from '@/api/user.js'
import { userPhotoShow } from '@/api/user'
import { formatTime } from '@/utils/format.js'
import { userNameShow } from '@/api/user'


//头像展示
const imgText = ref('')
const show = async () => {
    const res = await userPhotoShow()
    imgText.value = res.data.avatar
}
show()

//获取用户名
const username = ref('')
const nameShow = async () => {
    const res = await userNameShow()
    username.value = res.data.name
}
nameShow()

const time = formatTime(new Date())
const text = ref('')
const input = ref('')
const submit = async () => {
    const newarticle = {
        title: text.value,
        content: input.value,
        author: username.value,
        views: 0,
        likes: 0,
        createdtime: time,
        comment:[]
}
    const res = await articleAdd(newarticle)
    console.log(res.data)
    console.log(newarticle)
    console.log(input.value)
    console.log(text.value)
}

</script>

<template>
    <el-header>
        <el-input v-model="input" placeholder="输入文章标题..." style="width: 90%"/>
        <el-button type="primary" @click="submit">发布</el-button>
        <span class="head">
            <el-avatar :src="imgText"> </el-avatar>
        </span>
    </el-header>
    <el-main>
        <v-md-editor v-model="text" height="400px"></v-md-editor>
    </el-main>
</template>

<style>
.head {
    position:absolute;
    top: 5px;
    right: 10px;
}
</style>