<script setup>
import {ref} from 'vue'
import { View, Pointer, Comment } from '@element-plus/icons-vue'
import { userLikesShow } from '@/api/user'
import { useRouter } from 'vue-router'

const router = useRouter()


const articleList = ref([])
const articleShow = async () => {
    const res = await userLikesShow()
    console.log(res)
    articleList.value = res.data
    console.log(articleList)
}
articleShow()

const ellipsis = (content) => {
    if (content.length > 70) {
        return content.slice(0, 70) + '...'
    }
    return content
}
</script>

<template>
    <div v-for="item in articleList" :key="item.id" style="padding-bottom: 15px;padding-top: 15px;margin-left: 20px;cursor:pointer" @click="router.push({path:'/mylikesarticle/detail',query:{id:item.id}})">
        <div style="font-weight: 600;;padding-bottom: 5px;">{{ item.title }}</div>
        <div style="font-size: smaller;color: #999fab;;padding-bottom: 5px;">
            {{ ellipsis(item.content) }}
        </div>
        <div style="font-size: smaller;color: #999fab;padding-bottom: 5px;">
            {{ item.author }}<el-divider direction="vertical" />
            {{ item.createdtime }}<el-divider direction="vertical" />
            <span><el-icon>
                    <View />
                </el-icon>&nbsp;{{ item.views }}</span>&nbsp;&nbsp;&nbsp;<span><el-icon>
                    <Pointer />
                </el-icon>&nbsp;{{ item.likes }}</span>&nbsp;&nbsp;&nbsp;<el-icon>
            <Comment />
        </el-icon>{{ item.comment.length }}
    </div>
</div></template>