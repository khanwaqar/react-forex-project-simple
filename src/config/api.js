export const heading = "currency converter"
export const API_DOMAIN = "https://api.apilayer.com/exchangerates_data/convert"
export const API_KEY = "GpkarUlIU5W1B6qVlc96GiWSVSPVVZZk"
export const endpointPath = (from, to, amount) =>
    `${API_DOMAIN}?amount=${amount}&from=${from}&to=${to}`;