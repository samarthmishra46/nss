import { useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient"; // Import the Supabase client
import { events } from '../data/events';
import { Calendar, MapPin, Users } from 'lucide-react';
export default function EventDetail() {
  const { id } = useParams();
  const event = events.find((e) => e.id === Number(id));

  if (!event) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Event not found</h1>
        </div>
      </div>
    );
  }
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase
      .from("registrations")
      .insert([{ ...formData, event_id: id }]);

    if (error) {
      setMessage("Registration failed. Try again.");
      console.error(error);
    } else {
      setMessage("Registration successful!");
      setFormData({ name: "", email: "", phone: "" }); // Reset form
    }

    setLoading(false);
  };

  
  const eventPhotos = [
    "https://images.unsplash.com/photo-1526976668912-1a811878dd37?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1546541612-82d19b258cd5?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1559024094-4a1e4495c3c1?auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1558008258-3256797b43f3?auto=format&fit=crop&q=80"
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative h-[400px] rounded-xl overflow-hidden mb-8">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-4xl font-bold text-white mb-4">{event.title}</h1>
            <div className="flex flex-wrap gap-4 text-white">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>NSS Center, New Delhi</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>Expected: 100+ volunteers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Event Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">About the Event</h2>
              <p className="text-gray-600 mb-6">{event.description}</p>
              <p className="text-gray-600 mb-6">
                {event.detail}
              </p>
              <h3 className="text-xl font-bold mb-3">What to Expect</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mb-6">
                <li>Hands-on experience in community service</li>
                <li>Interaction with experienced volunteers</li>
                <li>Certificate of participation</li>
                <li>Refreshments will be provided</li>
              </ul>
              <h3 className="text-xl font-bold mb-3">Requirements</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Valid ID proof</li>
                <li>Comfortable clothing</li>
                <li>Basic safety equipment (will be provided)</li>
              </ul>
            </div>

            {/* Photo Gallery */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Event Gallery</h2>
              <div className="grid grid-cols-2 gap-4">
                {eventPhotos.map((photo, index) => (
                  <div key={index} className="aspect-video rounded-lg overflow-hidden">
                    <img
                      src={photo}
                      alt={`Event photo ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

      {/* Registration Form */}
      <div className="bg-white rounded-xl shadow-lg p-8 sticky top-24">
        <h2 className="text-2xl font-bold mb-6">Register for Event</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register Now"}
          </button>
          {message && <p className="text-center text-sm text-gray-700 mt-2">{message}</p>}
        </form>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
}
