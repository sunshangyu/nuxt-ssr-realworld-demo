// 只在服务端才能用到
const cookieparser = process.server ? require('cookieparser') : undefined;

// 在服务段渲染期间运行都是同一个实例
// 为了防止数据冲突，务必要把 state 定义成一个函数，返回数据对象
export const state = () => {
    return {
        // 当前登录用户的登录状态
        user: null
    };
}

export const mutations = {
    setUser(state, data) {
        state.user = data;
    }
}

export const actions = {
    // nuxtServerInit 是一个特殊的 action 方法
    // 此 action 会在服务段渲染期间自动调用
    // 作用：初始化容器数据，传递数据给客户端调用
    nuxtServerInit({ commit }, { req }) {
        let auth = null, user = undefined;
        if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie);
            try {
                user = JSON.parse(parsed.user);
            } catch(err) {

            }
        }

        // 提交 mutation 修改 state 状态
        commit('setUser', user);
    }
}
