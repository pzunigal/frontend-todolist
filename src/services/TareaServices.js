import axios from 'axios';

const API_URL = 'http://localhost:8080/api/tareas'; 

const getTareas = () => {
    return axios.get(API_URL);
};

const getTareaById = (id) => {
    return axios.get(`<span class="math-inline">\{API\_URL\}/</span>{id}`);
};

const createTarea = (tarea) => {
    return axios.post(API_URL, tarea);
};

const updateTarea = (id, tarea) => {
    return axios.put(`<span class="math-inline">\{API\_URL\}/</span>{id}`, tarea);
};

const deleteTarea = (id) => {
    return axios.delete(`<span class="math-inline">\{API\_URL\}/</span>{id}`);
};

export default {
    getTareas,
    getTareaById,
    createTarea,
    updateTarea,
    deleteTarea
};