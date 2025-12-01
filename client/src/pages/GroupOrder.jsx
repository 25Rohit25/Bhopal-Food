import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Share2, Copy, ArrowRight, ShoppingBag, LogIn } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const GroupOrder = () => {
    const [step, setStep] = useState(1); // 1: Create/Join, 2: Share, 3: Active
    const [groupLink, setGroupLink] = useState('');
    const [joinId, setJoinId] = useState('');
    const navigate = useNavigate();
    const { groupId: routeGroupId } = useParams();
    const { joinGroup, groupId, leaveGroup } = useCart();

    useEffect(() => {
        if (routeGroupId) {
            joinGroup(routeGroupId);
            setStep(3);
        }
    }, [routeGroupId]);

    const createGroup = () => {
        const uniqueId = Math.random().toString(36).substring(7);
        const link = `${window.location.origin}/group/${uniqueId}`;
        setGroupLink(link);
        joinGroup(uniqueId);
        setStep(2);
    };

    const handleJoinGroup = () => {
        if (!joinId) return;
        joinGroup(joinId);
        setStep(3);
    };

    const copyLink = () => {
        navigator.clipboard.writeText(groupLink || window.location.href);
        alert('Link copied to clipboard!');
    };

    // If already in a group, show active state
    if (groupId && step === 1) {
        setStep(3);
    }

    return (
        <div className="min-h-screen bg-light pt-24 pb-20 px-4">
            <div className="max-w-3xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-card border border-gray-100 p-8 md:p-12"
                >
                    <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                        <Users size={40} />
                    </div>

                    <h1 className="text-3xl md:text-4xl font-display font-bold text-dark mb-4">
                        Train Coupe Mode
                    </h1>
                    <p className="text-gray-600 text-lg mb-8 max-w-lg mx-auto">
                        Traveling with family or friends? Create a group order so everyone can add their favorite dishes to a single cart.
                    </p>

                    {step === 1 && !groupId && (
                        <div className="flex flex-col gap-6 items-center">
                            <button
                                onClick={createGroup}
                                className="btn-primary px-8 py-4 text-lg flex items-center gap-3 w-full sm:w-auto justify-center"
                            >
                                Start New Group Order <ArrowRight size={24} />
                            </button>

                            <div className="flex items-center gap-4 w-full max-w-md">
                                <div className="h-px bg-gray-200 flex-1"></div>
                                <span className="text-gray-400 font-medium">OR</span>
                                <div className="h-px bg-gray-200 flex-1"></div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                                <input
                                    type="text"
                                    placeholder="Enter Group ID"
                                    value={joinId}
                                    onChange={(e) => setJoinId(e.target.value)}
                                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary"
                                />
                                <button
                                    onClick={handleJoinGroup}
                                    className="btn-secondary px-6 py-3 flex items-center justify-center gap-2"
                                >
                                    <LogIn size={20} /> Join
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6">
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-between gap-4">
                                <code className="text-primary font-bold truncate">{groupLink}</code>
                                <button onClick={copyLink} className="p-2 hover:bg-white rounded-lg transition-colors text-gray-600">
                                    <Copy size={20} />
                                </button>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => {
                                        alert('Sharing via WhatsApp...');
                                    }}
                                    className="px-6 py-3 bg-green-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
                                >
                                    <Share2 size={20} /> Share on WhatsApp
                                </button>
                                <button
                                    onClick={() => navigate('/menu')}
                                    className="px-6 py-3 bg-dark text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
                                >
                                    <ShoppingBag size={20} /> Go to Menu
                                </button>
                            </div>
                            <p className="text-sm text-gray-500">
                                Share this link with your coupe members. Items they add will appear in your cart instantly.
                            </p>
                        </div>
                    )}

                    {step === 3 && groupId && (
                        <div className="space-y-6">
                            <div className="bg-green-50 text-green-700 p-4 rounded-xl font-medium border border-green-100">
                                You are connected to Group: <span className="font-bold">{groupId}</span>
                            </div>
                            <p className="text-gray-600">
                                Any items added to the cart by you or your friends will be synced instantly.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => navigate('/menu')}
                                    className="btn-primary px-8 py-3 flex items-center justify-center gap-2"
                                >
                                    <ShoppingBag size={20} /> Order Food Now
                                </button>
                                <button
                                    onClick={() => {
                                        leaveGroup();
                                        setStep(1);
                                    }}
                                    className="px-6 py-3 border border-red-200 text-red-500 rounded-xl font-bold hover:bg-red-50 transition-colors"
                                >
                                    Leave Group
                                </button>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default GroupOrder;
