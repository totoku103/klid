/**
 * Program Name	: SmsMapper.java
 *
 * Version		:  1.0
 *
 * Creation Date	: 2015. 12. 14.
 * 
 * Programmer Name 	: kim dong ju
 *
 * Copyright 2015 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.main.sms.persistence;

import com.klid.webapp.main.sec.takeOverBoard.dto.TakeOverBoardDto;
import com.klid.webapp.main.sms.dto.SmsInfoDto;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author dongju
 *
 */
@Repository("smsMapper")
public interface SmsMapper {
	void insertSmsHist(Map<String, Object> paramMap);

	SmsInfoDto getSmsInfo(Map<String, Object> paramMap);
}
