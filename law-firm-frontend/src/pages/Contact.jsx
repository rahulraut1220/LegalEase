// pages/Contact.jsx
import React, { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import { Card } from "../components/common/Card";
// Removed the incorrect import

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    preferredContact: "email",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({
    submitting: false,
    submitted: false,
    success: false,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when field is updated
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setStatus({
      submitting: true,
      submitted: false,
      success: false,
      message: "",
    });

    try {
      // In production, this would call an API endpoint
      // Mock a successful submission for demonstration
      // const response = await submitContactForm(formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStatus({
        submitting: false,
        submitted: true,
        success: true,
        message:
          "Your message has been sent successfully. We will contact you shortly.",
      });

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        preferredContact: "email",
      });
    } catch (error) {
      console.error("Error submitting contact form:", error);

      setStatus({
        submitting: false,
        submitted: true,
        success: false,
        message:
          "There was an error sending your message. Please try again later.",
      });
    }
  };

  // Office locations data
  const officeLocations = [
    {
      id: 1,
      name: "Main Office",
      address: "123 Legal Avenue, Suite 500",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      phone: "(212) 555-7890",
      email: "info@legalfirm.com",
      hours: "Monday - Friday: 9:00 AM - 6:00 PM",
    },
    {
      id: 2,
      name: "Downtown Branch",
      address: "456 Justice Street",
      city: "New York",
      state: "NY",
      zipCode: "10013",
      phone: "(212) 555-1234",
      email: "downtown@legalfirm.com",
      hours: "Monday - Friday: 8:30 AM - 5:30 PM",
    },
    {
      id: 3,
      name: "West Coast Office",
      address: "789 Law Boulevard, Floor 12",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90071",
      phone: "(323) 555-4321",
      email: "westcoast@legalfirm.com",
      hours: "Monday - Friday: 8:00 AM - 5:00 PM",
    },
  ];

  // FAQ data
  const faqs = [
    {
      question: "How do I schedule an initial consultation?",
      answer:
        "You can schedule an initial consultation by filling out our contact form, calling our office directly, or using our online scheduling system. We offer both in-person and virtual consultations to accommodate your preferences.",
    },
    {
      question: "What should I bring to my first meeting with an attorney?",
      answer:
        "For your first meeting, please bring any relevant documents related to your legal matter, including contracts, correspondence, court papers, and identification. This helps us understand your situation better and provide more accurate advice.",
    },
    {
      question: "What are your fee structures?",
      answer:
        "Our fee structures vary depending on the type of legal service. We offer hourly rates, flat fees, and contingency arrangements. During your initial consultation, we will discuss the most appropriate fee structure for your specific case.",
    },
    {
      question: "How quickly can I expect a response to my inquiry?",
      answer:
        "We strive to respond to all inquiries within 24 business hours. For urgent matters, please indicate the time-sensitive nature of your request, and we will do our best to expedite our response.",
    },
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Contact Us</h1>
          <p className="text-gray-600 mt-2">
            Get in touch with our legal team. We're here to help with your legal
            needs.
          </p>
        </div>

        {/* Contact Form and Office Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Send Us a Message
                </h2>

                {status.submitted && (
                  <div
                    className={`mb-6 p-4 rounded-lg ${
                      status.success
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {status.message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                        errors.subject ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                        errors.message ? "border-red-500" : "border-gray-300"
                      }`}
                    ></textarea>
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Preferred Contact Method */}
                  <div>
                    <fieldset>
                      <legend className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Contact Method
                      </legend>
                      <div className="flex flex-wrap gap-4 mt-1">
                        <div className="flex items-center">
                          <input
                            id="email-contact"
                            name="preferredContact"
                            type="radio"
                            value="email"
                            checked={formData.preferredContact === "email"}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <label
                            htmlFor="email-contact"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Email
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="phone-contact"
                            name="preferredContact"
                            type="radio"
                            value="phone"
                            checked={formData.preferredContact === "phone"}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <label
                            htmlFor="phone-contact"
                            className="ml-2 text-sm text-gray-700"
                          >
                            Phone
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={status.submitting}
                      className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status.submitting ? "Sending..." : "Send Message"}
                    </button>
                  </div>
                </form>
              </div>
            </Card>
          </div>

          {/* Office Information */}
          <div className="lg:col-span-1">
            <Card>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Office Locations
                </h2>
                <div className="space-y-6">
                  {officeLocations.map((office) => (
                    <div
                      key={office.id}
                      className="border-b pb-4 last:border-0"
                    >
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {office.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {office.address}
                        <br />
                        {office.city}, {office.state} {office.zipCode}
                      </p>
                      <div className="mt-2 text-sm">
                        <p className="flex items-center mb-1">
                          <span className="font-medium text-gray-700 mr-2">
                            Phone:
                          </span>
                          <a
                            href={`tel:${office.phone.replace(/[^0-9]/g, "")}`}
                            className="text-blue-600 hover:underline"
                          >
                            {office.phone}
                          </a>
                        </p>
                        <p className="flex items-center mb-1">
                          <span className="font-medium text-gray-700 mr-2">
                            Email:
                          </span>
                          <a
                            href={`mailto:${office.email}`}
                            className="text-blue-600 hover:underline"
                          >
                            {office.email}
                          </a>
                        </p>
                        <p className="flex items-start">
                          <span className="font-medium text-gray-700 mr-2">
                            Hours:
                          </span>
                          <span>{office.hours}</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 mt-1">
              Find answers to common questions about working with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Our Location</h2>
            <p className="text-gray-600 mt-1">
              Visit our main office in downtown New York.
            </p>
          </div>

          <Card>
            <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
              {/* In a real application, this would be replaced with an actual map component */}
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">
                  Interactive map would be displayed here
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Contact;
