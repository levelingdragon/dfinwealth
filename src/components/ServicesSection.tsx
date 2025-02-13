import { Calculator, FileText, PieChart, Users, Shield, Brain } from 'lucide-react';

const services = [
  {
    icon: Calculator,
    title: "Tax Planning & Preparation",
    description: "Expert tax services for individuals and businesses, ensuring compliance and maximizing returns."
  },
  {
    icon: FileText,
    title: "Bookkeeping & Accounting",
    description: "Comprehensive bookkeeping services to keep your finances organized and up-to-date."
  },
  {
    icon: PieChart,
    title: "Financial Planning",
    description: "Personalized financial strategies to help you achieve your short and long-term goals."
  },
  {
    icon: Users,
    title: "Business Advisory",
    description: "Strategic guidance to help your business grow and succeed in today's competitive market."
  },
  {
    icon: Shield,
    title: "Audit & Assurance",
    description: "Thorough audit services to ensure financial accuracy and compliance."
  },
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description: "Cutting-edge AI technology to provide real-time financial insights and recommendations."
  }
];

export function ServicesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
          <p className="mt-4 text-xl text-gray-600">
            Comprehensive financial solutions tailored to your needs
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative group bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg opacity-0 group-hover:opacity-25 transition-opacity" />
              <div className="relative">
                <service.icon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}