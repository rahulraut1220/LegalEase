import AppointmentBooking from "../../components/appointments/AppointmentForm";

const BookAppointmentPage = () => {
  const lawyerId = "64d12345678abcd"; // replace with actual lawyerId or prop

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Book Appointment</h1>
      <AppointmentBooking lawyerId={lawyerId} />
    </div>
  );
};

export default BookAppointmentPage;
