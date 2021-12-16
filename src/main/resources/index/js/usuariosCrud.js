function traerInformacionUser(){
    $.ajax({
        url: "http://140.238.133.71:8080/api/user/all",
        
        
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
        <tr><th>ID</th><th >identification</th><th>name</th><th>address</th><th>cellPhone</th><th>email</th><th>password</th><th>zone</th><th>type</th><th></th><th></th></tr>
        <body >
    `;

    for(let i = 0; i<respuesta.length; i++){
        tabla += `
        <tr>
            <td class='border'>${respuesta[i].id}</td class='border-danger'>
            <td class='border'>${respuesta[i].identification}</td>
            <td class='border'>${respuesta[i].name}</td>
            <td class='border'>${respuesta[i].address}</td>
            <td class='border'>${respuesta[i].cellPhone}</td>
            <td class='border'>${respuesta[i].email}</td>
            <td class='border'>${respuesta[i].password}</td>
            <td class='border'>${respuesta[i].zone}</td>
            <td class='border'>${respuesta[i].type}</td>
            
            <td> <button onclick='borrarUser(${respuesta[i].id})' class='btn btn-danger'> Borrar</button></td>
            <td> <button type='button' class='btn btn-primary' data-bs-toggle='modal' data-bs-target='#exampleModal'>Actualizar</button></td>
        </tr>`;
    }
    tabla += `</body></table></div class="overflow-scroll>`;
    $("#resultado2").html(tabla);
}


const identification = $("#identification").val();
const name = $("#name").val();
const address = $("#address").val();  
const cellPhone = $("#cellPhone").val();
const email = $("#email").val();  
const password = $("#password").val();
const zone = $("#zone").val();  
const type = $("#type").val();

function borrarUser(id){
    let myData={
        id:id

    };
    
    let dataToSend=JSON.stringify(myData);
    console.log(myData);
    $.ajax({
        
        url: "http://140.238.133.71:8080/api/user/" + id,
 
        type:"DELETE",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);    
            alert("SE BORRO LA INFORMCION");
            traerInformacionUser();
                         
        }
    }); 
}
const limpiarCampos = ()=>{
    $("#identification").val("");
    $("#name").val("");
    $("#address").val("");
    $("#cellPhone").val("");
    $("#email").val(""); 
    $("#password").val("");
    $("#zone").val("");  
    $("#type").val("");
    /* setTimeout(()=>{
         window.location.href ='paginaInicio.html';
         }, 1000);  */
     }


function editarUser(id) {
    let myData = {
        id:$("#id").val(),  
        identification:$("#identification").val(),
        name:$("#name").val(),
        address:$("#address").val(),  
        cellPhone:$("#cellPhone").val(),
        email:$("#email").val(),  
        password:$("#password").val(),
        zone:$("#zone").val(),  
        type:$("#type").val(),

    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "http://140.238.133.71:8080/api/user/update",

        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta)
            $("#resultado2").empty(); 
            alert("SE EDITO LA INFORMACION");
            limpiarCampos();
            traerInformacionUser();

        }
    });
}
