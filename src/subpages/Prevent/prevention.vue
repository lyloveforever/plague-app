<template>
  <view>
    <view class="list">
      <view class="content-message">
        <view class="prevent-box" v-for="(item, index) in data.infoList" :key="index">
          <uni-card :title="item.type === 0 ?'常规检测':item.type === 1 ? '医疗诊治' : '其它'" :extra="item.time">
            <text class="uni-body">{{ item.address.substr(0, 20) + '...' }}</text>
            <text class="prevent-more" @click="getMore(item)">更多>></text>
          </uni-card>
        </view>
      </view>
    </view>
  </view>
</template>
  
<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { preventList} from '@/api/prevent.js';

export default defineComponent({
  setup() {
    const data = reactive({
      infoList:ref(),
    });
    const getMore = (data: any) => {
      uni.navigateTo({
        url: '/subpages/Prevent/preventMore?info='+JSON.stringify(data)
      })
    }
    const fetchData = () =>{
      preventList().then((res: any)=>{
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
.prevent-more {
  float: right;
  color: #f21212;
}

.pagination {
  width: 100%;
  position: fixed;
  bottom: 60rpx;
}
</style>