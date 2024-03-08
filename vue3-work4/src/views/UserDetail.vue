<script lang="ts" setup>
import {ref, reactive } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { userPhotoShow } from '@/api/user'
import { userNameShow } from '@/api/user'
import { userNameChange } from '@/api/user'
import type { UploadProps } from 'element-plus'

//展示头像
const imageUrl =ref('')
const photoShow = async () => {
    const res = await userPhotoShow()
    imageUrl.value = res.data.avatar
    console.log(imageUrl.value)
}
photoShow()

//展示用户名
const username = ref('')
const nameShow = async () => {
    const res = await userNameShow()
    username.value = res.data.name
}
nameShow()

const ruleFormRef = ref()
const ruleForm = reactive(
    {
        name: username
    }
)
const rules = {
    name: [
        { required: true, message: '用户名不能为空', trigger: 'change' },
        { pattern: /^.{0,20}$/, message: '用户名长度不大于20位', trigger: 'change' }
    ]
}

//提交修改
const remain = async () => {
    const res = await userNameChange(ruleForm.name)
    console.log(res.data)
    photoShow()
    nameShow()
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

</script>

<template>
    <el-container>
        <el-header height="30px">
            <div class="bigtitle">个人资料</div>
        </el-header>
        <el-divider />
        <el-main>
            <div class="smalltitle">基本资料</div>     
            <el-row>
                <el-col :span="14">
                    <el-form
                    :model="ruleForm"
                    :rules="rules"
                    label-width="120px"
                    ref="ruleFormRef"
                    status-icon
                    >
                        <el-form-item label="用户名" prop="name">
                              <el-input
                                    v-model="ruleForm.name"
                                    maxlength="20"
                                    placeholder=ruleForm.name
                                    show-word-limit
                                    type="text"
                                />
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="7" :offset="3">
                    <div style="text-align: center;">
                        <el-upload
                                class="avatar-uploader"
                                action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                            >
                                <el-avatar v-if="imageUrl" :src="imageUrl" :size="150"/>
                                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                            </el-upload>
                            <div>
                                上传头像
                            </div>
                    </div>
                </el-col>
            </el-row>
            <el-button type="primary" style="margin-top: 100px;" @click="remain">保存修改</el-button>
        </el-main>
    </el-container>
</template>

<style>
.bigtitle {
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    padding: 0 0 20px 0;
}

.smalltitle {
    padding: 0 0 50px 0;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
}


.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 20px;
  height: 20px;
  text-align: center;
}
</style>