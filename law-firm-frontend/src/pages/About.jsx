// pages/About.jsx
import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";
import { Card } from "../components/common/Card";

const About = () => {
  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Jennifer Thompson",
      role: "Managing Partner",
      bio: "With over 20 years of experience in corporate law, Jennifer leads our firm with expertise in complex business litigation and regulatory compliance.",
      avatar: "/api/placeholder/150/150",
      specialties: [
        "Corporate Law",
        "Business Litigation",
        "Regulatory Compliance",
      ],
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Senior Attorney",
      bio: "Michael specializes in intellectual property law with particular focus on patent litigation and trademark protection for technology companies.",
      avatar: "/api/placeholder/150/150",
      specialties: [
        "Intellectual Property",
        "Patent Law",
        "Trademark Protection",
      ],
    },
    {
      id: 3,
      name: "Sarah Chen",
      role: "Attorney",
      bio: "Sarah brings a wealth of knowledge in family law and estate planning, helping clients navigate complex personal and financial situations with compassion.",
      avatar: "/api/placeholder/150/150",
      specialties: ["Family Law", "Estate Planning", "Probate"],
    },
    {
      id: 4,
      name: "David Washington",
      role: "Attorney",
      bio: "David focuses on civil litigation with expertise in personal injury cases, wrongful termination, and discrimination claims.",
      avatar: "/api/placeholder/150/150",
      specialties: ["Civil Litigation", "Personal Injury", "Employment Law"],
    },
    {
      id: 5,
      name: "Rebecca Foster",
      role: "Paralegal",
      bio: "Rebecca supports our legal team with thorough research, document preparation, and client communication across various practice areas.",
      avatar: "/api/placeholder/150/150",
      specialties: ["Legal Research", "Case Management", "Client Support"],
    },
    {
      id: 6,
      name: "James Patel",
      role: "Office Manager",
      bio: "James oversees daily operations, ensuring our firm runs smoothly and efficiently while providing exceptional service to our clients.",
      avatar: "/api/placeholder/150/150",
      specialties: [
        "Operations Management",
        "Client Relations",
        "Administration",
      ],
    },
  ];

  // Firm history timeline data
  const historyTimeline = [
    {
      year: "2008",
      title: "Firm Founded",
      description:
        "Our firm was established with a commitment to providing personalized legal services with the highest standards of ethics and professionalism.",
    },
    {
      year: "2011",
      title: "Expansion of Practice Areas",
      description:
        "We expanded our services to include intellectual property, family law, and estate planning to better serve our growing client base.",
    },
    {
      year: "2014",
      title: "New Office Location",
      description:
        "To accommodate our growing team, we moved to our current location in the heart of downtown, providing easier access for our clients.",
    },
    {
      year: "2017",
      title: "Technology Integration",
      description:
        "We implemented advanced legal technology solutions to enhance our service delivery, case management, and client communications.",
    },
    {
      year: "2020",
      title: "Virtual Legal Services",
      description:
        "In response to global challenges, we developed comprehensive virtual legal services to ensure uninterrupted support for our clients.",
    },
    {
      year: "2023",
      title: "Community Service Initiative",
      description:
        "We launched our pro bono program to provide legal assistance to underserved communities, reinforcing our commitment to social responsibility.",
    },
  ];

  // Values/mission statements
  const values = [
    {
      title: "Client-Centered Approach",
      description:
        "We place our clients at the center of everything we do, ensuring their needs are understood and addressed with personalized solutions.",
      icon: "👥",
    },
    {
      title: "Integrity & Transparency",
      description:
        "We uphold the highest ethical standards in our practice, providing honest advice and clear communication throughout the legal process.",
      icon: "⚖️",
    },
    {
      title: "Excellence & Expertise",
      description:
        "We are committed to continuous learning and professional development to deliver exceptional legal services in our areas of practice.",
      icon: "🏆",
    },
    {
      title: "Accessibility & Responsiveness",
      description:
        "We believe in being accessible to our clients when they need us, providing timely responses and regular case updates.",
      icon: "📱",
    },
  ];

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">About Our Firm</h1>
          <p className="text-gray-600 mt-2">
            Learn about our team, our history, and our commitment to exceptional
            legal services.
          </p>
        </div>

        {/* Firm Overview */}
        <section className="mb-12">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 bg-blue-600 p-8 text-white">
                <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                <p className="mb-6">
                  To provide accessible, high-quality legal services that
                  empower our clients to navigate complex legal challenges with
                  confidence and achieve favorable outcomes.
                </p>
                <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                <p>
                  To be recognized as a trusted legal partner known for our
                  integrity, expertise, and commitment to client success in all
                  areas of practice.
                </p>
              </div>
              <div className="md:w-1/2 p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Who We Are
                </h2>
                <p className="text-gray-600 mb-4">
                  Founded in 2008, our firm brings together experienced
                  attorneys with diverse backgrounds and specialties to provide
                  comprehensive legal solutions for individuals and businesses.
                </p>
                <p className="text-gray-600 mb-6">
                  We combine deep legal knowledge with a practical approach,
                  ensuring that our clients receive not only expert advice but
                  also strategies that align with their goals and priorities.
                </p>
                <div className="flex space-x-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">15+</p>
                    <p className="text-gray-500 text-sm">Years Experience</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">500+</p>
                    <p className="text-gray-500 text-sm">Clients Served</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">90%</p>
                    <p className="text-gray-500 text-sm">Success Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">6</p>
                    <p className="text-gray-500 text-sm">Team Members</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="h-full">
                <div className="p-6">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Meet the Team */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.id} className="h-full">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-16 h-16 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-gray-800">{member.name}</h3>
                      <p className="text-blue-600">{member.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{member.bio}</p>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Specialties:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Our History */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Our History</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-blue-200 transform -translate-x-1/2"></div>

            <div className="space-y-8">
              {historyTimeline.map((event, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col md:flex-row ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="md:w-1/2 mb-8 md:mb-0 flex flex-col items-center md:items-end md:pr-8">
                    <div
                      className={`z-10 px-6 py-4 rounded-lg shadow bg-white ${
                        index % 2 === 0 ? "md:text-right" : "md:text-left"
                      }`}
                    >
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {event.title}
                      </h3>
                      <p className="text-blue-600 font-medium mb-2">
                        {event.year}
                      </p>
                      <p className="text-gray-600">{event.description}</p>
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-blue-600 rounded-full transform -translate-x-1/2 top-6"></div>

                  <div className="md:w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Ready to Work With Us?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Whether you're facing a specific legal challenge or simply need
              ongoing legal support, our team is here to help you navigate the
              complexities of the law with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded font-medium transition-colors"
              >
                Contact Us
              </Link>
              <Link
                to="/services"
                className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 py-2 px-6 rounded font-medium transition-colors"
              >
                Explore Our Services
              </Link>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default About;
