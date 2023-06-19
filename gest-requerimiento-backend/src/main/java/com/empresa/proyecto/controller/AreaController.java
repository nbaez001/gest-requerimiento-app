package com.empresa.proyecto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.empresa.proyecto.entity.Area;
import com.empresa.proyecto.entity.OutResponse;
import com.empresa.proyecto.service.AreaService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/area")
@Slf4j
public class AreaController {

	@Autowired
	AreaService areaService;

	@GetMapping(value = "/listar")
	public OutResponse<List<Area>> listarArea() {
		log.info("[LISTAR AREA][CONTROLLER][INICIO]");
		OutResponse<List<Area>> out = areaService.listarArea();
		log.info("[LISTAR AREA][CONTROLLER][FIN]");
		return out;
	}
}
