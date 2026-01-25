/**
 * Program Name	: SessionManager.java
 *
 * Version		:  1.0
 *
 * Creation Date	: 2015. 1. 27.
 * 
 * Programmer Name 	: Bae Jung Yeo
 *
 * Copyright 2014 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.common;

import com.klid.common.SEED_KISA256;
import com.klid.webapp.common.dto.UserDto;
import com.klid.webapp.common.enums.ThirdPartySystemTypes;
import com.klid.webapp.common.login.service.LoginServiceImpl;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import jakarta.servlet.http.HttpSession;
import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Pattern;

/**
 * @author jung
 *
 */
public class SessionManager {

    private final static Logger log = LoggerFactory.getLogger(SessionManager.class);
    public final static String LITE_LOGIN_INFO_KEY = "LITE_LOGIN_INFO_KEY";

    public static boolean getLegacyLogin() {
        final HttpSession session = getSession();
        final Object legacyAttr = session.getAttribute(LoginServiceImpl.SESSION_ATTRIBUTE_LEGACY);
        boolean hideDiv = false;

        log.info("Session Attribute: " + session.getId());
        if (legacyAttr == null || "true".equalsIgnoreCase(legacyAttr.toString())) {
            hideDiv = true;
        }
        return hideDiv;
    }

	/**
	 * set login UserDto
	 * @param userDto
	 */
	public static void setUser(UserDto userDto) {
		setUser(userDto, null);
	}
	public static void setUser(UserDto userDto, Object menuData) {
		ServletRequestAttributes reqAttr = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
		HttpSession session = reqAttr.getRequest().getSession();
		session.setAttribute("User", userDto);
		session.setAttribute("menu", menuData);

		Map<String, Object> tezMap = new HashMap<String, Object>();
		Map<String, Object> notMap = new HashMap<String, Object>();
		Map<String, Object> resMap = new HashMap<String, Object>();
		Map<String, Object> shaMap = new HashMap<String, Object>();
		Map<String, Object> qnaMap = new HashMap<String, Object>();

		tezMap.put("roleTbz01", userDto.getRoleTbz01());
		tezMap.put("roleTbz02", userDto.getRoleTbz02());
		tezMap.put("roleTbz03", userDto.getRoleTbz03());
		tezMap.put("roleTbz04", userDto.getRoleTbz04());
		tezMap.put("roleTbz05", userDto.getRoleTbz05());
		tezMap.put("roleTbz06", userDto.getRoleTbz06());

		notMap.put("roleNot01", userDto.getRoleNot01());
		notMap.put("roleNot02", userDto.getRoleNot02());
		notMap.put("roleNot03", userDto.getRoleNot03());
		notMap.put("roleNot04", userDto.getRoleNot04());
		//notMap.put("RoleNot05", userDto.getRoleNot05());
		//notMap.put("RoleNot06", userDto.getRoleNot06());

		resMap.put("roleRes01", userDto.getRoleRes01());
		resMap.put("roleRes02", userDto.getRoleRes02());
		resMap.put("roleRes03", userDto.getRoleRes03());
		resMap.put("roleRes04", userDto.getRoleRes04());
		//resMap.put("roleRes05", userDto.getRoleRes05());
		//resMap.put("roleRes06", userDto.getRoleRes06());

		shaMap.put("roleSha01", userDto.getRoleSha01());
		shaMap.put("roleSha02", userDto.getRoleSha02());
		shaMap.put("roleSha03", userDto.getRoleSha03());
		shaMap.put("roleSha04", userDto.getRoleSha04());
		//shaMap.put("roleSha05", userDto.getRoleSha05());
		//shaMap.put("roleSha06", userDto.getRoleSha06());

		qnaMap.put("roleQna01", userDto.getRoleQna01());
		qnaMap.put("roleQna02", userDto.getRoleQna02());
		qnaMap.put("roleQna03", userDto.getRoleQna03());
		qnaMap.put("roleQna04", userDto.getRoleQna04());
		//qnaMap.put("roleQna05", userDto.getRoleQna05());
		//qnaMap.put("roleQna06", userDto.getRoleQna06());

		session.setAttribute("authTbz", tezMap);
		session.setAttribute("authNot", notMap);
		session.setAttribute("authRes", resMap);
		session.setAttribute("authSha", shaMap);
		session.setAttribute("authQna", qnaMap);
	}
	
	/**
	 * get login UserDto
	 * @return
	 */
	public static UserDto getUser(){
		try {
			ServletRequestAttributes reqAttr = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
			HttpSession session = reqAttr.getRequest().getSession();
			return (UserDto) session.getAttribute("User");
		} catch (NullPointerException npe) {
			return null;
		} catch (IllegalStateException ise) {
			return null;
		} catch (Exception e) {
			return null;
		}
	}

    public static UserDto getIntegrateUser() {
        try {
            final ServletRequestAttributes sra = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
            final HttpSession session = sra.getRequest().getSession();
            final UserDto user = (UserDto) session.getAttribute("User");
            if (user == null) return null;

            final String un = user.getUserName();
            user.setUserName(un.trim());

            final String on = user.getOffcTelNo();
            if (!StringUtils.isBlank(on)) {
                final String s = on.replaceAll("\\D", "");
                user.setOffcTelNo(s);
            }

            final String pn = user.getMoblPhnNo();
            if (!StringUtils.isBlank(pn)) {
                final String decrypt = SEED_KISA256.Decrypt(pn);
                final String s = decrypt.replaceAll("\\D", "");
                user.setMoblPhnNo(s);
            }

            return user;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return null;
        }
    }
	
	public static HttpSession getSession() {
		ServletRequestAttributes reqAttr = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
		HttpSession session = reqAttr.getRequest().getSession();
		return session;
	}

    public static void setLiteLoginInfo(String userId, String clientIp, ThirdPartySystemTypes systemType) {
        final ServletRequestAttributes reqAttr = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
        final HttpSession session = reqAttr.getRequest().getSession();

        final LiteLoginInfo liteLoginInfo = new LiteLoginInfo();
        liteLoginInfo.setUserId(userId);
        liteLoginInfo.setClientIp(clientIp);
        liteLoginInfo.setSystemType(systemType);

        session.setAttribute(LITE_LOGIN_INFO_KEY, liteLoginInfo);
    }

    public static LiteLoginInfo getLiteLoginInfo() {
        final ServletRequestAttributes reqAttr = (ServletRequestAttributes)RequestContextHolder.getRequestAttributes();
        final HttpSession session = reqAttr.getRequest().getSession();
        return (LiteLoginInfo) session.getAttribute(LITE_LOGIN_INFO_KEY);
    }

    public static class LiteLoginInfo implements Serializable {
        private String userId;
        private String clientIp;
        private ThirdPartySystemTypes systemType;

        public String getUserId() {
            return userId;
        }

        public void setUserId(final String userId) {
            this.userId = userId;
        }

        public String getClientIp() {
            return clientIp;
        }

        public void setClientIp(final String clientIp) {
            this.clientIp = clientIp;
        }

        public ThirdPartySystemTypes getSystemType() {
            return systemType;
        }

        public void setSystemType(final ThirdPartySystemTypes systemType) {
            this.systemType = systemType;
        }

        @Override
        public String toString() {
            return "LiteLoginInfo{" +
                    "userId='" + userId + '\'' +
                    ", clientIp='" + clientIp .replaceAll("^(\\d{1,3})\\.\\d{1,3}\\.\\d{1,3}\\.(\\d{1,3})$", "$1.*.*.$2") + '\'' +
                    ", systemType=" + systemType +
                    '}';
        }
    }
		
}
