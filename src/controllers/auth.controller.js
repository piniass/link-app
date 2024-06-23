import User from "../models/user.models.js";

export const register = async (req, res) => {
  const { email, password, username } = req.body;
  console.log(req.body);

  try {
    const newUser = new User({
      email,
      username,
      password,
    });

    const userSave = await newUser.save();
    res.json({
      message: `Usuario: ${username} creado con exito`,
      user: userSave
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};

export const login = (req, res) => {
  res.send("login");
};
