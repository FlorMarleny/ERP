document.addEventListener('DOMContentLoaded', function() {
    const tablaStock = document.getElementById('tabla-stock');

    function actualizarTablaStock() {
        const inventario = obtenerInventario();
        const tbody = tablaStock.querySelector('tbody');
        tbody.innerHTML = '';

        if (inventario.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="5">0 Stock</td>';
            tbody.appendChild(row);
        } else {
            inventario.forEach(material => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${material.numero}</td>
                    <td>${material.nombre}</td>
                    <td>${material.cantidad}</td>
                    <td>${material.unidad}</td>
                    <td>${material.precio}</td>
                `;
                tbody.appendChild(row);
            });
        }
    }

    actualizarTablaStock();
});


function obtenerInventario() {
    return JSON.parse(localStorage.getItem('inventario')) || [];
}