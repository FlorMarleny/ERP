document.addEventListener('DOMContentLoaded', function() {
    const tablaHistorial = document.getElementById('tabla-historial');

    function actualizarTablaHistorial() {
        const historial = obtenerHistorial();
        const tbody = tablaHistorial.querySelector('tbody');
        tbody.innerHTML = '';

        if (historial.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="3">No hay acciones registradas</td>';
            tbody.appendChild(row);
        } else {
            historial.forEach(registro => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${formatFecha(registro.fecha)}</td>
                    <td>${registro.accion}</td>
                    <td>${registro.descripcion}</td>
                `;
                tbody.appendChild(row);
            });
        }
    }

    actualizarTablaHistorial();
});

function obtenerHistorial() {
    return JSON.parse(localStorage.getItem('historial')) || [];
}

function formatFecha(fechaISO) {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleString('es-ES');
}
