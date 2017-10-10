import axios from 'axios';


export const getList = params =>  axios.post('/menu/list', params)

export const batchRemove = params =>  axios.post('/menu/batchremove', params)

export const save = params =>  axios.post('/menu/save', params)