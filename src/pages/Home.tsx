import ImageCarousel from '../components/ImageCarousel';
import PhotoGallery from '../components/PhotoGallery';
import TestimonialSlider from '../components/TestimonialSlider';

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section with Image Carousel */}
      <ImageCarousel />

      {/* About Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">About NSS</h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              The National Service Scheme (NSS) is a Central Sector Scheme of Government of India, Ministry of Youth Affairs & Sports. Through NSS, the students get an opportunity to serve the society and develop their personality through community service. NSS volunteers work to ensure that everyone who is needy gets help to enhance their standard of living and lead a life of dignity.
            </p>
          </div>
        </div>
      </div>

      {/* Photo Gallery */}
      <PhotoGallery />

      {/* Testimonials */}
      <TestimonialSlider />
    </div>
  );
}