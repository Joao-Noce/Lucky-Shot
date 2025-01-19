var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        res.status(200).json(resultadoAutenticar[0]); // Supondo que você queira enviar apenas o primeiro usuário encontrado
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(function (erro) {
                console.log(erro);
                const errorMessage = erro.sqlMessage ? erro.sqlMessage : "Houve um erro ao realizar o login!";
                console.log("\nHouve um erro ao realizar o login! Erro: ", errorMessage);
                res.status(500).json(errorMessage);
            }
            );
    }

}

function cadastrar(req, res) {
    let { nomeValue, emailValue, senhaValue, avatarUsuario } = req.body;

    if (nomeValue == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (emailValue == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senhaValue == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (avatarUsuario == undefined) {
        res.status(400).send("Seu avatar está undefined!");
    } else {
        usuarioModel.cadastrar(nomeValue, emailValue, senhaValue, avatarUsuario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function buscarSenha(req, res) {
    let idUsuario = req.params.idUsuario;

    if (!idUsuario) {
        res.status(400).send("ID do usuário não foi fornecido.");
    } else {
        usuarioModel.buscarSenha(idUsuario)
            .then(resultado => {
                if (resultado.length > 0) {
                    console.log(resultado[0].senhaUsuario);
                    res.status(200).json(resultado[0].senhaUsuario);
                } else {
                    res.status(404).send("Usuário não encontrado.");
                }
            })
            .catch(erro => {
                console.error("Erro ao buscar senha:", erro);
                res.status(500).send("Erro interno ao buscar senha.");
            });
    }
}

function atualizarPerfil(req, res) {
    let { idUsuario, nomeValue, emailValue, senhaValue, avatarUsuario } = req.body;

    if (!idUsuario) {
        res.status(400).send("ID do usuário não foi fornecido.");
    } else if (!nomeValue) {
        res.status(400).send("Nome do usuário não foi fornecido.");
    } else if (!emailValue) {
        res.status(400).send("Email do usuário não foi fornecido.");
    } else if (!senhaValue) {
        res.status(400).send("Senha do usuário não foi fornecido.");
    } else if (!avatarUsuario) {
        res.status(400).send("Avatar do usuário não foi fornecido.");
    } else {
        usuarioModel.atualizarPerfil(idUsuario, nomeValue, emailValue, senhaValue, avatarUsuario)
            .then(resultado => {
                if (resultado) {
                    console.log(resultado);
                    res.status(200).json(resultado);
                } else {
                    res.status(404).send("Error.");
                }
            })
            .catch(erro => {
                console.error("Erro ao atualizar perfil:", erro);
                res.status(500).send("Erro interno ao atualizar perfil.");
            });
    }
}

function encerrarConta(req, res) {
    let idUsuario = req.body;

    if (!idUsuario) {
        res.status(400).send("ID do usuário não foi fornecido.");
    } else {
        usuarioModel.encerrarConta(idUsuario)
            .then(resultado => {
                if (resultado) {
                    console.log(resultado);
                    res.status(200).json(resultado);
                } else {
                    res.status(404).send("Error.");
                }
            })
            .catch(erro => {
                console.error("Erro ao atualizar perfil:", erro);
                res.status(500).send("Erro interno ao atualizar perfil.");
            });
    }
}

module.exports = {
    autenticar,
    cadastrar,
    buscarSenha,
    atualizarPerfil,
    encerrarConta
}