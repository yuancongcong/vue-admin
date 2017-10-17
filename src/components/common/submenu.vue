<template>
    <el-submenu :index="menu.url">
        <template slot="title">
            <i :class="'el-icon-'+menu.icon"></i>
            <span slot="title">{{menu.name}}</span>
        </template>
        <template v-for="menu2 in menu.children">
            <submenu :menu="menu2" v-if="menu2.children && menu2.children.length>0"></submenu>
            <el-menu-item :index="menu2.url" :route="{path:menu2.url}" v-else>
                <template slot="title">
                    <i :class="'el-icon-'+menu2.icon"></i>
                    {{menu2.name}}</template>
            </el-menu-item>
        </template>
    </el-submenu>
</template>

<script>
// import submenu from './submenu'
export default {
    name:'submenu',
    props: ['menu']
}
</script>
