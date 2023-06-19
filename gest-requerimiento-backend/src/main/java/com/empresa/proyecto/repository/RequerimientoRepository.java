package com.empresa.proyecto.repository;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import com.empresa.proyecto.entity.Requerimiento;

@Repository
public interface RequerimientoRepository {

	public List<Requerimiento> listar(@Param("nombre") String nombre, @Param("apellidos") String apellidos,
			@Param("nomSolicitud") String nomSolicitud);

	@Insert("INSERT INTO requerimiento (id_area, nombre, apellidos, nom_solicitud, desc_solicitud, url_anexo, flg_activo, id_usu_crea, fec_usu_crea) " +
            "VALUES (#{idArea}, #{nombre}, #{apellidos}, #{nomSolicitud}, #{descSolicitud}, #{urlAnexo}, 1, 1, now())")
    @Options(useGeneratedKeys = true, keyProperty = "id")
	public void guardar(Requerimiento req);

	public void modificar(@Param("id") Integer id, @Param("idArea") Integer idArea, @Param("nombre") String nombre,
			@Param("apellidos") String apellidos, @Param("nomSolicitud") String nomSolicitud,
			@Param("descSolicitud") String descSolicitud);

	public void eliminar(@Param("id") Integer id);
}
