import axios from "./_api";

const createBooking = async (bookingData) => {
    return await axios.post("/bookings",bookingData);
}

const getAllBookings = async (params) => {
    return await axios.get("/bookings/all",{params})
}

const getBookingsByUser =  async (userId) => {
    return await axios.get(`/bookings/user/${userId}`)
}

const deleteBookings = async (bookingId) => {
    return await axios.delete(`/bookings/${bookingId}`)
}

const getBookedSeats = async (movieId, date, slot) => {
  try {
    const res = await getAllBookings({ movieId, date, slot });

    if (res.data?.success) {
      return res.data.result
        .filter((booking) => booking.payments?.status === "Completed")
        .flatMap((booking) => {
          return Array.isArray(booking.seat) ? booking.seat : [booking.seat];
        }); 
    }

    return [];
  } catch (error) {
    console.error("Error fetching booked seats:", error);
    return [];
  }
};


export {
    createBooking,
    getAllBookings,
    getBookingsByUser,
    deleteBookings,
    getBookedSeats
}