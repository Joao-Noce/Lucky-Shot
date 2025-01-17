sessionStorage.clear();

document.addEventListener("keydown", function(event) {
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

function escolherAvatar(id, idValue) {
    let avatares = document.getElementsByName("avatares");
    avatares.forEach(avatar => {
        avatar.style = "transform: scale(1);";
    });
    avatar = idValue;
    id.style = "transform: scale(1.5);";
}

function new_account() {
    olho1.innerHTML = `<i class="fa-regular fa-eye"></i>`;
    input_senha_log.type = "password";
    document.title = 'Lucky Shot | Cadastro';
    container.style.left = "-50vw";
    input_name.value = ``;
    input_name.placeholder = ``;
    input_email_cadastro.value = ``;
    input_email_cadastro.placeholder = ``;
    input_senha_cadastro.value = ``;
    input_senha_cadastro.placeholder = ``;
    input_confirm_senha.value = ``;
    input_confirm_senha.placeholder = ``;
    input_email_log.value = ``;
    input_email_log.placeholder = ``;
    input_senha_log.value = ``;
    input_senha_log.placeholder = ``;
    document.body.style = "background-position-x: 20%;";
}

function already_have_account() {
    olho2.innerHTML = `<i class="fa-regular fa-eye"></i>`;
    input_senha_cadastro.type = "password";
    olho3.innerHTML = `<i class="fa-regular fa-eye"></i>`;
    input_confirm_senha.type = "password";
    document.title = 'Lucky Shot | Login';
    input_name.value = ``;
    input_name.placeholder = ``;
    input_email_cadastro.value = ``;
    input_email_cadastro.placeholder = ``;
    input_senha_cadastro.value = ``;
    input_senha_cadastro.placeholder = ``;
    input_confirm_senha.value = ``;
    input_confirm_senha.placeholder = ``;
    input_email_log.value = ``;
    input_email_log.placeholder = ``;
    input_senha_log.value = ``;
    input_senha_log.placeholder = ``;
    container.style.left = "0";
    document.body.style = "background-position-x: 86%;";
}
function create_account() {
    var name = input_name.value;
    var email_cadastro = input_email_cadastro.value;
    var senha_cadastro = input_senha_cadastro.value;
    var confirm_senha = input_confirm_senha.value;

    var tamanho_email = email_cadastro.length;
    var arroba = email_cadastro.indexOf("@");
    var tamanho_senha = senha_cadastro.length;

    if (name == "") {
        input_name.value = ``;
        input_name.placeholder = `Your name is necessary.`;
    } else if (arroba < 0 || tamanho_email < 6) {
        input_email_cadastro.value = ``;
        input_email_cadastro.placeholder = `Email inválido.`;
    } else if (tamanho_senha < 6) {
        input_senha_cadastro.value = ``;
        input_confirm_senha.value = ``;
        input_senha_cadastro.placeholder = `A senha precisa de no mínimo 8 caracteres.`;
    } else if (senha_cadastro != confirm_senha) {
        input_senha_cadastro.value = ``;
        input_confirm_senha.value = ``;
        input_senha_cadastro.placeholder = `As senhas não são iguais`;
        input_confirm_senha.placeholder = `As senhas não são iguais`;
    } else if (avatar == undefined) {
        alert('Escolha um avatar!');
    } else {
        input_name.value = ``;
        input_name.placeholder = ``;
        input_email_cadastro.value = ``;
        input_email_cadastro.placeholder = ``;
        input_senha_cadastro.value = ``;
        input_senha_cadastro.placeholder = ``;
        input_confirm_senha.value = ``;
        input_confirm_senha.placeholder = ``;

        fetch("/usuarios/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nomeServer: name,
                emailServer: email_cadastro,
                senhaServer: senha_cadastro,
                avatarServer: avatar
            }),
        })
            .then(function (resposta) {
                if (resposta.ok) {
                    Swal.fire({
                        position: "bottom-end",
                        icon: "success",
                        title: "Conta criada com sucesso",
                        background: "#1D1D1D",
                        color: "#FFF",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(() => { already_have_account(); }, "1500");

                } else {
                    input_name.placeholder = `Este nome já está sendo usado!`;
                }
            })
    }
}


function login() {
    var email_log = input_email_log.value;
    var senha_log = input_senha_log.value;

    if (email_log == "" || senha_log == "") {
        Swal.fire({
            title: "FALHA",
            text: "ERRO AO AUTENTICAR",
            icon: "error",
            background: '#1D1D1D',
            color: '#FFF',
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
                    title: "SUCESSO",
                    text: "AUTENTICADO COM SUCESSO",
                    icon: "success",
                    background: '#1D1D1D',
                    color: '#FFF',
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
                    title: "ERRO",
                    text: "FALHA AO AUTENTICAR",
                    icon: "error",
                    background: '#1D1D1D',
                    color: '#FFF',
                });
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })
    return false;
}