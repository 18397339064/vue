<template>
    <div style="margin-top: -10px">
      <br>

      <el-table
        :data="ruku">
        <el-table-column
          prop="supplier.supname"
          label="供应商名">
        </el-table-column>
        <el-table-column
          prop="commodity.comname"
          label="商品名">
        </el-table-column>
        <el-table-column
          prop="purcount"
          label="采购数量">
        </el-table-column>
        <el-table-column
          prop="staff.staffname"
          label="员工姓名">
        </el-table-column>
        <el-table-column
          prop="purtime"
          label="采购时间">
        </el-table-column>
        <el-table-column
          prop="purjinprice"
          label="商品进价">
        </el-table-column>
        <el-table-column
          prop="purzonprice"
          label="总金额">
        </el-table-column>
        <el-table-column
          prop="purstate"
          label="采购状态">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作">
          <template slot-scope="scope" v-if="scope.row.purstate=='未审核' ">
              <el-button type="primary" round @click="shenhe(scope.row)">审核</el-button>
            <el-popconfirm @confirm="purno(scope.row.purid)"
                           title="确定驳回吗？"
            >
              <el-button type="danger" slot="reference" round >驳回</el-button>
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

      <!--审核-->
      <el-dialog title="分配仓库" :visible.sync="fenpeiwh" width="40%" center>
        <el-form label-width="100px" >
          <el-form-item label="商品总数量" >
            <el-input v-model="count" readonly style="width: 220px"></el-input>
          </el-form-item>
          <el-form-item label="仓库名" >
            <el-select v-model="whid"  placeholder="请选择仓库">
              <el-option v-for="w in warehouse" :label="w.whname" :value="w.whid"></el-option>
            </el-select>
            仓库总容量 : <span style="color: coral">{{capacity}} </span>
            剩余容量 : <span style="color: greenyellow">{{shenyu}}</span>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="clickOpen">多库分配</el-button>
          <el-button @click="fenpeiwh = false">取 消</el-button>
          <el-popconfirm @confirm="puryes"
                         title="确定通过吗？"
          >
            <el-button type="danger" slot="reference" round >通过</el-button>
          </el-popconfirm>
        </div>
      </el-dialog>



      <!--多库分配 模态框-->
      <el-dialog title="分配仓库" :visible.sync="manyfenpeiwh" width="60%" center>
        <el-form label-width="100px" >

          <el-row>
            <el-col span="8">

          <el-form-item label="商品总数量" >
            <el-input v-model="count" readonly style="width: 160px"></el-input>
          </el-form-item>
            </el-col>
            <el-col span="8">
            <el-form-item label="仓库选中" >
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
              prop="capacity"
              label="仓库总容量">
              <template slot-scope="scope">
                <span style="color: coral">{{ scope.row.capacity}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="shenyu"
              label="仓库剩余容量">
              <template slot-scope="scope">
                <span style="color: greenyellow">{{ scope.row.shenyu}}</span>
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
              label="剩余容量">
              <template slot-scope="scope">
                <span style="color: greenyellow">{{ scope.row.shenyu}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="purcount"
              label="分配数量"
              >
              <template slot-scope="scope">
                <el-input-number size="mini" @change="countChange" v-model="scope.row.purcount" :min="0" :max="scope.row.shenyu"></el-input-number>
              </template>
            </el-table-column>

          </el-table>
          </el-col>
          </el-row>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="manyfenpeiwh = false">取 消</el-button>
          <el-popconfirm @confirm="manyWarehouseFenPei"
                         title="确定分配吗？"
          >
            <el-button type="danger" slot="reference" round >分配</el-button>
          </el-popconfirm>

        </div>

      </el-dialog>


    </div>
</template>

<script>
    export default {
        name: "RuKuShenHe",
      data () {
        return {
          ruku: [],
          pageindex:1,//当前显示页面
          totalpage:0,//总页面
          total:0,  //总条目数
          size:5,  //每页显示多少条
          currentpage:1,
          fenpeiwh:false,
          manyfenpeiwh:false,
          warehouse:[],
          pushManyData: {
          purid:'',
          whid:'',
          comid:'',
          purcount:0,
          whname:'',
          shenyu:''
          },
          manyWarehouseData:[],
          count:1,
          shenyuCount:0,
          purid:0,
          whid:'',
          manywhname:'',
          comid:'',
          capacity:'',
          shenyu:''
        }
      },
      methods:{
        getData() {  //获取数据
          var _this = this;
          var params = new URLSearchParams();
          params.append("page",_this.pageindex);
          params.append("rows",_this.size);

          this.$axios.post("querypurcount.action",params).then(function (result) {  //成功  执行then里面的方法
            _this.ruku = result.data.rows;


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
          this.getData();
        },
        //下一页
        nextpage:function () {
          this.pageindex=this.pageindex==this.totalpage?this.totalpage:this.pageindex+1;
          this.getData();
        },
        //当前第一页
        currentchange(val){
          this.pageindex=val;
          this.getData();
        },
        //每页多少条
        sizechange(val){
          this.size=val
          this.getData()
        },

        //审核通过
        puryes(row){
          var _this = this;

          if(_this.count>_this.shenyu){
            _this.$message.error("商品数量过多,此仓库无法容纳,建议更换仓库或多仓分配操作!");
            return;
          }

          var params = new URLSearchParams();
          params.append("purid",_this.purid);
          params.append("whid",_this.whid);
          params.append("comid",_this.comid);
          params.append("purcount",_this.count);

          this.$axios.post("updPurYes.action",params).then(function (result) {  //成功  执行then里面的方法

            _this.$message({
              message: result.data,
              type: 'success'
            });

            _this.getData();
            _this.fenpeiwh=false;

          }).catch(function (error) { //失败 执行catch方法
            console.log(error)
          });
        },
        //驳回
        purno(id){
          var _this = this;
          var params = new URLSearchParams();
          params.append("purid",id);

          this.$axios.post("updPurNo.action",params).then(function (result) {  //成功  执行then里面的方法

            _this.$message.error(result.data);

            _this.getData();

          }).catch(function (error) { //失败 执行catch方法
            console.log(error)
          });
        },
        shenhe(row){
          this.fenpeiwh=true;

          var _this=this;
          _this.purid=row.purid;
          _this.comid=row.commodity.comid;
          _this.count=row.purcount;
          _this.shenyuCount=row.purcount;
          var params = new URLSearchParams();
          params.append("comid",row.commodity.comid);

          this.$axios.post("querycomct.action",params).then(function (result) {  //成功  执行then里面的方法

            _this.warehouse=result.data;
            _this.queryAllStockCapacity();
            _this.whid=_this.warehouse[0].whid

          }).catch(function (error) { //失败 执行catch方法
            console.log(error)
          });

        },
        //获取当前这个仓库的剩余容量
        queryStockCapacity(){

          var params=new URLSearchParams();

          params.append("whid",this.whid);

          var _this=this;

          this.$axios.post("queryStockCapacity.action",params).then(function (result) {  //成功  执行then里面的方法

            alert(result.data);
            _this.shenyu=_this.capacity-result.data;

          }).catch(function (error) { //失败 执行catch方法
            console.log(error)
          });
        },
        //查询所有仓库已占用的库存
        queryAllStockCapacity(){
          var _this=this;

          this.$axios.post("queryAllStockCapacity.action").then(function (result) {  //成功  执行then里面的方法
            //循环所有这个类型的所有仓库

            for (var i=0;i<_this.warehouse.length;i++){

            //循环所有类型仓库 的库存
              var bool=false;
            for (var j=0;j<result.data.length;j++){

              //判断这个仓库的id 是否能对上仓库 库存 中查询出来的id
              if(_this.warehouse[i].whid==result.data[j].warehouse.whid){
                //如果这个类型的仓库 对上了这个 库存仓库的id 就给这个类型里的仓库数据添加一个新的属性（剩余容量）
              _this.warehouse[i].newParam='shenyu';
              _this.warehouse[i].shenyu=_this.warehouse[i].capacity-result.data[j].stockcount;
              bool=true;
              }
              if(bool!=true&&j==result.data.length-1){
                _this.warehouse[i].newParam='shenyu';
                _this.warehouse[i].shenyu=_this.warehouse[i].capacity;

              }
            }
            }

          }).catch(function (error) { //失败 执行catch方法
            console.log(error)
          });
        },
        //打开多库分配模态框
        clickOpen(){

          this.fenpeiwh=false;
          this.manyfenpeiwh=true;


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

          _this.pushManyData.purid=this.purid;
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
        //多库分配
        manyWarehouseFenPei(){
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
            url: 'manyWarehouseUpdPurYes.action',
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
            _this.manyfenpeiwh=false;
          }).catch(function (e) {

            console.log(e);
          })



        },
        //数量改变剩余
      countChange(){
        var manyAllCount=0;
          for (var i=0;i<this.manyWarehouseData.length;i++){

           manyAllCount+=this.manyWarehouseData[i].purcount;

          }

          this.shenyuCount=this.count-manyAllCount;

      }
      ,
        handleCurrentChange(val){
          this.manywhname=val.whname;

          this.pushManyData.whid=val.whid;
          this.pushManyData.whname=val.whname;
          this.pushManyData.shenyu=val.shenyu;

        }
      },
      created:function(){
        this.getData();

      },
      watch:{
        whid:function(newval,oldval){

          for (var i=0;i<this.warehouse.length;i++)
          if(this.warehouse[i].whid==newval){

          this.capacity=this.warehouse[i].capacity;
          }

          this.queryStockCapacity();

        },
        manyfenpeiwh:function (newval,oldval) {

          if(newval==false){
            this.manyWarehouseData.splice(0);
          }
        }

    }
    }
</script>

<style scoped>

</style>
