<template>
  <div id="app" style="margin-top: -10px">
    <div style="width: 400px">
      <el-table
        :data="staff"
        @row-click="getStaffRole"
      >
        <el-table-column
          prop="staffid"
          label="员工id">
        </el-table-column>
        <el-table-column
          prop="staffname"
          label="员工名">
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="分配角色" :visible.sync="staffRoledialog" @close="closeDialog" width="40%" center>
      <el-input v-model="sname" readonly style="width: 200px"></el-input>
      <el-tree
        :data="roleDate"
        show-checkbox
        node-key="id"
        ref="tree"
        :default-checked-keys="staffrole"
        :default-expand-all="false"
        :expand-on-click-node="false">
      </el-tree>


      <div slot="footer" class="dialog-footer">
        <el-button @click="staffRoledialog = false" >取 消</el-button>
        <el-button type="primary" @click="fenpei">分配</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "app",
    data(){
      return {
        staff:[],
        roleDate:[],
        staffrole:[],
        staffRoledialog:false,
        roleids:[],//获取所有选中的节点
        staffid:0,
        rids:'',
        sname:''
      }
    },
    methods:{
      getstaff() {  //获取数据
        var _this = this;
        this.$axios.post("querystaffcount.action").then(function (result) {  //成功  执行then里面的方法
          _this.staff = result.data.rows;

        }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });
      },
      getdata() {  //获取数据
        var _this = this;
        this.$axios.post("queryfenpeirole.action").then(function (result) {  //成功  执行then里面的方法
          _this.roleDate = result.data;

        }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });
      },
      getStaffRole(row,column,event){
        var _this = this;

        _this.staffRoledialog=true;

        var params = new URLSearchParams();
        params.append("staffid",row.staffid);
        this.$axios.post("queryAllStaffRole.action",params).then(function (result) {  //成功  执行then里面的方法
          for(var i=0;i<result.data.length;i++){
            _this.staffrole.push(result.data[i].roleid);
          };
          _this.staffid=row.staffid;
          _this.sname=row.staffname;
          _this.getdata();
        }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        });

      },
      closeDialog(){
        this.staffrole=[];
      },
      fenpei(){
        var _this=this;

        _this.roleids=this.$refs.tree.getCheckedKeys();

        _this.roleids.forEach((item)=>{
          _this.rids+=item+','
        })

        var params = new URLSearchParams();
        params.append("staffid",_this.staffid);
        params.append("roleids",_this.rids);
        this.$axios.post("fenpei.action",params).then(function (result) {  //成功  执行then里面的方法
          _this.$message({
            message: result.data,
            type: 'success'
          });

          _this.staffRoledialog=false;
        }).catch(function (error) { //失败 执行catch方法
          console.log(error)
        })
      }
    },
    created() {
      this.getstaff();
    }
  }
</script>

<style scoped>

</style>
