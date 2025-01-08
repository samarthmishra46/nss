export default function About() {
  return (
    <div className="pt-16">
      <div className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center">About NSS</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              The National Service Scheme (NSS) was launched in 1969 with the primary objective of developing the personality and character of the student youth through voluntary community service.
            </p>
            <p className="text-gray-600">
              The ideological orientation of the NSS is inspired by the ideals of Mahatma Gandhi. Very appropriately, the motto of NSS is "NOT ME, BUT YOU".
            </p>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80"
              alt="NSS Activities"
              className="rounded-lg shadow-lg w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">Our Objectives</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Personality Development",
                description: "To understand the community in which they work and to understand themselves in relation to their community."
              },
              {
                title: "Community Service",
                description: "To identify the needs and problems of the community and involve them in problem-solving."
              },
              {
                title: "Skill Development",
                description: "To develop competence required for group-living and sharing of responsibilities."
              }
            ].map((objective, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-bold mb-4">{objective.title}</h3>
                <p className="text-gray-600">{objective.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "3.8M+", label: "Volunteers" },
              { number: "40K+", label: "Institutions" },
              { number: "50+", label: "Years of Service" },
              { number: "1M+", label: "Lives Impacted" }
            ].map((stat, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}