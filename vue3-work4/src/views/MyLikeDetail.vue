<script setup lang="ts">
import { Pointer,Comment, Clock, View } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import {myLikeArticleShow} from '@/api/user.js'

import MarkdownIt from "markdown-it"

import { userLikesArticleId,addLikesArticleId,likeArticleAdd,likeArticleDel,likeArticleIdDel } from '@/api/user'

import { userIdShow } from '@/api/user'
import { userPhotoShow } from '@/api/user'
import { userNameShow } from '@/api/user'

import emoji from '@/assets/emoji/emoji'
import { reactive } from 'vue'
import { CommentApi, ConfigApi, SubmitParamApi, UToast, createObjectURL, dayjs } from 'undraw-ui'

//点击评论跳转到对应位置
const jump = (domId) => {
    // 当前窗口正中心位置到指定dom位置的距离
    //页面滚动了的距离
    let height = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    //指定dom到页面顶端的距离
    let dom = document.getElementById(domId);
    let domHeight = dom.offsetTop + 60;
    //滚动距离计算
    var S = Number(height) - Number(domHeight);
    //判断上滚还是下滚
    if (S < 0) {
        //下滚
        S = Math.abs(S);
        window.scrollBy({ top: S, behavior: "smooth" });
    } else if (S == 0) {
        //不滚
        window.scrollBy({ top: 0, behavior: "smooth" });
    } else {
        //上滚
        S = -S
        window.scrollBy({ top: S, behavior: "smooth" });
    }
}

const markdown = new MarkdownIt()

const article = ref({})

const route = useRoute()
const id = route.query.id
const title = ref('')
const content = ref('')
const author = ref('')
const createdtime = ref('')
const views = ref()
const readtime = ref()
const articleComment = ref([])
const articleShow = async (id) => {
    const res = await myLikeArticleShow(id)
    console.log(res.data[0])
    article.value = res.data[0]
    content.value = res.data[0].content
    title.value = res.data[0].title
    author.value = res.data[0].author
    createdtime.value = res.data[0].createdtime
    views.value = res.data[0].views
    readtime.value = res.data[0].readtime
    articleComment.value = res.data[0].comment
    console.log(articleComment.value)
    config.comments= res.data[0].comment
}
articleShow(id)

const userId = ref()
const userName = ref('')
const userAvatar = ref('')
const photoshow = async () => {
    const res = await userPhotoShow()
    userAvatar.value = res.data.avatar
}//头像
photoshow()

const nameShow = async () => {
    const res = await userNameShow()
    userName.value = res.data.name
}
nameShow()

const idShow = async () => {
    const res = await userIdShow()
    userId.value = res.data.id
}
idShow()


//!!点赞按钮
//判断点赞按钮是否需要高亮
const light = () => {
        likesId.value.forEach(item => {
        if (item === id)
        {
            turnup.value = true
            console.log(turnup.value)
        }
    })
}

//获取已点赞文章的id
const likesId = ref([])
const likesIdShow = async () => {
    const res = await userLikesArticleId()
    likesId.value = res.data.data
    console.log(likesId.value)
    light()
}
likesIdShow()


//添加点赞文章的id
const likesIdAdd = async () => {
    const res = await addLikesArticleId(likesId.value)
}

//点赞文章
const turnup=ref(false)
const add=ref(true)
const addLike = async () => {
    likesId.value.forEach(item => {
        if (item === id)
        {
            add.value=false
        }
    })
    if (add.value) {//添加点赞文章的id及文章内容
        console.log(turnup)
        turnup.value = true
        const res = await likeArticleAdd(article.value)
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
}



const config = reactive<ConfigApi>({
    user: {
        id: userId,
        username: userName,
        avatar: userAvatar,
        // 评论id数组 建议:存储方式用户uid和评论id组成关系,根据用户uid来获取对应点赞评论id,然后加入到数组中返回
        likeIds: [1, 2, 3]
    },
    emoji: emoji,
    comments: [],
    showLevel: false,
    showHomeLink: false,
    showAddress: false,
    placeholder: '平等表达，友善发言'
})

let temp_id = 100
// 提交评论事件
const submit = ({ content, parentId, files, finish }: SubmitParamApi) => {
    console.log('提交评论: ' + content, parentId, files)
    temp_id += 1
    const comment: CommentApi = {
        id: String(temp_id),
        parentId: parentId,
        uid: config.user.id,
        content: content,
        likes: 0,
        createTime: '2023-04-30 16:22',//dayjs().subtract(5, 'seconds').toString(),
        user: {
            username: config.user.username,
            avatar: config.user.avatar,
        },
        reply: null
    }
    setTimeout(() => {
        finish(comment)
        UToast({ message: '评论成功!', type: 'info' })
    }, 200)
}
// 点赞按钮事件 将评论id返回后端判断是否点赞，然后在处理点赞状态
const like = (id: string, finish: () => void) => {
    console.log('点赞: ' + id)
    setTimeout(() => {
        finish()
    }, 200)
}





</script>

<template>
    <div class="all">
        <el-row>
            <!--点赞评论-->
            <el-col :span="2" :offset="1">
                <div class="content" style="display:flex;flex-direction:column">
                    <div><el-button v-show="turnup" :icon="Pointer" circle size="large" @click="addLike()" type="primary"/></div>
                    <div><el-button v-show="!turnup" :icon="Pointer" circle size="large" @click="addLike()"/></div>
                    <div style="margin-top: 10px"><el-button :icon="Comment" circle size="large" @click="jump('here')"/></div>
                </div>
            </el-col>

            <!--内容展示-->
            <el-col :span="10">
                <div class="grid-content ep-bg-purple">
                    <h3>{{ title }}</h3>
                    <div>
                        <span>
                            <el-link>{{ author }}</el-link>&nbsp;&nbsp;
                            <span style="color:#8a919f">{{ createdtime }}</span>&nbsp;&nbsp;
                            <span style="color:#8a919f"><el-icon><View /></el-icon>&nbsp;{{ views }}</span>&nbsp;&nbsp;
                            <span style="color:#8a919f"><el-icon><Clock /></el-icon>&nbsp;阅读{{ readtime }}分钟</span>
                        </span>
                        <div v-html="markdown.render(content)">

                        </div>
                    </div>
                </div>

                <!--评论-->
                  <u-comment :config="config" upload @submit="submit" @like="like" relative-time></u-comment>
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

.content {
    background-color: #f2f3f5;
    border-radius: 4px;
}

.grid-content {
background-color: #ffffff;
border-radius: 4px;
margin:4px;
}
</style>