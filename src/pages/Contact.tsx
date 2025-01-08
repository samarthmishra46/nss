import ContactForm from '../components/ContactForm';
import ContactInfo from '../components/ContactInfo';

export default function Contact() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
          <div>
            <ContactInfo />
          </div>
        </div>

        <div className="mt-12">
          <div className="bg-gray-100 rounded-lg overflow-hidden h-96">
            <iframe
              title="NSS Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.563149431779!2d77.2372!3d28.6129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM2JzQ2LjQiTiA3N8KwMTQnMTMuOSJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}