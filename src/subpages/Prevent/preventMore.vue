<template>
    <view>
        <view class="title">
            <text>{{ data.type }}</text>
        </view>
        <view class="content">
            <text>{{ data.materialSituation }}</text>
        </view>
        <view class="address">
            <text>{{ data.address }}</text>
        </view>
        <view class="time">
            <text>{{ data.time }}</text>
        </view>
    </view>
</template>

<script lang="ts">
import { onLoad } from '@dcloudio/uni-app';
import { defineComponent, reactive } from 'vue';

export default defineComponent({
    setup() {
        const data = reactive({
            type: '',
            materialSituation: '',
            time: '',
            address: ''
        });
        onLoad((options: any) => {
            let info = JSON.parse(options.info)
            data.type = info.type === 0 ?'常规检测':info.type === 1 ? '医疗诊治' : '其它',
            data.materialSituation = '具有的物资情况：'+info.materialSituation,
            data.time = info.time,
            data.address ='地点：'+ info.address
        })
        return {
            data,
        }
    }
})

</script>

<style lang="less" scoped>
.title {
    margin-top: 30rpx;
    text-align: center;
    font-size: 40rpx;
    font-weight: bold;
}

.content {
    margin: 50rpx 30rpx;
    text-indent: 45rpx;
    font-size: 30rpx;
}

.address {
    margin: 50rpx 30rpx;
    text-align: right;
    font-size: 30rpx;
}

.time {
    margin: 0rpx 30rpx;
    text-align: right;
    font-size: 30rpx;

}</style>