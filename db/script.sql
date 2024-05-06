-- npm init -y
-- npm install express pg
-- npm install -g nodemon

CREATE DATABASE aranhaverso_db;

\c aranhaverso_db;

CREATE TABLE herois (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(200) NOT NULL,
    poder VARCHAR(200) NOT NULL,
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



INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Homem-Aranha', 'Geração de teias', 10, 110);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Homem-Aranha (Miles Morales)', 'Bioeletricidade', 10, 110);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Homem-Aranha (Simbionte)', 'Estrutura Corporal', 10, 120);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Homem-Aranha (2099)', 'Garras Afiadas', 10, 100);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Homem-Aranha (Noir)', 'Armas de Fogo', 10, 90);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Spider-Gwen', 'Reflexos Sobre-Humanos', 10, 80);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Anti-Venom', 'Durabilidade Sobre-Humana', 10, 130);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Venom', 'Resistência e Força sobre-humanas', 10, 120);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Duende-Verde', 'Esferas Explosivas', 10, 80);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Doutor Octopus', 'Tentáculos Robóticos', 10, 90);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Lagarto', 'Regeneração', 10, 80);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Homem-Areia', 'Manipulação de Areia', 10, 80);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Electro', 'Eletrocinese', 10, 90);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Mancha', 'Manipulação de Energia Escura', 10, 140);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Mysterio', 'Ilusão', 10, 80);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Escorpião', 'Envenenamento', 10, 80);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Rhino', 'Chifre Resistente', 10, 90);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Rei do Crime', 'Super Força', 10, 100);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Abutre', 'Asas Tecnologicas', 10, 80);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Kraven', 'Caça Impecável', 10, 100);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Camaleão', 'Disfarce', 10, 80);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Carnificina', 'Armas de Simbionte', 10, 130);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Gata Negra', 'Garras Retráteis', 10, 80);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Senhor Negativo', 'Força Negra', 10, 90);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Teia de Ceda', 'Sentido Aranha', 10, 90);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Porco-Aranha', 'Toon Force', 10, 80);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Madame Teia', 'Previsão', 10, 90);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Morbius', 'Sonar', 10, 80);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Gatuno', 'Acrobata', 10, 80);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Aranha de Ferro', 'Braços Tecnologicos', 10, 100);
INSERT INTO herois (nome, poder, nivel, hp) VALUES ('Shocker', 'Altas Vibrações', 10, 80);