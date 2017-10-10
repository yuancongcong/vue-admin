<template>
    <div class="login-form">
        <p class="logo">Vue-Admin</p>
        <el-form ref="form" label-width="0">
            <el-form-item>
                <el-input v-model="form.username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="form.password" type="password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" class="w-100" @click="onSubmit">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import { login } from 'src/service/user'
import { getList } from 'src/service/menu'

export default {
    data() {
        return {
            form: {
                username: 'admin',
                password: '123456',
            }
        }
    },
    methods: {
        ...mapActions([
            'getCurMenu'
        ]),
        ...mapMutations([
            'RECORD_USERINFO'
        ]),
        async onSubmit() {
            try {
                let { code, msg, token, user } = await login(this.form);
                if (code == 200) {
                    let menus = await getList();
                    this.RECORD_USERINFO({ token, user, menus });
                    this.$router.push(this.$route.query.redirect || '/')
                } else {
                    this.$message.error(msg)
                }
            } catch (e) {
                this.$message.error(e.message)
            }

        }
    }
}
</script>

<style lang="scss">
.login-form {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 400px;
    height: 17.5rem;
    padding: 1.75rem;
    border-radius: 3px;
    z-index: 20;
    background: #fff;
    box-shadow: 0 10px 60px rgba(0, 0, 0, .3), 0 0 20px rgba(0, 0, 0, .1);
    transform-style: preserve-3d;
    transform: translate(-50%, -50%);
    transition: all .5s ease-in-out;
    .logo {
        font-size: 2rem;
        font-weight: 700;
        background-color: white;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-image: linear-gradient(90deg, #115d8e, #347eff);
        text-align: center;
    }
}
</style>
