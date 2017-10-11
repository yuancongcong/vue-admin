<template>
    <el-form ref="form" :model="form" class="c-form" label-width="150px">
        <el-form-item label="头像">
            <el-button type="text">
                <img :src="user.avatar" />
            </el-button>
        </el-form-item>
        <el-form-item label="归属公司">
            <el-input v-model="form.name" disabled=""></el-input>
        </el-form-item>
        <el-form-item label="归属部门">
            <el-input v-model="form.name" disabled=""></el-input>
        </el-form-item>
        <el-form-item label="姓名">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
            <el-input v-model="form.rePassword"></el-input>
        </el-form-item>
        <el-form-item label="电话">
            <el-input v-model="form.rePassword"></el-input>
        </el-form-item>
        <el-form-item label="备注">
            <el-input v-model="form.rePassword" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="用户类型">
            <el-input v-model="form.rePassword"></el-input>
        </el-form-item>
        <el-form-item label="用户角色">
            <el-input v-model="form.rePassword"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            form: {
                name:'',
            }
        }
    },
    computed: {
        ...mapState([
            'user'
        ])
    },
    mounted(){
        this.form = {...this.user};
    },
    methods: {
        onSubmit() {
            let { oldPassword, password, rePassword } = this.form;
        }
    }
}
</script>
<style lang="scss" scoped>
img {
    width: 100px;
    height: 100px;
}
</style>
