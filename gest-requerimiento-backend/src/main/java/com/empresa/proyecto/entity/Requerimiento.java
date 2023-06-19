package com.empresa.proyecto.entity;

import java.io.Serializable;

import lombok.Data;

@Data
public class Requerimiento implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private Long idArea;
	private String nombre;
	private String apellidos;
	private String nomSolicitud;
	private String descSolicitud;
	private String urlAnexo;
	private Integer flgActivo;
}
