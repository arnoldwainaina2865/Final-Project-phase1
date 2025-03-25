const exchangeRates = {
    "USD": 1.0,
    "EUR": 0.92,
    "GBP": 0.79,
    "JPY": 149.50,
    "CAD": 1.35,
    "AUD": 1.52,
    "CHF": 0.89,
    "CNY": 7.24,
    "INR": 83.20,
    "BRL": 5.02,
    "RUB": 91.50,
    "KRW": 1330.00,
    "SGD": 1.34,
    "MXN": 17.25,
    "SAR": 3.75,
    "KES": 127.50
};

const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const convertButton = document.querySelector('.convert-btn');
const resultDisplay = document.getElementById('result');

function populateCurrencyDropdowns() {
    const currencies = Object.keys(exchangeRates);
    
    currencies.forEach(currency => {
        const fromOption = document.createElement('option');
        fromOption.value = currency;
        fromOption.textContent = `${currency} - ${getCurrencyName(currency)}`;
        fromCurrencySelect.appendChild(fromOption);

        const toOption = document.createElement('option');
        toOption.value = currency;
        toOption.textContent = `${currency} - ${getCurrencyName(currency)}`;
        toCurrencySelect.appendChild(toOption);
    });

    fromCurrencySelect.value = 'USD';
    toCurrencySelect.value = 'EUR';
}

function getCurrencyName(currencyCode) {
    const currencyNames = {
        "USD": "United States Dollar",
        "EUR": "Euro",
        "GBP": "British Pound",
        "JPY": "Japanese Yen",
        "CAD": "Canadian Dollar",
        "AUD": "Australian Dollar",
        "CHF": "Swiss Franc",
        "CNY": "Chinese Yuan",
        "INR": "Indian Rupee",
        "BRL": "Brazilian Real",
        "RUB": "Russian Ruble",
        "KRW": "South Korean Won",
        "SGD": "Singapore Dollar",
        "MXN": "Mexican Peso",
        "SAR": "Saudi Riyal",
        "KES": "Kenyan Shilling"
    };
    return currencyNames[currencyCode] || currencyCode;
}

function convertCurrency() {
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;
    const amount = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
        resultDisplay.textContent = 'Please enter a valid amount';
        return;
    }

    try {
        const convertedAmount = (amount / exchangeRates[fromCurrency]) * exchangeRates[toCurrency];
        
        resultDisplay.textContent = `${amount.toFixed(2)} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    } catch (error) {
        resultDisplay.textContent = 'Conversion error. Please try again.';
        console.error(error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    populateCurrencyDropdowns();
});

convertButton.addEventListener('click', convertCurrency);

amountInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        convertCurrency();
    }
});