const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    if (process.env.NODE_ENV === "development") {
      await mongoose.connect(process.env.MONGO_URI_DEVELOPMENT, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
      console.log("DB CONNECTION SUCCESSFUL.");
    } else {
      await mongoose.connect(process.env.MONGO_URI_PRODUCTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      });
      console.log("DB CONNECTION SUCCESSFUL.");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDatabase;
