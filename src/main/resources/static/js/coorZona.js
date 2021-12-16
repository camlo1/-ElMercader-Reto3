const cargarsesionStore =()=>{
    const user = JSON.parse(sessionStorage.getItem("user"));
    console.log(user);

    const perfil = user.type ==='ASE' ? 'Asesor Comercial' : user.type === 'COORD' ? 'Coordinador de zona' : 'Administrador';

    const tabla= ` <table class="table">
    <tr><th>identification</th><th>name</th><th>email</th><th>zone</th><th>Perfil</th></tr>
    <body>
        <tr>
            <td >${user.identification}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.zone}</td>
            <td>${perfil}</td>
        </tr>
    </body>
    
    </table>`;

    $("#resultadoTabla").html(tabla);

}
$(document).ready(() =>{
    cargarsesionStore();
   
})

function traerOrdenes(){
    $.ajax({
        url: "http://140.238.133.71:8080/api/order/all",
        
        
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarOrdenes(respuesta);    
            $("#resultado2").html("");
        }

    });
}
const pintarOrdenes = (respuesta)=>{
    let tabla = `<div class=' overflow-scroll'>
        <table class="table text-center ">
        <tr><th>identification</th><th >Nombres</th><th>E-mail</th><th>Fecha</th><th>N° Pedido</th><th>Estatus</th><th>Pedido</th></tr>
        <body >
    `;

    for(let i = 0; i<respuesta.length; i++){
        tabla += `
        <tr>
            <td class='border'>${respuesta[i].salesMan.identification}</td class='border-danger'>
            <td class='border'>${respuesta[i].salesMan.name}</td>
            <td class='border'>${respuesta[i].salesMan.email}</td>
            <td class='border'>${respuesta[i].registerDay}</td>
            <td class='border'>${respuesta[i].id}</td>
            <td class='border'>${respuesta[i].status}</td>
                       
          
            <td> <button type='button' class='btn btn-primary'  onclick='detalle(${respuesta[i].id}) ' >Ver Pedido</button></td>
        </tr>`;
    }
    tabla += `</body></table></div class="overflow-scroll>`;
    $("#resultado3").html(tabla);
}


function detalle (id){
    id:id,
    $.ajax({
        url: "http://140.238.133.71:8080/api/order/"+ id,
        
        
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            orden=respuesta
            tablaDetalle(respuesta);
              
        }

    });
}
const tablaDetalle = (respuesta)=>{
    const object = respuesta.products
    const quantities = respuesta.quantities
    const object2 = respuesta
    let tabla1 = `<div class=' overflow-scroll'>
    <table class="table text-center ">
    <tr><th>Fotografia</th><th >Nombre</th><th>Categoria</th><th>Descripcion</th><th>Stock</th><th>Cant vendidas</th></tr>
    <body >
`;

    for(const [brand, products] of Object.entries(object)){
        console.log(object);
        tabla1 += `
        <tr>

            <td class='border'><img src="${products.photography}" height="80"></td>
            <td class='border'>${products.name}</td>
            <td class='border'>${products.category}</td>
            <td class='border'>${products.description}</td>
            <td class='border'>${quantities [brand]}</td>
            <td class='border'>${products.quantity}</td>
                       
          
           
        </tr>`;
    }
    tabla1 += `</body></table></div class="overflow-scroll>`;
    $("#resultado3").html(tabla1);

    let tabla2 = `<div class=' overflow-scroll'>
    <table class="table text-center ">
    <tr><th>Fecha</th><th>nº orden</th><th>status</th></tr>
    <body >
`;


    console.log(respuesta);
    /* const [] of Object.entries(object)){ */
        
        
        console.log(object2);
        tabla2 += `
        <tr>
            
            <td class='border'>${object2.registerDay}</td>
            <td class='border'>${object2.id}</td>
            <td class='border'>${object2.status}</td>
            <td><select type="text"  id="estado"><option>Estado </option><option>Anulada </option> <option>Aprobada </option></td>
            <td> <button type='button' class='btn btn-primary'  onclick='editarOrden(${respuesta.id}) ' >Ver Pedido</button></td>
                       
          
            
        </tr>`;
    

    tabla2 += `</body></table></div class="overflow-scroll>`;
    $("#resultado2").html(tabla2);
}

function editarOrden (id){

    orden.status = $("#estado").val();
    console.log(orden);
    let dataToSend = JSON.stringify(orden);
    $.ajax({
        url: "http://140.238.133.71:8080/api/order/update",

        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta)
            
            alert("Se encuentra "+ orden.status + " la orden ");
            traerOrdenes();
          

        }
    });
}

