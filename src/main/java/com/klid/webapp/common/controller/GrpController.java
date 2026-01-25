/**
 * Program Name	: GrpController.java
 *
 * Version		:  1.0
 *
 * Creation Date	: 2015. 1. 23.
 * 
 * Programmer Name 	: Bae Jung Yeo
 *
 * Copyright 2014 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.common.controller;

import java.util.Map;

import jakarta.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ErrorInfo;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.common.grp.service.GrpService;

/**
 * @author jung
 *
 */
@RequestMapping("/api/common/grp")
@Controller
public class GrpController {

	@Resource(name = "grpService")
	private GrpService service;

	@RequestMapping(value = "getGrpDuplCnt", method = RequestMethod.POST)
	public @ResponseBody ReturnData getGrpDuplCnt(@RequestBody Map<String, Object> reqMap) {
		return service.getGrpDuplCnt(new Criterion(reqMap));
	}

	/*
	 * ====================================== 권한그룹 ======================================
	 */
	@RequestMapping(value = "getAuthConfDefaultGrpTreeListAll")
	public @ResponseBody ReturnData getAuthConfDefaultGrpTreeListAll(@RequestParam Map<String, Object> reqMap) {
		return service.getAuthConfDefaultGrpTreeListAll(new Criterion(reqMap));
	}

	@RequestMapping(value = "getAuthGrpList")
	public @ResponseBody ReturnData getAuthGrpList(@RequestParam Map<String, Object> reqMap) {
		return service.getAuthGrpList(new Criterion(reqMap));
	}

	@RequestMapping(value = "addAuthGrp", method = RequestMethod.POST)
	public @ResponseBody ReturnData addAuthGrp(@RequestBody Map<String, Object> reqMap) {
		return service.addAuthGrp(new Criterion(reqMap));
	}

	@RequestMapping(value = "saveAuthGrp", method = RequestMethod.POST)
	public @ResponseBody ReturnData saveAuthGrp(@RequestBody Map<String, Object> reqMap) {
			return service.saveAuthGrp(new Criterion(reqMap));
	}

	@RequestMapping(value = "delAuthGrp", method = RequestMethod.POST)
	public @ResponseBody ReturnData delAuthGrp(@RequestBody Map<String, Object> reqMap) {
		return service.delAuthGrp(new Criterion(reqMap));
	}

	/*
	 * ====================================== 기본그룹 ======================================
	 */
	@RequestMapping(value = "getDefaultGrpTreeListAll")
	public @ResponseBody ReturnData getDefaultGrpTreeListAll(@RequestParam Map<String, Object> reqMap) {
		return service.getDefaultGrpTreeListAll(new Criterion(reqMap));
	}

	@RequestMapping(value = "getDefaultGrpTreeList")
	public @ResponseBody ReturnData getDefaultGrpTreeList(@RequestParam Map<String, Object> reqMap) {
		return service.getDefaultGrpTreeList(new Criterion(reqMap));
	}

	@RequestMapping(value = "getVmSvrGrpTreeList")
	public @ResponseBody ReturnData getVmSvrGrpTreeList(@RequestParam Map<String, Object> reqMap) {
		return service.getVmSvrGrpTreeList(new Criterion(reqMap));
	}
	
	@RequestMapping(value = "getL4DefaultGrpTreeList")
	public @ResponseBody ReturnData getL4DefaultGrpTreeList(@RequestParam Map<String, Object> reqMap) {
		return service.getL4DefaultGrpTreeList(new Criterion(reqMap));
	}
	
	@RequestMapping(value = "getApDefaultGrpTreeList")
	public @ResponseBody ReturnData getApDefaultGrpTreeList(@RequestParam Map<String, Object> reqMap) {
			return service.getApDefaultGrpTreeList(new Criterion(reqMap));
	}

	@RequestMapping(value = "addDefaultGrp", method = RequestMethod.POST)
	public @ResponseBody ReturnData addDefaultGrp(@RequestBody Map<String, Object> reqMap) {
			return service.addDefaultGrp(new Criterion(reqMap));
	}

	@RequestMapping(value = "editDefaultGrp", method = RequestMethod.POST)
	public @ResponseBody ReturnData editDefaultGrp(@RequestBody Map<String, Object> reqMap) {
		return service.editDefaultGrp(new Criterion(reqMap));
	}

	@RequestMapping(value = "delDefaultGrp", method = RequestMethod.POST)
	public @ResponseBody ReturnData delDefaultGrp(@RequestBody Map<String, Object> reqMap) {
		return service.delDefaultGrp(new Criterion(reqMap));
	}

	/*
	 * ====================================== 조회그룹 ======================================
	 */
	@RequestMapping(value = "getSearchGrpTreeList")
	public @ResponseBody ReturnData getSearchGrpTreeList(@RequestParam Map<String, Object> reqMap) {
			return service.getSearchGrpTreeList(new Criterion(reqMap));
	}

	@RequestMapping(value = "addSearchGrp", method = RequestMethod.POST)
	public @ResponseBody ReturnData addSearchGrp(@RequestBody Map<String, Object> reqMap) {
		return service.addSearchGrp(new Criterion(reqMap));
	}

	@RequestMapping(value = "editSearchGrp", method = RequestMethod.POST)
	public @ResponseBody ReturnData editSearchGrp(@RequestBody Map<String, Object> reqMap) {
		return service.editSearchGrp(new Criterion(reqMap));
	}

	@RequestMapping(value = "delSearchGrp", method = RequestMethod.POST)
	public @ResponseBody ReturnData delSearchGrp(@RequestBody Map<String, Object> reqMap) {
			return service.delSearchGrp(new Criterion(reqMap));
	}

	/*
	 * ====================================== 회선그룹 ======================================
	 */
	@RequestMapping(value = "getIfGrpTreeList")
	public @ResponseBody ReturnData getIfGrpTreeList(@RequestParam Map<String, Object> reqMap) {
		return service.getIfGrpTreeList(new Criterion(reqMap));
	}

	@RequestMapping(value = "addIfGrp", method = RequestMethod.POST)
	public @ResponseBody ReturnData addIfGrp(@RequestBody Map<String, Object> reqMap) {
		return service.addIfGrp(new Criterion(reqMap));
	}

	@RequestMapping(value = "editIfGrp", method = RequestMethod.POST)
	public @ResponseBody ReturnData editIfGrp(@RequestBody Map<String, Object> reqMap) {
			return service.editIfGrp(new Criterion(reqMap));
	}

	@RequestMapping(value = "delIfGrp", method = RequestMethod.POST)
	public @ResponseBody ReturnData delIfGrp(@RequestBody Map<String, Object> reqMap) {
		return service.delIfGrp(new Criterion(reqMap));
	}

	/*
	 * ====================================== 서버그룹 ======================================
	 */
	@RequestMapping(value = "getServerGrpTreeList")
	public @ResponseBody ReturnData getServerGrpTreeList(@RequestParam Map<String, Object> reqMap) {
		return service.getServerGrpTreeList(new Criterion(reqMap));
	}

	@RequestMapping(value = "addSvrGrp", method = RequestMethod.POST)
	public @ResponseBody ReturnData addSvrGrp(@RequestBody Map<String, Object> reqMap) {
		return service.addSvrGrp(new Criterion(reqMap));
	}

	@RequestMapping(value = "editSvrGrp", method = RequestMethod.POST)
	public @ResponseBody ReturnData editSvrGrp(@RequestBody Map<String, Object> reqMap) {
		return service.editSvrGrp(new Criterion(reqMap));
	}

	@RequestMapping(value = "delSvrGrp", method = RequestMethod.POST)
	public @ResponseBody ReturnData delSvrGrp(@RequestBody Map<String, Object> reqMap) {
			return service.delSvrGrp(new Criterion(reqMap));
	}

	/*
	 * ====================================== 망그룹 ======================================
	 */
	@RequestMapping(value = "getMangGrpTreeList")
	public @ResponseBody ReturnData getMangGrpTreeList(@RequestParam Map<String, Object> reqMap) {
		return service.getMangGrpTreeList(new Criterion(reqMap));
	}

	@RequestMapping(value = "addMangGrp", method = RequestMethod.POST)
	public @ResponseBody ReturnData addMangGrp(@RequestBody Map<String, Object> reqMap) {
		return service.addMangGrp(new Criterion(reqMap));
	}

	@RequestMapping(value = "editMangGrp", method = RequestMethod.POST)
	public @ResponseBody ReturnData editMangGrp(@RequestBody Map<String, Object> reqMap) {
			return service.editMangGrp(new Criterion(reqMap));
	}

	@RequestMapping(value = "delMangGrp", method = RequestMethod.POST)
	public @ResponseBody ReturnData delMangGrp(@RequestBody Map<String, Object> reqMap) {
		return service.delMangGrp(new Criterion(reqMap));
	}

	/*
	 * ====================================== 망흐름그룹 ======================================
	 */
	@RequestMapping(value = "getMangFlowGrpTreeList")
	public @ResponseBody ReturnData getMangFlowGrpTreeList(@RequestParam Map<String, Object> reqMap) {
			return service.getMangFlowGrpTreeList(new Criterion(reqMap));
	}
	
	@RequestMapping(value = "addMangFlowGrp", method = RequestMethod.POST)
	public @ResponseBody ReturnData addMangFlowGrp(@RequestBody Map<String, Object> reqMap) {
			return service.addMangFlowGrp(new Criterion(reqMap));
	}

	@RequestMapping(value = "editMangFlowGrp", method = RequestMethod.POST)
	public @ResponseBody ReturnData editMangFlowGrp(@RequestBody Map<String, Object> reqMap) {
		return service.editMangFlowGrp(new Criterion(reqMap));
	}

	@RequestMapping(value = "delMangFlowGrp", method = RequestMethod.POST)
	public @ResponseBody ReturnData delMangFlowGrp(@RequestBody Map<String, Object> reqMap) {
		return service.delMangFlowGrp(new Criterion(reqMap));
	}
	
	/*
	 * ====================================== 서비스그룹 ======================================
	 */
	@RequestMapping(value = "getServiceGrpTreeList")
	public @ResponseBody ReturnData getServiceGrpTreeList(@RequestParam Map<String, Object> reqMap) {
		return service.getServiceGrpTreeList(new Criterion(reqMap));
	}
	
	@RequestMapping(value = "addServiceGrp", method = RequestMethod.POST)
	public @ResponseBody ReturnData addServiceGrp(@RequestBody Map<String, Object> reqMap) {
		return service.addServiceGrp(new Criterion(reqMap));
	}

	@RequestMapping(value = "editServiceGrp", method = RequestMethod.POST)
	public @ResponseBody ReturnData editServiceGrp(@RequestBody Map<String, Object> reqMap) {
		return service.editServiceGrp(new Criterion(reqMap));
	}

	@RequestMapping(value = "delServiceGrp", method = RequestMethod.POST)
	public @ResponseBody ReturnData delServiceGrp(@RequestBody Map<String, Object> reqMap) {
		return service.delServiceGrp(new Criterion(reqMap));
	}
	
	/*
	 * ====================================== 서비스포트그룹 ======================================
	 */
	@RequestMapping(value = "getSvcPortGrpList")
	public @ResponseBody ReturnData getSvcPortGrpList(@RequestParam Map<String, Object> reqMap) {
		return service.getSvcPortGrpList(new Criterion(reqMap));
	}
	
	@RequestMapping(value = "addSvcPortGrp", method = RequestMethod.POST)
	public @ResponseBody ReturnData addSvcPortGrp(@RequestBody Map<String, Object> reqMap) {
			return service.addSvcPortGrp(new Criterion(reqMap));
	}

	@RequestMapping(value = "editSvcPortGrp", method = RequestMethod.POST)
	public @ResponseBody ReturnData editSvcPortGrp(@RequestBody Map<String, Object> reqMap) {
			return service.editSvcPortGrp(new Criterion(reqMap));
	}

	@RequestMapping(value = "delSvcPortGrp", method = RequestMethod.POST)
	public @ResponseBody ReturnData delSvcPortGrp(@RequestBody Map<String, Object> reqMap) {
		return service.delSvcPortGrp(new Criterion(reqMap));
	}
	
	/*
	 * ====================================== App그룹 ======================================
	 */
	@RequestMapping(value = "getAppGrpTreeList")
	public @ResponseBody ReturnData getAppGrpTreeList(@RequestParam Map<String, Object> reqMap) {
		return service.getAppGrpTreeList(new Criterion(reqMap));
	}
	
	@RequestMapping(value = "addAppGrp", method = RequestMethod.POST)
	public @ResponseBody ReturnData addAppGrp(@RequestBody Map<String, Object> reqMap) {
			return service.addAppGrp(new Criterion(reqMap));
	}
	
	@RequestMapping(value = "delAppGrp")
	public @ResponseBody ReturnData delAppGrp(@RequestBody Map<String, Object> reqMap) {
		return service.delAppGrp(new Criterion(reqMap));
	}
	
	@RequestMapping(value = "editAppGrp")
	public @ResponseBody ReturnData editAppGrp(@RequestBody Map<String, Object> reqMap) {
		return service.editAppGrp(new Criterion(reqMap));
	}

	/*
	 * ====================================== As그룹 ======================================
	 */
	@RequestMapping(value = "getAsGrpTreeList")
	public @ResponseBody ReturnData getAsGrpTreeList(@RequestParam Map<String, Object> reqMap) {
		return service.getAsGrpTreeList(new Criterion(reqMap));
	}
	
	@RequestMapping(value = "addAsGrp", method = RequestMethod.POST)
	public @ResponseBody ReturnData addAsGrp(@RequestBody Map<String, Object> reqMap) {
		return service.addAsGrp(new Criterion(reqMap));
	}

	@RequestMapping(value = "editAsGrp", method = RequestMethod.POST)
	public @ResponseBody ReturnData editAsGrp(@RequestBody Map<String, Object> reqMap) {
			return service.editAsGrp(new Criterion(reqMap));
	}

	@RequestMapping(value = "delAsGrp", method = RequestMethod.POST)
	public @ResponseBody ReturnData delAsGrp(@RequestBody Map<String, Object> reqMap) {
		return service.delAsGrp(new Criterion(reqMap));
	}
	/*
	 * ====================================== 기관그룹 ======================================
	 */
	@RequestMapping(value = "getInstGrpTreeList")
	public @ResponseBody ReturnData getInstGrpTreeList(@RequestParam Map<String, Object> reqMap) {
		return service.getInstGrpTreeList(new Criterion(reqMap));
	}
}
