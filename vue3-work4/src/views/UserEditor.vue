<script setup>
import {ref} from 'vue'
const input = ref()
</script>

<template>
    <el-container>
        <el-header>
            <div class="bigtitle">账号设置</div>
            <el-divider />
        </el-header>
        <el-main>
            <div>
                <span style="width: 10rem">修改密码</span>
                <el-input v-model="input" style="width:80%" placeholder="请输入新密码" />
            </div>
        </el-main>
    </el-container>
</template>

<style>
.bigtitle {
    font-size: 25px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    padding: 0 0 20px 0;
}
</style>