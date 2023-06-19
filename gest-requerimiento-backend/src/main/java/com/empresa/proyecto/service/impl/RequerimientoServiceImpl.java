package com.empresa.proyecto.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.empresa.proyecto.entity.OutResponse;
import com.empresa.proyecto.entity.Requerimiento;
import com.empresa.proyecto.repository.RequerimientoRepository;
import com.empresa.proyecto.service.RequerimientoService;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class RequerimientoServiceImpl implements RequerimientoService {

	@Autowired
	RequerimientoRepository requerimientoRepository;

	@Override
	public OutResponse<List<Requerimiento>> listar(String nombre, String apellidos, String nomSolicitud) {
		log.info("[LISTAR REQUERIMIENTO][SERVICE][INICIO]");
		OutResponse<List<Requerimiento>> out = new OutResponse<>();

		List<Requerimiento> res = requerimientoRepository.listar(nombre, apellidos, nomSolicitud);
		out.setRobjeto(res);

		log.info("[LISTAR REQUERIMIENTO][SERVICE][FIN]");
		return out;
	}

	@Override
	public OutResponse<Requerimiento> guardar(Requerimiento req) {
		log.info("[REGISTRAR REQUERIMIENTO][SERVICE][INICIO]");
		OutResponse<Requerimiento> out = new OutResponse<>();

		Long res = requerimientoRepository.guardar(req.getIdArea(), req.getNombre(), req.getApellidos(),
				req.getNomSolicitud(), req.getDescSolicitud(), "url");
		req.setId(res);
		out.setRobjeto(req);

		log.info("[REGISTRAR REQUERIMIENTO][SERVICE][FIN]");
		return out;
	}

	@Override
	public OutResponse<Requerimiento> modificar(Requerimiento req, Long id) {
		log.info("[MODIFICAR REQUERIMIENTO][SERVICE][INICIO]");
		OutResponse<Requerimiento> out = new OutResponse<>();

		requerimientoRepository.modificar(id, req.getIdArea(), req.getNombre(), req.getApellidos(),
				req.getNomSolicitud(), req.getDescSolicitud());
		req.setId(id);
		out.setRobjeto(req);

		log.info("[MODIFICAR REQUERIMIENTO][SERVICE][FIN]");
		return out;
	}

	@Override
	public OutResponse<?> eliminar(Long id) {
		log.info("[ELIMINAR REQUERIMIENTO][SERVICE][INICIO]");
		OutResponse<Requerimiento> out = new OutResponse<>();

		requerimientoRepository.eliminar(id);

		log.info("[ELIMINAR REQUERIMIENTO][SERVICE][FIN]");
		return out;
	}

}
