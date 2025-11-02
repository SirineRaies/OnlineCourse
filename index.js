const app = require('./server');
const connectDB = require('./Config/DB');

connectDB();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Serveur en écoute sur le port ${PORT}`);
});
