/**
 * Program Name	: MenuServiceImpl.java
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
package com.klid.webapp.common.menu.service;

import com.klid.common.AppGlobal;
import com.klid.common.SiteEnum;
import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.MsgService;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.common.menu.dto.*;
import com.klid.webapp.common.menu.helper.IMenuHelper;
import com.klid.webapp.common.menu.helper.NetisMenuHelper;
import com.klid.webapp.common.menu.persistence.MenuMapper;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import jakarta.annotation.Resource;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author jung
 */
@Service("menuService")
public class MenuServiceImpl extends MsgService implements MenuService {

    @Resource(name = "menuMapper")
    private MenuMapper mapper;

    private IMenuHelper menuHelper;

    private void setSiteMenuHelper() {
        if (AppGlobal.webSiteName.equals(SiteEnum.None.name())) {
            menuHelper = new NetisMenuHelper();
        } else {
            menuHelper = new NetisMenuHelper();
        }
    }

    @Override
    public ReturnData getSiteMenuList(Criterion criterion) {
        setSiteMenuHelper();
        ReturnData returnData = new ReturnData();
        StringBuilder sb = new StringBuilder();
        final String authGrpNo = (String) criterion.getValue("authGrpNo");
        final String auth = (String) criterion.getValue("auth");
        List<PageDto> list = mapper.selectHierarchicalMenuList(authGrpNo, auth);
        if (!CollectionUtils.isEmpty(list)) {
            for (PageDto dto : list) {
                sb.append(createPageMenu(dto));
            }
        }
        returnData.setResultData(sb.toString());
        return returnData;
    }

    @Override
    public ReturnData getSimpleMenuList(Criterion criterion) {
        return new ReturnData(mapper.selectSimpleMenuList(criterion.getCondition()));
    }

    @Override
    public List<SimpleMenuDTO> getExcludeMenuList(String authGrpNo) {
        return mapper.selectExcludeMenuList(authGrpNo);
    }


    /**
     * 대메뉴 태그 생성
     *
     * @param pageDto
     * @return
     */
    private String createPageMenu(PageDto pageDto) {
        StringBuilder sb = new StringBuilder();
        sb.append(String.format("<li class='level-1'><a href='#' class='%s'>%s</a>", pageDto.getWebIconClass(), pageDto.getPageName()));
        sb.append(createPageGrpMenu(pageDto.getChildren()));
        sb.append("</li>");
        return sb.toString();
    }

    /**
     * 중메뉴 태그 생성
     *
     * @param pglist
     * @return
     */
    private String createPageGrpMenu(List<PageGrpDto> pglist) {
        StringBuilder sb = new StringBuilder();
        if (!CollectionUtils.isEmpty(pglist)) {
            sb.append("<ul>");
            for (PageGrpDto dto : pglist) {
                sb.append(String.format("<li class='level-2'><a href='#'>%s</a>", dto.getPageGrpName()));
                sb.append(createMenu(dto.getChildren()));
                sb.append("</li>");
            }
            sb.append("</ul>");
        }
        return sb.toString();
    }

    /**
     * 소메뉴 태그 생성
     *
     * @param mnlist
     * @return
     */
    private String createMenu(List<MenuDto> mnlist) {
        StringBuilder sb = new StringBuilder();
        if (!CollectionUtils.isEmpty(mnlist)) {
            sb.append("<ul>");
            for (MenuDto dto : mnlist) {
                sb.append(String.format("<li class='level-3'><a href='%s'>", menuHelper.getUrlByGuid(dto.getGuid())));
                sb.append(dto.getMenuName());
                sb.append("</a></li>");
            }
            sb.append("</ul>");
        }
        return sb.toString();
    }

    /*
     * 정의된 메뉴 목록은 가져온다... (메뉴 추가용)
     */
    @Override
    public ReturnData getDefineMenuList(Criterion criterion) {
        setSiteMenuHelper();
        List<Map<String, Object>> returnData = new ArrayList<>();
        // 기본 메뉴 추가
        menuHelper.getMenuList().forEach((k, v) -> {
            Map<String, Object> item = new HashMap<>();
            item.put("guid", k);
            item.put("menuNm", v.getMenuNm());
            item.put("menuDesc", v.getMenuDesc().toString());
            item.put("menuAuth", "User");
            item.put("visibleOrder", 0);
            item.put("addYn", 0);
            item.put("isWebuse", 0);
            returnData.add(item);
        });

        // 레이아웃 메뉴 추가
        /*List<LayoutMenuDto> layoutMenuDtos = mapper.selectLayoutMenuList(criterion.getCondition());
        for (LayoutMenuDto layoutMenuDto : layoutMenuDtos) {
            Map<String, Object> layoutMenu = new HashMap<>();
            layoutMenu.put("guid", layoutMenuDto.getGuid());
            layoutMenu.put("menuNm", layoutMenuDto.getMenuName());
            layoutMenu.put("menuDesc", "Layout Menu");
            layoutMenu.put("menuAuth", "User");
            layoutMenu.put("visibleOrder", 0);
            layoutMenu.put("addYn", 0);
            layoutMenu.put("isWebuse", 0);
            returnData.add(layoutMenu);
        }*/
        return new ReturnData(returnData);
    }

    @Override
    public void saveExcludeMenuList(String authGrpNo, String[] guids) {
        mapper.deleteExcludeMenuList(authGrpNo);
        if (guids != null) {
            Map<String, Object> map = new HashMap<>();
            map.put("authGrpNo", authGrpNo);
            map.put("guids", guids);

            mapper.insertExcludemenuList(map);
        }
    }

}