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
package com.klid.webapp.main.rpt.reportInciPrcsStat.service;

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
import com.klid.webapp.main.rpt.reportInciPrcsStat.persistence.ReportInciPrcsStatMapper;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.stereotype.Service;

import jakarta.annotation.Resource;
import java.awt.*;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.*;

@Service("reportInciPrcsStatService")
public class ReportInciPrcsStatServiceImpl extends MsgService implements ReportInciPrcsStatService {

	private Rectangle rectangle = new Rectangle(0, 50,  170, 72);

	@Resource(name = "reportInciPrcsStatMapper")
	private ReportInciPrcsStatMapper mapper;

	/** 사고유형 그리드 조회 */
	@Override
	public ReturnData getPrcsStatList(Criterion criterion) {
		return new ReturnData(mapper.selectInciPrcsStat(criterion.getCondition()));
	}

	@Override
	public ReturnData exportReportInciPrcsStat(Criterion criterion) {
		try {
			Map<String, Object> reqMap = criterion.getCondition();

			String fname = (String)reqMap.get("fname");
			String imgpath= AppGlobal.homePath+"/export/"+fname;

			ArrayList<LinkedHashMap<String,Object>> prcsStatGrid = (ArrayList<LinkedHashMap<String,Object>>)reqMap.get("prcsStatGrid");

			String filename = AppGlobal.reportTemplate+"report_type_"+prcsStatGrid.size()+".hwp";


			HWPFile hwpFile = HWPReader.fromFile(filename);

			Section section = hwpFile.getBodyText().getSectionList().get(0);

			Control c = section.getParagraph(0).getControlList().get(2);
			ControlTable table = (ControlTable) c;
			ArrayList<Row> rows = table.getRowList();
			rows.get(0).getCellList().get(0).getParagraphList().getParagraph(0).createText();
			rows.get(0).getCellList().get(0).getParagraphList().getParagraph(0).getText().addString("처리상태보고서");

			String createTime = DateFormatUtils.format(new Date(), "yyyyMMddHHmmssSSS");

			section.getParagraph(3).getText().addString((String)createTime.substring(0,8));
			section.getParagraph(4).getText().addString((String)reqMap.get("startDt")+" ~ "+(String)reqMap.get("endDt"));

			c = section.getParagraph(18).getControlList().get(0);
			table = (ControlTable) c;
			rows = table.getRowList();
			rows.get(0).getCellList().get(0).getParagraphList().getParagraph(0).createText();
			rows.get(0).getCellList().get(0).getParagraphList().getParagraph(0).getText().addString("사고처리상태");
			rows.get(0).getCellList().get(1).getParagraphList().getParagraph(0).createText();
			rows.get(0).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString("건수");


			for(int i=1; i<rows.size(); i++){
				int j=i-1;
				if(prcsStatGrid.size()==j)
					break;
				rows.get(i).getCellList().get(0).getParagraphList().getParagraph(0).createText();
				rows.get(i).getCellList().get(0).getParagraphList().getParagraph(0).getText().addString((String)prcsStatGrid.get(j).get("name"));
				rows.get(i).getCellList().get(1).getParagraphList().getParagraph(0).createText();
				rows.get(i).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString(String.valueOf(prcsStatGrid.get(j).get("y")));
			}

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
			resultMap.put("fileName", today+"_status_report");
			resultMap.put("fileExt", ".hwp");
			return new ReturnData(resultMap);
		}catch (FileNotFoundException e){
			e.printStackTrace();
			return new ReturnData(new ErrorInfo(e));
		}catch (IOException e){
			e.printStackTrace();
			return new ReturnData(new ErrorInfo(e));
		}catch (IllegalArgumentException e){
			e.printStackTrace();
			return new ReturnData(new ErrorInfo(e));
		}catch (NoSuchFieldException e){
			e.printStackTrace();
			return new ReturnData(new ErrorInfo(e));
		}catch (Exception e){
			e.printStackTrace();
			return new ReturnData(new ErrorInfo(e));
		}
	}
}
