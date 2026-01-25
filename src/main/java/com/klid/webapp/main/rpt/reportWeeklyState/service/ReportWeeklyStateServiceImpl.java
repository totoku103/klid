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
package com.klid.webapp.main.rpt.reportWeeklyState.service;

import com.klid.common.AppGlobal;
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
import com.klid.webapp.main.rpt.reportDaily.dto.ReportDailyDto;
import com.klid.webapp.main.rpt.reportWeeklyState.dto.ReportWeeklyStateDto;
import com.klid.webapp.main.rpt.reportWeeklyState.persistence.ReportWeeklyStateMapper;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.stereotype.Service;

import jakarta.annotation.Resource;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service("reportWeeklyStateService")
public class ReportWeeklyStateServiceImpl extends MsgService implements ReportWeeklyStateService {

	@Resource(name = "reportWeeklyStateMapper")
	private ReportWeeklyStateMapper mapper;

	/** 일일 실적 사고처리 현황 조회 */
	@Override
	public ReturnData getRotationList(Criterion criterion) {
		return new ReturnData(mapper.getRotationList(criterion.getCondition()));
	}

	/** 일주 실적 사고처리 현황  조회 */
	@Override
	public ReturnData getWeeklyList(Criterion criterion) {

		try{
            List<ReportDailyDto> result1 = mapper.selectReportWeekStat(criterion.getCondition());

			String startDt = criterion.getValue("startDt").toString();
			String endDt = criterion.getValue("endDt").toString();

			List<ReportDailyDto> result3=mapper.selectReportWeekSum(criterion.getCondition());

			SimpleDateFormat dt = new SimpleDateFormat("yyyyMMddHHmmss");
			Date startDate = dt.parse(startDt);
			Date endDate = dt.parse(endDt);

			Calendar c = Calendar.getInstance();
			c.setTime(startDate);
			c.add(Calendar.DATE, -7);
			criterion.addParam("startDt", dt.format(c.getTime()));

			c.setTime(endDate);
			c.add(Calendar.DATE, -7);
			criterion.addParam("endDt", dt.format(c.getTime()));



//            List<ReportDailyDto> result2 = mapper.selectReportWeekStat(criterion.getCondition());
			result1.get(0).setB_end_cnt(result3.get(0).getSums());

//            for(ReportDailyDto item : result2){
//                result1.get(0).setB_total_cnt(item.getTotal_cnt());
//                result1.get(0).setB_end_cnt(item.getEnd_cnt());
//                result1.get(0).setB_ing_cnt(item.getIng_cnt());
//            }

			return new ReturnData(result1);
		} catch (Exception e){
		    e.getStackTrace();
			return new ReturnData(new ErrorInfo("처리중 오류가 발생했습니다."));
		}
	}

	/** 이전 일주일 리스트 조회 */
	@Override
	public ReturnData getTypeAccidentList_before(Criterion criterion) {

		try{
			String startDt = criterion.getValue("startDt").toString();
			String endDt = criterion.getValue("endDt").toString();

			SimpleDateFormat dt = new SimpleDateFormat("yyyyMMddHHmmss");
			Date startDate = dt.parse(startDt);
			Date endDate = dt.parse(endDt);

			Calendar c = Calendar.getInstance();
			c.setTime(startDate);
			c.add(Calendar.DATE, -7);
			criterion.addParam("startDt", dt.format(c.getTime()));

			c.setTime(endDate);
			c.add(Calendar.DATE, -7);
			criterion.addParam("endDt", dt.format(c.getTime()));
			c.add(Calendar.DATE, -1);
			criterion.addParam("sumEndDt", dt.format(c.getTime()));

			List<ReportDailyDto> sumVal = mapper.selectReportTypeSum(criterion.getCondition());
			List<ReportDailyDto> result1 = mapper.selectReportWeekType(criterion.getCondition());

			for(int i = 0 ; i < result1.size() ; i++){
				result1.get(i).setSums(sumVal.get(i).getSums());
			}//for end

			return new ReturnData(result1);
		} catch (Exception e){
			e.getStackTrace();
			return new ReturnData(new ErrorInfo("처리중 오류가 발생했습니다."));
		}
	}

	/** 일주 실적 사고처리 현황  누계 조회 */
	@Override
	public ReturnData getWeeklyTotList(Criterion criterion) {
		return new ReturnData(mapper.selectReportYearSumStat(criterion.getCondition()));
	}

	/**  유형별 사고내역  일주 조회  */
	@Override
	public ReturnData getTypeAccidentList(Criterion criterion) {

		try{
			String sumEndDt = criterion.getValue("sumEndDt").toString();

			SimpleDateFormat dt = new SimpleDateFormat("yyyyMMddHHmmss");
			Date endDate = dt.parse(sumEndDt);

			Calendar c = Calendar.getInstance();
			c.setTime(endDate);
			c.add(Calendar.DATE, -7);

			List<ReportDailyDto> sumVal = mapper.selectReportTypeSum(criterion.getCondition());
			List<ReportDailyDto> result1 = mapper.selectReportWeekType(criterion.getCondition());

			for(int i = 0 ; i < result1.size() ; i++){
				result1.get(i).setSums(sumVal.get(i).getSums());
			}//for end

			return new ReturnData(result1);
		} catch(Exception e){
			e.getStackTrace();
			return new ReturnData(new ErrorInfo("처리중 오류가 발생했습니다."));
		}
	}

	/** 일일 실적 사고처리 현황 조회 */
	@Override
	public ReturnData getDetectionList(Criterion criterion) {
		return new ReturnData(mapper.getDetectionList(criterion.getCondition()));
	}

	@Override
	public ReturnData makeReportWeeklyDownload(Criterion criterion) {
		try {
			Map<String, Object> reqMap = criterion.getCondition();

			String filename = AppGlobal.reportTemplate+"/report_weekly.hwp";
			HWPFile hwpFile = HWPReader.fromFile(filename);
			Section section = hwpFile.getBodyText().getSectionList().get(0);

			Control c = section.getParagraph(1).getControlList().get(0);
			ControlTable table = (ControlTable) c;

			SimpleDateFormat dt = new SimpleDateFormat("yyyyMMdd");
			Date date = dt.parse(reqMap.get("sumEndDt").toString());

			ArrayList<Row> rows = table.getRowList();
			for(int i=7; i>0; i--){
				Calendar c1 = Calendar.getInstance();
				c1.setTime(date);
				c1.add(Calendar.DATE,-1);
				date = dt.parse(dt.format(c1.getTime()));
				rows.get(i).getCellList().get(2).getParagraphList().getParagraph(0).createText();
				rows.get(i).getCellList().get(2).getParagraphList().getParagraph(0).getText().addString(dt.format(c1.getTime()).substring(0,4)+". "+dt.format(c1.getTime()).substring(4,6)+". "+dt.format(c1.getTime()).substring(6,8));
			}

			String totalDay = (String)reqMap.get("sumDay");
			section.getParagraph(4).getText().addString("(누적치 : ’"+totalDay.substring(0,4)+". "+totalDay.substring(4,6)+". "+totalDay.substring(6,8)+"이후, 단위 : 건, (*)는 %임)");

			ArrayList<LinkedHashMap> weeklyGrid = (ArrayList)reqMap.get("weeklyGrid");
			ArrayList<LinkedHashMap> weeklyTotGrid = (ArrayList)reqMap.get("weeklyTotGrid");
			ArrayList<LinkedHashMap> typeAccidentGrid = (ArrayList)reqMap.get("typeAccidentGrid");

			c = section.getParagraph(5).getControlList().get(0);
			table = (ControlTable) c;
			rows = table.getRowList();
			rows.get(2).getCellList().get(1).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)weeklyGrid.get(0).get("total_cnt")));
			rows.get(2).getCellList().get(2).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(2).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)weeklyGrid.get(0).get("end_cnt")));
			rows.get(2).getCellList().get(3).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(3).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)weeklyGrid.get(0).get("ing_cnt")));
			rows.get(2).getCellList().get(4).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(4).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)weeklyTotGrid.get(0).get("total_cnt")));
			rows.get(2).getCellList().get(5).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(5).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)weeklyTotGrid.get(0).get("end_cnt")));
			rows.get(2).getCellList().get(6).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(6).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)weeklyTotGrid.get(0).get("ing_cnt")));

			section.getParagraph(10).createText();
			section.getParagraph(10).getText().addString("(누적치 : ’"+totalDay.substring(0,4)+". "+totalDay.substring(4,6)+". "+totalDay.substring(6,8)+"이후, 단위 : 건, (*)는 %임)");

			c = section.getParagraph(11).getControlList().get(0);
			table = (ControlTable) c;
			rows = table.getRowList();
			rows.get(2).getCellList().get(1).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)weeklyGrid.get(0).get("total_cnt")));
			rows.get(2).getCellList().get(2).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(2).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)weeklyGrid.get(0).get("end_cnt")));
			rows.get(2).getCellList().get(3).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(3).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)weeklyGrid.get(0).get("ing_cnt")));
			rows.get(2).getCellList().get(4).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(4).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)weeklyTotGrid.get(0).get("total_cnt")));
			rows.get(2).getCellList().get(5).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(5).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)weeklyTotGrid.get(0).get("end_cnt")));
			rows.get(2).getCellList().get(6).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(6).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)weeklyTotGrid.get(0).get("ing_cnt")));

			c = section.getParagraph(15).getControlList().get(0);
			table = (ControlTable) c;
			rows = table.getRowList();

			for(int i=0; i<typeAccidentGrid.size(); i++){
				int k=i+1;
				rows.get(k).getCellList().get(0).getParagraphList().getParagraph(0).createText();
				rows.get(k).getCellList().get(0).getParagraphList().getParagraph(0).getText().addString((String)typeAccidentGrid.get(i).get("inci_type_nm"));
				rows.get(k).getCellList().get(1).getParagraphList().getParagraph(0).createText();
				rows.get(k).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)typeAccidentGrid.get(i).get("total_cnt")));
				rows.get(k).getCellList().get(2).getParagraphList().getParagraph(0).createText();
				rows.get(k).getCellList().get(2).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)typeAccidentGrid.get(i).get("inci_type_inst1")));
				rows.get(k).getCellList().get(3).getParagraphList().getParagraph(0).createText();
				rows.get(k).getCellList().get(3).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)typeAccidentGrid.get(i).get("inci_type_inst2")));
				rows.get(k).getCellList().get(4).getParagraphList().getParagraph(0).createText();
				rows.get(k).getCellList().get(4).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)typeAccidentGrid.get(i).get("inci_type_inst3")));
				rows.get(k).getCellList().get(5).getParagraphList().getParagraph(0).createText();
				rows.get(k).getCellList().get(5).getParagraphList().getParagraph(0).getText().addString(String.valueOf((int)typeAccidentGrid.get(i).get("inci_type_inst4")));
			}

			section.getParagraph(22).createText();
			section.getParagraph(22).getText().addString("(누적치 : ’"+totalDay.substring(0,4)+". "+totalDay.substring(4,6)+". "+totalDay.substring(6,8)+"이후, 단위 : 건)");

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
