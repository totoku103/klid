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
import com.klid.common.hwplib.object.HWPFile;
import com.klid.common.hwplib.object.bodytext.Section;
import com.klid.common.hwplib.object.bodytext.control.Control;
import com.klid.common.hwplib.object.bodytext.control.ControlTable;
import com.klid.common.hwplib.object.bodytext.control.ControlType;
import com.klid.common.hwplib.object.bodytext.control.ctrlheader.CtrlHeaderGso;
import com.klid.common.hwplib.object.bodytext.control.ctrlheader.gso.*;
import com.klid.common.hwplib.object.bodytext.control.ctrlheader.sectiondefine.TextDirection;
import com.klid.common.hwplib.object.bodytext.control.gso.textbox.LineChange;
import com.klid.common.hwplib.object.bodytext.control.gso.textbox.TextVerticalAlignment;
import com.klid.common.hwplib.object.bodytext.control.table.*;
import com.klid.common.hwplib.object.bodytext.paragraph.Paragraph;
import com.klid.common.hwplib.object.bodytext.paragraph.charshape.ParaCharShape;
import com.klid.common.hwplib.object.bodytext.paragraph.header.ParaHeader;
import com.klid.common.hwplib.object.bodytext.paragraph.lineseg.LineSegItem;
import com.klid.common.hwplib.object.bodytext.paragraph.lineseg.ParaLineSeg;
import com.klid.common.hwplib.object.bodytext.paragraph.text.ParaText;
import com.klid.common.hwplib.reader.HWPReader;
import com.klid.common.hwplib.writer.HWPWriter;
import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ErrorInfo;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.rpt.reportDaily.dto.ReportDailyDto;
import com.klid.webapp.main.rpt.reportDailyState.persistence.ReportDailyStateMapper;
import com.klid.webapp.main.rpt.reportDailyState.service.ReportDailyStateService;
import com.klid.webapp.main.rpt.reportWeeklyState.service.ReportWeeklyStateService;
import com.klid.webapp.main.sec.noticeBoard.dto.NoticeBoardDto;
import com.klid.webapp.main.sec.noticeBoard.persistence.NoticeBoardMapper;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;

import jakarta.annotation.Resource;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RequestMapping("/api/main/rpt/reportWeeklyState")
@Controller
public class ReportWeeklyStateController {

	@Resource(name = "reportWeeklyStateService")
	private ReportWeeklyStateService service;


	@Resource(name = "noticeBoardMapper")
	private NoticeBoardMapper mapper;

	@Resource(name = "reportDailyStateMapper")
	private ReportDailyStateMapper dailymapper;

	@RequestMapping(value = "getRotationList")
	public @ResponseBody ReturnData getRotationList(@RequestParam Map<String, Object> reqMap) {
			return service.getRotationList(new Criterion(reqMap));
	}

	@RequestMapping(value = "getWeeklyList")
	public @ResponseBody ReturnData getWeeklyList(@RequestParam Map<String, Object> reqMap) {
		return service.getWeeklyList(new Criterion(reqMap));
	}

	@RequestMapping(value = "getTypeAccidentList_before")
	public @ResponseBody ReturnData getWeeklyList_before(@RequestParam Map<String, Object> reqMap) {
		return service.getTypeAccidentList_before(new Criterion(reqMap));
	}

	@RequestMapping(value = "getWeeklyTotList")
	public @ResponseBody ReturnData getWeeklyTotList(@RequestParam Map<String, Object> reqMap) {
		return service.getWeeklyTotList(new Criterion(reqMap));
	}

	@RequestMapping(value = "getTypeAccidentList")
	public @ResponseBody ReturnData getTypeAccidentList(@RequestParam Map<String, Object> reqMap) {
		return service.getTypeAccidentList(new Criterion(reqMap));
	}

	@RequestMapping(value = "getDetectionList")
	public @ResponseBody ReturnData getDetectionList(@RequestParam Map<String, Object> reqMap) {
		return service.getDetectionList(new Criterion(reqMap));
	}

	@RequestMapping(value = "makeReportWeeklyDownload", method = RequestMethod.POST)
	public @ResponseBody ReturnData makeReportWeeklyDownload(@RequestBody Map<String, Object> reqMap, HttpServletResponse response) {

		List<NoticeBoardDto> boardList = mapper.getPeriodBoardList(reqMap);

		List<ReportDailyDto> ncscList = dailymapper.selectReportNcsc(reqMap);

		String localNm = mapper.getInstNmByInstCd(reqMap);

//		String filename = AppGlobal.reportTemplate + "report_weekly_"+reqMap.get("reportType")+"_"+reqMap.get("days")+".hml";
		String filename = AppGlobal.reportTemplate + "new_report_total_"+reqMap.get("reportType")+"_"+reqMap.get("filedays")+".hml";

		HwpmlMaker hmlMaker = new HwpmlMaker(filename, "##", "##");

		String sumEndDt = (String) reqMap.get("endDt");

		String startDt = (String) reqMap.get("startDt");
		String lastweek_dt =  "'"+startDt.substring(2,4)+". "+startDt.substring(4,6)+". "+startDt.substring(6,8);

		String sumDay = (String) reqMap.get("sumDay");
		String total_dt =  "'"+sumDay.substring(2,4)+". "+sumDay.substring(4,6)+". "+sumDay.substring(6,8);

		try {
			SimpleDateFormat dt = new SimpleDateFormat("yyyyMMdd");
			String occr_dt = sumEndDt.substring(0,8);
			Date date = null;
			date = dt.parse(occr_dt);
			String days = String.valueOf(reqMap.get("filedays"));

			if(reqMap.get("reportType").equals("1")) {
				hmlMaker.setParam("cyber_dt", sumEndDt.substring(0, 4) + ". " + sumEndDt.substring(4, 6) + ". " + sumEndDt.substring(6, 8) + ". 08:00");
			}else if(reqMap.get("reportType").equals("2")) {
				hmlMaker.setParam("cyber_dt", sumEndDt.substring(0, 4) + ". " + sumEndDt.substring(4, 6) + ". " + sumEndDt.substring(6, 8) + ". ");
				hmlMaker.setParam("local_nm",localNm);
			}

			if(Integer.parseInt(days)==1){
				String occr_dt0= "'"+startDt.substring(2,4)+". "+startDt.substring(4,6)+". "+startDt.substring(6,8);
				String occr_dt1 = "'"+sumEndDt.substring(2,4)+". "+sumEndDt.substring(4,6)+". "+sumEndDt.substring(6,8);
				if(reqMap.get("reportType").equals("1")) {
					hmlMaker.setParam("occr_dt1", occr_dt0 + ". 08:30" + " ~ " + occr_dt0 + ". 17:30");
					hmlMaker.setParam("occr_dt2", occr_dt0 + ". 17:30" + " ~ " + occr_dt1 + ". 08:30");
				}else if(reqMap.get("reportType").equals("2")) {
					hmlMaker.setParam("occr_dt1", occr_dt0 + ".");
				}
			}else{
				for (int i = Integer.parseInt(days); i > 0; --i) {
					StringBuilder occrDt=new StringBuilder("");
					Calendar c1 = Calendar.getInstance();
					c1.setTime(date);
					occrDt.append(dt.format(c1.getTime()).substring(4,6)+". "+dt.format(c1.getTime()).substring(6,8)+". 08");
					c1.add(Calendar.DATE,-1);
					date = dt.parse(dt.format(c1.getTime()));
					occrDt.insert(0,dt.format(c1.getTime()).substring(4,6)+". "+dt.format(c1.getTime()).substring(6,8)+". 08~");
					if(reqMap.get("reportType").equals("1")) {
						hmlMaker.setParam("occr_dt" + i, occrDt.toString());
					}else if(reqMap.get("reportType").equals("2")) {
						hmlMaker.setParam("occr_dt" + i, occrDt.substring(0,7));
					}
				}
			}

			hmlMaker.setParam("daily_dt", "("+startDt.substring(4,6)+"."+startDt.substring(6,8)+"."+startDt.substring(8,10)+":"+startDt.substring(10,12)+"~"
					+sumEndDt.substring(4,6)+"."+sumEndDt.substring(6,8)+"."+sumEndDt.substring(8,10)+":"+sumEndDt.substring(10,12)+")");
			hmlMaker.setParam("sum_dt", "("+sumDay.substring(4,6)+"."+sumDay.substring(6,8)+"."+sumDay.substring(8,10)+":"+sumDay.substring(10,12)+"~"
					+sumEndDt.substring(4,6)+"."+sumEndDt.substring(6,8)+"."+sumEndDt.substring(8,10)+":"+sumEndDt.substring(10,12)+")");
		}catch (ParseException e){
			e.printStackTrace();
		}

		hmlMaker.setParam("total_dt", total_dt);
		hmlMaker.setParam("total_dt1", total_dt);
		hmlMaker.setParam("lastweek_dt", lastweek_dt);

		ArrayList<LinkedHashMap<String, Integer>> weeklyGrid = (ArrayList) reqMap.get("weeklyGrid");

		hmlMaker.setParam("week0", String.valueOf(stringToComma(weeklyGrid.get(0).get("total_cnt"))));
		hmlMaker.setParam("week1", String.valueOf(stringToComma(weeklyGrid.get(0).get("end_cnt"))));
		hmlMaker.setParam("week2", String.valueOf(stringToComma(weeklyGrid.get(0).get("ing_cnt"))));
		hmlMaker.setParam("end_cnt", String.valueOf(weeklyGrid.get(0).get("b_end_cnt")));

		ArrayList<LinkedHashMap<String, Integer>> weeklyTotGrid = (ArrayList) reqMap.get("weeklyTotGrid");
		hmlMaker.setParam("sum0", String.valueOf(stringToComma(weeklyTotGrid.get(0).get("total_cnt"))));
		hmlMaker.setParam("sum1", String.valueOf(stringToComma(weeklyTotGrid.get(0).get("end_cnt"))));
		hmlMaker.setParam("sum2", String.valueOf(stringToComma(weeklyTotGrid.get(0).get("ing_cnt"))));
		double per = (double)(weeklyTotGrid.get(0).get("end_cnt")*100/(double)weeklyTotGrid.get(0).get("total_cnt"));
		hmlMaker.setParam("per", String.format("%.2f",per)+"%");

		ArrayList<LinkedHashMap<String, Integer>> typeAccidentGrid = (ArrayList) reqMap.get("typeAccidentGrid");
		ArrayList<LinkedHashMap<String, Integer>> typeAccidentGrid_before = (ArrayList) reqMap.get("typeAccidentGrid_before");
		hmlMaker.setParam("tw_cnt0", String.valueOf(stringToComma(typeAccidentGrid.get(0).get("total_cnt"))));
		hmlMaker.setParam("instwA0", String.valueOf(stringToComma(typeAccidentGrid.get(0).get("inci_type_inst1"))));
		hmlMaker.setParam("instwB0", String.valueOf(stringToComma(typeAccidentGrid.get(0).get("inci_type_inst2"))));
		hmlMaker.setParam("instwC0", String.valueOf(stringToComma(typeAccidentGrid.get(0).get("inci_type_inst3"))));
		hmlMaker.setParam("t_sum0", String.valueOf(stringToComma(typeAccidentGrid.get(0).get("sums"))));

		hmlMaker.setParam("tlw_cnt0", String.valueOf(stringToComma(typeAccidentGrid_before.get(0).get("total_cnt"))));
		hmlMaker.setParam("instlwA0", String.valueOf(stringToComma(typeAccidentGrid_before.get(0).get("inci_type_inst1"))));
		hmlMaker.setParam("instlwB0", String.valueOf(stringToComma(typeAccidentGrid_before.get(0).get("inci_type_inst2"))));
		hmlMaker.setParam("instlwC0", String.valueOf(stringToComma(typeAccidentGrid_before.get(0).get("inci_type_inst3"))));
		hmlMaker.setParam("tl_sum0", String.valueOf(stringToComma(typeAccidentGrid_before.get(0).get("sums"))));

		hmlMaker.setParam("tw_cnt1", String.valueOf(stringToComma(typeAccidentGrid.get(1).get("total_cnt"))));
		hmlMaker.setParam("instwA1", String.valueOf(stringToComma(typeAccidentGrid.get(1).get("inci_type_inst1"))));
		hmlMaker.setParam("instwB1", String.valueOf(stringToComma(typeAccidentGrid.get(1).get("inci_type_inst2"))));
		hmlMaker.setParam("instwC1", String.valueOf(stringToComma(typeAccidentGrid.get(1).get("inci_type_inst3"))));
		hmlMaker.setParam("t_sum1", String.valueOf(stringToComma(typeAccidentGrid.get(1).get("sums"))));

		hmlMaker.setParam("tlw_cnt1", String.valueOf(stringToComma(typeAccidentGrid_before.get(1).get("total_cnt"))));
		hmlMaker.setParam("instlwA1", String.valueOf(stringToComma(typeAccidentGrid_before.get(1).get("inci_type_inst1"))));
		hmlMaker.setParam("instlwB1", String.valueOf(stringToComma(typeAccidentGrid_before.get(1).get("inci_type_inst2"))));
		hmlMaker.setParam("instlwC1", String.valueOf(stringToComma(typeAccidentGrid_before.get(1).get("inci_type_inst3"))));
		hmlMaker.setParam("tl_sum1", String.valueOf(stringToComma(typeAccidentGrid_before.get(1).get("sums"))));

		hmlMaker.setParam("tw_cnt2", String.valueOf(stringToComma(typeAccidentGrid.get(2).get("total_cnt"))));
		hmlMaker.setParam("instwA2", String.valueOf(stringToComma(typeAccidentGrid.get(2).get("inci_type_inst1"))));
		hmlMaker.setParam("instwB2", String.valueOf(stringToComma(typeAccidentGrid.get(2).get("inci_type_inst2"))));
		hmlMaker.setParam("instwC2", String.valueOf(stringToComma(typeAccidentGrid.get(2).get("inci_type_inst3"))));
		hmlMaker.setParam("t_sum2", String.valueOf(stringToComma(typeAccidentGrid.get(2).get("sums"))));

		hmlMaker.setParam("tlw_cnt2", String.valueOf(stringToComma(typeAccidentGrid_before.get(2).get("total_cnt"))));
		hmlMaker.setParam("instlwA2", String.valueOf(stringToComma(typeAccidentGrid_before.get(2).get("inci_type_inst1"))));
		hmlMaker.setParam("instlwB2", String.valueOf(stringToComma(typeAccidentGrid_before.get(2).get("inci_type_inst2"))));
		hmlMaker.setParam("instlwC2", String.valueOf(stringToComma(typeAccidentGrid_before.get(2).get("inci_type_inst3"))));
		hmlMaker.setParam("tl_sum2", String.valueOf(stringToComma(typeAccidentGrid_before.get(2).get("sums"))));

		hmlMaker.setParam("tw_cnt3", String.valueOf(stringToComma(typeAccidentGrid.get(3).get("total_cnt"))));
		hmlMaker.setParam("instwA3", String.valueOf(stringToComma(typeAccidentGrid.get(3).get("inci_type_inst1"))));
		hmlMaker.setParam("instwB3", String.valueOf(stringToComma(typeAccidentGrid.get(3).get("inci_type_inst2"))));
		hmlMaker.setParam("instwC3", String.valueOf(stringToComma(typeAccidentGrid.get(3).get("inci_type_inst3"))));
		hmlMaker.setParam("t_sum3", String.valueOf(stringToComma(typeAccidentGrid.get(3).get("sums"))));

		hmlMaker.setParam("tlw_cnt3", String.valueOf(stringToComma(typeAccidentGrid_before.get(3).get("total_cnt"))));
		hmlMaker.setParam("instlwA3", String.valueOf(stringToComma(typeAccidentGrid_before.get(3).get("inci_type_inst1"))));
		hmlMaker.setParam("instlwB3", String.valueOf(stringToComma(typeAccidentGrid_before.get(3).get("inci_type_inst2"))));
		hmlMaker.setParam("instlwC3", String.valueOf(stringToComma(typeAccidentGrid_before.get(3).get("inci_type_inst3"))));
		hmlMaker.setParam("tl_sum3", String.valueOf(stringToComma(typeAccidentGrid_before.get(3).get("sums"))));

		hmlMaker.setParam("tw_cnt4", String.valueOf(stringToComma(typeAccidentGrid.get(4).get("total_cnt"))));
		hmlMaker.setParam("instwA4", String.valueOf(stringToComma(typeAccidentGrid.get(4).get("inci_type_inst1"))));
		hmlMaker.setParam("instwB4", String.valueOf(stringToComma(typeAccidentGrid.get(4).get("inci_type_inst2"))));
		hmlMaker.setParam("instwC4", String.valueOf(stringToComma(typeAccidentGrid.get(4).get("inci_type_inst3"))));
		hmlMaker.setParam("t_sum4", String.valueOf(stringToComma(typeAccidentGrid.get(4).get("sums"))));

		hmlMaker.setParam("tlw_cnt4", String.valueOf(stringToComma(typeAccidentGrid_before.get(4).get("total_cnt"))));
		hmlMaker.setParam("instlwA4", String.valueOf(stringToComma(typeAccidentGrid_before.get(4).get("inci_type_inst1"))));
		hmlMaker.setParam("instlwB4", String.valueOf(stringToComma(typeAccidentGrid_before.get(4).get("inci_type_inst2"))));
		hmlMaker.setParam("instlwC4", String.valueOf(stringToComma(typeAccidentGrid_before.get(4).get("inci_type_inst3"))));
		hmlMaker.setParam("tl_sum4", String.valueOf(stringToComma(typeAccidentGrid_before.get(4).get("sums"))));

		hmlMaker.setParam("tw_cnt5", String.valueOf(stringToComma(typeAccidentGrid.get(5).get("total_cnt"))));
		hmlMaker.setParam("instwA5", String.valueOf(stringToComma(typeAccidentGrid.get(5).get("inci_type_inst1"))));
		hmlMaker.setParam("instwB5", String.valueOf(stringToComma(typeAccidentGrid.get(5).get("inci_type_inst2"))));
		hmlMaker.setParam("instwC5", String.valueOf(stringToComma(typeAccidentGrid.get(5).get("inci_type_inst3"))));
		hmlMaker.setParam("t_sum5", String.valueOf(stringToComma(typeAccidentGrid.get(5).get("sums"))));

		hmlMaker.setParam("tlw_cnt5", String.valueOf(stringToComma(typeAccidentGrid_before.get(5).get("total_cnt"))));
		hmlMaker.setParam("instlwA5", String.valueOf(stringToComma(typeAccidentGrid_before.get(5).get("inci_type_inst1"))));
		hmlMaker.setParam("instlwB5", String.valueOf(stringToComma(typeAccidentGrid_before.get(5).get("inci_type_inst2"))));
		hmlMaker.setParam("instlwC5", String.valueOf(stringToComma(typeAccidentGrid_before.get(5).get("inci_type_inst3"))));
		hmlMaker.setParam("tl_sum5", String.valueOf(stringToComma(typeAccidentGrid_before.get(5).get("sums"))));

		hmlMaker.setParam("tw_cnt6", String.valueOf(stringToComma(typeAccidentGrid.get(6).get("total_cnt"))));
		hmlMaker.setParam("instwA6", String.valueOf(stringToComma(typeAccidentGrid.get(6).get("inci_type_inst1"))));
		hmlMaker.setParam("instwB6", String.valueOf(stringToComma(typeAccidentGrid.get(6).get("inci_type_inst2"))));
		hmlMaker.setParam("instwC6", String.valueOf(stringToComma(typeAccidentGrid.get(6).get("inci_type_inst3"))));
		hmlMaker.setParam("t_sum6",  String.valueOf(stringToComma(typeAccidentGrid.get(6).get("sums"))));

		hmlMaker.setParam("tlw_cnt6", String.valueOf(stringToComma(typeAccidentGrid_before.get(6).get("total_cnt"))));
		hmlMaker.setParam("instlwA6", String.valueOf(stringToComma(typeAccidentGrid_before.get(6).get("inci_type_inst1"))));
		hmlMaker.setParam("instlwB6", String.valueOf(stringToComma(typeAccidentGrid_before.get(6).get("inci_type_inst2"))));
		hmlMaker.setParam("instlwC6", String.valueOf(stringToComma(typeAccidentGrid_before.get(6).get("inci_type_inst3"))));
		hmlMaker.setParam("tl_sum6", String.valueOf(stringToComma(typeAccidentGrid_before.get(6).get("sums"))));

		hmlMaker.setParam("tw_cnt7", String.valueOf(stringToComma(typeAccidentGrid.get(7).get("total_cnt"))));
		hmlMaker.setParam("instwA7", String.valueOf(stringToComma(typeAccidentGrid.get(7).get("inci_type_inst1"))));
		hmlMaker.setParam("instwB7", String.valueOf(stringToComma(typeAccidentGrid.get(7).get("inci_type_inst2"))));
		hmlMaker.setParam("instwC7", String.valueOf(stringToComma(typeAccidentGrid.get(7).get("inci_type_inst3"))));
		hmlMaker.setParam("t_sum7",  String.valueOf(stringToComma(typeAccidentGrid.get(7).get("sums"))));

		hmlMaker.setParam("tlw_cnt7", String.valueOf(stringToComma(typeAccidentGrid_before.get(7).get("total_cnt"))));
		hmlMaker.setParam("instlwA7", String.valueOf(stringToComma(typeAccidentGrid_before.get(7).get("inci_type_inst1"))));
		hmlMaker.setParam("instlwB7", String.valueOf(stringToComma(typeAccidentGrid_before.get(7).get("inci_type_inst2"))));
		hmlMaker.setParam("instlwC7", String.valueOf(stringToComma(typeAccidentGrid_before.get(7).get("inci_type_inst3"))));
		hmlMaker.setParam("tl_sum7", String.valueOf(stringToComma(typeAccidentGrid_before.get(7).get("sums"))));

		hmlMaker.setParam("tw_cnt8", String.valueOf(stringToComma(typeAccidentGrid.get(8).get("total_cnt"))));
		hmlMaker.setParam("instwA8", String.valueOf(stringToComma(typeAccidentGrid.get(8).get("inci_type_inst1"))));
		hmlMaker.setParam("instwB8", String.valueOf(stringToComma(typeAccidentGrid.get(8).get("inci_type_inst2"))));
		hmlMaker.setParam("instwC8", String.valueOf(stringToComma(typeAccidentGrid.get(8).get("inci_type_inst3"))));
		hmlMaker.setParam("t_sum8",  String.valueOf(stringToComma(typeAccidentGrid.get(8).get("sums"))));

		hmlMaker.setParam("tlw_cnt8", String.valueOf(stringToComma(typeAccidentGrid_before.get(8).get("total_cnt"))));
		hmlMaker.setParam("instlwA8", String.valueOf(stringToComma(typeAccidentGrid_before.get(8).get("inci_type_inst1"))));
		hmlMaker.setParam("instlwB8", String.valueOf(stringToComma(typeAccidentGrid_before.get(8).get("inci_type_inst2"))));
		hmlMaker.setParam("instlwC8", String.valueOf(stringToComma(typeAccidentGrid_before.get(8).get("inci_type_inst3"))));
		hmlMaker.setParam("tl_sum8", String.valueOf(stringToComma(typeAccidentGrid_before.get(8).get("sums"))));

		if(reqMap.get("reportType").equals("1")) {
			hmlMaker.setParam("total_dt2", total_dt);
			hmlMaker.setParam("total_dt3", total_dt);
			hmlMaker.setParam("total_dt4", total_dt);
		}else if(reqMap.get("reportType").equals("2")){
			hmlMaker.setParam("instwD0", String.valueOf(stringToComma(typeAccidentGrid.get(0).get("inci_type_inst5"))));
			hmlMaker.setParam("instwD1", String.valueOf(stringToComma(typeAccidentGrid.get(1).get("inci_type_inst5"))));
			hmlMaker.setParam("instwD2", String.valueOf(stringToComma(typeAccidentGrid.get(2).get("inci_type_inst5"))));
			hmlMaker.setParam("instwD3", String.valueOf(stringToComma(typeAccidentGrid.get(3).get("inci_type_inst5"))));
			hmlMaker.setParam("instwD4", String.valueOf(stringToComma(typeAccidentGrid.get(4).get("inci_type_inst5"))));
			hmlMaker.setParam("instwD5", String.valueOf(stringToComma(typeAccidentGrid.get(5).get("inci_type_inst5"))));
			hmlMaker.setParam("instwD6", String.valueOf(stringToComma(typeAccidentGrid.get(6).get("inci_type_inst5"))));
			hmlMaker.setParam("instwD7", String.valueOf(stringToComma(typeAccidentGrid.get(6).get("inci_type_inst5"))));
			hmlMaker.setParam("instwD8", String.valueOf(stringToComma(typeAccidentGrid.get(6).get("inci_type_inst5"))));

			hmlMaker.setParam("instlwD0", String.valueOf(stringToComma(typeAccidentGrid_before.get(0).get("inci_type_inst5"))));
			hmlMaker.setParam("instlwD1", String.valueOf(stringToComma(typeAccidentGrid_before.get(1).get("inci_type_inst5"))));
			hmlMaker.setParam("instlwD2", String.valueOf(stringToComma(typeAccidentGrid_before.get(2).get("inci_type_inst5"))));
			hmlMaker.setParam("instlwD3", String.valueOf(stringToComma(typeAccidentGrid_before.get(3).get("inci_type_inst5"))));
			hmlMaker.setParam("instlwD4", String.valueOf(stringToComma(typeAccidentGrid_before.get(4).get("inci_type_inst5"))));
			hmlMaker.setParam("instlwD5", String.valueOf(stringToComma(typeAccidentGrid_before.get(5).get("inci_type_inst5"))));
			hmlMaker.setParam("instlwD6", String.valueOf(stringToComma(typeAccidentGrid_before.get(6).get("inci_type_inst5"))));
			hmlMaker.setParam("instlwD7", String.valueOf(stringToComma(typeAccidentGrid_before.get(6).get("inci_type_inst5"))));
			hmlMaker.setParam("instlwD8", String.valueOf(stringToComma(typeAccidentGrid_before.get(6).get("inci_type_inst5"))));
		}
		String startNcscDt = (String) reqMap.get("startNcscDt");
		startNcscDt = "'"+startNcscDt.substring(2,4)+". "+startNcscDt.substring(4,6)+". "+startNcscDt.substring(6,8);
		String endNcscDt = (String) reqMap.get("endNcscDt");
		endNcscDt = "'"+endNcscDt.substring(2,4)+". "+endNcscDt.substring(4,6)+". "+endNcscDt.substring(6,8);
		String nisc_dt = startNcscDt+"~"+endNcscDt;

		hmlMaker.setParam("nisc_dt",nisc_dt);
		hmlMaker.setParam("gook_cnt", String.valueOf(stringToComma((int)ncscList.get(0).getNcsc_code_cnt() + (int)ncscList.get(0).getNcsc_etc_cnt())));
		hmlMaker.setParam("worm_cnt", String.valueOf(stringToComma(ncscList.get(0).getNcsc_code_cnt())));
		hmlMaker.setParam("web_cnt", String.valueOf(stringToComma(ncscList.get(0).getNcsc_etc_cnt())));
		hmlMaker.setParam("time", "15:00");
		if(boardList.size()>0) {
			StringBuilder notice_titles = new StringBuilder();
			for (int i = 0; i < boardList.size(); i++) {
				notice_titles.append("- "+boardList.get(i).getBultnTitle().replace("$","\\$").replace("&","\\$")+"</CHAR></TEXT></P><P><TEXT CharShape=\"14\"><CHAR>");
				//notice_titles.append("- "+boardList.get(i).getBultnTitle()+"</CHAR></TEXT></P><P><TEXT CharShape=\"14\"><CHAR>");
			}
			hmlMaker.setParam("notice_title", notice_titles.toString());
		}else{
			hmlMaker.setParam("notice_title", "");
		}
		hmlMaker.setParam("sub_title1", "공격유형별 세부사고현황");
		hmlMaker.setParam("sub_title2", "주간(08∼20)");
		hmlMaker.setParam("sub_title3", "지자체 대표홈페이지 모니터링 내역");
		hmlMaker.setParam("sub_title4", "상세현황");
		hmlMaker.setParam("sub_title5", "비인가접근");
		hmlMaker.setParam("sub_title6", "탐지규칙");
		hmlMaker.setParam("sub_title7", "웜바이러스");
		hmlMaker.setParam("sub_title8", "세부내용 별첨");
		hmlMaker.setParam("sub_title9", "완료율");
		hmlMaker.setParam("sub_title10", "완 료");

		String createTime = DateFormatUtils.format(new Date(), "yyyyMMddHHmmssSSS");

		hmlMaker.saveFile(AppGlobal.homePath+"/export/",createTime+".hwp");
		Map<String, String> resultMap = new HashMap<>();
		resultMap.put("filePath", "/export/" + createTime + ".hwp");
		resultMap.put("fileName", createTime);
		resultMap.put("fileExt", ".hwp");

		return new ReturnData(resultMap);
	}

	public String stringToComma(int req){
		DecimalFormat df = new DecimalFormat("#,###");
		return df.format(req);
	}

}
