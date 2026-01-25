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
package com.klid.webapp.main.rpt.reportDailyState.service;

import com.klid.common.AppGlobal;
import com.klid.common.hwplib.object.HWPFile;
import com.klid.common.hwplib.object.bodytext.Section;
import com.klid.common.hwplib.object.bodytext.control.Control;
import com.klid.common.hwplib.object.bodytext.control.ControlTable;
import com.klid.common.hwplib.object.bodytext.control.ControlType;
import com.klid.common.hwplib.object.bodytext.control.table.Row;
import com.klid.common.hwplib.reader.HWPReader;
import com.klid.common.hwplib.writer.HWPWriter;
import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ErrorInfo;
import com.klid.webapp.common.MsgService;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.rpt.reportDaily.dto.ReportDailyDto;
import com.klid.webapp.main.rpt.reportDaily.persistence.ReportDailyMapper;
import com.klid.webapp.main.rpt.reportDailyState.dto.ReportDailyStateDto;
import com.klid.webapp.main.rpt.reportDailyState.persistence.ReportDailyStateMapper;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.stereotype.Service;

import jakarta.annotation.Resource;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service("reportDailyStateService")
public class ReportDailyStateServiceImpl extends MsgService implements ReportDailyStateService {

	@Resource(name = "reportDailyStateMapper")
	private ReportDailyStateMapper mapper;

	/** 교대 근무자 */
	@Override
	public ReturnData getRotationList(Criterion criterion) {
		return new ReturnData(mapper.getRotationList(criterion.getCondition()));
	}

	/** 일일 사고처리 */
	@Override
	public ReturnData getDailyList(Criterion criterion) {
		List<ReportDailyDto> reportSum = mapper.selectReportSum(criterion.getCondition());
		int sumsVal = reportSum.get(0).getSums();
		List<ReportDailyDto> reportDayStatList = mapper.selectReportDayStat(criterion.getCondition());
		reportDayStatList.get(0).setSums(sumsVal);
		reportDayStatList.get(0).setT_end_cnt(reportSum.get(0).getSums());
		ReturnData returnData = new ReturnData(reportDayStatList);

		return returnData;
	}

	/** 사고 처리 누계 */
	@Override
	public ReturnData getDailyTotList(Criterion criterion) {
		List<ReportDailyDto> reportSum = mapper.selectReportSum(criterion.getCondition());

		List<ReportDailyDto> reportDayStatList = mapper.selectReportSumStat(criterion.getCondition());

		for(int i=0; i< reportDayStatList.size(); i++){
			if(reportSum.size()<=i){
				reportDayStatList.get(i).setSums(0);
			}else {
				reportDayStatList.get(i).setSums(reportSum.get(i).getSums());
			}
		}

		ReturnData returnData = new ReturnData(reportDayStatList);

		return returnData;
	}

	/** 일일 실적 유형별 사고내역 */
	@Override
	public ReturnData getTypeAccidentList(Criterion criterion) {

		List<ReportDailyDto> reportSum = mapper.selectReportTypeSum(criterion.getCondition());
		List<ReportDailyDto> reportDayStatList = mapper.selectReportDayType(criterion.getCondition());
		List<ReportDailyDto> reportNcscList = mapper.selectReportNcsc(criterion.getCondition());

		for(int i=0; i< reportDayStatList.size(); i++){
			if(reportSum.size()<=i){
				reportDayStatList.get(i).setSums(0);
			}else {
				reportDayStatList.get(i).setSums(reportSum.get(i).getSums());
			}
		}
		reportDayStatList.get(0).setNcsc_code_cnt(reportNcscList.get(1).getTotal_cnt());
		reportDayStatList.get(0).setNcsc_etc_cnt(reportNcscList.get(2).getTotal_cnt());

		ReturnData returnData = new ReturnData(reportDayStatList);
		return returnData;
	}

	/** 일일 실적 사고처리 현황 조회 */
	@Override
	public ReturnData getDetectionList(Criterion criterion) {
		return new ReturnData(mapper.selectReportDayTms(criterion.getCondition()));
	}

	@Override
	public ReturnData makeReportDailyStateDownload(Criterion criterion) {
		try {

			Map<String, Object> reqMap = criterion.getCondition();

//			String filename = AppGlobal.reportTemplate+"report_total_day"+(String)reqMap.get("days")+".hwp";
			String filename = AppGlobal.reportTemplate+"report2.hwp";
			HWPFile hwpFile = HWPReader.fromFile(filename);
			Section section = hwpFile.getBodyText().getSectionList().get(0);

			Control c = section.getParagraph(1).getControlList().get(0);
			ControlTable table = (ControlTable) c;

			SimpleDateFormat dt = new SimpleDateFormat("yyyyMMdd");
			Date date = dt.parse(reqMap.get("sumEndDt").toString());

			ArrayList<Row> rows = table.getRowList();
			/*int j=0;*/
			for(int i=2; i>=1; --i){
				/*j++;*/
				Calendar c1 = Calendar.getInstance();
				c1.setTime(date);
				c1.add(Calendar.DATE,-1);
				date = dt.parse(dt.format(c1.getTime()));
				rows.get(i).getCellList().get(2).getParagraphList().getParagraph(0).createText();
				/*String workDay = String.valueOf(Integer.valueOf((String)reqMap.get("sumEndDt"))-i);*/
				rows.get(i).getCellList().get(2).getParagraphList().getParagraph(0).getText().addString(dt.format(c1.getTime()).substring(0,4)+". "+dt.format(c1.getTime()).substring(4,6)+". "+dt.format(c1.getTime()).substring(6,8));
			}

			String totalDay = (String)reqMap.get("sumDay");
			section.getParagraph(5).createText();
			section.getParagraph(5).getText().addString("(누적치 : ’"+totalDay.substring(0,4)+". "+totalDay.substring(4,6)+". "+totalDay.substring(6,8)+"이후, 단위 : 건, (*)는 %임)");

			ArrayList<LinkedHashMap> dailyGrid = (ArrayList)reqMap.get("dailyGrid");
			ArrayList<LinkedHashMap> dailyTotGrid = (ArrayList)reqMap.get("dailyTotGrid");
			ArrayList<LinkedHashMap> typeAccidentGrid = (ArrayList)reqMap.get("typeAccidentGrid");

			c = section.getParagraph(6).getControlList().get(0);
			table = (ControlTable) c;
			rows = table.getRowList();
			rows.get(2).getCellList().get(1).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)dailyGrid.get(0).get("total_cnt")));
			rows.get(2).getCellList().get(2).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(2).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)dailyGrid.get(0).get("end_cnt")));
			rows.get(2).getCellList().get(3).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(3).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)dailyGrid.get(0).get("ing_cnt")));
			rows.get(2).getCellList().get(4).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(4).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)dailyTotGrid.get(0).get("total_cnt")));
			rows.get(2).getCellList().get(5).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(5).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)dailyTotGrid.get(0).get("end_cnt")));
			rows.get(2).getCellList().get(6).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(6).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)dailyTotGrid.get(0).get("ing_cnt")));

			//section.getParagraph(6).getText().addString("##end_cnt##");
//			section.getParagraph(12).createText();
//			section.getParagraph(12).getText().addString("(누적치 : '##total_dt1##이후, 단위 : 건, (*)는 %임)");
//			section.getParagraph(13).createText();
//			section.getParagraph(13).getText().addString("(누적치 : ’"+totalDay.substring(0,4)+". "+totalDay.substring(4,6)+". "+totalDay.substring(6,8)+"이후, 단위 : 건, (*)는 %임)");
//
			c = section.getParagraph(11).getControlList().get(0);
			table = (ControlTable) c;
			rows = table.getRowList();
			rows.get(2).getCellList().get(1).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)dailyGrid.get(0).get("total_cnt")));
			rows.get(2).getCellList().get(2).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(2).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)dailyGrid.get(0).get("end_cnt")));
			rows.get(2).getCellList().get(3).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(3).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)dailyGrid.get(0).get("ing_cnt")));
			rows.get(2).getCellList().get(4).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(4).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)dailyTotGrid.get(0).get("total_cnt")));
			rows.get(2).getCellList().get(5).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(5).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)dailyTotGrid.get(0).get("end_cnt")));
			rows.get(2).getCellList().get(6).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(6).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)dailyTotGrid.get(0).get("ing_cnt")));
//
//			c = section.getParagraph(16).getControlList().get(0);
//			table = (ControlTable) c;
//			rows = table.getRowList();
//
//			for(int i=0; i<typeAccidentGrid.size(); i++){
//				int k=i+1;
//				rows.get(k).getCellList().get(0).getParagraphList().getParagraph(0).createText();
//				rows.get(k).getCellList().get(0).getParagraphList().getParagraph(0).getText().addString((String)typeAccidentGrid.get(i).get("inci_type_nm"));
//				rows.get(k).getCellList().get(1).getParagraphList().getParagraph(0).createText();
//				rows.get(k).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)typeAccidentGrid.get(i).get("total_cnt")));
//				rows.get(k).getCellList().get(2).getParagraphList().getParagraph(0).createText();
//				rows.get(k).getCellList().get(2).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)typeAccidentGrid.get(i).get("inci_type_inst1")));
//				rows.get(k).getCellList().get(3).getParagraphList().getParagraph(0).createText();
//				rows.get(k).getCellList().get(3).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)typeAccidentGrid.get(i).get("inci_type_inst2")));
//				rows.get(k).getCellList().get(4).getParagraphList().getParagraph(0).createText();
//				rows.get(k).getCellList().get(4).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)typeAccidentGrid.get(i).get("inci_type_inst3")));
//				rows.get(k).getCellList().get(5).getParagraphList().getParagraph(0).createText();
//				rows.get(k).getCellList().get(5).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)typeAccidentGrid.get(i).get("inci_type_inst4")));
//			}
//			section.getParagraph(21).createText();
//			section.getParagraph(21).getText().addString("(누적치 : ’"+totalDay.substring(0,4)+". "+totalDay.substring(4,6)+". "+totalDay.substring(6,8)+"이후, 단위 : 건)");


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
