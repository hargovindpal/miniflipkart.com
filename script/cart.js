
function onLoad(){
    getCartItemObject();
    displayCartItems();
    

}
onLoad();

var cartItemObjects;
function getCartItemObject(){
    cartItemObjects = bagItems.map(itemID =>{
    for(let i=0; i < items.length; i++)
        if(itemID == items[i].id){
            return items[i];
        }
        
});
}

function displayCartItems(){
    let cartContainer = document.querySelector('.cart-item-container');
    let innerHtml = '';
    cartItemObjects.forEach(bagItems=>{
        innerHtml += generateItemHtml(bagItems);
    });

    cartContainer.innerHTML = innerHtml;
};



function generateItemHtml(item){
    return `<div class="cart-items">
                            <div class="cart-item">
                                <div class="item-image">
                                    <img src="${item.item_image}">
                                </div>
                                <div class="item-fullinfo"> 
                                    <div class="item-info">
                                        <p>${item.item_info} </p>
                                        <p>Delivered By: ${item.delivery_date}</p>
                                    </div>
                                    <div class="seller">
                                        <span><p>Seller:${item.seller}</p></span>
                                        <img class="assured-icon" src="assured.png">
                                    </div>
                                    <div class="price-section">
                                        <span class="current-price"><p>₹ ${item.current_price} </p></span>
                                        <span class="actual-price"><p>₹${item.actual_price} </p></span>
                                        <span class="discount"><p>${item.discount}% off </p></span>
                                    </div>
                                    <div class="delivery">
                                    <p>Delivery Charge: ₹${item.delivery}</p>
                                </div>
                                    <div class="offer">
                                        <p>${item.offer}</p>
                                    </div>
                                </div>
                            </div>     
                        </div>
                        <div class="item-bottom">
                        <div>
                        <button class="minusBtn">-</button>
                        <input class="quantity" type="text" value="0"></input>
                        <button class="PlusBtn">+</button>
                        </div>
                        <button class="save-for-later" onclick="addtowishlistfromcart(${item.id})"> ADD TO WISHLIST</button>
                        <button class="remove-item" onclick="removeFromCart(${item.id})"> REMOVE</button>
                        </div>`; 

};



function removeFromCart(itemId){
bagItems = bagItems.filter(cartItemId =>cartItemId != itemId);
localStorage.setItem('bagItems', JSON.stringify(bagItems));
getCartItemObject();
displayCount();
displayCartItems();
displayCartSummary();
}

function addtowishlistfromcart(itemId){
    addtowishlist(itemId);
    removeFromCart(itemId);
}


function displayCartSummary(){
    let bagSummary = document.querySelector('.summary-container');
    let totalItems = cartItemObjects.length;
    let totalPrice = 0;
    let totalDiscount = 0;
    let totalCharges = 0;
    let finalAmount = 0;
    let totalSaveAmount = 0;

    cartItemObjects.forEach(cartItem=>{
        totalPrice += parseInt(cartItem.actual_price);
        totalDiscount += cartItem.discount ? parseInt(cartItem.actual_price-cartItem.current_price) : 0;
        totalCharges += cartItem.delivery ? parseInt(cartItem.delivery) : "Free Delivery";
    });
    finalAmount = totalPrice - totalDiscount + totalCharges;

    totalSaveAmount = totalDiscount;

    bagSummary.innerHTML = `<div class="price-summary-container">
                            <h4>PRICE DETAILS</h4>
                            <table class="calc-table">
                                <tbody>
                                    <tr>
                                        <td>Price (${totalItems} items)</td>
                                        <td>₹${totalPrice}</td>
                                    </tr>
                                    <tr>
                                        <td>Discount</td>
                                        <td class="green-color">- ₹${totalDiscount}</td>
                                    </tr>
                                    <tr>
                                        <td>Delivery Charges</td>
                                        <td class="green-color">₹${totalCharges}</td>
                                    </tr>
                                    <tr class="mgn-top bdr-top bdr-btm">
                                        <td><b>Total Amount</b></td>
                                        <td><b>₹${finalAmount}</b></td>
                                    </tr>
                                    <tr class="mgn-top green-color">
                                        <td>You will save ₹${totalSaveAmount} on this order </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="placeOrderbtn">
                                <button>PLACE ORDER</button>
                            </div>
                            <div class="terms mgn-top">
                                <figure><img src="shield.svg"></figure>
                                <p>Safe and Secure Payments.Easy returns.100% Authentic products.</p>
                            </div>
                        </div> `;
}
displayCartSummary();


document.querySelectorAll('.item-bottom').forEach(item => {

let countPlus = item.querySelector('.PlusBtn');
let countMinus = item.querySelector('.minusBtn');
let quantity = item.querySelector('.quantity');
let itemId = item.getAttribute('data-id'); 


// Load the initial quantity from localStorage
let savedQuantity = localStorage.getItem(`quantity-${itemId}`);
let counter = savedQuantity ? parseInt(savedQuantity) : parseInt(quantity.value);
quantity.value = counter;  // Update the input field with the stored value

countPlus.addEventListener('click', () => {
    counter++;
    quantity.value = counter;
    localStorage.setItem(`quantity-${itemId}`, counter);  // Save the updated quantity
});

countMinus.addEventListener('click', () => {
    if (counter > 1) {
        counter--;
        quantity.value = counter;
        localStorage.setItem(`quantity-${itemId}`, counter);  // Save the updated quantity
    } 
    else {
        alert("Quantity cannot be less than 1");
    }
});
});


// Function to load quantities on page load
function loadQuantity() {
    document.querySelectorAll('.item-bottom').forEach(item => {
        let itemId = item.getAttribute('data-id');
        let savedQuantity = localStorage.getItem(`quantity-${itemId}`);
        let quantity = item.querySelector('.quantity');
        quantity.value = savedQuantity ? savedQuantity : 1;
    });
}

loadQuantity();  // Call the function to load quantities when the page loads