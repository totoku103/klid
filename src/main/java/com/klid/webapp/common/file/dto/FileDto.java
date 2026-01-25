/**
 * Program Name	: FileDto.java
 *
 * Version		:  3.2.0
 *
 * Creation Date	: 2016. 2. 16.
 * 
 * Programmer Name 	: Bae Jung Yeo
 *
 * Copyright 2015 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.common.file.dto;

import org.springframework.web.multipart.MultipartFile;

/**
 * @author jjung
 *
 */
public class FileDto {
	private MultipartFile uploadFile;

	public MultipartFile getUploadFile() {
		return uploadFile;
	}

	public void setUploadFile(MultipartFile uploadFile) {
		this.uploadFile = uploadFile;
	}
}
