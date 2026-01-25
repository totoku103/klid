/**
 * Program Name : WebDashMoisController.java
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

package com.klid.webapp.webdash.controller.mois;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.webdash.mois.service.WebDashMoisService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.annotation.Resource;
import java.util.Map;

@RequestMapping("/api/webdash/mois/webDashMois")
@Controller
public class WebDashMoisController {

    @Resource(name = "webDashMoisService")
    private WebDashMoisService service;

    /**행안부 사이버 위기경보 */
    @RequestMapping(value = "getThreatNow")
    public @ResponseBody ReturnData getThreatNow(@RequestParam Map<String, Object> reqMap) {
        return service.getThreatNow(new Criterion(reqMap, false));
    }

    /**홈페이지 모니터링 (중앙행정기관)  */
    @RequestMapping(value = "getHmHcUrlCenter")
    public @ResponseBody ReturnData getHmHcUrlCenter(@RequestParam Map<String, Object> reqMap) {
        return service.getHmHcUrlCenter(new Criterion(reqMap, false));
    }

    /**홈페이지 모니터링 (지방자치단체)  */
    @RequestMapping(value = "getHmHcUrlRegion")
    public @ResponseBody ReturnData getHmHcUrlRegion(@RequestParam Map<String, Object> reqMap) {
        return service.getHmHcUrlRegion(new Criterion(reqMap, false));
    }

    /**홈페이지 위변조 (지방자치단체)  */
    @RequestMapping(value = "getForgeryRegion")
    public @ResponseBody ReturnData getForgeryRegion(@RequestParam Map<String, Object> reqMap) {
        return service.getForgeryRegion(new Criterion(reqMap, false));
    }

    /**지방자치단체 사이버위협 대응현황 (지도표시)*/
    @RequestMapping(value = "getRegionStatus")
    public @ResponseBody ReturnData getRegionStatus(@RequestParam Map<String, Object> reqMap) {
            return service.getRegionStatus(new Criterion(reqMap, false));
    }


    /**지방자치단체 사이버위협 대응현황 (자동차단)*/
    @RequestMapping(value = "getRegionStatusAuto")
    public @ResponseBody ReturnData getRegionStatusAuto(@RequestParam Map<String, Object> reqMap) {
            return service.getRegionStatusAuto(new Criterion(reqMap, false));
    }

    /**지방자치단체 사이버위협 대응현황 (수동차단)*/
    @RequestMapping(value = "getRegionStatusManual")
    public @ResponseBody ReturnData getRegionStatusManual(@RequestParam Map<String, Object> reqMap) {
        return service.getRegionStatusManual(new Criterion(reqMap, false));
    }

    /**행안부 리스트 조회*/
    @RequestMapping(value = "getDashConfigList" )
    public @ResponseBody ReturnData getDashConfigList(@RequestParam Map<String, Object> reqMap) {
        return service.getDashConfigList(new Criterion(reqMap, false));
    }

    /**행안부 중앙,지방 차트 합계 */
    @RequestMapping(value = "getDashChartSum")
    public @ResponseBody ReturnData getDashChartSum(@RequestParam Map<String, Object> reqMap) {
        return service.getDashChartSum(new Criterion(reqMap, false));
    }
}
