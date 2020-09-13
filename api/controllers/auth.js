import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import sendMail from "../utils/email";



export const signUp = async (req, res) => {
  const { name, email, password, role, shop } = req.body;
  // 1.Check if user's email already exist in the database
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ error: "Email address already exists!" })
  }

  //2. Generate a signup email with encoded token url
  const token = jwt.sign({ name, email, password, role, shop }, process.env.JWT_ACCOUNT_ACTIVATION,
    { expiresIn: "10m" } //token expires in 10 minutes
  )

  const emailData = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `BOOK-A-MEAL - ACCOUNT ACTIVATION LINK`,
    body: `<h4>Please use the following link to activate your account:</h4>
    <p><a href='http://${process.env.CLIENT_URL}/api/v1/auth/activate/${token}'> 
    ${process.env.CLIENT_URL}/api/v1/auth/activate/${token.slice(0, 40)}</a></p><hr />
    <p>This email may contain sensitive information and the link expires in 10 minutes</p>`
  }

  try {
    const resp = await sendMail({ ...emailData });
    console.log(resp)
    return res.status(200).json({ message: "Email activation link successfully sent, go to your email box" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Error while sending activation email!" })
  }

}

export const accountActivation = async (req, res) => {
  const { token } = req.params;
  // 1.Check if token is available and verify with the backend
  if (token) {
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, async (err, decoded) => {
      if (err) {
        console.log('jwt verify account activation error', err);
        return res.status(401).json({ error: "Expired Link. Please sign up again" });
      }
      // 2. Decode the user's name email password and save them to database
      const {
        name,
        email,
        password,
        role,
        shop } = jwt.decode(token);
      try {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = await User.create({
          name,
          email,
          password: hashedPassword,
          role,
          shop
        });

        user.password = null
        res.location(`http://localhost:3000/signin?newsignup=${role}`)
        res.redirect(`http://localhost:3000/signin?newsignup=${role}`);
        // const accessToken2 = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '7d' });
        // return res.status(201).json({ token: accessToken2, user, message: "Sign Up successful!" })
      } catch (error) {
        console.log('Save user in account activation error', error);
        return res.status(401).json({
          error: 'Error saving user into the database. Please sign up again'
        })
      }
    })
  }
  else {
    return res.status(403).json({
      error: "No token Provided!"
    })
  }
}


export const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ error: "Email address does not exist." });
  }

  if (!bcrypt.compareSync(`${password}`, user.password)) {
    return res.status(401).json({ error: "Email/Password do not match" });
  }

  user.password = null
  const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "1d" });
  return res.status(200).json({ token, user, message: "Sign In successful!" })
}



export const adminMiddleware = async (req, res, next) => {
  User.findById({ _id: req.user._id }).exec((err, user) => {
    if (err || !user) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({
        error: 'Admin access only. Access denied.'
      });
    }
    //set user object in the name of profile
    req.profile = user;
    next();
  });
}


export const requireSignIn = (req, res, next) => {
  const token = req.body.token || req.headers["authorization"];
  if (!token) {
    return res.status(403).json({
      error: "No token Provided!"
    })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log('jwt verify token err', err);
      return res.status(401).json({ error: "Invalid Token. Please sign in again" });
    }

    req.user = decoded.user;
    next();
  })
}


