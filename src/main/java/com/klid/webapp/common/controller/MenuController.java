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
import com.klid.webapp.common.SessionManager;
import com.klid.webapp.common.dto.UserDto;
import com.klid.webapp.common.menu.dto.PageDto;
import com.klid.webapp.common.menu.dto.SimpleMenuDTO;
import com.klid.webapp.common.menu.service.MenuService;
import com.klid.webapp.common.service.PrimaryCtrsService;
import jakarta.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

/**
 * @author jung
 */
@RequestMapping("/api/common/menu")
@Controller
public class MenuController {

    private static final Logger log = LoggerFactory.getLogger(MenuController.class);
    @Resource(name = "menuService")
    private MenuService service;
    private final PrimaryCtrsService primaryCtrsService;

    public MenuController(final PrimaryCtrsService primaryCtrsService) {
        this.primaryCtrsService = primaryCtrsService;
    }

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

    @GetMapping
    public ResponseEntity<List<PageDto>> getMenu() throws PrimaryCtrsService.NotFoundDataByIdException {
        final UserDto user = SessionManager.getUser();
        final String id = Objects.requireNonNull(user).getUserId();
        log.info("get menu id: {}", id);

        final UserDto sessionUser = primaryCtrsService.getUserInfoByOnlyId(id);
        final List<PageDto> simpleUserMenu = primaryCtrsService.getSimpleUserMenu(sessionUser);
        return ResponseEntity.ok(simpleUserMenu);
    }
}
