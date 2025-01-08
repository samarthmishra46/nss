import ProfileCard from '../components/ProfileCard';
import { volunteers } from '../data/volunteers';

export default function Volunteers() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Volunteers</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet our dedicated volunteers who work tirelessly to make a difference in the community through various social service initiatives.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {volunteers.map((volunteer) => (
            <ProfileCard
              key={volunteer.id}
              {...volunteer}
            />
          ))}
        </div>
      </div>
    </div>
  );
}