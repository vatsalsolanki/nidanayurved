import { Locale } from "@/lib/i18n";

type GalleryHeaderProps = {
  dictionary: any;
  locale: Locale;
};

export function GalleryHeader({ dictionary, locale }: GalleryHeaderProps) {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary-800">
        {dictionary.gallery.title}
      </h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
        {dictionary.gallery.subtitle}
      </p>
      <div className="w-24 h-1 bg-primary-500 mx-auto mt-8 rounded-full"></div>
    </section>
  );
} 