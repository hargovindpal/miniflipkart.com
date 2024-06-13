let wishlistItemObject;

function onWishListPageLoad(){
    getWishListItemObjects();
    removeFromWishlist();
    displayWishlistItems();
}
onWishListPageLoad();


function getWishListItemObjects(){
        wishlistItemObject = wishlist.map(wishlistID =>{
        let foundItems = items.find(item=> item.id == wishlistID)
        return foundItems || null;
});
} 


function displayWishlistItems(){
    let wishListItemsContainer = document.querySelector('.wishlist-items');
    let innerHtml = '';
    wishlistItemObject.forEach(wishlistItem =>{
        innerHtml += generateHtmlForWishList(wishlistItem);
    });

    wishListItemsContainer.innerHTML = innerHtml;
}

function generateHtmlForWishList(item){
        return `<div class="wishlist-item">
                    <div class="likeIconStyle">
                        <i class="fa-brands fa-gratipay">
                        </i>
                    </div>
                    <div class="item-image">
                        <img src="${item.item_image}">
                    </div>
                    <div class="item-fullinfo"> 
                        <div class="item-info">
                            <p>${item.item_info} </p>
                            <p>Delivered By: ${item.delivery_date}</p>
                            <div class="dlticon"><i onclick="removeFromWishlist(${item.id})" class="fa-solid fa-trash"></i></div>
                        </div>
                        <div class="seller">
                            <span><p>Seller: ${item.seller}</p></span>
                            <img class="assured-icon" src="assured.png">
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
                        <p>Delivery Charge: ₹${item.delivery}</p>
                    </div>
                        <div class="offer">
                            <p>${item.offer}</p>
                        </div>
                        <button onclick="addToBag(${item.id});" class="addtocart"><i class="fa-solid fa-cart-shopping"></i> Add to Cart
                    </button>
                    </div>  
                </div> `;
}


function wishlistlistHeadingCount(){
        let heading = document.querySelector('.heading')
        heading.innerHTML = `<h3>My Wishlist (${wishlistCount.innerText})</h3>`
}
wishlistlistHeadingCount();



function removeFromWishlist(itemID){
    wishlist = wishlist.filter(items=> items != itemID);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    getWishListItemObjects();
    displayWishlistCount();
    wishlistlistHeadingCount();
    displayWishlistItems();

    };

    
    

