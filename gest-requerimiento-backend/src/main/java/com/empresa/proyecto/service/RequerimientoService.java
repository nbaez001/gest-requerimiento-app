package com.empresa.proyecto.service;

import java.util.List;

import com.empresa.proyecto.entity.OutResponse;
import com.empresa.proyecto.entity.Requerimiento;

public interface RequerimientoService {

	public OutResponse<List<Requerimiento>> listar(String nombre, String apellidos, String nomSolicitud);

	public OutResponse<Requerimiento> guardar(Requerimiento req);

	public OutResponse<Requerimiento> modificar(Requerimiento req, Integer id);

	public OutResponse<?> eliminar(Integer id);
}
