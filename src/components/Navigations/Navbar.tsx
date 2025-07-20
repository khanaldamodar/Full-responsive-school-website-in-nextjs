"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveredMenu, setHoveredMenu] = useState<number | null>(null);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Academics", path: "/academics" },
    { name: "Events", path: "/events" },
    { name: "Gallery", path: "/gallery" },
    { name: "Notices", path: "/notices" },
    { name: "Contact", path: "/contact" },
  ];

  const handleContactButton = () => {
    router.push("/admission");
  };

  const handleMenuClick = (item: any) => {
    if (!item.subMenus) {
      router.push(item.path);
    }
  };

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/school-information/3");
        const data = await res.json();
        if (data?.data?.logo) {
          setLogoUrl(`http://localhost:8000/${data.data.logo}`);
        }
      } catch (err) {
        console.error("Failed to fetch logo:", err);
      }
    };

    fetchLogo();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`font-poppins bg-white shadow-md fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="relative w-42 h-15 cursor-pointer" onClick={() => router.push("/")}>
          {logoUrl ? (
            <Image
              src={logoUrl}
              fill
              alt="School Logo"
              className="object-contain"
              unoptimized
            />
          ) : (
            <span className="text-gray-400 text-sm">Loading...</span>
          )}
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10 uppercase font-medium relative">
          {menuItems.map((item, index) => (
            <li
              key={index}
              onMouseEnter={() => item.subMenus && setHoveredMenu(index)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <div
                onClick={() => handleMenuClick(item)}
                className="cursor-pointer hover:text-blue-500 transition-colors duration-200 py-2"
              >
                {item.name}
              </div>
            </li>
          ))}
        </ul>

        {/* Contact Button */}
        <div className="hidden md:block">
          <button
            className="border-2 border-blue-500 rounded-xl px-4 py-2 cursor-pointer transition-colors duration-200 hover:bg-blue-500 hover:text-white"
            onClick={handleContactButton}
          >
            Admission Open
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <ul className="space-y-4 text-sm font-medium">
            {menuItems.map((item, index) => (
              <li key={index}>
                <div
                  onClick={() => {
                    if (!item.subMenus) {
                      setMenuOpen(false);
                      router.push(item.path);
                    }
                  }}
                  className="cursor-pointer hover:text-blue-500 transition-colors duration-200"
                >
                  {item.name}
                </div>
              </li>
            ))}
            <li>
              <button
                className="w-full mt-2 border-2 border-blue-500 rounded-xl px-4 py-2 transition-colors duration-200 hover:bg-blue-500 hover:text-white"
                onClick={() => {
                  setMenuOpen(false);
                  handleContactButton();
                }}
              >
                Get in Touch
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
