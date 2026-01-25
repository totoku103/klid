/**
 * Program Name	: webDashViewController.java
 *
 * Version		:  1.0
 *
 * Creation Date	: 2015. 1. 27.
 * 
 * Programmer Name 	: Bae Jung Yeo
 *
 * Copyright 2014 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.webdash.controller;

import com.klid.common.CommonController;
import com.klid.webapp.common.SessionManager;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import jakarta.servlet.http.HttpServletRequest;

/**
 * @author jung
 *
 */
@RequestMapping("/webdash")
@Controller
public class WebDashViewController extends CommonController {
	@RequestMapping("{path}") public String dashView(Model model, @PathVariable("path") String path, HttpServletRequest request) {
       String dashLocal =  request.getParameter("dashLocal");
	    if(dashLocal == null){
            //dashLocal = "10";
            dashLocal = Integer.toString(SessionManager.getUser().getLocalCd());//20190412 시도대시보드 주소복사시 서울페이지가 나온다고 하여 수정
        }
        model.addAttribute("dashLocal",dashLocal);
		return "/webdash/"+path;
	}
}
