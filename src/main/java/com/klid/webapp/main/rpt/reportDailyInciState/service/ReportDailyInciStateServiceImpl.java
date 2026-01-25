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
package com.klid.webapp.main.rpt.reportDailyInciState.service;

import com.klid.common.AppGlobal;
import com.klid.common.hwplib.object.HWPFile;
import com.klid.common.hwplib.object.bodytext.Section;
import com.klid.common.hwplib.object.bodytext.control.Control;
import com.klid.common.hwplib.object.bodytext.control.ControlTable;
import com.klid.common.hwplib.object.bodytext.control.ctrlheader.CtrlHeaderGso;
import com.klid.common.hwplib.object.bodytext.control.ctrlheader.gso.*;
import com.klid.common.hwplib.object.bodytext.control.gso.ControlRectangle;
import com.klid.common.hwplib.object.bodytext.control.gso.GsoControlType;
import com.klid.common.hwplib.object.bodytext.control.gso.shapecomponent.ShapeComponentNormal;
import com.klid.common.hwplib.object.bodytext.control.gso.shapecomponent.lineinfo.*;
import com.klid.common.hwplib.object.bodytext.control.gso.shapecomponent.shadowinfo.ShadowInfo;
import com.klid.common.hwplib.object.bodytext.control.gso.shapecomponent.shadowinfo.ShadowType;
import com.klid.common.hwplib.object.bodytext.control.gso.shapecomponenteach.ShapeComponentRectangle;
import com.klid.common.hwplib.object.bodytext.control.table.Row;
import com.klid.common.hwplib.object.bodytext.paragraph.Paragraph;
import com.klid.common.hwplib.object.docinfo.BinData;
import com.klid.common.hwplib.object.docinfo.bindata.BinDataCompress;
import com.klid.common.hwplib.object.docinfo.bindata.BinDataState;
import com.klid.common.hwplib.object.docinfo.bindata.BinDataType;
import com.klid.common.hwplib.object.docinfo.borderfill.fillinfo.FillInfo;
import com.klid.common.hwplib.object.docinfo.borderfill.fillinfo.ImageFill;
import com.klid.common.hwplib.object.docinfo.borderfill.fillinfo.ImageFillType;
import com.klid.common.hwplib.object.docinfo.borderfill.fillinfo.PictureEffect;
import com.klid.common.hwplib.reader.HWPReader;
import com.klid.common.hwplib.writer.HWPWriter;
import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ErrorInfo;
import com.klid.webapp.common.MsgService;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.rpt.reportDailyInciState.persistence.ReportDailyInciStateMapper;
import com.klid.webapp.main.rpt.reportDailyState.persistence.ReportDailyStateMapper;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.awt.*;
import java.io.*;
import java.util.*;

@Service("reportDailyInciStateService")
public class 	ReportDailyInciStateServiceImpl extends MsgService implements ReportDailyInciStateService {

	@Resource(name = "reportDailyInciStateMapper")
	private ReportDailyInciStateMapper mapper;

	/** 시도별 일일 사고처리 현황  일일 조회 처리  */
	@Override
	public ReturnData getDailyList(Criterion criterion) {
		//criterion.addParam("instCd", AppGlobal.instCd);
		//criterion.addParam("localCd", AppGlobal.localCd);

		String sInci_trns_inst_cd;

		if(AppGlobal.instCd.equals("1100000")){
			sInci_trns_inst_cd = "dmg_inst_cd";
		}else{
			sInci_trns_inst_cd = "inci_trns_rcpt_inst_cd";
		}

		criterion.addParam("inciTrnsInstCd", sInci_trns_inst_cd);

		return new ReturnData(mapper.selectReportDayInciProc(criterion.getCondition()));
	}

	/** 시도별 일일 사고처리 현황 누계 조회  */
	@Override
	public ReturnData getDailyTotList(Criterion criterion) {
		//criterion.addParam("instCd", AppGlobal.instCd);
		//criterion.addParam("localCd", AppGlobal.localCd);

		String sInci_trns_inst_cd;

		if(AppGlobal.instCd.equals("1100000")){
			sInci_trns_inst_cd = "dmg_inst_cd";
		}else{
			sInci_trns_inst_cd = "inci_trns_rcpt_inst_cd";
		}

		criterion.addParam("inciTrnsInstCd", sInci_trns_inst_cd);

		return new ReturnData(mapper.selectReportSumInci(criterion.getCondition()));
	}

	@Override
	public ReturnData makeReportDailyInciStateDownload(Criterion criterion) {
		try {
			Map<String, Object> reqMap = criterion.getCondition();

			ArrayList<LinkedHashMap<String, Object>> dailyList = (ArrayList<LinkedHashMap<String, Object>>)reqMap.get("dailyGrid");
			ArrayList<LinkedHashMap<String, Object>> dailyTotList = (ArrayList<LinkedHashMap<String, Object>>)reqMap.get("dailyTotGrid");

			String filename = AppGlobal.reportTemplate+"report_sido.hwp";
			HWPFile hwpFile = HWPReader.fromFile(filename);
			Section section = hwpFile.getBodyText().getSectionList().get(0);



			Control c = section.getParagraph(2).getControlList().get(0);
			ControlTable table = (ControlTable) c;

			ArrayList<Row> rows = table.getRowList();
			for(int i=2; i<=dailyList.size(); i++){
				int j=i-2;
				rows.get(i).getCellList().get(0).getParagraphList().getParagraph(0).createText();
				rows.get(i).getCellList().get(0).getParagraphList().getParagraph(0).getText().addString((String)dailyList.get(j).get("inst_nm"));
//				rows.get(i).getCellList().get(1).getParagraphList().getParagraph(0).createText();
//				rows.get(i).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)dailyList.get(j).get("ing_cnt")));
//				rows.get(i).getCellList().get(2).getParagraphList().getParagraph(0).createText();
//				rows.get(i).getCellList().get(2).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)dailyList.get(j).get("end_cnt")));
//				rows.get(i).getCellList().get(3).getParagraphList().getParagraph(0).createText();
//				rows.get(i).getCellList().get(3).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)dailyList.get(j).get("total_cnt")));
//				rows.get(i).getCellList().get(5).getParagraphList().getParagraph(0).createText();
//				rows.get(i).getCellList().get(5).getParagraphList().getParagraph(0).getText().addString((String)dailyTotList.get(j).get("inst_nm"));
//				rows.get(i).getCellList().get(6).getParagraphList().getParagraph(0).createText();
//				rows.get(i).getCellList().get(6).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)dailyTotList.get(j).get("end_cnt")));
//				rows.get(i).getCellList().get(7).getParagraphList().getParagraph(0).createText();
//				rows.get(i).getCellList().get(7).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)dailyTotList.get(j).get("total_cnt")));
//				rows.get(i).getCellList().get(8).getParagraphList().getParagraph(0).createText();
//				rows.get(i).getCellList().get(8).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)dailyTotList.get(j).get("ing_cnt")));
			}

//			section.getParagraph(4).getText().addString((String)reqMap.get("startDt")+"~"+(String)reqMap.get("endDt")+"의 통계임");
			File file = new File(AppGlobal.homePath + "/export");
			if(!file.exists())
				file.mkdirs();

			String createTime = DateFormatUtils.format(new Date(), "yyyyMMddHHmmssSSS");
			filename = AppGlobal.homePath+"/export/" + createTime + ".hwp";
			HWPWriter.toFile(hwpFile,filename);

			Map<String, String> resultMap = new HashMap<>();
			resultMap.put("filePath", "/export/" + createTime + ".hwp");
			resultMap.put("fileName", createTime);
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
