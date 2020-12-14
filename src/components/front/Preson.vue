<template>
    <div id="app">
      <br>
      <el-page-header content="用户中心">
      </el-page-header>
      <br>
      <hr>
      <div style="margin-left: 100px;margin-top: 30px;width: 1000px;">
        <el-tabs :tab-position="tabPosition">
          <el-tab-pane>
            <span slot="label"><i class="el-icon-user-solid"></i> 我的信息</span>
            <h2 style="text-align: center;margin-top: -5px">我的信息</h2>
            <div style="margin-left: 200px">
              <el-form :model="updateform"  label-width="80px">
                <el-input v-model="updateform.updateuserid"  type="hidden"></el-input>
                <el-form-item label="用户账号">
                  <el-input  v-model="updateform.updateuseraccount" readonly style="width: 350px"></el-input>
                </el-form-item>
                <el-form-item label="用户密码">
                  <el-input v-model="updateform.updateuserpwd" style="width: 350px"></el-input>
                </el-form-item>
                <el-form-item label="用户姓名">
                  <el-input v-model="updateform.updateusername" style="width: 350px"></el-input>
                </el-form-item>
                <el-form-item label="用户性别">
                  <el-input v-model="updateform.updateusersex"  readonly style="width: 350px"></el-input>
                </el-form-item>
                <el-form-item label="用户电话">
                  <el-input v-model="updateform.updateuserphone" style="width: 350px"></el-input>
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
                  <el-input v-model="updateform.updateuseraddress" style="width: 350px"></el-input>
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
            <el-tabs type="border-card" style="margin: 20px;">
              <el-tab-pane>
                <span slot="label"><i class="el-icon-date"></i> 全部订单</span>
                全部订单
              </el-tab-pane>
              <el-tab-pane>
                <span slot="label"><i class="el-icon-s-finance"></i> 待付款</span>
                待付款
              </el-tab-pane>
              <el-tab-pane>
                <span slot="label"><i class="el-icon-truck"></i> 待收货</span>
                待收货
              </el-tab-pane>
              <el-tab-pane>
                <span slot="label"><i class="el-icon-finished"></i> 已收货</span>
                已收货
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="el-icon-location"></i> 注册商户</span>
            注册商户
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label"><i class="el-icon-location"></i> 商户管理</span>
            商户管理
            <el-tabs type="border-card" style="margin: 20px;">
              <el-tab-pane>
                <span slot="label"><i class="el-icon-user-solid"></i> 商户信息</span>
                商户信息
              </el-tab-pane>
              <el-tab-pane>
                <span slot="label"><i class="el-icon-s-promotion"></i> 商户订单</span>
                商户订单
                <el-tabs type="border-card" style="margin: 20px;">
                  <el-tab-pane>
                    <span slot="label"><i class="el-icon-date"></i> 全部订单</span>
                    全部订单
                  </el-tab-pane>
                  <el-tab-pane>
                    <span slot="label"><i class="el-icon-s-finance"></i> 待付款</span>
                    待付款
                  </el-tab-pane>
                  <el-tab-pane>
                    <span slot="label"><i class="el-icon-truck"></i> 待收货</span>
                    待收货
                  </el-tab-pane>
                  <el-tab-pane>
                    <span slot="label"><i class="el-icon-finished"></i> 已收货</span>
                    已收货
                  </el-tab-pane>
                </el-tabs>
              </el-tab-pane>
            </el-tabs>
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
            province:[],
            city:[],
            area:[],
            pid:0,
            cid:0,
            aid:0
          }
      },
      methods:{
        //查询省
        getprovince:function () {
          var _this = this;
          this.$axios.post("queryprovince.action")
            .then(function (result) {
              _this.province=result.data;
            })
            .catch(function (error) {
              console.log(error)
            });
        },
        //查询市
        getcity:function(){
          var _this = this;
          var params = new URLSearchParams();
          params.append("pid",_this.pid);

          this.$axios.post("querycitybypid.action",params)
            .then(function (result) {
              /*console.log(result.data)*/
              _this.city=result.data;
              _this.province.forEach((item)=>{
                if(item.provinceid==_this.pid){
                  _this.updateform.updateuseraddress=item.provincename
                }
              })

            })
            .catch(function (error) {
              console.log(error)
            });

        },
        //查询区
        getarea:function(){
          var _this = this;
          var params = new URLSearchParams();
          params.append("cid",_this.cid);

          this.$axios.post("queryareabycid.action",params)
            .then(function (result) {
              _this.area = result.data;

              _this.city.forEach((item) => {
                if (item.cityid == _this.cid) {
                 _this.updateform.updateuseraddress = _this.updateform.updateuseraddress + item.cityname
                }
              })
            })
            .catch(function (error) {
              console.log(error)
            });
        },
        //获取区的名字加载到地址输入框中
        getareaname(){
          var _this=this;
          _this.area.forEach((item) => {
            if (item.areaid == _this.aid) {
              _this.updateform.updateuseraddress = _this.updateform.updateuseraddress + item.areaname
            }
          })
        }
      },
      created() {
          this.getprovince();
      }
    }
</script>

<style scoped>

</style>
