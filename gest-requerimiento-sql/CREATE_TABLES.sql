CREATE DATABASE IF NOT EXISTS gest_req_db DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
USE gest_req_db;

CREATE TABLE area (
  id int(11) NOT NULL,
  nombre varchar(500) COLLATE utf8_spanish_ci NOT NULL,
  flg_activo int(11) NOT NULL,
  id_usu_crea int(11) NOT NULL,
  fec_usu_crea date NOT NULL,
  id_usu_mod int(11) DEFAULT NULL,
  fec_usu_mod date DEFAULT NULL
);

INSERT INTO area (id, nombre, flg_activo, id_usu_crea, fec_usu_crea, id_usu_mod, fec_usu_mod) VALUES
(1, 'LOGISTICA', 1, 1, '2023-06-18', NULL, NULL),
(2, 'VENTAS', 1, 1, '2023-06-18', NULL, NULL);

CREATE TABLE requerimiento (
  id int(11) NOT NULL,
  id_area int(11) NOT NULL,
  nombre varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  apellidos varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  nom_solicitud varchar(500) COLLATE utf8_spanish_ci NOT NULL,
  desc_solicitud text COLLATE utf8_spanish_ci NOT NULL,
  flg_activo int(11) NOT NULL,
  id_usu_crea int(11) NOT NULL,
  fec_usu_crea date NOT NULL,
  id_usu_mod int(11) DEFAULT NULL,
  fec_usu_mod date DEFAULT NULL,
  url_anexo varchar(5000) COLLATE utf8_spanish_ci NOT NULL
);

ALTER TABLE area
  ADD PRIMARY KEY (id);

ALTER TABLE requerimiento
  ADD PRIMARY KEY (id),
  ADD KEY id_area (id_area);

ALTER TABLE area
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

ALTER TABLE requerimiento
  MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

ALTER TABLE requerimiento
  ADD CONSTRAINT requerimiento_ibfk_1 FOREIGN KEY (id_area) REFERENCES area (id);
COMMIT;