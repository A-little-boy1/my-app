<template>
  <div class="manager">
    <div class="contentSelect">
      <el-button type="primary" @click="handleAdd">+新增</el-button>
     <!-- 搜索区域 -->
      <el-form :inline="true" :model="userform">
        <el-form-item>
          <el-input  v-model="userform.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  @click="select">查询</el-button>
        </el-form-item>
    </el-form>
    </div>
    <el-table
    :stripe="true"
    :data="tableData"
    style="width: 100%"
    height="90%"
    >
    <el-table-column
      prop="name"
      label="姓名"
     >
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      >
      <template slot-scope="scope">
        <span style="margin-left:10px">{{scope.row.sex === 1 ? '男':'女'}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="age"
      label="年龄">
    </el-table-column>
    <el-table-column
    prop="birth"
    label="出生日期">
  </el-table-column>
    <el-table-column
    prop="addr"
    label="地址">
  </el-table-column>
  <el-table-column label="操作">
    <template slot-scope="scope">
      <el-button type="primary" plain size="mini" @click="handleEdit(scope.row)">编辑</el-button>
      <el-button type="danger" plain size="mini" @click="handleDelete(scope.row)">删除</el-button> 
    </template>
</el-table-column>
  </el-table>
  <div>
    <el-pagination
    @current-change="handlePage"
    layout="prev, pager, next"
    :total="total">
  </el-pagination>
  </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <!-- 用户表单信息 -->
      <el-form :inline="true" :rules="rules"   class="demo-form-inline" ref="form" :model="form" label-width="80px">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
          </el-form-item>

          <el-form-item label="性别" prop="sex">
            <el-select v-model="form.sex" placeholder="请选择性别">
              <el-option label="男" :value="1"></el-option>
              <el-option label="女" :value="0"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="出生日期" prop="birth">
            <el-col :span="22">
              <el-date-picker type="date" placeholder="选择日期" value-format="yyyy-MM-DD" v-model="form.birth" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="地址" prop="addr">
            <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
          </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary"  @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUser, addUser,editUser,delUser} from "../api";
export default {
  name: "my-User",
  data() {
    return {
      userform:{
        name:''
      },
      total:0, // 当前总条数
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        age: [
          { required: true, message: "年龄", trigger: "blur" },
          { min: 1, max: 3, message: "长度在 1 到 3个字符", trigger: "blur" },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        birth: [{ required: true, message: "请选择出生日期", trigger: "blur" }],
        addr: [{ required: true, message: "请输入地址", trigger: "blur" }],
      },
      tableData: [],
      modelType: 0, //0 新增 1 编辑,
      pageData: {
        page:1,
        limit:10
      }
    };
  },
  methods: {
    handleClose() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if(this.modelType === 0){
            addUser(this.form).then(()=> {
              this.getList()
            })
          }else {
            editUser(this.form).then(()=> {
              this.getList()
            })
          }
        }
        this.handleClose();
      });
    },
    cancel() {
      this.handleClose();
    },
    getList() {
      getUser({params:{...this.userform ,...this.pageData}}).then(({ data }) => {
      this.tableData = data.list;
      this.total = data.count ? data.count : 0
    });
    },
    handleAdd() {
      this.modelType = 0
      this.dialogVisible = true
    },
    handleEdit(row){
      this.modelType = 1
      this.dialogVisible = true
      this.form = JSON.parse(JSON.stringify(row))
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(row);
          delUser({id: row.id}).then(()=>{
            this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 改变页码
    handlePage(val) {
      this.pageData.page =val
      this.getList()
    },
    //查询
    select() {
      this.getList()
    }
  },
  mounted() {
    this.getList()
  },
};
</script>

<style lang="less" scoped>
  .manager {
    height: 90%;
  }
  .contentSelect {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>