/**
 * 存储sessionStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.sessionStorage.setItem(name, content);
}

/**
 * 获取sessionStorage
 */
export const getStore = (name,type) => {
  if (!name) return;
  let val = window.sessionStorage.getItem(name);
  if(type === 'json'){
    return JSON.parse(val)
  }
  return val
}

/**
 * 删除sessionStorage
 */
export const removeStore = name => {
  if (!name) return;
  window.sessionStorage.removeItem(name);
}

export const getToken = () => getStore('SID')
export const setToken = (val) => setStore('SID',val)
