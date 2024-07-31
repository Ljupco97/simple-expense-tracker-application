// TASK 1 //

const descriptionInput = document.querySelector('#description');
const amountInput = document.querySelector('#amount');
const dateInput = document.querySelector('#date');
const categoryInput = document.querySelector('#category');

const expenseButton = document.querySelector('#submitExpense');

const expensesList = document.querySelector('#expensesList');
valuesArray = [];

idToEdit=undefined;



class Value {
  constructor(description,amount,date,category,id){
    this.description = description;
    this.amount = amount;
    this.date = date;
    this.category = category;
    this.id = id;
  }

};

expenseButton.addEventListener('click', (event) => {
  if(this.idToEdit === undefined){
    const randomNumber =  Math.floor(Math.random() * 100000);
    const descriptionValue = descriptionInput.value;
    const amountValue = amountInput.value;
    const dateValue = dateInput.value;
    const categoryValue = categoryInput.value;
    const id = randomNumber;
  
    const values1 = new Value(descriptionValue,amountValue,dateValue,categoryValue,id);
    
  
    
    if(!descriptionValue || !amountValue || !dateValue ){
      alert('Please fill all required inputs');
      return;
   } 
    
    valuesArray.push(values1);
    renderArr();
    saveTasks()
    
    descriptionInput.value = '';
    amountInput.value = '';
    dateInput.value = '';
    }else{
    let elemToEdit = this.valuesArray.find(elem=> elem.id === this.idToEdit)
    if(elemToEdit){
      const descriptionValue = descriptionInput.value;
      const amountValue = amountInput.value;
      const dateValue = dateInput.value;
      const categoryValue = categoryInput.value;
      if(!descriptionValue || !amountValue || !dateValue ){
        alert('Please fill all required inputs');
        return;
     } 
      elemToEdit.description = descriptionValue;
      elemToEdit.amount = amountValue;
      elemToEdit.date = dateValue;
      elemToEdit.category = categoryValue;
      renderArr();
      saveTasks()
    }

    descriptionInput.value = '';
    amountInput.value = '';
    dateInput.value = '';
    this.idToEdit = undefined;
  }


 
});



// TASK 2 RENDER AND DELETE //

function removeObjectWithId(id) {
  valuesArray = valuesArray.filter((obj) => obj.id+'' !== id+'');
  
  expensesList.innerHTML = "";
  renderArr(valuesArray)

}


const renderArr = () =>{
  let rows = '';
  for(let elem of valuesArray){
    let row = `
          <tr id="tr-${elem.id}">
                <td scope="col">${elem.id}</td>
                <td scope="col">${elem.description}</td>
                <td scope="col">${elem.amount}</td>
                <td scope="col">${elem.date}</td>
                <td scope="col">${elem.category}</td>
                <td> <button class="btn btn-primary"  onclick="myfunc(${elem.id})"  id="edit-${elem.id}" >Edit</button> </td>
                <td> <button  class="btn btn-danger" data="${elem.id}" id="delete-${elem.id}">Delete</button> </td>
          </tr>
    `
    rows+=row;

  }
  
  expensesList.innerHTML = rows;

  for(let elem of valuesArray){

    document.getElementById(`edit-${elem.id}`).addEventListener('click', (event) => {
      
    });
  
    document.getElementById(`delete-${elem.id}`).addEventListener('click', (event) => {
      event.preventDefault()
      let id = event.target.id.split('-')[1];
      removeObjectWithId(id)
      window.confirm('Are you sure you want to delete this expense');
    });
  }
 
};


loadTasks();

// TASK 3 EDIT //

function myfunc(id) {
  const objId = valuesArray.find(obj => obj.id === id);

  descriptionInput.value = `${objId.description}`;
  amountInput.value = `${objId.amount}`;
  dateInput.value = `${objId.date}`;
  categoryInput.value = `${objId.category}`;
  this.idToEdit = id;

};



// TASK 4 SORT THE EXPENSES //


function sortExpensesUp(){
 
  valuesArray.sort((a, b) => a.amount - b.amount );
  console.log(valuesArray)
  
   renderArr()
};


function sortExpensesDown(){
 
  valuesArray.sort((a, b) => b.amount - a.amount );
  console.log(valuesArray)
 
   renderArr()
};




// TASK 5  //


function saveTasks(){

  localStorage.setItem('tasks', JSON.stringify(valuesArray));

}
 


function loadTasks(){

  valuesArray = JSON.parse(localStorage.getItem('tasks')) || [];

  valuesArray.forEach(renderArr);
}

