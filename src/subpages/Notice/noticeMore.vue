<template>
    <view>
        <view class="title">
            <text>{{ data.title }}</text>
        </view>
        <view class="content">
            <text>{{ data.content }}</text>
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
            title: '',
            content: '',
            time: '',
        });
        onLoad((options: any) => {
            let info = JSON.parse(options.info)
            data.title = info.title,
            data.content = info.content,
            data.time = info.releaseDate
        })
        return {
            data,
        }
    }
})

</script>

<style lang="less" scoped>
.title {
  margin-top:30rpx;
  text-align: center;
  font-size: 40rpx;
  font-weight: bold;
}
.content{
  margin: 50rpx 30rpx;
  text-indent: 45rpx;
  font-size: 30rpx;
}
.time{
  margin: 50rpx 30rpx;
  text-align: right;
  font-size: 30rpx;

}
</style>