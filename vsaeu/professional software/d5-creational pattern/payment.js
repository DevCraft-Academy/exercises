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
    // Implementiere die spezifische Logik für PayPal-Zahlung
  }
}

// Füge hier weitere spezifische Zahlungsmethoden hinzu
class EC extends PaymentMethod {
  processPayment(amount) {
    console.log(`Bezahlt ${amount} mit EC-Karte.`);
    // Implementiere die spezifische Logik für EC-Karten-Zahlung
  }
}

class CreditCard extends PaymentMethod {
  processPayment(amount) {
    console.log(`Bezahlt ${amount} mit Kreditkarte.`);
    // Implementiere die spezifische Logik für Kreditkartenzahlung
  }
}

// Füge die notwendigen Klassen deines Patters hinzu
class PamaymentFactory {
  static createPaymentMethod(type) {
    switch (type) {
      case "PayPal":
        return new PayPal();
      case "EC":
        return new EC();
      case "CreditCard":
        return new CreditCard();
      default:
        throw new Error("Unbekannte Zahlungsmethode");
    }
  }
}

const payPalMethod = PamaymentFactory.createPaymentMethod("PayPal");
payPalMethod.processPayment(100);

const ecMethod = PamaymentFactory.createPaymentMethod("EC");
ecMethod.processPayment(50);

const creditCardMethod = PamaymentFactory.createPaymentMethod("CreditCard");
creditCardMethod.processPayment(200);

// Verwende deine Lösung, um eine Zahlungsmethode zu erstellen und zu verwenden
