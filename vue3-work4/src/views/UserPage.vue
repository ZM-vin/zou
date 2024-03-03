<script setup>
import imgText from '@/assets/picture.jpg'
import router from '@/router';
const count = 2
const setting = () => {
    router.push('/user/settinguser')
}
</script>

<template>
    <div class="all">
        <el-row>
            <el-col :span="3"><div class="grid-content ep-bg-purple" /></el-col>
            <el-col :span="15">
                <div class="grid-content ep-bg-purple">
                    <div>
                        <div class="userphoto">
                            <el-avatar :size="150" :src="imgText"/>
                        </div>
                        <div class="setbutton">
                            <el-button type="primary" @click="setting()" plain >设置</el-button> 
                        </div>   
                    </div>
                    <div>
                        <el-menu
                            :default-active="$route.path"
                            mode="horizontal"
                            router
                        >
                            <el-menu-item index="/user/myarticle">文章</el-menu-item>
                            <el-menu-item index="/user/mylike">赞{{ count }}</el-menu-item>
                        </el-menu>
                        <router-view></router-view>
                    </div>    
                </div>
            </el-col>
            <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
        </el-row>
    </div>
</template>

<style>
.all {
    width: 100%;
    height: 100%;
    position:fixed;
    background-color:#f2f3f5;
}
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
background-color: #ffffff;
border-radius: 4px;
margin:4px;
}

.setbutton {
    position:relative;
    left: 800px;
}

.userphoto {
    position:relative;
    left: 10px;
}
</style>