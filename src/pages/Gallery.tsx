import { useState, useMemo } from "react";
import { SearchBar } from "@/components/SearchBar";
import { GalleryGrid } from "@/components/GalleryGrid";
import { GalleryPagination } from "@/components/GalleryPagination";

// Placeholder images from Unsplash
const images = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&q=80",
    alt: "Woman sitting on a bed using a laptop",
    title: "Work from Home",
    tags: ["laptop", "work", "bedroom"]
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&q=80",
    alt: "Turned on gray laptop computer",
    title: "Modern Laptop",
    tags: ["technology", "laptop", "computer"]
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
    alt: "Woman in white long sleeve shirt using black laptop computer",
    title: "Remote Work",
    tags: ["woman", "laptop", "work"]
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    alt: "Matrix movie still",
    title: "Digital Matrix",
    tags: ["matrix", "digital", "code"]
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80",
    alt: "Gray and black laptop computer on surface",
    title: "Sleek Laptop",
    tags: ["laptop", "technology", "minimal"]
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&q=80",
    alt: "Colorful software or web code on a computer monitor",
    title: "Code Display",
    tags: ["code", "programming", "monitor"]
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&q=80",
    alt: "A group of people standing around a display of video screens",
    title: "Tech Conference",
    tags: ["people", "technology", "screens"]
  },
  // Additional placeholder images
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80",
    alt: "MacBook Pro on table",
    title: "MacBook Setup",
    tags: ["macbook", "apple", "workspace"]
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80",
    alt: "Code on computer screen",
    title: "Programming",
    tags: ["code", "development", "programming"]
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    alt: "Office workspace",
    title: "Modern Office",
    tags: ["office", "workspace", "desk"]
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80",
    alt: "Developer working",
    title: "Developer Life",
    tags: ["developer", "coding", "work"]
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=800&q=80",
    alt: "Woman coding",
    title: "Female Developer",
    tags: ["woman", "coding", "developer"]
  }
];

const Gallery = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter images based on search term
  const filteredImages = useMemo(() => {
    if (!searchTerm) return images;
    
    return images.filter(image => 
      image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredImages.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedImages = filteredImages.slice(startIndex, startIndex + itemsPerPage);

  // Reset to first page when search changes
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Photo Gallery</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover and explore our curated collection of stunning photographs
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Results Info */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            {searchTerm ? (
              <>Showing {filteredImages.length} results for "{searchTerm}"</>
            ) : (
              <>Showing {filteredImages.length} photos</>
            )}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="mb-8">
          <GalleryGrid images={paginatedImages} />
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <GalleryPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        {/* No Results */}
        {filteredImages.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground mb-4">
              No photos found for "{searchTerm}"
            </p>
            <button
              onClick={() => handleSearch("")}
              className="text-primary hover:underline"
            >
              Clear search and view all photos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;