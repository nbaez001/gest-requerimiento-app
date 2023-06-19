package com.empresa.proyecto.entity;

import java.io.Serializable;

import lombok.Data;

@Data
public class Area implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String nombre;
}
