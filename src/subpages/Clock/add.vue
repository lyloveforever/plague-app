<template>
    <view>
        <view class="forms">
            <uni-forms ref="form" :label-width="170" label-position="top" :modelValue="data.formData" :rules="rules">
                <uni-forms-item label="今日是否在校" name="inschool">
                    <uni-data-checkbox v-model="data.formData.inschool" :localdata="data.schoolOption"></uni-data-checkbox>
                </uni-forms-item>
                <uni-forms-item label="当前位置" name="address">
                    <uni-easyinput type="text" v-model="data.formData.address" placeholder="请输入当前所在省/市/区"
                        @click="addressclick" />
                </uni-forms-item>
                <uni-forms-item label="体温是否高于37.3℃" name="temperature">
                    <uni-data-checkbox v-model="data.formData.temperature" :localdata="data.tempOption"></uni-data-checkbox>
                </uni-forms-item>
                <uni-forms-item label="是否出现以下症状" name="symptom" class="checkbox">
                    <uni-data-checkbox multiple mode="list" v-model="data.formData.symptom"
                        :localdata="data.symptomOption"></uni-data-checkbox>
                </uni-forms-item>
                <uni-forms-item label="是否疑似或确诊某一病例" name="status" @change="changename">
                    <uni-data-checkbox v-model="data.formData.status" :localdata="data.statusOption"></uni-data-checkbox>
                </uni-forms-item>
                <uni-forms-item label="确诊或疑似病例名" name="name" v-if="data.formData.status !== 2">
                    <uni-easyinput type="text" v-model="data.formData.name" placeholder="请输入确诊或疑似病例名" />
                </uni-forms-item>
            </uni-forms>
        </view>
        <view class="submit">
            <button type="primary" @click="submit">提交</button>
        </view>
    </view>
</template>
    
<script lang="ts">
import { onReady } from '@dcloudio/uni-app';
import { defineComponent, reactive, ref } from 'vue';
import { clockAdd } from '@/api/clock.js';

export default defineComponent({
    setup() {
        const data = reactive({
            formData: {
                inschool: ref(),
                address: '',
                temperature: ref(),
                symptom: ref(),
                status: ref(),
                name: '',
            },
            schoolOption: [
                { value: 0, text: "否" },
                { value: 1, text: "是" },
            ],
            tempOption: [
                { value: 0, text: "否" },
                { value: 1, text: "是" },
            ],
            symptomOption: [
                { value: 0, text: "没有出现症状" },
                { value: 1, text: "感冒症状:发热、干咳、咽痛等" },
                { value: 2, text: "恶心、呕吐、腹泻" },
                { value: 3, text: "心慌、胸闷、呼吸困难" },
                { value: 4, text: "肌肉酸痛" },
                { value: 5, text: "内脏器官疼痛" },
            ],
            statusOption: [
                { value: 2, text: "无" },
                { value: 0, text: "疑似" },
                { value: 1, text: "确诊" },
            ],
            userInfo: JSON.parse(String(uni.getStorageSync('customInfo')))

        });
        const form = ref();
        const changename = (e: any) => {
            data.formData.status = e
        }
        const submit = () => {
            form.value.validate().then((res: any) => {
                uni.showModal({
                    content: "确认提交？",
                    success: () => {
                        const params = {
                            inschool: data.formData.inschool,
                            address: data.formData.address,
                            temperature: data.formData.temperature,
                            symptom: data.formData.symptom,
                            status: data.formData.status,
                            name: data.formData.name,
                            userNumber: data.userInfo.userNumber,
                            department: data.userInfo.department,
                            phoneNumber: data.userInfo.phoneNumber,
                            startTime: new Date().toLocaleDateString(),
                            checkTime: new Date().toLocaleString()
                        }
                        clockAdd(params).then((res: any) => {
                            if (res.success_code === 200) {
                                uni.showToast({
                                    title: "打卡成功",
                                    duration: 5000
                                })
                                uni.navigateTo({
                                    url: '/subpages/Clock/clock'
                                })
                            }else{
                                uni.showToast({
                                    title: "打卡失败",
                                    duration: 5000
                                })
                            }
                        })

                    },
                    fail: () => {

                    }
                });
            })
        }
        const addressclick = () => {

        }
        const rules = {
            inschool: { rules: [{ required: true, errorMessage: '请选择是否在校' }] },
            address: { rules: [{ required: true, errorMessage: '请定位当前位置' }] },
            temperature: { rules: [{ required: true, errorMessage: '请选择当日体温情况' }] },
            symptom: { rules: [{ required: true, errorMessage: '请选择是否有以下症状' }] },
            cases: { rules: [{ required: true, errorMessage: '请选择是否疑似或确诊' }] },
            name: { rules: [{ required: true, errorMessage: '请填写疑似或确诊名' }] },
        }
        onReady(() => {
            console.log(form.value)
            form.value.setRules(rules);
        })
        return {
            data,
            rules,
            submit,
            form,
            changename,
            addressclick,
        }
    }
})
</script>
    
<style lang="less" scoped>
.forms {
    padding-bottom: 100rpx;
    padding-left: 30rpx;

    /deep/ .uni-easyinput__content-input {
        height: 35px;
    }
}

.submit {
    width: 100%;
    height: 100rpx;
    background-color: #ffffff;
    position: fixed;
    overflow: hidden;
    bottom: 0rpx;
}

.checkbox {
    word-wrap: break-word;
    word-break: normal;
}
</style>