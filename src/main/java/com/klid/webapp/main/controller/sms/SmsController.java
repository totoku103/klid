/**
 * Program Name : TakeOverBoardController.java
 *
 * Version  :  3.0
 *
 * Creation Date : 2015. 12. 22.
 * 
 * Programmer Name  : kim dong ju
 *
 * Copyright 2015 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE   : PROGRAMMER : REASON
 */

package com.klid.webapp.main.controller.sms;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.sec.takeOverBoard.service.TakeOverBoardService;
import com.klid.webapp.main.sms.service.SmsService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import jakarta.annotation.Resource;
import java.util.Map;

/**
 * @author kdj
 *
 */
@RequestMapping("/api/main/sms")
@Controller
public class SmsController {

	@Resource(name = "smsService")
	private SmsService service;

	@RequestMapping(value = "addSmsMessage", method = RequestMethod.POST)
	public @ResponseBody ReturnData addSmsMessage(@RequestBody Map<String, Object> reqMap) {
		return service.addSmsMessage(new Criterion(reqMap, false));
	}

}
