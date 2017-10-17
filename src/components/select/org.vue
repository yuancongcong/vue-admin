<template>
    <el-card class="side-org">
        <div slot="header" class="title">组织机构</div>
        <el-input placeholder="输入关键字进行过滤" v-model="filterText">
            <template slot="prepend">
                <i class="el-icon-fa-search"></i>
            </template>
        </el-input>
        <el-tree class="filter-tree" :data="data" :props="defaultProps" default-expand-all :filter-node-method="filterNode" ref="tree"></el-tree>
    </el-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { getList } from 'src/service/org'

export default {
    data() {
        return {
            filterText: '',
            data: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    created() {
        this.getOrgList()
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    methods: {
        async getOrgList() {
            this.data = await getList();
        },
        //tree
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
    }
}
</script>
<style lang="scss">
.side-org {
    flex: 0 0 200px;
    width: 200px;
    margin-right: 30px;
    .filter-tree {
        border: none;
    }
    .el-card__body {
        padding: 5px;
    }
}
</style>
