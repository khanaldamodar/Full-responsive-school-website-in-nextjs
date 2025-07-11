'use client'

import {
  UserGroupIcon,
  BookOpenIcon,
  CalendarIcon,
  MegaphoneIcon,
  BuildingLibraryIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline'

import Link from 'next/link'

const stats = [
  {
    name: 'Teachers',
    count: 35,
    icon: UserGroupIcon,
    link: '/admin/teachers',
    color: 'bg-blue-100 text-blue-700',
  },
  {
    name: 'Students',
    count: 320,
    icon: BuildingLibraryIcon,
    link: '/admin/students',
    color: 'bg-green-100 text-green-700',
  },
  {
    name: 'Courses',
    count: 24,
    icon: BookOpenIcon,
    link: '/admin/courses',
    color: 'bg-purple-100 text-purple-700',
  },
  {
    name: 'Events',
    count: 5,
    icon: CalendarIcon,
    link: '/admin/events',
    color: 'bg-orange-100 text-orange-700',
  },
  {
    name: 'Notices',
    count: 12,
    icon: MegaphoneIcon,
    link: '/admin/notices',
    color: 'bg-pink-100 text-pink-700',
  },
]

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 font-poppins">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Welcome, Admin</h1>
          <p className="text-gray-600">Manage your school's content, events, and staff here.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {stats.map(({ name, count, icon: Icon, color, link }) => (
            <Link key={name} href={link}>
              <div
                className={`flex items-center justify-between p-6 rounded-xl shadow hover:shadow-md transition cursor-pointer bg-white`}
              >
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
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Shortcuts</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Add Teacher', link: '/admin/teachers/add' },
              { name: 'Add Event', link: '/admin/events/add' },
              { name: 'Add Notice', link: '/admin/notices/add' },
              { name: 'Upload Image', link: '/admin/gallery/add' },
            ].map((item) => (
              <Link key={item.name} href={item.link}>
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition cursor-pointer">
                  <span className="text-sm font-medium text-gray-800">{item.name}</span>
                  <ArrowRightIcon className="w-4 h-4 text-gray-500" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Optional: Recent Activities */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Activities</h2>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>✔️ Added 3 new teachers</li>
            <li>📢 Posted new notice for annual function</li>
            <li>🖼️ Uploaded 5 new gallery images</li>
            <li>📅 Scheduled a science exhibition event</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
