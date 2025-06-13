import { Metadata } from "next";
import { getDictionary } from "@/lib/i18n";
import { buildMetadata } from "@/lib/utils";
import { GalleryHeader } from "../../gallery/GalleryHeader";
import { GalleryGrid } from "../../gallery/GalleryGrid";
import { FloatingCTA } from "@/components/FloatingCTA";
import { FeaturedMoments } from "../../gallery/FeaturedMoments";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await getDictionary("hi");
  
  return buildMetadata({
    title: dictionary.gallery.metaTitle,
    description: dictionary.gallery.metaDescription,
    url: "https://nidanayurved.com/hi/gallery",
    locale: "hi",
  });
}

export default async function GalleryPage() {
  const dictionary = await getDictionary("hi");
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-amber-50/30">
      <GalleryHeader dictionary={dictionary} locale="hi" />
      <FeaturedMoments dictionary={dictionary} locale="hi" />
      <GalleryGrid dictionary={dictionary} locale="hi" />
      <FloatingCTA dictionary={dictionary} locale="hi" />
    </main>
  );
} 