<template>
  <view>
    <view class="list">
      <view class="content-message">
        <view class="clock-box" v-for="(item, index) in data.infoList" :key="index">
          <uni-card :title="item.status === 2 ? '正常' :'异常'" :extra="item.checkTime">
            <text class="uni-body">{{ item.address.substr(0, 20) + '...' }}</text>
          </uni-card>
        </view>
      </view>
    </view>
    <navigator url="/subpages/Clock/add" hover-class="navigator-hover">
      <view class="clock">
        <button type="primary">新增打卡</button>
      </view>
    </navigator>
  </view>
</template>
  
<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import {clockList } from '@/api/clock.js';

export default defineComponent({
  setup() {
    const data = reactive({
      infoList: ref(),
      userInfo: JSON.parse(String(uni.getStorageSync('customInfo'))),
    });
    const getMore = () => {
      uni.navigateTo({
        url: '/pages/Message/more'
      })
    }
    const fetchData = ()=>{
      const params ={
        userNumber : data.userInfo.userNumber
      }
      clockList(params).then((res: any)=>{
        if(res.success_code === 200){
          data.infoList = res.message
        }
      })
    }
    onMounted(()=>{
      fetchData()
    })
    return {
      data,
      getMore,
    }
  }
})

</script>
  
<style lang="less" scoped>

.content-message{
  padding-bottom: 100rpx;
}

.clock {
  width: 100%;
  height: 100rpx;
  background-color: #ffffff;
  position: fixed;
  overflow: hidden;
  bottom: 0rpx;
}
</style>