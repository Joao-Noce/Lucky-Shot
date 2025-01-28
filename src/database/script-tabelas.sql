CREATE DATABASE LuckyShot;

USE LuckyShot;

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nomeUsuario VARCHAR(50) UNIQUE,
	emailUsuario VARCHAR(50) UNIQUE,
	senhaUsuario VARCHAR(50),
    avatarUsuario varchar(150),
    inicio DATETIME DEFAULT CURRENT_TIMESTAMP,
    caixaBlackjack INT,
    caixaSete INT);

CREATE TABLE blackjack (
idBlackjack INT PRIMARY KEY AUTO_INCREMENT,
fkUsuario INT, FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
aposta INT,
ganhou BOOLEAN,
deu_maximo BOOLEAN);

CREATE TABLE sete (
idSete INT PRIMARY KEY AUTO_INCREMENT,
fkUsuario INT, FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
aposta INT,
ganhou BOOLEAN,
deu_maximo BOOLEAN);

CREATE TABLE genius (
idGenius INT PRIMARY KEY AUTO_INCREMENT,
fkUsuario INT, FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
maiorPontuacao INT);

CREATE TABLE TERMO (
idTermo INT PRIMARY KEY AUTO_INCREMENT,
fkUsuario INT, FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
ganhou BOOLEAN);

CREATE TABLE minefield (
idMinefield INT PRIMARY KEY AUTO_INCREMENT,
fkUsuario INT, FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
ganhou BOOLEAN);

CREATE TABLE sudoku (
idSudoku INT PRIMARY KEY AUTO_INCREMENT,
fkUsuario INT, FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
ganhou BOOLEAN);

-- Total de vitórias e derrotas do 7.5
select COUNT(CASE WHEN ganhou = 0 THEN 1 END) AS 'Derrotas',
COUNT(CASE WHEN ganhou = 1 THEN 1 END) AS 'Vitórias'
FROM sete WHERE fkUsuario = 1;

-- Total de vitórias e derrotas no blackjack
select COUNT(CASE WHEN ganhou = 0 THEN 1 END) AS 'Derrotas',
COUNT(CASE WHEN ganhou = 1 THEN 1 END) AS 'Vitórias'
FROM blackjack WHERE fkUsuario = 1;

-- Total de lucro e perdas no 7.5
SELECT SUM(CASE WHEN ganhou = 0 THEN aposta END) AS Perdas,
SUM(CASE WHEN ganhou = 1 THEN aposta END) AS Ganhos FROM sete WHERE fkUsuario = 1;

-- Total de lucro e perdas no blackjack
SELECT SUM(CASE WHEN ganhou = 0 THEN aposta END) AS Perdas,
SUM(CASE WHEN ganhou = 1 THEN aposta END) AS Ganhos FROM blackjack WHERE fkUsuario = 1;

-- Total de rodadas jogadas no 7.5
SELECT COUNT(idSete) FROM sete WHERE fkUsuario = 1;

-- Total de rodadas jogadas no blackjack
SELECT COUNT(idBlackjack) FROM blackjack WHERE fkUsuario = 1;

-- Total de vezes que ganhou com SETE E MEIO
SELECT COUNT(deu_maximo) AS 'total_sete' FROM sete WHERE fkUsuario = 1 AND deu_maximo = 1;

-- Total de vezes que ganhou com BLACKJACK
SELECT COUNT(deu_maximo) AS 'total_blackjack' FROM blackjack WHERE fkUsuario = 1 AND deu_maximo = 1;

-- Login
SELECT idUsuario, nomeUsuario, emailUsuario, avatarUsuario, DATE_FORMAT(inicio, '%d/%m/%Y') AS inicio, caixaBlackjack, caixaSete FROM usuario;

-- ranking por caixa no 7.5
SELECT nomeUsuario, caixaSete FROM usuario ORDER BY caixaSete DESC;

-- ranking por caixa no blackjack
SELECT nomeUsuario, caixaBlackjack FROM usuario ORDER BY caixaBlackjack DESC;

-- ranking por vitórias no 7.5
SELECT nomeUsuario, COUNT(ganhou) AS Quantidade FROM usuario JOIN sete ON idUsuario = fkUsuario WHERE ganhou = 1 GROUP BY nomeUsuario ORDER BY Quantidade DESC;

-- ranking por vitórias no blackjack
SELECT nomeUsuario, COUNT(ganhou) AS Quantidade FROM usuario JOIN blackjack ON idUsuario = fkUsuario WHERE ganhou = 1 GROUP BY nomeUsuario ORDER BY Quantidade DESC;

-- ranking por maior pontuação no genius
SELECT nomeUsuario,
    MAX(maiorPontuacao) as maiorPontuacao
    FROM usuario
    JOIN genius ON idUsuario = fkUsuario
    GROUP BY nomeUsuario
    ORDER BY maiorPontuacao DESC;