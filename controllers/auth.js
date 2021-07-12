const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const Usuario = require("../models/Usuario");
const { generarJWT } = require("../helpers/jwt");

const crearUsuario = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: `Ya existe un usuario con el correo: ${email} `,
      });
    }
    usuario = new Usuario(req.body);

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync(13);
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();
    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.name);
    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor comuníquese con el administrador",
    });
  }
};

const loginUsuario = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: `No existe un usuario con el correo: ${email} `,
      });
    }
    // Confirmar los passwords
    const validPassword = bcrypt.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: `Password incorrecto`,
      });
    }

    //Genera JWT
    const token = await generarJWT(usuario.id, usuario.name);
    res.status(200).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Por favor comuníquese con el administrador",
    });
  }
};

const revalidarToken = async (req = request, res = response) => {
  const { uid, name } = req;
  //Genera JWT
  const token = await generarJWT(uid, name);
  res.json({
    ok: true,
    uid,
    name,
    token,
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};
