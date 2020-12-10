<template>
    <div id="app">
      <br>
      <el-page-header content="用户中心">
      </el-page-header>
      <br>
      <hr>
      <div style="margin-left: 100px;margin-top: 30px;width: 900px;">
        <el-tabs :tab-position="tabPosition">
          <el-tab-pane>
            <span slot="label"><i class="el-icon-user-solid"></i> 我的信息</span>
            <h2 style="text-align: center;margin-top: -5px">我的信息</h2>
            <div style="margin-left: 200px">
              <el-form  label-width="80px">
                <el-input  type="hidden"></el-input>
                <el-form-item label="用户账号">
                  <el-input  readonly style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="用户密码">
                  <el-input style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="用户姓名">
                  <el-input style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="用户性别">
                  <el-input  readonly style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="用户电话">
                  <el-input style="width: 300px"></el-input>
                </el-form-item>
                <el-form-item label="省">
                  <el-select v-model="pid" @change="getcity">
                    <el-option :value="0" label="---请选择省---"></el-option>
                    <el-option v-for="p in province" :value="p.provinceid" :label="p.provincename"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="市">
                  <el-select v-model="cid" @change="getarea">
                    <el-option :value="0" label="---请选择市---"></el-option>
                    <el-option v-for="c in city" :value="c.cityid" :label="c.cityname"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="区">
                  <el-select v-model="aid" @change="getareaname">
                    <el-option :value="0" label="---请选择区---"></el-option>
                    <el-option v-for="a in area" :value="a.areaid" :label="a.areaname"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="用户地址">
                  <el-input style="width: 300px"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" style="margin-left: 280px">确定修改</el-button>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="el-icon-s-promotion"></i> 我的订单</span>
            我的订单

          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="el-icon-location"></i> 注册商户</span>
            注册商户
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="el-icon-location"></i> 商户管理</span>
            商户管理
          </el-tab-pane>
        </el-tabs>
      </div>

    </div>
</template>

<script>
    export default {
        name: "app",
      data(){
          return {
            tabPosition: 'left',
            updateform: {
              updateuserid:0,
              updateuseraccount: '',
              updateuserpwd:'',
              updateusername:'',
              updateusersex:'男',
              updateuserphone:'',
              updateuseraddress:''
            },
          }
      }
    }
</script>

<style scoped>

</style>
