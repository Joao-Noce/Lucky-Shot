CREATE DATABASE LuckyShot;

USE LuckyShot;

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nomeUsuario VARCHAR(50) UNIQUE,
	emailUsuario VARCHAR(50) UNIQUE,
	senhaUsuario VARCHAR(50),
    avatarUsuario varchar(150),
    caixaUsuario INT);
    
select * from usuario;

CREATE TABLE jogos (
idJogo INT PRIMARY KEY AUTO_INCREMENT,


SELECT idUsuario AS Id, nomeUsuario AS Usuário, emailUsuario AS Email, senhaUsuario AS Senha, caixaUsuario AS Caixa FROM usuario;