import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Ayushi Tiwari',
    role: 'NSS Secretary',
    image: 'https://mglbdxdgndniiumoqqht.supabase.co/storage/v1/object/public/team-images//IMG-20250317-WA0013%20-%20Ayushi%20Tiwari.jpg',
    quote: 'NSS has given me the opportunity to serve society while learning valuable life lessons.'
  },
  {
    id: 2,
    name: 'Priyanshu Mishra',
    role: 'NSS Joint Secretary',
    image: 'https://mglbdxdgndniiumoqqht.supabase.co/storage/v1/object/public/team-images//IMG_20250321_214833%20-%20Priyanshu%20Mishra.jpg',
    quote: 'Leading NSS activities has been one of the most rewarding experiences of my career.'
  },
  {
    id: 3,
    name: 'Khushi Jaiswal',
    role: 'NSS Coordinator',
    image: "https://mglbdxdgndniiumoqqht.supabase.co/storage/v1/object/public/team-images//2cf6e74e-159a-4140-bac6-31784064d6b1.jpeg",
    quote: 'The impact we create through NSS activities is truly transformative for both volunteers and communities.'
  },
  {
    id: 4,
    name: 'Harshita Jaiswal',
    role: 'NSS Mentor',
    image: 'https://mglbdxdgndniiumoqqht.supabase.co/storage/v1/object/public/team-images//6b75d7ce-f38d-4ea9-9c0a-e9c902ca67a4.jpeg',
    quote: 'The impact we create through NSS activities is truly transformative for both volunteers and communities.'
  }
];

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">What People Say</h2>
        
        <div className="relative">
          <div className="flex items-center justify-center">
            <button
              onClick={prevSlide}
              className="absolute left-0 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="w-full max-w-3xl mx-12">
              <div className="bg-white rounded-xl shadow-xl p-8 relative">
                <Quote className="absolute top-4 left-4 text-blue-500 opacity-20" size={40} />
                <div className="text-center">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <p className="text-gray-600 text-lg italic mb-4">
                    "{testimonials[currentIndex].quote}"
                  </p>
                  <h3 className="font-bold text-lg">{testimonials[currentIndex].name}</h3>
                  <p className="text-gray-500">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </div>

            <button
              onClick={nextSlide}
              className="absolute right-0 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-100"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="flex justify-center mt-4 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}