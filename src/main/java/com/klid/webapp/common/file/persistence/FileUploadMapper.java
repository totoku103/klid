package com.klid.webapp.common.file.persistence;

import java.util.Map;

import org.springframework.stereotype.Repository;
import com.klid.webapp.common.code.dto.CodeDto;

@Repository("fileUploadMapper")
public interface FileUploadMapper {
	void insertFileInfo(Map<String, Object> param);

	//사고접수용 첨부파일 업로드
	void insertAccFileInfo(Map<String, Object> param);

    void addHelpFile(Map<String, Object> param);

    CodeDto helpFileName(Map<String, Object> param);
}
