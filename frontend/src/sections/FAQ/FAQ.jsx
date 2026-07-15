import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { MOCK_FAQS } from '../../constants';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-outline-variant/20 py-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left focus:outline-none group"
      >
        <span className="font-display text-body-lg font-bold text-on-surface group-hover:text-primary transition-colors">
          {question}
        </span>
        <span className="text-on-surface-variant group-hover:text-primary transition-colors ml-4">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="text-on-surface-variant text-body-md mt-3 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  return (
    <section className="py-16 max-w-4xl mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="font-display text-headline-lg font-extrabold text-on-surface mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-on-surface-variant text-body-md">
          Quick answers to make your ordering experience smooth
        </p>
      </div>

      <div className="space-y-2">
        {MOCK_FAQS.map((faq, i) => (
          <FAQItem key={i} question={faq.q} answer={faq.a} />
        ))}
      </div>
    </section>
  );
};

export default FAQ;
