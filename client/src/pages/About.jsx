import { motion } from 'framer-motion';
import { Award, Users, Clock, MapPin, Heart, ChefHat } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen bg-light pt-24 pb-20">
            {/* Hero Section */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-50 to-transparent -z-10" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-display font-bold text-dark mb-6"
                        >
                            Serving <span className="text-primary">Happiness</span>,<br /> One Meal at a Time
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-gray-600 leading-relaxed"
                        >
                            Bhopal Food Choice isn't just a delivery service; it's a culinary journey through the heart of India. We bring the authentic flavors of the City of Lakes directly to your train seat and doorstep.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-white border-y border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { number: '50k+', label: 'Happy Customers' },
                            { number: '100+', label: 'Restaurant Partners' },
                            { number: '30min', label: 'Average Delivery' },
                            { number: '4.9', label: 'User Rating' }
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <h3 className="text-4xl font-bold text-primary font-display mb-2">{stat.number}</h3>
                                <p className="text-gray-500 font-medium">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="relative"
                        >
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
                            <img
                                src="https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop"
                                alt="Our Kitchen"
                                className="rounded-3xl shadow-2xl relative z-10"
                            />
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-dark mb-6">Our Story</h2>
                            <p className="text-gray-600 mb-6 leading-relaxed">
                                Started in 2023, Bhopal Food Choice was born from a simple observation: travelers passing through Bhopal often missed out on the city's legendary culinary heritage. We wanted to change that.
                            </p>
                            <p className="text-gray-600 mb-8 leading-relaxed">
                                Today, we connect train passengers and locals with the best kitchens in the city. From the spicy Bhopali Rezala to the sweet Mawa Bati, we ensure that every meal is a celebration of flavor, hygiene, and punctuality.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {[
                                    { icon: <Award className="text-primary" />, title: "Quality First", desc: "Rigorous quality checks for every partner." },
                                    { icon: <Clock className="text-primary" />, title: "On-Time", desc: "Precision delivery synced with train schedules." },
                                    { icon: <Heart className="text-primary" />, title: "Made with Love", desc: "Authentic recipes passed down generations." },
                                    { icon: <Users className="text-primary" />, title: "Customer Focus", desc: "24/7 support for a seamless experience." }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-dark mb-1">{item.title}</h4>
                                            <p className="text-sm text-gray-500">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
