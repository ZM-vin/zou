<script setup>
import {ref,computed} from 'vue'
import { Compass, List, ArrowRight,View, Pointer } from '@element-plus/icons-vue'
import { articleShow } from '@/api/article.js'
import { useRouter } from 'vue-router'

import { userLikesArticleId } from '@/api/user'
///import {addLikesArticleId,likeArticleAdd,likeArticleDel,likeArticleIdDel } from '@/api/user'
 const router = useRouter()



const articleList = ref([])
const show = async () => {
    const res = await articleShow()
    console.log(res)
    articleList.value = res.data
    console.log(articleList)
}
show()


//文章榜
const newArticleList = ref(articleList)
const sortedItems = computed(() => newArticleList.value.slice().sort((a, b) => b.views - a.views))
console.log(newArticleList.value)
const ellipsis = (content) => {
    if (content.length > 10)
    {
        return content.slice(0,42)+'...'
    }
    return content
}
const save = (titlt) => {
    if (titlt.length > 10) {
        return titlt.slice(0, 10) + '...'
    }
    return titlt
}


//const article = ref({})
//!!点赞按钮
//const turnup=ref(false)//判断是否高亮
//获取已点赞文章的id
const likesId = ref([])
const likesIdShow = async (id) => {
    const res = await userLikesArticleId()
    const abc = ref(true)
    const def = ref('')
    likesId.value = res.data.data
    console.log(likesId.value)
    for (let i = 0; i < likesId.value.length; i++) {
        if (likesId[i] === id) {
            //turnup.value = true
            abc.value = false
            def.value = 'primary'
            console.log(true)
            return def
        }
    }
    if (abc.value)
    {
        def.value = 'info'
        console.log(false)
        return def
    }
}
    
//likesIdShow()

//判断点赞按钮是否需要高亮
/*const light = (id) => {
        //turnup.value = false
        likesId.value.forEach(item => {
        if (item === id)
        {
            //turnup.value = true
            console.log(true)
            return true
            }
        })
    console.log(false)
    return false
}*/



/*//添加点赞文章的id
const likesIdAdd = async () => {
    await addLikesArticleId(likesId.value)
}

//点赞文章
const add=ref(true)//判断已点赞否
const addLike = async (id,i) => {
    likesId.value.forEach(item => {
        if (item === id)
        {
            add.value=false
        }
    })
    if (add.value) {//添加点赞文章的id及文章内容
        //console.log(turnup)
        turnup.value = true
        article.value=articleList.value[i]
        await likeArticleAdd(article.value)
        likesId.value.push(id)
        likesIdAdd()
    }
    else {////删除点赞文章的id及文章内容
        const back = await likeArticleDel(id)
        console.log(back)
        likesId.value = likesId.value.filter(item => item!==id)
        const result = await likeArticleIdDel(likesId.value)
        turnup.value = false
        console.log(result.data)
    }
}*/

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
                        <li style="cursor:pointer" v-for="(item,index) in articleList" :key="item.id" @click="router.push({path:'/article/detail',query:{id:item.id}})">
                            <div >
                                 <el-row :gutter="20">
                                    <el-col :span="19">
                                        <div class="grid-content ep-bg-purple">
                                            <div style="padding-bottom: 15px;padding-top: 15px;">
                                                <div style="font-weight:600;color:black;padding-bottom: 5px;">{{ item.title }}</div>
                                                <div style="font-size: smaller;color: #999fab;padding-bottom: 5px;">
                                                    {{ ellipsis(item.content) }}
                                                </div>
                                                <div style="font-size: smaller;color: #999fab;"><span>{{ item.author }}</span><el-divider direction="vertical" /><span><el-icon><View /></el-icon>&nbsp;{{item.views}}</span>&nbsp;&nbsp;&nbsp;
                                                    <span><el-button  @click="addLike(item.id,index)" :icon="Pointer" :type=likesIdShow() link>&nbsp;{{ item.likes }}</el-button></span>
                                                </div>
                                            </div>
                                        </div>
                                    </el-col>
                                    <el-col :span="5" v-if="item.pic"><div class="grid-content ep-bg-purple" />
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
                            <li v-for="(item,index) in sortedItems" :key="item.id" style="cursor:pointer" @click="router.push({path:'/article/detail',query:{id:item.id}})">
                                <span style="color:#f85f5f">{{ index+1 }}</span>&nbsp;&nbsp;&nbsp;
                                <span style="font-size: small" :title="item.title"><a>{{ save(item.title) }}</a></span>
                            </li>
                            <!--<li>
                                <span style="color:#fd9961">2</span>&nbsp;&nbsp;&nbsp;
                                <span style="font-size: small" :title="sortedItems[1].title"><a>{{ save(sortedItems[1].title) }}</a></span>
                            </li>
                            <li>
                                <span style="color:#ffbb3a">3</span>&nbsp;&nbsp;&nbsp;
                                <span style="font-size: small" :title="newArticleList[2].title"><a>{{ save(newArticleList[2].title) }}</a></span>
                            </li>
                            <li>
                                <span style="color:#8a919f">4</span>&nbsp;&nbsp;&nbsp;
                                <span style="font-size: small" :title="newArticleList[3].title"><a>{{ save(newArticleList[3].title) }}</a></span>
                            </li>
                            <li>
                                <span style="color:#8a919f">5</span>&nbsp;&nbsp;&nbsp;
                                <span style="font-size: small" :title="newArticleList[4].title"><a>{{ save(newArticleList[4].title) }}</a></span>
                                
                            </li>-->
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