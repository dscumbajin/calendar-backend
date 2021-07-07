const { response, request } = require("express");

const crearUsuario = (req = request, res = response) => {
  const { name, email, password } = req.body;

  res.status(201).json({
    ok: true,
    msg: "registro",
    name,
    email,
    password,
  });
};

const loginUsuario = (req = request, res = response) => {
  const { email, password } = req.body;

  res.status(200).json({
    ok: true,
    msg: "login",
    email,
    password,
  });
};

const revalidarToken = (req = request, res = response) => {
  res.json({
    ok: true,
    msg: "revalidar token",
  });
};

module.exports = {
  crearUsuario,
  loginUsuario,
  revalidarToken,
};