document.addEventListener("DOMContentLoaded", function() {

    let colsArray = ['Categoría', 'Producto', 'Marca', 'Peso', 'Precio']
    let inputType = ['text', 'text', 'text', 'text', 'number', '']
    let rowsArray = [];
    let inputVals = {};
    
    let body = document.body;
    body.style.backgroundColor= 'black'
    body.style.color= 'white'

    let container = document.getElementById('container');
    container.style.display= 'flex'
    container.style.justifyContent= 'space-between'
    container.style.width= '100%'
    
    let table = document.getElementById('table');
    table.style.width = '75%'
    table.style.padding = '8px'
    
    let cols = document.createElement('div');
    cols.style.display = 'flex'
    cols.style.textAlign = 'center'
    cols.style.fontWeight = 'bolder'
    
    let rows = document.createElement('div');
    rows.style.display = 'block'
    rows.style.textAlign = 'center'
    rows.id = 'rows'

    table.appendChild(cols)
    table.appendChild(rows)

    let right = document.getElementById('right');
    right.style.width = '20%'
    right.style.border = '1px solid orange'
    right.style.padding = '8px'
    
    let button = document.createElement('button');
    button.innerText = 'Nuevo registro'
    button.style.color = 'gray'
    button.style.padding = '8px'
    button.style.borderRadius = '16px'
    button.style.backgroundColor = 'black'
    button.style.width = '100%'
    button.style.border = '1px solid gray'
    button.style.cursor = 'pointer'
    button.addEventListener('click', () => {
        let row = newRow(); console.log(row, typeof row, Array.isArray(row))
        let register = document.createElement('div')
        register.style.display = 'flex'
        row.map((r,i) => register.appendChild(r))
        rows.appendChild(register)
    })
    
    // let buttonCol = document.createElement('button');
    // buttonCol.innerText = 'Nueva columna'
    // buttonCol.style.color = 'gray'
    // buttonCol.style.padding = '8px'
    // buttonCol.style.borderRadius = '16px'
    // buttonCol.style.backgroundColor = 'black'
    // buttonCol.style.width = '100%'
    // buttonCol.style.border = '1px solid gray'
    // buttonCol.style.cursor = 'pointer'
    // buttonCol.addEventListener('click', () => {
    //     let nuevoCampo = document.createElement('span');
	// 	nuevoCampo.style.border = '1px solid gray'
	// 	nuevoCampo.style.padding = '8px 0px'
	// 	nuevoCampo.style.width = '20%'
	// 	nuevoCampo.className = 'campo';
	// 	nuevoCampo.innerText = 'random';
    //     removeChildrenByID('rows');
    //     // colsArray.push('rand')
    //     // let input = document.createElement('input'); // crear <input/> 
    //     // rowsArray.map((r,i) => {
    //     //     r.push(input)
    //     // })
    //     // rows.appendChild(rowsArray)
	// 	cols.appendChild(nuevoCampo); 
    //     console.log({rows, rowsArray, inputVals})
    // })

    let length = document.createElement('div') 
    
    // right.appendChild(buttonCol)
    right.appendChild(button)
    
    colsArray.map((elem, i) => {
    //   // Crear un nuevo elemento div
        let nuevoCampo = document.createElement('span');
		nuevoCampo.style.border = '1px solid gray'
		nuevoCampo.style.padding = '8px 0px'
		nuevoCampo.style.width = '20%'
        
		//   // Establecer la clase para el nuevo elemento div
		nuevoCampo.className = 'campo';
		
		//   // Establecer el texto interno del nuevo elemento div
		nuevoCampo.innerText = elem;
		
		//   // Agregar el nuevo elemento al contenedor
		cols.appendChild(nuevoCampo); 
    }); 

    let newRow = () => { 
        let row = colsArray.map((a,i) => {
            let cell = createCell(i, rowsArray.length)
            let ok = createOkButton(i, rowsArray.length)
            let input = createInputEnter (i, rowsArray.length, a, ok, cell, inputType, inputVals)
            ok.addEventListener('click', ()=> click(i, rowsArray.length, input, ok, cell, inputVals))
            cell.appendChild(input)
            cell.appendChild(ok)
            input.addEventListener('input', e => {
                // let one = document.getElementById(input.id)
                inputVals[input.id] = e.target.value
            })
            return cell
        }); //console.log({rowsArray}, 'bef')
        rowsArray.push(row); //console.log({rowsArray}, 'aft')
        length.innerText = 'Registros actuales: ' + (rowsArray.length -1)
        right.appendChild(length)
        return row
        // console.log(row)
    }
    console.log(newRow())
});

const updButton = (i, length, cell, value, input, ok) => {
    let button = document.createElement('button');
    button.innerText = '✒️'
    button.id = 'button' + i + length // id='button00'
    button.style.padding = '0px'
    button.style.textAlign = 'center'
    button.style.width = '20%'
    button.title = 'Editar'
    button.addEventListener('click', () => {
        cell.removeChild(value)
        cell.removeChild(button)
        cell.appendChild(input)
        cell.appendChild(ok)
    })
    return button
}

const createCell = (i, length) => {
    let cell = document.createElement('div'); // crear celula <div
    cell.style.display = 'flex'
    cell.style.width = '20%'
    cell.id = 'cell' + i + length // + rowsArray.length // id= 'cell00'>
    return cell
}

const createInputEnter = (i, length, a, ok, cell, inputType, inputVals) => {
    let input = document.createElement('input'); // crear <input/> 
    input.style.width = '80%'
    input.value = inputVals[input.id] || ''
    input.type=inputType[i] || 'text'
    input.style.backgroundColor = 'gray'
    input.title = 'Inserte ' + a + ' y pulse Enter'
    input.id = 'input' + i + length
    input.addEventListener('keyup', e => e.keyCode === 13 && click(i, length, input, ok, cell, inputVals))
    return input
}

const createValue = (input, inputVals) => {
    let value = document.createElement('div'); // crea un <div>{value}</div>
    value.innerText = inputVals[input.id] || '' // value será en valor guardado en los valores de inputs
    value.title = inputVals[input.id] || '' // value será en valor guardado en los valores de inputs
    value.style.width = '80%'
    value.style.border = '1px dotted gray'
    return value
}

const createOkButton = (i, length) => {
    let ok = document.createElement('button'); // crear <button
    ok.id = 'button' + i + length // id='button00'
    ok.innerText = '✓'
    ok.style.padding = '0px'
    ok.style.textAlign = 'center'
    ok.style.width = '20%'
    ok.title = 'Confirmar [Enter]'
    return ok
}

const click = (i, length, input, ok, cell, inputVals) => { // agregar evento que:
    let value = createValue(input, inputVals)
    let one = document.getElementById(input.id) // one es el input actual
    cell.removeChild(one) // remueve el input
    cell.removeChild(ok) // remueve el input
    cell.appendChild(value) // y agrega el valor
    let upd = updButton(i, length, cell, value, input, ok)
    cell.appendChild(upd)
}

const removeChildrenByID = (fatherID) => {
    const father = document.getElementById(fatherID);
    
    // Mientras haya hijos, eliminarlos uno por uno
    while (father.firstChild) {
        father.removeChild(father.firstChild);
    }
}