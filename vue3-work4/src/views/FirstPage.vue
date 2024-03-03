<script setup>
import {ref} from 'vue'
import { Compass, List, ArrowRight,View, Pointer } from '@element-plus/icons-vue'
import { articleShow } from '@/api/article.js'
import { useRouter } from 'vue-router'

 const router = useRouter()

const articleList = ref([])
const show = async () => {
    const res = await articleShow()
    console.log(res)
    articleList.value = res.data
    console.log(articleList)
}
show()

const ellipsis = (content) => {
    if (content.length > 10)
    {
        return content.slice(0,42)+'...'
    }
    return content
}
const tt = '这才开工没几天收到Offer了，简历改的好，找工作没烦恼。'
const save = (titlt) => {
    if (titlt.length > 10) {
        return titlt.slice(0, 10) + '...'
    }
    return titlt
}
</script>
<template>
    <div class="all">
        <el-row :gutter="15">
            <!--综合-->
            <el-col :span="5"  >
                <div class="grid-content ep-bg-purple" style="margin-left: 100px;">
                    <el-menu
                    active-text-color="#1e80ff"
                    text-color="#1e80ff"
                    >
                    <el-menu-item>
                        <el-icon style="color:#1e80ff">
                            <Compass />
                        </el-icon>
                        <span>综合</span>
                    </el-menu-item>
                    </el-menu>
                </div>
            </el-col>

            <!--最新文章-->
            <el-col :span="12">
                <div class="grid-content ep-bg-purple" >
                    <div>
                        <el-menu
                            active-text-color="#1e80ff"
                            background-color="#fefefe"
                            text-color="#515767"
                            :default-active="$route.path"
                            :ellipsis="false"
                            mode="horizontal"
                            router
                        >
                        <el-menu-item index="/first">最新</el-menu-item>
                        </el-menu>
                    </div>
                    <ul>
                        <li v-for="item in articleList" :key="item.id" @click="router.push({path:'/article/detail',query:{id:item.id}})">
                            <div >
                                 <el-row :gutter="20">
                                    <el-col :span="19">
                                        <div class="grid-content ep-bg-purple">
                                            <div style="padding-bottom: 15px;padding-top: 15px;">
                                                <div style="font-weight:600;color:black;padding-bottom: 5px;">{{ item.title }}</div>
                                                <div style="font-size: smaller;color: #999fab;padding-bottom: 5px;">
                                                    {{ ellipsis(item.content) }}
                                                </div>
                                                <div style="font-size: smaller;color: #999fab;"><span>{{ item.author }}</span><el-divider direction="vertical" /><span><el-icon><View /></el-icon>&nbsp;{{item.views}}</span>&nbsp;&nbsp;&nbsp;<span><el-icon><Pointer /></el-icon>&nbsp;{{ item.likes }}</span></div>
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="5"><div class="grid-content ep-bg-purple" />
                                        <el-image style="width: 108px; height: 72px;margin-top: 10px;" :src="item.pic" :fit="fit" />
                                    </el-col>
                                </el-row> 
                            </div>
                        </li>
                    </ul>
                </div>
            </el-col>

            <!--文章榜-->
            <el-col :span="7">
                <div class="grid-content ep-bg-purple" style="margin-right: 120px;padding-bottom: 20px;">
                    <div style="margin-left: 10px;padding-top: 10px;">
                        <span style="width: 20px;height: 20px; border-radius: 50%;text-align: center; background-color: #ffa382;margin-right: 10px;margin-left: 30px"><el-icon color="#ffffff"><List /></el-icon></span>
                        <span>文章榜</span>
                        <el-divider />
                        <ul>
                            <li>
                                <span style="color:#f85f5f">1</span>&nbsp;&nbsp;&nbsp;
                                <span style="font-size: small" :title="tt"><a>{{ save(tt) }}</a></span>
                            </li>
                            <li>
                                <span style="color:#fd9961">2</span>&nbsp;&nbsp;&nbsp;
                                <span style="font-size: small" :title="tt"><a>{{ save(tt) }}</a></span>
                            </li>
                            <li>
                                <span style="color:#ffbb3a">3</span>&nbsp;&nbsp;&nbsp;
                                <span style="font-size: small" :title="tt"><a>{{ save(tt) }}</a></span>
                            </li>
                            <li>
                                <span style="color:#8a919f">4</span>&nbsp;&nbsp;&nbsp;
                                <span style="font-size: small" :title="tt"><a>{{ save(tt) }}</a></span>
                            </li>
                            <li>
                                <span style="color:#8a919f">5</span>&nbsp;&nbsp;&nbsp;
                                <span style="font-size: small" :title="tt"><a>{{ save(tt) }}</a></span>
                                
                            </li>
                        </ul>
                        <el-divider />
                    </div>
                    <div style="margin-left: 120px">
                        <el-link type="info">查看更多<el-icon color="#9fa4b0"><ArrowRight /></el-icon></el-link>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<style>
.all {
    width: 100%;
    height: 100%;
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

ul {
  list-style-type: none;
}

.article {
    width: 1000px;
    overflow:hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    display: -webkit-box;
}
</style>