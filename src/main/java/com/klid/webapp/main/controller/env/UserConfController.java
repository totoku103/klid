/**
 * Program Name : InstIPMgmtController.java
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

package com.klid.webapp.main.controller.env;

import java.util.Map;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ErrorInfo;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.env.userConf.service.UserConfService;

/**
 * @author kdj
 *
 */
@RequestMapping("/api/main/env/userConf")
@Controller
public class UserConfController {

	@Resource(name = "userConfService")
	private UserConfService service;

	/** 사용자연락처 목록 */
	@RequestMapping(value = "getUserAddrList")
	public @ResponseBody ReturnData getUserAddrList(@RequestParam Map<String, Object> reqMap) {
			return service.getUserAddrList(new Criterion(reqMap));
	}

	/** 사용자 목록 */
	@RequestMapping(value = "getUserConfList")
	public @ResponseBody ReturnData getUserConfList(@RequestParam Map<String, Object> reqMap) {
			return service.getUserConfList(new Criterion(reqMap));
	}

	/** 사용자 추가 */
	@RequestMapping(value = "addUser", method = RequestMethod.POST)
	public@ResponseBody  ReturnData addUser(@RequestBody Map<String, Object> reqMap) {
			return service.addUser(new Criterion(reqMap));
	}

	/** 사용자 수정 */
	@RequestMapping(value = "editUser", method = RequestMethod.POST)
	public@ResponseBody  ReturnData editUser(@RequestBody Map<String, Object> reqMap) {
			return service.editUser(new Criterion(reqMap));
	}

	/** 사용자 직접 수정 */
	@RequestMapping(value = "editSelfUser", method = RequestMethod.POST)
	public@ResponseBody  ReturnData editSelfUser(@RequestBody Map<String, Object> reqMap) {
			return service.editSelfUser(new Criterion(reqMap));
	}
	
	/** 사용자 패스워드 수정 */
	@RequestMapping(value = "editUserPassword", method = RequestMethod.POST)
	public@ResponseBody  ReturnData editUserPassword(@RequestBody Map<String, Object> reqMap) {
		return service.editUserPassword(new Criterion(reqMap));
	}
	
	/** 사용자 ID 중복확인 */
	@RequestMapping(value = "getUserIdDuplicateCnt")
	public@ResponseBody  ReturnData getUserIdDuplicateCnt(@RequestParam Map<String, Object> reqMap) {
			return service.getUserIdDuplicateCnt(new Criterion(reqMap));
	}

	/** 사용자 상세정보 */
	@RequestMapping(value = "getDetailUser")
	public @ResponseBody ReturnData getDetailUser(@RequestParam Map<String, Object> reqMap) {
		if(reqMap.containsKey("userId")) {
			reqMap.remove("userId");
		}
			return service.getDetailUser(new Criterion(reqMap));
	}

	/** 권한 콤보 목록 리스트 */
	@RequestMapping(value="getAuthList")
	public @ResponseBody ReturnData getAuthList(@RequestParam Map<String, Object> reqMap) {
			return service.getAuthList(new Criterion(reqMap));
	}

	/** 사용자 비밀번호 초기화 */
	@RequestMapping(value = "userPassReset", method = RequestMethod.POST)
	public@ResponseBody  ReturnData userPassReset(@RequestBody Map<String, Object> reqMap) {
			return service.userPassReset(new Criterion(reqMap));
	}

	/** 사용자 계정 잠김 해제 */
	@RequestMapping(value = "userLockReset", method = RequestMethod.POST)
	public@ResponseBody  ReturnData userLockReset(@RequestBody Map<String, Object> reqMap) {
		return service.userLockReset(new Criterion(reqMap));
	}

	/** 이전 비밀번호 확인 */
	@RequestMapping(value = "expire/passwordCheck", method = RequestMethod.POST)
	public @ResponseBody ReturnData passwordCheck(@RequestBody Map<String, Object> reqMap) {
			return service.passwordCheck(new Criterion(reqMap));
	}

	/** 비밀번호 만료에 따른 수정 */
	@RequestMapping(value = "expire/editUserPassword", method = RequestMethod.POST)
	public @ResponseBody ReturnData editUserExpirePassword(@RequestBody Map<String, Object> reqMap) {
		return service.editUserPassword(new Criterion(reqMap));
	}

	@RequestMapping(value = "delUser", method = RequestMethod.POST)
	public @ResponseBody ReturnData delUser(@RequestBody Map<String, Object> reqMap) {
			return service.delUser(new Criterion(reqMap, false));
	}

	/** 푸시알림사용자 목록 */
	@RequestMapping(value = "getPushUsers")
	public @ResponseBody ReturnData getPushUsers(@RequestParam Map<String, Object> reqMap) {
		return service.getPushUsers(new Criterion(reqMap));
	}

	/** 사용자 전체 비밀번호 초기화 */
	@RequestMapping(value = "getAllUserPassReset", method = RequestMethod.POST)
	public @ResponseBody int getAllUserPassReset(@RequestBody Map<String, Object> reqMap) {
		return service.getAllUserPassReset(new Criterion(reqMap));
	}

	@RequestMapping(value = "checkMyId")
	public@ResponseBody ReturnData checkMyId(@RequestParam Map<String, Object> reqMap) {
		return service.checkMyId(new Criterion(reqMap));
	}

	@RequestMapping(value = "getUserInfo", method = RequestMethod.POST)
	public@ResponseBody  ReturnData getUserInfo(@RequestBody Map<String, Object> reqMap) {
		return service.getDetailUser(new Criterion(reqMap));
	}

	@RequestMapping(value = "checkUserAuth")
	public@ResponseBody ReturnData checkUserAuth(@RequestParam Map<String, Object> reqMap) {
		return service.checkUserAuth(new Criterion(reqMap));
	}
}
