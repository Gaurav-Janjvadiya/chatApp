const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


const main = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

main()
    .then(() => console.log("db connected"))
    .catch(e => console.log(e));

app.get("/", (req, res) => {
    res.send("<a href='/chats'><h1>chats...</h1></a>");
})

app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    res.render("index.ejs", { chats });
})

app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
})

app.post("/chats", (req, res) => {
    let { from, to, msg } = req.body;
    let chat = new Chat({ from, to, msg, created_at: new Date() });
    chat.save()
        .then(res => console.log("chat saved"))
        .catch(e => console.log(e));
    res.redirect("/chats");
})

app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
})

app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { msg } = req.body;
    let chat = await Chat.findByIdAndUpdate(id, { msg: msg }, { validators: true, new: true });
    res.redirect("/chats");
})

app.delete("/chats/:id", (req, res) => {
    let { id } = req.params;
    Chat.findByIdAndDelete(id)
        .then(res => console.log(res))
        .catch(e => console.log(e));
    res.redirect("/chats");
    // res.send("hii");
})

app.listen(3000, () => {
    console.log("server is started at http://localhost:3000");
})