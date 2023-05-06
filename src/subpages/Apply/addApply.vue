<template>
    <view>
        <view class="forms">
            <uni-forms ref="form" :label-width="90" label-align="right" :model="data.formData" :rules="rules">
                <uni-forms-item label="申请类型 : " name="type">
                    <uni-data-select v-model="data.formData.type" :localdata="data.typeOption" placeholder="请选择申请类型"
                        :clear="true"></uni-data-select>
                </uni-forms-item>
                <uni-forms-item label="学号 : " name="userNumber">
                    <text>{{ data.userInfo.userNumber ? data.userInfo.userNumber : '---' }}</text>
                </uni-forms-item>
                <uni-forms-item label="院系 : " name="department">
                    <text>{{ data.userInfo.department ? data.userInfo.department : '---' }}</text>
                </uni-forms-item>
                <uni-forms-item label="是否在校 : " name="inschool">
                    <uni-data-select v-model="data.formData.inschool" :localdata="data.inschoolOption" placeholder="请选择是否在校"
                        :clear="true"></uni-data-select>
                </uni-forms-item>
                <uni-forms-item label="离校时间 : " name="leaveDate" v-if="data.formData.type === 0">
                    <uni-datetime-picker type="date" :clear-icon="true" v-model="data.formData.leaveDate" />
                </uni-forms-item>
                <uni-forms-item label="返校时间 : " name="returnDate">
                    <uni-datetime-picker type="date" :clear-icon="true" v-model="data.formData.returnDate" />
                </uni-forms-item>
                <uni-forms-item label="交通工具 : " name="transport">
                    <uni-easyinput type="text" v-model="data.formData.transport" placeholder="请输入所乘坐的交通工具" />
                </uni-forms-item>
                <uni-forms-item label="离返校原因 : " name="issue">
                    <uni-easyinput type="textarea" v-model="data.formData.issue" placeholder="请输入离/返校原因" />
                </uni-forms-item>
            </uni-forms>
        </view>
        <view class="submit">
            <button type="primary" @click="submitApply">提交申请</button>
        </view>
    </view>
</template>
    
<script lang="ts">
import { onLoad, onReady } from '@dcloudio/uni-app';
import { defineComponent, reactive, ref } from 'vue';
import { applyAdd } from '@/api/apply.js'

export default defineComponent({
    setup() {
        const data = reactive({
            formData: {
                type: ref(),
                leaveDate: '',
                returnDate: '',
                transport: '',
                issue: '',
                applyDate: '',
                inschool: ref()
            },
            typeOption: [
                { value: 0, text: "离校申请" },
                { value: 1, text: "返校申请" },
            ],
            departmentOption: [],
            inschoolOption: [
                { value: 0, text: "离校" },
                { value: 1, text: "在校" },
            ],
            userInfo: JSON.parse(String(uni.getStorageSync('customInfo'))),

        });
        const form = ref();
        const submitApply = () => {
            form.value.validate().then((res: any) => {
                uni.showModal({
                    content: "确认提交？",
                    cancelText: "取消",
                    confirmText: "确认",
                    success: (res) => {
                        if(res.confirm){
                            const params = {
                            type: data.formData.type,
                            leaveDate: data.formData.leaveDate,
                            returnDate: data.formData.returnDate,
                            transport: data.formData.transport,
                            userNumber: data.userInfo.userNumber,
                            department: data.userInfo.department,
                            issue: data.formData.issue,
                            applyDate: new Date().toLocaleString(),
                            inschool: data.formData.inschool,
                          }
                        applyAdd(params).then((res: any) => {
                            if (res.success_code === 200) {
                                uni.showToast({
                                    title: "申请成功",
                                    duration: 5000
                                })
                                uni.navigateTo({
                                    url:'/subpages/Apply/apply'
                                })
                            } else {
                                uni.showToast({
                                    title: "申请失败",
                                    duration: 5000
                                })
                            }
                        })
                        }else{
                            console.log('用户点击取消');
                        }
                        

                    },
                    fail: () => {

                    }
                });
            })
        }

        const rules = {
            type: { rules: [{ required: true, errorMessage: '请选择类型' }] },
            leaveDate: { rules: [{ required: true, errorMessage: '请选择离校时间' }] },
            returnDate: { rules: [{ required: true, errorMessage: '请选择返校时间' }] },
            transport: { rules: [{ required: true, errorMessage: '请输入所乘坐交通工具' }] },
            issue: { rules: [{ required: true, errorMessage: '请输入离返校原因' }] },
        }
        onReady(() => {
            console.log(form.value)
            form.value.setRules(rules);
        })
        return {
            data,
            rules,
            form,
            submitApply,
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
}

.submit {
    margin-top: 80rpx;
}

text {
    display: flex;
    align-items: center;
    justify-content: left;
    width: 100%;
    height: 100%;
}
</style>