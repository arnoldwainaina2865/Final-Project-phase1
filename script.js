const currencyData = {
    USD: { name: "United States Dollar", flag: "us", symbol: "$" },
    EUR: { name: "Euro", flag: "eu", symbol: "€" },
    GBP: { name: "British Pound", flag: "gb", symbol: "£" },
    JPY: { name: "Japanese Yen", flag: "jp", symbol: "¥" },
    CAD: { name: "Canadian Dollar", flag: "ca", symbol: "CA$" },
    AUD: { name: "Australian Dollar", flag: "au", symbol: "A$" },
    CHF: { name: "Swiss Franc", flag: "ch", symbol: "CHF" },
    CNY: { name: "Chinese Yuan", flag: "cn", symbol: "¥" },
    INR: { name: "Indian Rupee", flag: "in", symbol: "₹" },
    KES: { name: "Kenyan Shilling", flag: "ke", symbol: "KSh" },
    BRL: { name: "Brazilian Real", flag: "br", symbol: "R$" },
   
};

const exchangeRates = {
    USD: 1.0,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149.50,
    CAD: 1.35,
    AUD: 1.52,
    CHF: 0.88,
    CNY: 7.15,
    INR: 83.20,
    KES: 129.50,
    BRL: 4.95,
   
};

// Static market trends data
const staticMarketTrends = [
    { currency: 'USD', change: 0.15, isPositive: true },
    { currency: 'EUR', change: -0.10, isPositive: false },
    { currency: 'GBP', change: 0.05, isPositive: true },
    { currency: 'JPY', change: -0.08, isPositive: false },
    { currency: 'CAD', change: 0.12, isPositive: true },
    { currency: 'KES', change: 0.72, isPositive: true },
    { currency: 'INR', change: 0.92, isPositive: true },
    { currency: 'BRL', change: 0.92, isPositive: true },
];

const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const convertBtn = document.getElementById('convertBtn');
const resultDisplay = document.getElementById('result');
const swapBtn = document.getElementById('swapCurrencies');
const currencyTrendsContainer = document.getElementById('currencyTrends');

let fromCurrencyChart = null;
let toCurrencyChart = null;

function populateCurrencyDropdowns() {
    Object.keys(currencyData).forEach(currency => {
        const fromOption = createCurrencyOption(currency);
        const toOption = createCurrencyOption(currency);
        
        fromCurrencySelect.appendChild(fromOption);
        toCurrencySelect.appendChild(toOption);
    });

    fromCurrencySelect.value = 'USD';
    toCurrencySelect.value = 'EUR';

    fromCurrencySelect.addEventListener('change', updateCurrencyCharts);
    toCurrencySelect.addEventListener('change', updateCurrencyCharts);
}

function convertCurrency() {
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;
    const amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
        resultDisplay.innerHTML = `
            <span class="conversion-text">Please enter a valid amount</span>
            <span class="conversion-amount">--</span>
        `;
        return;
    }

    try {
        const convertedAmount = (amount / exchangeRates[fromCurrency]) * exchangeRates[toCurrency];
        
        resultDisplay.innerHTML = `
            <span class="conversion-text">${amount.toFixed(2)} ${fromCurrency} = </span>
            <span class="conversion-amount">${convertedAmount.toFixed(2)} ${toCurrency}</span>
        `;

        updateCurrencyCharts();
    } catch (error) {
        resultDisplay.innerHTML = `
            <span class="conversion-text">Conversion error</span>
            <span class="conversion-amount">--</span>
        `;
        console.error(error);
    }
}

function swapCurrencies() {
    const temp = fromCurrencySelect.value;
    fromCurrencySelect.value = toCurrencySelect.value;
    toCurrencySelect.value = temp;
    
    convertCurrency();
}

function createStaticCurrencyTrendCards() {
    staticMarketTrends.forEach(trend => {
        const trendCard = document.createElement('div');
        trendCard.classList.add('trend-card', 'mb-3', 'p-2', 'rounded');
        
        trendCard.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                    <img src="https://flagcdn.com/w40/${currencyData[trend.currency].flag}.png" class="me-2" style="width: 30px;">
                    <strong>${trend.currency}</strong>
                </div>
                <div class="text-end">
                    <span class="badge ${trend.isPositive ? 'bg-success' : 'bg-danger'}">
                        ${trend.isPositive ? '▲' : '▼'} ${Math.abs(trend.change).toFixed(2)}%
                    </span>
                </div>
            </div>
        `;
        
        currencyTrendsContainer.appendChild(trendCard);
    });
}

function updateCurrencyCharts() {
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (fromCurrencyChart) fromCurrencyChart.destroy();
    if (toCurrencyChart) toCurrencyChart.destroy();

    const fromCtx = document.getElementById('fromCurrencyChart').getContext('2d');
    fromCurrencyChart = new Chart(fromCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: `${fromCurrency} Yearly Trend`,
                data: generateStaticChartData(),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: `${fromCurrency} Exchange Rate Trend`
                }
            }
        }
    });
    
}

