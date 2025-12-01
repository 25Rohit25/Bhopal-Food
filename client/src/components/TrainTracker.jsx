import { useState } from 'react';
import { motion } from 'framer-motion';
import { Train, Clock, MapPin, Search, CheckCircle, AlertCircle } from 'lucide-react';

const TrainTracker = () => {
    const [trainNo, setTrainNo] = useState('');
    const [status, setStatus] = useState(null); // null, 'loading', 'success', 'error'
    const [trainData, setTrainData] = useState(null);

    const handleTrack = (e) => {
        e.preventDefault();
        if (!trainNo) return;

        setStatus('loading');

        // Simulate API call
        setTimeout(() => {
            if (trainNo === '12002' || trainNo.length === 5) {
                setTrainData({
                    name: 'Bhopal Shatabdi Express',
                    number: trainNo,
                    status: 'On Time',
                    arrival: '14:30',
                    platform: '1',
                    delay: '0 min'
                });
                setStatus('success');
            } else {
                setStatus('error');
            }
        }, 1500);
    };

    return (
        <div className="bg-white rounded-3xl shadow-card border border-gray-100 p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -mr-8 -mt-8 -z-0"></div>

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary">
                        <Train size={24} />
                    </div>
                    <div>
                        <h3 className="font-display font-bold text-xl text-dark">Track Your Train</h3>
                        <p className="text-sm text-gray-500">Get food delivered to your seat</p>
                    </div>
                </div>

                <form onSubmit={handleTrack} className="mb-6">
                    <div className="relative flex items-center">
                        <Search className="absolute left-4 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Enter Train No. (e.g. 12002)"
                            value={trainNo}
                            onChange={(e) => setTrainNo(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium"
                        />
                        <button
                            type="submit"
                            className="absolute right-2 bg-dark text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-primary transition-colors"
                        >
                            Track
                        </button>
                    </div>
                </form>

                {status === 'loading' && (
                    <div className="flex items-center justify-center py-4 text-gray-500 gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary"></div>
                        <span>Fetching live status...</span>
                    </div>
                )}

                {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-500 bg-red-50 p-4 rounded-xl">
                        <AlertCircle size={20} />
                        <span className="font-medium">Train not found. Please check the number.</span>
                    </div>
                )}

                {status === 'success' && trainData && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-50 border border-green-100 rounded-xl p-4"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h4 className="font-bold text-dark">{trainData.name} ({trainData.number})</h4>
                                <div className="flex items-center gap-1 text-green-700 text-sm font-medium mt-1">
                                    <CheckCircle size={14} />
                                    <span>{trainData.status}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="block text-xs text-gray-500">Arrival</span>
                                <span className="font-bold text-dark text-lg">{trainData.arrival}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600 border-t border-green-200 pt-3 mt-2">
                            <div className="flex items-center gap-1.5">
                                <MapPin size={16} className="text-primary" />
                                <span>Platform {trainData.platform}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock size={16} className="text-primary" />
                                <span>Delay: {trainData.delay}</span>
                            </div>
                        </div>

                        <div className="mt-4 p-2 bg-white rounded-lg text-center text-xs text-gray-500 border border-green-100">
                            Order within <span className="font-bold text-primary">45 mins</span> to get delivery at Bhopal Jn.
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default TrainTracker;
