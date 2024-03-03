<script setup>
import { ref } from 'vue'
const text = ref()
const input = ref()
</script>

<template>
    <el-header>
        <el-input v-model="input" placeholder="输入文章标题..." style="width: 93%"/>
        <el-button type="primary">发布</el-button>
        <el-avatar> user </el-avatar>
    </el-header>
    <el-main>
        <v-md-editor v-model="text" height="400px"></v-md-editor>
    </el-main>
</template>

<style>

</style>