<template>
  <footer 
    class="fixed-bottom text-center text-white py-3"
    style="background: linear-gradient(90deg, #2e7d32 0%, #4caf50 100%); border-top: 1px solid rgba(255, 255, 255, 0.2);"
  >
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-6 col-md-6 mb-2 mb-md-0">
          <p class="m-0" style="font-size: 0.9rem;">
            <i class="fas fa-leaf mr-1"></i>2020 西塘草舍农场 - 绿色健康生活的选择
          </p>
        </div>
        <div class="col-lg-6 col-md-6">
          <div class="flex justify-center space-x-4">
            <a href="#" class="text-white hover:text-yellow-300 transition-colors duration-300">
              <i class="fab fa-weixin text-xl"></i>
            </a>
            <a href="#" class="text-white hover:text-red-400 transition-colors duration-300">
              <i class="fab fa-weibo text-xl"></i>
            </a>
            <a href="#" class="text-white hover:text-blue-400 transition-colors duration-300">
              <i class="fas fa-phone-alt text-xl"></i>
            </a>
          </div>
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
/* 页脚样式 */
footer {
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

/* 响应式设计 */
@media (max-width: 768px) {
  footer {
    padding: 0.8rem 0 !important;
  }
  
  p {
    font-size: 0.85rem !important;
  }
  
  .flex { 
    display: flex;
  }
  
  .justify-center { 
    justify-content: center;
  }
  
  .space-x-4 > * {
    margin: 0 8px;
  }
}

@media (max-width: 576px) {
  .row {
    flex-direction: column;
  }
  
  .col-lg-6 {
    margin-bottom: 0.5rem !important;
  }
  
  p {
    font-size: 0.8rem !important;
  }
}
</style>
