// src/App.js
import React, { useState, useEffect, useCallback } from 'react';
import './App.css'; // Estilos para la aplicación
import tareaService from './services/tareaService'; // <-- ¡Asegúrate de que esta línea esté EXACTAMENTE así!
import TareaList from './components/TareaList'; // Importamos el componente de lista
import TareaForm from './components/TareaForm'; // Importamos el componente de formulario

function App() {
  const [tareas, setTareas] = useState([]);
  const [editingTarea, setEditingTarea] = useState(null); // Para guardar la tarea que se está editando
  // Función para cargar las tareas
  const fetchTareas = useCallback(async () => {
    try {
      const data = await tareaService.getAllTareas();
      // Ordenar por ID para consistencia (opcional)
      const sortedData = data.sort((a, b) => a.id - b.id);
      setTareas(sortedData);
    } catch (error) {
      // El error ya se maneja en el servicio, aquí podrías mostrar un mensaje al usuario
      console.error("No se pudieron cargar las tareas.");
    }
  }, []); // El array vacío significa que esta función solo se crea una vez

  // Cargar tareas al montar el componente
  useEffect(() => {
    fetchTareas();
  }, [fetchTareas]); // Vuelve a ejecutar si fetchTareas cambia (aunque con useCallback no lo hará)

  // Manejar el guardado/actualización de una tarea
  const handleSaveTarea = async (id, tareaData) => {
    try {
      if (id) {
        // Actualizar tarea existente
        const updatedTarea = await tareaService.updateTarea(id, tareaData);
        setTareas(tareas.map(t => (t.id === id ? updatedTarea : t)));
        setEditingTarea(null); // Sale del modo edición
      } else {
        // Crear nueva tarea
        const newTarea = await tareaService.createTarea(tareaData);
        setTareas([...tareas, newTarea]);
      }
    } catch (error) {
      console.error("Error al guardar la tarea:", error);
      alert('Hubo un error al guardar la tarea. Intenta de nuevo.');
    }
  };

  // Manejar la edición de una tarea (establece la tarea en el estado de edición)
  const handleEditTarea = (tarea) => {
    setEditingTarea(tarea);
  };

  // Manejar la eliminación de una tarea
  const handleDeleteTarea = async (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
      try {
        await tareaService.deleteTarea(id);
        setTareas(tareas.filter(tarea => tarea.id !== id));
      } catch (error) {
        console.error("Error al eliminar la tarea:", error);
        alert('Hubo un error al eliminar la tarea. Intenta de nuevo.');
      }
    }
  };

  // Manejar el cambio de estado de completada
  const handleToggleComplete = async (id, completada) => {
    try {
      // Encuentra la tarea actual para obtener todos sus datos
      const tareaToUpdate = tareas.find(t => t.id === id);
      if (tareaToUpdate) {
        const updatedData = { ...tareaToUpdate, completada: completada };
        const response = await tareaService.updateTarea(id, updatedData);
        setTareas(tareas.map(t => (t.id === id ? response : t)));
      }
    } catch (error) {
      console.error("Error al cambiar el estado de la tarea:", error);
      alert('Hubo un error al actualizar el estado de la tarea. Intenta de nuevo.');
    }
  };

  // Función para cancelar la edición
  const handleCancelEdit = () => {
    setEditingTarea(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mi Lista de Tareas</h1>
      </header>
      <main>
        <TareaForm
          initialTarea={editingTarea}
          onSave={handleSaveTarea}
          onCancel={handleCancelEdit}
        />
        <TareaList
          tareas={tareas}
          onEdit={handleEditTarea}
          onDelete={handleDeleteTarea}
          onToggleComplete={handleToggleComplete}
        />
      </main>
    </div>
  );
}

export default App;