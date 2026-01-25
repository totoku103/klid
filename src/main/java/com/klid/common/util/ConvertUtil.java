/**
 * Program Name	: ConvertUtil.java
 *
 * Version		:  3.0
 *
 * Creation Date	: 2015. 12. 24.
 * 
 * Programmer Name 	: Bae Jung Yeo
 *
 * Copyright 2015 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.common.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.nio.ByteBuffer;

/**
 * @author jjung
 *
 */
public class ConvertUtil {

    private final Logger logger = LoggerFactory.getLogger(ConvertUtil.class);

	String[] sizeUnits = { "B", "K", "M", "G", "T", "P" };
	
	/**
	 * Unit1000
	 * @param value
	 * @return
	 */
	public String unit1000(double value) {
		int idx = 0;
		for(idx = 0; idx < sizeUnits.length; idx++) {
			if(value < 1000) break;
			value = value / 1000;
		}
		return (value == 0? Math.round(value) : String.format("%.2f", value)) + " " + sizeUnits[idx];
	}

	/**
	 * Unit1024
	 * @param value
	 * @return
	 */
	public String unit1024(double value) {
		int idx = 0;
		for(idx = 0; idx < sizeUnits.length; idx++) {
			if(value < 1024) break;
			value = value / 1024;
		}
		return (value == 0? Math.round(value) : String.format("%.2f", value)) + " " + sizeUnits[idx];
	}
	
	public String ctime(double value) {
		StringBuffer sb = new StringBuffer();
		double year = 0, day = 0, hour = 0, min = 0, sec = 0;
		if((365 * 24 * 60 * 60) <= value) {
			year = Math.floor(value / (365 * 24 * 60 * 60));
			value = value - (365 * 24 * 60 * 60 * year);
			sb.append(String.format("%s년 ", new Double(year).intValue()));
		}
		if((24 * 60 * 60) <= value) {
			day = Math.floor(value / (24 * 60 * 60));
			value = value - (24 * 60 * 60 * day);
			sb.append(String.format("%s일 ", new Double(day).intValue()));
		}
		if((60 * 60) <= value) {
			hour = Math.floor(value / (60 * 60));
			value = value - (60 * 60 * hour);
			sb.append(String.format("%s시 ", new Double(hour).intValue()));
		}
		if(60 <= value) {
			min = Math.floor(value / 60);
			value = value - (60 * min);
			sb.append(String.format("%s분 ", new Double(min).intValue()));
		}
		if(value > 0) {
			sec = Math.floor(value);
			sb.append(String.format("%s초", new Double(sec).intValue()));
		}
		else {
			sb.append("0초");
		}
		return sb.toString();
	}
	
	public String evtLevel(Object value) {
		String result = "";
		switch(value.toString()) {
		case "0": result = "정상"; break;
		case "1": result = "정보"; break;
		case "2": result = "주의"; break;
		case "3": result = "알람"; break;
		case "4": result = "경보"; break;
		case "5": result = "장애"; break;
		}
		return result;
	}
	
	public Long castLongObject(Object object) {
		Long result = 0l;
		if(object == null) result = 0l;
		else if(object instanceof Integer) result = ((Integer) object).longValue();
		else if(object instanceof Long) result = ((Long) object).longValue();
		else if(object instanceof Double) result = ((Double) object).longValue();
		else if(object instanceof String) result = Long.valueOf(((String) object));

		return result;
	}
	
	public Integer castIntegerObject(Object object) {
		Integer result = 0;
		if(object == null) result = 0;
		else if(object instanceof Integer) result = ((Integer) object).intValue();
		else if(object instanceof Long) result = ((Long) object).intValue();
		else if(object instanceof Double) result = ((Double) object).intValue();
		else if(object instanceof String) result = Integer.valueOf(((String) object));

		return result;
	}

	public String flowKindCd(Object value) {
		String result = "";
		switch(value.toString()) {
			case "5": result = "netflow5"; break;
			case "9": result = "netflow9"; break;
			case "S": result = "sflow"; break;
		}
		return result;
	}
	
	public static String longToIPv4(long l) {
        String s = null;
        ByteBuffer bytebuffer = null;

        int i = (int)(0L | l);
        bytebuffer = ByteBuffer.allocate(4);
        bytebuffer.putInt(i);
        byte abyte0[] = bytebuffer.array();
        try {
            s = InetAddress.getByAddress(abyte0).getHostAddress();
        } catch(UnknownHostException unknownHostException) {
            bytebuffer.clear();
            return null;
        }
        bytebuffer.clear();
        return s;
    }

    public static long ipv4ToLong(String ip) {
        ByteBuffer buf = ByteBuffer.allocate(8);
        long ipLong = 0;

        try {
            byte addr[] = InetAddress.getByName(ip).getAddress();
            buf.put(4, (byte)(0xff&addr[0]));
            buf.put(5, (byte)(0xff&addr[1]));
            buf.put(6, (byte)(0xff&addr[2]));
            buf.put(7, (byte)(0xff&addr[3]));
            ipLong = buf.asLongBuffer().get();
            return ipLong;
        }catch (IllegalArgumentException e){
        	e.printStackTrace();
		}catch (UnknownHostException e){
			e.printStackTrace();
		}catch(Exception e){
			e.printStackTrace();
		}
        return ipLong;
    }
}
