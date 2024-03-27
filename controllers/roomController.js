const rooms = [];
const bookings = [];

//Creating a Room
const createRoom = (req, res) => {
  try {
    // Generate a new roomId
    let roomId = rooms.length ? rooms[rooms.length - 1].roomId + 1 : 1;

    const { roomName, seats, amenities, pricePerHour } = req.body;
    const room = {
      roomId,
      roomName,
      seats,
      amenities,
      pricePerHour,
    };

    rooms.push(room);

    res.status(200).json({ message: "Room created successfully", room });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

// Return the list of all rooms
const getAllRooms = (req, res) => {
  try {
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//booking the room
const bookRoom = (req, res) => {
  try {
    const { customerName, date, startTime, endTime, roomId } = req.body;
    // console.log("Rooms array before finding:", rooms);
    const room = rooms.find((r) => r.roomId === roomId);
    // console.log("Rooms array after finding:", rooms);

    if (!room) {
      return res
        .status(404)
        .json({ success: false, message: "Room not found" });
    }

    const booking = {
      customerName,
      date,
      startTime,
      endTime,
      roomId,
      bookingId: bookings.length + 1,
      bookingDate: new Date(),
      status: "Booked",
    };

    bookings.push(booking);

    res.status(200).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
};

//getting all booked room details
const getAllBookedRoom = (req, res) => {
  try {
    const roomList = rooms.map((room) => {
      const booking = bookings.find((b) => b.roomId === room.roomId);
      return {
        roomName: room.roomName,
        bookedStatus: booking ? "Booked" : "Available",
        customerName: booking ? booking.customerName : null,
        date: booking ? booking.date : null,
        startTime: booking ? booking.startTime : null,
        endTime: booking ? booking.endTime : null,
      };
    });

    res.status(200).json(roomList);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// getting Customer data
const getAllCustomerData = (req, res) => {
  try {
    const customerList = bookings.map((booking) => {
      const room = rooms.find((r) => r.roomId === booking.roomId);
      return {
        customerName: booking.customerName,
        roomName: room ? room.roomName : null,
        date: booking.date,
        startTime: booking.startTime,
        endTime: booking.endTime,
      };
    });

    res.status(200).json(customerList);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//
const bookedCount = (req, res) => {
  try {
    const { customerName } = req.params;
    const customerBookings = bookings.filter(
      (booking) => booking.customerName === customerName
    );
    res.status(200).json({ customerName, bookings: customerBookings });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default {
  createRoom,
  getAllRooms,
  bookRoom,
  getAllBookedRoom,
  getAllCustomerData,
  bookedCount,
};
