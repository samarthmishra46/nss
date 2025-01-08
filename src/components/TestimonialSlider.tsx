import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Rahul Kumar',
    role: 'NSS Volunteer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    quote: 'NSS has given me the opportunity to serve society while learning valuable life lessons.'
  },
  {
    id: 2,
    name: 'Priya Singh',
    role: 'Program Officer',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    quote: 'Leading NSS activities has been one of the most rewarding experiences of my career.'
  },
  {
    id: 3,
    name: 'Amit Patel',
    role: 'NSS Coordinator',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
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