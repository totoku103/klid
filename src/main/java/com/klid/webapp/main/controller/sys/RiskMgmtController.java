/**
 * Program Name : NoticeBoardController.java
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

import java.util.Map;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ErrorInfo;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.sys.riskMgmt.service.RiskMgmtService;

/**
 * @author imhojong
 *
 */
@RequestMapping("/api/main/sys")
@Controller
public class RiskMgmtController {
	
	@Resource(name = "riskMgmtService")
	private RiskMgmtService service;

    @RequestMapping(value="getRiskMgmt")
    public @ResponseBody ReturnData getRiskMgmt(@RequestParam Map<String, Object> reqMap) {
            return service.getRiskMgmt(new Criterion(reqMap));
    }

    @RequestMapping(value = "editRiskMgmt", method = RequestMethod.POST)
    public @ResponseBody ReturnData editAccidentApply(@RequestBody Map<String, Object> reqMap) {
        return service.editRiskMgmt(new Criterion(reqMap, false));
    }

    @RequestMapping(value="getRiskHistory")
    public @ResponseBody ReturnData getRiskHistory(@RequestParam Map<String, Object> reqMap) {
        return service.getRiskHistory(new Criterion(reqMap));
    }

    @RequestMapping(value="addRiskHistory" , method = RequestMethod.POST)
    public @ResponseBody ReturnData addRiskHistory(@RequestBody Map<String, Object> reqMap, HttpServletRequest request) {
            return service.addRiskHistory(new Criterion(reqMap, false), request);
    }

    @RequestMapping(value = "delRiskHistory", method = RequestMethod.POST)
    public @ResponseBody ReturnData delRiskHistory(@RequestBody Map<String, Object> reqMap) {
        return service.delRiskHistory(new Criterion(reqMap, false));
    }

    @RequestMapping(value="getThreatLevel")
    public @ResponseBody ReturnData getThreatLevel(@RequestParam Map<String, Object> reqMap) {
        return service.getThreatLevel(new Criterion(reqMap));
    }

    @RequestMapping(value="getThreatNow")
    public @ResponseBody ReturnData getThreatNow(@RequestParam Map<String, Object> reqMap) {
        return service.getThreatNow(new Criterion(reqMap));
    }

    @RequestMapping(value="getThreatHist")
    public @ResponseBody ReturnData getThreatHist(@RequestParam Map<String, Object> reqMap) {
        return service.getThreatHist(new Criterion(reqMap));
    }

    @RequestMapping(value = "editThreat", method = RequestMethod.POST)
    public @ResponseBody ReturnData editThreat(@RequestBody Map<String, Object> reqMap) {
            return service.editThreat(new Criterion(reqMap, false));
    }

    @RequestMapping(value="getPeriodNow")
    public @ResponseBody ReturnData getPeriodNow(@RequestParam Map<String, Object> reqMap) {
        return service.getPeriodNow(new Criterion(reqMap));
    }

    @RequestMapping(value = "editPeriod", method = RequestMethod.POST)
    public @ResponseBody ReturnData editPeriod(@RequestBody Map<String, Object> reqMap) {
        return service.editPeriod(new Criterion(reqMap, false));
    }
}
