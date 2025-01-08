import ProfileCard from '../components/ProfileCard';
import { team } from '../data/team';

export default function Team() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Team</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet our dedicated team of professionals who guide and support NSS activities, bringing years of experience in social service and community development.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <ProfileCard
              key={member.id}
              {...member}
            />
          ))}
        </div>
      </div>
    </div>
  );
}