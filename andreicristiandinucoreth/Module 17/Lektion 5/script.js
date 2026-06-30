// Basisinterface oder -klasse für Zahlungsmethoden
class PaymentMethod {
  processPayment(amount) {
    throw new Error("Method 'processPayment()' must be implemented.");
  }
}

// Konkrete Zahlungsmethoden implementieren das PaymentMethod-Interface
class PayPal extends PaymentMethod {
  processPayment(amount) {
    console.log(`Bezahlt ${amount} mit PayPal.`);
  }
}

// Füge hier weitere spezifische Zahlungsmethoden hinzu
class Klarna extends PaymentMethod {
  processPayment(amount) {
    console.log(`Bezahlt ${amount} mit Klarna.`);
  }
}

class CreditCard extends PaymentMethod {
  processPayment(amount) {
    console.log(`Bezahlt ${amount} mit Kreditkarte.`);
  }
}

class BankTransfer extends PaymentMethod {
  processPayment(amount) {
    console.log(`Bezahlt ${amount} per Banküberweisung.`);
  }
}

// Füge die notwendigen Klassen deines Patterns hinzu

class PaymentMethodFactory {
  static createPaymentMethod(type) {
    switch (type) {
      case "PayPal":
        return new PayPal();
      case "Klarna":
        return new Klarna();
      case "CreditCard":
        return new CreditCard();
      case "BankTransfer":
        return new BankTransfer();
      default:
        throw new Error(`Zahlungsmethode ${type} nicht unterstützt.`);
    }
  }
}

// Verwende deine Lösung, um eine Zahlungsmethode zu erstellen und zu verwenden
const paymentMethod1 = PaymentMethodFactory.createPaymentMethod("PayPal");
paymentMethod1.processPayment(100);
const paymentMethod2 = PaymentMethodFactory.createPaymentMethod("Klarna");
paymentMethod2.processPayment(200);
const paymentMethod3 = PaymentMethodFactory.createPaymentMethod("CreditCard");
paymentMethod3.processPayment(300);
const paymentMethod4 = PaymentMethodFactory.createPaymentMethod("BankTransfer");
paymentMethod4.processPayment(400);
