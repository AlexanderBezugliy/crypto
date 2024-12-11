
// Формула для вычисления процента разницы между двумя ценами
export function percentDifference(a, b) {
    return +(100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2)
}

// Функция которая преобразует первую букву в заглавный регистр (Bitcoin) (Ethereum)
export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.substr(1);
}
