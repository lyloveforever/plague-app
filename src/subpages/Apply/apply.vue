<template>
  <view>
    <view class="list">
      <view class="content-message" >
        <view class="apply-box" v-for="(item, index) in data.infoList" :key="index">
          <uni-card :title="item.type === 0 ?'离校申请' : '返校申请'" :extra="item.applyDate">
            <text class="uni-body">{{ item.issue }}</text>
            <text class="status">{{ item.approvalStatus === 0 ?'待审批':item.approvalStatus === 1 ?'已通过':item.approvalStatus === 2 ? '未通过' :'已核销' }}</text>
          </uni-card>
        </view>
      </view>
    </view>
    <view class="add-button">
      <navigator url="/subpages/Apply/addApply">
        <button type="primary">添加申请</button>
      </navigator>
    </view>
  </view>
</template>
  
<script lang="ts">

import { defineComponent, onMounted, reactive, ref } from 'vue';
import { applyList } from '@/api/apply.js'

export default defineComponent({
  setup() {
    const data = reactive({
      infoList: ref(),
      userInfo: JSON.parse(String(uni.getStorageSync('customInfo'))),
    });
    const fetchData = ()=>{
      const params = {
        userNumber : data.userInfo.userNumber,
      }
      applyList(params).then((res: any) =>{
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
    }
  }
})
</script>
  
<style lang="less" scoped>
.status{
  float: right;
  color: rgb(0, 72, 255);
}

.add-button {
  width: 100%;
  height: 100rpx;
  background-color: #ffffff;
  position: fixed;
  overflow: hidden;
  bottom: 0rpx;
}

.apply-box {
  word-wrap: break-word;
  word-break: normal;
}

.content-message {
  padding-bottom: 100rpx;
}
</style>