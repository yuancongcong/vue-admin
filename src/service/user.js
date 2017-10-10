import axios from 'axios';

export const login = params => axios.post('/login', params)

export const getList = params =>  axios.post('/user/list', params)

export const getListPage = params =>  axios.post('/user/listpage', params)

export const batchRemove = params =>  axios.post('/user/batchremove', params)

export const save = params =>  axios.post('/user/save', params)

export const changePassword = params =>  axios.post('/user/changepassword', params)