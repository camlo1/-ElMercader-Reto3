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
        url: "http://129.151.114.170:8080/api/order/all",
        
        
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaUser(respuesta);    
        }

    });
}
const pintarRespuestaUser = (respuesta)=>{
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
                       
          
            <td> <button type='button' class='btn btn-primary' onclick='detalle(${respuesta[i].id})'>Ver Pedido</button></td>
        </tr>`;
    }
    tabla += `</body></table></div class="overflow-scroll>`;
    $("#resultado2").html(tabla);
}


function detalle (id){
    id:id,
    $.ajax({
        url: "http://129.151.114.170:8080/api/order/"+ id,
        
        
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            tablaDetalle(respuesta);    
        }

    });
}
const tablaDetalle = (respuesta)=>{
    let tabla1 = `<div class=' overflow-scroll'>
    <table class="table text-center ">
    <tr><th>identification</th><th >Nombres</th><th>E-mail</th><th>Fecha</th><th>N° Pedido</th><th>Estatus</th><th>Pedido</th></tr>
    <body >
`;

    for(let i = 0; i<respuesta.length; i++){
        tabla1 += `
        <tr>
        <td class='border'><img src="${respuesta[i].products.photography}" height="80"></td>
            <td class='border'>${respuesta[i].products.name}</td>
            <td class='border'>${respuesta[i].products.category}</td>
            <td class='border'>${respuesta[i].products.description}</td>
            <td class='border'>${respuesta[i].quantities}</td>
            <td class='border'>${respuesta[i].products.quantity}</td>
                       
          
           
        </tr>`;
    }
    tabla1 += `</body></table></div class="overflow-scroll>`;
    $("#resultado3").html(tabla1);
}


