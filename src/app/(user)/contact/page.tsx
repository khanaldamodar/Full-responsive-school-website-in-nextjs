"use client";
import ContactCard from "@/components/contactpage-components/ContactCard";
import ContactForm from "@/components/contactpage-components/ContactForm";
import Map from "@/components/contactpage-components/Map";
import Banner from "@/components/widgets/Banner";
import { Clock9, MailMinus, MapPinHouse, PhoneCall } from "lucide-react";
import React, { useEffect, useState } from "react";

type SchoolInfo = {
  address: string;
  phone: string;
  email: string;
};

const page = () => {
  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo>({
    address: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const fetchSchoolInfo = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/school-information/3"
        );
        const data = await response.json();

        if (data.status && data.data) {
          const { address, phone, email } = data.data;
          setSchoolInfo({ address, phone, email });
        }
      } catch (error) {
        console.error("Error fetching school info:", error);
      }
    };

    fetchSchoolInfo();
  }, []);
  const contactDetails = [
    {
      title: "Address",
      detail: schoolInfo.address,
      icon: <MapPinHouse size={35} />,
    },
    {
      title: "Phone",
      detail: schoolInfo.phone,
      icon: <PhoneCall size={35} />,
    },
    {
      title: "Email",
      detail: schoolInfo.email,
      icon: <MailMinus size={35} />,
    },
    {
      title: "Opening Hours",
      detail: "Mon-Fri: 9:00 AM - 5:00 PM",
      icon: <Clock9 size={35} />,
    },
  ];
  return (
    <div className="font-poppins">
      <Banner title="Contact" />
      <div className="bg-[#FFFFFF]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 px-10 lg:px-40 py-20">
          {contactDetails.map((item, index) => (
            <ContactCard
              key={index}
              title={item.title}
              detail={item.detail}
              icon={item.icon}
            />
          ))}
        </div>
      </div>

      {/* Contact form and Map */}
      <div className="flex flex-col lg:flex-row items-start justify-center gap-10 lg:gap-20 px-10 lg:px-30">
        <ContactForm />
        <Map />
      </div>
    </div>
  );
};

export default page;
