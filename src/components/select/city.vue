<template>
    <el-cascader :options="options" clearable v-model="currentValue" @change="handelChange" :change-on-select="changeOnSelect" :filterable="filterable" :placeholder="placeholder">
    </el-cascader>
</template>

<script>
export default {
    props: {
        value: Array,
        changeOnSelect: Boolean,
        filterable: Boolean,
        placeholder:String,
    },
    data() {
        return {
            currentValue: this.value,
            options: [{
                value: '上海',
                label: '上海',
                children: [
                    {
                        value: '上海市',
                        label: '上海市',
                        children: [{
                            value: '浦东新区',
                            label: '浦东新区'
                        }, {
                            value: '黄浦区',
                            label: '黄浦区'
                        }, {
                            value: '静安区',
                            label: '静安区'
                        }, {
                            value: '杨浦区',
                            label: '杨浦区'
                        }]
                    }
                ]
            },
            {
                value: '湖南省',
                label: '湖南省',
                children: [{
                    value: '长沙市',
                    label: '长沙市',
                    children: [{
                        value: '雨花区',
                        label: '雨花区'
                    }, {
                        value: '芙蓉区',
                        label: '芙蓉区'
                    }]
                }, {
                    value: '怀化市',
                    label: '怀化市',
                    children: [{
                        value: '鹤城区',
                        label: '鹤城区'
                    }]
                }]
            }]
        }
    },
    watch: {
        value(v) {
            this.setCurrentValue(v)
        }
    },
    methods: {
        handelChange(value) {
            this.setCurrentValue(value);
            this.$emit('change', value);
        },
        setCurrentValue(v) {
            this.currentValue = v;
            this.$emit('input', this.currentValue);
        }
    }
}
</script>