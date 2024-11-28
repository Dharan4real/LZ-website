if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready())
} else {
    ready()
}

function ready() {
    var removeCartItemsButtons = document.getElementsByClassName("btn-danger");
    for (var i = 0; i < removeCartItemsButtons.length; i++) {
        var button = removeCartItemsButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    var qtyInputs = document.getElementsByClassName('cart-qty-input')
    for (var i = 0; i < qtyInputs.length; i++) {
        var input = qtyInputs[i]
        input.addEventListener('change', qtyChanged);
    }

    var addToCartButtons = document.getElementsByClassName('add-to-cart-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addCartItemButtonClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]

    while(cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }

    updateTotal()
}

function addCartItemButtonClicked(event) {
    var button = event.target
    var item = button.parentElement.parentElement;
    var title = item.getElementsByClassName('record-title')[0].innerText
    var price = item.getElementsByClassName('record-price')[0].innerText
    var image = item.getElementsByClassName('record-image')[0].src

    addItemToCart(title, price, image)
    updateTotal()
}

function addItemToCart(title, price, image) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert("This item is already in the cart")
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-header cart-column">
        <img src="${image}" alt="Led Zeppelin IV" class="cart-img">
        <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-header cart-column">${price}</span>
        <div class="cart-qty cart-header cart-column">
        <input class="cart-qty-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`

    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)

    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-qty-input')[0].addEventListener('change', qtyChanged);
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateTotal();
}

function qtyChanged(event) {
    var qty = event.target
    if (isNaN(qty.value) || qty.value <= 0) {
        qty.value = 1;
    }
    updateTotal();
}

function updateTotal() {
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItems.getElementsByClassName('cart-row');
    var total = 0;

    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var qtyElement = cartRow.getElementsByClassName('cart-qty-input')[0];

        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var qty = qtyElement.value

        total = total + price * qty;
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total;
}