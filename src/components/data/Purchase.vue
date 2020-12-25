<template>

  <div>
  <el-button type="success" icon="el-icon-shopping-cart-full" round @click="getData">采购</el-button>
    <el-button type="success" icon="el-icon-shopping-cart-full" round @click="addPurchase">申请采购</el-button>


    <el-table
      :data="tabData"

      highlight-current-row
      @current-change="handleCurrentChange">

      <el-table-column
        prop="comname"
        label="商品名">
      </el-table-column>
      <el-table-column
        prop="comimg"
        label="商品图片">
        <template slot-scope="scope">
          <el-popover placement="top-start" trigger="hover">
            <img :src="scope.row.comimg" style="width: 50px;height: 50px">
            <img slot="reference" :src="'../'+scope.row.comimg" style="width: 50px;height: 50px">
          </el-popover>
        </template>purcount
      </el-table-column>
      <el-table-column
        prop="jinprice"
        label="商品进价">
      </el-table-column>
      <el-table-column
        prop="purcount"
        label="商品数量"
        width="300px">
        <template slot-scope="scope">
          <el-input-number  v-model="scope.row.purcount" :min="1"></el-input-number>
        </template>
      </el-table-column>

      <el-table-column
        prop="purcount"
        label="商品总价">
        <template slot-scope="scope">
           <span style="color: orange">{{ scope.row.purcount * scope.row.jinprice}}￥</span>
        </template>
      </el-table-column>
    </el-table>

  <el-dialog title="添加购物商品" :visible.sync="addcommoditydialog" width="80%" center>
    <el-form :model="addtabData" label-width="80px"  >
    <el-row>
      <el-col :span="5">
      <el-form-item label="商品名称" prop="comname">
        <el-input v-model="addtabData.comname" readonly></el-input>
      </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="供应商" prop="supname">
          <el-input v-model="addtabData.supname" readonly></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="进价" prop="jinprice">
          <el-input v-model="addtabData.jinprice" readonly></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="数量" prop="supname">
          <el-input-number size="small" :min="1" v-model="addtabData.purcount"></el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="4">
      <el-button type="success" style="margin-left: 50px" icon="el-icon-circle-plus-outline" round @click="adddialog">添加</el-button>
      </el-col>
    </el-row>
    </el-form>
    <el-row>
    <el-col :span="10">

    <el-table
      :data="commodity"

      highlight-current-row
      @current-change="handleCurrentChange">

      <el-table-column
        prop="comname"
        label="商品名">
      </el-table-column>
      <el-table-column
        prop="comimg"
        label="商品图片">
        <template slot-scope="scope">
          <el-popover placement="top-start" trigger="hover">
            <img :src="scope.row.comimg" style="width: 50px;height: 50px">
            <img slot="reference" :src="'../'+scope.row.comimg" style="width: 50px;height: 50px">
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
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
    </el-col>

    <el-col :span="14">
    <el-table
      :data="supcom"
      highlight-current-row
      @current-change="handleCurrentChange2"
      >

      <el-table-column
        prop="supplier.supname"
        label="供应商名称">
      </el-table-column>
      <el-table-column
        prop="supplier.suppeople"
        label="供应商联系人">
      </el-table-column>
      <el-table-column
        prop="supplier.supphone"
        label="供应商联系电话">
      </el-table-column>
      <el-table-column
        prop="jinprice"
        label="进价">
      </el-table-column>

    </el-table>
    </el-col>

    <div slot="footer" class="dialog-footer">
      <el-button @click="addcommoditydialog = false">取 消</el-button>
      <el-button type="primary" >确 定</el-button>
    </div>
    </el-row>
  </el-dialog>

  </div>
</template>

<script>
    export default {
        name: "Purchase",
      data (){
          return {
            commodity:[],
            supcom:[],
            tabData:[],
            addtabData:{
              comid:0,
              comname:'',
              comimg:'',
              supname:'',
              supid:0,
              jinprice:0,
              purcount:0,
              staffid:0
            },
            comid:0,

            pageindex:1,//当前显示页面
            totalpage:0,//总页面
            total:0,  //总条目数
            size:5,  //每页显示多少条
            addcommoditydialog:false,
            currentpage:1

          }
      },
      methods:{
        getData() {  //获取数据
          this.addcommoditydialog=true;
          var _this = this;
          var params = new URLSearchParams();
          //params.append("supname",_this.supname);
          params.append("page",_this.pageindex);
          params.append("rows",_this.size);

          this.$axios.post("queryAllCommodity.action",params).then(function (result) {  //成功  执行then里面的方法
            _this.commodity = result.data.rows;

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
        //通过条件查询
        query(){
          this.getData()
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        handleAvatarSuccess(res, file) {
          this.addform.comimg = URL.createObjectURL(file.raw);
        },
        handleCurrentChange(val) {
          this.comid=val.comid;
          this.addtabData.comid=this.comid;
          this.addtabData.comimg=val.comimg;
          this.addtabData.comname=val.comname;



          this.addtabData.supid=0;
          this.addtabData.supname='';
          this.addtabData.jinprice=0;
          this.getSupCom();
        },
        handleCurrentChange2(val) {
          this.addtabData.supid=val.supplier.supid;
          this.addtabData.supname=val.supplier.supname;
          this.addtabData.jinprice=val.jinprice;
        },
        getSupCom(){
          var _this = this;
          var params = new URLSearchParams();
          params.append("commodity.comid",_this.comid);
          this.$axios.post("selsupcom.action",params).then(function (result) {  //成功  执行then里面的方法
            _this.supcom = result.data.rows;
          }).catch(function (error) { //失败 执行catch方法
            console.log(error)
          });
        },
        adddialog(){
          var _this = this;
          if(_this.addtabData.comid==0){
            _this.$message({
              message: '请先选择商品',
              type: 'warning'
            });
            return;
          }

          if(_this.addtabData.supid==0){
            _this.$message({
              message: '请选择一位供应商',
              type: 'warning'
            });
            return;
          }

          var bool=true;

          _this.addtabData.staffid= sessionStorage.getItem("staffid");

         for (var i=0;i<_this.tabData.length;i++) {

           if (_this.tabData[i].comid == _this.addtabData.comid && _this.tabData[i].supid == _this.addtabData.supid) {

             _this.tabData[i].purcount += _this.addtabData.purcount;
             bool = false;
           }
         }
          var a={};
         //生成新副本 加入到数组
          Object.keys(_this.addtabData).forEach(key=>{

            a[key]=_this.addtabData[key];
          })

          if(bool){
            _this.tabData.push(a);
          }

          _this.addcommoditydialog=false;

        },
        getcom(row){
          this.addformcom.comid=row.comid;
          this.addformcom.comname=row.comname;
        },
        addPurchase(){
          var _this=this;
          if(_this.tabData.length==0){
            _this.$message({
              message: '请先采购商品',
              type: 'warning'
            });
            return;
          }
          this.$axios({
            method: 'post',
            url: 'addPurchase.action',
            data:JSON.stringify(_this.tabData),
            headers: {
              'Content-Type':'application/json;charset=utf-8'
            }
          }).then(function (result) {  //成功  执行then里面的方法

            _this.$message({
              message: result.data,
              type: 'success'
            });
          }).catch(function (e) {

          })

          _this.tabData.splice(0);
        }
      }
    }
</script>

<style>

</style>
