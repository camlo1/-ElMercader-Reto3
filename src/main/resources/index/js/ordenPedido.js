let perfilGlobal;
let registerDay =new Date().toUTCString();
let idOrden=$("#id").val();
const cargarsesionStore =()=>{
    const user = JSON.parse(sessionStorage.getItem("user"));
    perfilGlobal =user;
    console.log(user);

    const perfil = user.type ==='ASE' ? 'Asesor Comercial' : user.type === 'COORD' ? 'Coordinador de zona' : 'Administrador';

    const tabla= ` <table class="table text-center">
    <tr><th>identification</th><th>name</th><th>email</th><th>zone</th><th>Perfil</th></tr>
    <body>
        <tr class="text-center">
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
    datosOrden();
    traerOrdenes();
    console.log(Date ()); 
})


const datosOrden = ()=>{
    let orden = {
   
    fecha: new Date(),
    status:'Pendiente',
    };
    perfilOrden = orden;
    const ordenPedido= ` <table class="table text-center">
    <tr><th>Id Orden</th><th>Fecha de Registro</th><th>Status</th></tr>
    <body>
        <tr>
        <td><input type="number"  id="id">
        <td>${orden.fecha.getFullYear()+"-"+ orden.fecha.getMonth()+"-"+ orden.fecha.getDay()}</td>
        <td>${orden.status}</td>
            
        </tr>
    </body>
    
    </table>`;



    $("#tablaOrden").html(ordenPedido);
}

function traerOrdenes(){
    $.ajax({
        url: "http://129.151.114.170:8080/api/order/all",
        
        
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
             
        }

    });
}


function traerGadgets(){
    $.ajax({
        url: "http://129.151.114.170:8080/api/gadget/all",
        
        
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaGadgets(respuesta);    
        }

    });
}

const pedido =  [];
let respuesta = [];
const cantidades = []
console.log(cantidades)

const pintarRespuestaGadgets = (gadgets)=>{
    respuesta=gadgets;
    let tabla = `<div class='overflow-scroll '>
        <table class="border text-center" >
        <tr><th>ID</th><th>Brand</th><th>Category</th><th>Name</th><th>Description</th><th>Price</th><th>Availability</th><th>Quantity</th><th>Photography</th></tr>
        <body>
    `;

    for(let i = 0; i<respuesta.length; i++){
        tabla += `
        <tr>
            <td class='border'>${respuesta[i].id}</td>
            <td class='border'>${respuesta[i].brand}</td>
            <td class='border'>${respuesta[i].category}</td>
            <td class='border'>${respuesta[i].name}</td>
            <td class='border'>${respuesta[i].description}</td>
            <td class='border'>${respuesta[i].price}</td>
            <td class='border'>${respuesta[i].availability}</td>
            <td class='border'>${respuesta[i].quantity}</td>
            <td class='border'><img src="${respuesta[i].photography}" height="80"></td>
            <td class='border'> <button onclick='agregarGadget(${i})' class='btn btn-primary'> Agregar</button>
        </tr>`;
    }
    tabla += `</body></table></div>`;
    $("#tabla2").html(tabla);
    $("#crearGadgetModal").modal('show');
}

const agregarCant = ()=>{
    let cantidad1 = $("#cantidad").val(); 
    if (cantidad1.length === 0 ){
        console.log();
        alert ('debe ingresar cantidad');
        return;
    }
    cantidades.push(cantidad1)
    $("#cantidad").val("");
    $("#crearGadgetModal2").modal('hide'); 
}

const agregarGadget = (indexRespuesta)=>{
    pedido.push(respuesta[indexRespuesta]);
   
    
    $("#crearGadgetModal2").modal('show');     
   console.log(cantidades);
    console.log(pedido);
    mostrarPedido();
}

const mostrarPedido = (gadgetP) =>{
    
    let tabla2 = `<div class='overflow-scroll'  >
    <table class="table text-center " >
    <tr><th>ID</th><th>Brand</th><th>Category</th><th>Name</th><th>Description</th><th>Price</th><th>Availability</th><th>Quantity</th><th>Photography</th></tr>
    <body>
`;

for(let i = 0; i<pedido.length; i++){
    tabla2 += `
    <tr class="border">
        <td class="border">${pedido[i].id}</td>
        <td class="border">${pedido[i].brand}</td>
        <td class="border">${pedido[i].category}</td>
        <td class="border">${pedido[i].name}</td>
        <td class="border">${pedido[i].description}</td>
        <td class="border">${pedido[i].price}</td>
        <td class="border">${pedido[i].availability}</td>
        <td class="border">${pedido[i].quantity}</td>
        <td class="border"><img src="${pedido[i].photography}" height="80"></td>
        
        
    </tr>`;
}
tabla2 += `</body></table></div class="overflow-scroll>`;
$("#resultado2").html(tabla2);

}


function borrarGadget()
{
    pedido.splice(id);
}

const enviarOrden = ()=>{
   

    let orden ={
        id:$("#id").val(),
        registerDay:registerDay,
        status:'Pendiente',
        salesMan: perfilGlobal,
        products: {},
        quantities:{},
    };
    for(let i = 0; i<pedido.length; i++){

        orden.products[i+1] = pedido[i];
    }
    for(let i = 0; i<cantidades.length; i++){
        orden.quantities[i+1] = cantidades[i];
    }
    
    console.log(orden);

    $.ajax({
        url:"http://129.151.114.170:8080/api/order/new",
        type: "POST",
        dataType: 'JSON',
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(orden),
       
        statusCode: {
            
            201: function () {  
                console.log(orden);
                alert('Orden Enviada');
               
            }
        },
        error: function(xhr,status){
            alert("error   al   validar ");
            $("#loading").html("");
           console.log(xhr);
           console.log(status);
           return;
           

        },
    });
         
    /* setTimeout(()=>{
    window.location.href ='index.html';
    }, 1000);         */


}

const validarOrden =()=>{

        let id=$("#id").val();
    console.log(id);
    $.ajax({
        url: "http://129.151.114.170:8080/api/order/"+id,
        
        
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            
            if(respuesta.id == id){
                alert('ya existe ese  N° de orden')
                return;
            }
            enviarOrden();
             
        }

    });
}




