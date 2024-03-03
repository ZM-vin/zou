<script setup>
import { View, Pointer, Comment } from '@element-plus/icons-vue'
const content = '👏2024年创作者训练营第1期来咯，如果你想"变身"为创作者，却不知如何下笔；如果你想让自己的作品会被更多人看见；如果你想能凭一己之力"横扫"掘金平台......那就快来和我们一起探索技术写作进阶之旅吧～！'
const ellipsis = (content) => {
    if (content.length > 70) {
        return content.slice(0, 70) + '...'
    }
    return content
}
</script>

<template>
    <div style="padding-bottom: 15px;padding-top: 15px;margin-left: 20px;">
        <div style="font-weight: 600;;padding-bottom: 5px;">SQL的优化器</div>
        <div style="font-size: smaller;color: #999fab;;padding-bottom: 5px;">
            {{ ellipsis(content) }}
        </div>
        <div style="font-size: smaller;color: #999fab;padding-bottom: 5px;">
            大巨头<el-divider direction="vertical" />
            10个月前<el-divider direction="vertical" />
            <span><el-icon>
                    <View />
                </el-icon>&nbsp;85</span>&nbsp;&nbsp;&nbsp;<span><el-icon>
                    <Pointer />
                </el-icon>&nbsp;628</span>&nbsp;&nbsp;&nbsp;<el-icon>
            <Comment />
        </el-icon>440
    </div>
</div></template>