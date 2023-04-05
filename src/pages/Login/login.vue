<template>
  <view class="login">
    <image src="../../static/background/denglu.jpg" class="background" />
    <uni-forms ref="form" label-align="left" :model="data" :rules="rules">
      <view class="title">xxx校园健康管理系统登录</view>
      <uni-forms-item name="userNumber">
        <view class="user">
          <image src="/static/icon/zhanghao.png" mode="aspectFit" class="icons" />
          <uni-easyinput type="text" v-model="data.userNumber" placeholder="请输入学/工号" />
        </view>
      </uni-forms-item>
      <uni-forms-item name="password">
        <view class="user">
          <image src="/static/icon/mima.png" mode="aspectFit" class="icons" />
          <uni-easyinput type="password" v-model="data.password" placeholder="请输密码" :passwordIcon="true" />
        </view>
      </uni-forms-item>
      <uni-forms-item>
        <view class="button">
          <button type="primary" @click="login">登录</button>
        </view>
      </uni-forms-item>
      <view class="bottom">
        <navigator url="/pages/Login/regist" hover-class="navigator-hover">
          <text>注册</text>
        </navigator>
        <navigator url="/pages/Login/password" hover-class="navigator-hover">
          <text>忘记密码</text>
        </navigator>
      </view>
    </uni-forms>
  </view>
</template>
  
<script lang="ts">
import { onReady } from '@dcloudio/uni-app';
import { defineComponent, reactive, ref } from 'vue';
import { adminLogin } from '@/api/login.js';

export default defineComponent({
  setup() {
    const data = reactive({
      userNumber: '',
      password: '',
      showPassword: true,
      iconSrc: '/static/icon/biyan.png'
    });
    const login = () => {
      form.value.validate().then(async (res: any) => {
        const params = {
          userNumber: data.userNumber,
          password: data.password
        }
        adminLogin(params).then((resu: any) => {
          if (resu.success_code === 200) {
            uni.setStorageSync('token', resu.token)
            uni.setStorageSync('customInfo', JSON.stringify(resu.results))
            uni.showToast({
              title: "登录成功",
              duration: 2000
            })
            uni.switchTab({
              url: '/pages/Home/home'
            })

          } else {
            uni.showToast({
              title: res.message,
              duration: 2000
            })
          }
        })
      })
    }
    const showPwd = () => {
      data.showPassword = !data.showPassword
      if (data.showPassword === true) {
        data.iconSrc = '/static/icon/biyan.png'
      } else {
        data.iconSrc = '/static/icon/zhengyan.png'
      }
    }
    const form = ref();
    const rules = {
      userNumber: { rules: [{ required: true, errorMessage: '请输入学/工号' }] },
      password: { rules: [{ required: true, errorMessage: '请输入密码' }] }
    }
    onReady(() => {
      console.log(form.value)
      form.value.setRules(rules);
    })
    return {
      data,
      rules,
      login,
      form,
      showPwd,
    }
  }
})

</script>
  
<style lang="less" scoped>
.background {
  position: absolute;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  z-index: -3;
  overflow: hidden;
}

.title {
  margin-top: 250rpx;
  margin-bottom: 100rpx;
  text-align: center;
  font-size: 50rpx;
  font-weight: bold;
}

.user {
  margin: 0rpx 80rpx;
  display: flex;
  align-items: center;

  .icons {
    height: 50rpx;
    width: 50rpx;
    margin-right: 20rpx;
  }

}

.button {
  margin: 30rpx 80rpx;
  height: 75rpx;
}

.bottom {
  margin: 80rpx 50rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;

}
</style>