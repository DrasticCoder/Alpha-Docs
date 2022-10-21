const io = require('socket.io')(3000 , {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
        }
    });


    io.on('connection', socket => {
        console.log('connected');

        // send message to every connectef client
        socket.on("send-changes", delta => {
            socket.broadcast.emit("receive-changes", delta); 
        });
        
        socket.on('disconnect', () => {
            console.log('disconnected');
        });
    }
    );

    