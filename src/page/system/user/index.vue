<template>
    <el-row>
        <el-col :span="24" class="toolbar">
            <el-button type="primary" icon="plus" @click="handleEdit()">新增</el-button>
            <el-button-group>
                <el-button type="primary" icon="fa-download" @click="handleExport()">导出</el-button>
                <el-button type="primary" icon="fa-upload" @click="handleImport()">导入</el-button>
            </el-button-group>
        </el-col>
        <el-col :span="24">
            <el-form :inline="true" :model="search" @submit.prevent="initData" ref="search">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="search.name"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="addr">
                    <city v-model="search.addr" change-on-select filterable placeholder="试试搜索"></city>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="initData">查询</el-button>
                    <el-button type="primary" @click="resetSearch">清除查询</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="tableData" @selection-change="selsChange" v-loading="loading" stripe border ref="table">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column type="index" width="60"></el-table-column>
                <el-table-column prop="name" label="姓名" width="100"></el-table-column>
                <el-table-column prop="sex" label="性别" width="80">
                    <template scope="scope">
                        {{scope.row.sex=='male'?'男':'女'}}
                    </template>
                </el-table-column>
                <el-table-column prop="birth" label="生日" width="120"></el-table-column>
                <el-table-column prop="addr" label="地址"></el-table-column>
                <el-table-column label="操作" width="150">
                    <template scope="scope">
                        <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button type="danger" size="small" @click="handleDel(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
        <el-col :span="24" class="toolbar">
            <el-button type="danger" @click="batchRemove" :disabled="sels.length===0">批量删除</el-button>
            <el-pagination @size-change="pageSize=$event;initData()" @current-change="initData" layout="sizes,prev, pager, next" :current-page.sync="page" :page-size="pageSize" :total="total" class="fr"></el-pagination>
        </el-col>

        <el-dialog title="添加" v-model="addVisible">
            <edit @success="handleEditSuccess"></edit>
        </el-dialog>
        <el-dialog title="修改" v-model="editVisible">
            <edit @success="handleEditSuccess" :model="editModel" v-if="editVisible"></edit>
        </el-dialog>
    </el-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getListPage, batchRemove } from 'src/service/user'
import city from 'src/components/common/city'
import edit from './edit'

export default {
    components: { edit, city },
    data() {
        return {
            loading: true, //列表load
            page: 1,
            pageSize: 10,
            pageSizes: [10, 20, 30, 50, 100],
            total: 88,
            tableData: [], //表格数据
            sels: [],
            addVisible: false,
            editVisible: false,
            editModel: null, //编辑数据
            search: {
                name: '',
                addr: [],
            }
        }
    },
    created() {
        this.initData();
    },
    methods: {
        selsChange: function(sels) {
            this.sels = sels;
        },
        //表格数据
        async initData() {
            this.loading = true;
            let { page, pageSize } = this;
            let { name, addr } = this.search;
            let { total, resultList } = await getListPage({ name, addr: addr.join(' '), page, pageSize });
            this.total = total;
            this.tableData = resultList;
            this.loading = false;
            return false;
        },
        resetSearch() {
            this.$refs.search.resetFields();
            this.initData();
        },
        handleEdit(row) {
            if (row) { //修改
                let { id, name, sex, birth, addr } = row;
                this.editModel = { id, name, sex, birth, county: addr.split(' ') };
                this.editVisible = true;
            } else {//新增
                this.addVisible = true;
            }
        },
        handleEditSuccess() {
            this.addVisible = false;
            this.editVisible = false;
            this.initData();
        },
        //删除
        async handleDel(row) {
            await this.$confirm('确认删除吗？', '提示');
            await batchRemove({ ids: [row.id] });
            this.$message.success('删除成功');
            this.initData();
        },
        //删除多个
        async batchRemove() {
            const ids = this.sels.map(v => v.id);
            if (ids.length > 0) {
                await this.$confirm('确认删除吗？', '提示');
                await batchRemove({ ids });
                this.$message.success('删除成功');
                this.initData();
            } else {
                this.$message.warning('请选择需要删除的数据');
            }
        },
        //导入
        handleImport() {
            this.$message.warning('尚未开发');
        },
        //导出
        handleExport() {
            const ids = this.sels.map(v => v.id);
            if (ids.length > 0) {
                this.$message.warning('尚未开发');
            } else {
                this.$message.warning('请选择需要导出的数据');
            }
        }
    }
}
</script>
