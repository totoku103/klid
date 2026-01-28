/**
 * Program Name	: MenuController.java
 * <p>
 * Version		:  1.0
 * <p>
 * Creation Date	: 2015. 1. 6.
 * <p>
 * Programmer Name 	: Bae Jung Yeo
 * <p>
 * Copyright 2014 Hamonsoft. All rights reserved.
 * ***************************************************************
 * P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.common.controller;


import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.common.menu.dto.SimpleMenuDTO;
import com.klid.webapp.common.menu.service.MenuService;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * @author jung
 */
@RequestMapping("/api/common/menu")
@Controller
@Slf4j
public class MenuController {
    @Resource(name = "menuService")
    private MenuService service;

    @RequestMapping(value = "getMenuTag", method = RequestMethod.POST)
    public @ResponseBody
    ReturnData getMenuTag() {
        return service.getSiteMenuList(new Criterion());
    }

    @GetMapping("getSimpleMenuList")
    public @ResponseBody
    ReturnData getSimpleMenuList(@RequestParam(value = "targetAuthGrpNo", required = false) Object targetAuthGrpNo) {
        Criterion criterion = new Criterion();
        if (targetAuthGrpNo != null) {
            criterion.addParam("targetAuthGrpNo", targetAuthGrpNo);
        }
        return service.getSimpleMenuList(criterion);
    }

    @PostMapping("getExcludeMenuList")
    public @ResponseBody
    List<SimpleMenuDTO> getExcludeMenuList(@RequestParam("authGrpNo") String authGrpNo) {
        return service.getExcludeMenuList(authGrpNo);
    }

    @PostMapping("saveExcludeMenuList")
    public @ResponseBody
    void saveExcludeMenuList(@RequestParam("authGrpNo") String authGrpNo, @RequestParam(value = "guids", required = false) String[] guids) {
        service.saveExcludeMenuList(authGrpNo, guids);
    }
}
