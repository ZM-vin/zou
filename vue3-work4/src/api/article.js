import request from '@/utils/request'

//首页文章展示
export const articleShow = () => {
    return request.get('/article')
}

//文章详情页面
export const articleDetailShow = (id) => {
    return request.get('/article', {
        params: {id}
    })
}