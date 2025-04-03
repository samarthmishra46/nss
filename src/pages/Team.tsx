import { useState } from 'react';
import ProfileCard from '../components/ProfileCard';
import { team } from '../data/team';

export default function Team() {
  const [selectedYear, setSelectedYear] = useState('all');

  // Filter team members based on selected year
  const filteredTeam = selectedYear === 'all' 
    ? team 
    : team.filter(member => member.year === selectedYear);

  return (
    <div className="pt-5 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Team</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Meet our dedicated team of professionals who guide and support NSS activities, bringing years of experience in social service and community development.
          </p>
          
          {/* Year Dropdown */}
          <div className="max-w-xs mx-auto">
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Years</option>
              <option value="2024-2025">2024-2025</option>
              <option value="2025-2026">2025-2026</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTeam.map((member) => (
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