const mongoose = require('mongoose');

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(`[MongoDB ${process.env.MONGO_SRC}] Connected`))
    .catch(err => console.error(`[MongoDB ${process.env.MONGO_SRC}] Error: ${err}`));