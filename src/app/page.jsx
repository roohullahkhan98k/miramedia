"use client";

import HomeHero from "@/components/home/HomeHero";
import HomeAbout from "@/components/home/HomeAbout";
import HomeGallery from "@/components/home/HomeGallery";
import HomeServices from "@/components/home/HomeServices";
import dynamic from "next/dynamic";
import HomePartners from "@/components/home/HomePartners/HomePartners";
import HomePaths from "@/components/home/HomePaths";
import HomeWorldMap from "@/components/home/HomeWorldMap";
import HomeMask from "@/components/home/HomeMask";

const MeshBackground = dynamic(
  () => import("@/components/common/MeshBackground"),
  { ssr: false },
);

export default function Home() {
  return (
    <>
      <MeshBackground />
      <div className="relative">
        <HomeHero />
        <HomeAbout />
        <HomePaths />
        <HomeServices />
        <HomePartners />
        <HomeMask />
        <HomeWorldMap />
        <HomeGallery />
      </div>
    </>
  );
}
