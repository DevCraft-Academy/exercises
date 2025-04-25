+-------------------+
| PaymentMethod     |  <--- Abstrakte Basisklasse
|-------------------|
| + processPayment()|
+-------------------+
          ^
          |
+-------------------+       +-------------------+       +-------------------+
| PayPal            |       | CreditCard        |       | BankTransfer      |
|-------------------|       |-------------------|       |-------------------|
| + processPayment()|       | + processPayment()|       | + processPayment()|
+-------------------+       +-------------------+       +-------------------+

+-------------------+
| PaymentFactory    |  <--- Factory-Klasse
|-------------------|
| + createPayment() |
+-------------------+

//Basisklasse
class PaymentMethod {
  processPayment(amount) {
    throw new Error("Method 'processPayment()' must be implemented.");
  }
}

//Zahlungsmethoden
class PayPal extends PaymentMethod {
  processPayment(amount) {
    console.log(`Bezahlt ${amount} mit PayPal.`);
    return `PayPal-Zahlung von ${amount} erfolgreich.`;
  }
}

class CreditCard extends PaymentMethod {
  processPayment(amount) {
    console.log(`Bezahlt ${amount} mit Kreditkarte.`);
    return `Kreditkartenzahlung von ${amount} erfolgreich.`;
  }
}

class BankTransfer extends PaymentMethod {
  processPayment(amount) {
    console.log(`Bezahlt ${amount} mit Banküberweisung.`);
    return `Banküberweisung von ${amount} erfolgreich.`;
  }
}

// Factory-Klasse
class PaymentFactory {
  static createPayment(type) {
    switch (type) {
      case "PayPal":
        return new PayPal();
      case "CreditCard":
        return new CreditCard();
      case "BankTransfer":
        return new BankTransfer();
      default:
        throw new Error(`Zahlungsmethode ${type} nicht unterstützt.`);
    }
  }
}

// Beispielnutzung
function processOrder(paymentType, amount) {
  try {
    const paymentMethod = PaymentFactory.createPayment(paymentType);
    const confirmation = paymentMethod.processPayment(amount);
    console.log(confirmation);
  } catch (error) {
    console.error(error.message);
  }
}

// Testfälle
processOrder("PayPal", 100);
processOrder("CreditCard", 200); 
processOrder("BankTransfer", 300); 
processOrder("Bitcoin", 400); 
