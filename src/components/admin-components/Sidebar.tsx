"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  HomeIcon,
  UserGroupIcon,
  BookOpenIcon,
  Cog6ToothIcon,
  Bars3Icon,
  XMarkIcon,
  PlusIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Cookies from "js-cookie";

const adminEmail = "admin@school.edu.np";

const menuItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: HomeIcon },
  {
    name: "Teachers",
    href: "/admin/teachers",
    icon: UserGroupIcon,
    subItems: [{ name: "Add Teacher", href: "/admin/teachers/add" }],
  },
  {
    name: "Courses",
    href: "/admin/courses",
    icon: BookOpenIcon,
    subItems: [
      { name: "Add Course", href: "/admin/courses/add" },
      { name: "Subjects", href: "/admin/subjects" },
      { name: "Add Subject", href: "/admin/subjects/add" },
    ],
  },
  {
    name: "Events",
    href: "/admin/events",
    icon: BookOpenIcon,
    subItems: [{ name: "Add Event", href: "/admin/events/add" }],
  },
  {
    name: "Notices",
    href: "/admin/notices",
    icon: BookOpenIcon,
    subItems: [{ name: "Add Notice", href: "/admin/notices/add" }],
  },
  {
    name: "Gallery",
    href: "/admin/gallery",
    icon: BookOpenIcon,
    subItems: [{ name: "Add Image", href: "/admin/gallery/add" }],
  },
  { name: "Settings", href: "/admin/settings", icon: Cog6ToothIcon },
];

export default function Sidebar() {
  const route = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>(
    {}
  );
  const pathname = usePathname();

  const toggleSubmenu = (name: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleLogout = () => {
  Cookies.remove("token");
  setTimeout(() => {
    route.replace("/login");
  }, 50); // small delay for cookie flush
};


  const handleLinkClick = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden flex items-center justify-between text-[#0949A3] p-4">
        <div className="text-xl font-semibold">Admin Panel</div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:sticky top-0 left-0 h-screen bg-[#0949A3] text-white w-64 transform font-poppins flex flex-col justify-between transition-transform duration-300 z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Scrollable content */}
        <div className="overflow-y-auto flex-grow">
          <div className="text-2xl font-bold text-center py-4 border-b border-white/20">
            School Admin
          </div>
          <p className="text-sm text-center text-white/80 mb-2">{adminEmail}</p>

          <ul className="flex flex-col gap-1 p-4">
            {menuItems.map(({ name, href, icon: Icon, subItems }) => (
              <li key={name}>
                <div>
                  <div
                    className={`flex w-full items-center justify-between px-4 py-2 rounded-lg transition-all cursor-pointer ${
                      pathname === href ||
                      subItems?.some((item) => pathname === item.href)
                        ? "bg-white text-[#0949A3] font-semibold"
                        : "hover:bg-white/20"
                    }`}
                  >
                    {/* Icon that toggles submenu */}
                    <button
                      onClick={() => subItems && toggleSubmenu(name)}
                      className="flex items-center gap-3"
                    >
                      <Icon className="w-5 h-5" />
                    </button>

                    {/* Menu text that navigates to href */}
                    <Link
                      href={href}
                      onClick={handleLinkClick}
                      className="flex-1 text-left pl-2"
                    >
                      {name}
                    </Link>

                    {/* Toggle icon */}
                    {subItems && (
                      <button onClick={() => toggleSubmenu(name)}>
                        <PlusIcon
                          className={`w-4 h-4 transition-transform ${
                            openSubmenus[name] ? "rotate-45" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Submenu items */}
                  {subItems && openSubmenus[name] && (
                    <ul className="ml-10 mt-1">
                      {subItems.map((sub) => (
                        <li key={sub.name}>
                          <Link
                            href={sub.href}
                            onClick={handleLinkClick}
                            className={`block px-3 py-1 rounded-md text-sm transition-all ${
                              pathname === sub.href
                                ? "bg-white text-[#0949A3] font-semibold"
                                : "hover:bg-white/10"
                            }`}
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Logout */}
        <div className="p-4 border-t border-white/20">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-white hover:text-red-400 transition"
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Overlay on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
}
