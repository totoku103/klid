/**
 * Program Name		: CrossScriptingFilter.java
 * Description		: XSS 방지 필터
 * Programmer Name 	: Bae Jung Yeo
 * Creation Date	: 2017. 4. 13.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.common;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.FilterConfig;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;

public class CrossScriptingFilter implements Filter {

 public FilterConfig filterConfig;
 
 public void init(FilterConfig filterConfig) throws ServletException { 
        this.filterConfig = filterConfig;    
 }    

 public void destroy() {
         this.filterConfig = null;     
 }    

 public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {        

  chain.doFilter(new RequestWrapper((HttpServletRequest) request), response);     
 } 
 
}



