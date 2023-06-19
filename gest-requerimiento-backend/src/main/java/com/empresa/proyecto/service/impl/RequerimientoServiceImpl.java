package com.empresa.proyecto.service.impl;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
	public OutResponse<Requerimiento> guardar(Requerimiento req, MultipartFile file) {
		log.info("[REGISTRAR REQUERIMIENTO][SERVICE][INICIO]");
		OutResponse<Requerimiento> out = new OutResponse<>();

		String url = saveFile(file);
		req.setUrlAnexo(url);
		requerimientoRepository.guardar(req);
		out.setRobjeto(req);

		log.info("[REGISTRAR REQUERIMIENTO][SERVICE][FIN]");
		return out;
	}

	private String saveFile(MultipartFile file) {
		String date = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyMMddHHmmss-"));
		String fileName = date + file.getOriginalFilename();

		String folderPath = "D:/archivos";
		if (!new File(folderPath).exists()) {
			new File(folderPath).mkdir();
		}
		String filePath = folderPath + File.separator + fileName;

		try {
			Files.copy(file.getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);
		} catch (IOException e) {
			log.info(e.getMessage());
		}
		return filePath;
	}

	@Override
	public OutResponse<Requerimiento> modificar(Requerimiento req, Integer id) {
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
	public OutResponse<?> eliminar(Integer id) {
		log.info("[ELIMINAR REQUERIMIENTO][SERVICE][INICIO]");
		OutResponse<Requerimiento> out = new OutResponse<>();

		requerimientoRepository.eliminar(id);

		log.info("[ELIMINAR REQUERIMIENTO][SERVICE][FIN]");
		return out;
	}

}
