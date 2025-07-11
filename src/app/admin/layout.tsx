// app/admin/layout.tsx
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/admin-components/Sidebar";
import ClientAuthGuard from "@/components/admin-components/ClientAuthGuard";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        <div className="md:flex h-screen overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-y-auto bg-gray-50">
            <ClientAuthGuard>
              {children}
            </ClientAuthGuard>
          </main>
        </div>
      </body>
    </html>
  );
}
