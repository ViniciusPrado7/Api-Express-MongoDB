import ErroBase from "./ErroBase.js";

class Erro404 extends ErroBase {
    constructor(mensagem = "Página não encontrada."){
        super(mensagem, 404);
    }
}   
export default Erro404;