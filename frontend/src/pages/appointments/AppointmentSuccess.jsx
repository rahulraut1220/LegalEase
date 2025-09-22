// src/pages/AppointmentSuccess.js
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyPayment } from "../../redux/features/appointmentSlice";
import toast from "react-hot-toast";

const AppointmentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionId) {
      dispatch(verifyPayment(sessionId))
        .unwrap()
        .then(() => {
          toast.success("Payment verified and appointment confirmed.");
          navigate("/appointments");
        })
        .catch((err) => {
          toast.error("Payment verification failed: " + err);
        });
    } else {
      toast.error("Missing session ID.");
    }
  }, [sessionId, dispatch, navigate]);

  return (
    <div className="text-center mt-10 text-lg font-semibold">
      Verifying your payment...
    </div>
  );
};

export default AppointmentSuccess;
