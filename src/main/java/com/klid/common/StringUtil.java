package com.klid.common;

/*******************************************************************************
* Made   : 2006. 7.18.
* Update : 2006.11.24 
* 				 2008. 5.28		change Bool to Boolean, 
*												set default endian to Big-Endian
* 				 2012. 6.7	BIZAID Customize	BY YU. 
* FILE   : SEED_test_KISA.java
*
* DESCRIPTION: Core routines for the enhanced SEED
* 
*******************************************************************************/

/********************************* S-box table ********************************/

public class StringUtil
{
	/**
	 * (length - str.length) 만큼 앞에 0을 추가한다.
	 * @param str
	 * @param length
	 * @return
	 */
	public static String addZero (String str, int length) {
		String temp = "";
		for (int i = str.length(); i < length; i++)
			temp += "0";
		temp += str;
		return temp;
	}

	public static boolean isEmpty(String str) {
		if(str == null || str.length() == 0) {
			return true;
		}else {
			return false;
		}
	}
}
