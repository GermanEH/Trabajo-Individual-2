export default function validations (input, namesExistentes) {

    let errors = {}         //lo ideal es que pase vacío: porque cuando tenga una prop, es que hubo un error
    if(!input.name.trim()) {
        errors.name = "el nombre es requerido"  //lleno el obj con props cuyo nombre es el mismo del input
    // } else if (input.name.match(/\d/g)) {
    //     errors.name = "El nombre no puede contener números"
    } else if (/[0-9]/.test(input.name)) {
        errors.name = "no debe contener números"
    } else if (namesExistentes.includes(input.name)) {
        errors.name = "nombre existente"
    }
    if(input.minHeight < 1 || input.minHeight > 1000 || /[a-b]/i.test(input.minHeight)){
        errors.minHeight = "(debe ser un número entre 1 y 1000)"
    }
    if(input.maxHeight < 1 || input.maxHeight > 1000 || /[a-b]/i.test(input.maxHeight)){
        errors.maxHeight = "(debe ser un número entre 1 y 1000)"
    }
    if (input.minHeight > input.maxHeight) {
        errors.minHeight = "debe ser igual o inferior a max height"
        errors.maxHeight = "debe ser igual o superior a min height"
    }
    if(input.minWeight < 1 || input.minWeight > 1000 || /[a-b]/i.test(input.minWeight)){
        errors.minWeight = "(debe ser un número entre 1 y 1000)"
    }
    if(input.maxWeight < 1 || input.maxWeight > 1000 || /[a-b]/i.test(input.maxWeight)){
        errors.maxWeight = "(debe ser un número entre 1 y 1000)"
    }
    if (input.minWeight > input.maxWeight) {
        errors.minWeight = "debe ser igual o inferior a max weigth"
        errors.maxWeight = "debe ser igual o superior a min weigth"
    }
    if(input.minLifeSpan < 1 || input.minLifeSpan > 50) {
        errors.minLifeSpan = "(debe ser superior a 1 y menor a 50)"
    }
    if(input.maxLifeSpan < 1 || input.maxLifeSpan > 50) {
        errors.maxLifeSpan = "(debe ser superior a 1 y menor a 50)"
    } 
    if (input.minLifeSpan > input.maxLifeSpan) {
        errors.minLifeSpan = "debe ser igual o inferior a max life span"
        errors.maxLifeSpan = "debe ser igual o superior a min life span"
    }
    if(input.temperaments.length === 0){
        errors.temperaments = "Se requiere al menos un temperamento"
    }
return errors
}