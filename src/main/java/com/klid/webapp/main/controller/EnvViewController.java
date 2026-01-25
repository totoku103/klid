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

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.klid.common.CommonController;

/**
 * @author jung
 *
 */
@RequestMapping("/main/env")
@Controller
public class EnvViewController extends CommonController {
	// 사용자관리
	@RequestMapping("userConf.do") public void userConf(Model model) { setBaseInfo(model); }
    // 사용자관리 - 승인
    @RequestMapping("userManagement.do") public void userManagement(Model model) { setBaseInfo(model); }
    // 사용자 관리 요청 내역
    @RequestMapping("userManagementHistory.do") public void userManagementHistory(Model model) { setBaseInfo(model); }
	// 기관관리
	@RequestMapping("instMgmt.do") public void instMgmt(Model model) { setBaseInfo(model); }
	// 기관별IP대역관리
	@RequestMapping("instIPMgmt.do") public void instIPMgmt(Model model) { setBaseInfo(model); }
	// 국가별 IP대역관리
	@RequestMapping("nationIPMgmt.do") public void nationIPMgmt(Model model) { setBaseInfo(model); }

	//담당자연락처(사용자 연락처)
	@RequestMapping("userAddrList.do") public void userAddrList(Model model) { setBaseInfo(model); }
}
