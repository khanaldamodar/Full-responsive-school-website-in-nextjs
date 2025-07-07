import ContactCard from "@/components/contactpage-components/ContactCard";
import ContactForm from "@/components/contactpage-components/ContactForm";
import Map from "@/components/contactpage-components/Map";
import Banner from "@/components/widgets/Banner";
import { Clock9, MailMinus, MapPinHouse, PhoneCall } from "lucide-react";
import React from "react";

const page = () => {
  const contactDetails = [
    {
      title: "Address",
      detail: "Kuleshwor, Kathmandu, Nepal",
      icon: <MapPinHouse size={35} />,
    },
    {
      title: "Phone",
      detail: "+977 1-1234567",
      icon: <PhoneCall size={35} />,
    },
    {
      title: "Email",
      detail: "shaktatechnology@gmail.com",
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 px-10 md:px-40 py-20">
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
      <div className="flex flex-col md:flex-row items-start justify-center md:gap-20">
        <ContactForm/>
        <Map/>

        

      </div>
    </div>
  );
};

export default page;
