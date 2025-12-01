import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star, Clock, Truck, Utensils, Flame, ChefHat, Users, X, ShieldCheck, MapPin, Play, ChevronRight } from 'lucide-react';
import FoodStories from '../components/FoodStories';
import TrainTracker from '../components/TrainTracker';

const Home = () => {
    const [activeFeature, setActiveFeature] = useState(null);
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    const categories = [
        { name: 'Royal Thalis', image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=1887&auto=format&fit=crop', count: '12 Varieties' },
        { name: 'Hyderabadi Biryani', image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=2670&auto=format&fit=crop', count: '8 Types' },
        { name: 'Paneer Delights', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=2517&auto=format&fit=crop', count: '15 Dishes' },
        { name: 'Mithai & Desserts', image: '/mithai-dessert.jpg', count: '6 Sweets' },
    ];

    const features = [
        {
            id: 1,
            icon: <Utensils size={32} />,
            title: "Premium Quality",
            desc: "Top-rated restaurants and hygienic preparation guaranteed.",
            detailTitle: "5-Star Hygiene Promise",
            detailContent: "We don't just deliver food; we deliver trust. Our restaurant partners are selected after a rigorous 15-point quality check. We use high-grade, food-safe packaging that keeps your meal hot and fresh for up to 60 minutes.",
            detailIcon: <ShieldCheck size={48} className="text-green-500" />
        },
        {
            id: 2,
            icon: <Clock size={32} />,
            title: "On Time Delivery",
            desc: "We track your train to ensure food reaches you exactly when you arrive.",
            detailTitle: "Zero-Miss Guarantee",
            detailContent: "Our 'Smart-Sync' technology tracks your train's real-time location. Whether your train is early or late, our delivery executive will be at the platform exactly when you arrive. We value your time as much as your taste.",
            detailIcon: <Clock size={48} className="text-blue-500" />
        },
        {
            id: 3,
            icon: <Truck size={32} />,
            title: "Seat Delivery",
            desc: "No need to get off. We deliver right to your coach and seat number.",
            detailTitle: "Right to Your Seat",
            detailContent: "Relax and enjoy your journey. You don't need to rush to the door or look for our delivery guy. Our authorized personnel deliver directly to your specific seat number. Just sit back, relax, and let the food come to you.",
            detailIcon: <MapPin size={48} className="text-red-500" />
        }
    ];

    return (
        <div className="min-h-screen bg-light overflow-hidden selection:bg-primary selection:text-white">

            {/* Feature Detail Modal */}
            <AnimatePresence>
                {activeFeature && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-dark/80 backdrop-blur-sm"
                        onClick={() => setActiveFeature(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white rounded-[2rem] p-8 max-w-md w-full relative shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-orange-50 to-transparent -z-10" />
                            <button
                                onClick={() => setActiveFeature(null)}
                                className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors shadow-sm border border-gray-100"
                            >
                                <X size={20} />
                            </button>

                            <div className="flex flex-col items-center text-center pt-4">
                                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-float border border-gray-50 text-primary">
                                    {activeFeature.detailIcon}
                                </div>
                                <h3 className="text-2xl font-display font-bold text-dark mb-4">{activeFeature.detailTitle}</h3>
                                <p className="text-gray-600 leading-relaxed mb-8 font-light">
                                    {activeFeature.detailContent}
                                </p>
                                <button
                                    onClick={() => setActiveFeature(null)}
                                    className="btn-primary w-full"
                                >
                                    Got it, thanks!
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
                {/* Abstract Background Shapes */}
                <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-[100px] animate-float" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-secondary/5 rounded-full blur-[120px] animate-float-delayed" />
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Text Content */}
                        <div className="text-left relative">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <div className="inline-flex items-center gap-2 py-2 px-4 rounded-full bg-white/80 backdrop-blur-sm border border-white/40 shadow-sm mb-8">
                                    <span className="flex h-2 w-2 relative">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    <span className="text-sm font-semibold text-dark tracking-wide uppercase text-[10px]">Delivering to 500+ Trains</span>
                                </div>

                                <h1 className="text-6xl md:text-8xl font-display font-bold text-dark mb-6 leading-[0.95] tracking-tight">
                                    Taste the <br />
                                    <span className="text-gradient italic pr-2">Royal</span>
                                    Legacy.
                                </h1>

                                <p className="text-xl text-gray-600 mb-10 max-w-lg leading-relaxed font-light">
                                    Experience the authentic flavors of Bhopal delivered hot & fresh directly to your train seat.
                                </p>

                                <div className="flex flex-wrap gap-4 mb-16">
                                    <Link to="/menu" className="btn-primary group">
                                        Order Now
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                    <Link to="/track-train" className="btn-secondary group">
                                        <Play size={18} className="fill-current" />
                                        Track Train
                                    </Link>
                                </div>

                                <div className="flex items-center gap-8">
                                    <div className="flex -space-x-4">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div key={i} className="w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-sm">
                                                <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1 text-yellow-500 mb-1">
                                            <Star size={16} fill="currentColor" />
                                            <Star size={16} fill="currentColor" />
                                            <Star size={16} fill="currentColor" />
                                            <Star size={16} fill="currentColor" />
                                            <Star size={16} fill="currentColor" />
                                        </div>
                                        <p className="text-sm font-medium text-gray-500">Trusted by <span className="text-dark font-bold">15,000+</span> travelers</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Visual Composition */}
                        <div className="relative h-[700px] hidden lg:block perspective-1000">
                            {/* Main Plate */}
                            <motion.div
                                style={{ y: y1 }}
                                animate={{
                                    y: [0, -20, 0],
                                    rotate: [0, 2, -2, 0]
                                }}
                                transition={{
                                    duration: 6,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute top-10 right-10 w-[500px] h-[500px] z-20"
                            >
                                <div className="relative w-full h-full">
                                    <div className="absolute inset-0 bg-black/20 rounded-full blur-[60px] transform scale-90 translate-y-10" />
                                    <img
                                        src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=2574&auto=format&fit=crop"
                                        alt="Royal Thali"
                                        className="w-full h-full object-cover rounded-full border-[8px] border-white shadow-2xl"
                                    />



                                    {/* Floating Badge */}
                                    <motion.div
                                        animate={{ y: [0, -15, 0] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                        className="absolute -bottom-10 -left-10 glass-card p-4 rounded-2xl flex items-center gap-4 max-w-[200px] z-30"
                                    >
                                        <div className="bg-green-100 p-3 rounded-full text-green-600">
                                            <Utensils size={24} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-dark text-lg">Fresh</p>
                                            <p className="text-xs text-gray-500">Prepared just now</p>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* Secondary Elements - Spices */}
                            <motion.div
                                style={{ y: y2 }}
                                className="absolute top-40 left-0 w-64 h-64 z-10 opacity-80"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=2670&auto=format&fit=crop"
                                    alt="Indian Spices"
                                    className="w-full h-full object-cover rounded-[2rem] shadow-xl rotate-[-12deg] border-4 border-white"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stories Section */}
            <section className="py-12 border-y border-gray-100 bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-display font-bold text-dark">Visual Stories</h2>
                        <Link to="/menu" className="text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
                            View Menu <ChevronRight size={18} />
                        </Link>
                    </div>
                    <FoodStories />
                </div>
            </section>

            {/* Bento Grid Features */}
            <section className="section-padding relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Why Choose Us</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-dark">
                            More Than Just <span className="text-gradient">Food Delivery</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[300px]">
                        {/* Large Card */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="md:col-span-2 row-span-1 bg-dark rounded-[2.5rem] p-10 relative overflow-hidden group shadow-card"
                        >
                            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                            <div className="relative z-10 h-full flex flex-col justify-end text-white">
                                <div className="bg-primary/20 backdrop-blur-md w-fit p-3 rounded-2xl mb-4 border border-white/10">
                                    <Flame size={24} className="text-primary" />
                                </div>
                                <h3 className="text-3xl font-display font-bold mb-2">Authentic Bhopali Flavors</h3>
                                <p className="text-white/70 max-w-md text-lg font-light">
                                    Prepared by legendary local chefs using age-old recipes passed down through generations.
                                </p>
                            </div>
                        </motion.div>

                        {/* Tall Card */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="md:col-span-1 row-span-2 bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-soft relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-orange-100" />

                            <div className="relative z-10 h-full flex flex-col">
                                <div className="w-16 h-16 bg-white rounded-2xl shadow-float flex items-center justify-center text-primary mb-8">
                                    <Clock size={32} />
                                </div>
                                <h3 className="text-3xl font-display font-bold mb-4">On-Time Guarantee</h3>
                                <p className="text-gray-500 leading-relaxed mb-8 flex-grow">
                                    We track your train in real-time. If your train is delayed, we wait. If it's early, we are already there.
                                </p>

                                <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-bold text-gray-400 uppercase">Avg. Delivery Time</span>
                                        <span className="text-green-500 font-bold text-sm">98% On Time</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-green-500 h-2 rounded-full w-[98%]" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Medium Card */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="md:col-span-1 bg-gradient-to-br from-primary to-secondary rounded-[2.5rem] p-8 text-white shadow-glow relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Utensils size={120} />
                            </div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-display font-bold mb-2">Hygiene First</h3>
                                <p className="text-white/80 font-light text-sm mb-6">FSSAI Certified Kitchens only.</p>
                                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full w-fit">
                                    <ShieldCheck size={16} />
                                    <span className="text-sm font-bold">100% Safe</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Medium Card */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="md:col-span-1 bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-soft flex flex-col justify-center items-center text-center group cursor-pointer"
                            onClick={() => setActiveFeature(features[2])}
                        >
                            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                                <MapPin size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-2">Seat Delivery</h3>
                            <p className="text-gray-500 text-sm">Directly to your berth.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Group Ordering Banner */}
            <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-r from-violet-600 to-indigo-600 shadow-2xl"
                >
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[100px] -mr-20 -mt-20" />
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/20 rounded-full blur-[80px] -ml-10 -mb-10" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-16 gap-8">
                        <div className="text-center md:text-left max-w-xl">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-sm font-bold mb-6">
                                <Users size={16} />
                                <span>Train Coupe Mode</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
                                Traveling with <br />Friends & Family?
                            </h2>
                            <p className="text-white/80 text-lg mb-8 leading-relaxed">
                                Create a group order and let everyone add their favorite dishes to a single cart. No more passing the phone around!
                            </p>
                            <Link to="/group-order" className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                                Start Group Order <ArrowRight size={20} />
                            </Link>
                        </div>

                        <div className="relative">
                            <div className="w-64 h-64 md:w-80 md:h-80 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-glow relative animate-float">
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-full" />
                                <Users size={120} className="text-white drop-shadow-lg" />

                                {/* Floating Avatars */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                                    className="absolute -top-4 -right-4 w-16 h-16 rounded-full border-4 border-white overflow-hidden shadow-lg"
                                >
                                    <img src="https://i.pravatar.cc/100?img=12" alt="User" className="w-full h-full object-cover" />
                                </motion.div>
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                                    className="absolute top-1/2 -left-8 w-14 h-14 rounded-full border-4 border-white overflow-hidden shadow-lg"
                                >
                                    <img src="https://i.pravatar.cc/100?img=32" alt="User" className="w-full h-full object-cover" />
                                </motion.div>
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                                    className="absolute -bottom-2 -right-2 w-20 h-20 rounded-full border-4 border-white overflow-hidden shadow-lg"
                                >
                                    <img src="https://i.pravatar.cc/100?img=5" alt="User" className="w-full h-full object-cover" />
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Categories Marquee */}
            <section className="py-20 bg-dark text-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 flex justify-between items-end">
                    <div>
                        <span className="text-primary font-bold tracking-widest uppercase text-sm mb-2 block">Our Menu</span>
                        <h2 className="text-4xl font-display font-bold text-white">Curated Collections</h2>
                    </div>
                    <Link to="/menu" className="hidden md:flex items-center gap-2 text-white/70 hover:text-white transition-colors">
                        View Full Menu <ArrowRight size={20} />
                    </Link>
                </div>

                <div className="flex gap-6 overflow-x-auto pb-8 px-4 sm:px-6 lg:px-8 no-scrollbar snap-x">
                    {categories.map((cat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="min-w-[280px] md:min-w-[320px] snap-center"
                        >
                            <Link to="/menu" className="block group relative rounded-[2rem] overflow-hidden aspect-[3/4]">
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90" />
                                <div className="absolute bottom-0 left-0 p-8">
                                    <h3 className="text-2xl font-display font-bold mb-1 text-white">{cat.name}</h3>
                                    <p className="text-white/80 text-sm font-medium">{cat.count}</p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
