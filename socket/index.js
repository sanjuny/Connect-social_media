const io = require('socket.io')(8800, {
    path: "/socket/socket.io",
    cors: {
        origin: "https://connectgram.website"
    }
})


let activeUsers = []

io.on("connection", (socket) => {

    // add new user
    socket.on('new-user-add', (newUserId) => {
        // if user is not added previously
        if (!activeUsers.some((user) => user.userId === newUserId)) {
            activeUsers.push({
                userId: newUserId,
                socketId: socket.id
            })
        }
        console.log('connected users', activeUsers);
        io.emit('get-users', activeUsers)
    })


    //send message
    socket.on("send-message", (data) => {
        const { receiverId } = data;
        const user = activeUsers.find((user) => user.userId === receiverId)
        console.log("sending from socket to : ", receiverId);
        console.log('data', data);
        if (user) {
            io.to(user.socketId).emit("receive-message", data)
        }
    })


    //send notification
    socket.on("send-notification", (data) => {
        console.log(data, 'hellllllllooo');
        const { receiverId, senderId, type } = data;
        const receiver = activeUsers.find((user) => user.userId === receiverId)
        io.to(receiver?.socketId).emit("getNotification", {
            senderId,
            type
        })
    })



    socket.on("disconnect", () => {
        activeUsers = activeUsers.filter((user) => user.socketId !== socket.id)
        console.log('user Disconnected', activeUsers);
        io.emit('get-users', activeUsers)
    })

})