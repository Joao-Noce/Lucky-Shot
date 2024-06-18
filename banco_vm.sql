CREATE DATABASE LuckyShot;

USE LuckyShot;

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nomeUsuario VARCHAR(50) UNIQUE,
	emailUsuario VARCHAR(50) UNIQUE,
	senhaUsuario VARCHAR(50),
    avatarUsuario varchar(150),
    inicio DATETIME DEFAULT CURRENT_TIMESTAMP,
    caixaUsuario INT);
    
select * from usuario;

CREATE TABLE registro (
idRegistro INT PRIMARY KEY AUTO_INCREMENT,
fkUsuario INT, FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
aposta INT,
ganhou BOOLEAN,
deu_maximo BOOLEAN);

select * from registro;
update usuario set caixaUsuario = 100 where idUsuario = 1;

-- Total de vitórias e derrotas
select COUNT(CASE WHEN ganhou = 0 THEN 1 END) AS 'Derrotas',
COUNT(CASE WHEN ganhou = 1 THEN 1 END) AS 'Vitórias'
FROM registro WHERE fkUsuario = 1;

-- Total de lucro e perdas
SELECT SUM(CASE WHEN ganhou = 0 THEN aposta END) AS Perdas,
SUM(CASE WHEN ganhou = 1 THEN aposta END) AS Ganhos FROM registro WHERE fkUsuario = 1;

-- Total de rodadas jogadas
SELECT COUNT(idRegistro) FROM registro WHERE fkUsuario = 1;

-- Total de vezes que ganhou com SETE E MEIO
SELECT COUNT(deu_maximo) AS 'SETE E MEIO' FROM registro WHERE fkUsuario = 1 AND deu_maximo = 1;

SELECT idUsuario AS Id, nomeUsuario AS Usuário, emailUsuario AS Email, senhaUsuario AS Senha, caixaUsuario AS Caixa FROM usuario;

-- ranking por caixa
SELECT nomeUsuario, caixaUsuario FROM usuario ORDER BY caixaUsuario DESC;

-- ranking por vitórias
SELECT nomeUsuario, COUNT(ganhou) AS Quantidade FROM usuario JOIN registro ON idUsuario = fkUsuario WHERE ganhou = 1 GROUP BY nomeUsuario ORDER BY Quantidade DESC;