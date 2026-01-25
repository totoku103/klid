/**
 * Program Name : CustUserMgmtController.java
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

package com.klid.webapp.main.controller.sys;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ErrorInfo;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.sys.custUserMgmt.service.CustUserMgmtService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Map;

@RequestMapping("/api/main/sys/custUserMgmt")
@Controller
public class CustUserMgmtController {

    @Resource(name = "custUserMgmtService")
    private CustUserMgmtService service;

    /** SMS 전송 팝업 사용자 목록 조회 */
    @PostMapping(value = "getSmsUserList")
    public @ResponseBody ReturnData getSmsUserList(@RequestParam Map<String, Object> reqMap) {
        return service.getSmsUserList(new Criterion(reqMap, false));
    }

    /** SMS 전송 팝업 외부 사용자 목록 조회 */
    @PostMapping(value = "getSmsOfUserList")
    public @ResponseBody ReturnData getSmsOfUserList(@RequestParam Map<String, Object> reqMap) {
        return service.getSmsOfUserList(new Criterion(reqMap, false));
    }

    /** 사용자 폰번호 조회 */
    @PostMapping(value = "getUserPhone")
    public @ResponseBody ReturnData getUserPhone(@RequestParam Map<String, Object> reqMap) {
        return service.selectUserPhone(new Criterion(reqMap, false));
    }

    @RequestMapping(value = "getSmsGroup")
    public @ResponseBody ReturnData getSmsGroup(@RequestParam Map<String, Object> reqMap) {
        return service.getSmsGroup(new Criterion(reqMap));
    }

    @RequestMapping(value="addSmsGroup" , method = RequestMethod.POST)
    public @ResponseBody ReturnData addSmsGroup(@RequestBody Map<String, Object> reqMap, HttpServletRequest request) {
        return service.addSmsGroup(new Criterion(reqMap));
    }

    @RequestMapping(value="editSmsGroup" , method = RequestMethod.POST)
    public @ResponseBody ReturnData editSmsGroup(@RequestBody Map<String, Object> reqMap, HttpServletRequest request) {
        return service.editSmsGroup(new Criterion(reqMap));
    }

    @RequestMapping(value="delSmsGroup" , method = RequestMethod.POST)
    public @ResponseBody ReturnData delSmsGroup(@RequestBody Map<String, Object> reqMap, HttpServletRequest request) {
        return service.delSmsGroup(new Criterion(reqMap));
    }

}
