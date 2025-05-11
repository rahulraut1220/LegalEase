import React, { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";

const PaymentForm = ({ caseData, onSubmit, isLoading }) => {
  const [paymentData, setPaymentData] = useState({
    amount: caseData?.invoiceAmount || "",
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const [paymentStatus, setPaymentStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setPaymentStatus("processing");
      const response = await onSubmit(paymentData);

      if (response.success) {
        setPaymentStatus("success");
        // Clear form
        setPaymentData({
          amount: "",
          cardNumber: "",
          cardholderName: "",
          expiryDate: "",
          cvv: "",
          billingAddress: "",
          city: "",
          state: "",
          zipCode: "",
          country: "United States",
        });
      } else {
        setPaymentStatus("error");
      }
    } catch (error) {
      setPaymentStatus("error");
      console.error("Payment error:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Payment Information
      </h2>

      {caseData && (
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <h3 className="font-medium text-gray-700 mb-2">Case Details</h3>
          <p className="text-gray-600 mb-1">Case #{caseData.caseNumber}</p>
          <p className="text-gray-600 mb-1">{caseData.title}</p>
          <p className="text-gray-600 font-medium">
            Invoice Amount: ${caseData.invoiceAmount}
          </p>
        </div>
      )}

      {paymentStatus === "success" ? (
        <div className="text-center py-8">
          <div className="text-green-500 text-5xl mb-4">✓</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Payment Successful!
          </h3>
          <p className="text-gray-600">
            Your payment has been processed successfully.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h3 className="font-medium text-gray-700 mb-3">Payment Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Cardholder Name"
                name="cardholderName"
                value={paymentData.cardholderName}
                onChange={handleChange}
                required
                placeholder="John Smith"
              />
              <Input
                label="Card Number"
                name="cardNumber"
                value={paymentData.cardNumber}
                onChange={handleChange}
                required
                placeholder="1234 5678 9012 3456"
                pattern="[0-9\s]{13,19}"
                maxLength={19}
              />
              <Input
                label="Expiry Date"
                name="expiryDate"
                value={paymentData.expiryDate}
                onChange={handleChange}
                required
                placeholder="MM/YY"
                pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                maxLength={5}
              />
              <Input
                label="CVV"
                name="cvv"
                value={paymentData.cvv}
                onChange={handleChange}
                required
                placeholder="123"
                pattern="[0-9]{3,4}"
                maxLength={4}
                type="password"
              />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium text-gray-700 mb-3">Billing Address</h3>
            <div className="grid grid-cols-1 gap-4">
              <Input
                label="Street Address"
                name="billingAddress"
                value={paymentData.billingAddress}
                onChange={handleChange}
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="City"
                  name="city"
                  value={paymentData.city}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="State/Province"
                  name="state"
                  value={paymentData.state}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="ZIP/Postal Code"
                  name="zipCode"
                  value={paymentData.zipCode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Button
              type="submit"
              fullWidth
              disabled={isLoading || paymentStatus === "processing"}
            >
              {paymentStatus === "processing"
                ? "Processing..."
                : isLoading
                ? "Loading..."
                : "Complete Payment"}
            </Button>
          </div>

          {paymentStatus === "error" && (
            <div className="mt-4 text-red-600 text-center">
              Payment failed. Please try again.
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default PaymentForm;
