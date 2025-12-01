import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Check, X, Clock, Truck, ChefHat, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/');
        } else {
            fetchOrders();
        }
    }, [navigate]);

    const fetchOrders = async () => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/orders`);
            setOrders(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/orders/${id}/status`, { status });
            fetchOrders();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center pt-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-display font-bold text-dark mb-8">Admin Dashboard</h1>

                <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-dark">Recent Orders</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 text-sm uppercase">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Order ID</th>
                                    <th className="px-6 py-4 font-semibold">Customer</th>
                                    <th className="px-6 py-4 font-semibold">Train Info</th>
                                    <th className="px-6 py-4 font-semibold">Items</th>
                                    <th className="px-6 py-4 font-semibold">Total</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {orders.map((order) => (
                                    <motion.tr
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        key={order._id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4 text-sm font-mono text-gray-500">#{order._id.slice(-6)}</td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-dark">{order.customerName}</div>
                                            <div className="text-xs text-gray-500">{order.phone}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            <div>Train: {order.trainNumber}</div>
                                            <div>{order.coach} - {order.seatNumber}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {order.items.map((item, idx) => (
                                                <div key={idx}>{item.quantity}x {item.name || 'Item'}</div>
                                            ))}
                                        </td>
                                        <td className="px-6 py-4 font-bold text-primary">₹{order.totalAmount}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${order.status === 'Delivered' ? 'bg-green-50 text-green-600 border-green-100' :
                                                order.status === 'Cancelled' ? 'bg-red-50 text-red-600 border-red-100' :
                                                    'bg-yellow-50 text-yellow-600 border-yellow-100'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex space-x-2">
                                                <button onClick={() => updateStatus(order._id, 'Accepted')} title="Accept" className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"><Check size={16} /></button>
                                                <button onClick={() => updateStatus(order._id, 'Cooking')} title="Cooking" className="p-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors"><ChefHat size={16} /></button>
                                                <button onClick={() => updateStatus(order._id, 'Out for Delivery')} title="Out for Delivery" className="p-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors"><Truck size={16} /></button>
                                                <button onClick={() => updateStatus(order._id, 'Delivered')} title="Delivered" className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"><Check size={16} /></button>
                                                <button onClick={() => updateStatus(order._id, 'Cancelled')} title="Cancel" className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"><X size={16} /></button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
