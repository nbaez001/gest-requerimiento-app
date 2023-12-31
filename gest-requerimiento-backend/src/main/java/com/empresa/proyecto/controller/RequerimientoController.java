package com.empresa.proyecto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.empresa.proyecto.entity.OutResponse;
import com.empresa.proyecto.entity.Requerimiento;
import com.empresa.proyecto.service.RequerimientoService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/requerimiento")
@Slf4j
public class RequerimientoController {

	@Autowired
	RequerimientoService requerimientoService;

	@GetMapping
	public OutResponse<List<Requerimiento>> listar(@RequestParam(name = "nombre", required = false) String nombre,
			@RequestParam(name = "apellidos", required = false) String apellidos,
			@RequestParam(name = "nomSolicitud", required = false) String nomSolicitud) {
		log.info("[LISTAR REQUERIMIENTO][CONTROLLER][INICIO]");
		OutResponse<List<Requerimiento>> out = requerimientoService.listar(nombre, apellidos, nomSolicitud);
		log.info("[LISTAR REQUERIMIENTO][CONTROLLER][FIN]");
		return out;
	}

	@PostMapping
	public OutResponse<Requerimiento> guardar(@RequestParam("data") String data,
			@RequestParam(value = "file", required = false) MultipartFile file) {
		log.info("[REGISTRAR REQUERIMIENTO][CONTROLLER][INICIO]");
		OutResponse<Requerimiento> out = new OutResponse<>();
		try {
			ObjectMapper om = new ObjectMapper();
			om.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
			Requerimiento req = om.readValue(data, new TypeReference<Requerimiento>() {
			});

			out = requerimientoService.guardar(req, file);
		} catch (JsonProcessingException e) {
			log.info(e.getMessage());
			out.setRcodigo(500);
			out.setRmensaje(e.getMessage());
		}

		log.info("[REGISTRAR REQUERIMIENTO][CONTROLLER][FIN]");
		return out;
	}

	@PutMapping(value = "/{id}")
	public OutResponse<Requerimiento> modificar(@RequestBody Requerimiento req,
			@PathVariable(name = "id", required = true) Integer id) {
		log.info("[MODIFICAR REQUERIMIENTO][CONTROLLER][INICIO]");
		OutResponse<Requerimiento> out = requerimientoService.modificar(req, id);
		log.info("[MODIFICAR REQUERIMIENTO][CONTROLLER][FIN]");
		return out;
	}

	@DeleteMapping(value = "/{id}")
	public OutResponse<?> eliminar(@PathVariable(name = "id", required = false) Integer id) {
		log.info("[ELIMINAR REQUERIMIENTO][CONTROLLER][INICIO]");
		OutResponse<?> out = requerimientoService.eliminar(id);
		log.info("[ELIMINAR REQUERIMIENTO][CONTROLLER][FIN]");
		return out;
	}
}
