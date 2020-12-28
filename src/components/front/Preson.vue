<template>
  <div id="app">
    <br>
    <hr>
    <div style="margin-left: 100px;margin-top: 30px;width: 1200px;">
      <el-tabs :tab-position="tabPosition" @tab-click="select">
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
        <el-tab-pane name="dingdan">
          <span slot="label"><i class="el-icon-s-promotion"></i> 我的订单</span>
          我的订单
          <el-tabs v-model="dingdan" type="border-card" @tab-click="click" style="margin: 20px;">
            <el-tab-pane  name="quanBu">
              <span slot="label"><i class="el-icon-date"></i> 全部订单</span>
              <div v-if="isquanBu">
                全部订单
                <el-table
                  :data="orders">
                  <el-table-column
                    prop="commodity.comname"
                    label="商品名"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="commodity.comimg"
                    label="商品图"
                    align="center">
                    <template slot-scope="scope">
                      <el-popover placement="top-start" trigger="hover">
                        <img :src="scope.row.commodity.comimg" style="width: 150px;height: 150px">
                        <img slot="reference" :src="'../'+scope.row.commodity.comimg" style="width: 100px;height: 100px">
                      </el-popover>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="ordercount"
                    label="数量"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="user.username"
                    label="用户名"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="shangHuInfo.shaddress"
                    label="商户地址"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="ordertime"
                    label="订单时间"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="totalmoney"
                    label="总金额"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    label="订单状态"
                    align="center">
                    <template slot-scope="scope">
                      {{ scope.row.orderstate == 0 ? '待付款' : scope.row.orderstate == 1 ?'待发货': scope.row.orderstate == 2 ?'待收货': scope.row.orderstate == 3 ?'待收货': scope.row.orderstate == 4 ?'已收货': '' }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    label="操作"
                    align="center" width="200">
                    <template slot-scope="scope">
                      <el-button type="danger" slot="reference" style="width: 110px" round v-if="scope.row.orderstate==0" @click="fuKuan(scope.row)">付款</el-button>
                      <el-popconfirm  @confirm="shanchu(scope.row)"
                                      title="确定删除吗？"
                      >
                        <el-button type="danger" slot="reference" round v-if="scope.row.orderstate==0">删除订单</el-button>
                      </el-popconfirm>
                      <el-popconfirm @confirm="quXiao(scope.row)"
                                     title="确定取消吗？"
                      >
                        <el-button type="danger" slot="reference" round v-if="scope.row.orderstate==1">取消订单</el-button>
                      </el-popconfirm>
                      <el-button type="danger" slot="reference" round v-if="scope.row.orderstate==2||scope.row.orderstate==3" @click="shouHuo(scope.row)">确认收货</el-button>
                      <el-popconfirm @confirm="YongHushanchu(scope.row)"
                                     title="确定删除吗？"
                      >
                        <el-button type="danger" slot="reference" style="width: 110px"  round v-if="scope.row.orderstate==4">删除</el-button>
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
              </div>
            </el-tab-pane>
            <el-tab-pane name="daiFuKuan">
              <span slot="label"><i class="el-icon-s-finance"></i> 待付款</span>
              <div v-if="isdaiFuKuan">
                待付款
                <el-table
                  :data="orders">
                  <el-table-column
                    prop="commodity.comname"
                    label="商品名"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="commodity.comimg"
                    label="商品图"
                    align="center">
                    <template slot-scope="scope">
                      <el-popover placement="top-start" trigger="hover">
                        <img :src="scope.row.commodity.comimg" style="width: 150px;height: 150px">
                        <img slot="reference" :src="'../'+scope.row.commodity.comimg" style="width: 100px;height: 100px">
                      </el-popover>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="ordercount"
                    label="数量"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="user.username"
                    label="用户名"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="shangHuInfo.shaddress"
                    label="商户地址"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="ordertime"
                    label="订单时间"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="totalmoney"
                    label="总金额"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    label="订单状态"
                    align="center">
                    <template slot-scope="scope">
                      {{ scope.row.orderstate == 0 ? '待付款' : scope.row.orderstate == 1 ?'待发货': scope.row.orderstate == 2 ?'待收货': scope.row.orderstate == 3 ?'已收货': scope.row.orderstate == 4 ?'已收货': '' }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    label="操作"
                    align="center" width="200">
                    <template slot-scope="scope">
                      <el-button type="danger" slot="reference" style="width: 110px" round v-if="scope.row.orderstate==0" @click="fuKuan(scope.row)">付款</el-button>
                      <el-popconfirm @confirm="shanchu(scope.row)"
                                     title="确定删除吗？"
                      >
                        <el-button type="danger" slot="reference" round v-if="scope.row.orderstate==0">删除订单</el-button>
                      </el-popconfirm>
                      <el-popconfirm
                        title="确定取消吗？"
                      >
                        <el-button type="danger" slot="reference" round v-if="scope.row.orderstate==1">取消订单</el-button>
                      </el-popconfirm>
                      <el-button type="danger" slot="reference" round v-if="scope.row.orderstate==2">确认收货</el-button>
                      <el-button type="danger" slot="reference" style="width: 110px" round v-if="scope.row.orderstate==3">删除</el-button>
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
              </div>
            </el-tab-pane>
            <el-tab-pane name="daiFaHuo">
              <span slot="label"><i class="el-icon-s-finance"></i> 待发货</span>
              <div v-if="isdaiFaHuo">
                待发货
                <el-table
                  :data="orders">
                  <el-table-column
                    prop="commodity.comname"
                    label="商品名"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="commodity.comimg"
                    label="商品图"
                    align="center">
                    <template slot-scope="scope">
                      <el-popover placement="top-start" trigger="hover">
                        <img :src="scope.row.commodity.comimg" style="width: 150px;height: 150px">
                        <img slot="reference" :src="'../'+scope.row.commodity.comimg" style="width: 100px;height: 100px">
                      </el-popover>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="ordercount"
                    label="数量"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="user.username"
                    label="用户名"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="shangHuInfo.shaddress"
                    label="商户地址"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="ordertime"
                    label="订单时间"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="totalmoney"
                    label="总金额"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    label="订单状态"
                    align="center">
                    <template slot-scope="scope">
                      {{ scope.row.orderstate == 0 ? '待付款' : scope.row.orderstate == 1 ?'待发货': scope.row.orderstate == 2 ?'待收货': scope.row.orderstate == 3 ?'已收货': scope.row.orderstate == 4 ?'已收货': '' }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    label="操作"
                    align="center" width="200">
                    <template slot-scope="scope">
                      <el-popconfirm @confirm="quXiao(scope.row)"
                                     title="确定取消吗？"
                      >
                        <el-button type="danger" slot="reference">取消订单</el-button>
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
              </div>
            </el-tab-pane>
            <el-tab-pane  name="daiShouHuo">
              <span slot="label"><i class="el-icon-truck"></i> 待收货</span>
              <div v-if="isdaiShouHuo">
                待收货
                <el-table
                  :data="orders">
                  <el-table-column
                    prop="commodity.comname"
                    label="商品名"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="commodity.comimg"
                    label="商品图"
                    align="center">
                    <template slot-scope="scope">
                      <el-popover placement="top-start" trigger="hover">
                        <img :src="scope.row.commodity.comimg" style="width: 150px;height: 150px">
                        <img slot="reference" :src="'../'+scope.row.commodity.comimg" style="width: 100px;height: 100px">
                      </el-popover>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="ordercount"
                    label="数量"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="user.username"
                    label="用户名"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="shangHuInfo.shaddress"
                    label="商户地址"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="ordertime"
                    label="订单时间"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="totalmoney"
                    label="总金额"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    label="订单状态"
                    align="center">
                    <template slot-scope="scope">
                      {{ scope.row.orderstate == 0 ? '待付款' : scope.row.orderstate == 1 ?'待发货': scope.row.orderstate == 2 ?'待收货': scope.row.orderstate == 3 ?'已收货': scope.row.orderstate == 4 ?'已收货': '' }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    label="操作"
                    align="center" width="200">
                    <template slot-scope="scope">
                      <el-button type="danger" slot="reference" round v-if="scope.row.orderstate==0" @click="fuKuan(scope.row)">付款</el-button>
                      <el-popconfirm
                        title="确定取消吗？"
                      >
                        <el-button type="danger" slot="reference" round v-if="scope.row.orderstate==1">取消订单</el-button>
                      </el-popconfirm>
                      <el-button type="danger" slot="reference" round v-if="scope.row.orderstate==2||scope.row.orderstate==3" @click="shouHuo(scope.row)">确认收货</el-button>
                      <el-button type="danger" slot="reference" round v-if="scope.row.orderstate==4">删除</el-button>
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
              </div>
            </el-tab-pane>
            <el-tab-pane name="yiShouHuo">
              <span slot="label"><i class="el-icon-finished"></i> 已收货</span>
              <div v-if="isyiShouHuo">
                已收货
                <el-table
                  :data="orders">
                  <el-table-column
                    prop="commodity.comname"
                    label="商品名"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="commodity.comimg"
                    label="商品图"
                    align="center">
                    <template slot-scope="scope">
                      <el-popover placement="top-start" trigger="hover">
                        <img :src="scope.row.commodity.comimg" style="width: 150px;height: 150px">
                        <img slot="reference" :src="'../'+scope.row.commodity.comimg" style="width: 100px;height: 100px">
                      </el-popover>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="ordercount"
                    label="数量"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="user.username"
                    label="用户名"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="shangHuInfo.shaddress"
                    label="商户地址"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="ordertime"
                    label="订单时间"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="totalmoney"
                    label="总金额"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    label="订单状态"
                    align="center">
                    <template slot-scope="scope">
                      {{ scope.row.orderstate == 0 ? '待付款' : scope.row.orderstate == 1 ?'待发货': scope.row.orderstate == 2 ?'待收货': scope.row.orderstate == 3 ?'已收货': scope.row.orderstate == 4 ?'已收货': '' }}
                    </template>
                  </el-table-column>
                  <el-table-column
                    fixed="right"
                    label="操作"
                    align="center" width="200">
                    <template slot-scope="scope">
                      <el-popconfirm @confirm="YongHushanchu(scope.row)"  title="确定删除吗？"  >
                        <el-button type="danger" slot="reference" style="width: 110px"  round >删除</el-button>
                      </el-popconfirm>

                      <!--  <el-button type="danger" slot="reference" round v-if="scope.row.orderstate==0" @click="fuKuan(scope.row)">付   款</el-button>
                        <el-popconfirm
                          title="确定取消吗？"
                        >
                          <el-button type="danger" slot="reference" round v-if="scope.row.orderstate==1">取消订单</el-button>
                        </el-popconfirm>
                        <el-button type="danger" slot="reference" round v-if="scope.row.orderstate==2||scope.row.orderstate==3">确认收货</el-button>

-->
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
              </div>
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
        <el-tab-pane v-else-if="usersh==1" name="guanLi">
          <span slot="label"><i class="el-icon-location"></i> 商户管理</span>
          商户管理
          <el-tabs v-model="shangHu" type="border-card" style="margin: 20px;" @tab-click="selectShangHu">
            <el-tab-pane name="shangHuGuanLi">
              <span slot="label"><i class="el-icon-user-solid"></i> 商户信息</span>
              <div v-if="isShangHuGuanLi">
              <h2 style="text-align: center;margin-top: -5px">商户信息</h2>
              <div style="margin-left: 300px">
                <el-form :model="updateformsh" label-width="80px" ref="updateformshref" :rules="updateformshs">
                  <el-input v-model="updateformsh.shid" type="hidden"></el-input>
                  <el-form-item label="商户名" prop="shname">
                    <el-input v-model="updateformsh.shname" style="width: 350px"></el-input>
                  </el-form-item>
                  <el-form-item label="用户名">
                    <el-input v-model="updateformsh.username" readonly style="width: 350px"></el-input>
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
                  <el-form-item label="商户地址" prop="shaddress" >
                    <el-input v-model="updateformsh.shaddress" style="width: 350px"></el-input>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button type="primary" style="margin-left: 330px" @click="updatesh('updateformshref')">确定修改</el-button>
                </div>
              </div>
              </div>
            </el-tab-pane>
            <el-tab-pane name="shangHuDingDan">
              <span slot="label"><i class="el-icon-s-promotion"></i> 商户订单</span>
              商户订单
              <div v-if="isShangHuDingDan">
              <el-tabs v-model="shangDingDan" type="border-card" @tab-click="clickShangHu" style="margin: 20px;">
                <el-tab-pane  name="shangQuanBu">
                  <span slot="label"><i class="el-icon-date"></i> 全部订单</span>
                  <div v-if="isShangQuanBu">
                    全部订单
                    <el-table
                      :data="shangHuOrders">
                      <el-table-column
                        prop="commodity.comname"
                        label="商品名"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="commodity.comimg"
                        label="商品图"
                        align="center">
                        <template slot-scope="scope">
                          <el-popover placement="top-start" trigger="hover">
                            <img :src="scope.row.commodity.comimg" style="width: 150px;height: 150px">
                            <img slot="reference" :src="'../'+scope.row.commodity.comimg" style="width: 100px;height: 100px">
                          </el-popover>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="ordercount"
                        label="数量"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="user.username"
                        label="用户名"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="shangHuInfo.shaddress"
                        label="商户地址"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="ordertime"
                        label="订单时间"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="totalmoney"
                        label="总金额"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        label="订单状态"
                        align="center">
                        <template slot-scope="scope">
                          {{ scope.row.orderstate == 1 ? '待发货' : scope.row.orderstate == 2 ?'待收货': scope.row.orderstate == 3 ?'待提货': scope.row.orderstate == 4 ?'已提货': '' }}
                        </template>
                      </el-table-column>
                      <el-table-column
                        fixed="right"
                        label="操作"
                        align="center" width="200">
                        <template slot-scope="scope">
                          <el-popconfirm @confirm="shangHuShouHuo(scope.row)"
                                         title="确定收货吗？"
                          >
                            <el-button type="danger" slot="reference" style="width: 110px"  round v-if="scope.row.orderstate==2">确认收货</el-button>
                          </el-popconfirm>
                        </template>
                      </el-table-column>
                    </el-table>
                    <br>
                    <el-pagination
                      background
                      layout="total, sizes, prev, pager, next, jumper"
                      :page-sizes="[5, 10, 15, 20]"
                      :page-size="sizeShangHu"
                      :total="totalShangHu"
                      :current-page="currentpageShangHu"
                      @prev-click="prvpageShangHu"
                      @next-click="nextpageShangHu"
                      @current-change="currentchangeShangHu"
                      @size-change="sizechangeShangHu">
                    </el-pagination>
                  </div>
                </el-tab-pane>
                <el-tab-pane name="shangDaiFaHuo">
                  <span slot="label"><i class="el-icon-s-finance"></i> 待发货</span>
                  <div v-if="isShangDaiFaHuo">
                    待发货
                    <el-table
                      :data="shangHuOrders">
                      <el-table-column
                        prop="commodity.comname"
                        label="商品名"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="commodity.comimg"
                        label="商品图"
                        align="center">
                        <template slot-scope="scope">
                          <el-popover placement="top-start" trigger="hover">
                            <img :src="scope.row.commodity.comimg" style="width: 150px;height: 150px">
                            <img slot="reference" :src="'../'+scope.row.commodity.comimg" style="width: 100px;height: 100px">
                          </el-popover>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="ordercount"
                        label="数量"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="user.username"
                        label="用户名"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="shangHuInfo.shaddress"
                        label="商户地址"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="ordertime"
                        label="订单时间"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="totalmoney"
                        label="总金额"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        label="订单状态"
                        align="center">
                        <template slot-scope="scope">
                          {{ scope.row.orderstate == 1 ? '待发货' : scope.row.orderstate == 2 ?'待收货': scope.row.orderstate == 3 ?'待提货': scope.row.orderstate == 4 ?'已提货': '' }}
                        </template>
                      </el-table-column>
                      <el-table-column
                        fixed="right"
                        label="操作"
                        align="center" width="200">
                        <template slot-scope="scope">
                        </template>
                      </el-table-column>
                    </el-table>
                    <br>
                    <el-pagination
                      background
                      layout="total, sizes, prev, pager, next, jumper"
                      :page-sizes="[5, 10, 15, 20]"
                      :page-size="sizeShangHu"
                      :total="totalShangHu"
                      :current-page="currentpageShangHu"
                      @prev-click="prvpageShangHu"
                      @next-click="nextpageShangHu"
                      @current-change="currentchangeShangHu"
                      @size-change="sizechangeShangHu">
                    </el-pagination>
                  </div>
                </el-tab-pane>
                <el-tab-pane name="shangDaiShouHuo">
                  <span slot="label"><i class="el-icon-s-finance"></i> 待收货</span>
                  <div v-if="isShangDaiShouHuo">
                    待收货
                    <el-table
                      :data="shangHuOrders">
                      <el-table-column
                        prop="commodity.comname"
                        label="商品名"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="commodity.comimg"
                        label="商品图"
                        align="center">
                        <template slot-scope="scope">
                          <el-popover placement="top-start" trigger="hover">
                            <img :src="scope.row.commodity.comimg" style="width: 150px;height: 150px">
                            <img slot="reference" :src="'../'+scope.row.commodity.comimg" style="width: 100px;height: 100px">
                          </el-popover>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="ordercount"
                        label="数量"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="user.username"
                        label="用户名"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="shangHuInfo.shaddress"
                        label="商户地址"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="ordertime"
                        label="订单时间"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="totalmoney"
                        label="总金额"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        label="订单状态"
                        align="center">
                        <template slot-scope="scope">
                          {{ scope.row.orderstate == 1 ? '待发货' : scope.row.orderstate == 2 ?'待收货': scope.row.orderstate == 3 ?'待提货': scope.row.orderstate == 4 ?'已提货': '' }}
                        </template>
                      </el-table-column>
                      <el-table-column
                        fixed="right"
                        label="操作"
                        align="center" width="200">
                        <template slot-scope="scope">
                          <el-popconfirm @confirm="shangHuShouHuo(scope.row)"
                                         title="确定收货吗？"
                          >
                            <el-button type="danger" slot="reference" style="width: 110px"  round>确认收货</el-button>
                          </el-popconfirm>
                        </template>
                      </el-table-column>
                    </el-table>
                    <br>
                    <el-pagination
                      background
                      layout="total, sizes, prev, pager, next, jumper"
                      :page-sizes="[5, 10, 15, 20]"
                      :page-size="sizeShangHu"
                      :total="totalShangHu"
                      :current-page="currentpageShangHu"
                      @prev-click="prvpageShangHu"
                      @next-click="nextpageShangHu"
                      @current-change="currentchangeShangHu"
                      @size-change="sizechangeShangHu">
                    </el-pagination>
                  </div>
                </el-tab-pane>
                <el-tab-pane  name="shangDaiTiHuo">
                  <span slot="label"><i class="el-icon-truck"></i> 待提货</span>
                  <div v-if="isShangDaiTiHuo">
                    待提货
                    <el-table
                      :data="shangHuOrders">
                      <el-table-column
                        prop="commodity.comname"
                        label="商品名"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="commodity.comimg"
                        label="商品图"
                        align="center">
                        <template slot-scope="scope">
                          <el-popover placement="top-start" trigger="hover">
                            <img :src="scope.row.commodity.comimg" style="width: 150px;height: 150px">
                            <img slot="reference" :src="'../'+scope.row.commodity.comimg" style="width: 100px;height: 100px">
                          </el-popover>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="ordercount"
                        label="数量"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="user.username"
                        label="用户名"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="shangHuInfo.shaddress"
                        label="商户地址"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="ordertime"
                        label="订单时间"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="totalmoney"
                        label="总金额"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        label="订单状态"
                        align="center">
                        <template slot-scope="scope">
                          {{ scope.row.orderstate == 1 ? '待发货' : scope.row.orderstate == 2 ?'待收货': scope.row.orderstate == 3 ?'待提货': scope.row.orderstate == 4 ?'已提货': '' }}
                        </template>
                      </el-table-column>
                      <el-table-column
                        fixed="right"
                        label="操作"
                        align="center" width="200">
                        <template slot-scope="scope">
                        </template>
                      </el-table-column>
                    </el-table>
                    <br>
                    <el-pagination
                      background
                      layout="total, sizes, prev, pager, next, jumper"
                      :page-sizes="[5, 10, 15, 20]"
                      :page-size="sizeShangHu"
                      :total="totalShangHu"
                      :current-page="currentpageShangHu"
                      @prev-click="prvpageShangHu"
                      @next-click="nextpageShangHu"
                      @current-change="currentchangeShangHu"
                      @size-change="sizechangeShangHu">
                    </el-pagination>
                  </div>
                </el-tab-pane>
                <el-tab-pane name="shangYiTiHuo">
                  <span slot="label"><i class="el-icon-finished"></i> 已提货</span>
                  <div v-if="isShangYiTiHuo">
                    已提货
                    <el-table
                      :data="shangHuOrders">
                      <el-table-column
                        prop="commodity.comname"
                        label="商品名"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="commodity.comimg"
                        label="商品图"
                        align="center">
                        <template slot-scope="scope">
                          <el-popover placement="top-start" trigger="hover">
                            <img :src="scope.row.commodity.comimg" style="width: 150px;height: 150px">
                            <img slot="reference" :src="'../'+scope.row.commodity.comimg" style="width: 100px;height: 100px">
                          </el-popover>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="ordercount"
                        label="数量"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="user.username"
                        label="用户名"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="shangHuInfo.shaddress"
                        label="商户地址"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="ordertime"
                        label="订单时间"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        prop="totalmoney"
                        label="总金额"
                        align="center">
                      </el-table-column>
                      <el-table-column
                        label="订单状态"
                        align="center">
                        <template slot-scope="scope">
                          {{ scope.row.orderstate == 1 ? '待发货' : scope.row.orderstate == 2 ?'待收货': scope.row.orderstate == 3 ?'待提货': scope.row.orderstate == 4 ?'已提货': '' }}
                        </template>
                      </el-table-column>
                      <el-table-column
                        fixed="right"
                        label="操作"
                        align="center" width="200">
                        <template slot-scope="scope">


                          <!--  <el-button type="danger" slot="reference" round v-if="scope.row.orderstate==0" @click="fuKuan(scope.row)">付   款</el-button>
                            <el-popconfirm
                              title="确定取消吗？"
                            >
                              <el-button type="danger" slot="reference" round v-if="scope.row.orderstate==1">取消订单</el-button>
                            </el-popconfirm>
                            <el-button type="danger" slot="reference" round v-if="scope.row.orderstate==2||scope.row.orderstate==3">确认收货</el-button>

    -->
                        </template>
                      </el-table-column>
                    </el-table>
                    <br>
                    <el-pagination
                      background
                      layout="total, sizes, prev, pager, next, jumper"
                      :page-sizes="[5, 10, 15, 20]"
                      :page-size="sizeShangHu"
                      :total="totalShangHu"
                      :current-page="currentpageShangHu"
                      @prev-click="prvpageShangHu"
                      @next-click="nextpageShangHu"
                      @current-change="currentchangeShangHu"
                      @size-change="sizechangeShangHu">
                    </el-pagination>
                  </div>
                </el-tab-pane>
              </el-tabs>
              </div>
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
        dingdan:'quanBu',
        isquanBu:true,
        isdaiFuKuan:false,
        isdaiFaHuo:false,
        isdaiShouHuo:false,
        isyiShouHuo:false,
        shangHu:'shangHuGuanLi',
        isShangHuGuanLi:true,
        isShangHuDingDan:false,
        shangDingDan:'shangQuanBu',
        isShangQuanBu:true,
        isShangDaiFaHuo:false,
        isShangDaiShouHuo:false,
        isShangDaiTiHuo:false,
        isShangYiTiHuo:false,
        orders:[],
        shangHuOrders:[],
        pageindex:1,//当前显示页面
        totalpage:0,//总页面
        total:0,  //总条目数
        size:5,  //每页显示多少条
        currentpage:1,
        pageindexShangHu:1, //商户订单当前显示页面
        totalpageShangHu:0, //商户总页面
        totalShangHu:0,     //商户总条目数
        sizeShangHu:5,      //每页显示多少条
        currentpageShangHu:1,
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
        updateformsh:{
          shid:sessionStorage.getItem("shid"),
          shname:sessionStorage.getItem("shname"),
          userid:sessionStorage.getItem("userid"),
          username:sessionStorage.getItem("username"),
          shaddress:sessionStorage.getItem("shaddress")
        },
        updateformshs:{
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
        aid:0,
        YongHuNum:0,
        ShangHuNum:0
      }
    },
    methods:{
      //查询用户订单
      getorder(){
        var _this = this;
        var params = new URLSearchParams();
        params.append("page",_this.pageindex);
        params.append("rows",_this.size);
        params.append("userid",sessionStorage.getItem("userid"));
        params.append("orderstate",this.YongHuNum);
        this.$axios.post("queryUserOrderCount.action",params).then(function (result) {  //成功  执行then里面的方法
          _this.orders = result.data.rows;
          console.log(_this.orders)

          //计算总页数
          _this.total=result.data.total;
          _this.totalpage=_this.total%_this.size==0?_this.total/_this.size:Math.floor(_this.total/_this.size)+1

        }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });
      },

      //查询商户订单
      getShangHuOrder(){
        var _this = this;
        var params = new URLSearchParams();
        params.append("page",_this.pageindexShangHu);
        params.append("rows",_this.sizeShangHu);
        params.append("shid",sessionStorage.getItem("shid"));
        params.append("orderstate",this.ShangHuNum);
        this.$axios.post("queryShangHuOrderCount.action",params).then(function (result) {  //成功  执行then里面的方法
          _this.shangHuOrders = result.data.rows;
          console.log(_this.shangHuOrders)

          //计算总页数
          _this.totalShangHu=result.data.total;
          _this.totalpageShangHu=_this.totalShangHu%_this.sizeShangHu==0?_this.totalShangHu/_this.sizeShangHu:Math.floor(_this.totalShangHu/_this.sizeShangHu)+1

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

      //上一页（商户订单）
      prvpageShangHu:function () {
        this.pageindexShangHu=this.pageindexShangHu==1?1:this.pageindexShangHu-1;
        this.getShangHuOrder();
      },
      //下一页（商户订单）
      nextpageShangHu:function () {
        this.pageindexShangHu=this.pageindexShangHu==this.totalpageShangHu?this.totalpageShangHu:this.pageindexShangHu+1;
        this.getShangHuOrder();
      },
      //当前第一页（商户订单）
      currentchangeShangHu(val){
        this.pageindexShangHu=val;
        this.getShangHuOrder();
      },
      //每页多少条（商户订单）
      sizechangeShangHu(val){
        this.sizeShangHu=val
        this.getShangHuOrder();
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
                _this.updateformsh.shaddress=item.provincename
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
                _this.updateformsh.shaddress=_this.updateformsh.shaddress+item.cityname
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
            _this.updateformsh.shaddress=_this.updateformsh.shaddress+item.areaname
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
      },
      updatesh(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var _this = this;
            var params = new URLSearchParams();
            params.append("shid",_this.updateformsh.shid);
            params.append("shname",_this.updateformsh.shname);
            params.append("shaddress",_this.updateformsh.shaddress);

            this.$axios.post("updShangHu.action",params).then(function (result) {  //成功  执行then里面的方法

              _this.$message({
                message: result.data,
                type: 'success'
              })

            }).catch(function (error) { //失败 执行catch方法
              console.log(error)
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //点击用户不同订单信息
      click(tab){
        this.pageindex=1;
        if(tab.name=="quanBu"){
          this.isquanBu=true;
          this.isdaiFuKuan=false;
          this.isdaiFaHuo=false;
          this.isdaiShouHuo=false;
          this.isyiShouHuo=false;
          this.YongHuNum=0;
          this.getorder(this.YongHuNum);
        }else if(tab.name=="daiFuKuan"){
          this.isquanBu=false;
          this.isdaiFuKuan=true;
          this.isdaiFaHuo=false;
          this.isdaiShouHuo=false;
          this.isyiShouHuo=false;
          this.YongHuNum=1;
          this.getorder(this.YongHuNum);
        }else if(tab.name=="daiFaHuo"){
          this.isquanBu=false;
          this.isdaiFuKuan=false;
          this.isdaiFaHuo=true;
          this.isdaiShouHuo=false;
          this.isyiShouHuo=false;
          this.YongHuNum=2;
          this.getorder(this.YongHuNum);
        }else if(tab.name=="daiShouHuo"){
          this.isquanBu=false;
          this.isdaiFuKuan=false;
          this.isdaiFaHuo=false;
          this.isdaiShouHuo=true;
          this.isyiShouHuo=false;
          this.YongHuNum=3;
          this.getorder(this.YongHuNum);
        }else if(tab.name=="yiShouHuo"){
          this.isquanBu=false;
          this.isdaiFuKuan=false;
          this.isdaiFaHuo=false;
          this.isdaiShouHuo=false;
          this.isyiShouHuo=true;
          this.YongHuNum=5;
          this.getorder(this.YongHuNum);
        }
      },
      //左侧菜单栏选择
      select(tab){
        if(tab.name=="dingdan"){
          if(this.isquanBu==true){
            this.getorder(this.YongHuNum);
          }else if(this.isdaiFuKuan==true){
            this.getorder(this.YongHuNum);
          }else if(this.isdaiFaHuo==true){
            this.getorder(this.YongHuNum);
          }else if(this.isdaiShouHuo==true){
            this.getorder(this.YongHuNum);
          }else if(this.isyiShouHuo==true){
            this.getorder(this.YongHuNum);
          }
        }else if(tab.name=="guanLi"){
          if(this.shangHu=="shangHuDingDan"){
            if(this.isShangQuanBu==true){
              this.getShangHuOrder(this.ShangHuNum);
            }else if(this.isShangDaiFaHuo==true){
              this.getShangHuOrder(this.ShangHuNum);
            }else if(this.isShangDaiShouHuo==true){
              this.getShangHuOrder(this.ShangHuNum);
            }else if(this.isShangDaiTiHuo==true){
              this.getShangHuOrder(this.ShangHuNum);
            }else if(this.isShangYiTiHuo==true){
              this.getShangHuOrder(this.ShangHuNum);
            }
          }
        }
      },
      //用户确认收货
      shouHuo(scope){
        if(scope.orderstate==2){
          this.$message({
            showClose: true,
            message:"商品还没送达指定地点",
            type: 'warning'
          });
        }else{
          var _this = this;
          var params = new URLSearchParams();
          params.append("orderid",scope.orderid);
          this.$axios.post("updOrder4.action",params).then(function (result) {  //成功  执行then里面的方法
            _this.$message({
              showClose: true,
              message:result.data,
              type: 'success'
            });
            if(_this.isquanBu==true){
              _this.getorder(null);
            }else if(_this.isdaiFuKuan==true){
              _this.getorder(1);
            }else if(_this.isdaiFaHuo==true){
              _this.getorder(2);
            }else if(_this.isdaiShouHuo==true){
              _this.getorder(3);
            }else if(_this.isyiShouHuo==true){
              _this.getorder(5);
            }
          }).catch(function (error) { //失败 执行catch方法
            console.log(error)
          });
        }
      },
      //删除订单（未付款）
      shanchu(scope){
        var _this = this;
        var params = new URLSearchParams();
        params.append("orderid",scope.orderid);
        this.$axios.post("delOrder.action",params).then(function (result) {  //成功  执行then里面的方法
          _this.$message({
            showClose: true,
            message:result.data,
            type: 'success'
          });
          if(_this.isquanBu==true){
            _this.getorder(null);
          }else if(_this.isdaiFuKuan==true){
            _this.getorder(1);
          }else if(_this.isdaiFaHuo==true){
            _this.getorder(2);
          }else if(_this.isdaiShouHuo==true){
            _this.getorder(3);
          }else if(_this.isyiShouHuo==true){
            _this.getorder(5);
          }
        }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });
      },
      //取消用户订单（待发货）
      quXiao(scope){
        var _this = this;
        var params = new URLSearchParams();
        params.append("orderid",scope.orderid);
        this.$axios.post("delOrder1.action",params).then(function (result) {  //成功  执行then里面的方法
          _this.$message({
            showClose: true,
            message:result.data,
            type: 'success'
          });
          if(_this.isquanBu==true){
            _this.getorder(null);
          }else if(_this.isdaiFuKuan==true){
            _this.getorder(1);
          }else if(_this.isdaiFaHuo==true){
            _this.getorder(2);
          }else if(_this.isdaiShouHuo==true){
            _this.getorder(3);
          }else if(_this.isyiShouHuo==true){
            _this.getorder(5);
          }
        }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });
      },
      //用户删除已到货的商品
      YongHushanchu(scope){
        var _this = this;
        var params = new URLSearchParams();
        params.append("orderid",scope.orderid);
        this.$axios.post("delOrder2.action",params).then(function (result) {  //成功  执行then里面的方法
          _this.$message({
            showClose: true,
            message:result.data,
            type: 'success'
          });
          if(_this.isquanBu==true){
            _this.getorder(null);
          }else if(_this.isdaiFuKuan==true){
            _this.getorder(1);
          }else if(_this.isdaiFaHuo==true){
            _this.getorder(2);
          }else if(_this.isdaiShouHuo==true){
            _this.getorder(3);
          }else if(_this.isyiShouHuo==true){
            _this.getorder(5);
          }
        }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });
      },
      //商户订单点击
      clickShangHu(tab){
        this.pageindexShangHu=1;
        if(tab.name=="shangQuanBu"){
          this.isShangQuanBu=true;
          this.isShangDaiFaHuo=false;
          this.isShangDaiShouHuo=false;
          this.isShangDaiTiHuo=false;
          this.isShangYiTiHuo=false;
          this.ShangHuNum=0;
          this.getShangHuOrder(this.ShangHuNum);
        }else if(tab.name=="shangDaiFaHuo"){
          this.isShangQuanBu=false;
          this.isShangDaiFaHuo=true;
          this.isShangDaiShouHuo=false;
          this.isShangDaiTiHuo=false;
          this.isShangYiTiHuo=false;
          this.ShangHuNum=1;
          this.getShangHuOrder(this.ShangHuNum);
        }else if(tab.name=="shangDaiShouHuo"){
          this.isShangQuanBu=false;
          this.isShangDaiFaHuo=false;
          this.isShangDaiShouHuo=true;
          this.isShangDaiTiHuo=false;
          this.isShangYiTiHuo=false;
          this.ShangHuNum=2;
          this.getShangHuOrder(this.ShangHuNum);
        }else if(tab.name=="shangDaiTiHuo"){
          this.isShangQuanBu=false;
          this.isShangDaiFaHuo=false;
          this.isShangDaiShouHuo=false;
          this.isShangDaiTiHuo=true;
          this.isShangYiTiHuo=false;
          this.ShangHuNum=3;
          this.getShangHuOrder(this.ShangHuNum);
        }else if(tab.name=="shangYiTiHuo"){
          this.isShangQuanBu=false;
          this.isShangDaiFaHuo=false;
          this.isShangDaiShouHuo=false;
          this.isShangDaiTiHuo=false;
          this.isShangYiTiHuo=true;
          this.ShangHuNum=5;
          this.getShangHuOrder(this.ShangHuNum);
        }
      },
      //商户管理选择
      selectShangHu(tab){
        if(tab.name=="shangHuGuanLi"){
          this.isShangHuGuanLi=true;
          this.isShangHuDingDan=false;
        }else if(tab.name=="shangHuDingDan"){
          this.isShangHuGuanLi=false;
          this.isShangHuDingDan=true;
          if(this.isShangQuanBu==true){
            this.getShangHuOrder(this.ShangHuNum);
          }else if(this.isShangDaiFaHuo==true){
            this.getShangHuOrder(this.ShangHuNum);
          }else if(this.isShangDaiShouHuo==true){
            this.getShangHuOrder(this.ShangHuNum);
          }else if(this.isShangDaiTiHuo==true){
            this.getShangHuOrder(this.ShangHuNum);
          }else if(this.isShangYiTiHuo==true){
            this.getShangHuOrder(this.ShangHuNum);
          }
        }
      },
      //商户确认收货
      shangHuShouHuo(scope){
        var _this = this;
        var params = new URLSearchParams();
        params.append("orderid",scope.orderid);
        this.$axios.post("updOrder3.action",params).then(function (result) {  //成功  执行then里面的方法
          _this.$message({
            showClose: true,
            message:result.data,
            type: 'success'
          });
          if(_this.isShangQuanBu==true){
            _this.getShangHuOrder(_this.ShangHuNum);
          }else if(_this.isShangDaiFaHuo==true){
            _this.getShangHuOrder(_this.ShangHuNum);
          }else if(_this.isShangDaiShouHuo==true){
            _this.getShangHuOrder(_this.ShangHuNum);
          }else if(_this.isShangDaiTiHuo==true){
            _this.getShangHuOrder(_this.ShangHuNum);
          }else if(_this.isShangYiTiHuo==true){
            _this.getShangHuOrder(_this.ShangHuNum);
          }
        }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });
      }
    },
    created() {
      this.getprovince()
    }
  }
</script>

<style scoped>

</style>
