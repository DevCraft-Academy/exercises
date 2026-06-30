import { jest } from '@jest/globals';
import { BookingService } from './bookingService.js';
import { InMemoryDatabase } from './inMemoryDatabase.js';

describe('BookingService', () => {
  let service;
  let database;
  let paymentGateway;
  let emailService;
  let availabilityChecker;

  beforeEach(() => {
    // Test Double Strategy:
    // Database → Fake (InMemoryDatabase): Complex logic, needs real state management
    database = new InMemoryDatabase();

    // PaymentGateway → Mock (jest.fn()): Business-critical, must verify parameters
    // (correct amount: 400 not 4000!)
    paymentGateway = {
      charge: jest.fn().mockResolvedValue({ id: 'payment_123' }),
      refund: jest.fn().mockResolvedValue({ id: 'refund_123' })
    };

    // EmailService → Mock (jest.fn()): Verify emails are sent with correct content
    emailService = {
      send: jest.fn().mockResolvedValue({ success: true })
    };

    // AvailabilityChecker → Stub (jest.fn()): Only return value matters
    availabilityChecker = {
      check: jest.fn().mockResolvedValue(true)
    };

    service = new BookingService(
      paymentGateway,
      emailService,
      database,
      availabilityChecker
    );
  });

  describe('createBooking()', () => {
    test('succeeds with valid data', async () => {
      // Arrange
      const bookingData = {
        roomId: 'room_101',
        guestEmail: 'guest@example.com',
        checkIn: '2026-02-01',
        checkOut: '2026-02-05',
        amount: 400
      };

      // Act
      const booking = await service.createBooking(bookingData);

      // Assert
      expect(booking.id).toBeDefined();
      expect(booking.status).toBe('confirmed');
      expect(booking.roomId).toBe('room_101');
      expect(booking.guestEmail).toBe('guest@example.com');
      expect(booking.paymentId).toBe('payment_123');
    });

    test('verifies availability is checked', async () => {
      // Arrange
      const bookingData = {
        roomId: 'room_101',
        guestEmail: 'guest@example.com',
        checkIn: '2026-02-01',
        checkOut: '2026-02-05',
        amount: 400
      };

      // Act
      await service.createBooking(bookingData);

      // Assert
      expect(availabilityChecker.check).toHaveBeenCalledWith(
        'room_101',
        '2026-02-01',
        '2026-02-05'
      );
    });

    test('charges payment with correct amount', async () => {
      // Arrange
      const bookingData = {
        roomId: 'room_101',
        guestEmail: 'guest@example.com',
        checkIn: '2026-02-01',
        checkOut: '2026-02-05',
        amount: 400
      };

      // Act
      await service.createBooking(bookingData);

      // Assert - Mock verifies parameters!
      expect(paymentGateway.charge).toHaveBeenCalledWith({
        amount: 400,
        currency: 'EUR',
        description: 'Booking for room room_101'
      });
    });

    test('saves booking to database with correct data', async () => {
      // Arrange
      const bookingData = {
        roomId: 'room_101',
        guestEmail: 'guest@example.com',
        checkIn: '2026-02-01',
        checkOut: '2026-02-05',
        amount: 400
      };

      // Act
      const booking = await service.createBooking(bookingData);

      // Assert - Fake DB allows us to verify state
      const savedBooking = await database.bookings.findById(booking.id);
      expect(savedBooking.paymentId).toBe('payment_123');
      expect(savedBooking.status).toBe('confirmed');
      expect(savedBooking.roomId).toBe('room_101');
    });

    test('sends confirmation email', async () => {
      // Arrange
      const bookingData = {
        roomId: 'room_101',
        guestEmail: 'guest@example.com',
        checkIn: '2026-02-01',
        checkOut: '2026-02-05',
        amount: 400
      };

      // Act
      await service.createBooking(bookingData);

      // Assert - Mock verifies email was sent
      expect(emailService.send).toHaveBeenCalled();
      expect(emailService.send).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'guest@example.com',
          subject: 'Booking Confirmation',
          text: expect.stringContaining('room_101')
        })
      );
    });

    test('throws error when room not available', async () => {
      // Arrange
      availabilityChecker.check.mockResolvedValue(false);
      const bookingData = {
        roomId: 'room_101',
        guestEmail: 'guest@example.com',
        checkIn: '2026-02-01',
        checkOut: '2026-02-05',
        amount: 400
      };

      // Act & Assert
      await expect(
        service.createBooking(bookingData)
      ).rejects.toThrow('Room not available');

      // Verify no payment was processed
      expect(paymentGateway.charge).not.toHaveBeenCalled();
      // Verify no email was sent
      expect(emailService.send).not.toHaveBeenCalled();
    });

    test('throws error when required fields are missing', async () => {
      // Arrange
      const bookingData = {
        roomId: 'room_101'
        // guestEmail is missing
      };

      // Act & Assert
      await expect(
        service.createBooking(bookingData)
      ).rejects.toThrow('Missing required fields');
    });
  });

  describe('cancelBooking()', () => {
    test('refunds payment and updates status', async () => {
      // Arrange - create booking first
      const bookingData = {
        roomId: 'room_101',
        guestEmail: 'guest@example.com',
        checkIn: '2026-02-01',
        checkOut: '2026-02-05',
        amount: 400
      };
      const booking = await service.createBooking(bookingData);
      paymentGateway.refund.mockClear(); // Clear calls from createBooking

      // Act
      const result = await service.cancelBooking(booking.id);

      // Assert
      expect(result.success).toBe(true);
      expect(paymentGateway.refund).toHaveBeenCalledWith('payment_123');

      // Verify status in DB
      const updatedBooking = await database.bookings.findById(booking.id);
      expect(updatedBooking.status).toBe('cancelled');
    });

    test('sends cancellation email', async () => {
      // Arrange - create booking first
      const bookingData = {
        roomId: 'room_101',
        guestEmail: 'guest@example.com',
        checkIn: '2026-02-01',
        checkOut: '2026-02-05',
        amount: 400
      };
      const booking = await service.createBooking(bookingData);
      emailService.send.mockClear(); // Clear calls from createBooking

      // Act
      await service.cancelBooking(booking.id);

      // Assert
      expect(emailService.send).toHaveBeenCalled();
      expect(emailService.send).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'guest@example.com',
          subject: 'Booking Cancelled',
          text: expect.stringContaining(booking.id)
        })
      );
    });

    test('throws error when booking not found', async () => {
      // Act & Assert
      await expect(
        service.cancelBooking('invalid_booking_id')
      ).rejects.toThrow('Booking not found');
    });

    test('throws error when booking already cancelled', async () => {
      // Arrange - create and cancel booking
      const bookingData = {
        roomId: 'room_101',
        guestEmail: 'guest@example.com',
        checkIn: '2026-02-01',
        checkOut: '2026-02-05',
        amount: 400
      };
      const booking = await service.createBooking(bookingData);
      await service.cancelBooking(booking.id);

      // Act & Assert - try to cancel again
      await expect(
        service.cancelBooking(booking.id)
      ).rejects.toThrow('Booking already cancelled');
    });
  });

  describe('getUpcomingBookings()', () => {
    test('returns only future confirmed bookings', async () => {
      // Arrange
      const now = new Date();
      const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

      // Create future booking
      await database.bookings.create({
        roomId: 'room_101',
        guestEmail: 'guest@example.com',
        checkIn: tomorrow.toISOString(),
        checkOut: nextWeek.toISOString(),
        status: 'confirmed'
      });

      // Create past booking (should be filtered out)
      await database.bookings.create({
        roomId: 'room_102',
        guestEmail: 'guest@example.com',
        checkIn: yesterday.toISOString(),
        checkOut: new Date(yesterday.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'confirmed'
      });

      // Create cancelled booking (should be filtered out)
      await database.bookings.create({
        roomId: 'room_103',
        guestEmail: 'guest@example.com',
        checkIn: tomorrow.toISOString(),
        checkOut: nextWeek.toISOString(),
        status: 'cancelled'
      });

      // Act
      const upcomingBookings = await service.getUpcomingBookings('guest@example.com');

      // Assert
      expect(upcomingBookings).toHaveLength(1);
      expect(upcomingBookings[0].roomId).toBe('room_101');
      expect(upcomingBookings[0].status).toBe('confirmed');
    });

    test('returns empty array when no upcoming bookings', async () => {
      // Act
      const upcomingBookings = await service.getUpcomingBookings('unknown@example.com');

      // Assert
      expect(upcomingBookings).toEqual([]);
    });
  });
});
