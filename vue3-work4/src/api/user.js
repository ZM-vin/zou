import request from '@/utils/request'

//我的id展示
export const userIdShow = () => {
    return request.get('/userid')
}

//我的头像展示
export const userPhotoShow = () => {
    return request.get('/userphoto')
}

//我的文章编写
export const articleAdd = (data) => {
    return request.post('/myarticle', data)
}

//我的文章展示
export const userArticleShow = () => {
    return request.get('/myarticle')
}

//我的名字展示
export const userNameShow = () => {
    return request.get('/username')
}

//修改我的名字
export const userNameChange = (username) => {
    return request.put('/username', {
        name: username 
    }
    )
}

//修改我的密码
export const userPasswordChange = (userpassword) => {
    return request.put('/userpassword', {
        password: userpassword
    }
    )
}

//我点赞的文章
export const userLikesShow = () => {
    return request.get('/mylike')
}

//我的文章详情页面
export const myArticleShow = (id) => {
    return request.get('/myarticle', {
        params: { id }
    })
}

//我点赞的文章详情页面
export const myLikeArticleShow = (id) => {
    return request.get('/mylike', {
        params: { id }
    })
}

//添加点赞文章
export const likeArticleAdd = (data) => {
    return request.post('/mylike', data)
}

//获取我点赞的文章id数组
export const userLikesArticleId = () => {
    return request.get('/userlikearticleid')
}

//添加点赞文章的id
export const addLikesArticleId = (id) => {
    return request.put('/userlikearticleid', { data:id }
    )
}

//删除点赞文章
export const likeArticleDel = (id) => {
    return request.delete('/mylike/'+id)
}

//删除点赞文章的id
export const likeArticleIdDel = (id) => {
    return request.put('/userlikearticleid', {
        data: id
    }
    )
}