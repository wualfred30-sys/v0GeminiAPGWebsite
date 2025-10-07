import React from "react";
import { Globe, Users, Trophy } from "lucide-react";

const stats = [
  {
    id: 1,
    name: "Aircraft in Fleet",
    value: "20+",
    icon: Globe,
    description: "Modern and well-maintained aircraft for optimal training.",
  },
  {
    id: 2,
    name: "Certified Instructors",
    value: "50+",
    icon: Users,
    description: "Experienced professionals dedicated to your success.",
  },
  {
    id: 3,
    name: "Years of Excellence",
    value: "10+",
    icon: Trophy,
    description: "A decade of shaping future aviation leaders.",
  },
];

const StatsSection: React.FC = () => {
  return (
    <section className="pb-20 md:pb-32 relative overflow-hidden bg-gradient-to-b from-transparent to-black">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900 rounded-3xl p-8 sm:p-12 shadow-2xl border border-gray-700 -mt-24 relative">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-center">
            {stats.map((stat) => (
              <div key={stat.id} className="group p-6 rounded-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-purple-500/20 hover:shadow-xl">
                <div className="flex justify-center mb-4">
                  <div className="p-4 rounded-full bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors duration-300">
                    <stat.icon className="h-8 w-8 text-blue-400 group-hover:text-blue-300" />
                  </div>
                </div>
                <p className="text-5xl font-extrabold text-white mb-2">{stat.value}</p>
                <p className="text-lg font-medium text-gray-300 mb-2">{stat.name}</p>
                <p className="text-gray-400 text-sm">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
