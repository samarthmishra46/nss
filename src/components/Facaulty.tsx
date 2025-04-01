import React from "react";
import facultyData from "../data/faculty";

const FacultySection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-8">Our Esteemed Faculty</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-8">
          {facultyData.map((faculty, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl hover:-translate-y-2 shadow-lg hover:shadow-xl flex flex-col items-center text-center"
            >
              <img
                src={faculty.image}
                alt={faculty.name}
                className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-200"
              />
              <h3 className="text-xl font-semibold">{faculty.name}</h3>
              <p className="text-gray-600">{faculty.designation}</p>
              <p className="text-gray-600">{faculty.department}</p>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacultySection;
