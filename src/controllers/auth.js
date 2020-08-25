import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import sendMail from "../utils/email";



export const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body, "line 10")
  // 1.Check if user's email already exist in the database
  const user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ error: "Email address already exists!" })
  }

  //2. Generate a signup email with encoded token url
  const token = jwt.sign({ name, email, password }, process.env.JWT_ACCOUNT_ACTIVATION,
    { expiresIn: "10m" } //token expires in 10 minutes
  )

  const emailData = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `BOOK-A-MEAL - ACCOUNT ACTIVATION LINK`,
    body: `<h4>Please use the following link to activate your account:</h4>
    <p>${process.env.CLIENT_URL}/auth/activate/${token}</p><hr />
    <p>This email may contain sensitive information and the link expires in 10 minutes</p>`
  }

  try {
    const resp = await sendMail(emailData);
    console.log(resp)
    return res.status(200).json({ message: "Email activation link successfully sent go to your email box" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Unable to send requested email message" })
  }

}

export const accountActivation = async (req, res) => {
  const { token } = req.body;
  // 1.Check if token is available and verify with the backend
  if (token) {
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, async (err, decoded) => {
      if (err) {
        console.log('jwt verify account activation error', err);
        return res.status(401).json({ error: "Expired Link. Please sign up again" });
      }
      // 2. Decode the user's name email password and save them to database
      const { name, email, password } = jwt.decode(token);
      try {
        const hashedPassword = bcrypt.hashSync(password, 10);
        const resp = await User.create({name, email, password: hashedPassword});
        const user = { ...resp, password: null }
        const accessToken2 = jwt.sign( user, process.env.JWT_SECRET, { expiresIn: '7d'});
        
        return res.status(201).json({ token: accessToken2, user, message:"Sign Up successful!" })
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
  const user = User.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: "Email address does not exist."});
  }
  
  if (!bcrypt.compareSync(password, user.password)){
    return res.status(401).json({ error: "Email/Password do not match"});
  }
  
  const userData = { ...user, password: null }
  const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: "7d"});
  return res.status(200).json({ token, user: userData, message: "Sign Up successful!" })
}



export const adminMiddleware = (req, res, next) => {

}

export const requireSignIn = (req, res, next) => {

}