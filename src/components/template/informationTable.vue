<template>
    <div>
        <el-card>
            <el-row class="status">
                <el-col :span="20">
                    <span>轴型: {{wheelInfo.axleType}}</span>
                    <span>轴号: {{wheelInfo.axleNumber}}</span>
                    <span>车型: {{wheelInfo.vehicleType}}</span>
                    <span>车号: {{wheelInfo.vehicleNumber}}</span>
                    <span>轴位: {{wheelInfo.axlePosition}} 位</span>
                </el-col>
            </el-row>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" :disabled="disableForm">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="收入单位" prop="takeInDepot">
                            <el-input v-model="ruleForm.takeInDepot"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="收入日期" prop="takeInDate">
                            <el-date-picker
                                    type="date"
                                    placeholder="选择日期"
                                    v-model="ruleForm.takeInDate"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                    style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="收入原因" prop="takeInReason">
                            <el-select v-model="ruleForm.takeInReason" placeholder="请选择">
                                <el-option label="段修" value="duanxiu"></el-option>
                                <el-option label="站修调入" value="zhanxiu"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="收入车型" prop="vehicleType">
                            <el-input v-model="ruleForm.vehicleType"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="收入车号" prop="vehicleNumber">
                            <el-input v-model="ruleForm.vehicleNumber"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="6">
                        <el-form-item label="轴号" prop="axleNumber">
                            <el-input v-model="ruleForm.axleNumber"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="轴型" prop="axleType">
                            <el-select v-model="ruleForm.axleType" placeholder="请选择轴型">
                                <el-option label="RE2B" value="RE2B"></el-option>
                                <el-option label="RD2" value="RD2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="材质" prop="axleMaterial">
                            <el-select v-model="ruleForm.axleMaterial" placeholder="请轴材质">
                                <el-option label="LZ50" value="LZ50"></el-option>
                                <el-option label="LZ45CrV" value="LZ45CrV"></el-option>
                                <el-option label="LZ40" value="LZ40"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="车轴制造" prop="axleMadeDate">
                            <el-date-picker
                                    type="month"
                                    placeholder="选择日期"
                                    v-model="ruleForm.axleMadeDate"
                                    format="yyyy 年 MM 月 "
                                    value-format="yyyy-MM"
                                    style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="制造单位" prop="axleMadeIn">
                            <el-input v-model="ruleForm.axleMadeIn"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="轴位" prop="axlePosition">
                            <el-select v-model="ruleForm.axlePosition" placeholder="请选择轴位">
                                <el-option label="1位" value="1"></el-option>
                                <el-option label="2位" value="2"></el-option>
                                <el-option label="3位" value="3"></el-option>
                                <el-option label="4位" value="4"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="轮型" prop="wheelType">
                            <el-select v-model="ruleForm.wheelType" placeholder="请选择轮型">
                                <el-option label="HESA" value="HESA"></el-option>
                                <el-option label="HEZB" value="HEZB"></el-option>
                                <el-option label="HDSA" value="HDSA"></el-option>
                                <el-option label="HDZA" value="HDZA"></el-option>
                                <el-option label="HDZB" value="HDZB"></el-option>
                                <el-option label="HDZC" value="HDZC"></el-option>
                                <el-option label="HDZD" value="HDZD"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="材质" prop="wheelMaterial">
                            <el-select v-model="ruleForm.wheelMaterial" placeholder="请选择轮材质">
                                <el-option label="辗钢" value="辗钢"></el-option>
                                <el-option label="铸钢" value="铸钢"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="制造单位" prop="wheelMadeIn">
                            <el-input v-model="ruleForm.wheelMadeIn"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="首次组装" prop="wheelAssemblefirstDate">
                            <el-date-picker
                                    type="date"
                                    placeholder="选择日期"
                                    v-model="ruleForm.wheelAssemblefirstDate"
                                    format="yyyy 年 MM 月 dd 日 "
                                    value-format="yyyy-MM-dd"
                                    style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="组装单位" prop="wheelAssemblefirstIn">
                            <el-input v-model="ruleForm.wheelAssemblefirstIn"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="末次组装" prop="wheelAssemblelastDate">
                            <el-date-picker
                                    type="date"
                                    placeholder="选择日期"
                                    v-model="ruleForm.wheelAssemblelastDate"
                                    format="yyyy 年 MM 月 dd 日"
                                    value-format="yyyy-MM-dd"
                                    style="width: 100%;"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="组装单位" prop="wheelAssemblelastIn">
                            <el-input v-model="ruleForm.wheelAssemblelastIn"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="车轮标记左" prop="wheelMarkLeft">
                            <el-input v-model="ruleForm.wheelMarkLeft"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="车轮标记右" prop="wheelMarkRight">
                            <el-input v-model="ruleForm.wheelMarkRight"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item>
                    <el-button type="primary" @click="submitForm"  v-show="addbtnstatus" size="small">创建</el-button>
                    <el-button @click="resetForm" size="small">重置</el-button>
                    <el-button @click="modifyForm" v-show="modbtnstatus" size="small">修改</el-button>
                    <el-button @click="cancelmodForm" v-show="cancelbtnstatus" size="small">取消</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "measureTable",
        props:{
            showinfo:Object,
            wheelInfo:Object,
            disableForm:Boolean,
            addbtnstatus:Boolean,
            savebtnstatus:Boolean,
            modbtnstatus:Boolean,
            cancelbtnstatus:Boolean,
            enableLeft:Boolean,
            enableRight:Boolean,
            origindata:Object
        },
        data(){
            //校验制造单位
            var checkMadePlant = (rule,value,callback)=>{
                var plants=[];
                // if (plants.indexOf(value)==-1) {
                //     return callback(new Error("输入合法的单位"));
                // }
                callback();
            };
            //校验车型
            var checkvehicleTypes = (rule,value,callback)=>{
                var vehicleTypes = ["P70","P62NK","P64GK","P64K","P62K",
                    "C64K","C64","C70","C70E","C64H","G70","G70K","G70H","GQ70",
                    "NX70","NX70A","X70"];
                if (vehicleTypes.indexOf(value.toUpperCase())==-1) {
                    return callback(new Error("输入合法的车型"));
                }
                callback();
            };
            return{
                ruleForm: {},
                rules: {
                    takeInDepot: [
                        { required: true, message: '请输入收入单位', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    takeInDate: [
                        { required: true, message: '请输入收入日期', trigger: 'blur' },
                    ],
                    takeInReason: [
                        { required: true, message: '请输入', trigger: 'blur' },
                    ],
                    vehicleType: [
                        { required: true, message: '请输入车型', trigger: 'blur' },
                        { validator:checkvehicleTypes,trigger: 'blur'}
                    ],
                    vehicleNumber: [
                        { required: true, message: '请输入车号', trigger: 'blur' },
                        { min: 7, max: 7, message: '长度 7 个字符', trigger: 'blur' }
                    ],
                    axleNumber: [
                        { required: true, message: '请输入轴号', trigger: 'blur' },
                        { min:3, max:5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                    axleType: [
                        { required: true, message: '请输入', trigger: 'blur' }
                    ],
                    axleMaterial: [
                        { required: true, message: '请输入', trigger: 'blur' }
                    ],
                    axleMadeDate: [
                        { required: true, message: '请输入', trigger: 'blur' }
                    ],
                    axleMadeIn: [
                        { required: true, message: '请输入制造单位', trigger: 'blur' },
                        { validator:checkMadePlant,trigger: 'blur'}
                    ],
                    axlePosition: [
                        { required: true, message: '请输入', trigger: 'blur' }
                    ],
                    wheelType: [
                        { required: true, message: '请输入', trigger: 'blur' }
                    ],
                    wheelMaterial: [
                        { required: true, message: '请输入', trigger: 'blur' }
                    ],
                    wheelAssemblefirstDate: [
                        { required: true, message: '请输入制造日期', trigger: 'blur' }
                    ],
                    wheelAssemblelastDate: [
                        { required: true, message: '请输入制造日期', trigger: 'blur' }
                    ],
                    wheelMadeIn: [
                        { required: true, message: '请输入制造单位', trigger: 'blur' },
                        { validator:checkMadePlant,trigger: 'blur'}
                    ],
                    wheelAssemblefirstIn: [
                        { required: true, message: '请输入制造单位', trigger: 'blur' },
                        { validator:checkMadePlant,trigger: 'blur'}
                    ],
                    wheelAssemblelastIn: [
                        { required: true, message: '请输入制造单位', trigger: 'blur' },
                        { validator:checkMadePlant,trigger: 'blur'}
                    ],
                    wheelMarkLeft: [
                        { message: '请输入', trigger: 'blur' }
                    ],
                    wheelMarkRight: [
                        { message: '请输入', trigger: 'blur' }
                    ]
                },
            }
        },
        methods:{
            resetForm(){
                this.$refs['ruleForm'].resetFields();
                this.ruleForm = {};
            },
            submitForm(){
                this.$refs['ruleForm'].validate(async (valid) => {
                    if (valid) {
                        this.$emit("sendwheeldata",{data:this.ruleForm,flag:'0'});
                    } else {
                        alert('信息不完整！');
                        return false;
                    }
                });
            },
            saveForm(){
                this.$emit("sendwheeldata",{data:this.ruleForm,flag:'1'});
            },
            modifyForm(){
                this.$refs['ruleForm'].validate(async (valid) => {
                    if (valid) {
                        this.$emit("sendwheeldata",{data:this.ruleForm,flag:'2'});
                    } else {
                        alert('信息不完整！');
                        return false;
                    }
                });
            },
            cancelmodForm(){

            },
        },
        mounted() {
            this.ruleForm = this.showinfo;
        },
        watch:{
            showinfo:function (val) {
                this.ruleForm = val;
            }
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
</style>