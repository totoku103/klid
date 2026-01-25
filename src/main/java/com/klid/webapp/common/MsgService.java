/**
 * Program Name	: MsgService.java
 *
 * Version		:  1.0
 *
 * Creation Date	: 2015. 3. 2.
 * 
 * Programmer Name 	: Bae Jung Yeo
 *
 * Copyright 2014 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;

import java.util.Locale;

/**
 * @author jung
 *
 */
public class MsgService {

	@Autowired
	private MessageSource messageSource;
	
	protected String getMessage(String code) {
		return getMessage(code, null);
	}
	
	protected String getMessage(String code, Object[] params) {
		return getMessage(code, params, Locale.getDefault());
	}
	
	protected String getMessage(String code, Object[] params, Locale locale) {
		return messageSource.getMessage(code, params, locale);
	}
	
	protected String getPrcsMesssage() {
		return messageSource.getMessage("msg.prcs.ok", null, Locale.getDefault());
	}
	// 추가 성공
	protected String getAddOkMessage() {
		return getMessage("msg.add.ok");
	}

	// 추가 실패
	protected String getAddFailMessage() {
		return getMessage("msg.add.fail");
	}

	// 수정 성공
	protected String getEditOkMessage() {
		return getMessage("msg.edit.ok");
	}

	// 수정 실패
	protected String getEditFailMessage() {
		return getMessage("msg.edit.fail");
	}

	// 삭제 성공
	protected String getDeleteOkMessage() {
		return getMessage("msg.del.ok");
	}

	// 삭제 실패
	protected String getDeleteFailMessage() {
		return getMessage("msg.del.fail");
	}

	// 저장 성공
	protected String getSaveOkMessage() {
		return getMessage("msg.save.ok");
	}

	// 저장 실패
	protected String getSaveFailMessage() {
		return getMessage("msg.save.fail");
	}
	// 그룹명 중복
	protected String getGroupDuplication(){
		return getMessage("msg.group.duplication");
	}

	// 프로세스명 중복
	protected String getProcDuplicationMessage() { return  getMessage("msg.svr.profile.proc.duplName");}
}
