import { request } from '@/plugins/request';

// 获取公共文章标签
export const getTags = () => {
    return request({
        method: 'GET',
        url: '/api/tags'
    })
}