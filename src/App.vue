<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
onLaunch(() => {
  console.log("App Launch");
  let get_Menu = uni.getStorageSync('MenuButton')
  if (!get_Menu) {
    // #ifndef H5 || APP-PLUS || MP-ALIPAY
    const res = uni.getMenuButtonBoundingClientRect()
    uni.setStorageSync('MenuButton', res)
    // #endif
  }
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style></style>
