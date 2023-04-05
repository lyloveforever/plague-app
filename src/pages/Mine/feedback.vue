<template>
  <view>
    <view class="feedback">
      <view class="title">
        <text>反馈标题：</text>
        <uni-easyinput v-model="data.title" placeholder="请输入标题"></uni-easyinput>
      </view>
      <view class="content">
        <text>反馈内容：</text>
        <uni-easyinput type="textarea" v-model="data.content" placeholder="请输入内容" clearable></uni-easyinput>
      </view>
    </view>
    <view class="submit">
      <button type="primary" @click="submit">提交</button>
    </view>
  </view>
</template>
  
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { feedback } from '@/api/mine.js';

export default defineComponent({
  setup() {
    const data = reactive({
      title: '',
      content: '',
      time: '',
    });
    const submit = () => {
      uni.showModal({
        content: "确认提交？",
        success: () => {
          const params = {
            content: data.content,
            title: data.title,
            time: new Date().toLocaleString() ,
          }
          feedback(params).then((res: any) => {
            if (res.success_code === 200) {
              uni.showToast({
                title: "提交成功",
                duration: 5000
              })
              uni.navigateBack({
                delta: 1,
              })
            }else{
              uni.showToast({
                title: "提交失败",
                duration: 3000
              })
            }
          })
        },
        fail: () => {

        }
      })
    }
    return {
      data,
      submit
    }
  }
})

</script>
  
<style lang="less" scoped>
.feedback {
  margin-top: 50rpx;

  .title {
    display: flex;
    align-items: center;
  }

  .content {
    margin-top: 30rpx;
    display: flex;
    align-items: center;

  }
}

.submit {
  margin-top: 50rpx;
}
</style>