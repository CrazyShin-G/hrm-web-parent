<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :model="filters" :inline="true">
				<el-form-item>
					<el-input v-model="filters.keywords" placeholder="关键字" ></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getTenantTypes">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="add">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>


		<el-table :data="tenantTypes" v-loading="listLoading" highlight-current-row  style="width: 100%;">
			<!--多选框-->
			<el-table-column type="selection" width="55">
			</el-table-column>
			<el-table-column type="index" width="60">
			</el-table-column>
			<el-table-column prop="name" label="名称">
			</el-table-column>
			<el-table-column prop="description" label="描述">
			</el-table-column>
			<el-table-column label="操作" width="350">
				<template scope="scope">
					<el-button size="small"  @click="edit(scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="del(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange"  :page-size="10" :total="total" style="float:right;">
			</el-pagination>
		</el-col>


		<!--添加或编辑对话框-->
		<el-dialog title="添加或修改" :visible.sync="formVisible" :close-on-click-modal="false">
			<el-form :model="tenantType" label-width="80px" :rules="formRules" ref="tenantType">
				<el-form-item label="名称" prop="name">
					<el-input v-model="tenantType.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="描述" prop="description">
					<el-input v-model="tenantType.description" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="formVisible = false">取消</el-button>
				<el-button type="primary" @click="save" >提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	export default {
		data() {
			return {
                formVisible:false,
                listLoading:false,
				filters:{
					keywords:''
				},
				page:1,
				total:0,
				tenantTypes:[],
                tenantType:{
                    id:null,
					name:'',
					sn:'',
					dirPath:'',
					state:0,
                    manager:null,
				},
				employees:[],
                formRules: {
                    name: [
                        { required: true, message: '请输入名称!', trigger: 'blur' }
                    ]
                }
			}
		},
		methods: {
			add(){
				this.tenantType={
					id:null,
					name:'',
					sn:'',
					dirPath:'',
					state:0,
					manager:null,
				}
				this.formVisible =true;
			},
            stateFormatter(row, column, cellValue, index){

                if(cellValue===0){
                    return "正常";
				}else{
                    return "停用";
				}
			},
            handleCurrentChange(curentPage){
                this.page = curentPage;
                this.getTenantTypes();
			},
		    save(){
                this.$refs.tenantType.validate((valid) => {
                    if (valid) {
                        this.$confirm('确认提交吗？', '提示', {}).then(() => {
                            let para = Object.assign({}, this.tenantType);
							this.$http.put("/sysmanage/tenantType",para).then((res) => {
								this.$message({
									message: '操作成功!',
									type: 'success'
								});
								this.$refs['tenantType'].resetFields();
								this.formVisible = false;
								this.getTenantTypes();
							});
                        });
                    }
                })
			},
            edit(row){
                let tenantTypeTmp = Object.assign({}, row);
                this.tenantType = tenantTypeTmp;
                this.formVisible =true;
			},
			getTenantTypes(){
				let para = {
				    "page":this.page,
					"keyword":this.filters.keywords
				};
				this.listLoading = true;
                this.$http.post("/sysmanage/tenantType/list",para)
                    .then(result=>{
                        console.log(result);
                        console.log(result.data);
                        this.total = result.data.total;
                        this.tenantTypes = result.data.rows;
                        this.listLoading = false;
                    });
			},
			del(row){
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    var id = row.id;
                    this.listLoading = true;
                    this.$http.delete("/sysmanage/tenantType/"+id)
                        .then(result=>{
                            this.listLoading = false;
                            if(result.data.success){
                                this.$message({
                                    message: '删除成功',
                                    type: 'success'
                                });
							}else{
                                this.$message({
                                    message: result.data.message,
                                    type: 'error'
                                });
							}
                            this.getTenantTypes();
                        })
				});

			}
		},
		mounted() {
		    this.getTenantTypes()
		}
	}

</script>

<style scoped>

</style>