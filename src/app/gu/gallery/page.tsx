import { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/utils";
import { GalleryHeader } from "../../gallery/GalleryHeader";
import { GalleryGrid } from "../../gallery/GalleryGrid";
import { FloatingCTA } from "@/components/FloatingCTA";
import { FeaturedMoments } from "../../gallery/FeaturedMoments";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await getDictionary("gu");
  
  return buildMetadata({
    title: dictionary.gallery.metaTitle,
    description: dictionary.gallery.metaDescription,
    url: "https://nidanayurved.com/gu/gallery",
    locale: "gu",
  });
}

export default async function GalleryPage() {
  const dictionary = await getDictionary("gu");
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-amber-50/30">
      <GalleryHeader dictionary={dictionary} locale="gu" />
      <FeaturedMoments dictionary={dictionary} locale="gu" />
      <GalleryGrid dictionary={dictionary} locale="gu" />
      <FloatingCTA dictionary={dictionary} locale="gu" />
    </main>
  );
} 