/**
 * Program Name	: CustomAuthenticationProvider.java
 *
 * Version		:  3.0
 *
 * Creation Date	: 2015. 12. 14.
 * 
 * Programmer Name 	: Bae Jung Yeo
 *
 * Copyright 2015 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.common.security;


import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.ArrayList;
import java.util.List;

/**
 * @author jjung
 *
 */
@Slf4j
public class CustomAuthenticationProvider implements AuthenticationProvider {
	@Override
	public Authentication authenticate(Authentication authentication)
			throws AuthenticationException {
		String userId = (String) authentication.getPrincipal();
		String userPw = (String) authentication.getCredentials();
		log.info("Welcome authenticate! " + userId + "/" + userPw);
		List<GrantedAuthority> roles = new ArrayList<GrantedAuthority>();
		roles.add(new SimpleGrantedAuthority("ROLE_USER"));
		UsernamePasswordAuthenticationToken result = new UsernamePasswordAuthenticationToken(userId, userPw);
		result.setDetails(new CustomUserDetails(userId, userPw));
		return result;
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}

}
