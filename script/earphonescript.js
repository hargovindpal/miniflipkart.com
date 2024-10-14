let wishlistCount = '';
var wishlist = [];
let bagItems;


let displayItemsOnHomePage=()=>{
let itemsContainer = document.querySelector('.items-container');

if(!itemsContainer){
    return;
}
let innerHtml= '';
earphones.forEach(item =>{

innerHtml += ` <div class="item-container">
                                <p>Item No: ${item.id}</p>
                                <div class="like">
                                <i onclick="addtowishlist(${item.id})" class="fa-solid fa-heart" data-wishlist="${item.id}"></i>
                                </div>
                                <div class="item-image">
                                    <img src="${item.item_image}" alt="">
                                </div>
                                
                                <div class="item-info">
                                    <p>${item.item_info}</p>
                                </div>
                                <div class="rating">
                                    <p>${item.rating} <i class="fa-solid fa-star"></i></p>
                                   
                                </div>
                                <div class="price-section">
                                    <span class="current-price"><p>₹${item.current_price} </p></span>
                                    <span class="actual-price"><p>₹${item.actual_price} </p></span>
                                    <span class="discount"><p>${item.discount}% off </p></span>
                                </div>
                                <div class="delivery">
                                    <p>Delivery Charges: ₹${item.delivery}</p>
                                </div>
                                <div class="offer">
                                    <p>${item.offer}</p>
                                </div>
                                <div class="addtocart">
                                <button onclick="addToBag(${item.id});" class="addtocartbtn" ><i class="fa-solid fa-cart-shopping"></i> Add to Cart</button>
                                </div>
                            </div>`;
});

itemsContainer.innerHTML= innerHtml;
};


function onload(){
    let bagItemsStr = localStorage.getItem('bagItems')
    bagItems = bagItemsStr ? JSON.parse(bagItemsStr) : [];
    displayItemsOnHomePage();
    displayCount();
    
    

};
onload();


function addToBag(itemId){
    bagItems.push(itemId);
    localStorage.setItem('bagItems', JSON.stringify(bagItems));
    displayCount();
    confirm('Are you sure want to add item ?');
}

function displayCount(){
    let cartCount = document.querySelector('.cart-count');
    if(bagItems.length > 0){
        cartCount.style.visibility ='visible';
        cartCount.innerText = bagItems.length;
    }
    else{
        cartCount.style.visibility ='hidden';
    } 
};




function loadWishList() {
    // Use a string key for localStorage
    let wishlistStr = localStorage.getItem('wishlist');
    wishlist = wishlistStr ? JSON.parse(wishlistStr) : [];
   
}
loadWishList();


function displayWishlistCount(){
    wishlistCount = document.querySelector('.wishlist-count');
    if(wishlist.length > 0)
        {
        wishlistCount.innerText = wishlist.length;
        wishlistCount.style.visibility ='visible';
        
        }
        else{
            wishlistCount.style.visibility ='hidden';
        }
        
}
displayWishlistCount();

let likeIcons;

function addtowishlist(itemId){
    if (!wishlist.includes(itemId)) {
        wishlist.push(itemId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist)); // Store the updated wishlist in local storage
        updateWishlistIconStyle();
        displayWishlistCount(); // Update the wishlist count display
        
    } else {
        alert("Item already in wishlist");
    }
    
}

function updateWishlistIconStyle(){
    likeIcons = document.querySelectorAll('.like .fa-solid.fa-heart');
        likeIcons.forEach(icon => {

            // Comparing Attribute item id with the wishlist Array ids
            // Getting and Convert Attribute string to Integer
            // Note: - we can get html element and change the style by Attribute of the particular element.
        
            let itemId = parseInt(icon.getAttribute('data-wishlist')); 

        if (wishlist.includes(itemId)) { 
            icon.style.color = 'red'; // Update the color for wishlist items
        } 
        else {
            icon.style.color = ''; // Reset color if item is not in wishlist
        }
    });
}
updateWishlistIconStyle();







