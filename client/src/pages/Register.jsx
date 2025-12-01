import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserPlus } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await register({ name, email, password });
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate('/');
        } catch (error) {
            setError(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-sm border border-gray-100"
            >
                <div>
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
                        <UserPlus size={32} />
                    </div>
                    <h2 className="text-center text-3xl font-display font-bold text-dark">
                        Create Account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-500">
                        Join us and start your food journey
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && <div className="bg-red-50 text-red-500 text-center text-sm p-3 rounded-lg border border-red-100">{error}</div>}
                    <div className="space-y-4">
                        <div className="relative">
                            <User className="absolute left-4 top-3.5 text-gray-400" size={20} />
                            <input
                                type="text"
                                required
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-dark placeholder-gray-400"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                            <input
                                type="email"
                                required
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-dark placeholder-gray-400"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
                            <input
                                type="password"
                                required
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-dark placeholder-gray-400"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full flex justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating Account...' : 'Register'}
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <p className="text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link to="/login" className="font-bold text-primary hover:text-secondary transition-colors">
                            Sign in here
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;
