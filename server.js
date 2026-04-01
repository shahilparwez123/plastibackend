import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoute.js';
import path from 'path'
import { fileURLToPath } from 'url';
//import { getItems } from './controllers/itemController.js';
import itemRouter from './routes/itemRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import passport from "passport";
//import session from "express-session";
import "./config/passport.js";
import jwt from "jsonwebtoken";

const app = express();
const port = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

//MIDDILEWARE
//MIDDLEWARE

const allowedOrigins = [
  "http://localhost:5173",
  "https://plastipro.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


app.use(express.json())
app.use(express.urlencoded({ extended: true}))




app.use(passport.initialize());


//Database
//await connectDB();

//ROUTES
app.use('/api/user', userRouter)
//app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));
app.use('/api/items', itemRouter)
app.use('/api/cart', cartRouter)
app.use('/api/orders', orderRouter)



app.get('/' , (req, res) => {
    res.send('API WORKING')
})

// GOOGLE LOGIN
// GOOGLE LOGIN
app.get("/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "consent select_account",   // ✅ ALWAYS VERIFY
    accessType: "offline"
  })
);

// GOOGLE CALLBACK
app.get("/auth/google/callback", (req, res, next) => {

  passport.authenticate("google", { session: false }, (err, user) => {

    if (err || !user) {
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=google_failed`);
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.redirect(`${process.env.FRONTEND_URL}/?token=${token}`);

  })(req, res, next);

});







const startServer = async () => {
  try {
    await connectDB();   // ✅ WAIT for DB

    app.listen(port, () => {
      console.log(`Server Started on http://localhost:${port}`);
    });

  } catch (error) {
    console.error("DB CONNECTION FAILED:", error);
  }
};

startServer();