/**
 * Program Name	: IXLSFileBuilder.java
 *
 * Version		:  3.0
 *
 * Creation Date	: 2015. 12. 20.
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

import java.io.File;
import java.io.IOException;
import java.io.OutputStream;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Sheet;
import org.jfree.chart.JFreeChart;

/**
 * @author jjung
 *
 */
public interface IXLSFileBuilder {

	public Sheet newSheet(String sheetName);
	
	public void setColWidth(int[] colWidthes);
	
	public void addHeader(String header);

	public void addHeader(String header, int width);
	
	public void addHeaders(String[] headers);
	
	public void addHeaders(String[][] headers);
	
	public void addMergedHeader(String header, int rowspan, int colspan);
	
	public void setDataValue(int col, String value);
	
	public void setDataValue(int col, Integer value);

	public void setDataValue(int col, Long value);

	public void setDataValue(int col, Double value);
	
	public void setDataValue(int col, Float value);
	
	public void setDataValue(int col, String value, CellStyle style);

	public void setDataValue(int col, Integer value, CellStyle style);
	
	public void nextRow();
	
	public Cell addSubTitle(int col, String title, CellStyle cellStyle);
	
	public void addCustomCell(int col, Object value, CellStyle cellStyle, int colspan);

	public void write(OutputStream os) throws IOException;
	
	public String save() throws Exception;
	
	public void save(String fileName) throws Exception;
	
	public void addJFreeChartToImg(JFreeChart chart);
	
	public void addImgFile(File imgFile);
	
	public void addImgFile(File imgFile, int width);


	
}
