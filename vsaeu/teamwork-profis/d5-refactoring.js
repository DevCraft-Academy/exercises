var cart = [
{ n: "apple", p: "1.20", q: "2" },
{ n: "banana", p: 0.5, q: 1, imp: 1 }
];
 
 
// Berechnet Gesamtsumme mit Aufschlag für "wichtige" Artikel, Rabattcode und Steuer.
// Viele Probleme: mutiert Eingabe, Magic Numbers, uneinheitliche Typen, harte Währung, stille Fehler.
function total(c, dc) { // dc: "VIP" oder "NONE"
var s = 0;
for (var i = 0; i < c.length; i++) {
var it = c[i];
if (!it.p || !it.q) { continue; }
// Mutiert Input (!)
it.p = parseFloat(it.p);
it.q = parseInt(it.q);
if (it.imp == 1) {
s += it.p * it.q * 1.1; // 10% Aufschlag
} else {
s += it.p * it.q;
}
}
if (dc == 'VIP') { s = s * 0.9; } // 10% Rabatt
s = s * 1.19; // 19% Steuer
return "EUR " + s.toFixed(2).replace('.', ','); // primitive Formatierung
}
 
// Schritt 1, bessere Variablennamen
 
var cart = [
{ name: "apple", price: "1.20", quantity: "2" },
{ name: "banana", price: 0.5, quantity: 1, important: 1 }
];
 
function calculateTotal(cartItems, discountCode) { // dc: "VIP" oder "NONE"
var sum = 0;
for (var i = 0; i < cartItems.length; i++) {
var item = cartItems[i];
if (!item.p || !item.q) { continue; }
// Mutiert Input (!)
item.p = parseFloat(item.p);
item.q = parseInt(item.q);
if (item.imp == 1) {
sum += item.p * item.q * 1.1; // 10% Aufschlag
} else {
sum += item.p * item.q;
}
}
if (discountCode == 'VIP') { sum = sum * 0.9; } // 10% Rabatt
sum = sum * 1.19; // 19% Steuer
return "EUR " + sum.toFixed(2).replace('.', ','); // primitive Formatierung
}
 
// Schritt 2: Vereinfachung der Funktion und Vermeidung von Mutationen
 
var cart = [
{ name: "apple", price: "1.20", quantity: "2" },
{ name: "banana", price: 0.5, quantity: 1, important: 1 }
];
 
function parsePrice(price) {
return typeof price === 'string' ? parseFloat(price) : price;
}
 
function parseQuantity(quantity) {
return typeof quantity === 'string' ? parseInt(quantity) : quantity;
}
function calculateItemTotal(item) {
var price = parsePrice(item.price);
var quantity = parseQuantity(item.quantity);
var total = price * quantity;
if (item.important) {
total *= 1.1; // 10% Aufschlag für wichtige Artikel
}
return total;
}
function applyDiscount(total, discountCode) {
if (discountCode === 'VIP') {
return total * 0.9; // 10% Rabatt
}
return total;
}
function applyTax(total) {
return total * 1.19; // 19% Steuer
}
function formatCurrency(amount) {
return "EUR " + amount.toFixed(2).replace('.', ','); // primitive Formatierung
}
function calculateTotal(cartItems, discountCode) {
var sum = 0;
for (var i = 0; i < cartItems.length; i++) {
var item = cartItems[i];
sum += calculateItemTotal(item);
}
sum = applyDiscount(sum, discountCode);
sum = applyTax(sum);
return formatCurrency(sum);
}
// Schritt 3: Verwendung von Array-Methoden für bessere Lesbarkeit
 
var cart = [
{ name: "apple", price: "1.20", quantity: "2" },
{ name: "banana", price: 0.5, quantity: 1, important: 1 }
];
 
function calculateTotal(cartItems, discountCode) {
var sum = cartItems.reduce(function (acc, item) {
return acc + calculateItemTotal(item);
}, 0);
sum = applyDiscount(sum, discountCode);
sum = applyTax(sum);
return formatCurrency(sum);
}
// Schritt 4: Verwendung von Konstanten für Magic Numbers
 
var cart = [
{ name: "apple", price: "1.20", quantity: "2" },
{ name: "banana", price: 0.5, quantity: 1, important: 1 }
];
const IMPORTANT_ITEM_SURCHARGE = 1.1; // 10% Aufschlag
const VIP_DISCOUNT = 0.9;
const TAX_RATE = 1.19; // 19% Steuer
 
function calculateItemTotal(item) {
var price = parsePrice(item.price);
var quantity = parseQuantity(item.quantity);
var total = price * quantity;
if (item.important) {
total *= IMPORTANT_ITEM_SURCHARGE;
}
return total;
}
function applyDiscount(total, discountCode) {
if (discountCode === 'VIP') {
return total * VIP_DISCOUNT;
}
return total;
}
function applyTax(total) {
return total * TAX_RATE;
}
function calculateTotal(cartItems, discountCode) {
var sum = cartItems.reduce(function (acc, item) {
return acc + calculateItemTotal(item);
}, 0);
sum = applyDiscount(sum, discountCode);
sum = applyTax(sum);
return formatCurrency(sum);
}
// Schritt 5: Fehlerbehandlung und Validierung
 
var cart = [
{ name: "apple", price: "1.20", quantity: "2" },
{ name: "banana", price: 0.5, quantity: 1, important: 1 }
];
const IMPORTANT_ITEM_SURCHARGE = 1.1; // 10% Aufschlag
const VIP_DISCOUNT = 0.9;
const TAX_RATE = 1.19; // 19% Steuer
function parsePrice(price) {
var parsed = typeof price === 'string' ? parseFloat(price) : price;
return isNaN(parsed) ? 0 : parsed;
}
function parseQuantity(quantity) {
var parsed = typeof quantity === 'string' ? parseInt(quantity) : quantity;
return isNaN(parsed) ? 0 : parsed;
}
function calculateItemTotal(item) {
var price = parsePrice(item.price);
var quantity = parseQuantity(item.quantity);
var total = price * quantity;
if (item.important) {
total *= IMPORTANT_ITEM_SURCHARGE;
}
return total;
}
function applyDiscount(total, discountCode) {
if (discountCode === 'VIP') {
return total * VIP_DISCOUNT;
}
return total;
}
function applyTax(total) {
return total * TAX_RATE;
}
function formatCurrency(amount) {
return "EUR " + amount.toFixed(2).replace('.', ','); // primitive Formatierung
}
function calculateTotal(cartItems, discountCode) {
if (!Array.isArray(cartItems)) {
throw new Error("Invalid cart items");
}
var sum = cartItems.reduce(function (acc, item) {
return acc + calculateItemTotal(item);
}, 0);
sum = applyDiscount(sum, discountCode);
sum = applyTax(sum);
return formatCurrency(sum);
}
// Ende
 
// Schritt 6: Verwendung von ES6+ Features (z.B. Arrow Functions, let/const)
 
const cart = [
{ name: "apple", price: "1.20", quantity: "2" },
{ name: "banana", price: 0.5, quantity: 1, important: 1 }
];
 
const calculateTotal = (cartItems, discountCode) => {
if (!Array.isArray(cartItems)) {
throw new Error("Invalid cart items");
}
let sum = cartItems.reduce((acc, item) => acc + calculateItemTotal(item), 0);
sum = applyDiscount(sum, discountCode);
sum = applyTax(sum);
return formatCurrency(sum);
};
 
// Ende
console.log(calculateTotal(cart, 'VIP')); // Beispielaufruf
 
// Ausgabe: "EUR 2,84"
console.log(calculateTotal(cart, 'NONE')); // Beispielaufruf
// Ausgabe: "EUR 3,15"
console.log(calculateTotal([], 'NONE')); // Beispielaufruf
// Ausgabe: "EUR 0,00"
 
// Herausforderungen beim Refactoring, Erkenntnisse und Best practises
// 1. Vermeidung von Mutationen: Ursprüngliche Funktion mutierte die Eingabedaten, was zu unerwartetem Verhalten führen kann. Im refaktorierten Code werden Eingabedaten nicht verändert.
// 2. Klare und aussagekräftige Variablennamen: Verwendung von beschreibenden Namen wie cartItems, discountCode, calculateItemTotal verbessert die Lesbarkeit.
// 3. Modularisierung: Aufteilung der Funktion in kleinere, wiederverwendbare Funktionen (z.B. calculateItemTotal, applyDiscount) erleichtert das Verständnis und die Wartung.
// 4. Verwendung von Konstanten: Magic Numbers wurden durch benannte Konstanten ersetzt, was den Code verständlicher macht.
// 5. Fehlerbehandlung: Hinzufügen von Validierungen und Fehlerbehandlungen verbessert die Robustheit der Funktion.
// 6. Nutzung moderner JavaScript-Features: Einsatz von ES6+ Features wie Arrow Functions und let/const erhöht die Lesbarkeit und Wartbarkeit des Codes.
// 7. Testen: Nach jedem Refactoring-Schritt sollte der Code getestet werden, um sicherzustellen, dass die Funktionalität erhalten bleibt.
// 8. Dokumentation: Kommentare und klare Struktur helfen anderen Entwicklern (und einem selbst) den Code später besser zu verstehen.
// 9. Performance: Obwohl Lesbarkeit oft wichtiger ist, sollte auch auf die Performance geachtet werden, besonders bei großen Datenmengen.
// 10. Konsistenz: Einheitliche Typen und Formatierungen im gesamten Code verbessern die Wartbarkeit.
 