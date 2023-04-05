<template>
  <view>
    <view class="forms">
      <view class="info-title">个人信息</view>
      <uni-forms ref="form" :label-width="80" label-align="right" :model="data.formData" :rules="rules">
        <uni-forms-item label="姓名 : " name="userName">
          <uni-easyinput type="text" v-model="data.formData.userName" v-if="data.modalType === 2" placeholder="请输入姓名" />
          <text v-if="data.modalType === 1" class="text">{{ data.formData.userName ? data.formData.userName : '---'
          }}</text>
        </uni-forms-item>
        <uni-forms-item label="学/工号 : " name="userNumber">
          <text>{{ data.formData.userNumber ? data.formData.userNumber : '---' }}</text>
        </uni-forms-item>
        <uni-forms-item label="电话号码 : " name="phoneNumber" class="input">
          <uni-easyinput type="text" v-model="data.formData.phoneNumber" v-if="data.modalType === 2"
            placeholder="请输入电话号码" />
          <text v-if="data.modalType === 1">{{ data.formData.phoneNumber ? data.formData.phoneNumber : '---' }}</text>
        </uni-forms-item>
        <uni-forms-item label="性别 : " name="sex">
          <uni-data-select v-model="data.formData.sex" :localdata="data.sexOption" placeholder="请选择性别" :clear="true"
            v-if="data.modalType === 2"></uni-data-select>
          <text v-if="data.modalType === 1">{{ data.formData.sex == 0 ? '女' : data.formData.sex == 1 ? '男' : '---'
          }}</text>
        </uni-forms-item>
        <uni-forms-item label="院系 : " name="department">
          <uni-data-select v-model="data.formData.department" :localdata="data.departmentOption" placeholder="请选择院系"
            :clear="true" v-if="data.modalType === 2"></uni-data-select>
          <text v-if="data.modalType === 1">{{ data.formData.department ? data.formData.department : '---' }}</text>
        </uni-forms-item>
        <uni-forms-item label="地址 : " name="address">
          <uni-data-select v-model="data.formData.address" :localdata="data.addressOption" placeholder="请选择地址"
            :clear="true" v-if="data.modalType === 2"></uni-data-select>
          <text v-if="data.modalType === 1">{{ data.formData.address ? data.formData.address : '---' }}</text>
        </uni-forms-item>
        <uni-forms-item label="年龄 : " name="age">
          <uni-easyinput type="text" v-model="data.formData.age" v-if="data.modalType === 2" placeholder="请输入年龄" />
          <text v-if="data.modalType === 1">{{ data.formData.age ? data.formData.age : '---' }}</text>
        </uni-forms-item>
      </uni-forms>
    </view>
    <view>
      <button type="primary" @click="change" v-if="data.modalType === 1">修改基本信息</button>
      <button type="warn" @click="confirm" v-if="data.modalType === 2">确定</button>
    </view>
    <view class="button">
      <button type="warn" @click="changePsw" v-if="data.modalType === 1">修改密码</button>
    </view>
  </view>
</template>
  
<script lang="ts">
import { onReady } from '@dcloudio/uni-app';
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { academyList, addressList } from '@/api/option.js';
import { updateMine } from '@/api/mine.js';

export default defineComponent({
  setup() {
    const data = reactive({
      modalType: 1,
      addressOption: [],
      departmentOption: [],
      sexOption: [
        { value: 0, text: "女" },
        { value: 1, text: "男" },
      ],
      userInfo: JSON.parse(String(uni.getStorageSync('customInfo'))),
      size: 10000,
      page: 1,
      formData: {
        userName: '',
        userNumber: '',
        phoneNumber: '',
        sex: ref(),
        department: '',
        address: '',
        age: ref(),
      },
    });
    onMounted(() => {
      if (data.userInfo) {
        data.formData.userName = data.userInfo.userName,
        data.formData.userNumber = data.userInfo.userNumber,
        data.formData.phoneNumber = data.userInfo.phoneNumber,
        data.formData.sex = data.userInfo.sex,
        data.formData.department = data.userInfo.department,
        data.formData.address = data.userInfo.address,
        data.formData.age = data.userInfo.age
      }
      fetchData()
    })
    const fetchData = async () => {
      await getDataInfo()
    }
    const getDataInfo = async () => {
      const params = {
        page: data.page,
        size: data.size,
      }
      academyList(params).then((res: any) => {
        if (res.success_code === 200) {
          data.departmentOption = res.message.map((item: any) => {
            return {
              text: item.academyName,
              value: item.academyName,
            }
          })
        }
      })
      addressList(params).then((res: any) => {
        if (res.success_code === 200) {
          data.addressOption = res.message.map((item: any) => {
            return {
              text: item.addressName,
              value: item.addressName,
            }
          })
        }
      })

    }
    const changePsw = () => {
      uni.navigateTo({
        url: '/pages/Login/password'
      })
    }
    const change = () => {
      data.modalType = 2
    }
    const confirm = () => {
      form.value.validate().then((res: any) => {
        uni.showModal({
          content: "确认提交？",
          success: () => {
            const params = {
              userName: data.formData.userName,
              userNumber: data.formData.userNumber,
              phoneNumber: data.formData.phoneNumber,
              sex: data.formData.sex,
              department: data.formData.department,
              address: data.formData.address,
              age: data.formData.age
            }
            updateMine(params).then((res: any) => {
              if (res.success_code === 200) {
                uni.showToast({
                  title: "修改成功",
                  duration: 3000
                })
              } else {
                uni.showToast({
                  title: "修改失败",
                  duration: 3000
                })
              }
            })
          },
          fail: () => {

          }
        })
      })
      data.modalType = 1
    }
    const form = ref();
    const checkpho = async (rule: any, value: any, text: any, callback: any) => {
      if (data.formData.phoneNumber.length !== 11) {
        return callback("电话号码长度有误")
      }
      return true
    }
    const checkage = async (rule: any, value: any, text: any, callback: any) => {
      if (data.formData.age < 12 || data.formData.age > 80) {
        return callback("年龄不在正常范围内")
      }
      return true
    }
    const rules = {
      userName: { rules: [{ required: true, errorMessage: '请输入姓名' }] },
      userNumber: { rules: [{ required: true, errorMessage: '请输入学/工号' }] },
      phoneNumber: { rules: [{ required: true, errorMessage: '请输入电话号码', validateFunction: checkpho }] },
      sex: { rules: [{ required: true, errorMessage: '请选择性别' }] },
      department: { rules: [{ required: true, errorMessage: '请选择院系' }] },
      address: { rules: [{ required: true, errorMessage: '请选择地址' }] },
      age: { rules: [{ required: true, errorMessage: '请输入年龄', validateFunction: checkage }] },
    }

    onReady(() => {
      console.log(form.value)
      form.value.setRules(rules);
    })

    return {
      data,
      form,
      change,
      confirm,
      rules,
      changePsw,
    }
  }
})


</script>
  
<style lang="less" scoped>
.info-title {
  font-size: 35rpx;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-bottom: 40rpx;

}

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

.button {
  margin: 20rpx 0rpx;
}
</style>