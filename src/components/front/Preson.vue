<template>
    <div id="app">
      <br>
      <hr>
      <div style="margin-left: 100px;margin-top: 30px;width: 1200px;">
        <el-tabs :tab-position="tabPosition">
          <el-tab-pane>
            <span slot="label"><i class="el-icon-user-solid"></i> 我的信息</span>
            <h2 style="text-align: center;margin-top: -5px">我的信息</h2>
            <div style="margin-left: 300px">
              <el-form :model="updateform"  label-width="80px" ref="updateformref" :rules="updateforms">
                <el-input v-model="updateform.updateuserid"  type="hidden"></el-input>
                <el-form-item label="用户账号" >
                  <el-input  v-model="updateform.updateuseraccount" readonly style="width: 350px"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="updateuserpwd">
                  <el-input v-model="updateform.updateuserpwd" style="width: 350px"></el-input>
                </el-form-item>
                <el-form-item label="用户姓名" prop="updateusername">
                  <el-input v-model="updateform.updateusername" style="width: 350px"></el-input>
                </el-form-item>
                <el-form-item label="用户性别">
                  <el-input v-model="updateform.updateusersex"  readonly style="width: 350px"></el-input>
                </el-form-item>
                <el-form-item label="用户电话" prop="updateuserphone">
                  <el-input v-model="updateform.updateuserphone" style="width: 350px"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" style="margin-left: 330px" @click="updateuser('updateformref')">确定修改</el-button>
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
                <el-table
                  :data="orders">
                  <el-table-column
                    prop="commodity.comname"
                    label="商品名">
                  </el-table-column>
                  <el-table-column
                    prop="commodity.comimg"
                    label="商品图">
                    <template slot-scope="scope">
                      <el-popover placement="top-start" trigger="hover">
                        <img :src="scope.row.commodity.comimg" style="width: 150px;height: 150px">
                        <img slot="reference" :src="'../'+scope.row.commodity.comimg" style="width: 100px;height: 100px">
                      </el-popover>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="ordercount"
                    label="数量">
                  </el-table-column>
                  <el-table-column
                    prop="user.username"
                    label="用户名">
                  </el-table-column>
                  <el-table-column
                    prop="shangHuInfo.shaddress"
                    label="商户地址">
                  </el-table-column>
                  <el-table-column
                    prop="ordertime"
                    label="订单时间">
                  </el-table-column>
                  <el-table-column
                    prop="totalmoney"
                    label="总金额">
                  </el-table-column>
                  <el-table-column
                    prop="orderstate"
                    label="订单状态">
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    label="操作">
                    <template slot-scope="scope">
                      <el-popconfirm
                                      title="确定取消吗？"
                      >
                        <el-button type="danger" slot="reference" round >取消订单</el-button>
                      </el-popconfirm>
                    </template>
                  </el-table-column>
                </el-table>
                <br>
                <el-pagination
                  background
                  layout="total, sizes, prev, pager, next, jumper"
                  :page-sizes="[5, 10, 15, 20]"
                  :page-size="size"
                  :total="total"
                  :current-page="currentpage"
                  @prev-click="prvpage"
                  @next-click="nextpage"
                  @current-change="currentchange"
                  @size-change="sizechange">
                </el-pagination>
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
          <el-tab-pane v-if="usersh==0">
            <span slot="label"><i class="el-icon-location"></i> 注册商户</span>
            <h2 style="text-align: center;margin-top: -5px">注册商户</h2>
            <div style="margin-left: 300px">
              <el-form :model="addform" label-width="80px" :rules="addforms" ref="addformref">
                <el-form-item label="商户名" prop="shname">
                  <el-input v-model="addform.shname" style="width: 350px"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                  <el-input v-model="addform.username" style="width: 350px"></el-input>
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
                <el-form-item label="商户地址" prop="shaddress">
                  <el-input v-model="addform.shaddress" style="width: 350px"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addsh('addformref')">确 定</el-button>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane v-else-if="usersh==1">
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
              updateuserid:sessionStorage.getItem("userid"),
              updateuseraccount:sessionStorage.getItem("useraccount"),
              updateuserpwd:sessionStorage.getItem("userpwd"),
              updateusername:sessionStorage.getItem("username"),
              updateusersex:sessionStorage.getItem("usersex"),
              updateuserphone:sessionStorage.getItem("userphone")
            },
            updateforms:{
              updateuserpwd:[
                { required: true, message: "密码不能为空", trigger: "blur" },
                { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
              ],
              updateusername:[
                { required: true, message: "姓名不能为空", trigger: "blur" },
                {pattern: /^[\u4E00-\u9FA5]+$/,message: '姓名只能为中文' }
              ],
              updateuserphone:[
                { required: true, message: "电话号码不能为空", trigger: "blur" },
                {pattern:/^1[0-9]\d{9}$/,message: '请输入正确的11位手机号码' }
              ]
            },
            orders:[],
            pageindex:1,//当前显示页面
            totalpage:0,//总页面
            total:0,  //总条目数
            size:5,  //每页显示多少条
            currentpage:1,
            usersh:sessionStorage.getItem("usersh"),
            addform: {
              shname:'',
              userid:sessionStorage.getItem("userid"),
              username:sessionStorage.getItem("username"),
              shaddress:''
            },
            addforms:{
              shname: [
                { required: true, message: "商户名不能为空", trigger: "blur" },
                { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
              ],
              shaddress:[
                { required: true, message: "商户地址不能为空", trigger: "blur" },
                {pattern: /^[\u4E00-\u9FA5]+$/,message: '商户地址只能为中文' }
              ]
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
        getorder(){
          var _this = this;
          var params = new URLSearchParams();
          params.append("page",_this.pageindex);
          params.append("rows",_this.size);

          this.$axios.post("queryordercount.action",params).then(function (result) {  //成功  执行then里面的方法
            _this.orders = result.data.rows;
            console.log(_this.orders)

            //计算总页数
            _this.total=result.data.total;
            _this.totalpage=_this.total%_this.size==0?_this.total/_this.size:Math.floor(_this.total/_this.size)+1

          }).catch(function (error) { //失败 执行catch方法
            console.log(error)
          });
        },
        //上一页
        prvpage:function () {
          this.pageindex=this.pageindex==1?1:this.pageindex-1;
          this.getorder();
        },
        //下一页
        nextpage:function () {
          this.pageindex=this.pageindex==this.totalpage?this.totalpage:this.pageindex+1;
          this.getorder();
        },
        //当前第一页
        currentchange(val){
          this.pageindex=val;
          this.getorder();
        },
        //每页多少条
        sizechange(val){
          this.size=val
          this.getorder();
        },
        updateuser(formName){
          this.$refs[formName].validate((valid) => {
            if (valid) {
              var _this = this;
              var params = new URLSearchParams();
              params.append("userid",_this.updateform.updateuserid);
              params.append("userpwd",_this.updateform.updateuserpwd);
              params.append("username",_this.updateform.updateusername);
              params.append("userphone",_this.updateform.updateuserphone);


              this.$axios.post("updateuser.action",params).then(function (result) {  //成功  执行then里面的方法

                if(result.data.code=="1"){
                  _this.$message({
                    message: result.data.msg,
                    type: 'success'
                  });

                }else if(result.data.code=="0"){
                  _this.$message.error(result.data.msg);
                }


              }).catch(function (error) { //失败 执行catch方法
                console.log(error)
              });
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
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
                  _this.addform.shaddress=item.provincename
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
                  _this.addform.shaddress = _this.addform.shaddress + item.cityname
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
              _this.addform.shaddress = _this.addform.shaddress + item.areaname
            }
          })
        },
        addsh(formName){
          this.$refs[formName].validate(valid => {
            if (valid) {
              var _this = this;
              var params = new URLSearchParams();
              params.append("shname",_this.addform.shname);
              params.append("user.userid",_this.addform.userid);
              params.append("shaddress",_this.addform.shaddress);
              params.append("shstate","未审核");

              this.$axios.post("addShangHu.action",params).then(function (result) {  //成功  执行then里面的方法

                _this.$message({
                  message: "申请注册已提交，待审核",
                  type: 'success'
                })

              }).catch(function (error) { //失败 执行catch方法
                console.log(error)
              });
            } else {
              console.log("error submit!!");
              return false;
            }
          });
        }
      },
      created() {
          this.getorder();
          this.getprovince()
      }
    }
</script>

<style scoped>

</style>
