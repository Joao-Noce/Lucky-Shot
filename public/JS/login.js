document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        login();
    }
});

function ocultarSenha(input, div) {
    if (input.type == "password") {
        div.innerHTML = `<i class="fa-regular fa-eye-slash"></i>`;
        input.type = "text";
    }
    else {
        div.innerHTML = `<i class="fa-regular fa-eye"></i>`;
        input.type = "password";
    }
}

let avatar;
const inputs = document.getElementsByName("inputs");

function escolherAvatar(id, idValue) {
    let avatares = document.getElementsByName("avatares");
    avatares.forEach(avatar => {
        avatar.style = "transform: scale(1);";
    });
    avatar = idValue;
    console.log(avatar);
    
    id.style = "transform: scale(1.5);";
}

function irParaCadastro() {
    olho1.innerHTML = `<i class="fa-regular fa-eye"></i>`;
    input_senha_log.type = "password";
    document.title = 'Lucky Shot | Cadastro';
    container.style.left = "-50vw";
    apagarInputs();
    document.body.style = "background-position-x: 20%;";
}

function jaTenhoConta() {
    olho2.innerHTML = `<i class="fa-regular fa-eye"></i>`;
    inputSenhaCadastro.type = "password";
    olho3.innerHTML = `<i class="fa-regular fa-eye"></i>`;
    inputConfirmar.type = "password";
    document.title = 'Lucky Shot | Login';
    apagarInputs();
    container.style.left = "0";
    document.body.style = "background-position-x: 86%;";
}

function cadastrar(nome, email, senha, confirmarSenha) {
    if (validacaoUsuarioCadastro(nome, email, senha, confirmarSenha, avatar)) {
        let nomeValue = nome.value;
        let emailValue = email.value;
        let senhaValue = senha.value;

        fetch("/usuarios/cadastrar/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nomeValue: nomeValue,
                emailValue: emailValue,
                senhaValue: senhaValue,
                avatarUsuario: avatar
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                Swal.fire({
                    text: "Usuário cadastrado com sucesso!",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
                setTimeout(() => {
                    jaTenhoConta();
                }, 2000);
            } else {
                Swal.fire({
                    title: "Erro ao cadastrar usuário",
                    text: `Status: ${resposta.statusText}`,
                    icon: "warning",
                    timer: 2000
                });
            }
        })
    }
}

function validacaoUsuarioCadastro(nome, email, senha, confSenha, avatarUsuario) {
    const caracteresEspeciais = "#@!$%&";
    let temCaractereEspecial = false;

    for (let i = 0; i < caracteresEspeciais.length; i++) {
        if (senha.value.indexOf(caracteresEspeciais[i]) !== -1) {
            temCaractereEspecial = true;
            break;
        }
    }

    if (nome.value.length < 2) setFieldError(nome, "Nome inválido.");
    else setFieldSpecificSuccess(nome);
    if (email.value.indexOf("@") == -1 || email.value.length < 6) setFieldError(email, "Email precisa conter @ e ter no mínimo 8 caracteres.");
    else setFieldSpecificSuccess(email);
    if (senha.value.length < 6) setFieldError(senha, "Necessário no mínimo 8 caracteres.");
    else if (!temCaractereEspecial) setFieldError(senha, "Necessário pelo menos um caractere especial.");
    else setFieldSpecificSuccess(senha);
    if (confSenha.value !== senha.value) setFieldError(confSenha, "As senhas precisam ser iguais.");
    else setFieldSpecificSuccess(confSenha);
    if (avatarUsuario == "" || avatarUsuario == undefined) {
        Swal.fire({
            title: "E a fotinha?",
            text: "Você precisa escolher um avatar!",
            icon: "error"
        });
    }
    if (nome.value.length >= 2 && confSenha.value == senha.value && temCaractereEspecial && senha.value.length >= 6 && email.value.indexOf("@") != -1 && email.value.length >= 6 && avatarUsuario != "" && avatarUsuario != undefined) {
        setFieldAllSuccess(nome);
        setFieldAllSuccess(senha);
        setFieldAllSuccess(confSenha);
        setFieldAllSuccess(email);
        return true;
    } else return false;
}

function setFieldError(input, message) {
    input.value = "";
    input.placeholder = message;
    input.style.border = "solid red 2px";
}

function setFieldSpecificSuccess(input) {
    input.placeholder = "";
    input.style.border = "solid white 2px";
}

function setFieldAllSuccess(input) {
    input.placeholder = "";
    input.style.border = "solid white 2px";
}

function login() {
    var email_log = input_email_log.value;
    var senha_log = input_senha_log.value;

    if (email_log == "" || senha_log == "") {
        Swal.fire({
            text: "Usuário não encontrado",
            icon: "error",
        });
    }

    console.log("FORM LOGIN: ", email_log);
    console.log("FORM SENHA: ", senha_log);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: email_log,
            senhaServer: senha_log
        })
    }).then(function (resposta) {

        if (resposta.ok) {
            input_email_log.value = ``;
            input_email_log.placeholder = ``;
            input_senha_log.value = ``;
            input_senha_log.placeholder = ``;

            resposta.json().then(json => {
                sessionStorage.EMAIL_USUARIO = json.emailUsuario;
                sessionStorage.NOME_USUARIO = json.nomeUsuario;
                sessionStorage.ID_USUARIO = json.idUsuario;
                sessionStorage.AVATAR = json.avatarUsuario;
                sessionStorage.CAIXA_SETE = json.caixaSete;
                sessionStorage.CAIXA_BLACKJACK = json.caixaBlackjack;
                sessionStorage.INICIO = json.inicio;
                Swal.fire({
                    text: `Bem vindo, ${json.nomeUsuario}!`,
                    icon: "success",
                    showConfirmButton: false
                });
                setTimeout(() => { window.location = "../html/menu.html" }, "1500");
            });
        } else {

            input_email_log.value = ``;
            input_email_log.placeholder = ``;
            input_senha_log.value = ``;
            input_senha_log.placeholder = ``;
            resposta.text().then(texto => {
                console.error(texto);
                Swal.fire({
                    text: "Usuário não encontrado",
                    icon: "error"
                });
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })
    return false;
}

function apagarInputs() {
    inputs.forEach(input => {
        input.value = "";
        input.placeholder = "";
    });
}

