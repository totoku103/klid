package com.klid.webapp.common.controller;

import com.klid.common.HttpRequestUtils;
import com.klid.common.LoginString;
import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.common.SessionManager;
import com.klid.webapp.common.enums.ThirdPartySystemTypes;
import com.klid.webapp.common.login.service.LoginService;
import com.klid.webapp.common.properties.ThirdPartyProperty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/api/login")
public class LoginController {

    private final Logger logger = LoggerFactory.getLogger(LoginController.class);

    @Resource(name = "loginService")
    private LoginService service;

    @Autowired
    private ThirdPartyProperty thirdPartyProperty;

    @RequestMapping(value = "isUserAccountLocked", method = RequestMethod.POST)
    public @ResponseBody ReturnData isUserAccountLocked(@RequestBody Map<String, Object> reqMap, HttpServletRequest request) {
        return service.isUserAccountLocked(new Criterion(reqMap));
    }

    @RequestMapping(value = "getLogin")
    public @ResponseBody ReturnData getLogin(@RequestBody Map<String, Object> reqMap, HttpServletRequest request) {
        SessionManager.setLiteLoginInfo(reqMap.get("userId").toString(), HttpRequestUtils.getClientIp(), ThirdPartySystemTypes.CTRS);
        ReturnData returnData = new ReturnData();
        Map<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("data", service.getLogin(new Criterion(reqMap), request));
        returnData.setResultData(resultMap);
        return returnData;
    }

    /**
     * 로그아웃
     *
     * @param session
     * @return
     */
    @RequestMapping(value = "prcsLogout.do", method = RequestMethod.POST)
    public String prcsLogout(HttpSession session, HttpServletRequest request) {
        service.logout(SessionManager.getUser(), request);
        final String redirectResult = "redirect:" + thirdPartyProperty.getCtrsUrlHost() + LoginString.getPath();
        logger.info("prcsLogout:" + redirectResult);

        logger.info("session invalidate call");
        session.invalidate();

        return redirectResult;
    }

    @RequestMapping(value = "getOtpGenerate")
    public @ResponseBody ReturnData getOtpGenerate(@RequestBody Map<String, Object> reqMap, HttpServletRequest request) {
        ReturnData returnData = new ReturnData();
        Map<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("data", service.getOtpGenerate(new Criterion(reqMap), request));
        returnData.setResultData(resultMap);
        return returnData;
    }

    @RequestMapping(value = "getOtpCheck")
    public @ResponseBody ReturnData getOtpCheck(@RequestBody Map<String, Object> reqMap, HttpServletRequest request) {
        ReturnData returnData = new ReturnData();
        Map<String, Object> resultMap = new HashMap<String, Object>();
        resultMap.put("data", service.getOtpCheck(new Criterion(reqMap), request));
        returnData.setResultData(resultMap);
        return returnData;
    }

    @RequestMapping(value = "editOtpKey", method = RequestMethod.POST)
    public @ResponseBody ReturnData editUser(@RequestBody Map<String, Object> reqMap) {
        return service.editOtpKey(new Criterion(reqMap));
    }
}
