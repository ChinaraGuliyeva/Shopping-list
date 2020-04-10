const button = document.querySelector('.add-button');
const parentContainer = document.querySelector('.parent-container');
const arrowUp = document.querySelector('.sort-arrow-up');
const arrowDown = document.querySelector('.sort-arrow-down');
let inputContainer=document.querySelector('.input-container');
let threeNods = document.querySelector('.drag');
let deleteIcon = document.querySelector('.delete');

const addItemHandler = (event) =>{
    let inputValue=document.querySelector('input');
    let newLine = inputContainer.cloneNode(true);
    //console.log(newLine);
    let parent = document.querySelector('.parent-container');
    parent.appendChild(newLine);
}

const removeItem = (event) => {
    let element=event.target;
    let parent = element.parentNode;
    if(element.classList.contains("delete") && parent.previousSibling){
        console.log(parent);
        console.log(parent.previousSibling);
        element.parentNode.remove();
    }
}

const sortUp = ()=> {
    arrowUp.style.display="none";
    arrowDown.style.display="block";
    const inputs = document.querySelectorAll('input');
    let inputsArray = Array.from(inputs);
    inputsArray.sort((a, b) => {return a.value-b.value})
    let editedArray = [];
    console.log(inputsArray);
    for (let i=0; i<inputsArray.length; i++) {
        let result = inputContainer.cloneNode(true);
        console.log(result.childNodes)
        //console.log(result.childNodes[3]);
        result.appendChild(inputsArray[i]);
        //console.log(result.childNodes[3]);
        editedArray.push(result);
    }
    //problem with editedArray. Maybe add svg
    //console.log(editedArray);
    parentContainer.innerHTML="";
    editedArray.forEach(element => {
        parentContainer.appendChild(element);
    });
}

const sortDown = ()=> {
    arrowDown.style.display="none";
    arrowUp.style.display="block";
    const inputs = document.querySelectorAll('input');
    let inputsArray = Array.from(inputs);
    inputsArray.sort((a, b) => {return b.value-a.value})
    let editedArray = [];
    console.log(inputsArray);
    for (let i=0; i<inputsArray.length; i++) {
        let result = inputContainer.cloneNode(true);
        console.log(result.childNodes)
        //console.log(result.childNodes[3]);
        //console.log(result);
        result.appendChild(inputsArray[i]);
        //console.log(result.childNodes[3]);
        editedArray.push(result);
    }
    parentContainer.innerHTML="";
    editedArray.forEach(element => {
        parentContainer.appendChild(element);
    });
}

let dragNdrop = () => {
    let draggables=document.querySelectorAll('.input-container');
    //console.log(draggables);
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        });
        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        })
    })

    parentContainer.addEventListener('dragover', e => {
        e.preventDefault();
        const afterElement = getDragAfterElement(parentContainer, e.clientY); 
        const draggable = document.querySelector('.dragging');
        if (afterElement==null) {
            parentContainer.appendChild(draggable);
        }
       else {
            parentContainer.insertBefore(draggable, afterElement)
       }
        })

    let getDragAfterElement = (parentContainer, y) => {
        const draggableElements = [...parentContainer.querySelectorAll('.input-container:not(.dragging)')];

        return draggableElements.reduce((closest, child)=> {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            //console.log(offset);
            if (offset < 0 && offset >closest.offset) {
                return { offset: offset, element: child}
            }
            else {
                return closest
            }
        },
        { offset: Number.NEGATIVE_INFINITY}).element;
    }
}


button.addEventListener('click', addItemHandler);
parentContainer.addEventListener('click', removeItem);
arrowUp.addEventListener('click', sortUp);
arrowDown.addEventListener('click', sortDown);
button.addEventListener('click', dragNdrop);
