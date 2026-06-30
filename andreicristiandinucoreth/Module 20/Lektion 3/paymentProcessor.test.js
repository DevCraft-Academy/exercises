const { PaymentProcessor } = require("./paymentProcessor");

describe("PaymentProcessor", () => {
  describe("processPayment()", () => {
    test("processes payment successfully", async () => {
      // Arrange:
      const fakeStripe = {
        charges: {
          create: jest.fn().mockResolvedValue({
            id: "ch_123",
            amount: 5000,
            status: "succeeded",
          }),
        },
      };
      const paymentProcessor = new PaymentProcessor(fakeStripe);
      const paymentData = {
        amount: 5000,
        token: "tok_visa",
        description: "Test payment",
      };

      // Act:
      const result = await paymentProcessor.processPayment(paymentData);

      // Assert:
      expect(result.success).toBe(true);
      expect(result.chargeId).toBe("ch_123");
      expect(result.amount).toBe(5000);
      expect(result.status).toBe("succeeded");
      expect(fakeStripe.charges.create).toHaveBeenCalledWith({
        amount: paymentData.amount,
        currency: "EUR",
        source: paymentData.token,
        description: paymentData.description,
      });
    });

    test("throws error for invalid amount", async () => {
      const fakeStripe = {
        charges: {
          create: jest.fn(),
        },
      };
      const paymentProcessor = new PaymentProcessor(fakeStripe);
      const paymentData = {
        amount: -100,
        token: "tok_visa",
        description: "Test payment",
      };

      await expect(
        paymentProcessor.processPayment(paymentData),
      ).rejects.toThrow("Invalid amount");
    });

    test("throws error for missing token", async () => {
      const fakeStripe = {
        charges: {
          create: jest.fn(),
        },
      };
      const paymentProcessor = new PaymentProcessor(fakeStripe);
      const paymentData = {
        amount: 5000,
        description: "Test payment",
      };

      await expect(
        paymentProcessor.processPayment(paymentData),
      ).rejects.toThrow("Payment token required");
    });

    test("handles declined card error", async () => {
      const fakeStripe = {
        charges: {
          create: jest
            .fn()
            .mockRejectedValue(new Error("Your card was declined")),
        },
      };
      const paymentProcessor = new PaymentProcessor(fakeStripe);
      const paymentData = {
        amount: 5000,
        token: "tok_visa",
        description: "Test payment",
      };

      const result = await paymentProcessor.processPayment(paymentData);

      expect(result.success).toBe(false);
      expect(result.error).toBe("Your card was declined");
    });

    test("handles Stripe API error", async () => {
      const fakeStripe = {
        charges: {
          create: jest.fn().mockRejectedValue(new Error("Stripe API error")),
        },
      };
      const paymentProcessor = new PaymentProcessor(fakeStripe);
      const paymentData = {
        amount: 5000,
        token: "tok_visa",
        description: "Test payment",
      };

      const result = await paymentProcessor.processPayment(paymentData);

      expect(result.success).toBe(false);
      expect(result.error).toBe("Stripe API error");
    });
  });

  describe("refundPayment()", () => {
    test("should successfully refund a payment", async () => {
      const fakeStripe = {
        refunds: {
          create: jest.fn().mockResolvedValue({
            id: "re_123",
            status: "succeeded",
          }),
        },
      };
      const paymentProcessor = new PaymentProcessor(fakeStripe);
      const chargeId = "ch_123";

      const result = await paymentProcessor.refundPayment(chargeId);

      expect(result.success).toBe(true);
      expect(result.refundId).toBe("re_123");
      expect(result.status).toBe("succeeded");
      expect(fakeStripe.refunds.create).toHaveBeenCalledWith({
        charge: chargeId,
      });
    });

    test("throws error for missing charge ID", async () => {
      const fakeStripe = {
        refunds: {
          create: jest.fn(),
        },
      };
      const paymentProcessor = new PaymentProcessor(fakeStripe);
      const chargeId = null;

      await expect(paymentProcessor.refundPayment(chargeId)).rejects.toThrow(
        "Charge ID required",
      );
    });

    test("handles refund error (e.g. 'Already refunded')", async () => {
      const fakeStripe = {
        refunds: {
          create: jest.fn().mockRejectedValue(new Error("Already refunded")),
        },
      };
      const paymentProcessor = new PaymentProcessor(fakeStripe);
      const chargeId = "ch_123";

      const result = await paymentProcessor.refundPayment(chargeId);

      expect(result.success).toBe(false);
      expect(result.error).toBe("Already refunded");
    });
  });
});
