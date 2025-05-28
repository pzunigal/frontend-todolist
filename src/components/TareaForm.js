// src/components/TareaForm.js
import React, { useState, useEffect } from 'react';

const TareaForm = ({ initialTarea, onSave, onCancel }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [fechaVencimiento, setFechaVencimiento] = useState('');

  // Carga los datos iniciales si se está editando una tarea
  useEffect(() => {
    if (initialTarea) {
      setTitulo(initialTarea.titulo || '');
      setDescripcion(initialTarea.descripcion || '');
      // Formatear la fecha para input type="date" (YYYY-MM-DD)
      setFechaVencimiento(initialTarea.fechaVencimiento || '');
    } else {
      // Limpiar el formulario si no hay tarea inicial (para crear)
      setTitulo('');
      setDescripcion('');
      setFechaVencimiento('');
    }
  }, [initialTarea]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validaciones básicas
    if (!titulo) {
      alert('El título de la tarea es obligatorio.');
      return;
    }

    const tareaData = {
      titulo,
      descripcion,
      fechaVencimiento: fechaVencimiento || null, // Envía null si está vacío
      completada: initialTarea ? initialTarea.completada : false // Mantener estado si edita
    };

    onSave(initialTarea ? initialTarea.id : null, tareaData); // Pasa el ID si existe
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '5px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3>{initialTarea ? 'Editar Tarea' : 'Agregar Nueva Tarea'}</h3>
      <input
        type="text"
        placeholder="Título de la tarea"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
        style={{ width: '80%', padding: '8px', margin: '5px 0' }}
      />
      <textarea
        placeholder="Descripción (opcional)"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        rows="3"
        style={{ width: '80%', padding: '8px', margin: '5px 0' }}
      ></textarea>
      <input
        type="date"
        value={fechaVencimiento}
        onChange={(e) => setFechaVencimiento(e.target.value)}
        style={{ width: '80%', padding: '8px', margin: '5px 0' }}
      />
      <div>
        <button type="submit" className="add-button">
          {initialTarea ? 'Guardar Cambios' : 'Agregar Tarea'}
        </button>
        {initialTarea && ( // Muestra el botón Cancelar solo en modo edición
          <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>
            Cancelar Edición
          </button>
        )}
      </div>
    </form>
  );
};

export default TareaForm;