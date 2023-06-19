package com.empresa.proyecto.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.empresa.proyecto.entity.Area;
import com.empresa.proyecto.entity.OutResponse;
import com.empresa.proyecto.repository.AreaRepository;
import com.empresa.proyecto.service.AreaService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class AreaServiceImpl implements AreaService {

	@Autowired
	AreaRepository areaRepository;

	@Override
	public OutResponse<List<Area>> listarArea() {
		log.info("[LISTAR AREA][SERVICE][INICIO]");
		OutResponse<List<Area>> out = new OutResponse<>();

		List<Area> res = areaRepository.listarArea();
		out.setRobjeto(res);

		log.info("[LISTAR AREA][SERVICE][FIN]");
		return out;
	}
}
