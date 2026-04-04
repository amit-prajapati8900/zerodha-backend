require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require("./model/userModel");
const authMiddleware= require("./middleware/autheticate");
// const User = require("./model/User"); // direct model import

// const helmet = require("helmet");
// const helmet = require("helmet"); 
// const {holdeingModel} = require("./model/holdingmodel");
// const  port = 9090;
const {posationModel} = require("./model/posationsmodel");
const { holdeingModel } = require("./model/holdingmodel");
const {OrderModel} = require("./model/ordermodel");
const app = express();

app.use(cors());
// app.use(
//   helmet({
//     contentSecurityPolicy: false,
//   })
// );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static('public'));


const port = process.env.port||9090;
const uri = process.env.MONGO_URL; 

app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => {
  res.json({
    "version": 1,
    "title": "Local Dev Server",
    "description": "Development Server DevTools",
    "icons": {}
  });
});
// CSP Fix bhi add karo
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', 
    "default-src 'self'; connect-src 'self' http://localhost:9090 ws://localhost:9090 http://localhost:9090/.well-known/*;"
  );
  next();
});
app.use(cors({
  origin: "*",  // Development ke liye
  credentials: true
}));

// main().then((res)=>("DB is created"))
// .catch((err)=>console.log(err));
// async function main() {
//     mongoose.connect("mongodb://127.0.0.1:27017/Zerodha");
// }

// app.get("/holding",(req,res)=>{
//    let tempHolding = [
//     {
//         name: "BHARTIARTL",
//         qty: 2,
//         avg: 538.05,
//         price: 541.15,
//         net: "+0.58%",
//         day: "+2.99%",
//         },
//     {
//         name: "HDFCBANK",
//         qty: 2,
//         avg: 1383.4,
//         price: 1522.35,
//         net: "+10.04%",
//         day: "+0.11%",
//       },
//       {
//         name: "HINDUNILVR",
//         qty: 1,
//         avg: 2335.85,
//         price: 2417.4,
//         net: "+3.49%",
//         day: "+0.21%",
//       },
//       {
//         name: "INFY",
//         qty: 1,
//         avg: 1350.5,
//         price: 1555.45,
//         net: "+15.18%",
//         day: "-1.60%",
//         isLoss: true,
//       },
//       {
//         name: "ITC",
//         qty: 5,
//         avg: 202.0,
//         price: 207.9,
//         net: "+2.92%",
//         day: "+0.80%",
//       },
//       {
//         name: "KPITTECH",
//         qty: 5,
//         avg: 250.3,
//         price: 266.45,
//         net: "+6.45%",
//         day: "+3.54%",
//       },
//       {
//         name: "M&M",
//         qty: 2,
//         avg: 809.9,
//         price: 779.8,
//         net: "-3.72%",
//         day: "-0.01%",
//         isLoss: true,
//       },
//       {
//         name: "RELIANCE",
//         qty: 1,
//         avg: 2193.7,
//         price: 2112.4,
//         net: "-3.71%",
//         day: "+1.44%",
//       },
//       {
//         name: "SBIN",
//         qty: 4,
//         avg: 324.35,
//         price: 430.2,
//         net: "+32.63%",
//         day: "-0.34%",
//         isLoss: true,
//       },
//       {
//         name: "SGBMAY29",
//         qty: 2,
//         avg: 4727.0,
//         price: 4719.0,
//         net: "-0.17%",
//         day: "+0.15%",
//       },
//       {
//         name: "TATAPOWER",
//         qty: 5,
//         avg: 104.2,
//         price: 124.15,
//         net: "+19.15%",
//         day: "-0.24%",
//         isLoss: true,
//       },
//       {
//         name: "TCS",
//         qty: 1,
//         avg: 3041.7,
//         price: 3194.8,
//         net: "+5.03%",
//         day: "-0.25%",
//         isLoss: true,
//       },
//       {
//         name: "WIPRO",
//         qty: 4,
//         avg: 489.3,
//         price: 577.75,
//         net: "+18.08%",
//         day: "+0.32%",
//       },
// ];
// tempHolding.forEach((temp)=>{
//     let newModel = holdeingModel({
//     name: temp.name,
//     qty: temp.qty,
//     avg: temp.avg,
//     price: temp.price,
//     net: temp.net,
//     day: temp.day,
//     })
//     newModel.save();
// }) 
// res.send("Done")
// })

// app.get("/postaion",(req,res)=>{
//     temppostaion=[
//          {
//     product: "CNC",
//     name: "EVEREADY",
//     qty: 2,
//     avg: 316.27,
//     price: 312.35,
//     net: "+0.58%",
//     day: "-1.24%",
//     isLoss: false,
//   },
//   {
//     product: "CNC",
//     name: "JUBLFOOD",
//     qty: 1,
//     avg: 3124.75,
//     price: 3082.65,
//     net: "+10.04%",
//     day: "-1.35%",
//     isLoss: true,
//   },
// ];
// temppostaion.forEach((ele)=>{
//     let newposation = new posationModel({
//      product: ele.product,
//     name: ele.name,
//     qty: ele.qty,
//     avg: ele.avg,
//     price: ele.price,
//     net: ele.net,
//     day: ele.day,
//     isLoss: ele.isLoss,
//     })
// newposation.save();
// })
// res.send("done");
// })
// app.get("/Orders",(req,res)=>{
//     let tempOrder = [
//          {
//     name: "INFY",
//     price: 1555.45,
//     percent: "-1.60%",
//     isDown: true,
//   },
//   {
//     name: "ONGC",
//     price: 116.8,
//     percent: "-0.09%",
//     isDown: true,
//   },
//   {
//     name: "TCS",
//     price: 3194.8,
//     percent: "-0.25%",
//     isDown: true,
//   },
//   {
//     name: "KPITTECH",
//     price: 266.45,
//     percent: "3.54%",
//     isDown: false,
//   },
//   {
//     name: "QUICKHEAL",
//     price: 308.55,
//     percent: "-0.15%",
//     isDown: true,
//   },
//   {
//     name: "WIPRO",
//     price: 577.75,
//     percent: "0.32%",
//     isDown: false,
//   },
//   {
//     name: "M&M",
//     price: 779.8,
//     percent: "-0.01%",
//     isDown: true,
//   },
//   {
//     name: "RELIANCE",
//     price: 2112.4,
//     percent: "1.44%",
//     isDown: false,
//   },
//   {
//     name: "HUL",
//     price: 512.4,
//     percent: "1.04%",
//     isDown: false,
//   },
// ];
// tempOrder.forEach((ele)=>{
//     let newOrder = new OrderModel({
//         name: ele.name,
//         price: ele.price,
//         percent: ele.percent,
//         isDown: ele.isDown,
//     })
//     newOrder.save();    
    
// });

// res.send("done");
// })
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send("All fields are required");
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(400).send("Email already registered");

    const existingUsername = await User.findOne({ username });
    if (existingUsername) return res.status(400).send("Username already taken");
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.send("User registered successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send("Invalid credentials");

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.MONGO_URL,
    { expiresIn: "1h" }
  );

  res.json({ token });
});

app.get("/allHolding",async(req,res)=>{
    let allHolding = await holdeingModel.find({});
    res.json(allHolding);
});
app.get("/allPosation",async(req,res)=>{
    let allPosation = await posationModel.find({});
    res.json(allPosation);
});
app.post("/newOrder",async(req,res)=>{
    let {name,price,percent,isDone}= req.body;
    const newOrder = new OrderModel({name,price,percent,isDone});
    await newOrder.save();
    res.send("data is saved");
});


app.get("/dashboard", authMiddleware, (req, res) => {
  res.send(`Welcome ${req.user.email}, you are authenticated!`);
});

app.listen(port,()=>{
    console.log("port is listing");
    mongoose.connect(uri);
    console.log("db is create");
});
