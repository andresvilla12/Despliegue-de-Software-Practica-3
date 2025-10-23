//Creamos una variable de tipo DataTable, con la tabla tblProductos
var Tabla = $("#tblProductos").DataTable();

jQuery(function () {
    //Registrar los botones para responder al evento click
    $("#dvMenu").load("../Paginas/Menu.html")
    //Registrar los botones para responder al evento click
    $("#btnInsertar").on("click", function () {
        EjecutarComandos("POST");
    });
    $("#btnActualizar").on("click", function () {
        EjecutarComandos("PUT");
    });
    $("#btnEliminar").on("click", function () {
        EjecutarComandos("DELETE");
    });
    $("#btnConsultar").on("click", function () {
        Consultar();
    });
    //Invoca la función para llenar el combo
    LlenarComboCategoriaProducto();
    LlenarTablaProductos();
});

async function LlenarTablaProductos() {
    LlenarTablasXServicio("http://localhost:54834/api/Producto", "#tblProductos");
}
async function LlenarComboCategoriaProducto() {
    LlenarComboXServicios("http://localhost:54834/api/CategoriaProducto", "#cboCategoriaProducto");
}

async function Consultar() {
    //Capturo los datos de entrada
    let Codigo = $("#txtCodigo").val();
    //Invocamos el servicio a través del fetch, usando el método fetch de javascript
    try {
        const Respuesta = await fetch("http://localhost:54834/api/Producto?Codigo=" + Codigo,
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                }
            });
        const Rpta = await Respuesta.json();
        //Se presenta la respuesta en el div mensaje
        $("#txtNombre").val(Rpta.Nombre);
        $("#txtValorUnitario").val(Rpta.Precio);
        $("#txtCantidad").val(Rpta.Stock);
        
    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(error);
    }
}
async function EjecutarComandos(Comando) {
    //Capturo los datos de entrada
    let ID = $("#txtCodigo").val();
    let Nombre = $("#txtNombre").val();
    let Precio = $("#txtValorUnitario").val();
    let Stock = $("#txtCantidad").val();
    let CategoriaID = $("#cboCategoriaProducto").val();

    //Defino el json
    let DatosProducto = {
        ID: ID,
        Nombre: Nombre,
        Precio: Precio,
        Stock: Stock,
        CategoriaID: CategoriaID
    }
    //Invocamos el servicio a través del fetch, usando el método fetch de javascript
    try {
        const Respuesta = await fetch("http://localhost:54834/api/Producto",
            {
                method: Comando,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(DatosProducto)
            });
        const Rpta = await Respuesta.json();
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(Rpta);
    }
    catch (error) {
        //Se presenta la respuesta en el div mensaje
        $("#dvMensaje").html(error);
    }
}