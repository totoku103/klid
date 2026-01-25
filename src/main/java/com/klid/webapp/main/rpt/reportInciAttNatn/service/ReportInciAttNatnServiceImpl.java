/**
 * Program Name	: NoticeBoardServiceImpl.java
 *
 * Version		:  1.0
 *
 * Creation Date	: 2015. 12. 22.
 * 
 * Programmer Name 	:  kim dong ju
 *
 * Copyright 2014 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.main.rpt.reportInciAttNatn.service;

import com.klid.common.AppGlobal;
import com.klid.common.CommonMethod;
import com.klid.common.hwplib.object.HWPFile;
import com.klid.common.hwplib.object.bodytext.Section;
import com.klid.common.hwplib.object.bodytext.control.Control;
import com.klid.common.hwplib.object.bodytext.control.ControlTable;
import com.klid.common.hwplib.object.bodytext.control.table.Row;
import com.klid.common.hwplib.reader.HWPReader;
import com.klid.common.hwplib.writer.HWPWriter;
import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ErrorInfo;
import com.klid.webapp.common.MsgService;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.rpt.reportInciAttNatn.persistence.ReportInciAttNatnMapper;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.stereotype.Service;

import jakarta.annotation.Resource;
import java.awt.*;
import java.io.File;
import java.io.IOException;
import java.util.*;

@Service("reportInciAttNatnService")
public class ReportInciAttNatnServiceImpl extends MsgService implements ReportInciAttNatnService {

	private Rectangle rectangle = new Rectangle(0, 50,  170, 72);

	@Resource(name = "reportInciAttNatnMapper")
	private ReportInciAttNatnMapper mapper;

	/** 시도 그리드 조회 */
	@Override
	public ReturnData getAttList(Criterion criterion) {
		return new ReturnData(mapper.selectAttNatnList(criterion.getCondition()));
	}

	@Override
	public ReturnData exportReportAttNatn(Criterion criterion) {
		try {

			Map<String, Object> reqMap = criterion.getCondition();

			String fname = (String)reqMap.get("fname");
			String imgpath= AppGlobal.homePath+"/export/"+fname;

			ArrayList<LinkedHashMap<String,Object>> attGrid = (ArrayList<LinkedHashMap<String,Object>>)reqMap.get("attGrid");

			String filename = AppGlobal.reportTemplate+"report_type_"+attGrid.size()+".hwp";

			HWPFile hwpFile = HWPReader.fromFile(filename);

			Section section = hwpFile.getBodyText().getSectionList().get(0);

			Control c = section.getParagraph(0).getControlList().get(2);
			ControlTable table = (ControlTable) c;
			ArrayList<Row> rows = table.getRowList();
			rows.get(0).getCellList().get(0).getParagraphList().getParagraph(0).createText();
			rows.get(0).getCellList().get(0).getParagraphList().getParagraph(0).getText().addString("공격국가보고서");

			String createTime = DateFormatUtils.format(new Date(), "yyyyMMddHHmmssSSS");

			section.getParagraph(3).getText().addString((String)createTime.substring(0,8));
			section.getParagraph(4).getText().addString((String)reqMap.get("startDt")+" ~ "+(String)reqMap.get("endDt"));

			c = section.getParagraph(18).getControlList().get(0);
			table = (ControlTable) c;
			rows = table.getRowList();
			rows.get(0).getCellList().get(0).getParagraphList().getParagraph(0).createText();
			rows.get(0).getCellList().get(0).getParagraphList().getParagraph(0).getText().addString("공격국가");
			rows.get(0).getCellList().get(1).getParagraphList().getParagraph(0).createText();
			rows.get(0).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString("건수");

			for(int i=1; i<rows.size(); i++){
				int j=i-1;
				if(attGrid.size()==j)
					break;
				rows.get(i).getCellList().get(0).getParagraphList().getParagraph(0).createText();
				rows.get(i).getCellList().get(0).getParagraphList().getParagraph(0).getText().addString((String)attGrid.get(j).get("name"));
				rows.get(i).getCellList().get(1).getParagraphList().getParagraph(0).createText();
				rows.get(i).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString(String.valueOf(attGrid.get(j).get("y")));
			}

//			c = section.getParagraph(19).getControlList().get(0);
//			table = (ControlTable) c;
//			rows = table.getRowList();
//			rows.get(0).getCellList().get(0).getParagraphList().getParagraph(0).createText();
//			rows.get(0).getCellList().get(0).getParagraphList().getParagraph(0).getText().addString("공격국가");
//			rows.get(0).getCellList().get(1).getParagraphList().getParagraph(0).createText();
//			rows.get(0).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString("건수");
//
//			for(int i=1; i<rows.size(); i++){
//				int j=i-1+37;
//				if(attGrid.size()==j)
//					break;
//				rows.get(i).getCellList().get(0).getParagraphList().getParagraph(0).createText();
//				rows.get(i).getCellList().get(0).getParagraphList().getParagraph(0).getText().addString((String)attGrid.get(j).get("name"));
//				rows.get(i).getCellList().get(1).getParagraphList().getParagraph(0).createText();
//				rows.get(i).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString(String.valueOf(attGrid.get(j).get("y")));
//			}
//
//			c = section.getParagraph(20).getControlList().get(0);
//			table = (ControlTable) c;
//			rows = table.getRowList();
//			rows.get(0).getCellList().get(0).getParagraphList().getParagraph(0).createText();
//			rows.get(0).getCellList().get(0).getParagraphList().getParagraph(0).getText().addString("공격국가");
//			rows.get(0).getCellList().get(1).getParagraphList().getParagraph(0).createText();
//			rows.get(0).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString("건수");
//
//			for(int i=1; i<rows.size(); i++){
//				int j=i-1+(37*2);
//				if(attGrid.size()==j)
//					break;
//				rows.get(i).getCellList().get(0).getParagraphList().getParagraph(0).createText();
//				rows.get(i).getCellList().get(0).getParagraphList().getParagraph(0).getText().addString((String)attGrid.get(j).get("name"));
//				rows.get(i).getCellList().get(1).getParagraphList().getParagraph(0).createText();
//				rows.get(i).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString(String.valueOf(attGrid.get(j).get("y")));
//			}
//
//			c = section.getParagraph(21).getControlList().get(0);
//			table = (ControlTable) c;
//			rows = table.getRowList();
//			rows.get(0).getCellList().get(0).getParagraphList().getParagraph(0).createText();
//			rows.get(0).getCellList().get(0).getParagraphList().getParagraph(0).getText().addString("공격국가");
//			rows.get(0).getCellList().get(1).getParagraphList().getParagraph(0).createText();
//			rows.get(0).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString("건수");
//
//			for(int i=1; i<rows.size(); i++){
//				int j=i-1+(37*3);
//				if(attGrid.size()==j)
//					break;
//				rows.get(i).getCellList().get(0).getParagraphList().getParagraph(0).createText();
//				rows.get(i).getCellList().get(0).getParagraphList().getParagraph(0).getText().addString((String)attGrid.get(j).get("name"));
//				rows.get(i).getCellList().get(1).getParagraphList().getParagraph(0).createText();
//				rows.get(i).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString(String.valueOf(attGrid.get(j).get("y")));
//			}
//
//			c = section.getParagraph(22).getControlList().get(0);
//			table = (ControlTable) c;
//			rows = table.getRowList();
//			rows.get(0).getCellList().get(0).getParagraphList().getParagraph(0).createText();
//			rows.get(0).getCellList().get(0).getParagraphList().getParagraph(0).getText().addString("공격국가");
//			rows.get(0).getCellList().get(1).getParagraphList().getParagraph(0).createText();
//			rows.get(0).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString("건수");
//
//			for(int i=1; i<rows.size(); i++){
//				int j=i-1+(37*4);
//				if(attGrid.size()==j)
//					break;
//				rows.get(i).getCellList().get(0).getParagraphList().getParagraph(0).createText();
//				rows.get(i).getCellList().get(0).getParagraphList().getParagraph(0).getText().addString((String)attGrid.get(j).get("name"));
//				rows.get(i).getCellList().get(1).getParagraphList().getParagraph(0).createText();
//				rows.get(i).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString(String.valueOf(attGrid.get(j).get("y")));
//			}
//
//			c = section.getParagraph(23).getControlList().get(0);
//			table = (ControlTable) c;
//			rows = table.getRowList();
//			rows.get(0).getCellList().get(0).getParagraphList().getParagraph(0).createText();
//			rows.get(0).getCellList().get(0).getParagraphList().getParagraph(0).getText().addString("공격국가");
//			rows.get(0).getCellList().get(1).getParagraphList().getParagraph(0).createText();
//			rows.get(0).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString("건수");
//
//			for(int i=1; i<rows.size(); i++){
//				int j=i-1+(37*5);
//				if(attGrid.size()==j)
//					break;
//				rows.get(i).getCellList().get(0).getParagraphList().getParagraph(0).createText();
//				rows.get(i).getCellList().get(0).getParagraphList().getParagraph(0).getText().addString((String)attGrid.get(j).get("name"));
//				rows.get(i).getCellList().get(1).getParagraphList().getParagraph(0).createText();
//				rows.get(i).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString(String.valueOf(attGrid.get(j).get("y")));
//			}
//
//			c = section.getParagraph(24).getControlList().get(0);
//			table = (ControlTable) c;
//			rows = table.getRowList();
//			rows.get(0).getCellList().get(0).getParagraphList().getParagraph(0).createText();
//			rows.get(0).getCellList().get(0).getParagraphList().getParagraph(0).getText().addString("공격국가");
//			rows.get(0).getCellList().get(1).getParagraphList().getParagraph(0).createText();
//			rows.get(0).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString("건수");
//
//			for(int i=1; i<rows.size(); i++){
//				int j=i-1+(37*6);
//				if(attGrid.size()==j)
//					break;
//				rows.get(i).getCellList().get(0).getParagraphList().getParagraph(0).createText();
//				rows.get(i).getCellList().get(0).getParagraphList().getParagraph(0).getText().addString((String)attGrid.get(j).get("name"));
//				rows.get(i).getCellList().get(1).getParagraphList().getParagraph(0).createText();
//				rows.get(i).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString(String.valueOf(attGrid.get(j).get("y")));
//			}

			CommonMethod commonMethod = new CommonMethod();
			commonMethod.insertShapeWithImage(hwpFile,imgpath,rectangle);

			File file = new File(AppGlobal.homePath + "/export");
			if(!file.exists())
				file.mkdirs();


			filename = AppGlobal.homePath+"/export/" + createTime + ".hwp";
			HWPWriter.toFile(hwpFile,filename);

			Map<String, String> resultMap = new HashMap<>();
			String today = DateFormatUtils.format(new Date(), "yyyyMMdd");
			resultMap.put("filePath", "/export/" + createTime + ".hwp");
			resultMap.put("fileName", today+"_attack_nation_report");
			resultMap.put("fileExt", ".hwp");
			return new ReturnData(resultMap);
		} catch (IOException ioe) {
			ioe.printStackTrace();
			return new ReturnData(new ErrorInfo(ioe));
		} catch (NoSuchFieldException nsfe) {
			nsfe.printStackTrace();
			return new ReturnData(new ErrorInfo(nsfe));
		} catch (IllegalArgumentException ie) {
			ie.printStackTrace();
			return new ReturnData(new ErrorInfo(ie));
		} catch (Exception e){
			e.printStackTrace();
			return new ReturnData(new ErrorInfo(e));
		}
	}
}
