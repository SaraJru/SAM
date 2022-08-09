$(document).on("ready" , ()=>{
    $formularioEstudiantes = $("#FormularioEstudiantes")
    $tablaEs = $("#tablaEs")
    $btnAgregar = $("#btnAgregar")
    $btnListar = $("#btnListar")
    $btnGuardar = $("#btnGuardar")
    $formularioEstudiantes.hide()
    let tabla_promedios = document.getElementById("tablaPromedio")
    $btnPromedio = $("#btnPromedio")
    $alertaAprobados = $("#alertaAprobados") 
    $alertaReprobados = $("#alertaReprobados")
    $btnPromediar = $("#btnPromediar")
    

    $alertaAprobados.hide()
    $alertaReprobados.hide()
    tabla_promedios.style.visibility = "hidden"
    $("#divPromedio").hide()

    $btnAgregar.on("click",(e)=>{
        $formularioEstudiantes.show()
        $tablaEs.hide()
        $("#Agregar").hide()
        $("#divPromediar").hide()
        $alertaAprobados.hide()
        $alertaReprobados.hide()
        tabla_promedios.style.visibility = "hidden"
        $("#divPromedio").hide()
        e.preventDefault()

    })

    $btnListar.on("click",(e)=>{
        $formularioEstudiantes.hide()
        $tablaEs.show()
        $("#Agregar").show()
        $("#divPromediar").show()
        e.preventDefault()
    })

    $btnPromediar.on("click",(e)=>{
        $tablaEs.hide()
        $("#Agregar").show()
        $("#divPromediar").hide()
        tabla_promedios.style.visibility = "visible"
        $("#divPromedio").show()

        e.preventDefault()
        
    })

    $btnGuardar.on("click",(e)=>{
        var id = document.getElementById("id").value;
        var name = document.getElementById("name").value;
        var apellido = document.getElementById("apellido").value;
        var email = document.getElementById("email").value;
        var Facultad = document.getElementById("Facultad").value;
        // var cal_1 = document.getElementById("cal1").value;
        // var cal_2 = document.getElementById("cal2").value;

        var fila= `<tr> 
            <td>${id}</td> 
            <td>${name}</td>
            <td>${apellido}</td>
            <td>${email}</td>
            <td>${Facultad}</td>
            </tr>`
            

        $tablaEs.append(fila)
        $formularioEstudiantes.hide()
        $tablaEs.show()
        $("#Agregar").show()
        
        document.getElementById("id").value = "";
        document.getElementById("name").value = "";
        document.getElementById("apellido").value = "";
        document.getElementById("email").value = "";
        document.getElementById("Facultad").value = "";
        // document.getElementById("cal1").value = "";
        // document.getElementById("cal2").value = "";
        
        e.preventDefault()
    })

    var cadena_datos = obtenerDatos();

    var segmentos = cadena_datos.split("|");


    function obtenerPromedios()
    {
        var cont = 0;

        for(x=0;x<segmentos.length -1;x++)
        {
            if(segmentos[x] != "")
            {
                cont = cont +1;
                var promedio = calcularPromedio(segmentos[x]);
                mostrarPromedio(promedio, cont);
            }                
        }

    }

    function mostrarPromedio(promedio, posicion)
    {
        tabla_promedios.rows[posicion].cells[4].innerHTML = promedio;            
    }


    function calcularPromedio(datos)
        {
            var arreglo_datos = datos.split(",");
            let cal_1 = arreglo_datos[2];
            let cal_2 = arreglo_datos[3];

            promedio = (parseInt(cal_1) + parseInt(cal_2)) / 2;
            
            return promedio;
        }


        function promediosAprobatorios(){
            var filas = tabla_promedios.rows.length;
            var mensaje = "";
            var contador = 0; 

            for(x=0;x<filas;x++){
                if(parseInt(tabla_promedios.rows[x].cells[4].innerText) >= 61){
                    contador++;
                    
                }

            }
            mensaje =  `<p>La cantidad de estudiantes aprobados es de: ${contador} estudiantes</p>`
            $alertaAprobados.append(mensaje);
            $alertaAprobados.show();
            
        }

        function promediosReprobatorios(){
            var filas = tabla_promedios.rows.length;
            var mensajeReprobado = "";
            var contadorReprobados = 0;

            for(x=0;x<filas;x++){
                if(parseInt(tabla_promedios.rows[x].cells[4].innerText) < 61)
                {
                    contadorReprobados++;
                    
                }
            }


            mensajeReprobado =  `<p>La cantidad de estudiantes reprobados es de: ${contadorReprobados} estudiantes</p>`
            $alertaReprobados.append(mensajeReprobado);
            $alertaReprobados.show();
        }

        function obtenerDatos()
        {
            var cadenaDatos = "";
            var filas = tabla_promedios.rows.length;
            var columnas = tabla_promedios.rows[0].cells.length;

            for(x=1; x<filas; x++)
            {
                for(y=0; y<columnas-1; y++)
                {                    
                    cadenaDatos = cadenaDatos + tabla_promedios.rows[x].cells[y].innerHTML;
                    cadenaDatos = cadenaDatos + ",";
                }
                cadenaDatos = cadenaDatos + "|";
            }

            return cadenaDatos;
        }

        $btnPromedio.on("click", (e)=>{
            obtenerPromedios()
            promediosAprobatorios()
            promediosReprobatorios()
            e.preventDefault()
        })


})