package com.klid.webapp.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class PrivatePolicyPopupViewController {

    @RequestMapping({"/main/popup/compare-privacy-policy/{version}", "/main/popup/compare-privacy-policy/{version}.do"})
    public ModelAndView getComparePolicy(Model model, @PathVariable String version) {
        String cleanVersion = version.replace(".do", "");
        return new ModelAndView("main/popup/sys/pComparePolicy-" + cleanVersion);
    }

    @RequestMapping({"/main/popup/privacy-policy/{version}", "/main/popup/privacy-policy/{version}.do"})
    public ModelAndView getPrivatePolicy(Model model, @PathVariable String version) {
        String cleanVersion = version.replace(".do", "");
        return new ModelAndView("main/popup/sys/pPolicyInfo-" + cleanVersion);
    }
}
