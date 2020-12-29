<template>
  <div id="app" style="margin-top: -10px">


    <!--  <el-select v-model="orderstate" placeholder="请选择订单类型"  @change="query">
        <el-option value="" label="-&#45;&#45;请选择订单类型-&#45;&#45;"></el-option>
        <el-option v-for="s in states" :value="s.name" :label="s.name"></el-option>
      </el-select>-->

    <el-table
      :data="order"
      @selection-change="selectionchange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="orderid"
        label="订单编号">
      </el-table-column>
      <el-table-column
        prop="commodity.comname"
        label="商品名">
      </el-table-column>
      <el-table-column
        prop="ordertime"
        label="订单时间">
      </el-table-column>
      <el-table-column
        prop="ordercount"
        label="购买数量">
      </el-table-column>
      <el-table-column
        prop="user.useraccount"
        label="用户名称">
      </el-table-column>
      <el-table-column
        prop="shangHuInfo.shname"
        label="商户名称">
      </el-table-column>
      <el-table-column
        prop="totalmoney"
        label="总金额">
      </el-table-column>
      <el-table-column
        prop="orderstate"
        label="订单状态">
        <template slot-scope="scope">
          <span style="color: orange" v-if="scope.row.orderstate==1">待出库</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-popconfirm @confirm="shenhe(scope.row)"
                         title="确定审核吗？">
            <el-button type="primary" slot="reference" round>审核</el-button>
          </el-popconfirm>
          <!-- <el-popconfirm @confirm="dele(scope.row.ctid)"
                          title="确定删除吗？"
           >
             <el-button type="danger" slot="reference" round >删除</el-button>
           </el-popconfirm>-->
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


    <!--审核-->
    <el-dialog title="商品出库" :visible.sync="chuKudialog" width="40%" center>
      <el-form label-width="100px">
        <el-form-item label="需求总数量">
          <el-input v-model="count" readonly style="width: 220px"></el-input>
        </el-form-item>
        <el-form-item label="仓库名">
          <el-select v-model="whid" placeholder="请选择仓库">
            <el-option v-for="w in warehouse" :label="w.whname" :value="w.whid"></el-option>
          </el-select>
          商品库存 :<span style="color: coral">{{capacity}} </span>
          <!--仓库总容量 : <span style="color: coral">{{capacity}} </span>
          剩余容量 : <span style="color: greenyellow">{{shenyu}}</span>-->
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="clickOpen">多仓出库</el-button>
        <el-button @click="chuKudialog = false">取 消</el-button>
        <el-popconfirm @confirm="updateOrderStates"
                       title="确定通过吗？"
        >
          <el-button type="danger" slot="reference" round>通过</el-button>
        </el-popconfirm>
      </div>
    </el-dialog>


    <!--多库分配 模态框-->
    <el-dialog title="分配出库" :visible.sync="manychuKudialog" width="60%" center>
      <el-form label-width="100px">

        <el-row>
          <el-col span="8">

            <el-form-item label="商品总数量">
              <el-input v-model="count" readonly style="width: 160px"></el-input>
            </el-form-item>
          </el-col>
          <el-col span="8">
            <el-form-item label="仓库选中">
              <el-input v-model="manywhname" readonly style="width: 160px"></el-input>
            </el-form-item>
          </el-col>

          <el-col span="8">
            <el-button type="primary" @click="addManyWarehouseData">添加分配</el-button>
          </el-col>
        </el-row>
        <el-row>
          <!--多个仓库-->
          <el-col span="10">
            <span style="color: greenyellow">可选仓库:</span>
            <el-table
              :data="warehouse"
              highlight-current-row
              @current-change="handleCurrentChange"
            >
              <el-table-column
                prop="whid"
                label="id">
              </el-table-column>
              <el-table-column
                prop="whname"
                label="仓库名">
              </el-table-column>
              <el-table-column
                prop="shenyu"
                label="商品库存">
                <template slot-scope="scope">
                  <span style="color: coral">{{ scope.row.shenyu}}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-col>

          <el-col span="2">
            &nbsp;
          </el-col>

          <!-- 多个仓库 分配的数据 -->
          <el-col span="12">
            <span style="color: #42b983">分配数量:</span>
            <span style="color: red;float: right ">商品总数量剩余 : {{shenyuCount}}</span>
            <el-table
              :data="manyWarehouseData">
              <el-table-column
                prop="whname"
                label="仓库名">
              </el-table-column>
              <el-table-column
                prop="shenyu"
                label="商品库存">
                <template slot-scope="scope">
                  <span style="color: greenyellow">{{ scope.row.shenyu}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="purcount"
                label="分配数量"
              >
                <template slot-scope="scope">
                  <el-input-number size="mini" @change="countChange" v-model="scope.row.purcount" :min="0"
                                   :max="scope.row.shenyu"></el-input-number>
                </template>
              </el-table-column>

            </el-table>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="manychuKudialog = false">取 消</el-button>
        <el-popconfirm @confirm="manyUpdateOrderStates"
                       title="确定出库吗？"
        >
          <el-button type="danger" slot="reference" round>出库</el-button>
        </el-popconfirm>

      </div>

    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "category",
    data() {
      return {
        order: [],
        pageindex: 1,//当前显示页面
        totalpage: 0,//总页面
        total: 0,  //总条目数
        size: 5,  //每页显示多少条
        orderstate: "",
        orderid:'',
        warehouse: [],
        chuKudialog:false,
        manychuKudialog:false,
        pushManyData: {
          orderid:'',
          whid:'',
          comid:'',
          purcount:0,
          whname:'',
          shenyu:''
        },
        manyWarehouseData:[],
        whid:1,
        comid:0,
        count:0,
        shenyuCount:0,
        capacity:0,
        manywhname:'',
        currentpage: 1,
        addcategorydialog: false,
        selectid: "" //复选框选中的id
      }
    },
    methods: {
      getData() {  //获取数据
        var _this = this;
        var params = new URLSearchParams();
        params.append("orderstate", 1);
        params.append("page", _this.pageindex);
        params.append("rows", _this.size);

        this.$axios.post("queryordercount.action", params).then(function (result) {  //成功  执行then里面的方法
          _this.order = result.data.rows;

          //计算总页数
          _this.total = result.data.total;
          _this.totalpage = _this.total % _this.size == 0 ? _this.total / _this.size : Math.floor(_this.total / _this.size) + 1

        }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });
      },
      //获取这个商品的仓库
      shenhe(row) {
        this.chuKudialog = true;

        var _this = this;
        _this.orderid = row.orderid;
        _this.comid = row.commodity.comid;
        _this.count = row.ordercount;
        _this.shenyuCount = row.ordercount;
        var params = new URLSearchParams();
        params.append("comid", row.commodity.comid);

        this.$axios.post("querycomct.action", params).then(function (result) {  //成功  执行then里面的方法

          _this.warehouse = result.data;

          _this.whid = _this.warehouse[0].whid;
          _this.queryWarehouseStockCount();
          _this.queryAllWarehouseStockCount();
        }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });

      },

      //上一页
      prvpage: function () {
        this.pageindex = this.pageindex == 1 ? 1 : this.pageindex - 1;
        this.getData();
      },
      //下一页
      nextpage: function () {
        this.pageindex = this.pageindex == this.totalpage ? this.totalpage : this.pageindex + 1;
        this.getData();
      },
      //当前第一页
      currentchange(val) {
        this.pageindex = val;
        this.getData();
      },
      //每页多少条
      sizechange(val) {
        this.size = val
        this.getData()
      },
      //通过条件查询
      query() {
        this.getData()
      },
      //把编辑数据传到对话框
      updateOrderStates() {


        if(this.count>this.capacity){

          this.$message.error("商品库存不足!");

          return;
        }

        var params = new URLSearchParams();

        params.append("orderid",this.orderid);
        params.append("orderstate", 2);

        params.append("comid",this.comid);
        params.append("whid",this.whid);
        params.append("purcount",this.count);
        var _this = this;

        this.$axios.post("updateOrderState.action",params).then(function (result) {
          if (result.data == "出库成功!") {
            _this.$message({
              message: result.data,
              type: 'success'
            });


          } else {
            _this.$message.error(result.data);
          }
          _this.chuKudialog=false;
          _this.getData();
        }).catch(function (error) {

          console.log(error);
        })

      },
      //打开多库分配模态框
      clickOpen(){
        this.chuKudialog=false;
        this.manychuKudialog=true;

      },
      countChange(){
        var manyAllCount=0;
        for (var i=0;i<this.manyWarehouseData.length;i++){

          manyAllCount+=this.manyWarehouseData[i].purcount;

        }

        this.shenyuCount=this.count-manyAllCount;

      },
      //添加分配数据
      addManyWarehouseData(){

        var _this=this;
        if(_this.manywhname==''){

          _this.$message({
            message: '请选中仓库',
            type: 'warning'
          });
          return;
        }


        _this.pushManyData.comid=this.comid;

        _this.pushManyData.orderid=this.orderid;
        for (var i=0;i<_this.manyWarehouseData.length;i++) {

          if (_this.manyWarehouseData[i].whid ==_this.pushManyData.whid) {

            _this.$message({
              message: '已添加该仓库',
              type: 'warning'
            });
            return;

          }
        }
        var a={};
        //生成新副本 加入到数组
        Object.keys(_this.pushManyData).forEach(key=>{

          a[key]=_this.pushManyData[key];
        })

        _this.manyWarehouseData.push(a);

        _this.manywhname='';

      },
      //多仓出库
      manyUpdateOrderStates(){
        var _this=this;

        if(_this.shenyuCount>0){

          _this.$message({
            message: '请将商品数量分配完成!',
            type: 'warning'
          });
          return;
        }else if(_this.shenyuCount<0){
          _this.$message({
            message: '分配数量超过了商品总数量,请修改!',
            type: 'warning'
          });

          return;
        }


        this.$axios({
          method: 'post',
          url: 'manyUpdateOrderStates.action',
          data:JSON.stringify(_this.manyWarehouseData),
          headers: {
            'Content-Type':'application/json;charset=utf-8'
          }
        }).then(function (result) {  //成功  执行then里面的方法

          _this.$message({
            message: result.data,
            type: 'success'
          });

          _this.manyWarehouseData.splice(0);
          _this.getData();
          _this.manychuKudialog=false;
        }).catch(function (e) {

          console.log(e);
        })

      },
      //复选框选中
      selectionchange(val) {
        this.selectid = ""
        for (var i = 0; i < val.length; i++) {
          this.selectid += val[i].ctid + ",";
        }
        console.log(this.selectid)

      },
      //批量删除
      deleteplcategory() {
        var _this = this;

        var params = new URLSearchParams();
        params.append("id", _this.selectid);

        this.$axios.post("deleteCategory.action", params)
          .then(function (result) {  //成功  执行then里面的方法

            if (result.data == "删除成功!") {
              _this.$message({
                message: result.data,
                type: 'success'
              });
            } else {
              _this.$message.error(result.data);
            }

            _this.getData();  //删除操作做完，刷新数据


          }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });

      },
      //查询当前仓库 这个商品的 库存数量
      queryWarehouseStockCount(){

        var param=new URLSearchParams();

        param.append("comid",this.comid);
        param.append("whid",this.whid);

        var _this=this;
        this.$axios.post("queryWarehouseStockCount.action",param).then(function (result) {

          _this.capacity=result.data==""?0:result.data;

        }).catch(function (error) {

        })

      },

      //查询 不同仓库 这个商品的 库存数量
      queryAllWarehouseStockCount(){

        var param=new URLSearchParams();

        param.append("comid",this.comid);

        var _this=this;
        this.$axios.post("queryAllWarehouseStockCount.action",param).then(function (result) {

          for(var i=0;i<_this.warehouse.length;i++){

            var bool=false;
            for (var j=0;j<result.data.length;j++){
              if(_this.warehouse[i].whid==result.data[j].warehouse.whid){

                _this.warehouse[i].newParam="shenyu";
                _this.warehouse[i].shenyu=result.data[j].stockcount;

                bool=true;
              }
              if(bool==false&&j==result.data.length-1){
                _this.warehouse[i].newParam="shenyu";
                _this.warehouse[i].shenyu=0;
              }
            }

          }

        }).catch(function (error) {

        })

      },
      handleCurrentChange(val){
        this.manywhname=val.whname;

        this.pushManyData.whid=val.whid;
        this.pushManyData.whname=val.whname;
        this.pushManyData.shenyu=val.shenyu;

      }
    },
    created: function () {
      this.getData();
    },
    watch:{
      whid:function (newval,oldval) {

        this.queryWarehouseStockCount();
      }
    }
  }


</script>

<style lang="scss">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
