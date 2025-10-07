<template>
  <footer class="farm-footer">
    <div class="container-fluid">
      <div class="row align-items-center">
        <!-- 左侧版权信息 -->
        <div class="col-lg-6 col-md-6 text-center text-md-start mb-2 mb-md-0">
          <p class="m-0 footer-text">
            <i class="bi bi-leaf me-2"></i>
            <span class="fw-medium">2024 西塘草舍农场</span>
            <span class="d-none d-sm-inline"> - 绿色健康生活的选择</span>
          </p>
        </div>

        <!-- 右侧联系方式 -->
        <div class="col-lg-6 col-md-6 text-center text-md-end">
          <div class="footer-links">
            <a href="#" class="footer-link" title="微信联系">
              <i class="bi bi-wechat"></i>
            </a>
            <a href="#" class="footer-link" title="微博关注">
              <i class="bi bi-chat-dots"></i>
            </a>
            <a href="tel:400-123-4567" class="footer-link" title="电话咨询">
              <i class="bi bi-telephone"></i>
            </a>
            <a href="#" class="footer-link" title="地理位置">
              <i class="bi bi-geo-alt"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- 底部备案信息 -->
      <div class="row mt-2 pt-2 border-top border-light border-opacity-25">
        <div class="col-12 text-center">
          <small class="footer-copyright">
            <i class="bi bi-c-circle me-1"></i>
            浙ICP备18001234号 | 农产品质量安全认证
          </small>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterNavbar"
};
</script>

<style scoped>
/* 农场主题页脚 */
.farm-footer {
  background: var(--farm-gradient-primary);
  color: white;
  padding: 0.75rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 -0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  min-height: 55px;
}

/* 页脚文本 */
.footer-text {
  font-size: 0.9rem;
  opacity: 0.95;
  line-height: 1.4;
}

/* 页脚链接 */
.footer-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.footer-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  text-decoration: none;
  border-radius: 50%;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.footer-link:hover {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
}

/* 版权信息 */
.footer-copyright {
  opacity: 0.8;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.9);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .farm-footer {
    padding: 0.75rem 0;
    min-height: 55px;
  }

  .footer-text {
    font-size: 0.85rem;
  }

  .footer-links {
    justify-content: center;
    margin-top: 0.25rem;
  }

  .footer-link {
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }

  .footer-copyright {
    font-size: 0.7rem;
    margin-top: 0.25rem;
  }
}

@media (max-width: 576px) {
  .farm-footer {
    padding: 0.5rem 0;
    min-height: 50px;
  }

  .footer-text {
    font-size: 0.8rem;
  }

  .footer-links {
    gap: 0.75rem;
  }

  .footer-link {
    width: 32px;
    height: 32px;
    font-size: 0.9rem;
  }

  /* 移动端隐藏部分文本 */
  .d-none.d-sm-inline {
    display: none !important;
  }
}

/* 动画效果 */
@keyframes footerSlideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.farm-footer {
  animation: footerSlideUp 0.5s ease-out;
}
</style>
