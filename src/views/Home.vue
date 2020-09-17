<template>
  <el-container>
    <el-header>
      <span>权限管理系统</span>
      <div class="loginUser">
          <div class="infoNum" v-if="problemNum != 0"><span v-text="problemNum"></span></div>
          <el-button type="primary"  size="mini" round @click="showTable">{{currentUser}}</el-button>
      </div>
      <el-button type="info" round @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">
          <el-menu :router="true"  :default-openeds="[activeItem+'']" :default-active="activePath">
            <el-submenu v-for="(item,index) in menulist" :index="index+''">
              <template slot="title">
                <i :class="index==0?'el-icon-user-solid':'el-icon-s-tools'"></i>
                {{item.authName}}
              </template>
              <el-menu-item v-for="(item2,index2) in item.children" :index="item2.path" @click="saveNavstate(item2.path,index)">
                {{item2.authName}}
              </el-menu-item>
            </el-submenu>
          </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-dialog
            title="问题列表"
            :visible.sync="problemListVisible"
            width="80%"
            :before-close="handleProblemTable"
    >

      <el-table :data="problemList" style="width: 100%" height="600" :default-sort = "{prop: 'findTime', order: 'descending'}" border stripe>
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="axleNumber" label="轴号" width="50"></el-table-column>
        <el-table-column prop="axleType" label="轴型" width="50"></el-table-column>
        <el-table-column prop="processBelong" label="部位" width="80" >
          <template slot-scope="scope">
            <span v-if="scope.row.processBelong==1" >车轮</span>
            <span v-if="scope.row.processBelong==2" >车轴</span>
            <span v-if="scope.row.processBelong==3" >轴承</span>
            <span v-if="scope.row.processBelong==4" >探伤</span>
          </template>
        </el-table-column>
        <el-table-column prop="problemDescription" label="简介" ></el-table-column>
        <el-table-column prop="problemDetails" label="问题" width="400"></el-table-column>
        <el-table-column prop="worker" label="责任人" ></el-table-column>
        <el-table-column prop="problemFinder" label="发现人" ></el-table-column>
        <el-table-column prop="findTime" label="发现时间" sortable></el-table-column>
        <el-table-column prop="problemStatus" label="整改情况" >
          <template slot-scope="scope">
            <span v-if="scope.row.problemStatus=='0'" >未整改</span>
            <span v-if="scope.row.problemStatus=='1'" >已整改</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button
                    icon="el-icon-edit"
                    size="mini"
                    @click="handleToDone(scope.$index, scope.row)">整改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  data(){
    return{
      menulist:[],
      activePath:'',
      activeItem:'',
      currentUser:'',
      problemListVisible:false,
      problemList:[],
      problemNum:0
    }
  },
  created() {
      this.getmenus();
      this.getNavstate();
      this.currentUser = sessionStorage.getItem("name");
      this.getProblem();
      this.flushProblems();
  },
  methods:{
    async logout(){
      var result =await axios.get("http://localhost:8081/spt2/userManage/logout");
      if (result.data.code == 100){
        this.menulist = result.data.object;
      }
      sessionStorage.clear();
      this.$router.push("/login");
    },
    async getmenus(){
      var result =await axios.get("http://localhost:8081/spt2/userManage/getmenus");
      if (result.data.code == 100){
         this.menulist = result.data.object;
      }
    },
    saveNavstate(activePath,index){
        sessionStorage.setItem("activePath",activePath);
        sessionStorage.setItem("activeItem",index);
        this.activePath = activePath;
        this.activeItem = index;
    },
    getNavstate(){
      this.activePath = sessionStorage.getItem("activePath");
      this.activeItem = sessionStorage.getItem("activeItem");
    },
    showTable(){
      this.getProblem();
      this.problemListVisible = true;
    },
    async getProblem(){
      var result = await axios.get(
              "http://localhost:8081/spt2/quality/getProblems?worker="+this.currentUser);
      if (result.data.code != 100){
        alert("添加失败");
        return ;
      }
      this.problemList = result.data.object;
      this.problemNum = this.problemList.length;
    },
    handleProblemTable(done){
      this.$confirm('确认关闭？')
              .then(()=>{
                done();
              })
              .catch();
    },
   async handleToDone(index,row){
      var result = await axios.get(
              "http://localhost:8081/spt2/quality/resoveProblem?id="+row.id);
      if (result.data.code != 100){
        alert("整改失败");
        return ;
      }
     alert("问题已整改");
     this.getProblem();
    },
    //每个一分钟刷新一次问题列表
    flushProblems() {
      //setInterval(this.getProblem, 1000*60*1);
    },
    //日期格式化
    dateFormate(data,patt){
      var y = data.getFullYear();
      var M = (data.getMonth()+1).toString().padStart(2,"0");
      var d = (data.getDate()).toString().padStart(2,"0");

      var h = (data.getHours()).toString().padStart(2,"0");
      var m = (data.getMinutes()).toString().padStart(2,"0");
      var s = (data.getSeconds()).toString().padStart(2,"0");

      if(patt && patt.toLowerCase()=="yyyy-mm-dd"){
        return `${y}-${M}-${d}`;
      }else{
        return `${y}-${M}-${d}  ${h}:${m}:${s}`;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .el-container{
      height: 100%;
  }
  .el-header{
    background-color: #B3C0D1;
    position: relative;
    color: #333;
    font-size: 20px;
    text-align: center;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }
  i{
    margin-right: 10px;
  }
  .loginUser{
    font-size: 14px;
    position: absolute;
    top:0px;
    right:114px;
    .infoNum {
      position: absolute;
      top: 3px;
      right: -7px;
      width: 30px;
      height: 20px;
      border-radius: 10px;
      background-color: #EE6A50 ;
      span{
        position: absolute;
        top: -19px;
        right: 11px;
        color: white;
        font-weight: bold;
      }
    }
  }
</style>