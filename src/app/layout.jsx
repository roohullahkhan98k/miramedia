import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import { ReactLenis } from "../utils/lenis.js";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTopOnReload from "@/components/common/ScrollToTopOnReload";
import MaintenanceScreen from "@/components/common/MaintenanceScreen";
import { isMaintenanceMode } from "@/lib/maintenance";
import { Analytics } from "@vercel/analytics/next";
import AppReveal from "@/components/layout/AppReveal";

const clashGrotesk = localFont({
  src: [
    {
      path: "../../public/fonts/ClashGrotesk-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/ClashGrotesk-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/ClashGrotesk-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/ClashGrotesk-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-clash",
  display: "swap",
});

const krisha = localFont({
  src: "../../public/fonts/Krisha.otf",
  variable: "--font-krisha",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Mira Media — Programmatic CTV Mediation",
  description:
    "Mira Media connects premium Connected TV inventory to global programmatic demand with transparent OpenRTB routing, VAST bridging, and supply-path clarity.",
  icons: {
    icon: [
      {
        url: "/images/favicon/mira-fav-light.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/images/favicon/mira-fav-dark.svg",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    shortcut: "/images/favicon/mira-fav-dark.svg",
    apple: "/images/favicon/mira-fav-dark.svg",
  },
};

export default function RootLayout({ children }) {
  const maintenance = isMaintenanceMode();

  return (
    <html lang="en" className="dark">
      <body
        className={`${poppins.variable} ${clashGrotesk.variable} ${krisha.variable} bg-black text-white antialiased`}
      >
        <Analytics />
        {maintenance ? (
          <MaintenanceScreen />
        ) : (
          <ReactLenis root>
            <AppReveal>
              <ScrollToTopOnReload />
              <Navbar />
              {children}
              <Footer />
            </AppReveal>
          </ReactLenis>
        )}
      </body>
    </html>
  );
}
