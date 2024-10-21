let allproducts=document.querySelector("#allproducts")
let prodname=document.querySelector("#prodname")
let prodexp=document.querySelector("#prodexp")
let prodprice=document.querySelector("#prodprice")
let prodnumber=document.querySelector(".prodnumber")
const shopdata=[
    {
        id:1,
        name:'Mens shrirt',
        desc:'this is the best mens shirt',
        price:1500,
        img:"pics/pic01.jpg"
    },
    {
        id:2,
        name:'Mens  best shrirt',
        desc:'this is so comfortable shirt',
        price:1200,
        img:"pics/pic02.jpg"
    },
    {
        id:3,
        name:'Mens cool shirt',
        desc:'buy this and use forever',
        price:4500,
        img:"pics/pic03.jpg"
    },
    {
        id:4,
        name:'fit girls shirts',
        desc:'this is the best mens shirt',
        price:3000,
        img:"pics/pic04.jpg"
    },
    {
        id:5,
        name:'old ladies shirt',
        desc:'this is the best gilrs shirt',
        price:1700,
        img:"pics/pic05.jpg"
    },
    {
        id:6,
        name:'young shrirt',
        desc:'this is the best  shirt',
        price:9800,
        img:"pics/pic06.jpg"
    }

];
let newcartproducts=JSON.parse(localStorage.getItem("data"))||[];
const showproducts=()=>{
   
    allproducts.innerHTML=shopdata.map((x)=>{
        let cartprods=newcartproducts.find((prods)=>prods.id==x.id)||[]
        return `
        <div id="productcontainer">
    <div id="proddesc">
        <img src="${x.img}" id="prodpics" class="prodpics">
        <h1 id="prodname">${x.name}</h1>
        <h2 id="prodexp">${x.desc}</h2>
    </div>
        <div id="prodquantity">
            <div><span id="prodprice">RS:${x.price}</span></div>
            <div id="prodcounter">
                <button class="button-60" role="button">
                <ion-icon name="chevron-up-outline" onclick="increment(${x.id})"></ion-icon>
                </button>
                <span class="prodnumber" id=${x.id}>
                ${cartprods.item===undefined? 0:cartprods.item}
                </span>
<button class="button-60" role="button">
<ion-icon name="chevron-down-outline" onclick="decrement(${x.id})"></ion-icon></ion-icon>
</button>
 </div>
</div>
    </div>
        `
    }).join(" ")
}
let increment=(id)=>{
let selected_id=id;
console.log(selected_id)
let find_items=newcartproducts.find((x)=>x.id===selected_id);
if(find_items===undefined){
    newcartproducts.push({
        id:selected_id,
       item:1
    })
}
else{
    find_items.item+=1;
}
update(id)
localStorage.setItem("data",JSON.stringify(newcartproducts))
//console.log(newcartproducts)

}
let decrement=(id)=>{
    let selected_id=id;
    let find_items=newcartproducts.find((x)=>x.id===selected_id);
    if(!find_items||find_items.item===0){
        return ;
    }
    else{
        find_items.item-=1;
    }
    
    
    //console.log(newcartproducts)
    update(id)
    newcartproducts=newcartproducts.filter((x)=>x.item!==0);
    localStorage.setItem("data",JSON.stringify(newcartproducts))
    }
let update=(id)=>{
    let selected_id=id;
let findcartitem=newcartproducts.find((x)=>x.id==selected_id);
let prod_number_element = document.getElementById(id);
    prod_number_element.innerHTML = findcartitem.item;
    cartamount(id)
}
let cartamount=(id)=>{
let totalprods=newcartproducts.map((x)=>x.item).reduce((x,y)=>x+y,0);
cartnumber.innerHTML=totalprods

}
showproducts()
cartamount()