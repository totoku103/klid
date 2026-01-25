/**
 * Program Name	: MenuService.java
 * <p>
 * Version		:  1.0
 * <p>
 * Creation Date	: 2015. 3. 2.
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

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.common.menu.dto.SimpleMenuDTO;

import java.util.List;

/**
 * @author jung
 */
public interface MenuService {

    ReturnData getSiteMenuList(Criterion criterion);

    ReturnData getSimpleMenuList(Criterion criterion);

    List<SimpleMenuDTO> getExcludeMenuList(String authGrpNo);

    ReturnData getDefineMenuList(Criterion criterion);

    void saveExcludeMenuList(String authGrpNo, String[] guids);
}
