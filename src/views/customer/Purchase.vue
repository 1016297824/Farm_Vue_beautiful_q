<template>
  <div>
    <!-- 导航栏 -->
    <customerNavbar />

    <!-- 主体内容 -->
    <div class="container" style="padding-top: 100px; padding-bottom: 120px;">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="card-farm p-4 text-center">
            <!-- 页面标题 -->
            <div class="mb-4">
              <h2 class="farm-title mb-3">
                <i class="bi bi-cart-check me-2"></i>购买中心
              </h2>
              <p class="text-muted">购买优质农产品，享受绿色生活</p>
            </div>

            <!-- 功能开发中提示 -->
            <div class="developing-notice">
              <div class="notice-icon mb-3">
                <i class="bi bi-tools" style="font-size: 3rem; color: var(--farm-green);"></i>
              </div>
              <h4 class="text-farm-primary mb-3">功能开发中</h4>
              <p class="text-muted mb-4">
                该功能正在精心开发中，即将为您带来更好的购物体验。<br>
                敬请期待，或者联系我们了解更多信息。
              </p>
              
              <!-- 联系信息 -->
              <div class="contact-info">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <div class="contact-item">
                      <i class="bi bi-telephone-fill me-2 text-farm-primary"></i>
                      <span>电话：400-123-4567</span>
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <div class="contact-item">
                      <i class="bi bi-envelope-fill me-2 text-farm-primary"></i>
                      <span>邮箱：farm@example.com</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- 返回按钮 -->
              <div class="mt-4">
                <button type="button" class="btn btn-farm-primary me-3" @click="$router.go(-1)">
                  <i class="bi bi-arrow-left me-2"></i>返回上一页
                </button>
                <button type="button" class="btn btn-outline-success" @click="$router.push('/customer')">
                  <i class="bi bi-house me-2"></i>返回首页
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 页脚 -->
    <footerNavbar />
  </div>
</template>

<script>
import customerNavbar from "@/components/Header/CustomerNavbar.vue";
import footerNavbar from "@/components/FooterNavbar.vue";

export default {
  name: "Purchase",
  components: {
    customerNavbar,
    footerNavbar
  }
};
</script>

<style scoped>
.developing-notice {
  padding: 2rem;
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.05), rgba(129, 199, 132, 0.05));
  border-radius: 15px;
  border: 2px dashed var(--farm-green-light);
}

.contact-item {
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  border: 1px solid var(--farm-border-light);
}

.notice-icon {
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}
</style>
