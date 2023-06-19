package com.empresa.proyecto.service;

import java.util.List;

import com.empresa.proyecto.entity.Area;
import com.empresa.proyecto.entity.OutResponse;

public interface AreaService {

	public OutResponse<List<Area>> listarArea();
}
