import Heading from "@/components/global/Heading";
import Hero from "@/components/homepage-components/Hero";
import NewsSlider from "@/components/homepage-components/NewsSLider";
import OurFacilities from "@/components/homepage-components/OurFacilities";
import OurProgramme from "@/components/homepage-components/OurProgramme";
import { FaBookSkull } from "react-icons/fa6";

export default function Home() {
  return (
    <>
    <Hero/>
    <OurFacilities/>
    <OurProgramme/>
    <NewsSlider/>

    </>
  );
}
