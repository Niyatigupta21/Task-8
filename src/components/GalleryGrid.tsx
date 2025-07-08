import { useState } from "react";
import { ImageCard } from "@/components/ImageCard";
import { ImageModal } from "@/components/ImageModal";

interface Image {
  id: number;
  src: string;
  alt: string;
  title: string;
  tags: string[];
}

interface GalleryGridProps {
  images: Image[];
}

export const GalleryGrid = ({ images }: GalleryGridProps) => {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <ImageCard
            key={image.id}
            image={image}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>

      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </>
  );
};