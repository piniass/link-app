import User from "../models/user.models.js";
import bcrypt from 'bcryptjs'
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  const { email, password, username } = req.body;
  console.log(req.body);

  try {

    const pwdHash = await bcrypt.hash(password, 10)

    const newUser = new User({
      email,
      username,
      password: pwdHash,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({id: userSaved._id})
    res.cookie('token', token)
    res.json({
      message: `Usuario: ${username} creado con exito`,
      user: {
        id: userSaved._id,
        username: userSaved.username,
        email: userSaved.email,
        createdAt: userSaved.createdAt,
        updatedAt: userSaved.updatedAt,
      }
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {

    const userFound = await User.findOne({email})

    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado"})
  
    const isMatch = await bcrypt.compare(password, userFound.password)
    

    if(!isMatch)return res.status(400).json({message:"Contraseña no válida"})

    const token = await createAccessToken({id: userFound._id})
    res.cookie('token', token)
    res.json({
      message: `Usuario: ${email} logeado con exito`,
      user: {
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
      }
    });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  res.cookie('token', "", {
    expires: new Date(0)
  })
  return res.sendStatus(200)
};

export const profile = async (req, res) => {
  // console.log(req.user)
  const userFound = await User.findById(req.user.id)
  if(!userFound){
    return res.status(404).json({ message: "Usuario no encontrado."})
  } else {
    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
    })
  }
  // res.send('profile')
}
