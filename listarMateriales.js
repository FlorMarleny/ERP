document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.querySelector('#materiales-table tbody');

    function cargarMateriales() {
        const inventario = JSON.parse(localStorage.getItem('inventario')) || [];
        tableBody.innerHTML = ''; // Limpiar tabla

        inventario.forEach((material, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${material.numero}</td>
                <td>${material.nombre}</td>
                <td>${material.cantidad}</td>
                <td>${material.unidad}</td>
                <td>${material.almacen}</td>
                <td>${material.precio}</td>
                <td>
                    <button onclick="editarMaterial(${index})">Editar</button>
                    <button onclick="eliminarMaterial(${index})">Eliminar</button>
                </td>
            `;

            tableBody.appendChild(row);
        });
    }

    window.eliminarMaterial = function(index) {
        const inventario = JSON.parse(localStorage.getItem('inventario')) || [];
        inventario.splice(index, 1);
        localStorage.setItem('inventario', JSON.stringify(inventario));
        cargarMateriales();
    };

    window.editarMaterial = function(index) {
        window.location.href = `editarMaterial.html?index=${index}`;
    };

    cargarMateriales();
    actualizarTablaMateriales();
});
