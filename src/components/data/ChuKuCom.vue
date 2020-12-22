<template>
  <div>
    <el-select v-model="monthid" @change="changemonth">
      <el-option v-for="m in months" :label="m.name" :value="m.id"></el-option>
    </el-select>
    <div style="height: 20px"></div>
    <div id="myChart1" :style="{width: '500px', height: '400px'}"></div>
  </div>
</template>

<script>

  export default {
    name: 'Echarts',
    data () {
      return {
        datas:[],
        monthid:new Date().getMonth()+1,
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
    mounted(){
      this.drawLine();
    },
    created() {
      var _this = this;

      var params = new URLSearchParams();
      params.append("month", _this.monthid);
      this.$axios.post("chukutongji.action",params).then((result) => {
        _this.datas.length = 0; //清空数组
        for (let i = 0; i < result.data.length; i++) {
          var item = {
            value: result.data[i].num,
            name: result.data[i].type
          };
          _this.datas.push(item);
          console.log(_this.datas)
        }
      }).catch(function (error) {
          console.log(error)
      });
    },
    watch: {
      datas: {
        handler: function () {
          this.drawLine();
        },
        deep: true,
      },
    },
    methods: {
      drawLine() {
        // 1、基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById("myChart1"));
        //2、构造图表数据
        let options = {
          title: {
            text: "商品出库分析",
            left: 'center'
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)",
          },
          legend: {
            orient: "vertical",
            left: "left",
            data:this.datas.name,
          },
          series: [
            {
              name: "访问来源",
              type: "pie",
              radius: "55%",
              center: ["50%", "60%"],
              data: this.datas,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
            },
          ],
        };
        // 3、绘制图表
        myChart.setOption(options);
      },
      changemonth(){
        var _this = this;

        _this.datas=[];
        var params = new URLSearchParams();
        params.append("month", _this.monthid);
        this.$axios.post("chukutongji.action",params).then((result) => {
          _this.datas.length = 0; //清空数组
          for (let i = 0; i < result.data.length; i++) {
            var item = {
              value: result.data[i].num,
              name: result.data[i].type
            };
            _this.datas.push(item);
            console.log(_this.datas)
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
