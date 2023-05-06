<template>
  <view>
    <view class="top">
      <image src="/static/icon/touxiang.png" mode="aspectFit" class="touxiang" />
      <text>{{ data.userName }}</text>
    </view>
    <navigator url="/pages/Mine/geren" hover-class="navigator-hover">
      <uni-card :is-shadow="false" margin="0px">
        <view class="yy">
          <text>个人信息</text>
          <uni-icons type="right" size="20" class="icon" />
        </view>
      </uni-card>
    </navigator>
    <navigator url="/pages/Mine/feedback" hover-class="navigator-hover">
      <uni-card :is-shadow="false" margin="0px">
        <view class="yy">
          <text>反馈</text>
          <uni-icons type="right" size="20" class="icon" />
        </view>
      </uni-card>
    </navigator>
    <uni-card :is-shadow="false" margin="0px">
      <view class="yy">
        <text>关于</text>
        <uni-icons type="right" size="20" class="icon" />
      </view>
    </uni-card>
    <view class="button">
      <navigator url="/pages/Login/login" hover-class="navigator-hover">
        <view class="exit">
          <button type="warn">退出登录</button>
        </view>
      </navigator>
    </view>
  </view>
</template>
  
<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue';

export default defineComponent({
  setup() {
    const data = reactive({
      userInfo: JSON.parse(String(uni.getStorageSync('customInfo'))),
      userName:'',
    });

    const handleBang = ()=>{

    }
    onMounted(()=>{
      if(data.userInfo){
        data.userName = data.userInfo.userName
      }
    })
    return {
      data,
      handleBang
    }
  }
})

</script>
  
<style lang="less" scoped>
.top {
  text-align: center;
  margin-bottom: 80rpx;

  .touxiang {
    height: 120rpx;
    width: 120rpx;
    display: block;
    margin: 0 auto;
    margin-top: 80rpx;
  }

  text {
    font-size: 40rpx;
    font-weight: bold;
    margin-top: 40rpx;
  }
}

.yy {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50rpx;

  text {
    float: left;
    font-size: 30rpx;
    font-weight: bold;
  }
}

.button {
  margin-top: 100rpx;

  .exit {
    margin-top: 20rpx;
  }

}
</style>