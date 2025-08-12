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
    },
    {
        id:7,
        name:'young shrirt',
        desc:'T-Shirt',
        price:9800,
        img:"pics/pic06.jpg"
    }

];
let newcartproducts=JSON.parse(localStorage.getItem("data"))||[];
let allshopproduct=document.querySelector("#allshopproduct")
let totalbillbox=document.querySelector("#totalbillbox")
const showproducts=()=>{
   
    allshopproduct.innerHTML=newcartproducts.map((x)=>{
        
        let search =shopdata.find((itm)=>itm.id===x.id)||[];
        return `
        <div id="productcontainer">
        <ion-icon name="trash-outline" id="removeprods" onclick="removeprod(${x.id})"></ion-icon>
    <div id="proddesc">
    
        <img src="${search.img}" id="prodpics" class="prodpics">
        <h1 id="prodname">${search.name}</h1>
        <h2 id="prodexp">${search.desc}</h2>
    </div>
        <div id="prodquantity">
            <div><span id="prodprice">RS:${search.price}</span></div>
            <div id="prodcounter">
                <button class="button-60" role="button">
                <ion-icon name="chevron-up-outline" onclick="increment(${x.id})"></ion-icon>
                </button>
               
             <span  id=${search.id}>${x.item}</span>
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
    // console.log(selected_id)
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
        showproducts()
        }
    let update=(id)=>{
        let selected_id=id;
    let findcartitem=newcartproducts.find((x)=>x.id==selected_id);
    let prod_number_element = document.getElementById(id);
        prod_number_element.innerHTML = findcartitem.item;
        cartamount(id)
        calculatebill()
        
    }
    let cartamount=(id)=>{
    let totalprods=newcartproducts.map((x)=>x.item).reduce((x,y)=>x+y,0);
    cartnumber.innerHTML=totalprods
    
    }
    let calculatebill=()=>{
    let allcartitems=newcartproducts.map((cartitems)=>{
    let shopitems=shopdata.find((x)=>x.id===cartitems.id)
    let totalbill=(shopitems.price*cartitems.item)
    return totalbill
    }).reduce((x,y)=>x+y,0);
    //console.log(allcartitems)
    if(newcartproducts.length!==0){
totalbillbox.innerHTML=`<h2 id="billamount">Your total bill is ${allcartitems}</h2>`
    }
    else{
        totalbillbox.innerHTML=`Your cart is empty `
    }
    }
    let removeprod=(id)=>{
newcartproducts=newcartproducts.filter((x)=>x.id!==id)

    localStorage.setItem("data",JSON.stringify(newcartproducts))
    showproducts()
    cartamount()
    calculatebill()
    }
    calculatebill()
    showproducts();
    cartamount()
    