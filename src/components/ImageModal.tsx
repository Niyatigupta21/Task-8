import { X, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Image {
  id: number;
  src: string;
  alt: string;
  title: string;
  tags: string[];
}

interface ImageModalProps {
  image: Image;
  onClose: () => void;
}

export const ImageModal = ({ image, onClose }: ImageModalProps) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.src;
    link.download = `${image.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title,
          text: image.alt,
          url: image.src,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(image.src);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">
              {image.title}
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="p-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 p-6 pt-4 overflow-hidden">
          <div className="h-full flex flex-col lg:flex-row gap-6">
            {/* Image */}
            <div className="flex-1 flex items-center justify-center bg-muted rounded-lg overflow-hidden">
              <img
                src={image.src}
                alt={image.alt}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            
            {/* Metadata */}
            <div className="lg:w-80 space-y-4">
              <div>
                <h4 className="font-medium text-foreground mb-2">Description</h4>
                <p className="text-muted-foreground text-sm">{image.alt}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-foreground mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {image.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-foreground mb-2">Image ID</h4>
                <p className="text-muted-foreground text-sm font-mono">#{image.id}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};