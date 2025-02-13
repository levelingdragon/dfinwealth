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
    <section className="py-16 bg-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">About Us</h2>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {aboutContent.map((item, index) => (
            <AccordionItem
              key={index}
              title={item.title}
              content={item.content}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
        
        <div className="mt-12 space-y-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Our Goal</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Our goal is to simplify your accounting processes, allowing you to focus on what you do best — running your business or managing your finances.</li>
              <li>D FINWEALTH ADVISORS has an aim of becoming "The Trusted Partners" in the world of accounting. We pride ourselves on our commitment to accuracy, integrity, and exceptional customer service.</li>
              <li>We're here to help you build a strong financial foundation and work toward your goals with confidence.</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-4">Our Focus</h3>
            <p className="text-gray-700">
              Our highly qualified team of Chartered Accountants and accountants works diligently to provide timely and accurate financial reports, tax filing assistance, and strategic advice. Our team is dedicated to offering straightforward and actionable advice that empowers you to take charge of your financial health. From budgeting and saving to planning for retirement, we provide the resources and expert guidance you need to make informed decisions every step of the way.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}