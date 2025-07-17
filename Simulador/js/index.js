
var Id_Cliente;
var Lista_Ruc = [];

document.querySelector('.add-row').addEventListener('click', function() {
            const tbody = document.getElementById('addressTableBody');
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td><input type="text" autocomplete="off" oninput="this.value = this.value.replace(/[^A-Z a-zñÑÁÉÍÓÚáéíóú]/g, '');"></td>
                <td><input type="text" style="text-align: center;" autocomplete="off" oninput="this.value = this.value.replace(/[^A-Z a-zñÑÁÉÍÓÚáéíóú]/g, '');"></td>
                <td><input type="text" autocomplete="off" oninput="this.value = this.value.replace(/[^A-Z a-zñÑÁÉÍÓÚáéíóú]/g, '');"></td>
                <td><input type="text" style="text-align: center;" autocomplete="off" maxlength="10" oninput="this.value = this.value.replace(/[^0-9]/g, '');"></td>
                <td>
                    <input type="text" placeholder="Provincia:" autocomplete="off" oninput="this.value = this.value.replace(/[^A-Z a-zñÑÁÉÍÓÚáéíóú]/g, '');"><br>
                    <input type="text" placeholder="Ciudad:" autocomplete="off" oninput="this.value = this.value.replace(/[^A-Z a-zñÑÁÉÍÓÚáéíóú]/g, '');"><br>
                    <input type="text" placeholder="Parroquia:" autocomplete="off" oninput="this.value = this.value.replace(/[^A-Z a-zñÑÁÉÍÓÚáéíóú]/g, '');"><br>
                    <input type="text" placeholder="Calle principal:"><br>
                    <input type="text" placeholder="Calle secundaria:"><br>
                    <input type="text" placeholder="Número de casa:">
                </td>
                <td>
                    <select style="text-align: center;">
                        <option value="ABIERTO">ABIERTO</option>
                        <option value="CERRADO">CERRADO</option>
                    </select>    
                </td>
                <td><button class="delete-row">Eliminar</button></td>
            `;
            tbody.appendChild(newRow);

            // Add delete functionality to the new row's button
            newRow.querySelector('.delete-row').addEventListener('click', function() {
                newRow.remove();
            });
        });

        // Add delete functionality to the existing row's button
        document.querySelectorAll('.delete-row').forEach(button => {
            button.addEventListener('click', function() {
                this.closest('tr').remove();
            });
        });




Leer_Clientes();

async function Leer_Clientes(){

    // Hacemos una solicitud al servidor cuando se haga clic
    const Solicitud = await fetch(`/api/clientes/Leer`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json" 
        }       
    });

    const Respuesta_Servidor = await Solicitud.json();
    if(Respuesta_Servidor.Estado){
        for (let index = 0; index < Respuesta_Servidor.Respuesta.length; index++) {
            const { Representante_Legal, Ruc, _id, Fecha_Actualizacion, Fecha_Cese, Fecha_Inicio_Actividad, Fecha_Reinicio_Actividades} = Respuesta_Servidor.Respuesta[index];
            Lista_Ruc.push(Ruc);
            Lista_Clientes(Representante_Legal, Ruc, _id, Fecha_Actualizacion, Fecha_Cese, Fecha_Inicio_Actividad, Fecha_Reinicio_Actividades);
        }
    }
    else{                 
        location.reload();
    }

}


function Lista_Clientes(Representante, RUC, Id, Fecha_Actualizacion, Fecha_Cese, Fecha_Inicio_Actividad, Fecha_Reinicio_Actividades){
    var LeerDiv = document.getElementById("ListaClientes");
    var newBloque = document.createElement("div"); 
    newBloque.className = "PerfilesCreados";
    newBloque.onclick = (function() { 
        CargarGeneral(Representante, RUC, Id, Fecha_Actualizacion, Fecha_Cese, Fecha_Inicio_Actividad, Fecha_Reinicio_Actividades); 
        LeerInformacion(Id);
        Id_Cliente = Id;
        document.getElementById("Btn_Crear").style.display = "none";
        document.getElementById("Btn_Actualizar").style.display = "block";
        document.getElementById("Btn_Eliminar").style.display = "block";
        document.getElementById("Validacion").style.display = "none";
        document.getElementById("Informacion").style.display = "inline";
    });    

    // Añadir atributos para búsqueda
    newBloque.setAttribute("data-representante", Representante.toLowerCase());
    newBloque.setAttribute("data-ruc", RUC.toLowerCase());

    var newH2 = document.createElement("h2");
    newH2.innerHTML = Representante+"<br><b><hr></b>";
    var newP = document.createElement("p");
    newP.innerHTML = "<b>RUC:</b> "+RUC;     
    newBloque.appendChild(newH2); 
    newBloque.appendChild(newP); 
    LeerDiv.appendChild(newBloque);     
}


async function LeerInformacion(Id){

    // Hacemos una solicitud al servidor cuando se haga clic
    const Solicitud = await fetch(`/api/clientes/LeerInformacion/${Id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json" 
        }       
    });

    const Respuesta_Servidor = await Solicitud.json();
    if(Respuesta_Servidor.Estado){
        document.getElementById('addressTableBody').innerHTML = ''; // Clear existing rows

        const { Subtipo_Contribuyente, Telefono, Tipo_Actividad} = Respuesta_Servidor.Respuesta.Informacion_Legal;        

        document.getElementById("Inp_Subtipo_Contribuyente").value = Subtipo_Contribuyente;
        document.getElementById("Inp_Telefono").value = Telefono;
        document.getElementById("Inp_Tipo_Actividad").value = Tipo_Actividad;

        for (let index = 0; index < Respuesta_Servidor.Respuesta.Direcciones.length; index++) {

            const { Nombre_Comercial, Tipo_Establecimiento, Nombre_Representante, Telefono, Provincia, Ciudad, Parroquia, Calle_Principal, Calle_Secundaria, Numero_Casa, Estado } = Respuesta_Servidor.Respuesta.Direcciones[index];
            const tbody = document.getElementById('addressTableBody');
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td><input type="text" value="${Nombre_Comercial}" autocomplete="off" oninput="this.value = this.value.replace(/[^A-Z a-zñÑÁÉÍÓÚáéíóú]/g, '');"></td>
                <td><input type="text" value="${Tipo_Establecimiento}" style="text-align: center;" autocomplete="off" oninput="this.value = this.value.replace(/[^A-Z a-zñÑÁÉÍÓÚáéíóú]/g, '');"></td>
                <td><input type="text" value="${Nombre_Representante}" autocomplete="off" oninput="this.value = this.value.replace(/[^A-Z a-zñÑÁÉÍÓÚáéíóú]/g, '');"></td>
                <td><input type="text" value="${Telefono}" style="text-align: center;" autocomplete="off" maxlength="10" oninput="this.value = this.value.replace(/[^0-9]/g, '');"></td>
                <td>
                    <input type="text" placeholder="Provincia:" value="${Provincia}" autocomplete="off" oninput="this.value = this.value.replace(/[^A-Z a-zñÑÁÉÍÓÚáéíóú]/g, '');"><br>
                    <input type="text" placeholder="Ciudad:" value="${Ciudad}" autocomplete="off" oninput="this.value = this.value.replace(/[^A-Z a-zñÑÁÉÍÓÚáéíóú]/g, '');"><br>
                    <input type="text" placeholder="Parroquia:" value="${Parroquia}" autocomplete="off" oninput="this.value = this.value.replace(/[^A-Z a-zñÑÁÉÍÓÚáéíóú]/g, '');"><br>
                    <input type="text" placeholder="Calle principal:" value="${Calle_Principal}"><br>
                    <input type="text" placeholder="Calle secundaria:" value="${Calle_Secundaria}"><br>
                    <input type="text" placeholder="Número de casa:" value="${Numero_Casa}">
                </td>
                <td>
                    <select style="text-align: center;">
                        <option value="ABIERTO" ${Estado === "ABIERTO" ? "selected" : ""}>ABIERTO</option>
                        <option value="CERRADO" ${Estado === "CERRADO" ? "selected" : ""}>CERRADO</option>
                    </select>    
                </td>
                <td><button class="delete-row">Eliminar</button></td>
            `;
            tbody.appendChild(newRow);

            // Add delete functionality to the new row's button
            newRow.querySelector('.delete-row').addEventListener('click', function() {
                newRow.remove();
            });            
        }
    }
    else{                 
        LeerInformacion(Id);
    }

}

function CargarGeneral(Representante, RUC, Id, Fecha_Actualizacion, Fecha_Cese, Fecha_Inicio_Actividad, Fecha_Reinicio_Actividades){

    document.getElementById("Inp_Representante").value = Representante;
    document.getElementById("RUC").value = RUC;
    document.getElementById("Fecha_Actualizacion").value = Fecha_Actualizacion;
    document.getElementById("Fecha_Cese").value = Fecha_Cese;
    document.getElementById("Fecha_Inicio_Actividad").value = Fecha_Inicio_Actividad;
    document.getElementById("Fecha_Reinicio_Actividades").value = Fecha_Reinicio_Actividades;

}


// Escuchar el evento cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function() {
    const inputFiltro = document.getElementById("FiltroClientes");
    inputFiltro.addEventListener("keyup", FiltrarClientes);
});

function FiltrarClientes() {
    var input = document.getElementById("FiltroClientes").value.toLowerCase();
    var clientes = document.querySelectorAll("#ListaClientes .PerfilesCreados");

    clientes.forEach(function(cliente) {
        var nombre = cliente.getAttribute("data-representante");
        var ruc = cliente.getAttribute("data-ruc");

        if (nombre.includes(input) || ruc.includes(input)) {
            cliente.style.display = "block";
        } else {
            cliente.style.display = "none";
        }
    });
}


document.getElementById('Btn_Nuevo_Cliente').addEventListener('click', function() {
    location.reload(); // Recargar la página para iniciar un nuevo cliente
});

document.getElementById('Btn_Validar').addEventListener('click', async function() {
    var Inp_RUC = document.getElementById("Inp_RUC").value;
    if(Inp_RUC.trim() === '' || Inp_RUC.length != 13) {
        await Notificacion("Por favor, ingresa un RUC válido de 13 dígitos.");
        return; // Detiene la ejecución si el RUC no es válido
    }

    if(Lista_Ruc.includes(Inp_RUC)) {
        await Notificacion("El RUC ya está registrado. Por favor, ingresa un RUC diferente.");
        return; // Detiene la ejecución si el RUC ya está registrado
    }

    document.getElementById("Validacion").style.display = "inline";
    document.getElementById("Informacion").style.display = "none";

    const Solicitud = await fetch(`/api/clientes/ConsultarRuc/${Inp_RUC}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json" 
        }
    });
    const Respuesta_Servidor = await Solicitud.json();
    if(Respuesta_Servidor.Estado){

        const {fechaActualizacion, fechaCese, fechaInicioActividades, fechaReinicioActividades} = Respuesta_Servidor.Respuesta.main[0].informacionFechasContribuyente;
        const {tipoContribuyente, actividadEconomicaPrincipal} = Respuesta_Servidor.Respuesta.main[0];
        
        let identificacion = "";
        let nombre = "";
        if(Respuesta_Servidor.Respuesta.main[0].representantesLegales != null){
            ({identificacion, nombre} = Respuesta_Servidor.Respuesta.main[0].representantesLegales[0]);
        }
        else{
            nombre = Respuesta_Servidor.Respuesta.main[0].razonSocial;
        }


        document.getElementById("Inp_Representante").value = nombre;
        document.getElementById("RUC").value = Inp_RUC;
        document.getElementById("Fecha_Actualizacion").value = fechaActualizacion.split(' ')[0];
        document.getElementById("Fecha_Cese").value = fechaCese.split(' ')[0];
        document.getElementById("Fecha_Inicio_Actividad").value = fechaInicioActividades.split(' ')[0];
        document.getElementById("Fecha_Reinicio_Actividades").value = fechaReinicioActividades.split(' ')[0];
        document.getElementById("Inp_Subtipo_Contribuyente").value = tipoContribuyente;
        document.getElementById("Inp_Telefono").value = identificacion; // Asignar el RUC al campo de teléfono
        document.getElementById("Inp_Tipo_Actividad").value = actividadEconomicaPrincipal;


        for (let index = 0; index < Respuesta_Servidor.Respuesta.addit.length; index++) {
            
            const { direccionCompleta, estado, nombreFantasiaComercial, tipoEstablecimiento } = Respuesta_Servidor.Respuesta.addit[index];

            var Direccion = direccionCompleta.split(' / ');
            var Calles = Direccion[3].split(' Y ');

            const tbody = document.getElementById('addressTableBody');
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td><input type="text" value="${nombreFantasiaComercial}" autocomplete="off" oninput="this.value = this.value.replace(/[^A-Z a-zñÑÁÉÍÓÚáéíóú]/g, '');"></td>
                <td><input type="text" value="${tipoEstablecimiento}" style="text-align: center;" autocomplete="off" oninput="this.value = this.value.replace(/[^A-Z a-zñÑÁÉÍÓÚáéíóú]/g, '');"></td>
                <td><input type="text" value="" autocomplete="off" oninput="this.value = this.value.replace(/[^A-Z a-zñÑÁÉÍÓÚáéíóú]/g, '');"></td>
                <td><input type="text" value="" style="text-align: center;" autocomplete="off" maxlength="10" oninput="this.value = this.value.replace(/[^0-9]/g, '');"></td>
                <td>
                    <input type="text" placeholder="Provincia:" value="${Direccion[0]}" autocomplete="off" oninput="this.value = this.value.replace(/[^A-Z a-zñÑÁÉÍÓÚáéíóú]/g, '');"><br>
                    <input type="text" placeholder="Ciudad:" value="${Direccion[1]}" autocomplete="off" oninput="this.value = this.value.replace(/[^A-Z a-zñÑÁÉÍÓÚáéíóú]/g, '');"><br>
                    <input type="text" placeholder="Parroquia:" value="${Direccion[2]}" autocomplete="off" oninput="this.value = this.value.replace(/[^A-Z a-zñÑÁÉÍÓÚáéíóú]/g, '');"><br>
                    <input type="text" placeholder="Calle principal:" value="${Calles[0]}"><br>
                    <input type="text" placeholder="Calle secundaria:" value="${Calles[1]}"><br>
                    <input type="text" placeholder="Número de casa:" value="">
                </td>
                <td>
                    <select style="text-align: center;">
                        <option value="ABIERTO" ${estado === "ABIERTO" ? "selected" : ""}>ABIERTO</option>
                        <option value="CERRADO" ${estado === "CERRADO" ? "selected" : ""}>CERRADO</option>
                    </select>    
                </td>
                <td><button class="delete-row">Eliminar</button></td>
            `;
            tbody.appendChild(newRow);

            // Add delete functionality to the new row's button
            newRow.querySelector('.delete-row').addEventListener('click', function() {
                newRow.remove();
            });            
            
        }



        document.getElementById("Validacion").style.display = "none";
        document.getElementById("Informacion").style.display = "inline";
        document.getElementById("Btn_Crear").style.display = "block";
        document.getElementById("Btn_Actualizar").style.display = "none";
        document.getElementById("Btn_Eliminar").style.display = "none";
    }
    else{      
        await Notificacion(Respuesta_Servidor.Respuesta);
    }

});

document.getElementById('Btn_Crear').addEventListener('click', async function() {

    var Datos = await Validar_Datos();

    if(!Datos) {
        return; // Detiene la ejecución si los datos no son válidos
    }
        
    // Hacemos una solicitud al servidor cuando se haga clic
    const Solicitud = await fetch(`/api/clientes/Crear`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(Datos)
    });

    const Respuesta_Servidor = await Solicitud.json();

    if(Respuesta_Servidor.Estado){
        await Notificacion("Cliente creado exitosamente.");
        location.reload(); // Recargar la página para ver los cambios        
    }
    else{      
        await Notificacion("Error al crear el cliente. Por favor, inténtalo de nuevo.");
    }
});

document.getElementById('Btn_Actualizar').addEventListener('click', async function() {

    var Datos = await Validar_Datos();

    if(!Datos) {
        return; // Detiene la ejecución si los datos no son válidos
    }

    Datos.Id = Id_Cliente; // Agregar el ID del cliente a los datos

    // Hacemos una solicitud al servidor cuando se haga clic
    const Solicitud = await fetch(`/api/clientes/Actualizar`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(Datos)
    });

    const Respuesta_Servidor = await Solicitud.json();

    if(Respuesta_Servidor.Estado){
        await Notificacion("Cliente actualizado exitosamente.");
        location.reload(); // Recargar la página para ver los cambios        
    }
    else{      
        await Notificacion("Error al actualizar el cliente. Por favor, inténtalo de nuevo.");        
    }
});

document.getElementById('Btn_Eliminar').addEventListener('click', async function() {
    if(!Id_Cliente) {
        await Notificacion("Por favor, selecciona un cliente para eliminar.");
        return;
    }

    // Hacemos una solicitud al servidor cuando se haga clic
    const Solicitud = await fetch(`/api/clientes/Eliminar/${Id_Cliente}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json" 
        }
    });

    const Respuesta_Servidor = await Solicitud.json();

    if(Respuesta_Servidor.Estado){
        await Notificacion("Cliente eliminado exitosamente.");
        location.reload(); // Recargar la página para ver los cambios        
    }
    else{      
        await Notificacion("Error al eliminar el cliente. Por favor, inténtalo de nuevo.");         
    }
});


async function Validar_Datos(){
    var Representante = document.getElementById("Inp_Representante").value;
    var RUC = document.getElementById("RUC").value;
    var Fecha_Actualizacion = document.getElementById("Fecha_Actualizacion").value;
    var Fecha_Cese = document.getElementById("Fecha_Cese").value;
    var Fecha_Inicio_Actividad = document.getElementById("Fecha_Inicio_Actividad").value;
    var Fecha_Reinicio_Actividades = document.getElementById("Fecha_Reinicio_Actividades").value;
    var Subtipo_Contribuyente = document.getElementById("Inp_Subtipo_Contribuyente").value;
    var Telefono = document.getElementById("Inp_Telefono").value;
    var Tipo_Actividad = document.getElementById("Inp_Tipo_Actividad").value;
    
    const hoy = new Date().toISOString().split('T')[0]; // Fecha actual en YYYY-MM-DD

   // Validar cada campo requerido
    var errores = [];
    if (!Representante) errores.push("Representante Legal");
    if (!RUC) errores.push("RUC");
    if (!Fecha_Actualizacion) errores.push("Fecha de Actualización");
    if (!Fecha_Inicio_Actividad) errores.push("Fecha de Inicio de Actividades");
    if (!Subtipo_Contribuyente) errores.push("Subtipo de Contribuyente");
    if (!Telefono) errores.push("Teléfono");
    if (!Tipo_Actividad) errores.push("Tipo de Actividad");

    // Mostrar mensaje de error si hay campos vacíos
    if (errores.length > 0) {
        await Notificacion(`Por favor, completa los siguientes campos:\n- ${errores.join('\n- ')}`);
        return null;
    }


    if(Telefono.trim().length != 10) {
        await Notificacion("El número de teléfono debe tener 10 dígitos.");
        return; // Detiene la ejecución si el número de teléfono no es válido
    }


    // Convertir fechas a objetos Date
    const fechaActualizacionDate = new Date(Fecha_Actualizacion);
    const fechaCeseDate = Fecha_Cese ? new Date(Fecha_Cese) : null;
    const fechaInicioActividadDate = new Date(Fecha_Inicio_Actividad);
    const fechaReinicioActividadesDate = Fecha_Reinicio_Actividades ? new Date(Fecha_Reinicio_Actividades) : null;
    const hoyDate = new Date(hoy);

    // Validaciones de fechas
    if (fechaInicioActividadDate > hoyDate) {
        await Notificacion("La fecha de inicio de actividades no puede ser mayor a la fecha actual.");
        return;
    }

    if (fechaActualizacionDate < fechaInicioActividadDate) {
        await Notificacion("La fecha de actualización no puede ser anterior a la fecha de inicio de actividades.");
        return;
    }
    if (fechaActualizacionDate > hoyDate) {
        await Notificacion("La fecha de actualización no puede ser posterior a la fecha actual.");
        return;
    }

    if (Fecha_Cese && (fechaCeseDate < fechaInicioActividadDate)) {
        await Notificacion("La fecha de cese no puede ser anterior a la fecha de inicio de actividades.");
        return;
    }
    if (Fecha_Cese && fechaCeseDate > hoyDate) {
        await Notificacion("La fecha de cese no puede ser posterior a la fecha actual.");
        return;
    }

    if (Fecha_Reinicio_Actividades && fechaReinicioActividadesDate < fechaInicioActividadDate) {
        await Notificacion("La fecha de reinicio de actividades no puede ser anterior a la fecha de inicio de actividades.");
        return;
    }
    if (Fecha_Reinicio_Actividades && fechaReinicioActividadesDate > hoyDate) {
        await Notificacion("La fecha de reinicio de actividades no puede ser posterior a la fecha actual.");
        return;
    }


    const tbody = document.getElementById('addressTableBody');
    const rows = tbody.getElementsByTagName('tr');
    const data = [];

    for (const row of rows) {

        const rowData = {
            Nombre_Comercial: row.cells[0].querySelector('input').value,
            Tipo_Establecimiento: row.cells[1].querySelector('input').value,
            Nombre_Representante: row.cells[2].querySelector('input').value,
            Telefono: row.cells[3].querySelector('input').value,
            Provincia: row.cells[4].querySelector('input[placeholder="Provincia:"]').value,
            Ciudad: row.cells[4].querySelector('input[placeholder="Ciudad:"]').value,
            Parroquia: row.cells[4].querySelector('input[placeholder="Parroquia:"]').value,
            Calle_Principal: row.cells[4].querySelector('input[placeholder="Calle principal:"]').value,
            Calle_Secundaria: row.cells[4].querySelector('input[placeholder="Calle secundaria:"]').value,
            Numero_Casa: row.cells[4].querySelector('input[placeholder="Número de casa:"]').value,
            Estado: row.cells[5].querySelector('select').value
        };

        // Validar campos requeridos de la tabla
        const erroresTabla = [];
        if (!rowData.Nombre_Comercial) erroresTabla.push("Nombre Comercial");
        if (!rowData.Tipo_Establecimiento) erroresTabla.push("Tipo de Establecimiento");
        if (!rowData.Nombre_Representante) erroresTabla.push("Nombre del Representante");
        if (!rowData.Telefono) erroresTabla.push("Teléfono");
        if (!rowData.Provincia) erroresTabla.push("Provincia");
        if (!rowData.Ciudad) erroresTabla.push("Ciudad");
        if (!rowData.Parroquia) erroresTabla.push("Parroquia");
        if (!rowData.Calle_Principal) erroresTabla.push("Calle Principal");
        if (!rowData.Calle_Secundaria) erroresTabla.push("Calle Secundaria");
        if (!rowData.Numero_Casa) erroresTabla.push("Número de Casa");
        if (!rowData.Estado) erroresTabla.push("Estado");

        if (erroresTabla.length > 0) {
            await Notificacion(`Faltan datos en una fila de la tabla:\n- ${erroresTabla.join('\n- ')}`);
            return null;
        }

        if(row.cells[3].querySelector('input').value.trim() != '' && row.cells[3].querySelector('input').value.trim().length != 10) {
            await Notificacion("El número de teléfono debe tener 10 dígitos.");
            return; // Detiene la ejecución si el número de teléfono no es válido
        }
      
        data.push(rowData);
    }

    var Datos_Generales = {
        Representante_Legal: Representante,
        Ruc: RUC,
        Fecha_Actualizacion: Fecha_Actualizacion,
        Fecha_Cese: Fecha_Cese,
        Fecha_Inicio_Actividad: Fecha_Inicio_Actividad,
        Fecha_Reinicio_Actividades: Fecha_Reinicio_Actividades,
        Subtipo_Contribuyente: Subtipo_Contribuyente,
        Telefono: Telefono,
        Tipo_Actividad: Tipo_Actividad,
        Direccion: data
    };    
    return Datos_Generales
}


async function Notificacion(Mensaje){
    document.getElementById("Div_Notificacion").style.display = "inline-flex";
    document.getElementById("Notificacion").innerText = Mensaje;  

    await new Promise(resolve => setTimeout(resolve, 2000)); // Espera 10 segundos
    document.getElementById("Div_Notificacion").style.display = "none";
}