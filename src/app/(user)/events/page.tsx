import IndividualEventCard from "@/components/otherComponents/IndividualEventCard";
import Banner from "@/components/widgets/Banner";
import React from "react";

 export const events = [
    {
      id: 1,
      title: "Event 1",
      date: "2023-10-01",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      location: "Location 1",
      image: "/images/widgets/baner.jpg",
    },
    {
      id: 2,
      title: "Event 2",
      date: "2023-10-02",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      location: "Location 2",
      image: "/images/widgets/baner.jpg",
    },
    {
      id: 3,
      title: "Event 3",
      date: "2023-10-03",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      location: "Location 3",
      image: "/images/widgets/baner.jpg",
    },
    {
      id: 4,
      title: "Event 3",
      date: "2023-10-03",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      location: "Location 3",
      image: "/images/widgets/baner.jpg",
    },
    {
      id: 5,
      title: "Event 3",
      date: "2023-10-03",
      description:
        "lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      location: "Location 3",
      image: "/images/widgets/baner.jpg",
    },
  ];

const page = () => {
 

  return (
    <div className="py-10 font-poppins">
      <Banner title="Events" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-30">
        {events.map((event) => (
          <IndividualEventCard
            title={event.title}
            date={event.date}
            description={event.description}
            location={event.location}
            image={event.image}
            key={event.id}
          />
        ))}
      </div>
    </div>
  );
};

export default page;
