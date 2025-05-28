// src/services/tareaService.js
import axios from 'axios'; // Necesitaremos instalar axios

const API_URL = 'http://localhost:8080/api/tareas'; // La URL base de tu backend

const tareaService = {
  // Obtener todas las tareas
  getAllTareas: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error al obtener las tareas:', error);
      throw error;
    }
  },

  // Crear una nueva tarea
  createTarea: async (tarea) => {
    try {
      const response = await axios.post(API_URL, tarea);
      return response.data;
    } catch (error) {
      console.error('Error al crear la tarea:', error);
      throw error;
    }
  },

  // Actualizar una tarea existente
  updateTarea: async (id, tarea) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, tarea);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar la tarea con ID ${id}:`, error);
      throw error;
    }
  },

  // Eliminar una tarea
  deleteTarea: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      console.log(`Tarea con ID ${id} eliminada.`);
    } catch (error) {
      console.error(`Error al eliminar la tarea con ID ${id}:`, error);
      throw error;
    }
  }
};

export default tareaService;