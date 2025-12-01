import { createContext, useState, useContext, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const [groupId, setGroupId] = useState(null);
    const socketRef = useRef(null);
    const isRemoteUpdate = useRef(false);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));

        // If in a group, emit changes
        if (groupId && socketRef.current && !isRemoteUpdate.current) {
            socketRef.current.emit('update_cart', { groupId, cart, user: 'User' });
        }
        // Reset flag
        isRemoteUpdate.current = false;
    }, [cart, groupId]);

    // Socket Connection Logic
    useEffect(() => {
        if (groupId) {
            socketRef.current = io(import.meta.env.VITE_SERVER_URL || 'http://localhost:5000');
            socketRef.current.emit('join_group', groupId);

            socketRef.current.on('cart_updated', ({ cart: newCart }) => {
                isRemoteUpdate.current = true;
                setCart(newCart);
            });

            return () => {
                socketRef.current.disconnect();
            };
        }
    }, [groupId]);

    const addToCart = (item) => {
        setCart((prev) => {
            const existing = prev.find((i) => i._id === item._id);
            if (existing) {
                return prev.map((i) =>
                    i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item._id !== id));
    };

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) {
            removeFromCart(id);
            return;
        }
        setCart((prev) =>
            prev.map((item) => (item._id === id ? { ...item, quantity } : item))
        );
    };

    const clearCart = () => setCart([]);

    const joinGroup = (id) => {
        setGroupId(id);
        // clearCart(); // Optional: clear local cart when joining? Or merge?
    };

    const leaveGroup = () => {
        setGroupId(null);
        if (socketRef.current) socketRef.current.disconnect();
    };

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            total,
            groupId,
            joinGroup,
            leaveGroup
        }}>
            {children}
        </CartContext.Provider>
    );
};
