/**
 * Program Name : AuthInfoServiceImpl.java
 *
 * Version  :  3.0
 *
 * Creation Date : 2016. 2. 3.
 * 
 * Programmer Name  : jjung
 *
 * Copyright 2015 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE   : PROGRAMMER : REASON
 */

package com.klid.webapp.main.controller;
/**
 * @author imhojong
 *
 */
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.klid.common.CommonController;

@RequestMapping("/main/acc")
@Controller
public class AccidentViewController extends CommonController {
	
	//사고신고 및 처리현황 목록
	@RequestMapping("accidentApplyList.do") public void accidentApplyList(Model model){
		setBaseInfo(model);
	}
}
