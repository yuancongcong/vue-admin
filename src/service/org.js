let list = [{
  label: '一级 1',
  children: [{
    label: '二级 1-1',
    children: [{
      label: '三级 1-1-1'
    }]
  }]
}, {
  label: '一级 2',
  children: [{
    label: '二级 2-1',
    children: [{
      label: '三级 2-1-1'
    }]
  }, {
    label: '二级 2-2',
    children: [{
      label: '三级 2-2-1'
    }]
  }]
}, {
  label: '一级 3',
  children: [{
    label: '二级 3-1',
    children: [{
      label: '三级 3-1-1'
    }]
  }, {
    label: '二级 3-2',
    children: [{
      label: '三级 3-2-1'
    }]
  }]
}];
/**
 * 创建临时数据
 */
const setpromise = data => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(JSON.parse(JSON.stringify(data)))
    }, 500)
  })
}

export const getList = (pageNo, pageSize) => setpromise(list);
