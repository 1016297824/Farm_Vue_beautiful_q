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
          <a class="nav-link text-light" href="staffShow">
            员工管理
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-light" href="attendance">
            考勤管理
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link text-light" href="reportForm">
            报表打印
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
              <a class="dropdown-item" href="passwordSupermanager">
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
  name: "SupermanagerNavbar",
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
