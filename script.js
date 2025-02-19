const containerCards = document.querySelector('.container-cards');
const daynight = document.getElementById('daynight');
const searchInput = document.getElementById('search');
const regionSelect = document.getElementById('region-filter');
const body = document.body;
let allCountries = [];

// Dark mode sozlamasini tekshirish
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
    daynight.textContent = 'Light Mode';
} else {
    daynight.textContent = 'Dark Mode';
}

// API orqali davlatlarni olish
async function fetchAPI() {
    try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        allCountries = await res.json();
        generator(allCountries);
    } catch (error) {
        console.error("API yuklashda xatolik:", error);
    }
}

fetchAPI();

// Kartochkalarni yaratish funksiyasi
function generator(products) {
    containerCards.innerHTML = '';
    if (products.length === 0) {
        containerCards.innerHTML = '<p>Hech narsa topilmadi!!!</p>';
        return;
    }

    products.forEach(element => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${element.flags.svg}" alt="${element.name.common}">
            <h3>${element.name.common}</h3>
        `;
        containerCards.appendChild(card);
    });
}

// Dark Mode tugmachasini qo‘shish
daynight.addEventListener('click', () => {
    body.classList.toggle('dark');
    if (body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        daynight.textContent = 'Light Mode';
    } else {
        localStorage.setItem('theme', 'light');
        daynight.textContent = 'Dark Mode';
    }
});

// Qidirish funksiyasi
searchInput.addEventListener('input', () => {
    const searchText = searchInput.value.toLowerCase();
    const filteredCountries = allCountries.filter(country =>
        country.name.common.toLowerCase().includes(searchText)
    );
    generator(filteredCountries);
});

// Region bo‘yicha filterlash
regionSelect.addEventListener('change', () => {
    const selectedRegion = regionSelect.value;
    if (selectedRegion === 'all') {
        generator(allCountries);
    } else {
        const filteredCountries = allCountries.filter(country => country.region === selectedRegion);
        generator(filteredCountries);
    }
});
