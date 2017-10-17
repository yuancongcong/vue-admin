import axios from 'axios';

export const getList = params => axios.post('/menu/list', params)
export const getList2 = params => axios.post('/menu/list2', params)

export const batchRemove = params => axios.post('/menu/batchremove', params)

export const nextOrder = params => axios.post('/menu/nextOrder', params)

export const save = params => axios.post('/menu/save', params)