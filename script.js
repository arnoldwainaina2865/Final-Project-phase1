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