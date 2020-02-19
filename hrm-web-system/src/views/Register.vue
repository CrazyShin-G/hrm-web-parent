<template>
  <div>
    <el-form :model="tenant" ref="tenantForm" :rules="formRules" label-position="left" label-width="100px" class="demo-ruleForm login-container">
      <h3 class="title">公司入驻</h3>
      <el-form-item prop="companyName"label="公司名称">
        <el-input type="text" v-model="tenant.companyName" auto-complete="off" placeholder="请输入公司名称！"></el-input>
      </el-form-item>
      <el-form-item prop="companyNum" label="公司座机">
        <el-input type="text" v-model="tenant.companyNum" auto-complete="off" placeholder="请输入座机！"></el-input>
      </el-form-item>
      <el-form-item prop="address" label="公司地址">
        <el-input type="text" style="width: 350px" v-model="tenant.address" auto-complete="off" placeholder="请输入地址！"></el-input>
        <el-button size="small" type="primary" @click="selectAdrress">选择</el-button>
      </el-form-item>
      <el-form-item prop="logo" label="公司Logo">
      <el-upload
              class="upload-demo"
              action="http://localhost:1030/services/common/fastDfs/"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :file-list="fileList"
              list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      </el-form-item>
      <el-form-item prop="username" label="公司账号">
        <el-input type="text" v-model="tenant.username" auto-complete="off" placeholder="请输入账号！"></el-input>
      </el-form-item>
      <el-form-item prop="tel" label="手机号码">
        <el-input type="text" v-model="tenant.tel" auto-complete="off" placeholder="请输入电话！"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="电子邮件">
        <el-input type="text" v-model="tenant.email" auto-complete="off" placeholder="请输入邮件！"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码">
        <el-input type="password" v-model="tenant.password" auto-complete="off" placeholder="请输入密码！"></el-input>
      </el-form-item>
      <el-form-item prop="comfirmPassword" label="确认密码">
        <el-input type="password" v-model="tenant.comfirmPassword" auto-complete="off" placeholder="请输入确认密码！"></el-input>
      </el-form-item>
      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="settledIn" >入驻</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
            title="选择地址"
            :visible.sync="dialogVisable"
            width="30%">
      <baidu-map :center="{lng: 116.403765, lat: 39.914850}" :zoom="11">
        <bm-view class="map"></bm-view>
        <bm-control :offset="{width: '10px', height: '10px'}">
          <bm-auto-complete v-model="keyword" :sugStyle="{zIndex: 2100}">
            <div style="margin-bottom:10px">
              <input id="searchInput" type="text" placeholder="请输入关键字" class="searchinput"/>
              <el-button type="success" @click="selectAdrressConfirm">确定</el-button>
            </div>
          </bm-auto-complete>
        </bm-control>
        <bm-local-search :keyword="keyword" :auto-viewport="true" ></bm-local-search>
      </baidu-map>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisable=false">取 消</el-button>
        <el-button type="primary" @click="dialogVisable=false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        data() {
            var validatePass2 = (rule, value, callback) => {
                console.log(value);
                if (value === '') {
                    callback(new Error('请再次输入密码'))
                } else if (value !== this.tenant.password) {
                    callback(new Error('两次输入密码不一致!'))
                } else {
                    callback()
                }
            }
            return {
                keyword:'',
                dialogVisable:false,
                fileList: [],
                tenant: {
                    companyName: '',
                    companyNum: '',
                    address: '',
                    logo:'',
                    username:'',
                    tel:'',
                    email:'',
                    password:'',
                    comfirmPassword:''
                },
                formRules: {
                    companyName: [
                        { required: true, message: '请输入公司名称!', trigger: 'blur' }
                    ],
                    companyNum: [
                        { required: true, message: '请输入公司座机!', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '请输入公司地址!', trigger: 'blur' }
                    ],
                    logo: [
                        { required: true, message: '请输入公司logo!', trigger: 'blur' }
                    ],
                    username: [
                        { required: true, message: '请输入账号!', trigger: 'blur' }
                    ],
                    tel: [
                        { required: true, message: '请输入电话!', trigger: 'blur' }
                    ],
                    email: [
                        { type: 'email',required: true, message: '请输入邮箱!', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码!', trigger: 'blur' }
                    ],
                    comfirmPassword: [
                        {required: true,validator: validatePass2, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            selectAdrressConfirm(){
                var searchInputV=document.getElementById("searchInput").value;
                this.tenant.address = searchInputV;
                this.dialogVisable = false;
            },
            selectAdrress(){
                this.dialogVisable = true;
            },
            handleSuccess(response, file, fileList){
                console.log("===========")
                console.log(response);
                console.log(file);
                console.log(fileList);
                this.tenant.logo = response.resultObj;
            },
            handleRemove(file, fileList) {
              var filePath =file.response.resultObj;
              this.$http.delete("/common/fastDfs/?path="+filePath)
                      .then(res=>{
                        if(res.data.success){
                          this.$message({
                            message: '删除成功!',
                            type: 'success'
                          });
                        }else{
                          this.$message({
                            message: '删除失败!',
                            type: 'error'
                          });
                        }
                      })
            },
            handlePreview(file) {
                console.log(file);
            },
            settledIn(){
                this.$refs.tenantForm.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认入驻吗？', '提示', {}).then(() => {
                            let para = Object.assign({}, this.tenant);
                            let admin = {
                              username: para.username,
                              tel: para.username,
                              email: para.username,
                              password:para.username,
                              comfirmPassword:para.username
                            }
                            para.admin = admin;
                            this.$http.put("/sysmanage/tenant",para).then((res) => {
                                if(res.data.success){
                                    this.$message({
                                        message: '操作成功!',
                                        type: 'success'
                                    });
                                    this.$refs['tenantForm'].resetFields();
                                    this.$router.push({ path: '/login' });
                                }
                                else{
                                    this.$message({
                                        message: res.data.message,
                                        type: 'error'
                                    });
                                }

                            });
                        });
                    }
                })
            }
        }
    }

</script>

<style lang="scss" scoped>
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 500px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }

  .map {
    width: 100%;
    height: 300px;
  }
  .searchinput{
    width: 300px;
    box-sizing: border-box;
    padding: 9px;
    border: 1px solid #dddee1;
    line-height: 20px;
    font-size: 16px;
    height: 38px;
    color: #333;
    position: relative;
    border-radius: 4px;
  }
</style>