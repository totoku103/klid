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

@RequestMapping("/main/sys")
@Controller
public class CodeMgmtViewController extends CommonController {
	
	//코드관리 목록
	@RequestMapping("codeMgmtList.do") public void codeMgmtList(Model model){
		setBaseInfo(model);
	}

	//공휴일관리 목록
	@RequestMapping("weekMgmt.do") public void weekMgmt(Model model){
		setBaseInfo(model);
	}

	//게시판관리 목록
	@RequestMapping("boardMgmt.do") public void boardMgmt(Model model){
		setBaseInfo(model);
	}

	//외부사용자관리 목록
	@RequestMapping("custUserMgmt.do") public void custUserMgmt(Model model){
		setBaseInfo(model);
	}
}
