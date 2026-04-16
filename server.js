const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const taskRoutes = require('./routes/taskRoutes');
app.use('/api/tasks', taskRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT);
  })
  .catch(err => console.log(err));