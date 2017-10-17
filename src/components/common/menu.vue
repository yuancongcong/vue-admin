<template>
    <el-menu class="menu" :default-active="$route.fullPath" router :collapse="collapse">
        <submenu :menu="menu" v-for="menu in menus" :key="menu.id"></submenu>
    </el-menu>
</template>

<script>
import submenu from './submenu'
export default {
    components: {
        submenu
    },
    props: ['menus', 'collapse']
}
</script>
