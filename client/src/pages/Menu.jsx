import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, Star, Flame, Gift, Sparkles } from 'lucide-react';

const Menu = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const { addToCart } = useCart();

    // Mock Data (Replace with API call later)
    const mockItems = [
        { _id: '1', name: 'Shahi Paneer Thali', price: 249, category: 'Thalis', image: '/images/shahi-paneer-thali.jpg', rating: 4.8, isVeg: true, spiceLevel: 'Medium' },
        { _id: '2', name: 'Chicken Dum Biryani', price: 299, category: 'Biryani', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=2574&auto=format&fit=crop', rating: 4.9, isVeg: false, spiceLevel: 'High' },
        { _id: '3', name: 'Masala Dosa', price: 149, category: 'South Indian', image: '/images/masala-dosa.jpg', rating: 4.5, isVeg: true, spiceLevel: 'Low' },
        { _id: '4', name: 'Butter Naan', price: 45, category: 'Breads', image: '/images/butter-naan.jpg', rating: 4.7, isVeg: true, spiceLevel: 'None' },
        { _id: '5', name: 'Gulab Jamun', price: 99, category: 'Desserts', image: '/images/gulab-jamun.jpg', rating: 4.9, isVeg: true, spiceLevel: 'None' },
        { _id: '6', name: 'Paneer Tikka', price: 220, category: 'Starters', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=2517&auto=format&fit=crop', rating: 4.6, isVeg: true, spiceLevel: 'Medium' },
    ];

    const categories = ['All', 'Thalis', 'Biryani', 'South Indian', 'Breads', 'Desserts', 'Starters'];

    useEffect(() => {
        // Simulate API fetch
        setTimeout(() => {
            setItems(mockItems);
            setLoading(false);
        }, 1000);
    }, []);

    const filteredItems = items.filter(item => {
        const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const addMysteryBox = () => {
        const mysteryItem = {
            _id: 'mystery-' + Date.now(),
            name: '🎁 Mystery Royal Box',
            price: 299,
            image: '/images/gulab-jamun.jpg',
            quantity: 1
        };
        addToCart(mysteryItem);
        alert("🎉 Mystery Box added! Get ready for a surprise!");
    };

    return (
        <div className="min-h-screen bg-light pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-dark mb-4">
                        Our <span className="text-primary">Menu</span>
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore our wide range of authentic delicacies, prepared with love and hygiene.
                    </p>
                </div>

                {/* Mystery Box Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 relative overflow-hidden shadow-xl text-white"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-6">
                            <div className="hidden md:block w-32 h-32 rounded-2xl overflow-hidden shadow-lg border-4 border-white/20 rotate-3">
                                <img
                                    src="/images/gulab-jamun.jpg"
                                    alt="Mystery Box"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Sparkles className="text-yellow-300" />
                                    <span className="font-bold text-yellow-300 tracking-wider text-sm uppercase">Limited Time Offer</span>
                                </div>
                                <h3 className="text-3xl font-display font-bold mb-2">Feeling Adventurous?</h3>
                                <p className="text-white/80 max-w-md">Try our <strong>Mystery Royal Box</strong>! Get a curated premium meal worth ₹450 for just ₹299.</p>
                            </div>
                        </div>
                        <button
                            onClick={addMysteryBox}
                            className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-lg group whitespace-nowrap"
                        >
                            <Gift size={20} className="group-hover:animate-bounce" /> Add Mystery Box @ ₹299
                        </button>
                    </div>
                </motion.div>

                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search for dishes..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white shadow-sm"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto no-scrollbar">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${activeCategory === category
                                    ? 'bg-primary text-white shadow-lg scale-105'
                                    : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-primary border border-gray-100'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Menu Grid */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence>
                            {filteredItems.map((item) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    key={item._id}
                                    className="bg-white rounded-3xl overflow-hidden card-hover border border-gray-100 group relative"
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                                            <Star size={14} className="text-yellow-400 fill-current" />
                                            <span className="text-xs font-bold">{item.rating}</span>
                                        </div>
                                        {item.spiceLevel === 'High' && (
                                            <div className="absolute top-4 left-4 bg-red-500/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1 shadow-sm text-white">
                                                <Flame size={14} className="fill-current" />
                                                <span className="text-xs font-bold">Spicy</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold font-display text-dark group-hover:text-primary transition-colors">{item.name}</h3>
                                            <div className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center ${item.isVeg ? 'border-green-500' : 'border-red-500'}`}>
                                                <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`} />
                                            </div>
                                        </div>
                                        <p className="text-gray-500 text-sm mb-4">{item.category}</p>

                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl font-bold text-dark">₹{item.price}</span>
                                            <button
                                                onClick={() => addToCart({ ...item, quantity: 1 })}
                                                className="btn-primary px-6 py-2 text-sm shadow-lg shadow-primary/30"
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Menu;
