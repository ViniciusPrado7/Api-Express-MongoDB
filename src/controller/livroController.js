import Livro from "../models/Livro.js";

class LivroController {
  static listarLivros = async (req, res, next) => {
    try {
      const livrosResultado = await Livro.find().populate("autor").exec();
      res.status(200).json(livrosResultado);
    } catch (erro) {
     next(erro);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroResultado = await Livro.findById(id).populate("autor", "nome").exec();

      res.status(200).send(livroResultado);
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res, next)=> {
    try {
      const novoLivro = new Livro(req.body);
      const livroResultado = await novoLivro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      await Livro.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Livro atualizado com sucesso" });
    } catch (erro) {
     next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      await Livro.findByIdAndDelete(id);
      res.status(200).send({ message: "Livro removido com sucesso" });
    } catch (erro) {
     next(erro);
    }
  };

  static listarLivroPorEditora = async (req, res, next) => {
    try {
      const editora = req.query.editora;
      const livrosResultado = await Livro.find({ editora: editora });
      res.status(200).send(livrosResultado);
    } catch (erro) {
      next(erro);
    }
  };
}

export default LivroController;
