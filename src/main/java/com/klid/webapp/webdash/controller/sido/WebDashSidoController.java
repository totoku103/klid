/**
 * Program Name : WebDashSidoController.java
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

package com.klid.webapp.webdash.controller.sido;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.webdash.sido.service.WebDashSidoService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.annotation.Resource;
import java.util.Map;

@RequestMapping("/api/webdash/sido/webDashSido")
@Controller
public class WebDashSidoController {

    @Resource(name = "webDashSidoService")
    private WebDashSidoService service;

    /**공지사항리스트 */
    @RequestMapping(value = "getNoticeList")
    public @ResponseBody ReturnData getNoticeList(@RequestParam Map<String, Object> reqMap) {
        return service.getNoticeList(new Criterion(reqMap, false));
    }

    /**보안리스트 */
    @RequestMapping(value = "getSecuList")
    public @ResponseBody ReturnData getSecuList(@RequestParam Map<String, Object> reqMap) {
        return service.getSecuList(new Criterion(reqMap, false));
    }

    /**수동차단*/
    @RequestMapping(value = "getRegionStatusManual")
    public @ResponseBody ReturnData getRegionStatusManual(@RequestParam Map<String, Object> reqMap) {
            return service.getRegionStatusManual(new Criterion(reqMap, false));
    }

    /**위변조*/
    @RequestMapping(value = "getForgeryCheck")
    public @ResponseBody ReturnData getForgeryCheck(@RequestParam Map<String, Object> reqMap) {
        return service.getForgeryCheck(new Criterion(reqMap, false));
    }

    /**헬스체크*/
    @RequestMapping(value = "getHcCheck")
    public @ResponseBody ReturnData getHcCheck(@RequestParam Map<String, Object> reqMap) {
        return service.getHcCheck(new Criterion(reqMap, false));
    }

    /**처리현황*/
    @RequestMapping(value = "getProcess")
    public @ResponseBody ReturnData getProcess(@RequestParam Map<String, Object> reqMap) {
        return service.getProcess(new Criterion(reqMap, false));
    }

    /**시도리스트*/
    @RequestMapping(value = "getSidoList")
    public @ResponseBody ReturnData getSidoList(@RequestParam Map<String, Object> reqMap) {
        return service.getSidoList(new Criterion(reqMap, false));
    }

}
