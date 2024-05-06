-- npm init -y
-- npm install express pg
-- npm install -g nodemon

CREATE DATABASE aranhaverso_db;

\c aranhaverso_db;

CREATE TABLE herois (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    poder VARCHAR(200) NOT NULL,
    dano INT NOT NULL,
    nivel INT NOT NULL,
    hp INT NOT NULL
);

CREATE TABLE batalhas (
    id SERIAL PRIMARY KEY,
    heroi01_id INT NOT NULL,
    heroi02_id INT NOT NULL,
    vencedor_id INT NOT NULL,
    FOREIGN KEY (heroi01_id) REFERENCES herois(id),
    FOREIGN KEY (heroi02_id) REFERENCES herois(id),
    FOREIGN KEY (vencedor_id) REFERENCES herois(id)
);

INSERT INTO herois (nome, poder, dano, nivel, hp) VALUES ('Homem-Aranha', 'Geração de teias', 100, 10, 110);
INSERT INTO herois (nome, poder, dano, nivel, hp) VALUES ('Homem-Aranha (Miles Morales)', 'Bioeletricidade', 100, 10, 110);
INSERT INTO herois (nome, poder, dano, nivel, hp) VALUES ('Homem-Aranha (Simbionte)', 'Estrutura Corporal', 90, 10, 120);
INSERT INTO herois (nome, poder, dano, nivel, hp) VALUES ('Homem-Aranha (2099)', 'Garras Afiadas', 100, 10, 100);
INSERT INTO herois (nome, poder, dano, nivel, hp) VALUES ('Homem-Aranha (Noir)', 'Armas de Fogo', 90, 10, 90);
INSERT INTO herois (nome, poder, dano, nivel, hp) VALUES ('Spider-Gwen', 'Reflexos Sobre-Humanos', 80, 10, 80);
INSERT INTO herois (nome, poder, dano, nivel, hp) VALUES ('Anti-Venom', 'Durabilidade Sobre-Humana', 80, 10, 130);
INSERT INTO herois (nome, poder, dano, nivel, hp) VALUES ('Venom', 'Resistência e Força sobre-humanas', 100, 10, 120);
INSERT INTO herois (nome, poder, dano, nivel, hp) VALUES ('Duende-Verde', 'Esferas Explosivas', 90, 10, 80);
INSERT INTO herois (nome, poder, dano, nivel, hp) VALUES ('Doutor Octopus', 'Tentáculos Robóticos', 90, 10, 90);
INSERT INTO herois (nome, poder, dano, nivel, hp) VALUES ('Lagarto', 'Regeneração', 80, 10, 80);
INSERT INTO herois (nome, poder, dano, nivel, hp) VALUES ('Homem-Areia', 'Manipulação de Areia', 80, 10, 80);
INSERT INTO herois (nome, poder, dano, nivel, hp) VALUES ('Electro', 'Eletrocinese', 80, 10, 90);
INSERT INTO herois (nome, poder, dano, nivel, hp) VALUES ('Mancha', 'Manipulação de Energia Escura', 100, 10, 140);
INSERT INTO herois (nome, poder, dano, nivel, hp) VALUES ('Mysterio', 'Ilusão', 80, 10, 80);
INSERT INTO herois (nome, poder, dano, nivel, hp) VALUES ('Escorpião', 'Envenenamento', 80, 10, 80);
INSERT INTO herois (nome, poder, dano, nivel, hp) VALUES ('Rhino', 'Chifre Resistente', 80, 10, 90);
INSERT INTO herois (nome, poder, dano, nivel, hp) VALUES ('Rei do Crime', 'Super Força', 100, 10, 100);
INSERT INTO herois (nome, poder, dano, nivel, hp) VALUES ('Abutre', 'Asas Tecnologicas', 80, 10, 80);
INSERT INTO herois (nome, poder, dano, nivel, hp) VALUES ('Kraven', 'Caça Impecável', 90, 10, 100);
INSERT INTO herois (nome, poder, dano, nivel, hp) VALUES ('Camaleão', 'Disfarce', 80, 10, 80);
INSERT INTO herois (nome, poder, dano, nivel, hp) VALUES ('Carnificina', 'Armas de Simbionte', 100, 10, 130);
INSERT INTO herois (nome, poder, dano, nivel, hp) VALUES ('Gata Negra', 'Garras Retráteis', 80, 10, 80);
INSERT INTO herois (nome, poder, dano, nivel, hp) VALUES ('Senhor Negativo', 'Força Negra', 80, 10, 90);
INSERT INTO herois (nome, poder, dano, nivel, hp) VALUES ('Teia de Ceda', 'Sentido Aranha', 80, 10, 90);
INSERT INTO herois (nome, poder, dano, nivel, hp) VALUES ('Porco-Aranha', 'Toon Force', 80, 10, 80);
INSERT INTO herois (nome, poder, dano, nivel, hp) VALUES ('Madame Teia', 'Previsão',80, 10, 90);
INSERT INTO herois (nome, poder, dano, nivel, hp) VALUES ('Morbius', 'Sonar', 80, 10, 80);
INSERT INTO herois (nome, poder, dano, nivel, hp) VALUES ('Gatuno', 'Acrobata', 80, 10, 80);
INSERT INTO herois (nome, poder, dano, nivel, hp) VALUES ('Aranha de Ferro', 'Braços Tecnologicos', 90, 10, 100);
INSERT INTO herois (nome, poder, dano, nivel, hp) VALUES ('Shocker', 'Altas Vibrações', 80, 10, 80);