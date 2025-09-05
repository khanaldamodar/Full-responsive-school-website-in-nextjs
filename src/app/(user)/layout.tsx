import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "../globals.css";
import Footer from "@/components/Navigations/Footer";
import Navbar from "@/components/Navigations/Navbar";
import Head from "next/head";

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

export async function generateMetadata(): Promise<Metadata> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}school-information/3`, {
    cache: "no-store",
  });
  const settings = await res.json();

  const logoUrl = settings.data.logo
    ? `${process.env.NEXT_PUBLIC_LOGO_URL}${settings.data.logo}`
    : "/favicon.ico";

  return {
    title: settings.data.name,
    description: settings.description,
    icons: {
      icon: logoUrl,
      apple: logoUrl,
      shortcut: logoUrl,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const baseUrl = process.env.NEXT_PUBLIC_LOGO_URL;

  let logoUrl: string | null = null;

  try {
    const res = await fetch(`${apiUrl}school-information/3`, {
      cache: "force-cache", // or 'no-store' if the logo updates frequently
    });
    const data = await res.json();
    if (data?.data?.logo) {
      logoUrl = `${baseUrl}${data.data.logo}`;
    }
  } catch (err) {
    console.error("Failed to load logo:", err);
  }

  return (
    <html lang="en">
      <Head>
         <link
      rel="icon"
      href={logoUrl ? logoUrl : "/favicon.ico"}
      type="image/png"
    />

      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        <Navbar logoUrl={logoUrl} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
