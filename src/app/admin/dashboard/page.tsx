"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
  UserGroupIcon,
  BookOpenIcon,
  CalendarIcon,
  MegaphoneIcon,
  BuildingLibraryIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Loader from "@/components/global/Loader";

interface DashboardStats {
  teachers: number;
  students: number;
  courses: number;
  events: number;
  notices: number;
  recent_activities?: string[];
}

export default function AdminDashboard() {
  const route = useRouter();
  const [adminName, setAdminName] = useState("Loading...");
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = document.cookie
          .split("; ")
          .find((row) => row.startsWith("token="))
          ?.split("=")[1];
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await axios.get(`${apiUrl}admin/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStats(res.data.data);
      } catch (err) {
        console.error("Dashboard fetch error", err);
      }
    };

    fetchDashboard();
  }, []);

  useEffect(() => {

    const getAdminName = async () => {
      try {
        const token = Cookies.get("token");
        if (!token) {
          route.replace("/login");
          return;
        }
        const response = await axios(`${process.env.NEXT_PUBLIC_API_URL}user`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
    
        setAdminName(response.data.name);
      } catch (error) {
        console.error("Failed to fetch user details", error);
      }
    }
    getAdminName();

  }, []);

  if (!stats) return <Loader />;

  const statsWithCounts = [
    {
      name: "Teachers",
      count: stats.teachers,
      icon: UserGroupIcon,
      link: "/admin/teachers",
      color: "bg-blue-100 text-blue-700",
    },
    {
      name: "Courses",
      count: stats.courses,
      icon: BookOpenIcon,
      link: "/admin/courses",
      color: "bg-purple-100 text-purple-700",
    },
    {
      name: "Events",
      count: stats.events,
      icon: CalendarIcon,
      link: "/admin/events",
      color: "bg-orange-100 text-orange-700",
    },
    {
      name: "Notices",
      count: stats.notices,
      icon: MegaphoneIcon,
      link: "/admin/notices",
      color: "bg-pink-100 text-pink-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 font-poppins">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {adminName}</h1>
          <p className="text-gray-600">
            Manage your school's content, events, and staff here.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {statsWithCounts.map(({ name, count, icon: Icon, color, link }) => (
            <Link key={name} href={link}>
              <div className="flex items-center justify-between p-6 rounded-xl shadow hover:shadow-md transition cursor-pointer bg-white">
                <div>
                  <h2 className="text-sm font-medium text-gray-500">{name}</h2>
                  <p className="text-2xl font-bold text-gray-900">{count}</p>
                </div>
                <div
                  className={`p-3 rounded-full ${color} transition duration-200`}
                >
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Shortcuts */}
        <div className="bg-white p-6 rounded-xl shadow-md mb-10">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Quick Shortcuts
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Add Teacher", link: "/admin/teachers/add" },
              { name: "Add Event", link: "/admin/events/add" },
              { name: "Add Notice", link: "/admin/notices/add" },
              { name: "Upload Image", link: "/admin/gallery/add" },
            ].map((item) => (
              <Link key={item.name} href={item.link}>
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition cursor-pointer">
                  <span className="text-sm font-medium text-gray-800">
                    {item.name}
                  </span>
                  <ArrowRightIcon className="w-4 h-4 text-gray-500" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
