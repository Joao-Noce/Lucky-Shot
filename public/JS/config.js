inputNome.value = sessionStorage.NOME_USUARIO;
inputEmail.value = sessionStorage.EMAIL_USUARIO;
inputSenha.value = sessionStorage.SENHA_USUARIO;

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