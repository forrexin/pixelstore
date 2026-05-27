window.addEventListener('load', () => {
    loadItemsFromAPI();
    initializePriceSlider();
});

let catalog;
let minPrice = 0;
let maxPrice = 10000;
let currentSearchValue = '';

const defaultCatalog = [
    { id: 1, name: 'Call Of Duty: Modern Warfare 2', price: 1500.00, newPrice: null, image: 'https://cdn2.steamgriddb.com/thumb/5cef43602bc7486da26ba5fbf4483f43.jpg', orderLink: '#' },
    { id: 2, name: 'Horizon Forbidden West', price: 2000.00, newPrice: null, image: 'https://cdn2.steamgriddb.com/thumb/0c173f1e124e65581352fb59e19c765f.jpg', orderLink: '#' },
    { id: 3, name: 'Elden Ring', price: 1800.00, newPrice: null, image: 'https://cdn2.steamgriddb.com/thumb/a0abf0396a718b8982fce0b80181d8cb.jpg', orderLink: '#' },
    { id: 4, name: 'Cyberpunk 2077', price: 2200.00, newPrice: null, image: 'https://cdn2.steamgriddb.com/thumb/f39b781760a403dedaa05587e8889c1a.jpg', orderLink: '#' },
    { id: 5, name: 'Red Dead Redemption 2', price: 2500.00, newPrice: null, image: 'https://cdn2.steamgriddb.com/thumb/3940304b536796dcc176aa83203a3955.jpg', orderLink: '#' },
    { id: 6, name: 'The Witcher 3', price: 1400.00, newPrice: null, image: 'https://cdn2.steamgriddb.com/thumb/4904f82c12cecf6ec070fe77d7e913ce.jpg', orderLink: '#' },
    { id: 7, name: 'GTA V', price: 1200.00, newPrice: null, image: 'https://cdn2.steamgriddb.com/thumb/af0a25e27510f77d97634a6bbe653b13.jpg', orderLink: '#' },
    { id: 8, name: 'Resident Evil 4', price: 2100.00, newPrice: null, image: 'https://cdn2.steamgriddb.com/thumb/46cc597bae1fee3cd19314f32c6cb4f0.jpg', orderLink: '#' },
    { id: 9, name: 'Hogwarts Legacy', price: 2300.00, newPrice: null, image: 'https://cdn2.steamgriddb.com/thumb/43db2b7df1cff247f7efaa0e7e8d7e3c.jpg', orderLink: '#' },
    { id: 10, name: 'God of War Ragnarok', price: 2800.00, newPrice: null, image: 'https://cdn2.steamgriddb.com/thumb/fd93fd1de50e084dd7d3b0b9f6950450.jpg', orderLink: '#' },
    { id: 11, name: 'Spider-Man Remastered', price: 1900.00, newPrice: null, image: 'https://cdn2.steamgriddb.com/thumb/a85d6bc329aeaf43fe76fbb48b8b9325.jpg', orderLink: '#' },
    { id: 12, name: 'The Last of Us Part I', price: 2600.00, newPrice: null, image: 'https://cdn2.steamgriddb.com/thumb/769fda94fbd3dd567d4cf6e296226fc8.jpg', orderLink: '#' },
    { id: 13, name: 'Assassin\'s Creed Mirage', price: 2000.00, newPrice: null, image: 'https://cdn2.steamgriddb.com/thumb/b00be8459cbd14caad11bf6c22c1dc2b.jpg', orderLink: '#' },
    { id: 14, name: 'Far Cry 6', price: 1700.00, newPrice: null, image: 'https://cdn2.steamgriddb.com/thumb/2707b2f06a3967105746389278bdf01d.jpg', orderLink: '#' },
    { id: 15, name: 'Battlefield 2042', price: 1800.00, newPrice: null, image: 'https://cdn2.steamgriddb.com/thumb/2720a5a68d93c81033704613e28e1a5f.jpg', orderLink: '#' },
    { id: 16, name: 'Counter-Strike 2', price: 0.00, newPrice: null, image: 'https://cdn2.steamgriddb.com/thumb/0662aa1719017e0efa5fa8daf0880c6e.jpg', orderLink: '#' },
    { id: 17, name: 'Dying Light 2', price: 2100.00, newPrice: null, image: 'https://cdn2.steamgriddb.com/thumb/a75fcb7222ddccf84b49f3b3efec8d48.jpg', orderLink: '#' },
    { id: 18, name: 'Forza Horizon 5', price: 2400.00, newPrice: null, image: 'https://cdn2.steamgriddb.com/thumb/6abd5c03e1414f4600add2d7956bb442.jpg', orderLink: '#' },
    { id: 19, name: 'Need for Speed Unbound', price: 1900.00, newPrice: null, image: 'https://cdn2.steamgriddb.com/thumb/8777af7a31c351b56fe6748d1c9cae62.jpg', orderLink: '#' },
    { id: 20, name: 'Mortal Kombat 1', price: 2600.00, newPrice: null, image: 'https://cdn2.steamgriddb.com/thumb/1ca03569d36f6dba22a6e791da327083.png', orderLink: '#' },
    { id: 21, name: 'Tekken 8', price: 2700.00, newPrice: null, image: 'https://cdn2.steamgriddb.com/thumb/d8148ed5a07a892dbaee2b53a0a045b6.jpg', orderLink: '#' },
    { id: 22, name: 'EA Sports FC 25', price: 2500.00, newPrice: null, image: 'https://cdn2.steamgriddb.com/thumb/3a40e945e1f4b9b9b7a99b8d18c2c8c1.jpg', orderLink: '#' },
    { id: 23, name: 'NBA 2K25', price: 2400.00, newPrice: null, image: 'https://cdn2.steamgriddb.com/thumb/635aa5a4e9c094eaca1e598c0e970577.jpg', orderLink: '#' },
    { id: 24, name: 'Valorant', price: 0.00, newPrice: null, image: 'https://cdn2.steamgriddb.com/thumb/9edb6b9b7fc3b263b86740c635839dc4.jpg', orderLink: '#' },
    { id: 25, name: 'Minecraft', price: 1300.00, newPrice: null, image: 'https://cdn2.steamgriddb.com/thumb/a73027901f88055aaa0fd1a9e25d36c7.jpg', orderLink: '#' },
    { id: 26, name: 'Terraria', price: 400.00, newPrice: null, image: 'https://cdn2.steamgriddb.com/thumb/9ef7f9b81c2532880cfe5cf53f0c906d.jpg', orderLink: '#' },
    { id: 27, name: 'Rust', price: 900.00, newPrice: null, image: 'https://cdn2.steamgriddb.com/thumb/35f6e50ae1b299f6efdf99b6490b712c.jpg', orderLink: '#' },
    { id: 28, name: 'DayZ', price: 1100.00, newPrice: null, image: 'https://cdn2.steamgriddb.com/thumb/c0936b995b74928362e5cf2db8b641bc.jpg', orderLink: '#' },
    { id: 29, name: 'PUBG: Battlegrounds', price: 0.00, newPrice: null, image: 'https://cdn2.steamgriddb.com/thumb/13816ba0dd3a36209cbc3cfef265dc7c.jpg', orderLink: '#' },
    { id: 30, name: 'Sea of Thieves', price: 1500.00, newPrice: null, image: 'https://cdn2.steamgriddb.com/thumb/fc28dd210d52ecb0135730aa1d151b1b.jpg', orderLink: '#' },
    { id: 31, name: 'Metro Exodus', price: 800.00, newPrice: null, image: 'https://cdn2.steamgriddb.com/thumb/45d6b5fb5d1f53e55485b07c71470a40.jpg', orderLink: '#' },
    { id: 32, name: 'Alan Wake 2', price: 2500.00, newPrice: null, image: 'https://cdn2.steamgriddb.com/thumb/a7147fd59ab64d16e49e819733ad2187.jpg', orderLink: '#' },
    { id: 33, name: 'Dead Space Remake', price: 2200.00, newPrice: null, image: 'https://cdn2.steamgriddb.com/thumb/f891e4b484284a04c56f08c507d731a6.jpg', orderLink: '#' }
];

const itemMetadata = {
    'Call Of Duty: Modern Warfare 2': { year: '2022', genre: 'Shooter', platform: 'PC / PlayStation / Xbox' },
    'Horizon Forbidden West': { year: '2022', genre: 'Action RPG', platform: 'PS5 / PS4' },
    'Elden Ring': { year: '2022', genre: 'Action RPG', platform: 'PC / PlayStation / Xbox' },
    'Cyberpunk 2077': { year: '2020', genre: 'RPG', platform: 'PC / PlayStation / Xbox' },
    'Red Dead Redemption 2': { year: '2018', genre: 'Action-Adventure', platform: 'PC / PlayStation / Xbox' },
    'The Witcher 3': { year: '2015', genre: 'RPG', platform: 'PC / PlayStation / Xbox' },
    'GTA V': { year: '2013', genre: 'Action-Adventure', platform: 'PC / PlayStation / Xbox' },
    'Resident Evil 4': { year: '2023', genre: 'Survival Horror', platform: 'PC / PlayStation / Xbox' },
    'Hogwarts Legacy': { year: '2023', genre: 'Action RPG', platform: 'PC / PlayStation / Xbox' },
    'God of War Ragnarok': { year: '2022', genre: 'Action', platform: 'PS5 / PS4' },
    'Spider-Man Remastered': { year: '2022', genre: 'Action', platform: 'PC / PlayStation' },
    'The Last of Us Part I': { year: '2022', genre: 'Action-Adventure', platform: 'PS5 / PC' },
    'Assassin\'s Creed Mirage': { year: '2023', genre: 'Action', platform: 'PC / PlayStation / Xbox' },
    'Far Cry 6': { year: '2021', genre: 'Shooter', platform: 'PC / PlayStation / Xbox' },
    'Battlefield 2042': { year: '2021', genre: 'Shooter', platform: 'PC / PlayStation / Xbox' },
    'Counter-Strike 2': { year: '2023', genre: 'Shooter', platform: 'PC' },
    'Dying Light 2': { year: '2022', genre: 'Action RPG', platform: 'PC / PlayStation / Xbox' },
    'Forza Horizon 5': { year: '2021', genre: 'Racing', platform: 'PC / Xbox' },
    'Need for Speed Unbound': { year: '2022', genre: 'Racing', platform: 'PC / PlayStation / Xbox' },
    'Mortal Kombat 1': { year: '2023', genre: 'Fighting', platform: 'PC / PlayStation / Xbox' },
    'Tekken 8': { year: '2024', genre: 'Fighting', platform: 'PC / PlayStation' },
    'EA Sports FC 25': { year: '2024', genre: 'Sports', platform: 'PC / PlayStation / Xbox' },
    'NBA 2K25': { year: '2024', genre: 'Sports', platform: 'PC / PlayStation / Xbox' },
    'Valorant': { year: '2020', genre: 'Shooter', platform: 'PC' },
    'Minecraft': { year: '2011', genre: 'Sandbox', platform: 'PC / Console' },
    'Terraria': { year: '2011', genre: 'Action-Adventure', platform: 'PC / Console' },
    'Rust': { year: '2018', genre: 'Survival', platform: 'PC' },
    'DayZ': { year: '2018', genre: 'Survival', platform: 'PC' },
    'PUBG: Battlegrounds': { year: '2017', genre: 'Shooter', platform: 'PC / Console' },
    'Sea of Thieves': { year: '2018', genre: 'Adventure', platform: 'PC / Xbox' },
    'Metro Exodus': { year: '2019', genre: 'Shooter', platform: 'PC / PlayStation / Xbox' },
    'Alan Wake 2': { year: '2023', genre: 'Adventure', platform: 'PC / PlayStation / Xbox' },
    'Dead Space Remake': { year: '2023', genre: 'Survival Horror', platform: 'PC / PlayStation / Xbox' }
};

function getItemMetadata(item) {
    const metadata = itemMetadata[item.name] || {};
    return {
        year: item.year || metadata.year || '2024',
        genre: item.genre || metadata.genre || 'Action',
        platform: item.platform || metadata.platform || 'PC'
    };
}

const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            performSearch();
        }
    });
}

async function loadItemsFromAPI() {
    try {
        const response = await fetch('http://localhost:3000/products');
        catalog = await response.json();
        console.log('Loaded from API:', catalog);
        setSearchMessage('');
        applyFilters();
    } catch (error) {
        console.error('Error loading products:', error);
        // Fallback to local JSON if API fails
        loadItemsFromJSON();
    }
}

async function loadItemsFromJSON() {
    console.log('Loading from JSON');
    const jsonFile = './catalog.json';

    try {
        const response = await fetch(jsonFile);
        if (!response.ok) {
            throw new Error('Не вдалося завантажити catalog.json: ' + response.status);
        }
        catalog = await response.json();
        console.log('Loaded catalog:', catalog);
        setSearchMessage('');
        applyFilters();
    } catch (error) {
        console.error('Failed to load JSON', error);
        setSearchMessage('');
        catalog = defaultCatalog;
        applyFilters(); // Apply filters after loading default catalog
    }
}
 
function setSearchMessage(text) {
    const messageElement = document.getElementById('searchMessage');
    if (messageElement) {
        messageElement.textContent = text;
    }
}

function performSearch() {
    if (!catalog) {
        setSearchMessage('Каталог завантажується, зачекайте...');
        return;
    }
    currentSearchValue = document.getElementById('searchInput').value.trim();
    applyFilters();
} 
 
function loadCatalog(items) { 
    const itemsContainer = document.querySelector('.items'); 
    itemsContainer.replaceChildren();

    if (items.length === 0) {
        setSearchMessage('Товар не знайдено');
    } else {
        setSearchMessage('');
    }

    updateItemCount(items.length);

    items.forEach(function (item) { 
        const metadata = getItemMetadata(item);

        const itemElement = document.createElement('div'); 
        itemElement.classList.add('item'); 
 
        const imgElement = document.createElement('img'); 
        imgElement.src = item.image; 
        imgElement.alt = ''; 
        imgElement.classList.add('item-img'); 
        itemElement.appendChild(imgElement); 
 
        const titleElement = document.createElement('h4'); 
        titleElement.classList.add('item_title'); 
        titleElement.id = item.id; 
        titleElement.textContent = item.name; 
        itemElement.appendChild(titleElement); 
 
        const descList = document.createElement('ul'); 
        descList.classList.add('item-desc-list'); 

        const details = [
            { label: 'Рік', value: metadata.year },
            { label: 'Жанр', value: metadata.genre },
            { label: 'Платформа', value: metadata.platform }
        ];

        details.forEach(function (detail) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<span class="item-desc-label">${detail.label}</span><span class="item-desc-value">${detail.value}</span>`;
            descList.appendChild(listItem);
        });

        itemElement.appendChild(descList);

        const footerElement = document.createElement('div');
        footerElement.classList.add('item-footer');

        const buttonElement = document.createElement('a'); 
        buttonElement.href = item.orderLink; 
        if (item.newPrice == null) { 
            buttonElement.classList.add('item_button'); 
            buttonElement.textContent = item.price + ' грн'; 
        } else { 
            buttonElement.classList.add('item-button-mod'); 
            const price = document.createElement('span'); 
            price.classList.add('item-button-span-white'); 
            price.textContent = item.price + ' грн'; 
            const newPrice = document.createElement('span'); 
            newPrice.textContent = item.newPrice + ' грн'; 
 
            buttonElement.appendChild(price); 
            buttonElement.appendChild(newPrice); 
        } 
 
        buttonElement.addEventListener('click', function (event) { 
            event.preventDefault(); 
            addToCart(item); 
        }); 

        footerElement.appendChild(buttonElement);
        itemElement.appendChild(footerElement);
        itemsContainer.appendChild(itemElement); 
    }); 
} 
 
function addToCart(item) { 
    let cart = JSON.parse(localStorage.getItem('cart')) || []; 
    const existingItem = cart.find((cartItem) => cartItem.id === item.id); 
    if (existingItem) { 
        existingItem.count += 1; 
    } else { 
        item.count = 1; 
        cart.push(item); 
    } 
    localStorage.setItem('cart', JSON.stringify(cart)); 
    showAddToCartNotification();
} 

function showAddToCartNotification() {
    const notification = document.getElementById('addToCartNotification');
    if (!notification) return;
    
    notification.textContent = 'Товар додано до кошику!';
    notification.style.display = 'block';
    
    setTimeout(function () {
        notification.style.display = 'none';
    }, 2000);
}

function applyFilters() {
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');

    minPrice = parseFloat(minPriceInput.value) || 0;
    maxPrice = parseFloat(maxPriceInput.value) || Infinity;

    let filteredCatalog = catalog.filter(item => {
        const itemPrice = item.newPrice !== null ? item.newPrice : item.price;
        const matchesPrice = itemPrice >= minPrice && itemPrice <= maxPrice;

        const matchesSearch = currentSearchValue === '' || item.name.toLowerCase().includes(currentSearchValue.toLowerCase());

        return matchesPrice && matchesSearch;
    });

    loadCatalog(filteredCatalog);
}

function updateItemCount(count) {
    const itemCountElement = document.getElementById('itemCount');
    if (itemCountElement) {
        itemCountElement.textContent = `Знайдено товарів: ${count}`;
    }
}

window.applyFilters = applyFilters; // Make applyFilters accessible globally