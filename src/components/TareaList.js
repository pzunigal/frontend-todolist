// src/components/TareaList.js
import React from 'react';

const TareaList = ({ tareas, onEdit, onDelete, onToggleComplete }) => {
  return (
    <div>
      <h2>Mis Tareas</h2>
      {tareas.length === 0 ? (
        <p>No hay tareas. ¡Agrega una!</p>
      ) : (
        <ul>
          {tareas.map((tarea) => (
            <li key={tarea.id} className={tarea.completada ? 'completed' : ''}>
              <div>
                <h3>{tarea.titulo}</h3>
                <p>{tarea.descripcion}</p>
                {tarea.fechaVencimiento && (
                  <p>Vence: {tarea.fechaVencimiento}</p>
                )}
                <p>Estado: {tarea.completada ? 'Completada' : 'Pendiente'}</p>
              </div>
              <div>
                <button className="toggle-complete-button" onClick={() => onToggleComplete(tarea.id, !tarea.completada)}>
                  {tarea.completada ? 'Marcar Pendiente' : 'Marcar Completada'}
                </button>
                <button className="edit-button" onClick={() => onEdit(tarea)}>
                  Editar
                </button>
                <button className="delete-button" onClick={() => onDelete(tarea.id)}>
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TareaList;