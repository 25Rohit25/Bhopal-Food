import { Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const StickyCallBar = () => {
    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-gray-200 shadow-lg md:hidden"
        >
            <div className="flex justify-around items-center p-3">
                <a href="tel:+919876543210" className="flex items-center gap-2 text-primary font-bold">
                    <div className="p-2 bg-red-100 rounded-full">
                        <Phone size={20} />
                    </div>
                    <span>Call Us</span>
                </a>
                <div className="w-px h-8 bg-gray-300"></div>
                <a href="https://wa.me/919876543210" className="flex items-center gap-2 text-green-600 font-bold">
                    <div className="p-2 bg-green-100 rounded-full">
                        <MessageCircle size={20} />
                    </div>
                    <span>WhatsApp</span>
                </a>
            </div>
        </motion.div>
    );
};

export default StickyCallBar;
