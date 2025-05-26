import React, { useState, useEffect } from 'react';
import TareaList from './components/TareaList';
import TareaForm from './components/TareaForm';
import tareaService from './services/tareaService';
import './App.css'; // Para estilos básicos

function App() {
    const [currentTarea, setCurrentTarea] = useState(null);
    const [refreshList, setRefreshList] = useState(false); // Estado para forzar la recarga de la lista

    useEffect(() => {
        // Este useEffect se encargará de refrescar la lista cuando 'refreshList' cambie
        // No hay una lógica directa aquí, es solo un "trigger"
    }, [refreshList]);

    const handleSaveTarea = (tarea) => {
        if (tarea.id) {
            // Actualizar
            tareaService.updateTarea(tarea.id, tarea)
                .then(() => {
                    setCurrentTarea(null);
                    setRefreshList(!refreshList); // Alternar para forzar la recarga
                })
                .catch(error => console.error('Error al actualizar la tarea:', error));
        } else {
            // Crear
            tareaService.createTarea(tarea)
                .then(() => {
                    setRefreshList(!refreshList); // Alternar para forzar la recarga
                })
                .catch(error => console.error('Error al crear la tarea:', error));
        }
    };

    const handleDeleteTarea = (id) => {
        tareaService.deleteTarea(id)
            .then(() => {
                setRefreshList(!refreshList); // Alternar para forzar la recarga
            })
            .catch(error => console.error('Error al eliminar la tarea:', error));
    };

    const handleToggleComplete = (id, completada) => {
        tareaService.getTareaById(id)
            .then(response => {
                const tareaToUpdate = { ...response.data, completada: completada };
                tareaService.updateTarea(id, tareaToUpdate)
                    .then(() => {
                        setRefreshList(!refreshList);
                    })
                    .catch(error => console.error('Error al actualizar estado:', error));
            })
            .catch(error => console.error('Error al obtener tarea para actualizar estado:', error));
    };

    return (
        <div className="App">
            <h1>Sistema CRUD de Tareas</h1>
            <TareaForm currentTarea={currentTarea} onSave={handleSaveTarea} />
            <hr />
            {/* Pasar refreshList como prop para que TareaList sepa cuándo volver a cargar */}
            <TareaList
                key={refreshList} // Usar key para forzar que el componente se remonte cuando refreshList cambie
                onEdit={setCurrentTarea}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDeleteTarea}
            />
        </div>
    );
}

export default App;