package com.klid.webapp.common.file.service;

import java.util.List;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.common.file.dto.AttachfileDto;

public interface FileDeleteService {

	ReturnData deleteFile(List<AttachfileDto> fileDto);

	ReturnData deleteAccFile(List<AttachfileDto> fileDto);

	boolean deleteFileInfo(Criterion criterion);

	boolean deleteAccFileInfo(Criterion criterion);
}
