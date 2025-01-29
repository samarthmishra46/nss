import { Mail, Linkedin } from 'lucide-react';

interface ProfileCardProps {
  name: string;
  role: string;
  image: string;
  email?: string;
  linkedin?: string;
}

export default function ProfileCard({ 
  name, 
  role, 
  image, 
  email, 
  linkedin,

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
          {linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin size={16}/>
              <span>{linkedin}</span>
            </div>
          )}
          
          
        </div>
      </div>
    </div>
  );
}