package com.klid.webapp.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/main/logs/user-action-log")
public class UserActionLogViewController {

    @GetMapping("/summary.do")
    public ModelAndView getUserConnectLogConnectPage() {
        return new ModelAndView("/main/logs/userActionLogSummary");
    }

    @GetMapping("/daily.do")
    public ModelAndView getUserConnectLogDailyPage() { return new ModelAndView("/main/logs/userActionLogDaily"); }

    @GetMapping("/period.do")
    public ModelAndView getUserConnectLogPeriodPage() { return new ModelAndView("/main/logs/userActionLogPeriod"); }

    @GetMapping("/institution.do")
    public ModelAndView getUserConnectLogInstitutionPage() { return new ModelAndView("/main/logs/userActionLogInstitution"); }
}
