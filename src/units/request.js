export default function request(config) {
    let Authorization = uni.getStorageSync('token')
    config.header = {
        "Authorization": Authorization
    }
    config.hasLoading = true
    if (config.hasLoading) {
        uni.showLoading({
            title: '加载中...'
        })
        uni.showNavigationBarLoading()
    }
    return new Promise((resolve, reject) => {
        uni.request({
            ...config,
            success: (res) => {
                uni.hideLoading()
                uni.hideNavigationBarLoading()
                // resolve(res.data.data)
               return resolve(res.data)
            },
            fail: (rej) => {
                uni.hideLoading()
                uni.hideNavigationBarLoading()
                uni.showToast({
                    title: "服务器出错",
                    icon: 'none'
                })
                reject(rej)
            }
        })
    })
}