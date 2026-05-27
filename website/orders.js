window.addEventListener('load', displayOrders);

function displayOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const container = document.getElementById('orders-container');

    if (orders.length === 0) {
        container.innerHTML = '<p class="no-orders">У вас немає замовлень.</p>';
        return;
    }

    let html = '';
    orders.forEach(function (order, index) {
        const itemsList = order.items.map(item => 
            `<li>${item.id}. ${item.count} шт. × ${item.price} грн</li>`
        ).join('');

        html += `
            <div class="order-card">
                <h2>Замовлення ${index + 1}</h2>
                <p><strong>Ім'я:</strong> ${order.customerName}</p>
                <p><strong>Email:</strong> ${order.customerEmail || 'не вказано'}</p>
                <p><strong>Телефон:</strong> ${order.customerPhone}</p>
                <p><strong>Дата:</strong> ${order.timestamp}</p>
                <h3>Товари:</h3>
                <ul>
                    ${itemsList}
                </ul>
                <p class="order-total"><strong>Загальна сума:</strong> ${order.total} грн</p>
            </div>
        `;
    });

    container.innerHTML = html;
}
