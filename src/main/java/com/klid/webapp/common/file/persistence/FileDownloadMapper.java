package com.klid.webapp.common.file.persistence;

import java.util.List;
import java.util.Map;

import com.klid.webapp.common.file.dto.AttachfileDto;

public interface FileDownloadMapper {

	List<AttachfileDto> selectFileName(Map<String, Object> param);

	//사고접수용 첨부파일 다운
	List<AttachfileDto> selectAccFileName(Map<String, Object> param);
}
