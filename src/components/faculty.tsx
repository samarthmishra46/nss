import FacultyProfileCard from './facultyProfileCard';
import { facultys } from '../data/facultys';

export default function Facaulty() {
  return (
    <div className=" pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Esteemed Faculty</h1>
          
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facultys.map((faculty) => (
            <FacultyProfileCard
              key={faculty.id}
              {...faculty}
            />
          ))}
        </div>
      </div>
    </div>
  );
}