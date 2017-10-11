<template>
    <el-form :model="model" :rules="rules" label-width="80px" ref="form" class="c-form">
        <el-form-item label="姓名" prop="name">
            <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="model.sex">
                <el-radio-button label="male">男</el-radio-button>
                <el-radio-button label="female">女</el-radio-button>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="生日" prop="birth">
            <el-date-picker v-model="model.birth" type="date" placeholder="选择日期" @change="model.birth = $event"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="county">
            <city v-model="model.county" filterable></city>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit" :loading="loading">保存</el-button>
            <el-button @click="$refs.form.resetFields()">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { save } from 'src/service/user'
import city from 'src/components/common/city'

export default {
    components: { city },
    props: {
        model: {
            type: Object,
            default() {
                return {
                    id: '',
                    name: '',
                    sex: '',
                    birth: '',
                    county: []
                }
            }
        }
    },
    data() {
        return {
            loading: false,
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
        onSubmit() {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    try {
                        this.loading = true;
                        let { id, name, sex, county, birth } = this.model;
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