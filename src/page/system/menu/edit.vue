<template>
    <el-form :model="model" :rules="rules" label-width="80px" ref="form" class="c-form">
        <el-form-item label="上级菜单" prop="pids">
            <select-menu v-model="model.pids"></select-menu>
        </el-form-item>
        <el-form-item label="名称" prop="name">
            <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="链接" prop="url">
            <el-input v-model="model.url"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
            <select-icon v-model="model.icon"></select-icon>
        </el-form-item>
        <el-form-item label="是否禁用" prop="disable">
            <el-radio-group v-model="model.disable">
                <el-radio label="yes">是</el-radio>
                <el-radio label="no">否</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="排序" prop="order">
            <el-input v-model="model.order"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
            <el-input v-model="model.remark" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit" :loading="loading">保存</el-button>
            <el-button @click="$refs.form.resetFields()">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { save, nextOrder } from 'src/service/menu'
import selectMenu from 'src/components/select/menu'
import selectIcon from 'src/components/select/icon'

export default {
    components: { selectMenu, selectIcon },
    props: {
        model: {
            type: Object,
            default() {
                return {
                    id: '',
                    pids: [],
                    name: '',
                    url: '',
                    icon: '',
                    disable: 'no',
                    order: '',
                    remark: '',
                }
            }
        }
    },
    data() {
        return {
            loading: false,
            rules: {
                name: [
                    { required: true, message: '请填写菜单名称', trigger: 'blur' },
                ]
            }
        }
    },
    methods: {
        onSubmit() {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    try {
                        this.loading = true;
                        let data = await save(this.model);
                        if (data.code === 200) {
                            this.$message.success(data.msg);
                            this.visible = false;
                            this.$emit('success')
                        }
                    }finally {
                        this.loading = false;
                    }
                }
            });

        },
    }
}
</script>