<template>
    <view>
        <view class="forms">
            <uni-forms ref="form" :label-width="80" label-align="right" :model="data.formData" :rules="rules">
                <uni-forms-item label="新密码 : " name="password">
                    <uni-easyinput type="text" v-model="data.formData.password" placeholder="请输入新密码" />
                </uni-forms-item>
                <uni-forms-item label="再次输入 : " name="confirmpasw">
                    <uni-easyinput type="text" v-model="data.formData.confirmpasw" placeholder="请再次输入新密码" />
                </uni-forms-item>
            </uni-forms>
        </view>
        <view>
            <button type="primary" @click="confirm" class="next">确认</button>
        </view>
    </view>
</template>


<script lang="ts">
import { onLoad, onReady } from '@dcloudio/uni-app';
import { defineComponent, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { adminPsw } from '@/api/login.js';

export default defineComponent({
    setup() {
        const data = reactive({
            formData: {
                confirmpasw: '',
                password: '',
                userNumber: '',
                userName: '',
                phoneNumber: '',
            },
        });
        const route = useRoute()
        const form = ref();
        const confirmcheck = async (rule: any, value: any, text: any, callback: any) => {
            if (data.formData.password !== data.formData.confirmpasw) {
                return callback("两次输入密码不一致")
            }
            return true
        }
        const check = async (rule: any, value: any, text: any, callback: any) => {
            if (data.formData.password.length < 6) {
                return callback("密码长度不得小于六")
            }
            else if (data.formData.password.length > 12) {
                return callback("密码长度不得大于十二")
            }
            return true
        }
        const rules = {
            password: { rules: [{ required: true, errorMessage: '请输入新密码', validateFunction: check }] },
            confirmpasw: { rules: [{ required: true, errorMessage: '请再次确认密码', validateFunction: confirmcheck }] },
        }
        onReady(() => {
            form.value.setRules(rules);
        });
        onLoad((options: any) => {
            data.formData.userNumber = options.userNumber
            data.formData.userName = options.userName
            data.formData.phoneNumber = options.phoneNumber
        })
        const confirm = () => {
            form.value.validate().then((res: any) => {
                const params = {
                    userName: data.formData.userName,
                    userNumber: data.formData.userNumber,
                    phoneNumber: data.formData.phoneNumber,
                    password: data.formData.password,
                }
                adminPsw(params).then((res: any) => {
                    if (res.success_code === 200) {
                        uni.showToast({
                            title: "修改成功",
                            duration: 3000
                        })
                        uni.navigateTo({
                            url: '/pages/Login/login'
                        })
                    }else{
                        uni.showToast({
                            title: res.message,
                            duration: 3000
                        })
                    }
                })
            })
        }
        return {
            data,
            form,
            confirm,
            rules,

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