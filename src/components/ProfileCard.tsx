import { useState } from "react";
import { Mail, Clipboard, Check, Linkedin } from "lucide-react";

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
  linkedin 
}: ProfileCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (email) {
      navigator.clipboard.writeText(email);
      setCopied(true);

      // Reset back to "Copy" after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="group bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={image}
          alt={`Profile picture of ${name}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900">{name}</h3>
        <p className="text-blue-600 mb-4">{role}</p>
        
        <div className="space-y-2 text-gray-600 text-sm">
          {email && (
            <div className="flex items-center gap-2">
              {/* Mailto Link */}
              <a 
                href={`mailto:${encodeURIComponent(email)}`} 
                className="flex items-center gap-2 hover:text-blue-500 transition-colors"
              >
                <Mail size={16} aria-label="Email" />
                <span className="underline">{email}</span>
              </a>

              {/* Copy Button */}
              <button 
                onClick={handleCopyEmail} 
                className="flex items-center gap-1 text-gray-500 hover:text-blue-500 transition-colors text-xs border border-gray-300 px-2 py-1 rounded-md"
              >
                {copied ? <Check size={14} /> : <Clipboard size={14} />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
          )}
          {linkedin && (
            <a 
              href={linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2 hover:text-blue-500 transition-colors"
            >
              <Linkedin size={20} aria-label="LinkedIn" />
              <span>{name}</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
