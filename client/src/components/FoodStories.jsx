import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const stories = [
    { id: 1, title: 'Sizzling Paneer', price: 249, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=2517&auto=format&fit=crop', video: 'https://assets.mixkit.co/videos/preview/mixkit-frying-paneer-in-a-pan-42840-large.mp4' },
    { id: 2, title: 'Hot Biryani', price: 299, image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=2670&auto=format&fit=crop', video: 'https://assets.mixkit.co/videos/preview/mixkit-serving-dinner-rice-from-a-bowl-42839-large.mp4' },
    { id: 3, title: 'Tandoori Roti', price: 45, image: 'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=1887&auto=format&fit=crop', video: 'https://assets.mixkit.co/videos/preview/mixkit-hands-making-bread-dough-42838-large.mp4' },
    { id: 4, title: 'Spicy Curry', price: 199, image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1971&auto=format&fit=crop', video: 'https://assets.mixkit.co/videos/preview/mixkit-cooking-sauce-in-a-pan-42842-large.mp4' },
    { id: 5, title: 'Sweet Treats', price: 99, image: '/images/gulab-jamun.jpg', video: 'https://assets.mixkit.co/videos/preview/mixkit-pouring-syrup-on-pancakes-42841-large.mp4' },
];

const FoodStories = () => {
    const [activeStory, setActiveStory] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRef = useRef(null);
    const { addToCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        if (activeStory && videoRef.current) {
            if (isPlaying) {
                videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
            } else {
                videoRef.current.pause();
            }
        }
    }, [activeStory, isPlaying]);

    const handleOrderNow = (story) => {
        const item = {
            _id: `story-${story.id}`,
            name: story.title,
            price: story.price,
            image: story.image,
            quantity: 1
        };
        addToCart(item);
        setActiveStory(null);
        navigate('/cart');
    };

    const togglePlay = (e) => {
        e.stopPropagation();
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="py-8 overflow-x-auto no-scrollbar">
            <div className="flex space-x-6 px-4 min-w-max">
                {stories.map((story) => (
                    <div key={story.id} className="flex flex-col items-center space-y-2 cursor-pointer group" onClick={() => { setActiveStory(story); setIsPlaying(true); }}>
                        <div className="relative w-20 h-20 rounded-full p-[3px] bg-gradient-to-tr from-primary via-secondary to-accent">
                            <div className="w-full h-full rounded-full border-2 border-white overflow-hidden relative">
                                <img src={story.image} alt={story.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Play size={20} className="text-white fill-current" />
                                </div>
                            </div>
                        </div>
                        <span className="text-xs font-medium text-dark">{story.title}</span>
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {activeStory && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
                        onClick={() => setActiveStory(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="relative w-full max-w-sm aspect-[9/16] bg-dark rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setActiveStory(null)}
                                className="absolute top-4 right-4 z-20 p-2 bg-black/50 rounded-full text-white hover:bg-primary transition-colors"
                            >
                                <X size={24} />
                            </button>

                            {/* Video Player */}
                            <div className="absolute inset-0 bg-black" onClick={togglePlay}>
                                <video
                                    ref={videoRef}
                                    src={activeStory.video}
                                    className="w-full h-full object-cover"
                                    loop
                                    playsInline
                                    autoPlay
                                />
                                {!isPlaying && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                        <Play size={48} className="text-white fill-current opacity-80" />
                                    </div>
                                )}
                            </div>

                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-20">
                                <h3 className="text-white font-bold text-2xl mb-1">{activeStory.title}</h3>
                                <p className="text-white/80 font-medium mb-4">₹{activeStory.price}</p>
                                <button
                                    onClick={() => handleOrderNow(activeStory)}
                                    className="btn-primary w-full py-3 text-sm font-bold shadow-lg shadow-primary/30"
                                >
                                    Order This Now
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FoodStories;
