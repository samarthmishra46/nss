import { Mail, Phone, MapPin } from 'lucide-react';

interface ProfileCardProps {
  name: string;
  role: string;
  image: string;
  email?: string;
  phone?: string;
  location?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
  };
}

export default function ProfileCard({ 
  name, 
  role, 
  image, 
  email, 
  phone, 
  location,
  socialLinks 
}: ProfileCardProps) {
  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900">{name}</h3>
        <p className="text-blue-600 mb-4">{role}</p>
        
        <div className="space-y-2 text-gray-600 text-sm">
          {email && (
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span>{email}</span>
            </div>
          )}
          {phone && (
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>{phone}</span>
            </div>
          )}
          {location && (
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{location}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}