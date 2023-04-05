<template>
  <view>
    <view class="forms">
      <uni-forms ref="form" :label-width="80" label-align="right" :model="data.formData" :rules="rules">
        <uni-forms-item label="姓名 : " name="userName">
          <uni-easyinput type="text" v-model="data.formData.userName" placeholder="请输入姓名" />
        </uni-forms-item>
        <uni-forms-item label="学/工号 : " name="userNumber">
          <uni-easyinput type="text" v-model="data.formData.userNumber" placeholder="请输入学/工号" />
        </uni-forms-item>
        <uni-forms-item label="电话号码 : " name="phoneNumber" class="input">
          <uni-easyinput type="text" v-model="data.formData.phoneNumber" placeholder="请输入电话号码" />
        </uni-forms-item>
      </uni-forms>
    </view>
    <view>
      <button type="primary" @click="next" class="next">下一步</button>
    </view>
  </view>
</template>
<script lang="ts">
import { onReady } from '@dcloudio/uni-app';
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  setup() {
    const data = reactive({
      formData: {
        userName: '',
        userNumber: '',
        phoneNumber: '',
      },
    });
    const next = () => {
      form.value.validate().then((res: any) => {
        uni.navigateTo({
          url: '/pages/Login/confirm?userNumber=' + data.formData.userNumber + '&userName=' + data.formData.userName + '&phoneNumber=' + data.formData.phoneNumber
        })
      })
    }
    const form = ref();
    const rules = {
      userName: { rules: [{ required: true, errorMessage: '请输入姓名' }] },
      userNumber: { rules: [{ required: true, errorMessage: '请输入学/工号' }] },
      phoneNumber: { rules: [{ required: true, errorMessage: '请输入电话号码' }] },
    }
    onReady(() => {
      console.log(form.value)
      form.value.setRules(rules);
    })
    return {
      data,
      form,
      rules,
      next,
    }
  }
})

</script>
<style  lang="less" scoped>
.forms {
  margin: 50rpx 20rpx;

  /deep/ .uni-easyinput__content-input {
    height: 35px;
  }

  text {
    display: flex;
    align-items: center;
    justify-content: left;
    width: 100%;
    height: 100%;
  }
}
</style>