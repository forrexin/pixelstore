window.addEventListener('load', loadCartFromJSON); 
window.addEventListener('load', updateTotal); 
 
let cart; 
 
function loadCartFromJSON() { 
    cart = JSON.parse(localStorage.getItem('cart')) || []; 
    loadCart(); 
} 
 
function loadCart() { 
    const cartContainer = document.querySelector('.items'); 
    cartContainer.innerHTML = ''; 
 
    if (cart.length === 0) { 
        const emptyCart = document.createElement('h4'); 
        emptyCart.innerHTML = 'Ваш кошик порожній, перейдіть у <a href="catalog.html"><span class="text-span-2">каталог</span></a>, щоб додати товари.';
        cartContainer.appendChild(emptyCart); 
        return; 
    } 
 
    cart.forEach(function (item) { 
        const itemElement = document.createElement('div'); 
        itemElement.classList.add('item'); 
 
        const imgElement = document.createElement('img'); 
        imgElement.src = item.image; 
        imgElement.alt = ''; 
        imgElement.className = 'item-img'; 
        itemElement.appendChild(imgElement); 
 
        const infoElement = document.createElement('div'); 
        infoElement.classList.add('item-info'); 
 
        const titleElement = document.createElement('h4'); 
        titleElement.className = 'item_title'; 
        titleElement.id = item.id; 
        titleElement.textContent = item.name; 
        infoElement.appendChild(titleElement); 
 
        const priceElement = document.createElement('p'); 
        priceElement.className = 'item_price'; 
        if (item.newPrice == null) { 
            priceElement.textContent = item.price + ' грн'; 
        } else { 
            const priceSpan = document.createElement('span'); 
            priceSpan.textContent = item.price + ' грн'; 
84 
 
            priceSpan.style.textDecoration = 'line-through'; 
 
            const newPriceSpan = document.createElement('span'); 
            newPriceSpan.textContent = item.newPrice + ' грн'; 
 
            priceElement.appendChild(priceSpan); 
            priceElement.appendChild(document.createElement('br')); 
            priceElement.appendChild(newPriceSpan); 
        } 
 
        infoElement.appendChild(priceElement); 
 
        const countContainer = document.createElement('div'); 
        countContainer.classList.add('count-container'); 
 
        const countLabel = document.createElement('p'); 
        countLabel.textContent = 'Кількість:'; 
        countLabel.classList.add('count-name'); 
 
        countContainer.appendChild(countLabel); 
 
        const countInput = document.createElement('input'); 
        countInput.type = 'number'; 
        countInput.value = item.count; 
        countInput.min = '1'; 
        countInput.classList.add('count-input'); 
 
        countInput.addEventListener('change', function (event) { 
            const newCount = parseInt(event.target.value); 
            updateItemCount(item.id, newCount); 
        }); 
 
        countContainer.appendChild(countInput); 
 
        const totalElement = document.querySelector('.total-price'); 
        const totalPrice = calcTotal(); 
        totalElement.textContent = 'Сума: ' + totalPrice + ' грн'; 
 
        const deleteButton = document.createElement('button'); 
        deleteButton.textContent = ''; 
        deleteButton.classList.add('delete-button'); 
 
        deleteButton.addEventListener('click', function () { 
            removeFromCart(item.id); 
        }); 
 
        itemElement.appendChild(infoElement); 
        itemElement.appendChild(countContainer); 
        itemElement.appendChild(deleteButton); 
        cartContainer.appendChild(itemElement); 
    }); 
} 
 
function updateItemCount(itemId, newCount) { 
    const itemUpdate = cart.find((item) => item.id === itemId); 
    if (itemUpdate) { 
        itemUpdate.count = newCount; 
 
        localStorage.setItem('cart', JSON.stringify(cart)); 
        updateTotal(); 
    } 
} 
85 
 
 
function removeFromCart(itemId) { 
    cart = cart.filter((item) => item.id !== itemId); 
    localStorage.setItem('cart', JSON.stringify(cart)); 
    updateTotal(); 
    loadCart(); 
} 
 
function calcTotal() { 
    let total = 0; 
    cart.forEach(function (item) { 
        if (item.newPrice != null) 
            total += item.count * item.newPrice 
        else total += item.count * item.price; 
    }); 
 
    return total; 
} 
 
function updateTotal() { 
    const totalElement = document.querySelector('.total-price'); 
    const total = calcTotal(); 
    totalElement.textContent = 'Сума: ' + total + ' грн'; 
} 
 
const form = document.querySelector('.order-form'); 
 
form.addEventListener('submit', async function (event) {
    event.preventDefault();

    if (cart.length === 0) {
        alert('Ваш кошик пустий. Додайте хоча б одну одиницю товару.');
        return;
    }

    const customerName = form.querySelector('input[name="Ім\'я"]').value;
    const customerEmail = form.querySelector('input[name="email"]').value;
    const customerPhone = form.querySelector('input[name="Телефон"]').value;

    if (!customerName || !customerPhone) {
        alert('Будь ласка, заповніть обов\'язкові поля: Ім\'я та Телефон');
        return;
    }

    const total = calcTotal();

    const orderData = {
        customerName,
        customerEmail,
        customerPhone,
        items: cart.map(item => ({
            id: item.id,
            count: item.count,
            price: item.newPrice || item.price
        })),
        total
    };

    try {
        const response = await fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        if (response.ok) {
            form.reset();
            clearCart();
            alert('Дякуємо за замовлення! Ваше замовлення прийнято.');
        } else {
            throw new Error('Сервер повернув помилку: ' + response.status);
        }
    } catch (error) {
        console.error('Error:', error);
        // Fallback: зберегти замовлення локально
        saveOrderLocally(orderData);
        form.reset();
        clearCart();
        alert('Замовлення збережено локально. Адміністратор зв\'яжеться з вами.');
    }
});

function saveOrderLocally(orderData) {
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push({
        ...orderData,
        timestamp: new Date().toLocaleString('uk-UA')
    });
    localStorage.setItem('orders', JSON.stringify(orders));
    console.log('Замовлення збережено локально:', orders);
} 
86 
function clearCart() { 
cart = []; 
localStorage.removeItem('cart'); 
updateTotal(); 
loadCart(); 
}