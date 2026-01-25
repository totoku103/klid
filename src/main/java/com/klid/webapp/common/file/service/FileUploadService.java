package com.klid.webapp.common.file.service;

import org.springframework.web.multipart.MultipartFile;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;

public interface FileUploadService {
	public void fileUploadLocal(MultipartFile multipartFile, String tempFileName);

	public void agentFileUploadLocal(MultipartFile multipartFile, String tempFileName);

	public ReturnData fileUploadDB(MultipartFile multipartFile);

	public ReturnData insertFileInfo(Criterion criterion);

	//사고접수용 첨부파일 업로드
	public ReturnData insertAccFileInfo(Criterion criterion);

	public void fileUploadHelp(MultipartFile multipartFile, String tempFileName, String code2);

	public ReturnData addHelpFile(Criterion criterion);

}
