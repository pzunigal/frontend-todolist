import React, { useState, useEffect } from 'react';
import tareaService from '../services/tareaService';

const TareaList = ({ onEdit, onToggleComplete, onDelete }) => {
    const [tareas, setTareas] = useState([]);

    useEffect(() => {
        fetchTareas();
    }, []);

    const fetchTareas = () => {
        tareaService.getTareas()
            .then(response => {
                setTareas(response.data);
            })
            .catch(error => {
                console.error('Error al obtener las tareas:', error);
            });
    };

    return (
        <div>
            <h2>Lista de Tareas</h2>
            {tareas.length === 0 ? (
                <p>No hay tareas. ¡Añade una!</p>
            ) : (
                <ul>
                    {tareas.map(tarea => (
                        <li key={tarea.id} style={{ textDecoration: tarea.completada ? 'line-through' : 'none' }}>
                            <h3>{tarea.titulo}</h3>
                            <p>{tarea.descripcion}</p>
                            <p>Fecha de Creación: {tarea.fechaCreacion}</p>
                            {tarea.fechaVencimiento && <p>Fecha de Vencimiento: {tarea.fechaVencimiento}</p>}
                            <button onClick={() => onToggleComplete(tarea.id, !tarea.completada)}>
                                {tarea.completada ? 'Desmarcar' : 'Completar'}
                            </button>
                            <button onClick={() => onEdit(tarea)}>Editar</button>
                            <button onClick={() => onDelete(tarea.id)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TareaList;