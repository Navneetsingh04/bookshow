import React, { useEffect, useState } from "react";
import axios from "../../api/_api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const PaymentPopup = ({ isOpen, onClose, bookingData, onPaymentSuccess }) => {
  const navigate = useNavigate();
  const [paymentInitiated, setPaymentInitiated] = useState(false);

  useEffect(() => {
    if (isOpen && bookingData && !paymentInitiated) {
      initiatePayment();
      setPaymentInitiated(true);
    }
  }, [isOpen, bookingData]);

  useEffect(() => {
    if (!isOpen) setPaymentInitiated(false);
  }, [isOpen]);

  async function initiatePayment() {
    if (!bookingData) {
      toast.error("Booking data missing.");
      onClose();
      return;
    }

    try {
      const loaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!loaded) {
        toast.error("Razorpay SDK failed to load.");
        onClose();
        return;
      }

      const { data: { razorpay_key_id } } = await axios.get("/payment/get-razorpay-key-id");

      const amount = bookingData.amount || (bookingData.seats?.length * 250) || 250;
      const orderId = `ORDER_${Date.now()}`;
      const { data: { order_id, currency, amount: backendAmount } } = await axios.post("/payment/order", {
        amount,
        orderId,
      });

      const options = {
        key: razorpay_key_id,
        amount: backendAmount,
        currency,
        name: "BookShow",
        description: "Movie Ticket Payment",
        order_id,
        handler: async function (response) {
          try {
            await axios.post("/bookings", {
              ...bookingData,
              amount,
              payments: {
                id: response.razorpay_payment_id,
                status: "Completed",
                initiatedAt: new Date(),
                amount,
              },
            });
            toast.success("Payment successful!");
            onPaymentSuccess?.();
            onClose();
            navigate("/my-booking", { replace: true });
          } catch (err) {
            toast.error("Payment succeeded, but booking failed.");
            console.error(err);
            onClose();
          }
        },
        prefill: {
          name: "Navneet Singh",
          email: "navneetsingh1825@gmail.com",
          contact: "86760769369",
        },
        theme: { color: "#da2343" },
        modal: {
          ondismiss: () => {
            toast.info("Payment cancelled.");
            onClose();
          }
        }
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Something went wrong.");
      onClose();
    }
  }

  return null; 
};

export default PaymentPopup;
