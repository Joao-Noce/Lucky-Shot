CREATE DATABASE LuckyShot;

USE guitar;

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nomeUsuario VARCHAR(50) UNIQUE,
	emailUsuario VARCHAR(50) UNIQUE,
	senhaUsuario VARCHAR(50),
    caixaUsuario INT);
    
select * from usuario;


SELECT idUsuario AS Id, nomeUsuario AS Usuário, emailUsuario AS Email, senhaUsuario AS Senha, caixaUsuario AS Caixa FROM usuario;