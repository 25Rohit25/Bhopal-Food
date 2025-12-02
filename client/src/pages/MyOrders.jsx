import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Tag, Clock, CheckCircle, XCircle, ChevronRight, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getMyOrders, getCoupons } from '../services/api';

const MyOrders = () => {
    const [activeTab, setActiveTab] = useState('orders');
    const [orders, setOrders] = useState([]);
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));

                if (!userInfo || !userInfo.token) {
                    navigate('/login');
                    return;
                }

                // Fetch Orders
                const { data: ordersData } = await getMyOrders(userInfo.token);
                setOrders(ordersData);

                // Fetch Coupons
                const { data: couponsData } = await getCoupons();
                setCoupons(couponsData);

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
                // If error is 401, redirect to login
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                }
            }
        };

        fetchData();
    }, [navigate]);

    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code);
        // You could add a toast notification here
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered': return 'text-green-500 bg-green-50';
            case 'Cancelled': return 'text-red-500 bg-red-50';
            case 'Out for Delivery': return 'text-blue-500 bg-blue-50';
            default: return 'text-orange-500 bg-orange-50';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-display font-bold text-dark mb-4">My Dashboard</h1>
                    <p className="text-gray-500">Manage your orders and view available coupons</p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-8">
                    <div className="bg-white p-1 rounded-full shadow-sm border border-gray-100 inline-flex">
                        <button
                            onClick={() => setActiveTab('orders')}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === 'orders'
                                    ? 'bg-primary text-white shadow-md'
                                    : 'text-gray-500 hover:text-dark'
                                }`}
                        >
                            <Package size={18} />
                            My Orders
                        </button>
                        <button
                            onClick={() => setActiveTab('coupons')}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${activeTab === 'coupons'
                                    ? 'bg-primary text-white shadow-md'
                                    : 'text-gray-500 hover:text-dark'
                                }`}
                        >
                            <Tag size={18} />
                            Coupons
                        </button>
                    </div>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {activeTab === 'orders' ? (
                            <div className="space-y-4">
                                {orders.length === 0 ? (
                                    <div className="text-center py-16 bg-white rounded-3xl shadow-sm border border-gray-100">
                                        <Package size={48} className="mx-auto text-gray-300 mb-4" />
                                        <h3 className="text-xl font-bold text-dark mb-2">No orders yet</h3>
                                        <p className="text-gray-500 mb-6">Looks like you haven't placed any orders yet.</p>
                                        <button onClick={() => navigate('/menu')} className="btn-primary">
                                            Browse Menu
                                        </button>
                                    </div>
                                ) : (
                                    orders.map((order) => (
                                        <div key={order._id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                            <div className="flex flex-col md:flex-row justify-between md:items-center mb-4 gap-4">
                                                <div>
                                                    <div className="flex items-center gap-3 mb-1">
                                                        <span className="text-lg font-bold text-dark">Order #{order._id.slice(-6).toUpperCase()}</span>
                                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                                        <Clock size={14} />
                                                        {new Date(order.createdAt).toLocaleString()}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-2xl font-bold text-primary">₹{order.totalAmount}</span>
                                                </div>
                                            </div>

                                            <div className="border-t border-gray-100 py-4">
                                                <div className="space-y-2">
                                                    {order.items.map((item, index) => (
                                                        <div key={index} className="flex justify-between text-sm">
                                                            <span className="text-gray-600">
                                                                <span className="font-bold text-dark">{item.quantity}x</span> {item.name}
                                                            </span>
                                                            <span className="font-medium text-dark">₹{item.price * item.quantity}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center pt-4 border-t border-gray-100 text-sm text-gray-500">
                                                <div className="flex gap-4">
                                                    <span>Train: <span className="font-bold text-dark">{order.trainNumber}</span></span>
                                                    <span>Coach: <span className="font-bold text-dark">{order.coach}</span></span>
                                                    <span>Seat: <span className="font-bold text-dark">{order.seatNumber}</span></span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {coupons.length === 0 ? (
                                    <div className="col-span-full text-center py-16 bg-white rounded-3xl shadow-sm border border-gray-100">
                                        <Tag size={48} className="mx-auto text-gray-300 mb-4" />
                                        <h3 className="text-xl font-bold text-dark mb-2">No coupons available</h3>
                                        <p className="text-gray-500">Check back later for exciting offers!</p>
                                    </div>
                                ) : (
                                    coupons.map((coupon) => (
                                        <div key={coupon._id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-all">
                                            <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/10 rounded-full group-hover:scale-150 transition-transform duration-500" />

                                            <div className="relative z-10">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="text-2xl font-bold text-primary mb-1">{coupon.discountPercentage}% OFF</h3>
                                                        <p className="text-sm text-gray-500 font-medium">Up to ₹{coupon.maxDiscountAmount}</p>
                                                    </div>
                                                    <Tag className="text-primary/40" size={32} />
                                                </div>

                                                <p className="text-gray-600 mb-6 text-sm">{coupon.description}</p>

                                                <div className="bg-gray-50 rounded-xl p-3 flex justify-between items-center border border-dashed border-gray-300">
                                                    <span className="font-mono font-bold text-dark tracking-wider">{coupon.code}</span>
                                                    <button
                                                        onClick={() => copyToClipboard(coupon.code)}
                                                        className="text-primary hover:text-primary-dark text-sm font-bold flex items-center gap-1"
                                                    >
                                                        <Copy size={14} /> Copy
                                                    </button>
                                                </div>

                                                <div className="mt-4 text-xs text-gray-400 flex justify-between">
                                                    <span>Min Order: ₹{coupon.minOrderAmount}</span>
                                                    <span>Expires: {formatDate(coupon.expiryDate)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
