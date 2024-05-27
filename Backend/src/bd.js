import mongoose from "mongoose";

(async() =>{
    try {
        await mongoose.connect('',  {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
        console.log("Base conectada")
    } catch (error) {
        console.log("Base no conectada")
    }
})()