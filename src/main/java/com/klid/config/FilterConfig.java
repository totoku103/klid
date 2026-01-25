package com.klid.config;

import com.klid.webapp.common.CrossScriptingFilter;
import com.klid.webapp.common.SecurityFilter;
import com.klid.webapp.common.SessionAttributeLogger;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.boot.web.servlet.ServletListenerRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean<SecurityFilter> securityFilter() {
        FilterRegistrationBean<SecurityFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new SecurityFilter());
        registrationBean.addUrlPatterns("/*");
        registrationBean.setOrder(2);
        return registrationBean;
    }

    @Bean
    public FilterRegistrationBean<CrossScriptingFilter> crossScriptingFilter() {
        FilterRegistrationBean<CrossScriptingFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new CrossScriptingFilter());
        registrationBean.addUrlPatterns("/*");
        registrationBean.setOrder(3);
        return registrationBean;
    }

    @Bean
    public ServletListenerRegistrationBean<SessionAttributeLogger> sessionAttributeLogger() {
        return new ServletListenerRegistrationBean<>(new SessionAttributeLogger());
    }
}
