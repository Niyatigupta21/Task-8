import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface Image {
  id: number;
  src: string;
  alt: string;
  title: string;
  tags: string[];
}

interface ImageCardProps {
  image: Image;
  onClick: () => void;
}

export const ImageCard = ({ image, onClick }: ImageCardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div 
      className="group cursor-pointer bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
        {hasError ? (
          <div className="absolute inset-0 bg-muted flex items-center justify-center">
            <p className="text-muted-foreground text-sm">Failed to load image</p>
          </div>
        ) : (
          <img
            src={image.src}
            alt={image.alt}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            } group-hover:scale-110 transition-transform duration-500`}
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-foreground mb-2 line-clamp-1">
          {image.title}
        </h3>
        <div className="flex flex-wrap gap-1">
          {image.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {image.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{image.tags.length - 3}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};