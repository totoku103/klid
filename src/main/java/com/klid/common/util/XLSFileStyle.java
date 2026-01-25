/**
 * Program Name	: XLSFileStyle.java
 *
 * Version		:  3.2.0
 *
 * Creation Date	: 2016. 2. 3.
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

import java.awt.Color;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFPalette;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.apache.poi.ss.usermodel.Workbook;

/**
 * @author jjung
 *
 */
public class XLSFileStyle {

	// CellStyle
	public final CellStyle titleStyle;

	public final CellStyle subTitleStyle;
	public final CellStyle subValueStyle;

	public final CellStyle headerStyle;
	public final CellStyle integerStyle;
	public final CellStyle longStyle;
	public final CellStyle doubleStyle;
	public final CellStyle stringStyle;
	public final CellStyle noBorderStyle;

	public final CellStyle blueTitleStyle;


	public final CellStyle levelStyle_1;
	public final CellStyle levelStyle_2;
	public final CellStyle levelStyle_3;
	public final CellStyle levelStyle_4;
	public final CellStyle levelStyle_5;

	public XLSFileStyle(Workbook workbook) {
		final Font titleFont = workbook.createFont();
		titleFont.setBold(true);
		titleFont.setFontHeightInPoints((short) 14);
		titleFont.setFontName("돋움");

		final Font subTitleFont = workbook.createFont();
		subTitleFont.setBold(true);
		subTitleFont.setFontHeightInPoints((short) 12);
		subTitleFont.setFontName("돋움");

		final Font normalFont = workbook.createFont();
		normalFont.setBold(false);
		subTitleFont.setFontHeightInPoints((short) 10);
		normalFont.setFontName("돋움");

		final Font boldFont = workbook.createFont();
		boldFont.setBold(true);
		subTitleFont.setFontHeightInPoints((short) 10);
		boldFont.setFontName("돋움");

		final Font whiteColorFont = workbook.createFont();
		whiteColorFont.setBold(true);
		whiteColorFont.setFontHeightInPoints((short) 11);
		whiteColorFont.setColor(HSSFColor.HSSFColorPredefined.WHITE.getIndex());
		whiteColorFont.setFontName("돋움");

		titleStyle = workbook.createCellStyle();
		titleStyle.setAlignment(HorizontalAlignment.CENTER);
		titleStyle.setFillForegroundColor(HSSFColor.HSSFColorPredefined.PALE_BLUE.getIndex());
		titleStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		titleStyle.setVerticalAlignment(VerticalAlignment.CENTER);
		titleStyle.setFont(titleFont);
		titleStyle.setBorderTop(BorderStyle.MEDIUM);
		titleStyle.setBorderBottom(BorderStyle.MEDIUM);

		subTitleStyle = workbook.createCellStyle();
		subTitleStyle.setAlignment(HorizontalAlignment.CENTER);
		subTitleStyle.setFillForegroundColor(HSSFColor.HSSFColorPredefined.PALE_BLUE.getIndex());
		subTitleStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		subTitleStyle.setVerticalAlignment(VerticalAlignment.CENTER);
		subTitleStyle.setFont(subTitleFont);
		subTitleStyle.setBorderLeft(BorderStyle.THIN);
		subTitleStyle.setBorderTop(BorderStyle.THIN);
		subTitleStyle.setBorderRight(BorderStyle.THIN);
		subTitleStyle.setBorderBottom(BorderStyle.THIN);

		subValueStyle = workbook.createCellStyle();
		subValueStyle.setAlignment(HorizontalAlignment.CENTER);
		subValueStyle.setVerticalAlignment(VerticalAlignment.CENTER);
		subValueStyle.setFont(subTitleFont);
		subValueStyle.setBorderLeft(BorderStyle.THIN);
		subValueStyle.setBorderTop(BorderStyle.THIN);
		subValueStyle.setBorderRight(BorderStyle.THIN);
		subValueStyle.setBorderBottom(BorderStyle.THIN);

		// header style
		headerStyle = workbook.createCellStyle();
		headerStyle.setAlignment(HorizontalAlignment.CENTER);
		headerStyle.setVerticalAlignment(VerticalAlignment.CENTER);
		headerStyle.setFillForegroundColor(HSSFColor.HSSFColorPredefined.GREY_25_PERCENT.getIndex());
		headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		headerStyle.setFont(boldFont);
		// header border
		headerStyle.setBorderLeft(BorderStyle.THIN);
		headerStyle.setBorderTop(BorderStyle.THIN);
		headerStyle.setBorderRight(BorderStyle.THIN);
		headerStyle.setBorderBottom(BorderStyle.THIN);

		// create styles for cell values
		integerStyle = workbook.createCellStyle();
		integerStyle.setDataFormat(HSSFDataFormat.getBuiltinFormat("0"));
		integerStyle.setVerticalAlignment(VerticalAlignment.CENTER);
		integerStyle.setBorderTop(BorderStyle.THIN);
		integerStyle.setBorderLeft(BorderStyle.THIN);
		integerStyle.setBorderRight(BorderStyle.THIN);
		integerStyle.setBorderBottom(BorderStyle.THIN);

		longStyle = workbook.createCellStyle();
		longStyle.setDataFormat(HSSFDataFormat.getBuiltinFormat("0"));
		longStyle.setVerticalAlignment(VerticalAlignment.CENTER);
		longStyle.setBorderTop(BorderStyle.THIN);
		longStyle.setBorderLeft(BorderStyle.THIN);
		longStyle.setBorderRight(BorderStyle.THIN);
		longStyle.setBorderBottom(BorderStyle.THIN);

		doubleStyle = workbook.createCellStyle();
		doubleStyle.setDataFormat(HSSFDataFormat.getBuiltinFormat("#,##0.00"));
		doubleStyle.setVerticalAlignment(VerticalAlignment.CENTER);
		doubleStyle.setBorderTop(BorderStyle.THIN);
		doubleStyle.setBorderLeft(BorderStyle.THIN);
		doubleStyle.setBorderRight(BorderStyle.THIN);
		doubleStyle.setBorderBottom(BorderStyle.THIN);

		stringStyle = workbook.createCellStyle();
		stringStyle.setVerticalAlignment(VerticalAlignment.CENTER);
		stringStyle.setBorderTop(BorderStyle.THIN);
		stringStyle.setBorderLeft(BorderStyle.THIN);
		stringStyle.setBorderRight(BorderStyle.THIN);
		stringStyle.setBorderBottom(BorderStyle.THIN);

		noBorderStyle = workbook.createCellStyle();
		noBorderStyle.setVerticalAlignment(VerticalAlignment.CENTER);
		noBorderStyle.setBorderTop(BorderStyle.NONE);
		noBorderStyle.setBorderLeft(BorderStyle.NONE);
		noBorderStyle.setBorderRight(BorderStyle.NONE);
		noBorderStyle.setBorderBottom(BorderStyle.NONE);

		blueTitleStyle = workbook.createCellStyle();
		blueTitleStyle.setAlignment(HorizontalAlignment.CENTER);
		blueTitleStyle.setFillForegroundColor(HSSFColor.HSSFColorPredefined.GREY_50_PERCENT.getIndex());
		blueTitleStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		blueTitleStyle.setVerticalAlignment(VerticalAlignment.CENTER);
		blueTitleStyle.setFont(whiteColorFont);
		blueTitleStyle.setFont(whiteColorFont);
		blueTitleStyle.setBorderLeft(BorderStyle.THIN);
		blueTitleStyle.setBorderTop(BorderStyle.THIN);
		blueTitleStyle.setBorderRight(BorderStyle.THIN);
		blueTitleStyle.setBorderBottom(BorderStyle.THIN);

		/**
		 *  ======================== Syslog Level Setting (START)========================
		 */
		// Level 1
		levelStyle_1 = workbook.createCellStyle();
		levelStyle_1.setVerticalAlignment(VerticalAlignment.CENTER);
		levelStyle_1.setBorderTop(BorderStyle.THIN);
		levelStyle_1.setBorderLeft(BorderStyle.THIN);
		levelStyle_1.setBorderRight(BorderStyle.THIN);
		levelStyle_1.setBorderBottom(BorderStyle.THIN);
		HSSFColor poiColor = null;
		HSSFPalette palette = ((HSSFWorkbook) workbook).getCustomPalette();
		int r=0,g=0,b=0;
		Color awtColor = Color.decode("#4EABE5");
		r = awtColor.getRed();
		g = awtColor.getGreen();
		b = awtColor.getBlue();
		poiColor = palette.findColor((byte) r, (byte) g, (byte) b);
		if (poiColor == null) {
			// 팔레트에 남은 index가 없어서 HSSFColor.TAN 인덱스에 색 덮어씌움.
			palette.setColorAtIndex(HSSFColor.HSSFColorPredefined.TAN.getIndex(), (byte)r, (byte)g, (byte)b);
			poiColor = palette.getColor(HSSFColor.HSSFColorPredefined.TAN.getIndex());
//			poiColor = palette.addColor((byte) r, (byte) g, (byte) b); // error:Could not find free color index
//			poiColor = palette.findSimilarColor(r, g, b); // 비슷한 색 찾아줌
		}
		levelStyle_1.setFillForegroundColor(poiColor.getIndex());
		levelStyle_1.setFillPattern(FillPatternType.SOLID_FOREGROUND);


		// Level 2
		levelStyle_2 = workbook.createCellStyle();
		levelStyle_2.setVerticalAlignment(VerticalAlignment.CENTER);
		levelStyle_2.setBorderTop(BorderStyle.THIN);
		levelStyle_2.setBorderLeft(BorderStyle.THIN);
		levelStyle_2.setBorderRight(BorderStyle.THIN);
		levelStyle_2.setBorderBottom(BorderStyle.THIN);
		HSSFColor poiColor_2 = null;
		HSSFPalette palette_2 = ((HSSFWorkbook) workbook).getCustomPalette();
		int r_2=0,g_2=0,b_2=0;
		Color awtColor_2 = Color.decode("#FFCF20");
		r_2 = awtColor_2.getRed();
		g_2 = awtColor_2.getGreen();
		b_2 = awtColor_2.getBlue();
		poiColor_2 = palette_2.findColor((byte) r_2, (byte) g_2, (byte) b_2);
		if (poiColor_2 == null) {
			poiColor_2 = palette_2.findSimilarColor(r_2, g_2, b_2);
		}
		levelStyle_2.setFillForegroundColor(poiColor_2.getIndex());
		levelStyle_2.setFillPattern(FillPatternType.SOLID_FOREGROUND);

		// Level 3
		levelStyle_3 = workbook.createCellStyle();
		levelStyle_3.setVerticalAlignment(VerticalAlignment.CENTER);
		levelStyle_3.setBorderTop(BorderStyle.THIN);
		levelStyle_3.setBorderLeft(BorderStyle.THIN);
		levelStyle_3.setBorderRight(BorderStyle.THIN);
		levelStyle_3.setBorderBottom(BorderStyle.THIN);
		HSSFColor poiColor_3 = null;
		HSSFPalette palette_3 = ((HSSFWorkbook) workbook).getCustomPalette();
		int r_3=0,g_3=0,b_3=0;
		Color awtColor_3 = Color.decode("#FF7420");
		r_3 = awtColor_3.getRed();
		g_3 = awtColor_3.getGreen();
		b_3 = awtColor_3.getBlue();
		poiColor_3 = palette.findColor((byte) r_3, (byte) g_3, (byte) b_3);
		if (poiColor_3 == null) {
			// 팔레트에 남은 index가 없어서 기존의 인덱스에 색 덮어씌움.
			palette_3.setColorAtIndex(HSSFColor.HSSFColorPredefined.TEAL.getIndex(), (byte)r_3, (byte) g_3, (byte) b_3);
			poiColor_3 = palette_3.getColor(HSSFColor.HSSFColorPredefined.TEAL.getIndex());
//			poiColor_3 = palette_3.findSimilarColor(r_3, g_3, b_3);
		}
		levelStyle_3.setFillForegroundColor(poiColor_3.getIndex());
		levelStyle_3.setFillPattern(FillPatternType.SOLID_FOREGROUND);

		// Level 4
		levelStyle_4 = workbook.createCellStyle();
		levelStyle_4.setVerticalAlignment(VerticalAlignment.CENTER);
		levelStyle_4.setBorderTop(BorderStyle.THIN);
		levelStyle_4.setBorderLeft(BorderStyle.THIN);
		levelStyle_4.setBorderRight(BorderStyle.THIN);
		levelStyle_4.setBorderBottom(BorderStyle.THIN);
		HSSFColor poiColor_4 = null;
		HSSFPalette palette_4 = ((HSSFWorkbook) workbook).getCustomPalette();
		int r_4=0,g_4=0,b_4=0;
		Color awtColor_4 = Color.decode("#EE1F74");
		r_4 = awtColor_4.getRed();
		g_4 = awtColor_4.getGreen();
		b_4 = awtColor_4.getBlue();
		poiColor_4 = palette_4.findColor((byte) r_4, (byte) g_4, (byte) b_4);
		if (poiColor_4 == null) {
			// 팔레트에 남은 index가 없어서 기존의 인덱스에 색 덮어씌움.
			palette_4.setColorAtIndex(HSSFColor.HSSFColorPredefined.TURQUOISE.getIndex(), (byte)r_4, (byte) g_4, (byte) b_4);
			poiColor_4 = palette_4.getColor(HSSFColor.HSSFColorPredefined.TURQUOISE.getIndex());
//			poiColor_4 = palette_4.findSimilarColor(r_4, g_4, b_4);
		}
		levelStyle_4.setFillForegroundColor(poiColor_4.getIndex());
		levelStyle_4.setFillPattern(FillPatternType.SOLID_FOREGROUND);

		// Level 5
		levelStyle_5 = workbook.createCellStyle();
		levelStyle_5.setVerticalAlignment(VerticalAlignment.CENTER);
		levelStyle_5.setBorderTop(BorderStyle.THIN);
		levelStyle_5.setBorderLeft(BorderStyle.THIN);
		levelStyle_5.setBorderRight(BorderStyle.THIN);
		levelStyle_5.setBorderBottom(BorderStyle.THIN);
		HSSFColor poiColor_5 = null;
		HSSFPalette palette_5 = ((HSSFWorkbook) workbook).getCustomPalette();
		int r_5=0,g_5=0,b_5=0;
		Color awtColor_5 = Color.decode("#E41909");
		r_5 = awtColor_5.getRed();
		g_5 = awtColor_5.getGreen();
		b_5 = awtColor_5.getBlue();
		poiColor_5 = palette_5.findColor((byte) r_5, (byte) g_5, (byte) b_5);
		if (poiColor_5 == null) {
			poiColor_5 = palette_5.findSimilarColor(r_5, g_5, b_5);
		}
		levelStyle_5.setFillForegroundColor(poiColor_5.getIndex());
		levelStyle_5.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		/**
		 *  ======================== Syslog Level Setting (END)========================
		 */
	}

}
