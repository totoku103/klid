/**
 * Program Name	: MenuMgmtController.java
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
package com.klid.webapp.engineer.controller.env;

import com.klid.common.AppGlobal;
import com.klid.common.CommonController;
import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ErrorInfo;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.engineer.menuMgmt.service.MenuMgmtService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.annotation.Resource;
import java.util.Map;

/**
 * @author ywsong
 *
 */
@RequestMapping("/api/engineer/menuMgmt")
@Controller("engineer.menuMgmtController")
public class MenuMgmtController extends CommonController {
	
	@Resource(name="menuMgmtService")
	private MenuMgmtService service;

	
	@RequestMapping(value="getPageList")
	public @ResponseBody ReturnData getPageList(@RequestParam Map<String, Object> reqMap) {
		Criterion criterion = new Criterion(reqMap);
		criterion.addParam("siteName", AppGlobal.webSiteName);
			
		return service.getPageList(criterion);
	}
	
	@RequestMapping(value="getPageGroupList")
	public @ResponseBody ReturnData getPageGroupList(@RequestParam Map<String, Object> reqMap) {
		Criterion criterion = new Criterion(reqMap);
		criterion.addParam("siteName", AppGlobal.webSiteName);

		return service.getPageGroupList(criterion);
	}
	
	@RequestMapping(value="getMenuList")
	public @ResponseBody ReturnData getMenuList(@RequestParam Map<String, Object> reqMap) {
		Criterion criterion = new Criterion(reqMap);
		criterion.addParam("siteName", AppGlobal.webSiteName);

		return service.getMenuList(criterion);
	}
	
	
}
