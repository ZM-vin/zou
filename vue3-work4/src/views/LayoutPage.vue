<script lang="ts" setup>
import { ref } from 'vue'
import { userPhotoShow } from '@/api/user'
import router from '@/router'
const write = () => {
    router.push('/article')
}

//头像
const imgText = ref('')
const show = async () => {
    const res = await userPhotoShow()
    console.log(res.data)
    imgText.value = res.data.avatar
    console.log(imgText.value)
}
show()
</script>

<template>
    <div>
        <el-container>
            <el-header>
               <el-menu
                    active-text-color="#1e80ff"
                    background-color="#fefefe"
                    text-color="#515767"
                    :default-active="$route.path"
                    :ellipsis="false"
                    mode="horizontal"
                    router
                >
                    <!--logo-->
                    <el-menu-item>
                        <img src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg" style="width: 107px;height: 22px"/>
                    </el-menu-item>

                    <!--首页-->
                    <el-menu-item index="/first">首页</el-menu-item>
                    <div class="flex-grow" />
                    <!--创作者中心-->
                    <el-sub-menu>
                    <template #title>创作者中心</template>
                    <el-menu-item @click="write">写文章</el-menu-item>
                    </el-sub-menu>
                    
                    <!--头像-->
                    <el-sub-menu index="/user">
                        <template #title>
                            <div class="demo-type">
                                <el-avatar :src="imgText"></el-avatar>
                            </div>
                        </template>
                        <el-menu-item index="/user">我的主页</el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </el-header>

            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<style>
.flex-grow {
  flex-grow: 1;
}
.demo-type {
  display: flex;
}
</style>

