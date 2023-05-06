<template>
  <view>
    <view class="nav-gation">
      <view class="top"></view>
      <view class="height">xxx校园健康管理</view>
    </view>
    <view class="top-picture">
      <image mode="heightFix" src="/static/background/1.jpg" />
    </view>
    <uni-card :is-shadow="false" margin="5px">
      <view class="nav">
        <view class="nav-item">
          <navigator url="/subpages/Apply/apply" hover-class="navigator-hover">
            <view>
              <image src="/static/icon/qinjia.png" mode="aspectFit" class="image" />
            </view>
            <text>申请审批</text>
          </navigator>
        </view>
        <view class="nav-item">
          <navigator url="/subpages/Notice/notice" hover-class="navigator-hover">
            <view>
              <image src="/static/icon/gonggao.png" mode="aspectFit" class="image" />
            </view>
            <text>公告通知</text>
          </navigator>
        </view>
        <view class="nav-item">
          <navigator url="/subpages/Clock/clock" hover-class="navigator-hover">
            <view>
              <image src="/static/icon/daka.png" mode="aspectFit" class="image" />
            </view>
            <text>打卡管理</text>
          </navigator>
        </view>
        <view class="nav-item">
          <navigator url="/subpages/Prevent/prevention" hover-class="navigator-hover">
            <view>
              <image src="/static/icon/chakan.png" mode="aspectFit" class="image" />
            </view>
            <text>防控查看</text>
          </navigator>
        </view>
      </view>
    </uni-card>
    <view class="bottom">
      <uni-notice-bar show-icon="true" :text="data.title" show-get-more more-text="查看更多" scrollable
        @getmore="getMore">
      </uni-notice-bar>
    </view>
  </view>
</template>
  
<script setup lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue';
import { noticeList } from '@/api/notice.js';


let menu_top = ref<string>('')
let menu_height = ref<string>('')
onMounted(async() => {
  let MenuButton = uni.getStorageSync('MenuButton')
  console.log(MenuButton)
  menu_top.value = MenuButton.top + 'px'
  menu_height.value = MenuButton.height + 'px'
  await fetchData()
});
const data = reactive({
  title: ''

})
const getMore = () => {
  uni.navigateTo({
    url: "/subpages/Notice/notice"
  })
}
const fetchData = () => {
  noticeList({page:1,size:10000}).then((res: any) => {
    if (res.success_code === 200) {
      res.message.forEach((item: any, index: any) => {
        if (index < 3) {
          data.title += item.title + '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'
        }
      })
      console.log(data.title)
    }
  })
}


</script>
  
<style lang="less" scoped>
.nav-gation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;

  .top {
    height: v-bind('menu_top');
  }

  .height {
    height: v-bind('menu_height');
    line-height: v-bind('menu_height');
    padding-left: 20rpx;
    font-weight: bold;
    font-size: 35rpx;
    color: #fff;
  }
}

.top-picture {
  image {
    width: 100% !important;
  }

  //height: 550rpx;
}

.nav {
  display: flex;
  margin-top: 70rpx;

  .nav-item {
    .image {
      width: 35px;
      height: 35px;
    }

    width: 25%;
    text-align: center;

    text {
      font-size: 30rpx;
      font-weight: bold;
    }
  }
}

.bottom {
  font-weight: bold;
  margin-top: 80rpx;
}
</style>