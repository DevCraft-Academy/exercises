// Basisinterface für Zahlungsmethoden
class PaymentMethod {
  processPayment(amount) {
    throw new Error("Method 'processPayment()' must be implemented.");
  }
}

// Konkrete Zahlungsmethoden
class PayPal extends PaymentMethod {
  processPayment(amount) {
    console.log(`Bezahlt ${amount} mit PayPal.`);
  }
}

class CreditCard extends PaymentMethod {
  processPayment(amount) {
    console.log(`Bezahlt ${amount} mit Kreditkarte.`);
  }
}

class BankTransfer extends PaymentMethod {
  processPayment(amount) {
    console.log(`Bezahlt ${amount} mit Banküberweisung.`);
  }
}

class PaymentMethodFactory {
  static createPaymentMethod(type) {
    switch (type) {
      case "PayPal":
        return new PayPal();
      case "CreditCard":
        return new CreditCard();
      case "BankTransfer":
        return new BankTransfer();
      default:
        throw new Error("Unbekannte Zahlungsmethode.");
    }
  }
}

const paymentMethod = PaymentMethodFactory.createPaymentMethod("PayPal");
paymentMethod.processPayment(100); 

const anotherPaymentMethod = PaymentMethodFactory.createPaymentMethod("CreditCard");
anotherPaymentMethod.processPayment(200);

const thirdPaymentMethod = PaymentMethodFactory.createPaymentMethod("BankTransfer");
thirdPaymentMethod.processPayment(300);