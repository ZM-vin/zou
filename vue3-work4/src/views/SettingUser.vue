<script setup>
import { ArrowLeft,List,UserFilled  } from '@element-plus/icons-vue'
</script>

<template>
    <el-container style="background-color:#f2f3f5 ;">
        <el-header>
            <div class="head" >
                <a href="/user" style="color: #398fff;text-decoration-line: none">
                    <el-icon ><ArrowLeft /></el-icon><span>返回个人主页</span>
                </a>
            </div>
        </el-header>
        <el-container>
            <el-aside width="350px">
                <div class="left">
                    <el-menu
                    default-active="$route.path"
                    router
                    >
                    <el-menu-item index="/user/settinguser/detail">
                    <el-icon><List /></el-icon>
                    <span>个人资料</span>
                    </el-menu-item>
                    <el-menu-item index="/user/settinguser/editor">
                    <el-icon><UserFilled /></el-icon>
                    <span>账号设置</span>
                    </el-menu-item>
                    </el-menu>
                </div>
            </el-aside>
            <div class="right">
                <el-main><router-view></router-view></el-main>
            </div>   
        </el-container>
    </el-container>
</template>

<style>
.head {
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 55px;
    margin-right: 110px;
    padding: 10px;
    box-shadow:-5px -5px -5px -5px;
    border-radius: 4px;
    background-color:#ffffff;

}

.left {
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 75px;
    margin-right: 30px;
    padding: 10px;
    box-shadow:-5px -5px -5px -5px;
    border-radius: 4px;
    background-color:#ffffff;
}

.right {
    width: 65%;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-right: 40px;
    padding: 10px;
    box-shadow:-5px -5px -5px -5px;
    border-radius: 4px;
    background-color:#ffffff;
}
</style>