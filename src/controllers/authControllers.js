import User from "../models/User.js";
import bcrypt from "bcryptjs";




// POST /register/signup
export async function register(req, res) {
  try {
    // instruct the expected request from the FE
    const { name, email, password } = req.body;

    // if one of the requested values are missing
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // if none is missing we continue by confirming that that user is not already in the database
    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(409).json({
        message: "Credentials Already Exists",
      });
    }

    // scramble password so it is one-way, i.e original password is not saved in my DB only hashed password
    const hashed = await bcrypt.hash(password, 10);

    // now we create user and put it in the DB
    const user = await User.create({ name, email, password: hashed });

    // actual response to send out to FE request order
    res.status(201).json({ id: user._id, name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// POST /login/signin
export async function login(req, res) {
  try {
    const { email, password } = req.body;

    // State password explicitly/ bring it out because by default it is hidden
    const user = await User.findOne({ email }).select("+password");

    // confirm if the email is tied to the password the user delivered
    if (!user) {
      return res.status(401).json({ message: "Invalid Login" });
    }

    // Take the password just delivered by the user and compare and match it with the password already in the DB
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        message: "Invalid Login",
      });
    }

    // Log user in

    res.json({ id: user._id, name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
