<template>
  <view>
    <view class="list">
      <view class="content-message">
        <view class="notice-box" v-for="(item, index) in data.infoList" :key="index">
          <uni-card :title="item.title" :extra="item.releaseDate">
            <text class="uni-body">{{ item.content.substr(0, 20) + '...' }}</text>
            <text class="notice-more" @click="getMore(item)">更多>></text>
          </uni-card>
        </view>
      </view>
    </view>
  </view>
</template>
  
<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import {noticeList} from '@/api/notice.js';

export default defineComponent({
  setup() {
    const data = reactive({
      infoList: ref(),
    });
    const fetchData = () =>{
      noticeList({page:1,size:10000}).then((res: any)=>{
        if(res.success_code === 200){
          data.infoList = res.message
        }
      })
    }
    onMounted(()=>{
      fetchData()
    })
    const getMore = (data:any) => {
      uni.navigateTo({
        url: '/subpages/Notice/noticeMore?info='+JSON.stringify(data)
      })
    }
    return {
      data,
      getMore,

    }
  }
})

</script>
  
<style lang="less" scoped>
.notice-more {
  float: right;
  color: #f21212;
}

</style>