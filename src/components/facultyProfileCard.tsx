import { useState } from "react";
import { Mail, Clipboard, Check, Linkedin } from "lucide-react";

interface ProfileCardProps {
  name: string;
  role: string;
  image: string;
  email?: string;
  department:string;
  linkedin?: string;
}

export default function FacultyProfileCard({ 
  name, 
  role, 
  image, 
  email, 
  department,
  linkedin 
}: ProfileCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (email) {
      navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="group bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Profile Image with Gradient Overlay */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={image}
          alt={`Profile picture of ${name}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="text-blue-600  font-medium">{role}</p>
        <p className="text-gray-900 mb-4 text-sm font-medium">{department}</p>
        
        <div className="space-y-2 text-gray-600 text-sm">
          {/* Email Section */}
          {email && (
            <div className="flex items-center gap-3">
              <a 
                href={`mailto:${encodeURIComponent(email)}`} 
                className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition-colors"
              >
                <Mail size={16} className="text-blue-600" />
                <span className="underline">{email}</span>
              </a>

              {/* Copy Button with Subtle Effect */}
              <button 
                onClick={handleCopyEmail} 
                disabled={copied}
                className={`flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors text-xs border border-gray-300 px-2 py-1 rounded-lg shadow-sm ${
                  copied ? "opacity-50 cursor-not-allowed bg-gray-100" : "hover:bg-gray-100"
                }`}
              >
                {copied ? <Check size={14} className="text-green-500" /> : <Clipboard size={14} />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          )}

          {/* LinkedIn Section */}
          {linkedin && linkedin.startsWith("http") && (
            <a 
              href={linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 text-gray-700 hover:text-blue-500 transition-colors font-medium"
            >
              <Linkedin size={18} className="text-blue-600" />
              <span>View Profile</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
