import EventCard from '../components/EventCard';
import { events } from '../data/events';

export default function Events() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join us in making a difference. Participate in our upcoming events and help create positive change in society.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <EventCard
              key={event.id}
              title={event.title}
              date={event.date}
              image={event.image}
              description={event.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}