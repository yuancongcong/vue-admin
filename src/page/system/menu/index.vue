<template>
    <el-row>
        <el-col :span="24" class="toolbar">
            <el-button type="primary" icon="plus" @click="handleAdd()">新增</el-button>
        </el-col>
        <el-col :span="24">
            <el-table :data="tableData" @selection-change="selsChange" v-loading="loading" stripe border ref="table">
                <el-table-column type="index" width="60"></el-table-column>
                <el-table-column prop="name" label="名称" width="200">
                    <template scope="scope">
                        <template v-for="id in scope.row.pids">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</template>
                        <i :class="'el-icon-'+scope.row.icon"></i>&nbsp;
                        {{scope.row.name}}
                    </template>
                </el-table-column>
                <el-table-column prop="url" label="链接"></el-table-column>
                <el-table-column prop="order" label="排序" width="80"></el-table-column>
                <el-table-column prop="disable" label="禁用" width="80">
                    <template scope="scope">
                        {{scope.row.disable==='yes'?'是':'否'}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="250">
                    <template scope="scope">
                        <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="small" @click="handleAdd(scope.row)">添加子菜单</el-button>
                        <el-button type="danger" size="small" @click="handleDel(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
        <el-dialog title="新增菜单" v-model="addVisible">
            <edit @success="handleSaveSuccess" :model="editModel" v-if="addVisible"></edit>
        </el-dialog>
        <el-dialog title="修改菜单" v-model="editVisible">
            <edit @success="handleSaveSuccess" :model="editModel" v-if="editVisible"></edit>
        </el-dialog>
    </el-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getList2, batchRemove } from 'src/service/menu'
import selectMenu from 'src/components/select/menu'
import edit from './edit'

export default {
    components: { edit, selectMenu },
    data() {
        return {
            addVisible: false,
            editVisible: false,
            editModel: null, //编辑数据
        }
    },
    created() {
        this.initData();
    },
    computed: {
        ...mapState({
            loading: 'loading',
            tableData: state => state.menuList
        })
    },
    methods: {
        ...mapActions([
            'getMenuList'
        ]),
        selsChange: function(sels) {
            this.sels = sels;
        },
        initData() {
            this.getMenuList();
        },
        resetSearch() {
            this.$refs.search.resetFields();
            this.initData();
        },
        handleAdd(row) {
            this.editModel = {
                id: '',
                pids: row ? [...row.pids, row.id] : [],
                name: '',
                url: '',
                icon: '',
                disable: 'no',
                order: '',
                remark: '',
            }
            this.addVisible = true;
        },
        handleEdit(row) {
            this.editModel = { ...row, disable: row.disable || 'no' };
            this.editVisible = true;
        },
        handleSaveSuccess() {
            this.addVisible = false;
            this.editVisible = false;
            this.initData();
        },
        async handleDel(row) {
            await this.$confirm('确认删除吗？', '提示');
            if (row.children && row.children.length > 0) {
                await this.$confirm('该菜单有下级菜单吗，确认删除吗？', '提示',{type:'warning'});
            }
            await batchRemove({ ids: [row.id] });
            this.$message.success('删除成功');
            this.initData();
        },
    }
}
</script>
