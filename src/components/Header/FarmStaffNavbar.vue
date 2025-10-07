// 顾客导航
<template>
  <div id="navbar fixed-top">
    <nav class="navbar bg-primary navbar-dark" style="height:53px">
      <span class="navbar-brand mb-0 h1">
        <img src="@/assets/imgs/Windows12.jpg" width="30" height="30" alt="" />
        西塘草舍农场
      </span>
      <ul class="nav justify-content-end">
        <li class="nav-item">
          <a class="nav-link text-light" href="productShow">
            农产品管理
          </a>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle text-white"
            data-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span> 采购管理 </span>
          </a>
          <ul class="dropdown-menu dropdown-menu-right">
            <li>
              <a class="dropdown-item" href="rawMaterial">
                生产采购
              </a>
            </li>
            <div class="dropdown-divider"></div>
            <li>
              <a class="dropdown-item" href="fertilizer">
                化肥饲料采购
              </a>
            </li>
            <div class="dropdown-divider"></div>
            <li>
              <a class="dropdown-item" href="restaurantMaterial">
                餐厅物资采购
              </a>
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link text-light" href="sale">
            产品销售
          </a>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle text-white"
            data-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span> {{ username }} </span>
          </a>
          <ul class="dropdown-menu dropdown-menu-right">
            <li>
              <a class="dropdown-item" href="passwordFarmStaff">
                修改密码
              </a>
            </li>
            <div class="dropdown-divider"></div>
            <li>
              <a class="dropdown-item" @click="loginOut"> 退出登录 </a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: "FarmStaffNavbar",
  data: () => ({
    username: sessionStorage.getItem("username")
  }),
  methods: {
    loginOut: function() {
      this.$router.replace("/login");
    }
  }
};
</script>
