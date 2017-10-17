<template>
    <el-row class="container">
        <el-col :span="24" class="header">
            <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
                {{collapsed?'V':sysName}}
            </el-col>
            <el-col :span="10">
                <div class="tools" @click.prevent="collapse">
                    <i class="el-icon-fa-align-justify"></i>
                </div>
            </el-col>
            <el-col :span="4" class="userinfo">
                <el-dropdown trigger="hover">
                    <span class="el-dropdown-link userinfo-inner"><img :src="user.avatar" /> {{user.name}}</span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>我的消息</el-dropdown-item>
                        <el-dropdown-item>设置</el-dropdown-item>
                        <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-col>
        </el-col>
        <el-col :span="24" class="main">
            <!--导航菜单-->
            <my-menu :menus="menus" :collapse="collapsed"></my-menu>
            <section class="content-container">
                <div class="grid-content bg-purple-light">
                    <el-col :span="24" class="breadcrumb-container">
                        <strong class="title">{{curMenu.name}}</strong>
                        <el-breadcrumb separator="/" class="breadcrumb-inner">
                            <el-breadcrumb-item v-for="item in breadcrumb" :key="item.url" :to="item.url">
                                {{item.name}}
                            </el-breadcrumb-item>
                        </el-breadcrumb>
                    </el-col>
                    <el-col :span="24" class="content-wrapper">
                        <transition name="fade" mode="out-in">
                            <router-view></router-view>
                        </transition>
                    </el-col>
                </div>
            </section>
        </el-col>
    </el-row>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import myMenu from 'src/components/common/menu'

export default {
    components: { myMenu },
    data() {
        return {
            sysName: 'VUEADMIN',
            collapsed: false,
        }
    },
    watch: {
        $route(v) {
            this.GET_CUR_MENU(this.$route.fullPath)
        }
    },
    created() {
        this.INIT_USERINFO()
        this.GET_CUR_MENU(this.$route.fullPath)
    },
    computed: {
        ...mapState([
            'curMenu', 'user', 'menus', 'breadcrumb'
        ])
    },
    methods: {
        ...mapMutations([
            'INIT_USERINFO', 'USER_LOGOUT', 'GET_CUR_MENU'
        ]),
        //退出登录
        logout: function() {
            this.$confirm('确认退出吗?', '提示').then(() => {
                this.USER_LOGOUT()
                this.$router.push('/login')
            })
        },
        //折叠导航栏
        collapse: function() {
            this.collapsed = !this.collapsed
        },
    }
}
</script>

<style lang="scss">
@import '../style/scss/index';


$color-primary:#20a0ff;

.container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;

    .header {
        height: 60px;
        line-height: 60px;
        background: $color-primary;
        color: #fff;
        .userinfo {
            text-align: right;
            padding-right: 35px;
            float: right;
            .userinfo-inner {
                cursor: pointer;
                color: #fff;
                img {
                    width: 40px;
                    height: 40px;
                    border-radius: 20px;
                    margin: 10px 0px 10px 10px;
                    float: right;
                }
            }
        }
        .logo {
            //width:230px;
            height: 60px;
            font-size: 22px;
            padding-left: 20px;
            padding-right: 20px;
            border-color: rgba(238, 241, 146, 0.3);
            border-right-width: 1px;
            border-right-style: solid;
            transition: .5s all;
            img {
                width: 40px;
                float: left;
                margin: 10px 10px 10px 18px;
            }
            .txt {
                color: #fff;
            }
            &.logo-width {
                width: 230px;
            }
            &.logo-collapse-width {
                width: 60px
            }
        }
        .tools {
            padding: 0px 23px;
            width: 14px;
            height: 60px;
            line-height: 60px;
            cursor: pointer;
        }
    }
    .main {
        display: flex; // background: #324057;
        position: absolute;
        top: 60px;
        bottom: 0px;
        overflow: hidden;
        .menu {
            flex: 0 0 60px;
            width: 60px;
            &:not(.el-menu--collapse) {
                flex: 0 0 230px;
                width: 230px;
            }
        }
        .content-container {
            flex: 1;
            overflow-y: scroll;
            padding: 20px;
            .breadcrumb-container {
                //margin-bottom: 15px;
                .title {
                    width: 200px;
                    float: left;
                    color: #475669;
                }
                .breadcrumb-inner {
                    float: right;
                }
            }
            .content-wrapper {
                background-color: #fff;
                box-sizing: border-box;
            }
        }
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}
</style>
