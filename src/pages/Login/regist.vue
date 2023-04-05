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
                <uni-forms-item label="性别 : " name="sex">
                    <uni-data-select v-model="data.formData.sex" :localdata="data.sexOption" placeholder="请选择性别"
                        :clear="true"></uni-data-select>
                </uni-forms-item>
                <uni-forms-item label="密码 : " name="password">
                    <uni-easyinput type="text" v-model="data.formData.password" placeholder="请输入登录密码" />
                </uni-forms-item>
                <uni-forms-item label="年龄 : " name="age">
                    <uni-easyinput type="text" v-model="data.formData.age" placeholder="请输入年龄" />
                </uni-forms-item>
                <uni-forms-item label="院系 : " name="department">
                    <uni-data-select v-model="data.formData.department" :localdata="data.departmentOption"
                        placeholder="请选择院系" :clear="true"></uni-data-select>
                </uni-forms-item>
                <uni-forms-item label="电话号码 : " name="phoneNumber" class="input">
                    <uni-easyinput type="text" v-model="data.formData.phoneNumber" placeholder="请输入电话号码" />
                </uni-forms-item>
                <uni-forms-item label="地址 : " name="address">
                    <uni-data-select v-model="data.formData.address" :localdata="data.addressOption"
                        placeholder="请选择地址" :clear="true"></uni-data-select>
                </uni-forms-item>
            </uni-forms>
        </view>
        <view class="button">
            <button type="primary" @click="Regist">注册</button>
        </view>
    </view>
</template>
<script lang="ts">
import { onReady } from '@dcloudio/uni-app';
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { adminRegist } from '@/api/login.js';
import { academyList, addressList } from '@/api/option.js';

export default defineComponent({
    setup() {
        const data = reactive({
            addressOption: [],
            departmentOption: [],
            sexOption: [
                { value: 0, text: "女" },
                { value: 1, text: "男" },
            ],
            size: 10000,
            page: 1,
            formData: {
                userName: '',
                userNumber: '',
                phoneNumber: '',
                password: '',
                sex: ref(),
                age: ref(),
                department: '',
                address: '',
            },

        });
        const Regist = () => {
            form.value.validate().then((res: any) => {
                uni.showModal({
                    content: "确认注册？",
                    success: () => {
                        const params = {
                            userName: data.formData.userName,
                            userNumber: data.formData.userNumber,
                            phoneNumber: data.formData.phoneNumber,
                            password: data.formData.password,
                            sex: data.formData.sex,
                            age: data.formData.age,
                            department: data.formData.department,
                            address: data.formData.address,
                        }
                        adminRegist(params).then((res: any) => {
                            if (res.success_code === 200) {
                                uni.showToast({
                                    title: "注册成功",
                                    duration: 6000
                                })
                                uni.navigateTo({
                                    url: '/pages/Login/login'
                                })
                            }else{
                                uni.showToast({
                                    title: res.message,
                                    duration: 2000
                                })
                            }
                        })
                    },
                    fail: () => {

                    }
                })
            })

        }
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
        onMounted(() => {
            fetchData()
        })
        const form = ref();
        const checkpho = async (rule: any, value: any, text: any, callback: any) => {
            if (data.formData.phoneNumber.length !== 11) {
                return callback("电话号码长度有误")
            }
            return true
        }
        const checkpasw = async (rule: any, value: any, text: any, callback: any) => {
            if (data.formData.password.length < 6) {
                return callback("密码长度不得小于六")
            }
            else if (data.formData.password.length > 12) {
                return callback("密码长度不得大于十二")
            }
            return true
        }
        const ageCheck = async (rule: any, value: any, text: any, callback: any) => {
            if (data.formData.age < 12 || data.formData.age > 80) {
                return callback("年龄不在正常范围内")
            }
            return true
        }
        const rules = {
            userName: { rules: [{ required: true, errorMessage: '请输入姓名' }] },
            userNumber: { rules: [{ required: true, errorMessage: '请输入学/工号' }] },
            phoneNumber: { rules: [{ required: true, errorMessage: '请输入电话号码', validateFunction: checkpho }] },
            password: { rules: [{ required: true, errorMessage: '请输入登录密码', validateFunction: checkpasw }] },
            sex: { rules: [{ required: true, errorMessage: '请选择性别' }] },
            age: { rules: [{ required: true, errorMessage: '请输入年龄', validateFunction: ageCheck }] },
            department: { rules: [{ required: true, errorMessage: '请选择院系' }] },
            address: { rules: [{ required: true, errorMessage: '请选择地址' }] },
        }

        onReady(() => {
            console.log(form.value)
            form.value.setRules(rules);
        })
        return {
            data,
            rules,
            Regist,
            form,
        }
    }
})

</script>
<style lang="less" scoped>
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