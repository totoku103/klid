/**
 * Program Name : DashConfigController.java
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

package com.klid.webapp.main.controller.mois;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ErrorInfo;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.mois.dashConfig.service.DashConfigService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.annotation.Resource;
import java.util.Map;

@RequestMapping("/api/main/mois/dashConfig")
@Controller
public class DashConfigController {

    @Resource(name = "dashConfigService")
    private DashConfigService service;

    /**행안부 리스트 조회*/
    @RequestMapping(value = "getDashConfigList" )
    public @ResponseBody ReturnData getDashConfigList(@RequestParam Map<String, Object> reqMap) {
        return service.getDashConfigList(new Criterion(reqMap, false));
    }

    /** 행안부 대시보드 등록 */
    @PostMapping(value = "addDashConfig")
    public @ResponseBody ReturnData addDashConfig(@RequestParam Map<String, Object> reqMap) {
        return service.addDashConfig(new Criterion(reqMap, false));
    }

    /** 행안부 대시보드 수정 */
    @PostMapping(value = "editDashConfig")
    public @ResponseBody ReturnData editDashConfig(@RequestParam Map<String, Object> reqMap) {
            return service.editDashConfig(new Criterion(reqMap, false));
    }
}
