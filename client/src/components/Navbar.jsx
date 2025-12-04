import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, Phone, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import StickyCallBar from './StickyCallBar';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const { cart } = useCart();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);

        const user = JSON.parse(localStorage.getItem('userInfo'));
        setUserInfo(user);

        return () => window.removeEventListener('scroll', handleScroll);
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        setUserInfo(null);
        navigate('/login');
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Menu', path: '/menu' },
        { name: 'Track Train', path: '/track-train' },
        { name: 'My Orders', path: '/my-orders' },
        { name: 'About', path: '/about' }
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
                className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-300 ${scrolled ? 'pt-4' : 'pt-6'}`}
            >
                <div className={`
                    relative w-[95%] max-w-6xl mx-auto px-6 py-3 rounded-full transition-all duration-500
                    ${scrolled
                        ? 'bg-white/80 backdrop-blur-xl shadow-soft border border-white/40'
                        : 'bg-white/50 backdrop-blur-md border border-white/20 shadow-sm'}
                `}>
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="relative w-10 h-10 flex items-center justify-center">
                                <div className="absolute inset-0 bg-primary rounded-xl rotate-3 group-hover:rotate-12 transition-transform duration-300" />
                                <div className="absolute inset-0 bg-dark rounded-xl -rotate-3 group-hover:-rotate-6 transition-transform duration-300" />
                                <span className="relative text-white font-display font-bold text-xl">B</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xl font-display font-bold text-dark leading-none tracking-tight">
                                    Bhopal<span className="text-primary">Food</span>
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-1 bg-gray-100/50 p-1 rounded-full border border-white/50">
                            {navLinks.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        className={`
                                            relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                                            ${isActive ? 'text-dark' : 'text-gray-500 hover:text-dark'}
                                        `}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute inset-0 bg-white shadow-sm rounded-full"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        <span className="relative z-10">{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3">
                            <button className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 text-dark hover:bg-primary hover:text-white transition-all duration-300">
                                <Search size={18} />
                            </button>

                            <Link to="/cart" className="relative w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-dark hover:bg-primary hover:text-white transition-all duration-300 group">
                                <ShoppingBag size={18} />
                                {cart.length > 0 && (
                                    <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white group-hover:border-primary transition-colors"
                                    >
                                        {cart.reduce((acc, item) => acc + item.quantity, 0)}
                                    </motion.span>
                                )}
                            </Link>

                            {userInfo ? (
                                <button
                                    onClick={handleLogout}
                                    className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                                >
                                    <User size={16} />
                                    <span className="text-sm font-bold">Logout</span>
                                </button>
                            ) : (
                                <Link to="/login" className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-dark text-white hover:bg-primary transition-colors shadow-lg shadow-dark/20 hover:shadow-primary/30">
                                    <User size={16} />
                                    <span className="text-sm font-bold">Login</span>
                                </Link>
                            )}

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-gray-50 text-dark"
                            >
                                {isOpen ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            className="absolute top-24 left-4 right-4 bg-white rounded-3xl shadow-2xl border border-gray-100 p-4 md:hidden overflow-hidden"
                        >
                            <div className="flex flex-col gap-2">
                                {navLinks.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.path}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center justify-between px-6 py-4 rounded-2xl hover:bg-gray-50 transition-colors group"
                                    >
                                        <span className="text-lg font-bold text-dark group-hover:text-primary transition-colors">{item.name}</span>
                                        <div className="w-8 h-8 rounded-full bg-white border border-gray-100 flex items-center justify-center group-hover:border-primary/20 group-hover:text-primary transition-colors">
                                            <span className="text-xl">→</span>
                                        </div>
                                    </Link>
                                ))}
                                <div className="h-px bg-gray-100 my-2" />
                                {userInfo ? (
                                    <button onClick={() => { handleLogout(); setIsOpen(false); }} className="btn-primary w-full text-center justify-center bg-red-500 text-white">
                                        Logout
                                    </button>
                                ) : (
                                    <Link to="/login" onClick={() => setIsOpen(false)} className="btn-primary w-full text-center justify-center">
                                        Login / Sign Up
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
            <StickyCallBar />
        </>
    );
};

export default Navbar;
