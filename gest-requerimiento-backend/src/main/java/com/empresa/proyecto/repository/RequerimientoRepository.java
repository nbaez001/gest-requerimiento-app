package com.empresa.proyecto.repository;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.empresa.proyecto.entity.Requerimiento;

@Repository
public interface RequerimientoRepository {

	public List<Requerimiento> listar(@Param("nombre") String nombre, @Param("apellidos") String apellidos,
			@Param("nomSolicitud") String nomSolicitud);

	public Long guardar(@Param("idArea") Long idArea, @Param("nombre") String nombre,
			@Param("apellidos") String apellidos, @Param("nomSolicitud") String nomSolicitud,
			@Param("descSolicitud") String descSolicitud, @Param("urlAnexo") String urlAnexo);

	public void modificar(@Param("id") Long id, @Param("idArea") Long idArea, @Param("nombre") String nombre,
			@Param("apellidos") String apellidos, @Param("nomSolicitud") String nomSolicitud,
			@Param("descSolicitud") String descSolicitud);

	public void eliminar(@Param("id") Long id);
}
