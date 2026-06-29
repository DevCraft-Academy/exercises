import {
  describe,
  test,
  expect,
  beforeEach,
  jest,
  afterEach,
} from "@jest/globals";
import { BookingService } from "./bookingService.js";
import { InMemoryDatabase } from "./inMemoryDatabase.js";

describe("BookingService", () => {
  let service;
  let database;
  let paymentGateway;
  let emailService;
  let availabilityChecker;

  beforeEach(() => {
    database = new InMemoryDatabase();

    paymentGateway = {
      charge: jest.fn().mockResolvedValue({ id: "payment_123" }),
      refund: jest.fn().mockResolvedValue({ id: "refund_123" }),
    };

    emailService = {
      send: jest.fn().mockResolvedValue(true),
    };

    availabilityChecker = {
      check: jest.fn().mockReturnValue(true),
    };

    service = new BookingService(
      paymentGateway,
      emailService,
      database,
      availabilityChecker,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("createBooking() succeeds with valid data", async () => {
    // Arrange - create bookingData
    const bookingData = {
      roomId: "room_123",
      guestEmail: "guest@example.com",
      checkIn: "2026-02-22",
      checkOut: "2026-02-23",
      amount: 400,
    };

    // Act - call createBooking
    const booking = await service.createBooking(bookingData);

    // Assert - check booking.id, booking.status
    expect(booking).toHaveProperty("id");
    expect(booking).toHaveProperty("status", "confirmed");
  });

  test("createBooking() throws error when room not available", async () => {
    // Arrange - set availabilityChecker.check to false
    availabilityChecker.check.mockReturnValue(false);

    // Act & Assert - expect(...).rejects.toThrow('Room not available')
    const bookingData = {
      roomId: "room_123",
      guestEmail: "guest@example.com",
      checkIn: "2026-02-22",
      checkOut: "2026-02-23",
      amount: 400,
    };
    await expect(service.createBooking(bookingData)).rejects.toThrow(
      "Room not available",
    );
    // check that paymentGateway.charge was never called
    expect(paymentGateway.charge).not.toHaveBeenCalled();
    // check that emailService.send was never called
    expect(emailService.send).not.toHaveBeenCalled();
  });

  test("createBooking() charges payment with correct amount", async () => {
    // Arrange - create bookingData
    const bookingData = {
      roomId: "room_123",
      guestEmail: "guest@example.com",
      checkIn: "2026-02-22",
      checkOut: "2026-02-23",
      amount: 400,
    };

    // Act - call createBooking
    await service.createBooking(bookingData);

    // Assert - check paymentGateway.charge called with correct amount
    expect(paymentGateway.charge).toHaveBeenCalledWith(
      expect.objectContaining({
        amount: 400,
        currency: "EUR",
      }),
    );
  });

  test("createBooking() saves booking to database", async () => {
    // Arrange - create bookingData
    const bookingData = {
      roomId: "room_123",
      guestEmail: "guest@example.com",
      checkIn: "2026-02-22",
      checkOut: "2026-02-23",
      amount: 400,
    };

    // Act - call createBooking
    const booking = await service.createBooking(bookingData);

    // Assert - check database.bookings.data contains booking
    const savedBooking = await database.bookings.findById(booking.id);
    expect(savedBooking).toBeDefined();
    expect(savedBooking.paymentId).toBe("payment_123");
    expect(savedBooking.status).toBe("confirmed");
  });

  test("createBooking() sends confirmation email", async () => {
    // Arrange - create bookingData
    const bookingData = {
      roomId: "room_123",
      guestEmail: "guest@example.com",
      checkIn: "2026-02-22",
      checkOut: "2026-02-23",
      amount: 400,
    };

    // Act - call createBooking
    await service.createBooking(bookingData);

    // Assert - check emailService.send called with correct parameters
    expect(emailService.send).toHaveBeenCalled();
  });

  test("createBooking() checks availability", async () => {
    // Arrange - create bookingData
    const bookingData = {
      roomId: "room_123",
      guestEmail: "guest@example.com",
      checkIn: "2026-02-22",
      checkOut: "2026-02-23",
      amount: 400,
    };

    // Act - call createBooking
    await service.createBooking(bookingData);

    // Assert - check availabilityChecker.check was called
    expect(availabilityChecker.check).toHaveBeenCalledWith(
      "room_123",
      "2026-02-22",
      "2026-02-23",
    );
  });

  test("createBooking() throws error when required fields are missing", async () => {
    // Arrange - create incomplete bookingData
    const bookingData = {
      roomId: "room_123",
      // missing guestEmail, checkIn, checkOut, amount
    };

    // Act & Assert - expect(...).rejects.toThrow('Missing required fields')
    await expect(service.createBooking(bookingData)).rejects.toThrow(
      "Missing required fields",
    );
  });

  test("cancelBooking() refunds payment and updates status", async () => {
    // Arrange - create Booking in DB first
    const bookingData = {
      roomId: "room_123",
      guestEmail: "guest@example.com",
      checkIn: "2026-02-22",
      checkOut: "2026-02-23",
      amount: 400,
    };
    const booking = await service.createBooking(bookingData);

    // Act - cancelBooking(booking.id)
    const result = await service.cancelBooking(booking.id);

    // Assert - paymentGateway.refund called, status='cancelled'
    expect(result.success).toBe(true);
    expect(paymentGateway.refund).toHaveBeenCalledWith("payment_123");
    const cancelledBooking = await database.bookings.findById(booking.id);
    expect(cancelledBooking.status).toBe("cancelled");
  });

  test("cancelBooking() throws error when booking not found", async () => {
    // Act & Assert - expect(...).rejects.toThrow('Booking not found')
    await expect(service.cancelBooking("nonexistent_id")).rejects.toThrow(
      "Booking not found",
    );
  });

  test("cancelBooking() sends cancellation email", async () => {
    // Arrange - create Booking in DB first
    const bookingData = {
      roomId: "room_123",
      guestEmail: "guest@example.com",
      checkIn: "2026-02-22",
      checkOut: "2026-02-23",
      amount: 400,
    };
    const booking = await service.createBooking(bookingData);

    // Act - cancelBooking(booking.id)
    await service.cancelBooking(booking.id);

    // Assert - emailService.send called for cancellation
    expect(emailService.send).toHaveBeenCalled();
  });

  test("getUpcomingBookings() returns only future confirmed bookings", async () => {
    // Arrange - create past + future bookings
    const pastBookingData = {
      roomId: "room_123",
      guestEmail: "guest@example.com",
      checkIn: "2025-01-01",
      checkOut: "2025-01-02",
      amount: 400,
    };
    const futureBookingData = {
      roomId: "room_456",
      guestEmail: "guest@example.com",
      checkIn: "2028-01-01",
      checkOut: "2028-01-02",
      amount: 400,
    };
    await service.createBooking(pastBookingData);
    await service.createBooking(futureBookingData);

    // Act - getUpcomingBookings()
    const upcomingBookings =
      await service.getUpcomingBookings("guest@example.com");

    // Assert - only future bookings returned
    expect(upcomingBookings).toHaveLength(1);
    expect(upcomingBookings[0].roomId).toBe("room_456");
  });

  test("getUpcomingBookings() excludes cancelled bookings", async () => {
    // Arrange - create future bookings, one confirmed and one cancelled
    const confirmedBookingData = {
      roomId: "room_123",
      guestEmail: "guest@example.com",
      checkIn: "2028-01-01",
      checkOut: "2028-01-02",
      amount: 400,
    };
    const toBeCancelledBookingData = {
      roomId: "room_456",
      guestEmail: "guest@example.com",
      checkIn: "2028-02-01",
      checkOut: "2028-02-02",
      amount: 400,
    };

    await service.createBooking(confirmedBookingData);
    const cancelledBooking = await service.createBooking(
      toBeCancelledBookingData,
    );
    await service.cancelBooking(cancelledBooking.id);

    // Act - getUpcomingBookings()
    const upcomingBookings =
      await service.getUpcomingBookings("guest@example.com");

    // Assert - only confirmed bookings returned
    expect(upcomingBookings).toHaveLength(1);
    expect(upcomingBookings[0].roomId).toBe("room_123");
    expect(upcomingBookings[0].status).toBe("confirmed");
  });
});
