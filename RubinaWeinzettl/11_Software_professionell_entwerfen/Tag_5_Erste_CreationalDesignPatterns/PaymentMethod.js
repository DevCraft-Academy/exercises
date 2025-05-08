// Basisinterface für Zahlungsmethoden
export class PaymentMethod {
  processPayment(amount) {
    throw new Error("Method 'processPayment()' must be implemented.");
  }
}

// Konkrete Zahlungsmethoden
// PayPal Interface
export class PayPal extends PaymentMethod {
  processPayment(amount) {
    console.log(`Bezahlt ${amount} € mit PayPal.`);
  }
}

// Kreditkarten Interface
export class CreditCard extends PaymentMethod {
  processPayment(amount) {
    console.log(`Bezahlt ${amount} € mit Kreditkarte.`);
  }
}

// Banküberweisung Interface
export class BankTransfer extends PaymentMethod {
  processPayment(amount) {
    console.log(`Bezahlt ${amount} € per Banküberweisung.`);
  }
}

// Creator-Klasse mit der Factory Method
export class PaymentMethodFactory {
  static createPaymentMethod(type) {
    switch (type) {
      case 'paypal':
        return new PayPal();
      case 'cc':
        return new CreditCard();
      case 'bt':
        return new BankTransfer();
      default:
        throw new Error("Zahlung konnte nicht durchgeführt werden.");
    }
  }
}
