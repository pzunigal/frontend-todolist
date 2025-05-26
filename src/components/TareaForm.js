import React, { useState, useEffect } from 'react';

const TareaForm = ({ currentTarea, onSave }) => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fechaVencimiento, setFechaVencimiento] = useState('');

    useEffect(() => {
        if (currentTarea) {
            setTitulo(currentTarea.titulo);
            setDescripcion(currentTarea.descripcion);
            setFechaVencimiento(currentTarea.fechaVencimiento || '');
        } else {
            setTitulo('');
            setDescripcion('');
            setFechaVencimiento('');
        }
    }, [currentTarea]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const tarea = {
            id: currentTarea ? currentTarea.id : null,
            titulo,
            descripcion,
            completada: currentTarea ? currentTarea.completada : false,
            fechaCreacion: currentTarea ? currentTarea.fechaCreacion : null,
            fechaVencimiento: fechaVencimiento || null
        };
        onSave(tarea);
        setTitulo('');
        setDescripcion('');
        setFechaVencimiento('');
    };

    return (
        <div>
            <h2>{currentTarea ? 'Editar Tarea' : 'Crear Nueva Tarea'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título:</label>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Descripción:</label>
                    <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    ></textarea>
                </div>
                <div>
                    <label>Fecha de Vencimiento (YYYY-MM-DD):</label>
                    <input
                        type="date"
                        value={fechaVencimiento}
                        onChange={(e) => setFechaVencimiento(e.target.value)}
                    />
                </div>
                <button type="submit">{currentTarea ? 'Actualizar Tarea' : 'Añadir Tarea'}</button>
            </form>
        </div>
    );
};

export default TareaForm;