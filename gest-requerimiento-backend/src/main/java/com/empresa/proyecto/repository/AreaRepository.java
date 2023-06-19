package com.empresa.proyecto.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.empresa.proyecto.entity.Area;

@Repository
public interface AreaRepository {
	
	public List<Area> listarArea();
}
