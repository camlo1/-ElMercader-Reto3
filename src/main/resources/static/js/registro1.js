// creamos variables  globales para  la   funcion   crear 


const crear = () =>{
    const id = $("#id").val();
    const identification = $("#identification").val();
    const name = $("#name").val();
    const address = $("#address").val();  
    const cellPhone = $("#cellPhone").val();
    const email = $("#email").val();  
    const password = $("#password").val();
    const confirmarpassword = $("#confirmarpassword").val();
    const zone = $("#zone").val();  
    const type = $("#type").val();
    re=/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    
    if(identification.length === 0 || name.length === 0 || address.length === 0  ||
        cellPhone.length === 0 || email.length === 0 || password.length === 0 || zone.length === 0 || type.length === 0 ){
        //nos  envia  esta  alerta  de  no puede haber  campos   vacios  
        alert("no pueden haber campos vacios");
        limpiarCampos();
        return; 
        //validamos si   es un email valido   o   no        
    }else if(!re.exec(email)){
            alert('email no valido');
            limpiarCampos();
            return;           
    }else if(password !== confirmarpassword){
    alert('password not  permited');
    limpiarCampos();
    return;
    // si  pasword no tiene  masde  6 letras eniamos la  alerta   de pásswoerd debe  tener  mas  de 6  letras 
    }else if( password.length <6){
    alert('password debe  tener  mas  de  6 letras');
    return;
    } else if(validarEmail())
        return ; 
}  

function crearUsuario (){
    let myData ={
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
   
                $.ajax({
                    url:"http://140.238.133.71:8080/api/user/new",
                    type: "POST",
                    dataType: 'JSON',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: JSON.stringify(myData),
                    statusCode: {
                        201: function () {  
                            alert('Usuario Creado');
                            limpiarCampos();
                        }
                    },
                });
                     
                setTimeout(()=>{
                window.location.href ='index.html';
                }, 1000);        
       
         
}
 


const limpiarCampos = ()=>{
    $("#identification").val("");
    $("#name").val("");
    $("#address").val("");
    $("#cellPhone").val("");
 /*    setTimeout(()=>{
         
         }, 1000);  */
     }

     const validarEmail = () => {
        const email=$("#email").val();
        console.log(email);
        //Generar una peticion tipo ajax para validar si  existe  email
        
        $.ajax ({
            
            type: 'GET',   
            url:"http://140.238.133.71:8080/api/user/emailexist/"+email,     
            dataType: 'json',
            success: function (respuesta){
                console.log(respuesta);
                if(respuesta===true){
                    alert('ya existe usuario con  ese Email');
                    limpiarCampos();
                   return;
                }else{
                    return crearUsuario();
                }
            },
            error: function (xhr, status) {
            
                
                            
                console.log(xhr);
                            
                console.log(status);
                 
            }
        });
    }

  

