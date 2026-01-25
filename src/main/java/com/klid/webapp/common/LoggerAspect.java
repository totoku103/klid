/**
 * Program Name	: LoggerAspect.java
 *
 * Version		:  3.2
 *
 * Creation Date	: 2016. 4. 1.
 * 
 * Programmer Name 	: jjung
 *
 * Copyright 2014 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.common;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;


import com.klid.webapp.common.menu.helper.IMenuHelper;
import com.klid.webapp.common.menu.helper.MenuVO;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import java.awt.*;
import java.util.Map;

/**
 * @author jjung
 *
 */
@Aspect
public class LoggerAspect {

	@Before("execution(* com.klid.webapp.main.controller.*ViewController.*(..))")
	public void beforeExecution(JoinPoint joinPoint) throws Throwable {
		String type = joinPoint.getSignature().getDeclaringTypeName();
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
		String reqUri = request.getRequestURI();
		String menu= (String)request.getSession().getAttribute("menu");

		if(menu != null){
			if(!menu.contains(reqUri)){
				String[] reqUriSplit = reqUri.split("/");
				String excUrl = reqUriSplit[reqUriSplit.length-1];
				if(excUrl.startsWith("p")){
                    if(excUrl.startsWith("prcsLogout"))
                        throw new InvalidPageException();
				}else{
					throw new InvalidPageException();
				}
			}
		}
	}

    @Before("execution(* com.klid.webapp.webdash.controller.*ViewController.*(..))")
    public void beforeDashExecution(JoinPoint joinPoint) throws Throwable {
        String type = joinPoint.getSignature().getDeclaringTypeName();
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
        String reqUri = request.getRequestURI();
        String menu= (String)request.getSession().getAttribute("menu");
        if(menu != null){
            String[] reqUriSplit2 = reqUri.split("/");
            if(reqUriSplit2.length > 2){
                if(menu.indexOf(reqUriSplit2[2]) < 0){
                    String[] reqUriSplit = reqUri.split("/");
                    String excUrl = reqUriSplit[reqUriSplit.length-1];
                    if(excUrl.startsWith("p")){

                    }else{
                        throw new InvalidPageException();
                    }
                }else{

                }
            }

        }
    }
}
