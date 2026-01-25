/**
 * Program Name	: EngineerViewController.java
 *
 * Version		:  1.0
 *
 * Creation Date	: 2016. 2. 22.
 * 
 * Programmer Name 	: Song Young Wook
 *
 * Copyright 2014 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.engineer.controller;

import jakarta.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.klid.common.CommonController;
import com.klid.webapp.engineer.menuMgmt.service.MenuMgmtService;
import com.klid.webapp.engineer.popup.service.PopupService;

/**
 * @author ywsong
 *
 */
@RequestMapping("/engineer/popup")
@Controller("engineer.popupViewController")
public class PopupViewController extends CommonController {
	
	@Resource(name="popupService")
	private PopupService service;
	
	@RequestMapping("/pPageAdd") public void pPageAdd(Model model) {}
	@RequestMapping("/pPageGroupAdd") public void pPageGroupAdd(Model model) {}
	@RequestMapping("/pMenuAdd") public void pMenuAdd(Model model) {}
	
}
