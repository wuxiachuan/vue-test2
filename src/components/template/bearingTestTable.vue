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
            <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" :disabled="disableForm">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="环境温度" prop="envTemperatureLeft" label-width="120px">
                            <el-input v-model="ruleForm.envTemperatureLeft" ></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="最高温度" prop="highestTempLeft" label-width="120px">
                            <el-input v-model="ruleForm.highestTempLeft" >
                                <template slot="prepend">左</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item prop="highestTempRight" label-width="20">
                            <el-input v-model="ruleForm.highestTempRight" >
                                <template slot="prepend">右</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="最大温升" prop="temperatureRiseLeft" label-width="120px">
                            <el-input v-model="ruleForm.temperatureRiseLeft">
                                <template slot="prepend">左</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item prop="temperatureRiseRight" label-width="20">
                            <el-input v-model="ruleForm.temperatureRiseRight">
                                <template slot="prepend">右</template>
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item>
                    <el-button type="primary" @click="submitForm"  v-show="addbtnstatus" size="small">创建</el-button>
                    <el-button @click="resetForm" size="small">重置</el-button>
                    <el-button @click="saveForm" v-show="savebtnstatus" size="small">保存</el-button>
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
        },
        data(){
            return{
                ruleForm: {}
            }
        },
        methods:{
            resetForm(){
                this.$refs['ruleForm'].resetFields();
                this.ruleForm = {};
            },
            submitForm(){
                this.$emit("sendwheeldata",{data:this.ruleForm,flag:'0'});
            },
            saveForm(){
                this.$emit("sendwheeldata",{data:this.ruleForm,flag:'1'});
            },
            modifyForm(){
                this.$emit("sendwheeldata",{data:this.ruleForm,flag:'2'});
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