package com.klid.webapp.webdash.controller;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ErrorInfo;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.webdash.adminControl.service.AdminControlService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import jakarta.annotation.Resource;
import java.util.Calendar;
import java.util.Map;

@RequestMapping("/api/webdash/adminControl")
@Controller("webdash.adminControlController")
public class AdminControlController {

    @Resource(name = "webdash.adminControlService")
    private AdminControlService service;

    @RequestMapping(value = "getIncidentStatus")
    public @ResponseBody ReturnData getIncidentStatus(@RequestParam Map<String, Object> reqMap) {
        try {
            Criterion criterion = new Criterion(reqMap, false);

            Calendar cal = Calendar.getInstance();
            int hour = cal.get(Calendar.HOUR_OF_DAY);
            if (hour >= 0 && hour < 6) {
                criterion.addParam("atype", 0);
            } else criterion.addParam("atype", 1);

            return service.getIncidentStatus(criterion);
        } catch (Exception e) {
            e.printStackTrace();
            return new ReturnData(new ErrorInfo(e));
        }
    }

    @RequestMapping(value = "getInciCnt")
    public @ResponseBody ReturnData getInciCnt(@RequestParam Map<String, Object> reqMap) {
        try {
            Criterion criterion = new Criterion(reqMap, false);

            Calendar cal = Calendar.getInstance();
            int hour = cal.get(Calendar.HOUR_OF_DAY);
            if (hour >= 0 && hour < 6) {
                criterion.addParam("atype", 0);
            } else criterion.addParam("atype", 1);
            return service.getInciCnt(criterion);
        } catch (Exception e) {
            e.printStackTrace();
            return new ReturnData(new ErrorInfo(e));
        }
    }

    @RequestMapping(value = "getTbzledgeCnt")
    public @ResponseBody ReturnData getTbzledgeCnt(@RequestParam Map<String, Object> reqMap) {
        try {
            Criterion criterion = new Criterion(reqMap, false);

            Calendar cal = Calendar.getInstance();
            int hour = cal.get(Calendar.HOUR_OF_DAY);
            if (hour >= 0 && hour < 6) {
                criterion.addParam("atype", 0);
            } else criterion.addParam("atype", 1);
            return service.getTbzledgeCnt(criterion);
        } catch (Exception e) {
            e.printStackTrace();
            return new ReturnData(new ErrorInfo(e));
        }
    }

    @RequestMapping(value = "getLocalInciCnt")
    public @ResponseBody ReturnData getLocalInciCnt(@RequestParam Map<String, Object> reqMap) {
        try {
            Criterion criterion = new Criterion(reqMap, false);

            Calendar cal = Calendar.getInstance();
            int hour = cal.get(Calendar.HOUR_OF_DAY);
            if (hour >= 0 && hour < 6) {
                criterion.addParam("atype", 0);
            } else criterion.addParam("atype", 1);
            return service.getLocalInciCnt(criterion);
        } catch (Exception e) {
            e.printStackTrace();
            return new ReturnData(new ErrorInfo(e));
        }
    }

    @RequestMapping(value = "getLocalStatus")
    public @ResponseBody ReturnData getLocalStatus(@RequestParam Map<String, Object> reqMap) {
        try {
            return service.getLocalStatus(new Criterion(reqMap, false));
        } catch (Exception e) {
            e.printStackTrace();
            return new ReturnData(new ErrorInfo(e));
        }
    }

    @RequestMapping(value = "getUrlStatus")
    public @ResponseBody ReturnData getUrlStatus(@RequestParam Map<String, Object> reqMap) {
        try {
            return service.getUrlStatus(new Criterion(reqMap, false));
        } catch (Exception e) {
            e.printStackTrace();
            return new ReturnData(new ErrorInfo(e));
        }
    }

    @RequestMapping(value = "getSysErrorStatus")
    public @ResponseBody ReturnData getSysErrorStatus(@RequestParam Map<String, Object> reqMap) {
        try {
            return service.getSysErrorStatus(new Criterion(reqMap, false));
        } catch (Exception e) {
            e.printStackTrace();
            return new ReturnData(new ErrorInfo(e));
        }
    }

    @RequestMapping(value = "getInciTypeCnt")
    public @ResponseBody ReturnData getInciTypeCnt(@RequestParam Map<String, Object> reqMap) {
        try {
            Criterion criterion = new Criterion(reqMap, false);

            Calendar cal = Calendar.getInstance();
            int hour = cal.get(Calendar.HOUR_OF_DAY);
            if (hour >= 0 && hour < 6) {
                criterion.addParam("atype", 0);
            } else criterion.addParam("atype", 1);
            return service.getInciTypeCnt(criterion);
        } catch (Exception e) {
            e.printStackTrace();
            return new ReturnData(new ErrorInfo(e));
        }
    }

}
