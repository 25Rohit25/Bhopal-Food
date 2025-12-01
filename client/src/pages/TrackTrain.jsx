import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Train, MapPin, Clock, Navigation, CheckCircle, AlertCircle, Search, ArrowRight, Wifi } from 'lucide-react';

const TrackTrain = () => {
    const [trainNo, setTrainNo] = useState('12002');
    const [isTracking, setIsTracking] = useState(false);
    const [currentStationIndex, setCurrentStationIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    const route = [
        { name: 'New Delhi', code: 'NDLS', time: '06:00', distance: '0 km' },
        { name: 'Mathura Jn', code: 'MTJ', time: '07:58', distance: '141 km' },
        { name: 'Agra Cantt', code: 'AGC', time: '08:45', distance: '195 km' },
        { name: 'Gwalior Jn', code: 'GWL', time: '10:18', distance: '313 km' },
        { name: 'Jhansi Jn', code: 'VGLJ', time: '11:50', distance: '411 km' },
        { name: 'Bhopal Jn', code: 'BPL', time: '14:30', distance: '703 km' }
    ];

    useEffect(() => {
        let interval;
        if (isTracking) {
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        if (currentStationIndex < route.length - 1) {
                            setCurrentStationIndex(prevIndex => prevIndex + 1);
                            return 0;
                        } else {
                            setIsTracking(false);
                            return 100;
                        }
                    }
                    return prev + 1.5; // Smooth speed
                });
            }, 50);
        }
        return () => clearInterval(interval);
    }, [isTracking, currentStationIndex]);

    const handleTrack = (e) => {
        e.preventDefault();
        setIsTracking(true);
        setCurrentStationIndex(0);
        setProgress(0);
    };

    return (
        <div className="min-h-screen bg-light pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Ambient Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 8, repeat: Infinity, delay: 2 }}
                    className="absolute top-[40%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[100px]"
                />
            </div>

            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block"
                    >
                        <span className="px-4 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-bold tracking-widest text-primary uppercase shadow-sm mb-4 inline-block">
                            Live GPS Tracking
                        </span>
                        <h1 className="text-5xl md:text-6xl font-display font-bold text-dark mb-6 tracking-tight">
                            Track Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Journey</span>
                        </h1>
                        <p className="text-gray-500 text-lg max-w-2xl mx-auto font-light">
                            Precision tracking to ensure your meal arrives exactly when you do.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    {/* Control Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-1 space-y-6"
                    >
                        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-card border border-white/50 relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <h3 className="text-xl font-bold font-display text-dark mb-4 flex items-center gap-2">
                                <Search size={20} className="text-primary" />
                                Find Train
                            </h3>

                            <form onSubmit={handleTrack} className="space-y-4 relative z-10">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Train Number</label>
                                    <input
                                        type="text"
                                        value={trainNo}
                                        onChange={(e) => setTrainNo(e.target.value)}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none font-bold text-dark text-lg transition-all"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full btn-primary py-4 text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all active:scale-95 flex items-center justify-center gap-2"
                                >
                                    Start Tracking <ArrowRight size={20} />
                                </button>
                            </form>
                        </div>

                        {/* Train Info Card */}
                        <div className="bg-white text-dark p-6 rounded-3xl shadow-xl border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-32 bg-orange-50 rounded-full blur-3xl -mr-16 -mt-16" />

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Train Name</p>
                                        <h2 className="text-2xl font-bold font-display text-dark">Bhopal Shatabdi</h2>
                                        <p className="text-primary font-mono mt-1 font-bold">{trainNo}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-primary">
                                        <Train size={24} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                                    <div>
                                        <p className="text-gray-500 text-xs mb-1">Status</p>
                                        <div className="flex items-center gap-2 text-green-600 font-bold">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                            </span>
                                            On Time
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-xs mb-1">Next Stop</p>
                                        <p className="font-bold text-dark">{route[currentStationIndex + 1]?.name || 'Destination'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Live Map Timeline */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-2 bg-white/60 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/50 shadow-soft h-full min-h-[600px] relative"
                    >
                        <div className="absolute top-4 right-6 flex items-center gap-2 text-xs font-bold text-gray-400 bg-white/50 px-3 py-1 rounded-full border border-white">
                            <Wifi size={14} className="text-green-500 animate-pulse" /> LIVE UPDATE
                        </div>

                        <div className="relative pl-8 pt-4 h-full">
                            {/* The Track Line */}
                            <div className="absolute left-[3.25rem] top-8 bottom-12 w-1 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                    className="w-full bg-gradient-to-b from-primary to-secondary"
                                    style={{
                                        height: `calc(${currentStationIndex * 20}% + ${progress * 0.2}%)`,
                                        transition: 'height 0.1s linear'
                                    }}
                                />
                            </div>

                            <div className="space-y-12 relative">
                                {route.map((station, index) => {
                                    const isPassed = index < currentStationIndex;
                                    const isCurrent = index === currentStationIndex;

                                    return (
                                        <motion.div
                                            key={station.code}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className={`relative flex items-center gap-8 ${isPassed || isCurrent ? 'opacity-100' : 'opacity-40 grayscale'}`}
                                        >
                                            {/* Station Node */}
                                            <div className="relative z-10">
                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-500 shadow-lg
                                                    ${isPassed ? 'bg-primary border-primary text-white' :
                                                        isCurrent ? 'bg-white border-primary text-primary scale-110 ring-4 ring-primary/20' :
                                                            'bg-white border-gray-200 text-gray-300'}`}
                                                >
                                                    {isPassed ? <CheckCircle size={20} /> : <div className="w-3 h-3 bg-current rounded-full" />}
                                                </div>
                                            </div>

                                            {/* Station Card */}
                                            <div className={`flex-1 p-5 rounded-2xl border transition-all duration-300
                                                ${isCurrent ? 'bg-white shadow-card border-primary/20 scale-105' : 'bg-transparent border-transparent hover:bg-white/50'}`}
                                            >
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <h3 className={`font-bold text-lg ${isCurrent ? 'text-primary' : 'text-dark'}`}>{station.name}</h3>
                                                        <p className="text-xs font-mono text-gray-400">{station.code} • {station.distance}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="flex items-center gap-1.5 font-bold text-dark">
                                                            <Clock size={16} className="text-gray-400" />
                                                            {station.time}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Live Train Animation */}
                                                <AnimatePresence>
                                                    {isCurrent && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: 'auto', opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-4">
                                                                <div className="relative">
                                                                    <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
                                                                    <div className="relative bg-primary text-white p-2 rounded-full shadow-lg">
                                                                        <Train size={20} />
                                                                    </div>
                                                                </div>
                                                                <div className="flex-1">
                                                                    <div className="flex justify-between text-xs font-bold mb-1">
                                                                        <span className="text-primary">Arriving / Departing</span>
                                                                        <span className="text-gray-400">{Math.round(progress)}%</span>
                                                                    </div>
                                                                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                                                        <motion.div
                                                                            className="h-full bg-primary rounded-full"
                                                                            style={{ width: `${progress}%` }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default TrackTrain;
