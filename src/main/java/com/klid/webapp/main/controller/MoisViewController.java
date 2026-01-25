/**
 * Program Name	: NmsViewController.java
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
package com.klid.webapp.main.controller;

import com.klid.common.CommonController;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author jung
 *
 */
@RequestMapping("/main/mois")
@Controller
public class MoisViewController extends CommonController {
	//행안부 대시보드
	@RequestMapping("dashConfig.do") public void dashConfig(Model model) { setBaseInfo(model); }
	
}
