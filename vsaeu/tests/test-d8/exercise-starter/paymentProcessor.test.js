const { PaymentProcessor } = require('./paymentProcessor');

describe('PaymentProcessor', () => {
  describe('processPayment()', () => {
    test('processes payment successfully', async () => {
      // Arrange
      const fakeStripe = {
        charges: {
          create: jest.fn().mockResolvedValue({
            id: 'ch_123abc',
            amount: 2999,
            status: 'succeeded'
          })
        }
      };
      const processor = new PaymentProcessor(fakeStripe);

      // Act
      const result = await processor.processPayment({
        amount: 2999,
        token: 'tok_valid',
        currency: 'EUR',
        description: 'Test payment'
      });

      // Assert
      expect(result.success).toBe(true);
      expect(result.chargeId).toBe('ch_123abc');
      expect(result.amount).toBe(2999);
      expect(result.status).toBe('succeeded');
      expect(fakeStripe.charges.create).toHaveBeenCalledWith({
        amount: 2999,
        currency: 'EUR',
        source: 'tok_valid',
        description: 'Test payment'
      });
    });

    test('throws error for negative amount', async () => {
      // Arrange
      const fakeStripe = {
        charges: {
          create: jest.fn()
        }
      };
      const processor = new PaymentProcessor(fakeStripe);

      // Act & Assert
      await expect(
        processor.processPayment({
          amount: -100,
          token: 'tok_valid'
        })
      ).rejects.toThrow('Invalid amount');

      expect(fakeStripe.charges.create).not.toHaveBeenCalled();
    });

    test('throws error for zero amount', async () => {
      // Arrange
      const fakeStripe = {
        charges: {
          create: jest.fn()
        }
      };
      const processor = new PaymentProcessor(fakeStripe);

      // Act & Assert
      await expect(
        processor.processPayment({
          amount: 0,
          token: 'tok_valid'
        })
      ).rejects.toThrow('Invalid amount');

      expect(fakeStripe.charges.create).not.toHaveBeenCalled();
    });

    test('throws error for missing token', async () => {
      // Arrange
      const fakeStripe = {
        charges: {
          create: jest.fn()
        }
      };
      const processor = new PaymentProcessor(fakeStripe);

      // Act & Assert
      await expect(
        processor.processPayment({
          amount: 2999,
          token: ''
        })
      ).rejects.toThrow('Payment token required');

      expect(fakeStripe.charges.create).not.toHaveBeenCalled();
    });

    test('returns error object when card is declined', async () => {
      // Arrange
      const fakeStripe = {
        charges: {
          create: jest.fn().mockRejectedValue(
            new Error('Your card was declined')
          )
        }
      };
      const processor = new PaymentProcessor(fakeStripe);

      // Act
      const result = await processor.processPayment({
        amount: 2999,
        token: 'tok_declined',
        currency: 'EUR'
      });

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toBe('Your card was declined');
      expect(fakeStripe.charges.create).toHaveBeenCalled();
    });

    test('returns error object on network error', async () => {
      // Arrange
      const fakeStripe = {
        charges: {
          create: jest.fn().mockRejectedValue(
            new Error('Network timeout')
          )
        }
      };
      const processor = new PaymentProcessor(fakeStripe);

      // Act
      const result = await processor.processPayment({
        amount: 2999,
        token: 'tok_valid',
        currency: 'EUR'
      });

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toBe('Network timeout');
      expect(fakeStripe.charges.create).toHaveBeenCalled();
    });
  });

  describe('refundPayment()', () => {
    test('refunds payment successfully', async () => {
      // Arrange
      const fakeStripe = {
        refunds: {
          create: jest.fn().mockResolvedValue({
            id: 're_123abc',
            status: 'succeeded'
          })
        }
      };
      const processor = new PaymentProcessor(fakeStripe);

      // Act
      const result = await processor.refundPayment('ch_123abc');

      // Assert
      expect(result.success).toBe(true);
      expect(result.refundId).toBe('re_123abc');
      expect(result.status).toBe('succeeded');
      expect(fakeStripe.refunds.create).toHaveBeenCalledWith({
        charge: 'ch_123abc'
      });
    });

    test('throws error for missing charge ID', async () => {
      // Arrange
      const fakeStripe = {
        refunds: {
          create: jest.fn()
        }
      };
      const processor = new PaymentProcessor(fakeStripe);

      // Act & Assert
      await expect(
        processor.refundPayment('')
      ).rejects.toThrow('Charge ID required');

      expect(fakeStripe.refunds.create).not.toHaveBeenCalled();
    });

    test('returns error object when refund fails', async () => {
      // Arrange
      const fakeStripe = {
        refunds: {
          create: jest.fn().mockRejectedValue(
            new Error('Charge already refunded')
          )
        }
      };
      const processor = new PaymentProcessor(fakeStripe);

      // Act
      const result = await processor.refundPayment('ch_123abc');

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toBe('Charge already refunded');
      expect(fakeStripe.refunds.create).toHaveBeenCalled();
    });
  });
});
