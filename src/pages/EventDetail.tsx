import { useParams } from "react-router-dom";
import events from '../data/events';
import { Calendar, MapPin, Users } from 'lucide-react';
import PropTypes from 'prop-types'; // or use TypeScript

EventDetail.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      expectedVolunteers: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      detail: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      photos: PropTypes.arrayOf(PropTypes.string).isRequired,
      expectations: PropTypes.arrayOf(PropTypes.string).isRequired,
      requirements: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  )
};

export default function EventDetail() {
  const { id } = useParams();
  const event = events.find((e) => e.id === Number(id));

  if (!event) {
    return (
      <div className="pb-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Event not found</h1>
        </div>
      </div>
    );
  }

  // Format date using locale
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
          <img
            src={event.image}
            alt={`Cover for ${event.title}`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{event.title}</h1>
            <div className="flex flex-wrap gap-4 text-white">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" aria-hidden="true" />
                <time dateTime={event.date}>{formattedDate}</time>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" aria-hidden="true" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" aria-hidden="true" />
                <span>Expected: {event.expectedVolunteers}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Event Details */}
        <article className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4">About the Event</h2>
          <div className="space-y-4 text-gray-600">
            <p>{event.description}</p>
            <p>{event.detail}</p>
          </div>

          <section className="mt-8">
            <h3 className="text-xl font-bold mb-3">What to Expect</h3>
            <ul className="list-disc list-inside space-y-2 mb-6">
              {event.expectations.map((expectation, index) => (
                <li key={index} className="text-gray-600">
                  {expectation}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-3">Requirements</h3>
            <ul className="list-disc list-inside space-y-2">
              {event.requirements.map((requirement, index) => (
                <li key={index} className="text-gray-600">
                  {requirement}
                </li>
              ))}
            </ul>
          </section>
        </article>

        {/* Photo Gallery */}
        <section className="bg-white rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-6">Event Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {event.photos.map((photo, index) => (
              <figure key={photo} className="aspect-video rounded-lg overflow-hidden group">
                <img
                  src={photo}
                  alt={`${event.title} gallery image ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}