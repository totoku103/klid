/**
 * Program Name : NoticeBoardController.java
 *
 * Version  :  3.0
 *
 * Creation Date : 2015. 12. 22.
 * 
 * Programmer Name  : kim dong ju
 *
 * Copyright 2015 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE   : PROGRAMMER : REASON
 */

package com.klid.webapp.main.controller.rpt;

import com.klid.common.AppGlobal;
import com.klid.common.HwpmlMaker;
import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.rpt.reportDailyState.service.ReportDailyStateService;
import com.klid.webapp.main.sec.noticeBoard.dto.NoticeBoardDto;
import com.klid.webapp.main.sec.noticeBoard.persistence.NoticeBoardMapper;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletResponse;
import java.text.DecimalFormat;
import java.util.*;

@RequestMapping("/api/main/rpt/reportDailyState")
@Controller
public class ReportDailyStateController {

	@Resource(name = "reportDailyStateService")
	private ReportDailyStateService service;

	@Resource(name = "noticeBoardMapper")
	private NoticeBoardMapper mapper;

	@RequestMapping(value = "getRotationList")
	public @ResponseBody ReturnData getRotationList(@RequestParam Map<String, Object> reqMap) {
		return service.getRotationList(new Criterion(reqMap));
	}

	@RequestMapping(value = "getDailyList")
	public @ResponseBody ReturnData getDailyList(@RequestParam Map<String, Object> reqMap) {
		return service.getDailyList(new Criterion(reqMap));
	}

	@RequestMapping(value = "getDailyTotList")
	public @ResponseBody ReturnData getDailyTotList(@RequestParam Map<String, Object> reqMap) {
		return service.getDailyTotList(new Criterion(reqMap));
	}

	@RequestMapping(value = "getTypeAccidentList")
	public @ResponseBody ReturnData getTypeAccidentList(@RequestParam Map<String, Object> reqMap) {
			return service.getTypeAccidentList(new Criterion(reqMap));
	}

	@RequestMapping(value = "getDetectionList")
	public @ResponseBody ReturnData getDetectionList(@RequestParam Map<String, Object> reqMap) {
		return service.getDetectionList(new Criterion(reqMap));
	}

	@RequestMapping(value = "makeReportDailyStateDownload", method = RequestMethod.POST)
	public @ResponseBody ReturnData makeReportDailyStateDownload(@RequestBody Map<String, Object> reqMap, HttpServletResponse response) {

		List<NoticeBoardDto> boardList = mapper.getPeriodBoardList(reqMap);

		String instNm = mapper.getInstNmByInstCd(reqMap);

		String filename = AppGlobal.reportTemplate + "new_report_daily_"+reqMap.get("reportType")+".hml";

		HwpmlMaker hmlMaker = new HwpmlMaker(filename, "##", "##");

		String startDt = (String) reqMap.get("startDt");
		String endDt = (String) reqMap.get("endDt");
		String cyber_dt="";
		if(reqMap.get("reportType").equals("1")) {
			cyber_dt = "'" + endDt.substring(0, 4) + ". " + endDt.substring(4, 6) + ". " + endDt.substring(6, 8) + ". 08:00";
		}else if(reqMap.get("reportType").equals("2")) {
			cyber_dt = "'" + endDt.substring(0, 4) + ". " + endDt.substring(4, 6) + ". " + endDt.substring(6, 8) + ".";
			hmlMaker.setParam("local_nm", instNm);
		}
		hmlMaker.setParam("cyber_dt", cyber_dt);

		String occr_dt0= "'"+startDt.substring(2,4)+". "+startDt.substring(4,6)+". "+startDt.substring(6,8);
		String occr_dt1 = "'"+endDt.substring(2,4)+". "+endDt.substring(4,6)+". "+endDt.substring(6,8);

		String sumDay = (String) reqMap.get("sumDay");
		String sumEndDt = (String) reqMap.get("sumEndDt");
		String total_dt1= sumDay.substring(2,4)+". "+sumDay.substring(4,6)+". "+sumDay.substring(6,8)+"";

		hmlMaker.setParam("occr_dt1", occr_dt0+". 08:30"+" ~ "+occr_dt0+". 17:30");
		hmlMaker.setParam("occr_dt2", occr_dt0+". 17:30"+" ~ "+occr_dt1+". 08:30");
		hmlMaker.setParam("total_dt1", total_dt1);

		hmlMaker.setParam("daily_dt", "("+startDt.substring(4,6)+"."+startDt.substring(6,8)+"."+startDt.substring(8,10)+":"+startDt.substring(10,12)+"~"
		+endDt.substring(4,6)+"."+endDt.substring(6,8)+"."+endDt.substring(8,10)+":"+endDt.substring(10,12)+")");
		hmlMaker.setParam("sum_dt", "("+sumDay.substring(4,6)+"."+sumDay.substring(6,8)+"."+sumDay.substring(8,10)+":"+sumDay.substring(10,12)+"~"
				+sumEndDt.substring(4,6)+"."+sumEndDt.substring(6,8)+"."+sumEndDt.substring(8,10)+":"+sumEndDt.substring(10,12)+")");

		ArrayList<LinkedHashMap<String, Integer>> dailyGrid = (ArrayList) reqMap.get("dailyGrid");

		hmlMaker.setParam("day0", String.valueOf(stringToComma((int)dailyGrid.get(0).get("total_cnt"))));
		hmlMaker.setParam("day1", String.valueOf(stringToComma((int)dailyGrid.get(0).get("end_cnt"))));
		hmlMaker.setParam("day2", String.valueOf(stringToComma((int)dailyGrid.get(0).get("ing_cnt"))));
		hmlMaker.setParam("end_cnt", String.valueOf(stringToComma((int)dailyGrid.get(0).get("t_end_cnt"))));

		ArrayList<LinkedHashMap<String, Integer>> dailyTotGrid = (ArrayList) reqMap.get("dailyTotGrid");

		hmlMaker.setParam("sum0", String.valueOf(stringToComma((int)dailyTotGrid.get(0).get("total_cnt"))));
		hmlMaker.setParam("sum1", String.valueOf(stringToComma((int)dailyTotGrid.get(0).get("end_cnt"))));
		hmlMaker.setParam("sum2", String.valueOf(stringToComma((int)dailyTotGrid.get(0).get("ing_cnt"))));
		double per = (double)(dailyTotGrid.get(0).get("end_cnt")*100/(double)dailyTotGrid.get(0).get("total_cnt"));
		hmlMaker.setParam("per", String.format("%.1f",per)+"%");

		ArrayList<LinkedHashMap<String, Integer>> grid = (ArrayList) reqMap.get("typeAccidentGrid");

		hmlMaker.setParam("t_cnt0", String.valueOf(stringToComma((int)grid.get(0).get("total_cnt"))));
		hmlMaker.setParam("instA0", String.valueOf(stringToComma((int)grid.get(0).get("inci_type_inst1"))));
		hmlMaker.setParam("instB0", String.valueOf(stringToComma((int)grid.get(0).get("inci_type_inst2"))));
		hmlMaker.setParam("instC0", String.valueOf(stringToComma((int)grid.get(0).get("inci_type_inst3"))));
		hmlMaker.setParam("t_sum0", String.valueOf(stringToComma((int)grid.get(0).get("sums"))));

		hmlMaker.setParam("t_cnt1", String.valueOf(stringToComma((int)grid.get(1).get("total_cnt"))));
		hmlMaker.setParam("instA1", String.valueOf(stringToComma((int)grid.get(1).get("inci_type_inst1"))));
		hmlMaker.setParam("instB1", String.valueOf(stringToComma((int)grid.get(1).get("inci_type_inst2"))));
		hmlMaker.setParam("instC1", String.valueOf(stringToComma((int)grid.get(1).get("inci_type_inst3"))));
		hmlMaker.setParam("t_sum1", String.valueOf(stringToComma((int)grid.get(1).get("sums"))));

		hmlMaker.setParam("t_cnt2", String.valueOf(stringToComma((int)grid.get(2).get("total_cnt"))));
		hmlMaker.setParam("instA2", String.valueOf(stringToComma((int)grid.get(2).get("inci_type_inst1"))));
		hmlMaker.setParam("instB2", String.valueOf(stringToComma((int)grid.get(2).get("inci_type_inst2"))));
		hmlMaker.setParam("instC2", String.valueOf(stringToComma((int)grid.get(2).get("inci_type_inst3"))));
		hmlMaker.setParam("t_sum2", String.valueOf(grid.get(2).get("sums")));

		hmlMaker.setParam("t_cnt3", String.valueOf(stringToComma((int)grid.get(3).get("total_cnt"))));
		hmlMaker.setParam("instA3", String.valueOf(stringToComma((int)grid.get(3).get("inci_type_inst1"))));
		hmlMaker.setParam("instB3", String.valueOf(stringToComma((int)grid.get(3).get("inci_type_inst2"))));
		hmlMaker.setParam("instC3", String.valueOf(stringToComma((int)grid.get(3).get("inci_type_inst3"))));
		hmlMaker.setParam("t_sum3", String.valueOf(stringToComma((int)grid.get(3).get("sums"))));

		hmlMaker.setParam("t_cnt4", String.valueOf(stringToComma((int)grid.get(4).get("total_cnt"))));
		hmlMaker.setParam("instA4", String.valueOf(stringToComma((int)grid.get(4).get("inci_type_inst1"))));
		hmlMaker.setParam("instB4", String.valueOf(stringToComma((int)grid.get(4).get("inci_type_inst2"))));
		hmlMaker.setParam("instC4", String.valueOf(stringToComma((int)grid.get(4).get("inci_type_inst3"))));
		hmlMaker.setParam("t_sum4", String.valueOf(stringToComma((int)grid.get(4).get("sums"))));

		hmlMaker.setParam("t_cnt5", String.valueOf(stringToComma((int)grid.get(5).get("total_cnt"))));
		hmlMaker.setParam("instA5", String.valueOf(stringToComma((int)grid.get(5).get("inci_type_inst1"))));
		hmlMaker.setParam("instB5", String.valueOf(stringToComma((int)grid.get(5).get("inci_type_inst2"))));
		hmlMaker.setParam("instC5", String.valueOf(stringToComma((int)grid.get(5).get("inci_type_inst3"))));
		hmlMaker.setParam("t_sum5", String.valueOf(stringToComma((int)grid.get(5).get("sums"))));

		hmlMaker.setParam("t_cnt6", String.valueOf(stringToComma((int)grid.get(6).get("total_cnt"))));
		hmlMaker.setParam("instA6", String.valueOf(stringToComma((int)grid.get(6).get("inci_type_inst1"))));
		hmlMaker.setParam("instB6", String.valueOf(stringToComma((int)grid.get(6).get("inci_type_inst2"))));
		hmlMaker.setParam("instC6", String.valueOf(stringToComma((int)grid.get(6).get("inci_type_inst3"))));
		hmlMaker.setParam("t_sum6", String.valueOf(stringToComma((int)grid.get(6).get("sums"))));

		//7분류 -3종 추가
		hmlMaker.setParam("t_cnt7", String.valueOf(stringToComma((int)grid.get(7).get("total_cnt"))));
		hmlMaker.setParam("instA7", String.valueOf(stringToComma((int)grid.get(7).get("inci_type_inst1"))));
		hmlMaker.setParam("instB7", String.valueOf(stringToComma((int)grid.get(7).get("inci_type_inst2"))));
		hmlMaker.setParam("instC7", String.valueOf(stringToComma((int)grid.get(7).get("inci_type_inst3"))));
		hmlMaker.setParam("t_sum7", String.valueOf(stringToComma((int)grid.get(7).get("sums"))));

		hmlMaker.setParam("t_cnt8", String.valueOf(stringToComma((int)grid.get(8).get("total_cnt"))));
		hmlMaker.setParam("instA8", String.valueOf(stringToComma((int)grid.get(8).get("inci_type_inst1"))));
		hmlMaker.setParam("instB8", String.valueOf(stringToComma((int)grid.get(8).get("inci_type_inst2"))));
		hmlMaker.setParam("instC8", String.valueOf(stringToComma((int)grid.get(8).get("inci_type_inst3"))));
		hmlMaker.setParam("t_sum8", String.valueOf(stringToComma((int)grid.get(8).get("sums"))));


		if(reqMap.get("reportType").equals("1")){
			hmlMaker.setParam("gook_cnt", String.valueOf(stringToComma((int)grid.get(0).get("ncsc_code_cnt") + (int)grid.get(0).get("ncsc_etc_cnt"))));
			hmlMaker.setParam("worm_cnt", String.valueOf(stringToComma(grid.get(0).get("ncsc_code_cnt"))));
			hmlMaker.setParam("web_cnt", String.valueOf(stringToComma(grid.get(0).get("ncsc_etc_cnt"))));
			hmlMaker.setParam("total_dt2", total_dt1);
			hmlMaker.setParam("total_dt3", total_dt1);
			hmlMaker.setParam("total_dt4", total_dt1);
			hmlMaker.setParam("time", "15:00");
		}else if(reqMap.get("reportType").equals("2")){
			hmlMaker.setParam("instD0", String.valueOf(stringToComma(grid.get(0).get("inci_type_inst5"))));
			hmlMaker.setParam("instD1", String.valueOf(stringToComma(grid.get(1).get("inci_type_inst5"))));
			hmlMaker.setParam("instD2", String.valueOf(stringToComma(grid.get(2).get("inci_type_inst5"))));
			hmlMaker.setParam("instD3", String.valueOf(stringToComma(grid.get(3).get("inci_type_inst5"))));
			hmlMaker.setParam("instD4", String.valueOf(stringToComma(grid.get(4).get("inci_type_inst5"))));
			hmlMaker.setParam("instD5", String.valueOf(stringToComma(grid.get(5).get("inci_type_inst5"))));
			hmlMaker.setParam("instD6", String.valueOf(stringToComma(grid.get(6).get("inci_type_inst5"))));
			hmlMaker.setParam("instD7", String.valueOf(stringToComma(grid.get(6).get("inci_type_inst5"))));
			hmlMaker.setParam("instD8", String.valueOf(stringToComma(grid.get(6).get("inci_type_inst5"))));
		}

		hmlMaker.setParam("sub_title1", "탐지규칙 최적화");

		if(boardList.size()>0) {
			StringBuilder notice_titles = new StringBuilder();
			for (int i = 0; i < boardList.size(); i++) {
				//notice_titles.append("- "+boardList.get(i).getBultnTitle()+"</CHAR></TEXT></P><P><TEXT CharShape=\"14\"><CHAR>");
				notice_titles.append("- "+boardList.get(i).getBultnTitle().replace("$","\\$").replace("&","\\$")+"</CHAR></TEXT></P><P><TEXT CharShape=\"14\"><CHAR>");
			}
			hmlMaker.setParam("notice_title", notice_titles.toString());
		}else{
			hmlMaker.setParam("notice_title", "");
		}

		String createTime = DateFormatUtils.format(new Date(), "yyyyMMddHHmmssSSS");

		hmlMaker.saveFile(AppGlobal.homePath+"/export/",createTime+".hwp");
		Map<String, String> resultMap = new HashMap<>();
		resultMap.put("filePath", "/export/" + createTime + ".hwp");
		resultMap.put("fileName", createTime);
		resultMap.put("fileExt", ".hwp");

		return new ReturnData(resultMap);

//		return service.makeReportDailyStateDownload(new Criterion(reqMap));
	}

	public String stringToComma(int req){
		DecimalFormat df = new DecimalFormat("#,###");
		return df.format(req);
	}
}
