<template>
  <div>
    <el-menu
       :default-active="activeIndex"
       class="el-menu-demo"
       mode="horizontal"
        @select="handleSelect"
       id="backstagetop"
    >
      <el-menu-item index="3"
        >欢迎您：{{staffname}}</el-menu-item>
      <el-menu-item index="2"
        > <a href="#" @click="logout" style="text-decoration:none">注销</a></el-menu-item
      >
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      staffname: sessionStorage.getItem('staffname'),  //保存当前登录的用户名   sessionStorage浏览器的临时存储  浏览器关闭，清空
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {  //注销方法
      sessionStorage.removeItem("staffname");  //从浏览器session清空数据
      this.$router.push("/stafflogin");   //跳转 登录页面

    },
  }
};
</script>

<style >
#backstagetop{
    margin-top: 10px;
    margin-right: -20px;
}

</style>
