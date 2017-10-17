<template>
    <el-cascader :options="menus" :props="defaultProps"  v-model="currentValue" @change="handelChange"
     change-on-select filterable show-all-levels clearable :placeholder="placeholder">
    </el-cascader>
</template>

<script>
import { mapState } from 'vuex'

export default {
    props: ['value', 'placeholder'],
    data() {
        return {
            currentValue: [...this.value],
            defaultProps: {
                children: 'children',
                label: 'name',
                value: 'id',
            },
        }
    },
    computed: {
        ...mapState([
            'menus'
        ])
    },
    watch: {
        value(v) {
            this.currentValue = [...v];
        }
    },
    methods: {
        handelChange(value) {
            this.$emit('input', value);
            this.$emit('change', value);
        },
    }
}
</script>