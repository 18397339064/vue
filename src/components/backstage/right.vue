<template>
  <div id="tabs">

    <el-tabs v-model="editableTabsValue" type="border-card" closable @tab-remove="removeTab">
      <el-tab-pane
        v-for="(item, index) in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
        :closable="item.closable"
      >
        <!--{{item.content}}-->
        <component :is="item.content"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import Menu from '../data/Menu.vue'
  import Role from '../data/Role.vue'
  import User from '../data/User.vue'
  export default {
    name: "right",
    components:{
      menus:Menu,
      role:Role,
      user:User
    },
    data() {
      return {
        //选项卡的绑定值name  这个值是什么就绑定选项卡数组中name值等于editableTabsValue值的选项卡
        editableTabsValue: '1',
        //选项卡数组
        editableTabs: [],
        tabIndex: 2
      }
    },
    methods: {
      addTab(titleName,comval) {

        var res =this.editableTabs.filter((item)=>{return  item.title ==titleName});
        if(res.length==0){
          let newTabName = ++this.tabIndex + '';
          this.editableTabs.push({
            title: titleName,
            name: newTabName,
            content: comval
          });
          this.editableTabsValue = newTabName;
        }else{
          this.editableTabsValue =res[0].name;
        }

      },
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }

        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
    }
  }
</script>

<style scoped>

</style>
