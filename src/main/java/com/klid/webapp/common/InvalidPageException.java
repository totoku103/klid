/**
 * Program Name : CustomException.java
 *
 * Version  :  1.0
 *
 * Creation Date : 2014. 12. 22.
 * 
 * Programmer Name  : Kim Su Hong
 *
 * Copyright 2014 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE   : PROGRAMMER : REASON
 */

package com.klid.webapp.common;

/**
 * 사용자 정의 Exception
 * @author jung
 *
 */
@SuppressWarnings("serial")
public class InvalidPageException extends RuntimeException {

	/**
	 * Constructor
	 */
	public InvalidPageException() {
		super();
	}

	/**
	 * Constructor
	 * @param throwable	exception object
	 */
	public InvalidPageException(Throwable throwable) {
		super(throwable);
	}

}
