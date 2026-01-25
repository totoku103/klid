package com.klid.webapp.common.file.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import jakarta.annotation.Resource;

import org.springframework.stereotype.Service;

import com.klid.common.AppGlobal;
import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.MsgService;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.common.file.dto.AttachfileDto;
import com.klid.webapp.common.file.persistence.FileDeleteMapper;

@Service("fileDeleteService")
public class FileDeleteServiceImpl extends MsgService implements FileDeleteService {

	@Resource(name = "fileDeleteMapper")
	private FileDeleteMapper mapper;

	@Override
	public ReturnData deleteFile(List<AttachfileDto> fileDto) {
		int i = 0;
		int cycle = fileDto.size();
		int sucMsg = 0;

		for (; i < cycle; i++) {
			Path path = Paths.get(AppGlobal.uploadPath, fileDto.get(i).getFileName());
			try {
				// Files.delete(path);
				if (Files.deleteIfExists(path)) {
					// 파일 삭제 성공
					sucMsg += 0;
				} else {
					sucMsg += 1;
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return new ReturnData(sucMsg > 0 ? getDeleteOkMessage() : getDeleteFailMessage());
	}

	@Override
	public boolean deleteFileInfo(Criterion criterion) {

		int resultCnt = mapper.deleteFileInfo(criterion.getCondition());
		if (resultCnt > 0) {
			return true;
		}
		return false;
	}


	////////사고접수 첨부파일 삭제////////////
	@Override
	public boolean deleteAccFileInfo(Criterion criterion) {

		int resultCnt = mapper.deleteAccFileInfo(criterion.getCondition());
		if (resultCnt > 0) {
			return true;
		}
		return false;
	}

	@Override
	public ReturnData deleteAccFile(List<AttachfileDto> fileDto) {
		int i = 0;
		int cycle = fileDto.size();
		int sucMsg = 0;

		for (; i < cycle; i++) {
			Path path = Paths.get(AppGlobal.uploadPath, fileDto.get(i).getFileName());
			try {
				// Files.delete(path);
				if (Files.deleteIfExists(path)) {
					// 파일 삭제 성공
					sucMsg += 0;
				} else {
					sucMsg += 1;
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return new ReturnData(sucMsg > 0 ? getDeleteOkMessage() : getDeleteFailMessage());
	}

}
