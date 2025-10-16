import Erro404 from "../erros/Erro404.js";
import Autor from "../models/Autor.js";

class AutorController {
  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultado = await Autor.find();
      res.status(200).json(autoresResultado);
    } catch (erro) {
     next(erro);
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autorResultado = await Autor.findById(id);
      if( autorResultado !== null){
          res.status(200).send(autorResultado);
      } else {
         next(new Erro404("Id do autor não localizado."))
      }
    } catch (erro) {
     next(erro);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      const novoAutor = new Autor(req.body);
      const autorResultado = await novoAutor.save();
      res.status(201).send(autorResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autorResultado = await Autor.findByIdAndUpdate(id, { $set: req.body });
      if(autorResultado !== null){
        res.status(200).send({ message: "Autor atualizado com sucesso" });
      } else {
        next(new Erro404("Id do Autor não encontrado."))
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autorResultado = await Autor.findByIdAndDelete(id);
      if(autorResultado !== null){
        res.status(200).send({ message: "Autor removido com sucesso" });
      } else {
        next(new Erro404("Id do Autor não encontrado."))
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default AutorController;
