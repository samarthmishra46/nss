import { Calendar } from 'lucide-react';

interface EventCardProps {
  title: string;
  date: string;
  image: string;
  description: string;
}

export default function EventCard({ title, date, image, description }: EventCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl shadow-lg transition-transform duration-300 hover:-translate-y-2">
      <div className="aspect-[16/9] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 transition-transform duration-300 group-hover:translate-y-0">
        <div className="flex items-center gap-2 text-sm mb-2">
          <Calendar size={16} />
          <span>{date}</span>
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {description}
        </p>
      </div>
    </div>
  );
}