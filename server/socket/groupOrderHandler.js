const groupOrderHandler = (io) => {
    const groupRooms = new Map(); // Store active rooms and their state (optional, for persistence)

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        socket.on('join_group', (groupId) => {
            socket.join(groupId);
            console.log(`Socket ${socket.id} joined group ${groupId}`);

            // Optionally send current group state if you were storing it
            // socket.emit('cart_updated', groupRooms.get(groupId) || []);
        });

        socket.on('update_cart', ({ groupId, cart, user }) => {
            // Broadcast the updated cart to everyone in the group EXCEPT the sender
            // or to everyone including sender if you want to sync perfectly
            // usually better to broadcast to others
            socket.to(groupId).emit('cart_updated', { cart, user });
            console.log(`Group ${groupId} cart updated by ${user}`);
        });

        socket.on('leave_group', (groupId) => {
            socket.leave(groupId);
            console.log(`Socket ${socket.id} left group ${groupId}`);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
};

module.exports = groupOrderHandler;
