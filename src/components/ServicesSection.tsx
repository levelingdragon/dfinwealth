import { Calculator, FileText, PieChart, Users, Shield, Brain, Briefcase, DollarSign, TrendingUp } from 'lucide-react';

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
  },
  {
    icon: Briefcase,
    title: "Business Consulting",
    description: "Expert advice to help you grow your business and achieve your goals."
  },
  {
    icon: DollarSign,
    title: "Financial Planning",
    description: "Comprehensive financial planning to secure your future."
  },
  {
    icon: TrendingUp,
    title: "Investment Strategies",
    description: "Tailored investment strategies to maximize your returns."
  }
];

export function ServicesSection() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-6 bg-gray-100 rounded-lg shadow-lg text-center"
            >
              <service.icon className="h-12 w-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-700">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}