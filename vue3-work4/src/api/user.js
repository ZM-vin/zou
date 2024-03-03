import request from '@/utils/request'

//首页文章展示
export const userShow = () => {
    return request.get('/user')
}