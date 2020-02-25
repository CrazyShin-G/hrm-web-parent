<template>
  <el-button type="primary"
             style="width:45%;"
             @click.native.prevent="courseIndexInit">课程主页初始化</el-button>
</template>

<script>
  export default {
    data() {
    },
    methods: {
      courseIndexInit(){
          //分页查询
          this.$http.post("/course/courseType/staticIndexPageInit")
              .then(result=>{
                  console.log(result);
                  console.log(result.data); //data就是 PageListjson转换结果
                  //做提示
                  if(result.data.success){
                      this.$message({
                          message: '初始化成功',
                          type: 'success'
                      });
                  }else{
                      this.$message({
                          message: result.data.message,
                          type: 'error'
                      });
                  }
              });
      }
    }
  }

</script>

<style lang="scss" scoped>
</style>