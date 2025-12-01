import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { Check, Plus, ShoppingBag, RotateCcw, X } from 'lucide-react';

const ThaliBuilder = () => {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    // Mock Data for Thali Options
    const options = {
        breads: [
            { id: 'b1', name: 'Butter Naan', price: 40, image: '/images/butter-naan.jpg', type: 'bread' },
            { id: 'b2', name: 'Tandoori Roti', price: 20, image: '/images/tandoori-roti.jpg', type: 'bread' },
            { id: 'b3', name: 'Garlic Naan', price: 50, image: '/images/garlic-naan.jpg', type: 'bread' },
        ],
        curries: [
            { id: 'c1', name: 'Paneer Butter Masala', price: 180, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1971&auto=format&fit=crop', type: 'bowl' },
            { id: 'c2', name: 'Dal Tadka', price: 120, image: '/images/dal-tadka.jpg', type: 'bowl' },
            { id: 'c3', name: 'Chana Masala', price: 140, image: '/images/chana-masala.jpg', type: 'bowl' },
        ],
        rice: [
            { id: 'r1', name: 'Jeera Rice', price: 100, image: '/images/jeera-rice.jpg', type: 'bowl' },
            { id: 'r2', name: 'Veg Pulao', price: 120, image: '/images/veg-pulao.jpg', type: 'bowl' },
        ],
        sweets: [
            { id: 's1', name: 'Gulab Jamun', price: 60, image: '/images/gulab-jamun.jpg', type: 'bowl' },
            { id: 's2', name: 'Rasmalai', price: 80, image: '/images/rasmalai.jpg', type: 'bowl' },
        ],
        sides: [
            { id: 'sd1', name: 'Raita', price: 40, image: '/images/raita.jpg', type: 'bowl' },
            { id: 'sd2', name: 'Green Salad', price: 30, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop', type: 'bowl' },
        ]
    };

    const [selectedItems, setSelectedItems] = useState([]);

    const handleSelect = (item) => {
        // Check if item is already selected
        if (selectedItems.find(i => i.id === item.id)) {
            setSelectedItems(prev => prev.filter(i => i.id !== item.id));
            return;
        }

        // Limit total items to 6 for the plate visual
        if (selectedItems.length >= 6) {
            alert("Your thali is full! Remove an item to add more.");
            return;
        }

        setSelectedItems(prev => [...prev, item]);
    };

    const removeItem = (itemId) => {
        setSelectedItems(prev => prev.filter(i => i.id !== itemId));
    };

    const calculateTotal = () => {
        return selectedItems.reduce((acc, item) => acc + item.price, 0);
    };

    const handleAddToCart = () => {
        const thaliItem = {
            _id: 'custom-thali-' + Date.now(),
            name: 'Custom Nawab Thali',
            price: calculateTotal(),
            imageURL: '/images/deluxe-veg-thali.jpg',
            description: `Custom Thali with ${selectedItems.map(i => i.name).join(', ')}`,
            category: 'Thalis',
            isVeg: true
        };
        addToCart(thaliItem);
        navigate('/cart');
    };

    const resetThali = () => {
        setSelectedItems([]);
    };

    // Helper to calculate position for circular arrangement
    const getPosition = (index, total) => {
        const bowlItems = selectedItems.filter(i => i.type === 'bowl');
        const breadItems = selectedItems.filter(i => i.type === 'bread');

        // If this is a bread item, return center bottom position
        if (selectedItems[index].type === 'bread') {
            const breadIndex = breadItems.findIndex(b => b.id === selectedItems[index].id);
            return { bottom: '10%', left: '10%', transform: `rotate(${breadIndex * 10}deg)` };
        }

        // For bowls, distribute them along the top/right edge
        const bowlIndex = bowlItems.findIndex(b => b.id === selectedItems[index].id);
        const positions = [
            { top: '10%', left: '35%' }, // Top Center
            { top: '20%', right: '15%' }, // Top Right
            { top: '50%', right: '5%', transform: 'translateY(-50%)' }, // Right Center
            { bottom: '20%', right: '15%' }, // Bottom Right
            { top: '20%', left: '15%' }, // Top Left
        ];

        return positions[bowlIndex] || { top: '50%', left: '50%' };
    };

    return (
        <div className="min-h-screen bg-light pt-24 pb-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-display font-bold text-dark mb-4">Build Your <span className="text-primary">Nawab Thali</span></h1>
                    <p className="text-gray-600">Customize your royal platter. Add up to 6 items!</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Selection Area */}
                    <div className="lg:col-span-2 space-y-8 h-[calc(100vh-200px)] overflow-y-auto pr-2 custom-scrollbar">
                        {Object.entries(options).map(([category, items]) => (
                            <div key={category} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                                <h3 className="text-xl font-bold font-display text-dark capitalize mb-4">Choose {category}</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {items.map((item) => {
                                        const isSelected = selectedItems.find(i => i.id === item.id);

                                        return (
                                            <motion.div
                                                key={item.id}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => handleSelect(item)}
                                                className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 relative ${isSelected
                                                    ? 'border-primary ring-2 ring-primary/20 shadow-lg'
                                                    : 'border-transparent hover:border-gray-200 shadow-sm'
                                                    }`}
                                            >
                                                <div className="h-28 w-full">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="p-3 bg-white">
                                                    <p className="font-medium text-sm text-dark truncate">{item.name}</p>
                                                    <div className="flex justify-between items-center mt-1">
                                                        <p className="text-primary font-bold text-sm">₹{item.price}</p>
                                                        {isSelected ? (
                                                            <div className="bg-primary text-white rounded-full p-1">
                                                                <Check size={12} />
                                                            </div>
                                                        ) : (
                                                            <div className="bg-gray-100 text-gray-400 rounded-full p-1">
                                                                <Plus size={12} />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Preview Plate */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28">
                            <div className="bg-white p-6 rounded-3xl shadow-card border border-gray-100 text-center relative overflow-hidden">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-2xl font-bold font-display text-dark">Your Plate</h3>
                                    <button onClick={resetThali} className="text-gray-400 hover:text-red-500 transition-colors" title="Reset Plate">
                                        <RotateCcw size={20} />
                                    </button>
                                </div>

                                {/* Realistic Plate Visualization */}
                                <div className="relative w-80 h-80 mx-auto mb-8">
                                    {/* Steel Thali Base */}
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 shadow-2xl border-4 border-gray-300">
                                        <div className="absolute inset-2 rounded-full border border-gray-400/50"></div>
                                        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 shadow-inner"></div>
                                    </div>

                                    {/* Items on Plate */}
                                    <AnimatePresence>
                                        {selectedItems.map((item, index) => {
                                            const pos = getPosition(index, selectedItems.length);
                                            const isBread = item.type === 'bread';

                                            return (
                                                <motion.div
                                                    key={item.id}
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    exit={{ scale: 0, opacity: 0 }}
                                                    style={{ ...pos, position: 'absolute' }}
                                                    className={`z-10 ${isBread ? 'w-40 h-40' : 'w-20 h-20'}`}
                                                >
                                                    {isBread ? (
                                                        <img
                                                            src={item.image}
                                                            className="w-full h-full object-contain drop-shadow-2xl"
                                                            style={{ filter: 'drop-shadow(0px 4px 4px rgba(0,0,0,0.25))' }}
                                                        />
                                                    ) : (
                                                        // Katori Style for Bowls
                                                        <div className="w-full h-full rounded-full bg-gradient-to-b from-gray-100 to-gray-300 p-1 shadow-lg border border-gray-300">
                                                            <div className="w-full h-full rounded-full overflow-hidden border-2 border-gray-200 relative">
                                                                <img src={item.image} className="w-full h-full object-cover" />
                                                                <div className="absolute inset-0 bg-black/5 ring-1 ring-inset ring-black/10 rounded-full"></div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Remove Button on Hover (optional, but good for UX) */}
                                                    <button
                                                        onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}
                                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 hover:opacity-100 transition-opacity"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </motion.div>
                                            );
                                        })}
                                    </AnimatePresence>

                                    {selectedItems.length === 0 && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <p className="text-gray-400 font-medium text-sm w-32">Select items to fill your thali</p>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-3 mb-6 text-left bg-gray-50 p-4 rounded-2xl max-h-48 overflow-y-auto custom-scrollbar">
                                    {selectedItems.map((item) => (
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            key={item.id}
                                            className="flex justify-between text-sm items-center"
                                        >
                                            <span className="text-gray-600 capitalize flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-primary"></div>
                                                {item.name}
                                            </span>
                                            <div className="flex items-center gap-3">
                                                <span className="font-medium text-dark">₹{item.price}</span>
                                                <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500">
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                    {selectedItems.length === 0 && (
                                        <p className="text-center text-gray-400 text-sm py-2">No items added yet</p>
                                    )}
                                </div>

                                <div className="border-t border-gray-100 pt-4 mb-6">
                                    <div className="flex justify-between items-center text-2xl font-bold text-dark">
                                        <span>Total</span>
                                        <span className="text-primary">₹{calculateTotal()}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    disabled={selectedItems.length < 3}
                                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed py-3 shadow-lg shadow-primary/30"
                                >
                                    <ShoppingBag size={20} />
                                    Add Thali to Cart
                                </button>
                                {selectedItems.length < 3 && selectedItems.length > 0 && (
                                    <p className="text-xs text-red-400 mt-2">Add at least 3 items to order</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThaliBuilder;
