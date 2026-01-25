/**
 * Program Name	: XLSFileBuilder.java
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

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Date;

import javax.imageio.ImageIO;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFClientAnchor;
import org.apache.poi.hssf.usermodel.HSSFDataFormat;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFPatriarch;
import org.apache.poi.hssf.usermodel.HSSFPicture;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.ClientAnchor;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.CellRangeAddress;
import org.jfree.chart.ChartUtils;
import org.jfree.chart.JFreeChart;

import com.klid.common.AppGlobal;

/**
 * @author jjung
 *
 */
public class XLSFileBuilder implements IXLSFileBuilder {

	private Logger logger = LoggerFactory.getLogger(getClass());

	protected final Workbook workbook = new HSSFWorkbook();
	protected Sheet sheet;

	public XLSFileStyle styleHelper;

	// CellStyle
	protected final CellStyle headerStyle;
	protected final CellStyle integerStyle;
	protected final CellStyle longStyle;
	protected final CellStyle doubleStyle;
	protected final CellStyle stringStyle;

	public final CellStyle subTitleStyle;
	public final CellStyle subValueStyle;

	public final CellStyle ralignValueStyle;
	public final CellStyle centerValueStyle;
	
	protected int curRow = 0;
	protected int curCol = 0;

	/**
	 * drawingPatriach
	 */
	@SuppressWarnings("unused")
	private HSSFPatriarch drawingPatriach;
	/**
	 * createHelper
	 */
	@SuppressWarnings("unused")
	private CreationHelper createHelper;

	
	/**
	 * 18.05.18] workbook 가져올 수 있는 함수 추가
	 * @return
	 */
	public Workbook getWorkbook() {
		return workbook;
	}

	/**
	 * 생성자
	 */
	public XLSFileBuilder() {
		styleHelper = new XLSFileStyle(workbook);

		// header style
		headerStyle = workbook.createCellStyle();
		headerStyle.setAlignment(HorizontalAlignment.CENTER);
		headerStyle.setFillForegroundColor(HSSFColor.HSSFColorPredefined.GREY_25_PERCENT.getIndex());
		headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		// header font
		final Font font = workbook.createFont();
		font.setBold(false);
		font.setFontName("돋움");
		headerStyle.setFont(font);
		// header border
		headerStyle.setBorderTop(BorderStyle.MEDIUM);
		headerStyle.setBorderBottom(BorderStyle.MEDIUM);

		subTitleStyle = workbook.createCellStyle();
		subTitleStyle.setAlignment(HorizontalAlignment.CENTER);
		subTitleStyle.setFillForegroundColor(HSSFColor.HSSFColorPredefined.PALE_BLUE.getIndex());
		subTitleStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		subTitleStyle.setVerticalAlignment(VerticalAlignment.CENTER);
		final Font font2 = workbook.createFont();
		font2.setBold(true);
		font2.setFontName("돋움");
		subTitleStyle.setFont(font2);
		subTitleStyle.setBorderLeft(BorderStyle.THIN);
		subTitleStyle.setBorderTop(BorderStyle.THIN);
		subTitleStyle.setBorderRight(BorderStyle.THIN);
		subTitleStyle.setBorderBottom(BorderStyle.THIN);

		subValueStyle = workbook.createCellStyle();
		subValueStyle.setAlignment(HorizontalAlignment.LEFT);
		subValueStyle.setVerticalAlignment(VerticalAlignment.CENTER);
		subValueStyle.setFont(font2);
		subValueStyle.setBorderLeft(BorderStyle.THIN);
		subValueStyle.setBorderTop(BorderStyle.THIN);
		subValueStyle.setBorderRight(BorderStyle.THIN);
		subValueStyle.setBorderBottom(BorderStyle.THIN);

		// create styles for cell values
		integerStyle = workbook.createCellStyle();
		integerStyle.setDataFormat(HSSFDataFormat.getBuiltinFormat("0"));
		integerStyle.setVerticalAlignment(VerticalAlignment.CENTER);
		integerStyle.setBorderLeft(BorderStyle.THIN);
		integerStyle.setBorderRight(BorderStyle.THIN);
		integerStyle.setBorderBottom(BorderStyle.THIN);

		longStyle = workbook.createCellStyle();
		longStyle.setDataFormat(HSSFDataFormat.getBuiltinFormat("0"));
		longStyle.setVerticalAlignment(VerticalAlignment.CENTER);
		longStyle.setBorderLeft(BorderStyle.THIN);
		longStyle.setBorderRight(BorderStyle.THIN);
		longStyle.setBorderBottom(BorderStyle.THIN);

		doubleStyle = workbook.createCellStyle();
		doubleStyle.setDataFormat(HSSFDataFormat.getBuiltinFormat("#,##0.00"));
		doubleStyle.setVerticalAlignment(VerticalAlignment.CENTER);
		doubleStyle.setBorderLeft(BorderStyle.THIN);
		doubleStyle.setBorderRight(BorderStyle.THIN);
		doubleStyle.setBorderBottom(BorderStyle.THIN);

		stringStyle = workbook.createCellStyle();
		stringStyle.setVerticalAlignment(VerticalAlignment.CENTER);
		stringStyle.setBorderLeft(BorderStyle.THIN);
		stringStyle.setBorderRight(BorderStyle.THIN);
		stringStyle.setBorderBottom(BorderStyle.THIN);

		centerValueStyle = workbook.createCellStyle();
		centerValueStyle.setAlignment(HorizontalAlignment.CENTER);
		centerValueStyle.setVerticalAlignment(VerticalAlignment.CENTER);
		centerValueStyle.setBorderLeft(BorderStyle.THIN);
		centerValueStyle.setBorderRight(BorderStyle.THIN);
		centerValueStyle.setBorderBottom(BorderStyle.THIN);
		
		ralignValueStyle = workbook.createCellStyle();
		ralignValueStyle.setAlignment(HorizontalAlignment.RIGHT);
		ralignValueStyle.setVerticalAlignment(VerticalAlignment.CENTER);
		ralignValueStyle.setBorderLeft(BorderStyle.THIN);
		ralignValueStyle.setBorderRight(BorderStyle.THIN);
		ralignValueStyle.setBorderBottom(BorderStyle.THIN);
		
		createHelper = workbook.getCreationHelper();
		if (sheet != null) {
			drawingPatriach = (HSSFPatriarch) sheet.createDrawingPatriarch();
		}

	}

	/**
	 * Constructs a new excel file builder, adding automatically a new sheet.
	 * The given sheet name is cleaned (removing forbidden characters:
	 * /,\,*,?,[,],:,!) and truncated if necessary (max length = 31 characters).
	 * 
	 * @param sheetName
	 */
	public XLSFileBuilder(String sheetName) {
		this();
		newSheet(sheetName);
		if (sheet != null) {
			drawingPatriach = (HSSFPatriarch) sheet.createDrawingPatriarch();
		}
	}

	@Override
	public Sheet newSheet(String sheetName) {
		sheet = workbook.createSheet(cleanSheetName(sheetName));
		curRow = 0;
		curCol = 0;
		return sheet;
	}

	@Override
	public void setColWidth(int[] colWidthes) {
		for (int i = 0; i < colWidthes.length; i++) {
			getCell(curRow, i);
			sheet.setColumnWidth(i, colWidthes[i] * 35);
		}
	}

	@Override
	public void addHeader(String header) {
		addHeader(header, header.length() * (256 + 3));
	}

	@Override
	public void addHeader(String header, int width) {
		final Row row = getRow(curRow);
		row.setHeight((short) 0x180);
		final Cell cell = getCell(row.getRowNum(), curCol);
		cell.setCellValue(header);
		cell.setCellStyle(styleHelper.headerStyle);
		sheet.setColumnWidth(curCol, width);
		++curCol;
	}

	public void addHeader(String header, int width, CellStyle style) {
		final Row row = getRow(curRow);
		row.setHeight((short) 0x180);
		final Cell cell = getCell(row.getRowNum(), curCol);
		cell.setCellValue(header);
		cell.setCellStyle(style);
		sheet.setColumnWidth(curCol, width);
		++curCol;
	}

	@Override
	public void addHeaders(String[] headers) {
		for (String header : headers) {
			addHeader(header);
		}
	}

	@Override
	public void addHeaders(String[][] headers) {
		for (String[] header : headers) {
//			addHeader(header[0], Integer.parseInt(header[1]) * 35);
			addHeader(header[0], (int)Double.parseDouble(header[1]) * 35);
		}
	}

	public void addHeaders(String[][] headers, CellStyle style) {
		for (String[] header : headers) {
			addHeader(header[0], Integer.parseInt(header[1]) * 35, style);
		}
	}

	@Override
	public void addMergedHeader(String header, int rowspan, int colspan) {
		final Row row = getRow(curRow);
		row.setHeight((short) 0x180);
		if(colspan < 0) return;
		Cell[] cells = new Cell[colspan];
		for (int i = 0; i < colspan; i++) {
			final Cell cell = getCell(row.getRowNum(), curCol);
			if (i == 0) {
				cell.setCellValue(header);
			}
			cells[i] = cell;
			cell.setCellStyle(styleHelper.headerStyle);
			++curCol;
		}

		sheet.addMergedRegion(new CellRangeAddress(curRow, curRow + rowspan - 1, curCol - colspan, curCol - 1));
	}

	/* addMergedHeader (기존 형태에서 CellStyle을 추가로 받음 ) */
	public void addMergedHeader(String header, int rowspan, int colspan, CellStyle style) {
		final Row row = getRow(curRow);
		row.setHeight((short) 0x180);
		if(colspan < 0) return;
		Cell[] cells = new Cell[colspan];
		for (int i = 0; i < colspan; i++) {
			final Cell cell = getCell(row.getRowNum(), curCol);
			if (i == 0) {
				cell.setCellValue(header);
			}
			cells[i] = cell;
			cell.setCellStyle(style);
			++curCol;
		}

		sheet.addMergedRegion(new CellRangeAddress(curRow, curRow + rowspan - 1, curCol - colspan, curCol - 1));
	}

	/* MergedData (기존 형태에서 colspan을 추가로 받아서 Cell merge ) */
	public void setDataValue(int col, String value, int colspan) {
		if(colspan < 0) return;
		Cell[] cells = new Cell[colspan];
		for (int i = 0; i < colspan; i++) {
			final Cell cell = getCell(curRow, curCol);
			cells[i] = cell;
			cell.setCellStyle(styleHelper.headerStyle);
			++curCol;
		}
		final Cell cell = getCell(curRow, col);
		cell.setCellValue(value);
		cell.setCellStyle(styleHelper.stringStyle);
		sheet.addMergedRegion(new CellRangeAddress(curRow, curRow + 1 - 1, curCol - colspan, curCol - 1));
	}

	public void setDataValue(int col, Integer value, int colspan) {
		if(colspan < 0) return;
		Cell[] cells = new Cell[colspan];
		for (int i = 0; i < colspan; i++) {
			final Cell cell = getCell(curRow, curCol);
			cells[i] = cell;
			cell.setCellStyle(styleHelper.headerStyle);
			++curCol;
		}
		final Cell cell = getCell(curRow, col);
		cell.setCellValue(value);
		cell.setCellStyle(styleHelper.stringStyle);
		sheet.addMergedRegion(new CellRangeAddress(curRow, curRow + 1 - 1, curCol - colspan, curCol - 1));
	}

	public void setDataValue(int col, Long value, int colspan) {
		if(colspan < 0) return;
		Cell[] cells = new Cell[colspan];
		for (int i = 0; i < colspan; i++) {
			final Cell cell = getCell(curRow, curCol);
			cells[i] = cell;
			cell.setCellStyle(styleHelper.headerStyle);
			++curCol;
		}
		final Cell cell = getCell(curRow, col);
		cell.setCellValue(value);
		cell.setCellStyle(styleHelper.stringStyle);
		sheet.addMergedRegion(new CellRangeAddress(curRow, curRow + 1 - 1, curCol - colspan, curCol - 1));
	}

	public void setDataValue(int col, Double value, int colspan) {
		if(colspan < 0) return;
		Cell[] cells = new Cell[colspan];
		for (int i = 0; i < colspan; i++) {
			final Cell cell = getCell(curRow, curCol);
			cells[i] = cell;
			cell.setCellStyle(styleHelper.headerStyle);
			++curCol;
		}
		final Cell cell = getCell(curRow, col);
		cell.setCellValue(value);
		cell.setCellStyle(styleHelper.stringStyle);
		sheet.addMergedRegion(new CellRangeAddress(curRow, curRow + 1 - 1, curCol - colspan, curCol - 1));
	}

	public void setDataValue(int col, Float value, int colspan) {
		if(colspan < 0) return;
		Cell[] cells = new Cell[colspan];
		for (int i = 0; i < colspan; i++) {
			final Cell cell = getCell(curRow, curCol);
			cells[i] = cell;
			cell.setCellStyle(styleHelper.headerStyle);
			++curCol;
		}
		final Cell cell = getCell(curRow, col);
		cell.setCellValue(value);
		cell.setCellStyle(styleHelper.stringStyle);
		sheet.addMergedRegion(new CellRangeAddress(curRow, curRow + 1 - 1, curCol - colspan, curCol - 1));
	}

	@Override
	public void setDataValue(int col, String value) {
		final Cell cell = getCell(curRow, col);
		cell.setCellValue(value);
		cell.setCellStyle(styleHelper.stringStyle);
		curCol++;
	}
	
	@Override
	public void setDataValue(int col, Integer value) {
		final Cell cell = getCell(curRow, col);
		cell.setCellValue(value);
		cell.setCellStyle(styleHelper.integerStyle);
		curCol++;
	}

	@Override
	public void setDataValue(int col, Long value) {
		final Cell cell = getCell(curRow, col);
		cell.setCellValue(value);
		cell.setCellStyle(styleHelper.longStyle);
		curCol++;
	}

	@Override
	public void setDataValue(int col, Double value) {
		final Cell cell = getCell(curRow, col);
		cell.setCellValue(value);
		cell.setCellStyle(styleHelper.doubleStyle);
		curCol++;
	}

	@Override
	public void setDataValue(int col, Float value) {
		final Cell cell = getCell(curRow, col);
		cell.setCellValue(value);
		cell.setCellStyle(styleHelper.doubleStyle);
		curCol++;
	}

	@Override
	public void setDataValue(int col, String value, CellStyle style) {
		final Cell cell = getCell(curRow, col);
		cell.setCellValue(value);
		cell.setCellStyle(style);
		curCol++;
	}
	
	@Override
	public void setDataValue(int col, Integer value, CellStyle style) {
		final Cell cell = getCell(curRow, col);
		cell.setCellValue(value);
		cell.setCellStyle(style);
		curCol++;
	}
	
	@Override
	public void nextRow() {
		++curRow;
		curCol = 0;

		// excel(xls)는 maxRow = 65536
		if (curRow >= 65536) {
			curRow = 0;
			sheet = workbook.createSheet();
		}
	}

	@Override
	public Cell addSubTitle(int col, String title, CellStyle cellStyle) {
		final Row row = getRow(curRow);
		row.setHeight((short) 0x250);
		final Cell cell = getCell(curRow, col);
		cell.setCellValue(title);
		cell.setCellStyle(cellStyle);
		return cell;
	}

	@Override
	public void addCustomCell(int col, Object value, CellStyle cellStyle, int colspan) {
		final Row row = getRow(curRow);
		row.setHeight((short) 0x250);
		if(colspan < 0) return;
		Cell[] cells = new Cell[colspan];
		curCol = col;
		for (int i = 0; i < colspan; i++) {
			final Cell cell = getCell(row.getRowNum(), curCol);
			if (i == 0) {
				if (value instanceof Integer)
					cell.setCellValue((int) value);
				else if (value instanceof Long)
					cell.setCellValue((long) value);
				else if (value instanceof Double)
					cell.setCellValue((double) value);
				else
					cell.setCellValue((String) value);
			}
			cells[i] = cell;
			cell.setCellStyle(cellStyle);
			++curCol;
		}

		sheet.addMergedRegion(new CellRangeAddress(curRow, curRow, curCol - colspan, curCol - 1));
	}

	@Override
	public void write(OutputStream os) throws IOException {
		workbook.write(os);
	}

	@Override
	public String save() throws Exception {
		String createTime = DateFormatUtils.format(new Date(), "yyyyMMddHHmmssSSS");
		String fileName = AppGlobal.homePath + "/export/" + createTime + ".xls";
		this.save(fileName);
		return "/export/" + createTime + ".xls";
	}

	@Override
	public void save(String fileName) throws Exception {
		File file = new File(fileName);
		if (!file.getParentFile().exists()) {
			boolean res = file.getParentFile().mkdirs();
			if (!res) {
				throw new Exception("Cannot create directory: " + file.getParentFile().getAbsolutePath());
			}
		}
		final FileOutputStream fos = new FileOutputStream(file);
		try {
			write(fos);
		} finally {
			if (fos != null) {
				fos.flush();
				fos.close();
			}
		}
	}

	public void adaptWidthToContents() {
		adaptWidthToContents(false);
	}

	public void adaptWidthToContents(boolean ignoreHeader) {
		final int colNb = getRow(0).getLastCellNum() + 1;
		outer: for (int c = 0; c < colNb; ++c) {
			int maxWidth = 0;
			final int startRowNum = ignoreHeader ? 1 : 0;
			for (int r = startRowNum; r <= curRow; ++r) {
				final Cell cell = getCell(r, c);
				// Ignore columns corresponding to non-string values
				if (cell.getCellType() != CellType.STRING && cell.getCellType() != CellType.BLANK) {
					continue outer;
				}
				if (maxWidth < cell.getStringCellValue().length()) {
					maxWidth = cell.getStringCellValue().length();
				}
			}
			sheet.setColumnWidth(c, getColumnWidth(maxWidth));
		}
	}

	public void autoSizeColumns() {
		final Row row = getRow(sheet.getFirstRowNum());
		for (int i = 0; i < row.getLastCellNum(); i++) {
			sheet.autoSizeColumn(i);
		}
	}

	/**
	 * Sheet 이름 지우기
	 * 
	 * @param sheetName
	 * @return
	 */
	private String cleanSheetName(String sheetName) {
		final String cleanName = sheetName.replaceAll("[/\\\\\\*\\?\\[\\]:!]", " ");
		if (cleanName.length() > 31) {
			return cleanName.substring(0, 31); // sheet name length is limited
												// to 31 characters
		}
		return cleanName;
	}

	private Row getRow(int row) {
		Row line = sheet.getRow(row);
		if (line == null) {
			line = sheet.createRow(row);
		}
		return line;
	}

	private Cell getCell(int row, int col) {
		final Row line = getRow(row);
		Cell cell = line.getCell(col);
		if (cell == null) {
			cell = line.createCell(col);
		}
		return cell;
	}

	private int getColumnWidth(int maxWidth) {
		return Math.min(256 * (maxWidth + 3), 255 * 256);
	}

	@Override
	public void addJFreeChartToImg(JFreeChart chart) {
		ByteArrayOutputStream os = null;
		try {
			os = new ByteArrayOutputStream();
			ChartUtils.writeChartAsPNG(os, chart, 800, 300);
			int pictureId = workbook.addPicture(os.toByteArray(), Workbook.PICTURE_TYPE_PNG);
			os.close();

			HSSFPatriarch drawing = (HSSFPatriarch) sheet.createDrawingPatriarch();
			ClientAnchor anchor = new HSSFClientAnchor();
			anchor.setCol1(0);
			anchor.setRow1(curRow + 2);

			HSSFPicture picture = drawing.createPicture(anchor, pictureId);
			picture.resize();
			curRow += 20;
		} catch (IOException ioe) {
			logger.error("[XLSFileBuilder] ", ioe);
		} finally {
			if (os != null)
				try {
					os.close();
				} catch (IOException e) {
					os = null;
				}
		}
	}

	@Override
	public void addImgFile(File imgFile) {
		addImgFile(imgFile, 800);
	}

	@Override
	public void addImgFile(File imgFile, int width) {
		try {
			byte[] img = FileUtils.readFileToByteArray(imgFile);
			int pictureId = workbook.addPicture(img, Workbook.PICTURE_TYPE_PNG);
			HSSFPatriarch drawing = (HSSFPatriarch) sheet.createDrawingPatriarch();
			ClientAnchor anchor = new HSSFClientAnchor();
			anchor.setCol1(0);
			anchor.setRow1(curRow + 1);

			HSSFPicture picture = drawing.createPicture(anchor, pictureId);
			BufferedImage bimg = ImageIO.read(imgFile);
			double scale = (double) width / bimg.getWidth();
			picture.resize(scale);
			curRow += 10;
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (imgFile.exists())
				imgFile.delete();
		}
	}


}
