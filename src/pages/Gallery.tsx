import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader } from 'lucide-react';
import { getSupabase } from '../lib/supabaseClient';

interface GalleryImage {
  id: string;
  image_url: string;
  title: string;
  display_order: number;
  created_at: string;
}

export function Gallery() {
  const navigate = useNavigate();
  const supabase = getSupabase();

  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGalleryImages();
  }, []);

  const loadGalleryImages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('gallery_images')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImages(data || []);
    } catch (err) {
      console.error('Error loading images:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="bg-gradient-to-r from-[#0052CC] to-[#00AEEF] py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="flex items-center text-white hover:text-[#F4A300] transition mb-6 font-semibold"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Wróć na stronę główną
          </button>
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Galeria Realizacji
          </h1>
          <p className="text-white/90 text-lg mt-2">
            Zobacz nasze ukończone projekty
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="text-center py-12">
            <Loader className="w-12 h-12 text-[#0052CC] mx-auto animate-spin mb-4" />
            <p className="text-gray-600">Ładowanie zdjęć...</p>
          </div>
        ) : images.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-600 text-lg">Brak zdjęć w galerii</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((image) => (
              <div key={image.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src={image.image_url}
                  alt={image.title || 'Gallery image'}
                  className="w-full h-64 object-cover"
                />
                {image.title && (
                  <div className="p-4">
                    <p className="text-gray-700 font-medium">{image.title}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
