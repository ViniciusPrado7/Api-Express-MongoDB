import Erro404 from "../erros/Erro404.js";
import { Autor, Livro } from "../models/index.js";

class LivroController {
  static listarLivros = async (req, res, next) => {
    try {
     const buscaLivros = Livro.find();
     req.resultado = buscaLivros;
     next();
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroResultado = await Livro.findById(id)
        .populate("autor", "nome")
        .exec();
      if (livroResultado !== null) {
        res.status(200).send(livroResultado);
      } else {
        next(new Erro404("Id do livro não localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      const novoLivro = new Livro(req.body);
      const livroResultado = await novoLivro.save();
      if (livroResultado !== null) {
        res.status(201).send(livroResultado.toJSON());
      } else {
        next(new Erro404("Id do livro não localizado"));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroResultado = await Livro.findByIdAndUpdate(id, {
        $set: req.body,
      });
      if (livroResultado !== null) {
        res.status(200).send({ message: "Livro atualizado com sucesso" });
      } else {
        next(new Erro404("Id do livro não localizado"));
      }
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

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livrosResultado =  Livro.find(busca)
        .populate("autor");
        req.resultado = livrosResultado;
        next();
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }
  };
}

async function processaBusca(parametros) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;

  const busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if (minPaginas || maxPaginas) {
    busca.paginas = {};
    if (minPaginas) busca.paginas.$gte = minPaginas;
    if (maxPaginas) busca.paginas.$lte = maxPaginas;
  }

  if (nomeAutor) {
    const autor = await Autor.findOne({ nome: nomeAutor });
    if (!autor) return null;
    busca.autor = autor._id;
  }

  return busca;
}

export default LivroController;
