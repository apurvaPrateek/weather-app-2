import express from "express";

const app = express();
const PORT = 3001;

app.listen(PORT, ()=>{
    console.log(`The app is listening at port ${PORT}`);
});

app.use(express.static("public"));

app.get("/", (req, res)=>{
    res.render("index.ejs");
})