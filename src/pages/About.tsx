import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

export default function About() {
  return (
    <div className=" bg-gray-100 text-gray-800">
      <Helmet>
        <title>About NSS - National Service Scheme</title>
        <meta name="description" content="Learn about the National Service Scheme (NSS), its mission, objectives, and impact on society." />
      </Helmet>
      
      <div className="py-16  text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-extrabold">About NSS</h1>
          <p className="mt-4 text-lg">Serving communities and shaping the future through voluntary service.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-blue-700">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              The National Service Scheme (NSS) was launched in 1969 with the primary objective of developing the personality and character of the student youth through voluntary community service. It aims to inculcate a sense of social responsibility, discipline, and leadership among students.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Inspired by the ideals of Mahatma Gandhi, NSS works on the motto "NOT ME, BUT YOU", emphasizing selfless service and community engagement.
            </p>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80"
              alt="NSS volunteers participating in community service activities"
              className="rounded-lg shadow-lg w-full h-80 object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-blue-700">Our Objectives</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Personality Development",
                description: "To help students understand their community and develop leadership qualities."
              },
              {
                title: "Community Service",
                description: "To encourage students to actively participate in social service and nation-building activities."
              },
              {
                title: "Skill Development",
                description: "To enhance teamwork, problem-solving, and responsibility-sharing abilities."
              }
            ].map((objective, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <h3 className="text-xl font-bold mb-4 text-blue-700">{objective.title}</h3>
                <p className="text-gray-700 leading-relaxed">{objective.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-blue-700">Our Work & Activities</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            NSS volunteers engage in various activities such as environmental protection, literacy programs, disaster relief efforts, health awareness drives, and rural development projects. These activities help foster a strong sense of social responsibility and commitment to national service.
          </p>
          <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
            <li>Organizing blood donation and health camps.</li>
            <li>Conducting educational programs for underprivileged children.</li>
            <li>Running cleanliness and environmental awareness drives.</li>
            <li>Helping communities during natural disasters and emergencies.</li>
          </ul>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-blue-700">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "3.8M+", label: "Volunteers" },
              { number: "40K+", label: "Institutions" },
              { number: "50+", label: "Years of Service" },
              { number: "1M+", label: "Lives Impacted" }
            ].map((stat, index) => (
              <motion.div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <div className="text-3xl font-bold text-blue-700 mb-2">{stat.number}</div>
                <div className="text-gray-700">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}