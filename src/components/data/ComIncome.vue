<template>
  <div>
    <el-select v-model="month" @change="changemonth">
      <el-option v-for="m in months"  :label="m.name" :value="m"></el-option>
    </el-select>
    <div style="height: 20px"></div>
    <div id="myChart" :style="{width: '500px', height: '400px'}"></div>
  </div>
</template>

<script>
    export default {
        name: "ComIncome",
      data () {
        return {
          xdatas:[],
          ydatas:[],
          monthid:new Date().getMonth()+1,
          month:'',
          months:[
            {id:'01',name:'一月份'},
            {id:'02',name:'二月份'},
            {id:'03',name:'三月份'},
            {id:'04',name:'四月份'},
            {id:'05',name:'五月份'},
            {id:'06',name:'六月份'},
            {id:'07',name:'七月份'},
            {id:'08',name:'八月份'},
            {id:'09',name:'九月份'},
            {id:'10',name:'十月份'},
            {id:'11',name:'十一月份'},
            {id:'12',name:'十二月份'}
          ]
        }
      },
      mounted: function () {
        this.drawLine(); //按照默认值绘制图表
      },
      created() {
        this.month = this.months[this.monthid-1].name;


        var _this = this;

        var params = new URLSearchParams();
        params.append("month", _this.monthid);
        this.$axios.post("revenuetongji.action",params).then((result) => {
          _this.xdatas.length = 0; //清空数组
          _this.ydatas.length = 0;
          for (let i = 0; i < result.data.length; i++) {
            _this.xdatas.push(result.data[i].type);
            _this.ydatas.push(result.data[i].num);
          }
          console.log( _this.xdatas)
          console.log( _this.ydatas)
        }).catch(function (error) {
            console.log(error)
        });
      },
      watch: {
        ydatas: {
          //对于深层对象的属性，watch不可达，因此对数组监控需要将数组先清空，再添加数据
          handler: function () {
            this.drawLine();
          },
          deep: true,
        },
      },
      methods: {
        drawLine() {
          // 1、基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById("myChart"));
          //2、构造图表数据
          let options = {
            title: {
              text: "商品营收分析",
              left: "center",
              tooltip: {},
            },
            xAxis: {
              data:this.xdatas
            },
            yAxis: {},
            series: [
              {
                name: "商品营收",
                data: this.ydatas,
                type: "bar",
              },
            ],
          };
          // 3、绘制图表
          myChart.setOption(options);
        },
        changemonth(data){
          var _this = this;
          _this.monthid = data.id;
          _this.month = _this.months[_this.monthid-1].name;
          _this.xdatas=[];
          _this.ydatas=[];
          var params = new URLSearchParams();
          params.append("month", _this.monthid);
          this.$axios.post("revenuetongji.action",params).then((result) => {
            _this.xdatas.length = 0; //清空数组
            _this.ydatas.length = 0;
            for (let i = 0; i < result.data.length; i++) {
              _this.xdatas.push(result.data[i].type);
              _this.ydatas.push(result.data[i].num);
            }
          }).catch(function (error) {
            console.log(error)
          });
        }
      }
    }
</script>

<style scoped>

</style>
