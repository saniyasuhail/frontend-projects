import "./styles.css";

const tableContainer=document.getElementById('tableBody');
const bagContainer=document.getElementById('bagBody');
const searchInput=document.getElementById('search');
const selectCategory = document.querySelector("#category");
const selectStock = document.querySelector("#stock");
let selectedCategory="",selectedStock="";
let filteredData=[];
let cart=[];

const addPrice=()=>{
  let sum=0;
for(var item in cart){
    sum=sum+cart[item].total;
};
  const tr=document.createElement('tr');
  const td1=document.createElement('td');
  const td2=document.createElement('td');
  var t=document.createTextNode('Total');
  td2.appendChild(t);
  const td3=document.createElement('td');
  var price=document.createTextNode(sum);
  td3.appendChild(price);
  tr.append(td1,td2,td3);
  bagContainer.appendChild(tr);
}

const filterTable=()=>{
  let filter = searchInput.value.toUpperCase();
  let table = document.getElementById("tableBody");
  let tr = table.getElementsByTagName("tr");
  for (let i = 0; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName("td")[0];
    let tdDescription = tr[i].getElementsByTagName("td")[2];

    if (td ) {
      let txtValue1 = td.textContent || td.innerText ;
      let txtValue2 = tdDescription.textContent || tdDescription.innerText;

      if (txtValue1.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }      
  }
}
searchInput.addEventListener('keyup',function(){
  filterTable();
})
selectCategory.addEventListener("change", (event) => {
  selectedCategory = event.target.value;
  getData();
});
selectStock.addEventListener('change',()=>{
  selectedStock = event.target.value;
  getData();
})

const addItemToCart=(vaccine)=>{
  for(var item in cart) {
    if(cart[item].name === vaccine.name) {
      cart[item].count ++;
      cart[item].total =(cart[item].price)*cart[item].count;
      createCart();
      for(var item in filteredData) {
        if(filteredData[item].name === vaccine.name) {
          filteredData[item].quantity --;
          if( filteredData[item].quantity==0){
          filteredData[item].availability="Out stock"
          }
          mapVaccineData(filteredData);
          return;
        }
      }
      return;
    }
  }
  var item = {
    'name':vaccine.name,
    'count':1,
    'price':vaccine.price,
    'total':vaccine.price,
    'quantity':vaccine.quantity
  }
  cart.push(item);
  createCart();
  for(var item in filteredData) {
    if(filteredData[item].name === vaccine.name) {
      filteredData[item].quantity --;
     mapVaccineData(filteredData);
      return;
    }
  }
}

const removeItemFromCart=(vaccine)=>{
  for(var item in cart) {
    if(cart[item].name === vaccine.name) {
      cart[item].count --;
      cart[item].total =(cart[item].price)*cart[item].count;
      if(cart[item].count === 0) {
        cart.splice(item, 1);
      }
      break;
    }
}
createCart();
for(var item in filteredData) {
  if(filteredData[item].name === vaccine.name) {
    filteredData[item].quantity ++;
    if( filteredData[item].quantity>0){
          filteredData[item].availability="In stock"
    }
   mapVaccineData(filteredData);
    return;
  }
}
}


const createCart=()=>{
  bagContainer.innerHTML="";
  cart.forEach((vaccine)=>{
    const tr=document.createElement('tr');
        const td1=document.createElement('td');
        var t1 = document.createTextNode(vaccine.name);
        td1.appendChild(t1);
        const td2=document.createElement('td');
        const increaseButton=document.createElement('button');
        var plus=document.createTextNode('+');
        if(vaccine.count==vaccine.quantity)
        increaseButton.disabled=true;
        else
        increaseButton.disabled=false;
        const decreaseButton=document.createElement('button');
        var minus=document.createTextNode('-');
        var t2 = document.createTextNode(vaccine.count);
        td2.append(t2,increaseButton,decreaseButton);
        const td3=document.createElement('td');
        var t3 = document.createTextNode(vaccine.total);
        td3.appendChild(t3);
        tr.append(td1,td2,td3);
        increaseButton.append(plus);
        increaseButton.addEventListener("click",function(event){
          addItemToCart(vaccine);          
        })
        decreaseButton.append(minus);
        decreaseButton.addEventListener("click",function(event){
          removeItemFromCart(vaccine); 
        })
        bagContainer.appendChild(tr);
  })
  if(cart.length>0)
      addPrice();
}


const mapVaccineData=(data)=>{
  tableContainer.innerHTML="";
  data.forEach((vaccine)=>{
      const tr=document.createElement('tr');
      const td1=document.createElement('td');
      var t1 = document.createTextNode(vaccine.name);
      td1.appendChild(t1);
      const td2=document.createElement('td');
      var t2 = document.createTextNode(vaccine.category);
      td2.appendChild(t2);
      const td3=document.createElement('td');
      var t3 = document.createTextNode(vaccine.description);
      td3.appendChild(t3);
      const td4=document.createElement('td');
      var t4 = document.createTextNode(vaccine.price);
      td4.appendChild(t4);
      const td5=document.createElement('td');
      var t5 = document.createTextNode(vaccine.availability);
      td5.appendChild(t5);
      const td6=document.createElement('td');
      var t6 = document.createTextNode(vaccine.quantity);
      td6.appendChild(t6);
      const td7=document.createElement('td');
      const button=document.createElement('button');
      var t7 = document.createTextNode('Add to Bag');
      button.appendChild(t7);
      if(vaccine.quantity==0 || vaccine.availability=="Out stock")
        button.disabled=true;
        else
        button.disabled=false;
      button.addEventListener("click",()=>{
          if(vaccine.quantity>0 && vaccine.availability=="In stock"){
          addItemToCart(vaccine);
          }
      })
      
      td7.appendChild(button);
      tr.append(td1,td2,td3,td4,td5,td6,td7)
      tableContainer.append(tr);
    })

}


const getData= ()=>{
  // const promise =await fetch('https://run.mocky.io/v3/1f163c85-1270-4d6e-ad12-89311d804edf');
  // const data=await promise.json();
  const vaccine_data=[
    {
        "name": "Covishield",
        "category": "Viral Vector",
        "description": "This is a very basic example, and you can expand it to include more endpoints, data, and features as needed for your mock API.",
        "price": 95,
        "quantity": "5",
        "availability": "In stock",
    },
    {
      "name": "Pfizer",
      "category": "mRNA Vaccine",
      "description": "This is a very  example, and you can expand it to include more endpoints, data, and features as needed for your mock API.",
      "price": 95,
      "quantity": "3",
      "availability": "In stock",
  },
  {
    "name": "Jannsen",
    "category": "Viral Vector",
    "description": "This is a very  example, and you can expand it to include more endpoints, data, and features as needed for your mock API.",
    "price": 95,
    "quantity": "5",
    "availability": "In stock",
},
{
  "name": "Moderna",
  "category": "mRNA Vaccine",
  "description": "This is a very basic example, and you can expand it to include more endpoints, data, and features as needed for your mock API.",
  "price": 95,
  "quantity": "0",
  "availability": "Out stock",
},
  ];
  filteredData=vaccine_data;
  if(selectedCategory){
    const result = filteredData.filter((vaccine) => vaccine.category== selectedCategory);
    filteredData=result;
  }
  if(selectedStock){
    const result = filteredData.filter((vaccine) => vaccine.availability== selectedStock);
    filteredData=result;
  }
  mapVaccineData(filteredData);
}

getData();

