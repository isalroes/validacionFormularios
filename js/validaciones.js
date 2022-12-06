/*const inputNacimiento = document.querySelector("#birth");

inputNacimiento.addEventListener("blur", (evento)=> {
    validarNacimiento(evento.target);    
});*/

export function valida(input){
    const tipoInput = input.dataset.tipo;
    if(validadores[tipoInput]){
        validadores[tipoInput](input);
    }
    
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid")
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeError(tipoInput, input);
    }
}

const tipoErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajesError = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacio",
        patternMismatch: "El nombre debe contener de 10 a 50 caracteres",
    },
    email: {
        valueMissing: "El campo correo no puede estar vacio",
        typeMismatch: "El correo no es válido",
    },
    password: {
        valueMissing: "El campo contraseña no puede estar vacio",
        patternMismatch: "Mínimo 6 caracteres, Máximo 12, debe contener una letra mayúscula, una letra minúscula, un número y no debe contener caracteres especiales ",
    },
    nacimiento: {
        valueMissing: "El campo fecha de naciminotno puede estar vacio",
        customError: "Deber tener al menos 18 años de edad",
    },
    numero: {
        valueMissing: "El campo número telefónico no puede estar vacio",
        patternMismatch: "El formato requerido es XXX XXX XXXX",
    },
    direccion: {
        valueMissing: "El campo dirección no puede estar vacio",
        patternMismatch: "La dirección debe contener de 10 a 40 caracteres",
    },
    ciudad: {
        valueMissing: "El campo ciudad no puede estar vacio",
        patternMismatch: "La ciudad debe contener de 4 a 30 caracteres",
    },
    estado: {
        valueMissing: "El campo estado no puede estar vacio",
        patternMismatch: "El estado debe contener de 4 a 30 caracteres",
    }
};

const validadores = {
    nacimiento : input => validarNacimiento(input),
};

function mostrarMensajeError(tipoInput, input){
    let mensaje = "";
    tipoErrores.forEach(error => {
        if (input.validity[error]) {
            mensaje = mensajesError [tipoInput][error];
        }        
    });
    return mensaje;
}

function validarNacimiento(input){
    const fechaCliente = new Date (input.value);
    let mensaje = "";
    if (!mayorEdad(fechaCliente)){
        mensaje = "Deber tener al menos 18 años de edad";
        }
    input.setCustomValidity(mensaje);
    }

function mayorEdad (fecha){
    const fechaActual = new Date() ;
    const diferenciaFechas = new Date(fecha.getUTCFullYear()+18,fecha.getUTCMonth(), fecha.getUTCDate()) ;
    console.log(fechaActual, "---", diferenciaFechas , diferenciaFechas <= fechaActual )
    return diferenciaFechas <= fechaActual;

}