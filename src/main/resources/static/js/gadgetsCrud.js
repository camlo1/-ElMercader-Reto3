function traerGadgets(){
    $.ajax({
        url: "http://140.238.133.71:8080/api/gadget/all",
        
        
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaGadgets(respuesta);    
        }

    });
}


const pintarRespuestaGadgets = (respuesta)=>{
    let tabla = `<div class=' overflow-scroll '>
        <table class="border text-center" >
        <tr><th >ID</th><th>Brand</th><th>Category</th><th>Name</th><th>Description</th><th>Price</th><th>Availability</th><th>Quantity</th><th>Photography</th><th>pedidos</th></tr>
        <body>
    `;

    for(let i = 0; i<respuesta.length; i++){
        tabla += `
        <tr  >
            <td class='border'>${respuesta[i].id}</td>
            <td class='border'>${respuesta[i].brand}</td>
            <td class='border'>${respuesta[i].category}</td>
            <td class='border'>${respuesta[i].name}</td>
            <td class='border'>${respuesta[i].description}</td>
            <td class='border'>${respuesta[i].price}</td>
            <td class='border'>${respuesta[i].availability}</td>
            <td class='border'>${respuesta[i].quantity}</td>
            <td class='border'><img src="${respuesta[i].photography}" height="80"></td>
            <td class='border'><input type="number"></td>
            <td class='border'> <button onclick='borrarGadget(${respuesta[i].id})' class='btn btn-danger'> Borrar</button>
        </tr>`;
    }
    tabla += `</body></table></div>`;
    $("#resultado2").html(tabla);
}

/* function pintarRespuestaGadgets(respuesta){
    let myTable = "<table class='table id=myTable'>" + "<thead><tr><th>ID</th><th>Brand</th><th>Category</th><th>Name</th><th>Description</th><th>Price</th><th>Availability</th><th>Quantity</th><th>Photography</th></tr></thead>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].id+"</td>";
        myTable+="<td>"+respuesta[i].brand+"</td>";
        myTable+="<td>"+respuesta[i].category+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].price+"</td>";
        myTable+="<td>"+respuesta[i].availability+"</td>";
        myTable+="<td>"+respuesta[i].quantity+"</td>";
        //myTable+="<td><img src="${detalle[i].photography}" height="50"></td>";
        myTable+="<td> <button onclick='borrarGadget("+respuesta[i].id+")' class='btn btn-danger'> Borrar</button>";
        myTable+="<td> <button type='button' class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#crearGadgetModal'>Actualizar</button>"
        

        myTable+="</tr>";
        
       
    }
    myTable+="</table>";        
    $("#resultado2").html(myTable);

} */


function borrarGadget(id){
    let myData={
        id:id

    };
    
    let dataToSend=JSON.stringify(myData);
    console.log(myData);
    $.ajax({
        
        url: "http://140.238.133.71:8080/api/gadget/"+id,
 
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);    
            alert("SE BORRO LA INFORMCION");
            traerGadgets();
                         
        }
    }); 
}
const limpiarCampos = ()=>{
    $("#id").val("");
    $("#brand").val("");
    $("#category").val("");
    $("#name").val("");
    $("#description").val(""); 
    $("#price").val("");
    $("#availability").val("");  
    $("#quantity").val("");
    $("#photography").val("");
    /* setTimeout(()=>{
         window.location.href ='paginaInicio.html';
         }, 1000);  */
     }


function editarGadget(id) {
    let myData = {
        id:$("#id").val(),  
        brand:$("#brand").val(),
        category:$("#category").val(),
        name:$("#name").val(),  
        description:$("#description").val(),
        price:$("#price").val(),  
        availability:$("#availability").val(),
        quantity:$("#quantity").val(),  
        photography:$("#photography").val(),

    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://140.238.133.71:8080/api/gadget/update",

        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta)
            $("#resultado2").empty(); 
            alert("SE EDITO LA INFORMACION");
            limpiarCampos();
            traerGadgets();

        }
    });
}
function crearGadget (){
    let myData = {
        id:$("#id").val(),  
        brand:$("#brand").val(),
        category:$("#category").val(),
        name:$("#name").val(),  
        description:$("#description").val(),
        price:$("#price").val(),  
        availability:$("#availability").val(),
        quantity:$("#quantity").val(),  
        photography:$("#photography").val(),

    };
   
                $.ajax({
                    url:"http://140.238.133.71:8080/api/gadget/new",
                    type: "POST",
                    dataType: 'JSON',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: JSON.stringify(myData),
                    statusCode: {
                        201: function () {  
                            alert('Gadget Creado');
                            limpiarCampos();
                        }
                    },
                });
                     
                /* setTimeout(()=>{
                window.location.href ='index.html';
                }, 1000);         */
       
         
}