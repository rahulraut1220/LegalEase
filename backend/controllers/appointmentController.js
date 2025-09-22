require('dotenv').config(); // 👈 MUST be at the top
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Appointment = require("../models/Appointment");
const User = require("../models/User");

exports.createAppointment = async (req, res) => {
  try {
    const { lawyerId, caseId, appointmentTime, notes } = req.body;

    const lawyer = await User.findById(lawyerId);
    if (!lawyer || lawyer.role !== "lawyer") {
      return res.status(400).json({ success: false, message: "Invalid lawyer" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Lawyer Appointment Fee",
            },
            unit_amount: 50000, // ₹500 in paise
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/appointment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/appointment-cancelled`,
    });

    const appointment = new Appointment({
      client: req.user.id,
      lawyer: lawyerId,
      case: caseId,
      appointmentTime,
      notes,
      paymentId: session.id,
      paymentStatus: "pending",
    });

    await appointment.save();

    res.status(200).json({ success: true, sessionUrl: session.url });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.verifyPaymentAndConfirm = async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      const appointment = await Appointment.findOneAndUpdate(
        { paymentId: sessionId },
        { paymentStatus: "paid", status: "confirmed" },
        { new: true }
      );

      return res.status(200).json({ success: true, appointment });
    }

    res.status(400).json({ success: false, message: "Payment not completed" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getMyAppointmentsByCaseId = async (req, res) => {
  try {
    const { caseId } = req.params;
    const clientId = req.user.id;

    console.log("📥 Received caseId from URL:", caseId);
    console.log("✅ Authenticated user ID:", clientId);

    const caseObjectId = new mongoose.Types.ObjectId(caseId);
    const clientObjectId = new mongoose.Types.ObjectId(clientId);

    const appointments = await Appointment.find({
      client: clientObjectId,
      case: caseObjectId
    })
      .populate("lawyer", "name email")
      .populate("case", "title");

    console.log("✅ Appointments fetched:", appointments.length);

    // ✅ Responding with actual fetched data
    return res.json({ success: true, appointments });

  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getMyAppointments = async (req, res) => {
  try {
    const userId = req.user.id;

    const appointments = await Appointment.find({ client: userId })
      .populate("lawyer", "name email")
      .populate("case", "title");

    res.status(200).json({ success: true, appointments });
  } catch (err) {
    console.error("❌ Error fetching appointments:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAppointmentById = async (req, res) => {  
  try {
    const appointmentId = req.params.id;

    const appointment = await Appointment.findById(appointmentId)
      .populate("lawyer", "name email")
      .populate("case", "title");

    if (!appointment) {
      return res.status(404).json({ success: false, message: "Appointment not found" });
    }

    res.status(200).json({ success: true, appointment });
  } catch (err) {
    console.error("❌ Error fetching appointment:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
