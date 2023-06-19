package com.empresa.proyecto.entity;

import java.io.Serializable;

import com.empresa.proyecto.util.ConstanteUtil;

import lombok.Data;

@Data
public class OutResponse<T> implements Serializable {
	private static final long serialVersionUID = 1L;

	public OutResponse() {
		this.rcodigo = ConstanteUtil.R_COD_EXITO;
		this.rmensaje = ConstanteUtil.R_MSG_EXITO;
	}

	private Integer rcodigo;
	private String rmensaje;
	private T robjeto;

}
