import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, Train, User, Phone, MapPin, ShoppingBag, CreditCard, Wallet, Smartphone, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { createOrder } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, total, clearCart } = useCart();
    const [formData, setFormData] = useState({
        customerName: '',
        phone: '',
        trainNumber: '',
        coach: '',
        seatNumber: ''
    });
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentStep, setPaymentStep] = useState('method'); // method, processing, success
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        setShowPaymentModal(true);
    };

    const processPayment = async () => {
        setPaymentStep('processing');

        // Simulate Payment Gateway Delay
        setTimeout(async () => {
            try {
                const orderData = {
                    ...formData,
                    items: cart.map(item => ({
                        menuItem: item._id,
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price
                    })),
                    totalAmount: total,
                    paymentId: 'PAY_' + Math.random().toString(36).substr(2, 9).toUpperCase()
                };

                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                const token = userInfo?.token;

                await createOrder(orderData, token);
                setPaymentStep('success');

                // Close and Redirect after success
                setTimeout(() => {
                    clearCart();
                    setShowPaymentModal(false);
                    navigate('/my-orders');
                }, 2000);

            } catch (error) {
                console.error('Error placing order:', error);
                alert('Failed to place order.');
                setShowPaymentModal(false);
                setPaymentStep('method');
            }
        }, 2000);
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center pt-16 text-center px-4 bg-light">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-12 rounded-3xl max-w-md w-full shadow-card border border-gray-100"
                >
                    <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                        <ShoppingBag size={48} />
                    </div>
                    <h2 className="text-3xl font-display font-bold text-dark mb-4">Your Cart is Empty</h2>
                    <p className="text-gray-500 mb-8 font-light">Looks like you haven't added any delicious food yet.</p>
                    <button
                        onClick={() => navigate('/menu')}
                        className="btn-primary w-full shadow-lg"
                    >
                        Browse Menu
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-light pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-display font-bold text-dark mb-12">Your <span className="text-primary">Cart</span></h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Cart Items */}
                    <div className="space-y-6">
                        {cart.map((item) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={item._id}
                                className="bg-white p-4 rounded-3xl flex items-center justify-between shadow-soft hover:shadow-card transition-all border border-gray-100"
                            >
                                <div className="flex items-center space-x-6">
                                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
                                        <img
                                            src={item.image || item.imageURL || 'https://via.placeholder.com/100'}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="font-bold font-display text-dark text-xl mb-1">{item.name}</h3>
                                        <p className="text-primary font-bold text-lg">₹{item.price}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end space-y-4">
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                    <div className="flex items-center space-x-3 bg-gray-50 rounded-xl p-1.5 border border-gray-100">
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                            className="p-2 hover:bg-white rounded-lg transition-colors text-gray-600 shadow-sm"
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="font-bold w-6 text-center text-dark">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                            className="p-2 hover:bg-white rounded-lg transition-colors text-gray-600 shadow-sm"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        <div className="bg-white p-8 rounded-3xl shadow-card border border-gray-100">
                            <div className="flex justify-between items-center text-2xl font-bold font-display text-dark">
                                <span>Total Amount</span>
                                <span className="text-primary">₹{total}</span>
                            </div>
                        </div>
                    </div>

                    {/* Checkout Form */}
                    <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl h-fit sticky top-28 shadow-card border border-white/20">
                        <h2 className="text-2xl font-bold font-display text-dark mb-8 flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                <Train size={24} />
                            </div>
                            Delivery Details
                        </h2>
                        <form onSubmit={handlePlaceOrder} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2 ml-1">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        type="text"
                                        name="customerName"
                                        required
                                        value={formData.customerName}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-dark placeholder-gray-400 font-medium"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2 ml-1">Phone Number</label>
                                <div className="relative group">
                                    <Phone className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-dark placeholder-gray-400 font-medium"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2 ml-1">Train Number</label>
                                    <div className="relative group">
                                        <Train className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                                        <input
                                            type="text"
                                            name="trainNumber"
                                            required
                                            value={formData.trainNumber}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-dark placeholder-gray-400 font-medium"
                                            placeholder="12002"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 mb-2 ml-1">Coach</label>
                                    <div className="relative group">
                                        <MapPin className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                                        <input
                                            type="text"
                                            name="coach"
                                            required
                                            value={formData.coach}
                                            onChange={handleChange}
                                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-dark placeholder-gray-400 font-medium"
                                            placeholder="B1"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-2 ml-1">Seat Number</label>
                                <input
                                    type="text"
                                    name="seatNumber"
                                    required
                                    value={formData.seatNumber}
                                    onChange={handleChange}
                                    className="w-full px-6 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-dark placeholder-gray-400 font-medium"
                                    placeholder="45"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={showPaymentModal}
                                className="btn-primary w-full mt-8 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed py-4 text-lg shadow-glow"
                            >
                                Proceed to Pay <ArrowRight className="ml-2" size={24} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Mock Payment Modal */}
            <AnimatePresence>
                {showPaymentModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl"
                        >
                            {paymentStep === 'method' && (
                                <div className="p-8">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-2xl font-bold font-display text-dark">Payment Method</h3>
                                        <span className="text-primary font-bold text-xl">₹{total}</span>
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <button onClick={processPayment} className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-orange-50 transition-all group">
                                            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm">
                                                <Smartphone size={24} />
                                            </div>
                                            <div className="text-left">
                                                <p className="font-bold text-dark">UPI</p>
                                                <p className="text-xs text-gray-500">Google Pay, PhonePe, Paytm</p>
                                            </div>
                                        </button>

                                        <button onClick={processPayment} className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-orange-50 transition-all group">
                                            <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm">
                                                <CreditCard size={24} />
                                            </div>
                                            <div className="text-left">
                                                <p className="font-bold text-dark">Card</p>
                                                <p className="text-xs text-gray-500">Visa, Mastercard, RuPay</p>
                                            </div>
                                        </button>

                                        <button onClick={processPayment} className="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-orange-50 transition-all group">
                                            <div className="w-12 h-12 rounded-full bg-green-50 text-green-500 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm">
                                                <Wallet size={24} />
                                            </div>
                                            <div className="text-left">
                                                <p className="font-bold text-dark">Netbanking</p>
                                                <p className="text-xs text-gray-500">All Indian Banks</p>
                                            </div>
                                        </button>
                                    </div>

                                    <button onClick={() => setShowPaymentModal(false)} className="w-full py-3 text-gray-400 hover:text-dark font-medium">
                                        Cancel Transaction
                                    </button>
                                </div>
                            )}

                            {paymentStep === 'processing' && (
                                <div className="p-12 flex flex-col items-center text-center">
                                    <div className="w-20 h-20 border-4 border-gray-100 border-t-primary rounded-full animate-spin mb-6"></div>
                                    <h3 className="text-xl font-bold text-dark mb-2">Processing Payment</h3>
                                    <p className="text-gray-500">Please do not close this window...</p>
                                </div>
                            )}

                            {paymentStep === 'success' && (
                                <div className="p-12 flex flex-col items-center text-center bg-green-50">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="text-green-500 mb-6"
                                    >
                                        <CheckCircle size={80} fill="currentColor" className="text-white" />
                                    </motion.div>
                                    <h3 className="text-2xl font-bold text-dark mb-2">Payment Successful!</h3>
                                    <p className="text-gray-600">Your order has been placed successfully.</p>
                                    <p className="text-sm text-gray-400 mt-4">Redirecting to home...</p>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Cart;
