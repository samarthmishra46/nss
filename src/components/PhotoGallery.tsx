import { useState } from 'react';

const photos = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1000',
    title: 'Tree Plantation Drive'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1000',
    title: 'Blood Donation Camp'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?auto=format&fit=crop&q=80&w=1000',
    title: 'Teaching Rural Children'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80&w=1000',
    title: 'Cleanliness Drive'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=1000',
    title: 'Health Camp'
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=1000',
    title: 'Community Service'
  }
];

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Photo Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="relative overflow-hidden rounded-lg shadow-lg transform transition-transform hover:scale-105 cursor-pointer"
            onClick={() => setSelectedPhoto(photo.id)}
          >
            <img
              src={photo.url}
              alt={photo.title}
              className="w-full h-64 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 px-4 py-2 bg-gradient-to-t from-black">
              <h3 className="text-white font-semibold">{photo.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="max-w-4xl w-full mx-4">
            <img
              src={photos.find(p => p.id === selectedPhoto)?.url}
              alt={photos.find(p => p.id === selectedPhoto)?.title}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}