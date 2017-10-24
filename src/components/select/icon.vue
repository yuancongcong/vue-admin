<template>
    <ul class="icon-list">
        <li v-for="icon in icons" :key="icon" :class="{'active':icon===value}" @click="handelClick(icon)">
            <span>
                <i :class="'el-icon-'+icon"></i>
            </span>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        value: String,
    },
    data() {
        return {
            icons: [
                //el-icon
                'document', 'menu', 'message', 'more', 'setting', 'upload2', 'search', 'date',
                //fa-icon
                'fa-id-card', 'fa-address-card', 'fa-address-book', 'edit', 'fa-user', 'fa-user-o', 'fa-window-maximize',
                'fa-automobile', 'fa-bug', 'fa-bank', 'fa-folder-open', 'fa-dashboard', 'fa-gears', 'fa-wifi', 'fa-tree', 'fa-tags',
            ]
        }
    },
    methods: {
        handelClick(value) {
            this.$emit('input', value);
            this.$emit('change', value);
        }
    }
}
</script>
<style lang="scss">
.icon-list {
    overflow: hidden;
    list-style: none;
    padding: 0;
    border: 1px solid #eaeefb;
    border-radius: 4px;
    li {
        float: left;
        width: 16.66%;
        text-align: center;
        height: 40px;
        line-height: 40px;
        color: #666;
        font-size: 13px;
        transition: color .15s linear;
        border-right: 1px solid #eee;
        border-bottom: 1px solid #eee;
        margin-right: -1px;
        margin-bottom: -1px;
        &.active {
            background: #eee;
        }
    }
}
</style>
