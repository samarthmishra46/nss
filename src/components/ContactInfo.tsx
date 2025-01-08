import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactInfo() {
  return (
    <div className="bg-gray-50 rounded-lg p-6 space-y-6">
      <h3 className="text-xl font-semibold text-gray-900">Contact Information</h3>
      
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <MapPin className="h-6 w-6 text-blue-600 mt-1" />
          <div>
            <p className="font-medium text-gray-900">Address</p>
            <p className="text-gray-600">NSS Headquarters, Ministry of Youth Affairs & Sports, New Delhi - 110001</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Phone className="h-6 w-6 text-blue-600 mt-1" />
          <div>
            <p className="font-medium text-gray-900">Phone</p>
            <p className="text-gray-600">+91 11-23384242</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Mail className="h-6 w-6 text-blue-600 mt-1" />
          <div>
            <p className="font-medium text-gray-900">Email</p>
            <p className="text-gray-600">info@nss.gov.in</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Clock className="h-6 w-6 text-blue-600 mt-1" />
          <div>
            <p className="font-medium text-gray-900">Working Hours</p>
            <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
            <p className="text-gray-600">Saturday - Sunday: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
}