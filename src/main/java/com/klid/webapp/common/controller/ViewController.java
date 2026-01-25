package com.klid.webapp.common.controller;

import com.klid.common.AppGlobal;
import com.klid.common.CommonController;
import com.klid.common.HttpRequestUtils;
import com.klid.webapp.common.SessionManager;
import com.klid.webapp.common.login.service.LoginServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class ViewController extends CommonController {

    private final Logger logger = LoggerFactory.getLogger(ViewController.class);

    @GetMapping(value = "/")
    public String root() {
        return "redirect:/login.do";
    }

    @GetMapping(value = "/test")
    @ResponseBody
    public String test() {
        return "Hello, Test!";
    }

    private void print(String userAgent) {
        logger.info("\n========== [User Info] ==========\n" +
                        " SessionId   : {}\n" +
                        " ClientIp    : {}\n" +
                        " UserAgent   : {}\n" +
                        "=======================================\n",
                SessionManager.getSession().getId(),
                HttpRequestUtils.getClientIp(),
                userAgent);
    }

    @GetMapping(value = "login.do")
    public ModelAndView login2(HttpSession session, HttpServletRequest request) {
        // 기존 사용자 정보만 제거 (세션 자체는 유지)
        session.removeAttribute("User");
        session.setAttribute(LoginServiceImpl.SESSION_ATTRIBUTE_LEGACY, false);

        final String loginLogoImg = "login_klid.png";
        final String loginLogoTitle = "Klid CI";
        final String copyright = "Hamonsoft";
        final String userAgent = request.getHeader("User-Agent");
        print(userAgent);

        return new ModelAndView("integration-login-black")
                .addObject("loginLogoImg", AppGlobal.getCtxPath() + "/img/login/" + loginLogoImg)
                .addObject("loginLogoTitle", loginLogoTitle)
                .addObject("copyright", copyright);
    }

    @RequestMapping(value = "engineer.do")
    public void engineer(Model model) {
        setBaseInfo(model);
    }

    @RequestMapping(value = "main/main.do")
    public void netisMain(Model model) {
        setBaseInfo(model);
    }

    @RequestMapping(value = "error.do")
    public void errorPage(Model model) {
        setBaseInfo(model);
    }


}
