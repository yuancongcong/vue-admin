<template>
    <el-form ref="form" :model="form" class="c-form" label-width="150px">
        <el-form-item label="原始密码">
            <el-input v-model="form.oldPass" type="password"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
            <el-input v-model="form.newPass" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码">
            <el-input v-model="form.reNewPass" type="password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { changePassword } from 'src/service/user'

export default {
    data() {
        return {
            form: {
                oldPass: '',
                newPass: '',
                reNewPass: '',
            }
        }
    },
    methods: {
        async onSubmit() {
            let { code, msg } = await changePassword(this.form);

            if (code === 200) {
                this.$message.success(msg);
                this.form = {
                    oldPass: '',
                    newPass: '',
                    reNewPass: '',
                }
            } else {
                this.$message.error(msg);
            }
        },
    }
}
</script>