import { PaymentMethod } from './PaymentMethod.js';
import { PayPal } from './PaymentMethod.js';
import { CreditCard } from './PaymentMethod.js';
import { BankTransfer } from './PaymentMethod.js';
import { PaymentMethodFactory } from './PaymentMethod.js';


function processOrder(factory, amount) {
  const paymentMethod = factory.createPaymentMethod();
  const confirmation = paymentMethod.processPayment(amount);
  console.log(confirmation);
}

// Verwendung des Factory Method-Patterns
const paypalConfirmation = PaymentMethodFactory.createPaymentMethod('paypal');
paypalConfirmation.processPayment("15");

const creditcardConfirmation = PaymentMethodFactory.createPaymentMethod('cc');
creditcardConfirmation.processPayment("20");

const banktransferConfirmation = PaymentMethodFactory.createPaymentMethod('bt');
banktransferConfirmation.processPayment("25");


