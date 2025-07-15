"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { FaHandHoldingWater } from "react-icons/fa";
import { LiaVideoSolid } from "react-icons/lia";
import { IoNewspaperOutline } from "react-icons/io5";
import { FaPeopleGroup } from "react-icons/fa6";

const Navbar = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hoveredMenu, setHoveredMenu] = useState(null);

  const menuItems = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About Us",
      path: "/about",
    },
    {
      name: "Academics",
      path: "/academics",
    },
    {
      name: "Events",
      path: "/events",
    },
    // {
    //   name: "News",
    //   path: "/news",
    // },
    {
      name: "Gallery",
      path: "/gallery",
    },
    {
      name: "Notices",
      path: "/notices",
    },
    {
      name: "Contact",
      path: "/contact",
    },
  ];

  const handleContactButton = () => {
    router.push("/admission");
  };

  const handleMenuClick = (item) => {
    if (item.subMenus) {
      // If it has submenus, don't navigate immediately
      return;
    }
    router.push(item.path);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // scroll down: hide
      } else {
        setIsVisible(true); // scroll up: show
      }
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
        {/* <div
          className="relative w-32 h-10 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image
            src="/company/logo.png"
            fill
            alt="Shakta Technology"
            className="object-contain filter-blue"
          />
          
        </div> */}
        <h1 className="font-semibold text-2xl text-blue-500">LOGO</h1>
        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10 uppercase font-medium relative">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="relative"
              onMouseEnter={() => item.subMenus && setHoveredMenu(index)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <div
                onClick={() => handleMenuClick(item)}
                className="cursor-pointer hover:text-blue-500 transition-colors duration-200 py-2"
              >
                {item.name}
              </div>
              {/* Submenu Dropdown */}
              {item.subMenus && hoveredMenu === index && (
                <div
                  className="absolute top-full left-1/2 transform -translate-x-1/2 w-screen bg-white shadow-lg border-t border-gray-200 "
                  style={{ height: "20vh" }}
                  onMouseEnter={() => setHoveredMenu(index)}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-full flex items-center justify-center">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
                      {item.subMenus.map((subItem, subIndex) => (
                        <div
                          key={subIndex}
                          onClick={() => router.push(subItem.path)}
                          className="cursor-pointer gap-3 flex items-center  text-blue-500 hover:text-blue-700 transition-colors duration-200 font-medium text-[18px] normal-case text-center"
                        >
                          {subItem.icon} {subItem.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Contact Button */}
        <div className="hidden md:block">
          <button
            className="border-2 border-blue-500 rounded-xl px-4 py-2 cursor-pointer transition-colors duration-200 hover:bg-blue-500 hover:text-white"
            onClick={handleContactButton}
          >
            Addmission Open
          </button>
        </div>

        {/* Mobile Toggle Button */}
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

                {/* Mobile Submenus */}
                {item.subMenus && (
                  <ul className="ml-4 mt-2 space-y-2">
                    {item.subMenus.map((subItem, subIndex) => (
                      <li
                        key={subIndex}
                        onClick={() => {
                          setMenuOpen(false);
                          router.push(subItem.path);
                        }}
                        className="cursor-pointer text-blue-500 hover:text-blue-700 transition-colors duration-200 text-xs"
                      >
                        {subItem.name}
                      </li>
                    ))}
                  </ul>
                )}
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
