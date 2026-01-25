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
package com.klid.webapp.engineer.controller.popup;

import java.util.Map;

import jakarta.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.klid.common.AppGlobal;
import com.klid.common.CommonController;
import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ErrorInfo;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.common.menu.service.MenuService;
import com.klid.webapp.engineer.popup.service.PopupService;

/**
 * @author ywsong
 *
 */
@RequestMapping("/api/engineer/popup")
@Controller("engineer.popupController")
public class PopupController extends CommonController {
	
	@Resource(name="popupService")
	private PopupService service;
	
	@Resource(name = "menuService")
	private MenuService menuService;

	@RequestMapping(value="addPage" ,  method=RequestMethod.POST)
	public @ResponseBody ReturnData addPage(@RequestBody Map<String, Object> reqMap) {
		Criterion criterion = new Criterion(reqMap);
		criterion.addParam("siteName", AppGlobal.siteName);
		return service.addPage(criterion);
	}
	
	@RequestMapping(value="delPage" ,  method=RequestMethod.POST)
	public @ResponseBody ReturnData delPage(@RequestBody Map<String, Object> reqMap) {
		Criterion criterion = new Criterion(reqMap);
		criterion.addParam("siteName", AppGlobal.siteName);
		return service.delPage(criterion);
	}
	
	@RequestMapping(value="savePage", method=RequestMethod.POST)
	public @ResponseBody ReturnData savePage(@RequestBody Map<String, Object> reqMap) {
		Criterion criterion = new Criterion(reqMap);
		criterion.addParam("siteName", AppGlobal.siteName);
		return service.savePage(criterion);
	}
	
	
	
	@RequestMapping(value="addPageGroup" ,  method=RequestMethod.POST)
	public @ResponseBody ReturnData addPageGroup(@RequestBody Map<String, Object> reqMap) {
		try {
			Criterion criterion = new Criterion(reqMap);
			criterion.addParam("siteName", AppGlobal.siteName);
			
			return service.addPageGroup(criterion);
		} catch(Exception e) {
			e.printStackTrace();
			return new ReturnData(new ErrorInfo(e));
		}
	}
	
	@RequestMapping(value="delPageGroup" ,  method=RequestMethod.POST)
	public @ResponseBody ReturnData delPageGroup(@RequestBody Map<String, Object> reqMap) {
		Criterion criterion = new Criterion(reqMap);
		criterion.addParam("siteName", AppGlobal.siteName);
		return service.delPageGroup(criterion);
	}
	
	@RequestMapping(value="savePageGroup", method=RequestMethod.POST)
	public @ResponseBody ReturnData savePageGroup(@RequestBody Map<String, Object> reqMap) {
		Criterion criterion = new Criterion(reqMap);
		criterion.addParam("siteName", AppGlobal.siteName);
		return service.savePageGroup(criterion);
	}
	
	
	
	@RequestMapping(value="addMenu" ,  method=RequestMethod.POST)
	public @ResponseBody ReturnData addMenu(@RequestBody Map<String, Object> reqMap) {
		Criterion criterion = new Criterion(reqMap);
		criterion.addParam("siteName", AppGlobal.siteName);

		return service.addMenu(criterion);
	}
	
	@RequestMapping(value="delMenu" ,  method=RequestMethod.POST)
	public @ResponseBody ReturnData delMenu(@RequestBody Map<String, Object> reqMap) {

			Criterion criterion = new Criterion(reqMap);
			criterion.addParam("siteName", AppGlobal.siteName);
			return service.delMenu(criterion);
	}
	
	@RequestMapping(value="saveMenu", method=RequestMethod.POST)
	public @ResponseBody ReturnData saveMenu(@RequestBody Map<String, Object> reqMap) {
		Criterion criterion = new Criterion(reqMap);
		criterion.addParam("siteName", AppGlobal.siteName);
		return service.saveMenu(criterion);
	}
	
	@RequestMapping(value = "getDefineMenuList")
	public @ResponseBody ReturnData getDefineMenuList(@RequestParam Map<String, Object> reqMap) {
			return  menuService.getDefineMenuList(new Criterion(reqMap));
	}
	
}
