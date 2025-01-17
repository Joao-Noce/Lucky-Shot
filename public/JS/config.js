inputNome.value = sessionStorage.NOME_USUARIO;
inputEmail.value = sessionStorage.EMAIL_USUARIO;
const idUsuario = sessionStorage.ID_USUARIO;
let avatarUsuario = sessionStorage.AVATAR;
let avatares = document.getElementsByName("avatares");
avatares.forEach(avatar => {
    if (avatar.id == avatarUsuario) {
        avatar.style = "transform: scale(1.5)";
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

function escolherAvatar(id, idValue) {
    let avatares = document.getElementsByName("avatares");
    avatares.forEach(avatar => {
        avatar.style = "transform: scale(1);";
    });
    avatarUsuario = idValue;
    id.style = "transform: scale(1.5);";
}

console.log(avatarUsuario);


buscarSenha();

function buscarSenha() {

    fetch(`/usuarios/buscarSenha/${idUsuario}`)
        .then(resposta => {
            if (resposta.ok) {
                return resposta.json();
            } else {
                throw new Error("Erro ao buscar senha.");
            }
        })
        .then(dados => {
            inputSenha.value = dados;
        })
        .catch(erro => {
            console.error("Erro na requisição:", erro);
        });
}

function criarConta(nome, email, senha, confirmarSenha) {
    if (validacaoUsuario(nome, email, senha, confirmarSenha, avatarUsuario)) {
        let nomeValue = nome.value;
        let emailValue = email.value;
        let senhaValue = senha.value;
        
        fetch("/usuarios/atualizarPerfil/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idUsuario: idUsuario,
                nomeValue: nomeValue,
                emailValue: emailValue,
                senhaValue: senhaValue,
                avatarUsuario: avatarUsuario
            })
        }).then(function (resposta) {
            if (resposta.ok) {
                Swal.fire({
                    text: "Perfil atualizado com sucesso!",
                    icon: "success",
                    timer: 2000
                });
                confirmarSenha.value = "";
            } else {
                Swal.fire({
                    title: "Erro ao atualizar perfil",
                    text: `Status: ${resposta.statusText}`,
                    icon: "warning",
                    timer: 2000
                });
            }
        })
    }
}

function validacaoUsuario(nome, email, senha, confSenha, avatarUsuario) {
    const caracteresEspeciais = "#@!$%&";
    let temCaractereEspecial = false;

    for (let i = 0; i < caracteresEspeciais.length; i++) {
        if (senha.value.indexOf(caracteresEspeciais[i]) !== -1) {
            temCaractereEspecial = true;
            break;
        }
    }

    if (nome.value.length < 2) setFieldError(nome, "Necessário no mínimo 2 caracteres.");
    else setFieldSpecificSuccess(nome);
    if (email.value.indexOf("@") == -1 || email.value.length < 6) setFieldError(email, "Email precisa conter @ e ter no mínimo 6 caracteres.");
    else setFieldSpecificSuccess(email);
    if (senha.value.length < 6) setFieldError(senha, "Necessário no mínimo 6 caracteres.");
    else if (!temCaractereEspecial) setFieldError(senha, "Necessário pelo menos um caractere especial.");
    else setFieldSpecificSuccess(senha);
    if (confSenha.value !== senha.value) setFieldError(confSenha, "As senhas precisam ser iguais.");
    else setFieldSpecificSuccess(confSenha);
    if (avatarUsuario == "") {
        Swal.fire({
            title: "E a fotinha?",
            text: "Você precisa escolher um avatar!",
            icon: "error"
        });
    }
    if (nome.value.length >= 2 && confSenha.value == senha.value && temCaractereEspecial && senha.value.length >= 6 && email.value.indexOf("@") != -1 && email.value.length >= 6 && avatarUsuario != "") {
        setFieldAllSuccess(nome);
        setFieldAllSuccess(senha);
        setFieldAllSuccess(confSenha);
        setFieldAllSuccess(email);
        return true;
    } else {
        return false;
    }
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
