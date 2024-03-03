<script setup lang="ts">
import { Pointer,Comment, Clock, View } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import {articleDetailShow} from '@/api/article.js'

import MarkdownIt from "markdown-it"

import emoji from '@/assets/emoji/emoji'
import { reactive } from 'vue'
import { CommentApi, ConfigApi, SubmitParamApi, UToast, createObjectURL, dayjs } from 'undraw-ui'

const route = useRoute()
const id = route.query.id
const articleDetail = ref({})
const articleShow = async (id) => {
    const res = await articleDetailShow(id)
    console.log(res.data)
    articleDetail.value = res.data
    console.log(res.data[0].title)
    console.log(articleDetail.value)
    console.log(articleDetail.value[0].title)
}
articleShow(id)

const markdown = new MarkdownIt()

const config = reactive<ConfigApi>({
    user: {
        id: 1,
        username: 'jack',
        avatar: 'https://static.juzicon.com/avatars/avatar-200602130320-HMR2.jpeg?x-oss-process=image/resize,w_100',
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
        createTime: dayjs().subtract(5, 'seconds').toString(),
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

config.comments = [
    {
        id: '2',
        parentId: null,
        uid: '2',
        content: '知道在学校为什么感觉这么困吗？[大笑2]因为学校，是梦开始的地方。[脱单doge]',
        likes: 11,
        createTime: dayjs().subtract(10, 'day').toString(),
        user: {
            username: '悟二空',
            avatar: 'https://static.juzicon.com/user/avatar-bf22291e-ea5c-4280-850d-88bc288fcf5d-220408002256-ZBQQ.jpeg',
        }
    }
]



const text = ref('')
</script>

<template>
    <div class="all">
        <el-row>
            <!--点赞评论-->
            <el-col :span="2" :offset="1">
                <div class="content" style="display:flex;flex-direction:column">
                    <div><el-button :icon="Pointer" circle size="large"/></div>
                    <div style="margin-top: 10px"><el-button :icon="Comment" circle size="large"/></div>
                </div>
            </el-col>

            <!--内容展示-->
            <el-col :span="10">
                <div class="grid-content ep-bg-purple">
                    <h3>{{ articleDetail[0].title }}</h3>
                    <div>
                        <span>
                            <el-link>{{ articleDetail[0].author }}</el-link>&nbsp;&nbsp;
                            <span style="color:#8a919f">{{ articleDetail[0].createdtime }}</span>&nbsp;&nbsp;
                            <span style="color:#8a919f"><el-icon><View /></el-icon>&nbsp;{{ articleDetail[0].views }}</span>&nbsp;&nbsp;
                            <span style="color:#8a919f"><el-icon><Clock /></el-icon>&nbsp;阅读{{ articleDetail[0].readtime }}分钟</span>
                        </span>
                        <div v-html="markdown.render(articleDetail[0].content)">

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