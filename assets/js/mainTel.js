const mobile = {
	setup:function(){
		$('.dropdown-menu a').on('click', function() {
			$('span.value').text($(this).attr('value'));
			$('span.pais').empty();
			if( $(this).attr('value') == "+51")
				$('span.pais').append($('<img src="../img/peru.png" width="25px">'));
			else if( $(this).attr('value') == "+56")
				$('span.pais').append($('<img src="../img/chile.png" width="25px">'));
			else if( $(this).attr('value') == "+52")
				$('span.pais').append($('<img src="../img/mexico.png" width="25px">'));
		});
	}
}

// var registrarse=document.getElementById("registrarse");
// 	registrarse.addEventListener("click", validacion );
// 	 function validacion() {
// 	  nombre = document.getElementById("nombre").value;
// 	  email = document.getElementById("email").value;
// 		 //nombre
// 		if( nombre == null || nombre.length == 0 || /^\s+$/.test(nombre) ) {
// 		   alert('[Registre bien su nombre]');
// 		   return false;
// 			}
// 		 //direcion de email
// 		if((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(email)) ) {
// 		   alert('[Registre bien su email]');
// 		  return false;
// 		}

// }
function deshabilita()
 {

     if(document.getElementById('condicion').checked  )
     {
        document.getElementById('registrarse').disabled=false;
     }
     else
    {
       document.getElementById('registrarse').disabled=true;
    }
 }


