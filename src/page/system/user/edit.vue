<template>
    <el-dialog :title="title" v-model="visible">
        <el-form :model="form" :rules="rules" label-width="80px" ref="form" class="c-form">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-radio-group v-model="form.sex">
                    <el-radio-button label="male">男</el-radio-button>
                    <el-radio-button label="female">女</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="生日" prop="birth">
                <el-date-picker v-model="form.birth" type="date" placeholder="选择日期" @change="form.birth = $event"></el-date-picker>
            </el-form-item>
            <el-form-item label="地址" prop="county">
                <city v-model="form.county" filterable></city>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" :loading="loading">保存</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import { save } from 'src/service/user'
import city from 'src/components/common/city'

export default {
    components: { city },
    data() {
        return {
            loading: false,
            visible: false,
            title: '',
            form: {
                id: '',
                name: '',
                sex: '',
                birth: '',
                county: []
            },
            rules: {
                name: [
                    { required: true, message: '请填写姓名', trigger: 'blur' },
                ],
                sex: [
                    {
                        required: true, message: '请选择性别', trigger: 'change'
                    }
                ],
                birth: [
                    { required: true, message: '请填写生日', trigger: 'change' }
                ],
                county: [
                    { required: true, message: '请填写地址', type: 'array', trigger: 'change' }
                ],
            }
        }
    },
    methods: {
        open(form) {
            this.visible = true;
            this.resetForm();
            if (form) {
                this.title = '编辑';
                Object.assign(this.form, form);
                this.form.county = form.addr.split(' ');
            } else {
                this.id = '';
                this.title = '新增';
            }
        },
        resetForm() {
            this.form = Object.assign({},this.form, {
                name: '',
                sex: '',
                birth: '',
                county: []
            });
            this.$refs.form && this.$refs.form.resetFields();
        },
        async onSubmit() {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    try {
                        this.loading = true;
                        let { id, name, sex, county, birth } = this.form;
                        let data = await save({ id, name, sex, birth, addr: county.join(' ') });
                        if (data.code === 200) {
                            this.$message.success(data.msg);
                            this.visible = false;
                            this.$emit('success')
                        } else {
                            throw Error('遇见错误')
                        }
                    } catch (e) {
                        this.$message.error(e.message);
                    } finally {
                        this.loading = false;
                    }
                }
            });

        },
    }
}
</script>