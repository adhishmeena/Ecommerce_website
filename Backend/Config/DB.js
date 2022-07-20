import mongoose from "mongoose";

const connectDB = async () => {
  // reason we are putting this in async because it is going to return promise when It method CURD is invoked

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,

      //    useCreateIndex: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`erroe ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
