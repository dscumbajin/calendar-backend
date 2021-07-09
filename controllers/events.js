const { request, response } = require("express");
const Evento = require("../models/Evento");

const getEventos = async (req = request, res = response) => {
  try {
    const eventos = await Evento.find().populate("user", "name");

    return res.status(200).json({
      ok: true,
      eventos,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: `Hable con el administrador`,
    });
  }
};

const crearEvento = async (req = request, res = response) => {
  const evento = new Evento(req.body);
  try {
    evento.user = req.uid;
    const eventoGuardado = await evento.save();
    res.status(201).json({
      ok: true,
      evento: eventoGuardado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: `Hable con el administrador`,
    });
  }
};

const actualizarEvento = async (req = request, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;
  try {
    const evento = await Evento.findById(eventoId);
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: `No existe evento por el Id: ${eventoId}`,
      });
    }
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: `No tiene privilegios para editar el evento`,
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid,
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    );

    return res.status(201).json({
      ok: true,
      evento: eventoActualizado,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: `Hable con el administrador`,
    });
  }
};

const eliminarEvento = async (req = request, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Evento.findById(eventoId);
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: `No existe evento por el Id: ${eventoId}`,
      });
    }
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: `No tiene privilegios para eliminar el evento`,
      });
    }

    await Evento.findByIdAndDelete(eventoId);

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: `Hable con el administrador`,
    });
  }
};

module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
