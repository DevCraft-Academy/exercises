
// Schritt 1: Basisklasse/Interface für alle Zahlungsmethoden
class PaymentMethod {
  processPayment(amount) {
    throw new Error("Method 'processPayment()' must be implemented by subclass.");
  }
  
  getName() {
    throw new Error("Method 'getName()' must be implemented by subclass.");
  }
}

// Schritt 2: Konkrete Implementierungen der verschiedenen Zahlungsmethoden

class PayPal extends PaymentMethod {
  constructor() {
    super();
    this.name = 'PayPal';
  }
  
  processPayment(amount) {
    return `Erfolgreich ${amount}€ mit PayPal bezahlt. Transaktions-ID: PP-${this.generateTransactionId()}`;
  }
  
  getName() {
    return this.name;
  }
  
  generateTransactionId() {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
  }
}

class CreditCard extends PaymentMethod {
  constructor() {
    super();
    this.name = 'Kreditkarte';
  }
  
  processPayment(amount) {
    return `Erfolgreich ${amount}€ mit Kreditkarte bezahlt. Referenz-Nr: CC-${this.generateTransactionId()}`;
  }
  
  getName() {
    return this.name;
  }
  
  generateTransactionId() {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
  }
}

class BankTransfer extends PaymentMethod {
  constructor() {
    super();
    this.name = 'Banküberweisung';
  }
  
  processPayment(amount) {
    return `Erfolgreich ${amount}€ per Banküberweisung bezahlt. IBAN-Ref: BT-${this.generateTransactionId()}`;
  }
  
  getName() {
    return this.name;
  }
  
  generateTransactionId() {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
  }
}

// Schritt 3: Factory-Klasse - Das Herzstück des Factory Patterns
class PaymentMethodFactory {
  // Statische Methode zur Erstellung von Zahlungsmethoden
  static createPaymentMethod(type) {
    switch (type.toLowerCase()) {
      case 'paypal':
        return new PayPal();
      case 'creditcard':
      case 'kreditkarte':
        return new CreditCard();
      case 'banktransfer':
      case 'banküberweisung':
        return new BankTransfer();
      default:
        throw new Error(`Zahlungsmethode '${type}' wird nicht unterstützt. Verfügbare Optionen: ${this.getSupportedTypes().join(', ')}`);
    }
  }
  
  // Hilfsmethode: Zeigt alle verfügbaren Zahlungsmethoden
  static getSupportedTypes() {
    return ['paypal', 'creditcard', 'banktransfer'];
  }
  
  // Hilfsmethode: Überprüft ob eine Zahlungsmethode unterstützt wird
  static isSupported(type) {
    return this.getSupportedTypes().includes(type.toLowerCase());
  }
}

// Schritt 4: Beispielverwendung und Demonstration des Systems

console.log('=== Factory Pattern für Zahlungsmethoden - Demo ===\n');

// Verschiedene Zahlungsmethoden erstellen und verwenden
try {
  console.log('1. Verfügbare Zahlungsmethoden:');
  console.log(PaymentMethodFactory.getSupportedTypes().join(', ') + '\n');
  
  // PayPal Zahlung
  console.log('2. PayPal Zahlung:');
  const paypalPayment = PaymentMethodFactory.createPaymentMethod('paypal');
  console.log(`   Methode: ${paypalPayment.getName()}`);
  console.log(`   ${paypalPayment.processPayment(29.99)}\n`);
  
  // Kreditkarten Zahlung
  console.log('3. Kreditkarten Zahlung:');
  const creditCardPayment = PaymentMethodFactory.createPaymentMethod('creditcard');
  console.log(`   Methode: ${creditCardPayment.getName()}`);
  console.log(`   ${creditCardPayment.processPayment(149.50)}\n`);
  
  // Banküberweisung
  console.log('4. Banküberweisung:');
  const bankTransferPayment = PaymentMethodFactory.createPaymentMethod('banktransfer');
  console.log(`   Methode: ${bankTransferPayment.getName()}`);
  console.log(`   ${bankTransferPayment.processPayment(75.25)}\n`);
  
  // Demonstration der einfachen Erweiterbarkeit
  console.log('5. Fehlerbehandlung - Nicht unterstützte Zahlungsmethode:');
  PaymentMethodFactory.createPaymentMethod('bitcoin'); // Wird einen Fehler werfen
  
} catch (error) {
  console.log(`   Fehler: ${error.message}\n`);
}

// Schritt 5: Praktische Anwendung - Online Shop Checkout Simulation
console.log('=== Online Shop Checkout Simulation ===\n');

class ShoppingCart {
  constructor() {
    this.items = [];
    this.total = 0;
  }
  
  addItem(name, price) {
    this.items.push({ name, price });
    this.total += price;
  }
  
  checkout(paymentType) {
    if (this.items.length === 0) {
      return 'Warenkorb ist leer!';
    }
    
    try {
      const paymentMethod = PaymentMethodFactory.createPaymentMethod(paymentType);
      console.log(`Warenkorb Inhalt: ${this.items.map(item => item.name).join(', ')}`);
      console.log(`Gesamtbetrag: ${this.total}€`);
      console.log(`Gewählte Zahlungsmethode: ${paymentMethod.getName()}`);
      
      const result = paymentMethod.processPayment(this.total);
      this.items = []; // Warenkorb leeren
      this.total = 0;
      
      return result;
    } catch (error) {
      return `Checkout fehlgeschlagen: ${error.message}`;
    }
  }
}

// Checkout Demo
const cart = new ShoppingCart();
cart.addItem('JavaScript Buch', 39.99);
cart.addItem('VS Code Extension', 9.99);
cart.addItem('Online Kurs', 99.00);

console.log(cart.checkout('paypal'));

console.log('\n=== Vorteile des Factory Patterns ===');
console.log('✓ Neue Zahlungsmethoden lassen sich einfach hinzufügen');
console.log('✓ Client-Code muss nicht geändert werden');
console.log('✓ Objekterstellung ist zentralisiert und kontrolliert');
console.log('✓ Einheitliche Schnittstelle für alle Zahlungsmethoden');
console.log('✓ Lose Kopplung zwischen Client und konkreten Klassen'); 