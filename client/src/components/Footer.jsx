import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone, ArrowUp } from 'lucide-react';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-dark text-white pt-20 pb-10 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-accent"></div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 -left-24 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-6 group">
                            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-display font-bold text-xl shadow-lg">
                                B
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-display font-bold text-white leading-none">
                                    Bhopal<span className="text-primary">Food</span>
                                </span>
                                <span className="text-[10px] font-sans font-medium tracking-widest text-white/60 uppercase">
                                    The Real Taste
                                </span>
                            </div>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Delivering the authentic taste of Bhopal right to your train seat. Fresh, hygienic, and delicious food for your journey.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold font-display text-white mb-6">Quick Links</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            {['Home', 'Menu', 'About Us', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-primary transition-colors flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold font-display text-white mb-6">Contact Info</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex items-start gap-3">
                                <div className="p-2 bg-white/5 rounded-lg text-primary shrink-0">
                                    <MapPin size={16} />
                                </div>
                                <span>Bhopal Junction Railway Station,<br />Platform No. 1, Bhopal</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="p-2 bg-white/5 rounded-lg text-primary shrink-0">
                                    <Phone size={16} />
                                </div>
                                <span>+91 00000 00000</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="p-2 bg-white/5 rounded-lg text-primary shrink-0">
                                    <Mail size={16} />
                                </div>
                                <span>contact@dummyemail.com</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold font-display text-white mb-6">Newsletter</h4>
                        <p className="text-gray-400 text-sm mb-4">Subscribe for offers and updates.</p>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-primary w-full"
                            />
                            <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
                                <ArrowUp size={18} className="rotate-45" />
                            </button>
                        </div>

                        <div className="flex space-x-4 mt-8">
                            {[Facebook, Instagram, Twitter].map((Icon, index) => (
                                <a
                                    key={index}
                                    href="#"
                                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Bhopal Food Choice. All rights reserved.</p>
                    <button onClick={scrollToTop} className="flex items-center gap-2 hover:text-primary transition-colors">
                        Back to Top <ArrowUp size={16} />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
