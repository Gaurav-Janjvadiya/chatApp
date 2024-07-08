const mongoose = require("mongoose");
const Chat = require("./models/chat.js");


const main = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

main()
    .then(() => console.log("db connected"))
    .catch(e => console.log(e));

const allChats = [
    {
        from: "Gaurav",
        to: "Krishna",
        msg: "Hii...",
        created_at: new Date()
    },
    {
        from: "Krishna",
        to: "Gaurav",
        msg: "Hello!",
        created_at: new Date()
    },
    {
        from: "Krishna",
        to: "Gaurav",
        msg: "How r u!",
        created_at: new Date()
    }
]

Chat.insertMany(allChats).then(res => console.log(res)).catch(e => console.log(e));

