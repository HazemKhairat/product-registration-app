let product = document.getElementById("Product")
let formGroup = document.querySelectorAll(".form-group input")
let count = document.getElementById("Count")
let department = document.getElementById("Department")
let button1 = document.querySelector(".bt1")
let button2 = document.getElementById("bt2");
let counter = document.getElementById("countElements");
let tbody = document.getElementById("tbody")
let inputs = document.querySelectorAll("input")
let Mood = document.querySelector(".mood button");
let body = document.querySelector("body");
let icon = document.querySelector(".mood i");
let h5 = document.querySelectorAll("h5");
let h1 = document.querySelectorAll("h1");
let tr1 = document.querySelector(".tr")
let ldmood = document.getElementById("LDmood");
let modal = document.querySelector(".modal-body")
let AllData;
let mood = "Creat";
let GlobalID;
let validation = false; 


// Check validation
let CheckValidation = () => {
    let counter = 1;
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value == "") {
             counter++;
        } 
    }
    if(counter == inputs.length){
        validation = false;
    }else{
        validation = true;
    }
}



// Method Return Total Price
let getTotalPrice = () => {
    let price = formGroup[0].value;
    let tax = formGroup[1].value;
    let delivary = formGroup[2].value;
    let discount = formGroup[3].value;
    let taxCost = +price * +tax / 100;
    let priceAfterTax = +taxCost + +price;
    let priceAfterTaxandDellivary = +priceAfterTax + +delivary;
    let netPrice = +priceAfterTaxandDellivary - +discount;
    formGroup[4].value = Math.ceil(netPrice);

}
// Cost Inputs Event
for (let i = 0; i < formGroup.length; i++) {
    formGroup[i].addEventListener("keyup", getTotalPrice)
}

// Object creation

if (localStorage.Products == null) {
    AllData = []
} else {
    AllData = JSON.parse(localStorage.Products)
}

// is it greater than 0
let GreaterThan0 = () =>{
    for(let i = 0; i < inputs.length; i++){
        if(inputs[i].value < 0){
            alert("positive values only");
            return;
        }
    }
    ObjectCreation();
}


let ObjectCreation = () => {
    CheckValidation();
    let newProduct = {
        productName: product.value,
        price: formGroup[0].value,
        tax: formGroup[1].value,
        delivary: formGroup[2].value,
        discount: formGroup[3].value,
        Total: formGroup[4].value,
        count: count.value,
        department: department.value,
    }
    if (validation == true) {
        if (mood == "Creat") {
            // creation
            if (newProduct.count >= 1) {
                for (let i = 1; i <= newProduct.count; i++) {
                    AllData.push(newProduct);
                }

            } else {
                alert("Pleas Enter value")
                
            }
        } else {
            // update
            AllData[GlobalID] = newProduct;
            mood = "Creat";
            button1.style.backgroundColor = "rgb(0, 128, 255)";
            button1.innerHTML = "Add Product";
            count.classList.remove("none");
        }
        localStorage.setItem("Products", JSON.stringify(AllData))
        clearInputs()
        showData();
    }


}



button1.addEventListener("click", GreaterThan0)
let removeOneItem = (i) => {
    AllData.splice(i, 1)
    localStorage.Products = JSON.stringify(AllData)
    showData()
}

let modalF = (i) =>{
    modal.innerHTML = `Price: ${AllData[i].price}<br><hr>
    Tax: ${AllData[i].tax}<br><hr px-0>
    Delivary: ${AllData[i].delivary}<br><hr>
    Discount: ${AllData[i].discount}<br><hr>
    Total: ${AllData[i].Total}<br><hr>
    Category: ${AllData[i].department}<br><hr>`
}

let showData = () => {
    let trs = "";
    for (let i = 0; i < AllData.length; i++) {
        trs += `<tr>
        <td> ${i+1} </td>
        <td> ${AllData[i].productName}</td>
        <td><button onclick="modalF(${i})" type="button" class="btn btn-secondary py-0 px-2" data-bs-toggle="modal" data-bs-target="#exampleModal"> Show </button></td>
        <td> <i onclick = "removeOneItem(${i})"class="fa-solid fa-trash-can"></i></td>
        <td> <i onclick = "EditeOneItem(${i})" id = "warning" class="fa-solid fa-pen-to-square" ></i> </td>
        </tr>`
        
    }
    

    tbody.innerHTML = trs;
    counter.innerHTML = AllData.length
    if (AllData.length > 0) {
        button2.classList.remove("none")
    } else {
        button2.classList.add("none")
    }
}
showData();

let RemoveAll = () => {
    if (confirm("Are You Sure ")) {
        localStorage.clear()
        AllData.splice(0)
        showData();
    }

}

let clearInputs = () => {
    product.value = ''
    formGroup[0].value = ''
    formGroup[1].value = ''
    formGroup[2].value = ''
    formGroup[3].value = ''
    formGroup[4].value = ''
    count.value = ''
    department.value = ''
}
button2.addEventListener("click", RemoveAll)

// Editing item
let EditeOneItem = (i) => {
    product.value = AllData[i].productName
    formGroup[0].value = AllData[i].price
    formGroup[1].value = AllData[i].tax
    formGroup[2].value = AllData[i].delivary
    formGroup[3].value = AllData[i].discount
    formGroup[4].value = AllData[i].Total
    department.value = AllData[i].department
    mood = "Update"
    button1.style.backgroundColor = "orange";
    button1.innerHTML = `UpDate Product ${i+1}`;
    GlobalID = i;
    count.classList.add('none');
}
// Dark mood
let localstorage = () =>{
    if(localStorage.black == "1"){
        localStorage.black = '0';
    }
    else{
        localStorage.black = '1';
    }
}
let Dark = () =>{
    if(localStorage.black == "1"){
        ldmood.innerHTML = "Light Mood"
        body.style.backgroundColor = 'black'
        tbody.style.backgroundColor = 'black'
        tbody.style.color = 'white'
        tr1.style.backgroundColor = "black"
        tr1.style.color = "white"
        h5[0].style.color = 'white'
        h5[1].style.color = 'white'
        Mood.style.backgroundColor = 'white'
        Mood.style.color = 'black';
        h1[0].style.color = 'white'
        h1[1].style.color = 'white'
    }else{
        ldmood.innerHTML = "Dark Mood"
        body.style.backgroundColor = 'white';
        tbody.style.backgroundColor = 'white'
        tbody.style.color = 'black'
        tr1.style.backgroundColor = "white"
        tr1.style.color = "black"
        h5[0].style.color = 'black'
        h5[1].style.color = 'black'
        Mood.style.backgroundColor = 'black'
        Mood.style.color = 'white'
        h1[0].style.color = 'black'
        h1[1].style.color = 'black'
    }
}
{
window.addEventListener('load', Dark)
localStorage.getItem("black")
Mood.addEventListener("click", localstorage);
Mood.addEventListener("click", Dark);
}