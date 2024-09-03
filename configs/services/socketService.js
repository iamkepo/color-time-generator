import { Server } from 'socket.io';

function socketService(server) {
  // Initialize WebSocket connection
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "PATCH"]
    },
    maxHttpBufferSize: 1e8 // 100 MB
  });

  let date = null;
  let timer = null;
  let limit = (1000 * 60 * 60);
  let counter = 0;
  let progress = 0;
  // Math.floor(millisecondsSinceEpoch / (1000 * 60 * 60))
  clearInterval(timer);

  timer = setInterval(() => {
    // Réinitialisation de la progression lorsque la minute est écoulée
    if (counter === 0) {
      progress = 0;
      date = new Date(); // Stocke l'heure actuelle
      counter = limit; // Réinitialise le compteur à 1 minute
      io.emit('date', date);
    }
  
    // Mise à jour de la progression toutes les 6 secondes (environ)
    if (progress < 100) {
      progress += 10;
      io.emit('progress', progress);
    }

    // Décrémentation du compteur à chaque seconde
    counter -= 1000;
  
    // Émission du compteur actuel à chaque seconde
    io.emit('counter', counter);
  }, 1000);

  io.on('connection', async (socket) => {
    // socket.on('onclick', async(dataCellule) => {
    //   console.log(onclick);
    //   io.emit('onclick', data);
    // });
    
    socket.on('disconnect', async () => {
      console.log('user disconnected');
    });
  });

}

export default socketService;