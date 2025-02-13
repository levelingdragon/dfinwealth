import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionItemProps {
  title: string;
  content: string;
  isOpen: boolean;
  onToggle: () => void;
}

function AccordionItem({ title, content, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-4 px-6 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors"
        onClick={onToggle}
      >
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 bg-gray-50">
              <p className="text-gray-700">{content}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function AboutSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const aboutContent = [
    {
      title: "Personalized Accounting for Your Success",
      content: "D FINWEALTH ADVISORS is a team of accounting professionals passionate about helping clients achieve financial success. We understand that every client has different needs, and we take a personalized approach to provide tailored accounting solutions. From tax compliance to investment advice, we are dedicated in delivering results that will help you grow financially."
    },
    {
      title: "Innovative Accounting Solutions",
      content: "At D FINWEALTH ADVISORS we believe in embracing technology to provide innovative accounting solutions for our clients. By leveraging the latest software and tools, we ensure that your financial data is handled securely, efficiently, and with the highest level of accuracy. Our team of experts is here to simplify accounting tasks such as tax preparation, financial analysis, and business consulting, so you can stay focused on growing your business and achieving your goals."
    },
    {
      title: "Your Financial Success Starts Here",
      content: "Welcome to D FINWEALTH ADVISORS where we help you make smart financial decisions. Our team of experienced accountants and Chartered Accountants (Advisors) provides a wide range of services, including tax preparation, payroll management, financial planning, and more. Our mission is to support individuals and businesses in achieving financial success through personalized, efficient, and expert-driven solutions. Let us take care of your accounting needs so you can focus on what matters most to you."
    },
    {
      title: "Affordable and Transparent Accounting Services",
      content: "D FINWEALTH ADVISORS is committed to providing affordable, transparent, and accessible accounting services. We understand that financial management can be overwhelming, so we work closely with our clients to break down complex financial concepts and provide clear, actionable advice. Whether you need bookkeeping assistance, tax guidance, or comprehensive financial planning, we are here to offer reliable solutions at prices that fit your budget."
    },
    {
      title: "Educational and Empowering",
      content: "At D FINWEALTH ADVISORS our mission is to provide you with the knowledge and tools to confidently navigate your financial journey. Whether you're learning about credit, savings, investing, or retirement planning, we offer expert advice and clear explanations that make complex financial concepts easy to understand. We believe financial literacy is the key to empowerment, and our goal is to inspire and educate you to make the best financial choices for yourself and your future."
    },
    {
      title: "Community-Centered",
      content: "D FINWEALTH ADVISORS is more than just a accounting, bookkeeping & finance website—it's a community. We are dedicated to bringing people together by providing reliable financial resources, open discussions, and personalized advice. Whether you're looking to manage your debt, build your savings, or understand the intricacies of investing, our platform is designed to offer the support and guidance you need. We believe that, together, we can all achieve financial success, one informed decision at a time."
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img src="/path/to/your/image.jpg" alt="About Us" className="rounded-lg shadow-lg" />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <p className="text-gray-700 mb-4">
              We are a team of dedicated professionals committed to providing top-notch financial services. Our mission is to help you achieve your financial goals through personalized solutions and expert advice.
            </p>
            <p className="text-gray-700 mb-4">
              With years of experience in the industry, we understand the unique challenges you face and are here to guide you every step of the way. Whether you need business consulting, financial planning, or investment strategies, we have the expertise to help you succeed.
            </p>
            <p className="text-gray-700">
              Join us on a journey to financial success and let us help you build a brighter future.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}