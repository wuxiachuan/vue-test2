<template>
    <div>
        <!--        面包屑导航条-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>轮轴探伤</el-breadcrumb-item>
            <el-breadcrumb-item>超声波探伤</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <el-row :gutter="5">
                <el-form :model="search" :rules="searchrules" ref="searchForm" >
                    <el-col :span="4">
                        <el-form-item prop="wheelId">
                            <el-input v-model="search.wheelId" placeholder="请输入单号" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item prop="axleNumber">
                            <el-input v-model="search.axleNumber" placeholder="请输入轴号" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item prop="vehicleNumber">
                            <el-input v-model="search.vehicleNumber" placeholder="请输入收入车号" clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item prop="takeInDateFrom">
                            <el-date-picker
                                    type="date"
                                    placeholder="请选择收入起始日期"
                                    v-model="search.takeInDateFrom"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                    style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item prop="takeInDateTo">
                            <el-date-picker
                                    type="date"
                                    placeholder="请选择收入终止日期"
                                    v-model="search.takeInDateTo"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                    style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item prop="infoTakeFinishTimeFrom">
                            <el-date-picker
                                    type="date"
                                    placeholder="请选择完工日期"
                                    v-model="search.infoTakeFinishTimeFrom"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                    style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item prop="infoTakeFinishTimeTo">
                            <el-date-picker
                                    type="date"
                                    placeholder="请选择完工日期"
                                    v-model="search.infoTakeFinishTimeTo"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                    style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-button type="primary" @click="searchWheelInfo('searchForm')" size="small">查询</el-button>
                        <el-button  @click="searchSavedInfo" size="small">已保存</el-button>
                        <!--                        <el-button  @click="creatNewWheelInfo" size="small">新建</el-button>-->
                    </el-col>
                </el-form>
            </el-row>
            <el-row :gutter="10">
                <el-col :span="7">
                    <el-card class="wheelInfo-Container">
                        <div class="wheelInfoHead">
                            <span class="wheelInfoList1">序</span>
                            <span class="wheelInfoList2">轴号</span>
                            <span class="wheelInfoList3">轴型</span>
                            <span class="wheelInfoList4">车型车号</span>
                            <span class="wheelInfoList5">轴位</span>
                            <span class="wheelInfoList6">收入日期</span>
                        </div>
                        <ul class="wheelInfo-list" ref="infolist">
                            <li :class="['wheelInfo-list-item',item.isaxleInspectionFinish=='0'?'notfinish':'']" v-for="(item,index) in wheelList" :ref="'li'+index"
                                :key="item.wheelId" @click="showitem(item,index,$event)">
                                <span class="wheelInfoList1">{{ index+1 }}</span>
                                <span class="wheelInfoList2">{{item.axleNumber}}</span>
                                <span class="wheelInfoList3">{{item.axleType}}</span>
                                <span class="wheelInfoList4">{{item.vehicleType}} {{item.vehicleNumber}}</span>
                                <span class="wheelInfoList5">{{item.axlePosition}}</span>
                                <span class="wheelInfoList6">{{item.takeInDate}}</span>
                            </li>
                        </ul>
                    </el-card>
                </el-col>
                <el-col :span="17">
                    <el-card>
                        <el-row class="status">
                            <span v-text="isModify ?'当前状态: 修改':'当前状态: 新建'"></span>
                            <span>轴型: {{wheelInfo.axleType}}</span>
                            <span>轴号: {{wheelInfo.axleNumber}}</span>
                            <span>车型: {{wheelInfo.vehicleType}}</span>
                            <span>车号: {{wheelInfo.vehicleNumber}}</span>
                            <span>轴位: {{wheelInfo.axlePosition}} 位</span>
                        </el-row>
                        <el-form :model="ruleForm"  ref="ruleForm" label-width="100px">
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="穿透初探左" prop="ultAxleLeft" label-width="120px">
                                        <el-input v-model="ruleForm.ultAxleLeft" placeholder="" :disabled="enableLeft"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item  label="穿透初探右" prop="ultAxleRight" label-width="120px">
                                        <el-input v-model="ruleForm.ultAxleRight" placeholder="" :disabled="enableLeft"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="穿透复探左" prop="reultAxleLeft" label-width="120px">
                                        <el-input v-model="ruleForm.reultAxleLeft" placeholder="" :disabled="enableLeft"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item  label="穿透复探右" prop="reultAxleRight" label-width="120px">
                                        <el-input v-model="ruleForm.reultAxleRight" placeholder="" :disabled="enableLeft"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="轮座左" prop="ultAxleFootLeft" label-width="120px">
                                        <el-input v-model="ruleForm.ultAxleFootLeft" placeholder="" :disabled="enableLeft"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item  label="轮座右" prop="ultAxleFootRight" label-width="120px">
                                        <el-input v-model="ruleForm.ultAxleFootRight" placeholder="" :disabled="enableLeft"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="卸荷槽初探左" prop="ultAxleNeckLeft" label-width="120px">
                                        <el-input v-model="ruleForm.ultAxleNeckLeft" placeholder="" :disabled="enableLeft"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item  label="卸荷槽初探右" prop="ultAxleNeckRight" label-width="120px">
                                        <el-input v-model="ruleForm.ultAxleNeckRight" placeholder="" :disabled="enableLeft"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <el-form-item label="卸荷槽复探左" prop="reultAxleNeckLeft" label-width="120px">
                                        <el-input v-model="ruleForm.reultAxleNeckLeft" placeholder="" :disabled="enableLeft"></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item  label="卸荷槽复探右" prop="reultAxleNeckRight" label-width="120px">
                                        <el-input v-model="ruleForm.reultAxleNeckRight" placeholder="" :disabled="enableLeft"></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                            <el-form-item>
                                <el-button type="primary" @click="submitForm('ruleForm')"  v-show="addbtnstatus" size="small">创建</el-button>
                                <el-button @click="resetForm" size="small">重置</el-button>
                                <el-button @click="saveForm('ruleForm')" v-show="savebtnstatus" size="small">保存</el-button>
                                <el-button @click="modifyForm('ruleForm')" v-show="modbtnstatus" size="small">修改</el-button>
                                <el-button @click="cancelmodForm('ruleForm')" v-show="cancelbtnstatus" size="small">取消</el-button>
                                <el-button @click="deleteForm('ruleForm')" size="small" type="warring">删除</el-button>
                            </el-form-item>
                        </el-form>
                    </el-card>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "information",
        data(){
            //校验轴号
            var checkaxleNumber = (rule,value,callback)=>{
                var myreg= /^[0-9]{3,6}$/;
                if (!myreg.test(value)) {
                    return callback(new Error("输入合法的数值"));
                }
                callback();
            };
            //校验单位代号
            var checkPlant = (rule,value,callback)=>{
                var myreg= /^[0-9]{3}$/;
                if (!myreg.test(value)) {
                    return callback(new Error("输入合法的数值"));
                }
                callback();
            };
            //校验轴向游隙
            var checkaxleGap = (rule,value,callback)=>{
                var myreg= /^[0-2]\.[0-9]{2,3}$/;
                if (!myreg.test(value)) {
                    return callback(new Error("输入合法的数值"));
                }
                callback();
            };
            return {
                isModify:false,
                dialogVisible:false,
                addbtnstatus:true,
                savebtnstatus:true,
                modbtnstatus:false,
                cancelbtnstatus:false,
                enableLeft:false,
                enableRight:false,
                itemUnderMod:{},
                savedInfo:[],
                wheelList:[],
                unFinishMeasureList:[],

                wheelInfo:{},
                savedInfoHeads:[],

                ruleForm: {
                    id:'',
                    wheelId:'',
                    magAxleBody	:'',
                    magtAxleNeckLeft:'',
                    magAxleNeckRight:'',
                    ultAxleLeft:'',
                    ultAxleRight:'',
                    reultAxleLeft:'',
                    reultAxleRight:'',
                    ultAxleFootLeft	:'',
                    ultAxleFootRight:'',
                    ultAxleNeckLeft:'',
                    ultAxleNeckRight:'',
                    reultAxleNeckLeft:'',
                    reultAxleNeckRight:'',
                    magInspector:'',
                    magisFinish	:'',
                    magfinishTime:'',
                    ultisFinish	:'',
                    ultfinishTime:'',
                    ultInspector:'',
                    reultisFinish:'',
                    reultfinishTime:'',
                    reultInspector:'',
                    other:''
                },
                search:{
                    wheelId:'',
                    takeInDate: null,
                    axleNumber:'',
                    vehicleNumber: '',
                    infoTakeFinishTime:null
                },
                rules: {
                    magAxleBody: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    magtAxleNeckLeft: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    magAxleNeckRight: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ]
                },
                searchrules:{
                    wheelId:[],
                    axleNumber:[{ min:3, max:5, message: '长度在 3 到 5 个字符', trigger: 'blur' }],
                    vehicleNumber: [{ min: 7, max: 7, message: '长度 7 个字符', trigger: 'blur' }],
                }
            };
        },
        computed: {

        },
        methods: {
            //刷新表单
            flushRuleForm(){
                this.resetForm();
                this.addbtnstatus = true;
                this.savebtnstatus = true;
                this.modbtnstatus = false;
                this.cancelbtnstatus = false;
                this.isModify = false;
                this.ruleForm = {};
                this.wheelInfo = {};
                this.enableLeft = true;
            },
            //创建新表
            creatNewWheelInfo(){
                this.$refs['infolist'].childNodes.forEach(function (child,index) {
                    child.classList.remove("choosen");
                });
                this.flushRuleForm();
            },
            //添加新wheel
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                        this.ruleForm.ultInspector = sessionStorage.getItem("name");
                        this.ruleForm.ultisFinish = '1';
                        this.ruleForm.ultfinishTime = this.dateFormate(new Date(),'');
                        this.ruleForm.reultInspector = sessionStorage.getItem("name");
                        this.ruleForm.reultisFinish = '1';
                        this.ruleForm.reultfinishTime = this.dateFormate(new Date(),'');
                        var result = await this.$http.post(
                            "/axleInspection/addaxleInspection",
                            this.ruleForm);
                        if (result.data.code != 100){
                            alert("添加失败");
                            return ;
                        }
                        alert("添加成功");
                        //检查保存列表如有相同的从保存列表删除
                        var id = this.ruleForm.wheelId;
                        this.deleteFromSaveInfo(id);
                        //获取未完成列表
                        this.searchUnFinish();
                        //清空列表
                        this.flushRuleForm();
                    } else {
                        alert('信息不完整！');
                        return false;
                    }
                });
            },
            //从保存列表删除
            deleteFromSaveInfo(id){
                for (var i=0;i<this.savedInfo.length;i++){
                    if (this.savedInfo[i].wheelId==id){
                        for (var j=0;j<this.savedInfoHeads.length;j++){
                            if (this.savedInfoHeads[j].wheelId == id){
                                this.savedInfoHeads.splice(j,1);
                            }
                        }
                        this.savedInfo.splice(i,1);
                        this.saveToSession(this.savedInfo,this.saveIndex,this.savedInfoHeads);
                    }
                }
            },
            //重置表单内容
            resetForm() {
                this.$refs['ruleForm'].resetFields();
            },
            //保存未完成RuleForm
            saveForm(formName){
                var id = this.ruleForm.wheelId;
                if (id==''||id==null||id==undefined) {
                    alert("请选择保存项");
                    return ;
                }
                //如果已存在替换
                for (var i=0;i<this.savedInfo.length;i++){
                    if (this.savedInfo[i].wheelId==id){
                        this.savedInfo[i] = JSON.parse(JSON.stringify(this.ruleForm));
                        this.saveToSession(this.savedInfo,this.saveIndex,this.savedInfoHeads);
                        this.creatNewWheelInfo();
                        alert("已保存");
                        return;
                    }
                }
                //保存新
                this.ruleForm.ultInspector = sessionStorage.getItem("name");
                this.ruleForm.ultisFinish = '0';
                this.ruleForm.reultInspector = sessionStorage.getItem("name");
                this.ruleForm.reultisFinish = '0';
                var saved = JSON.parse(JSON.stringify(this.ruleForm));
                this.savedInfo.push(saved);
                this.savedInfoHeads.push(this.wheelInfo);
                this.saveToSession(this.savedInfo,this.saveIndex,this.savedInfoHeads);
                this.creatNewWheelInfo();
                alert("已保存");
            },
            saveToSession(data,index,heads){
                var wheelInfo = {
                    data:data,
                    heads:heads
                }
                sessionStorage.setItem("savedAxleInspection",JSON.stringify(wheelInfo));
            },
            //从seesion中获取保存的未完成表单
            getSavedWheelInfoFromSession(){
                var measureInfo = JSON.parse(sessionStorage.getItem("savedAxleInspection"));
                if (measureInfo!=null){
                    this.savedInfo = measureInfo.data;
                    this.savedInfoHeads = measureInfo.heads;
                }
            },
            //查找保存的未完成表单
            searchSavedInfo(){
                this.getSavedWheelInfoFromSession();
                this.wheelList = this.savedInfoHeads;
                this.flushRuleForm();
            },
            //从数据库查找未完成的WheelInfo
            async searchUnFinish(){
                var result = await this.$http.post(
                    "/axleInspection/unFinishAxleInspection",
                    this.ruleForm);
                if (result.data.code != 100){
                    alert("查询失败");
                    return ;
                }
                this.unFinishMeasureList = result.data.object;
                this.wheelList = this.unFinishMeasureList;
                this.flushRuleForm();
            },
            //修改wheel
            async modifyForm(formName){
                this.ruleForm.ultInspector = sessionStorage.getItem("name");
                this.ruleForm.ultfinishTime = this.dateFormate(new Date(),'');
                this.ruleForm.reultInspector = sessionStorage.getItem("name");
                this.ruleForm.reultfinishTime = this.dateFormate(new Date(),'');
                var result = await this.$http.post(
                    "/axleInspection/modifyAxleInspection",
                    this.ruleForm);
                if (result.data.code != 100){
                    alert("修改失败");
                    return ;
                }
                //重置表单
                this.isModify = false;
                this.flushRuleForm();
                alert("修改成功");
            },
            //取消修改
            cancelmodForm(formName){
                this.isModify = false;
                //重置表单
                this.flushRuleForm();
                alert("取消修改");
            },
            //多条件查找wheel
            searchWheelInfo(searchForm){
                //保证至少一个查找条件
                // if(this.search.wheelId==''&&this.search.takeInDateFrom==null&&this.search.takeInDateTo==null&&this.search.axleNumber==''&&
                //     this.search.vehicleNumber==''&&this.search.infoTakeFinishTimeFrom==null&&this.search.infoTakeFinishTimeTo==null){
                //     this.searchUnFinish();
                //     return;
                // }
                this.$refs[searchForm].validate(async (valid) => {
                    if (valid) {
                        var result = await this.$http.post(
                            "/axleInspection/searchWheelInfoByconditionAxleInspection",
                            this.search);
                        if (result.data.code != 100){
                            alert("添加失败");
                            return ;
                        }
                        this.wheelList = result.data.object;
                        this.flushRuleForm();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //显示wheel信息
            async showitem(item,index,e){
                //如果已提交屏蔽 创建 按钮，提供修改和取消按钮
                this.flushRuleForm();
                //显示基本信息
                this.wheelInfo = item;
                this.enableLeft = false;
                //高亮显示
                //清除choosen类
                e.currentTarget.parentElement.childNodes.forEach(function (child,index) {
                    child.classList.remove("choosen");
                });
                //添加choosen类
                e.currentTarget.classList.add("choosen");
                //检查保存里是否有数据
                var id = item.wheelId;
                for (var i=0;i<this.savedInfo.length;i++){
                    if (this.savedInfo[i].wheelId == id){
                        this.ruleForm = JSON.parse(JSON.stringify(this.savedInfo[i]));
                        return;
                    }
                }
                //是否完成
                if (item.isaxleInspectionFinish == '1'){
                    this.addbtnstatus = false;
                    this.savebtnstatus = false;
                    this.modbtnstatus = true;
                    this.cancelbtnstatus = true;
                    this.isModify = true;
                    //已完成从数据库内查找，提交到显示表单
                    var result = await this.$http.get(
                        "/axleInspection/findAxleInspectionById?id="+item.wheelId);
                    if (result.data.code != 100){
                        alert("添加失败");
                        return ;
                    }
                    this.ruleForm = result.data.object;
                }
                //未完成给个空值和表单id
                if (item.isaxleInspectionFinish == '0'){
                    this.ruleForm = {};
                    this.ruleForm.wheelId = item.wheelId;
                }
            },
            async deleteForm(formName){
                var res = await this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(err=>{
                    return err;
                });
                if (res == "confirm") {
                    //从数据库删除
                    var id = this.ruleForm.wheelId;
                    if (id==''||id==null||id==undefined) {
                        alert("请选择删除项");
                        return;
                    }
                    var result = await this.$http.get('/axleInspection/deleteAxleInspection?id=' + id);
                    if (result.data.code != 100) {
                        alert("删除失败");
                        return;
                    }
                    //从保存列表删除
                    this.deleteFromSaveInfo(id);
                    //刷新列表,获取未完成表单
                    this.searchUnFinish();
                    alert("已删除");
                } else {
                    // alert("取消删除");
                }
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
        },
        filters:{
            dateFormate: function(datastr,patt){
                var data = new Date(datastr);
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
        },
        created() {
            //获取未完成列表F
            this.getSavedWheelInfoFromSession();
        },
        mounted() {
            //获取未完成列表
            this.searchUnFinish();
            this.enableLeft = true;
         }
    }
</script>

<style lang="scss" scoped>
    .status{
        font-size: 14px;
        margin: 0 0 20px 10px;
        span{
            margin-left: 20px;
            font-size: 16px;
        }
    }
    .listContainer{
        text-align: center;
        line-height: 40px;
    }
    .innertext{
        display: flex;
        justify-content: center;
        span{
            line-height: 40px;
        }
    }
    .container{
        padding-top: 20px;
        border: 1px solid black;
        margin-bottom: 20px;
    }
</style>