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
import com.klid.webapp.common.ErrorInfo;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.rpt.reportDailyInciState.service.ReportDailyInciStateService;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FileUtils;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.*;
import java.text.DecimalFormat;
import java.util.*;

@RequestMapping("/api/main/rpt/reportDailyInciState")
@Controller
public class ReportDailyInciStateController {



	@Resource(name = "reportDailyInciStateService")
	private ReportDailyInciStateService service;

	@RequestMapping(value = "getDailyList")
	public @ResponseBody ReturnData getDailyList(@RequestParam Map<String, Object> reqMap) {
        return service.getDailyList(new Criterion(reqMap));
	}

	@RequestMapping(value = "getDailyTotList")
	public @ResponseBody ReturnData getDailyTotList(@RequestParam Map<String, Object> reqMap) {
			return service.getDailyTotList(new Criterion(reqMap));
	}
	@RequestMapping(value = "saveHighChartImg",method = RequestMethod.POST)
	public @ResponseBody ReturnData saveHighChartImg(@RequestBody Map<String, Object> reqMap, HttpServletRequest request, HttpServletResponse response) {
		try {
			String fname = (String)reqMap.get("fname");
			String imgData = (String)reqMap.get("imgData");
			imgData = imgData.replace("data:image/png;base64,", "");
			byte[] byteData = Base64.decodeBase64(imgData.getBytes());
			String imgpath=AppGlobal.uploadPath+"/"+fname;
			FileUtils.writeByteArrayToFile(new File(imgpath), byteData);
			return new ReturnData();
		} catch (IOException e) {
			e.printStackTrace();
			return  new ReturnData(new ErrorInfo(e));
		}catch (Exception e){
			e.printStackTrace();
			return  new ReturnData(new ErrorInfo(e));
		}
	}

	@RequestMapping(value = "makeReportDailyInciStateDownload", method = RequestMethod.POST)
	public @ResponseBody ReturnData makeReportDailyInciStateDownload(@RequestBody Map<String, Object> reqMap, HttpServletResponse response) {

		String filename = AppGlobal.reportTemplate + "new_report_daily_inci.hml";

		if(reqMap.get("sAuthMain").equals("AUTH_MAIN_3")){
			filename = AppGlobal.reportTemplate + "new_report_daily_inci_sido.hml";
		}

		HwpmlMaker hmlMaker = new HwpmlMaker(filename, "##", "##");

		ArrayList<LinkedHashMap<String, Integer>> dailyGrid = (ArrayList) reqMap.get("dailyGrid");

		ArrayList<LinkedHashMap<String, Integer>> dailyTotGrid = (ArrayList) reqMap.get("dailyTotGrid");

		if(reqMap.get("sAuthMain").equals("AUTH_MAIN_3")){
			hmlMaker.insertTableRow("tb1","row1",dailyGrid.size()-1);
		}


			for (int i = 0; i < dailyGrid.size(); i++) {
				double per = (double) (dailyTotGrid.get(i).get("end_cnt") * 100 / (double) dailyTotGrid.get(i).get("total_cnt"));
				if(dailyTotGrid.get(i).get("total_cnt").equals(0))
					per=0;

				hmlMaker.setParam("name" + i, String.valueOf(dailyGrid.get(i).get("inst_nm")));
				hmlMaker.setParam("cnt" + i, dailyGrid.get(i).get("total_cnt").toString());
				hmlMaker.setParam("end" + i, dailyGrid.get(i).get("end_cnt").toString());
				hmlMaker.setParam("sum" + i, dailyGrid.get(i).get("ing_cnt").toString());

				hmlMaker.setParam("s_t" + i, String.valueOf(stringToComma(dailyTotGrid.get(i).get("total_cnt"))));
				hmlMaker.setParam("s_e" + i, String.valueOf(stringToComma(dailyTotGrid.get(i).get("end_cnt"))));
				hmlMaker.setParam("s_p" + i, String.format("%.1f", per) + "%");
				hmlMaker.setParam("s_i" + i, String.valueOf(stringToComma(dailyTotGrid.get(i).get("ing_cnt"))));
			}


		//"endDt" -> "20190124060000" "startDt" -> "20190125055959"
		String strEndDt = reqMap.get("endDt").toString();
		String strStartDt = reqMap.get("startDt").toString();
		hmlMaker.setParam("daily_dt","('"+strEndDt.substring(2,4)+"."+strEndDt.substring(4,6)+"."+strEndDt.substring(6,8)+"."+strEndDt.substring(8,10)+":"+strEndDt.substring(10,12)+"~"
				+strStartDt.substring(4,6)+"."+strStartDt.substring(6,8)+"."+strStartDt.substring(8,10)+":"+strStartDt.substring(10,12)+")");
		hmlMaker.setParam("daily_dt1","('"+strEndDt.substring(2,4)+"."+strEndDt.substring(4,6)+"."+strEndDt.substring(6,8)+"."+strEndDt.substring(8,10)+":"+strEndDt.substring(10,12)+"~"
				+strStartDt.substring(4,6)+"."+strStartDt.substring(6,8)+"."+strStartDt.substring(8,10)+":"+strStartDt.substring(10,12)+")");
		//"sumStartDt" -> "20190101060000" "sumEndDt" -> "20190125055959"
		String strSumStartDt = reqMap.get("sumStartDt").toString();
		String strSumEndDt = reqMap.get("sumEndDt").toString();
		hmlMaker.setParam("sum_dt","('"+strSumStartDt.substring(2,4)+"."+strSumStartDt.substring(4,6)+"."+strSumStartDt.substring(6,8)+"."+strSumStartDt.substring(8,10)+":"+strSumStartDt.substring(10,12)+"~"
				+strSumEndDt.substring(4,6)+"."+strSumEndDt.substring(6,8)+"."+strSumEndDt.substring(8,10)+":"+strSumEndDt.substring(10,12)+")");
		hmlMaker.setParam("sum_dt1","('"+strSumStartDt.substring(2,4)+"."+strSumStartDt.substring(4,6)+"."+strSumStartDt.substring(6,8)+"."+strSumStartDt.substring(8,10)+":"+strSumStartDt.substring(10,12)+"~"
				+strSumEndDt.substring(4,6)+"."+strSumEndDt.substring(6,8)+"."+strSumEndDt.substring(8,10)+":"+strSumEndDt.substring(10,12)+")");

//		StringBuilder rowData = new StringBuilder("");
//
//		for(int i=1; i< dailyGrid.size(); i++){
//			int row = i+2;
//			double per = (double)(dailyTotGrid.get(i).get("end_cnt")*100/(double)dailyTotGrid.get(i).get("total_cnt"));
//			rowData.append("<ROW>\n" +
//					"    <CELL BorderFill=\"33\" ColAddr=\"0\" ColSpan=\"1\" Dirty=\"false\" Editable=\"false\" HasMargin=\"false\" Header=\"false\"\n" +
//					"          Height=\"2759\" Protect=\"false\" RowAddr=\""+row+"\" RowSpan=\"1\" Width=\"7119\">\n" +
//					"        <PARALIST LineWrap=\"Break\" LinkListID=\"0\" LinkListIDNext=\"0\" TextDirection=\"0\" VertAlign=\"Center\">\n" +
//					"            <P ParaShape=\"16\" Style=\"0\">\n" +
//					"                <TEXT CharShape=\"14\">\n" +
//					"                    <CHAR>"+String.valueOf(dailyGrid.get(i).get("inst_nm"))+"</CHAR>\n" +
//					"                </TEXT>\n" +
//					"            </P>\n" +
//					"        </PARALIST>\n" +
//					"    </CELL>\n" +
//					"    <CELL BorderFill=\"34\" ColAddr=\"1\" ColSpan=\"1\" Dirty=\"false\" Editable=\"false\" HasMargin=\"false\" Header=\"false\"\n" +
//					"          Height=\"2759\" Protect=\"false\" RowAddr=\""+row+"\" RowSpan=\"1\" Width=\"5227\">\n" +
//					"        <PARALIST LineWrap=\"Break\" LinkListID=\"0\" LinkListIDNext=\"0\" TextDirection=\"0\" VertAlign=\"Center\">\n" +
//					"            <P ParaShape=\"17\" Style=\"0\">\n" +
//					"                <TEXT CharShape=\"14\">\n" +
//					"                    <CHAR>"+dailyGrid.get(i).get("total_cnt").toString()+"</CHAR>\n" +
//					"                </TEXT>\n" +
//					"            </P>\n" +
//					"        </PARALIST>\n" +
//					"    </CELL>\n" +
//					"    <CELL BorderFill=\"34\" ColAddr=\"2\" ColSpan=\"1\" Dirty=\"false\" Editable=\"false\" HasMargin=\"false\" Header=\"false\"\n" +
//					"          Height=\"2759\" Protect=\"false\" RowAddr=\""+row+"\" RowSpan=\"1\" Width=\"5510\">\n" +
//					"        <PARALIST LineWrap=\"Break\" LinkListID=\"0\" LinkListIDNext=\"0\" TextDirection=\"0\" VertAlign=\"Center\">\n" +
//					"            <P ParaShape=\"17\" Style=\"0\">\n" +
//					"                <TEXT CharShape=\"14\">\n" +
//					"                    <CHAR>"+dailyGrid.get(i).get("end_cnt").toString()+"</CHAR>\n" +
//					"                </TEXT>\n" +
//					"            </P>\n" +
//					"        </PARALIST>\n" +
//					"    </CELL>\n" +
//					"    <CELL BorderFill=\"35\" ColAddr=\"3\" ColSpan=\"1\" Dirty=\"false\" Editable=\"false\" HasMargin=\"false\" Header=\"false\"\n" +
//					"          Height=\"2759\" Protect=\"false\" RowAddr=\""+row+"\" RowSpan=\"1\" Width=\"5788\">\n" +
//					"        <PARALIST LineWrap=\"Break\" LinkListID=\"0\" LinkListIDNext=\"0\" TextDirection=\"0\" VertAlign=\"Center\">\n" +
//					"            <P ParaShape=\"17\" Style=\"0\">\n" +
//					"                <TEXT CharShape=\"14\">\n" +
//					"                    <CHAR>"+dailyGrid.get(i).get("ing_cnt").toString()+"</CHAR>\n" +
//					"                </TEXT>\n" +
//					"            </P>\n" +
//					"        </PARALIST>\n" +
//					"    </CELL>\n" +
//					"    <CELL BorderFill=\"39\" ColAddr=\"4\" ColSpan=\"1\" Dirty=\"false\" Editable=\"false\" HasMargin=\"false\" Header=\"false\"\n" +
//					"          Height=\"2759\" Protect=\"false\" RowAddr=\""+row+"\" RowSpan=\"1\" Width=\"2450\">\n" +
//					"        <PARALIST LineWrap=\"Break\" LinkListID=\"0\" LinkListIDNext=\"0\" TextDirection=\"0\" VertAlign=\"Center\">\n" +
//					"            <P ParaShape=\"21\" Style=\"0\">\n" +
//					"                <TEXT CharShape=\"5\"/>\n" +
//					"            </P>\n" +
//					"        </PARALIST>\n" +
//					"    </CELL>\n" +
//					"    <CELL BorderFill=\"36\" ColAddr=\"5\" ColSpan=\"1\" Dirty=\"false\" Editable=\"false\" HasMargin=\"false\" Header=\"false\"\n" +
//					"          Height=\"2759\" Protect=\"false\" RowAddr=\""+row+"\" RowSpan=\"1\" Width=\"5864\">\n" +
//					"        <PARALIST LineWrap=\"Break\" LinkListID=\"0\" LinkListIDNext=\"0\" TextDirection=\"0\" VertAlign=\"Center\">\n" +
//					"            <P ParaShape=\"17\" Style=\"0\">\n" +
//					"                <TEXT CharShape=\"14\">\n" +
//					"                    <CHAR>"+dailyTotGrid.get(i).get("total_cnt").toString()+"</CHAR>\n" +
//					"                </TEXT>\n" +
//					"            </P>\n" +
//					"        </PARALIST>\n" +
//					"    </CELL>\n" +
//					"    <CELL BorderFill=\"37\" ColAddr=\"6\" ColSpan=\"1\" Dirty=\"false\" Editable=\"false\" HasMargin=\"false\" Header=\"false\"\n" +
//					"          Height=\"2759\" Protect=\"false\" RowAddr=\""+row+"\" RowSpan=\"1\" Width=\"6088\">\n" +
//					"        <PARALIST LineWrap=\"Break\" LinkListID=\"0\" LinkListIDNext=\"0\" TextDirection=\"0\" VertAlign=\"Center\">\n" +
//					"            <P ParaShape=\"17\" Style=\"0\">\n" +
//					"                <TEXT CharShape=\"14\">\n" +
//					"                    <CHAR>"+dailyTotGrid.get(i).get("end_cnt").toString()+"</CHAR>\n" +
//					"                </TEXT>\n" +
//					"            </P>\n" +
//					"        </PARALIST>\n" +
//					"    </CELL>\n" +
//					"    <CELL BorderFill=\"37\" ColAddr=\"7\" ColSpan=\"1\" Dirty=\"false\" Editable=\"false\" HasMargin=\"false\" Header=\"false\"\n" +
//					"          Height=\"2759\" Protect=\"false\" RowAddr=\""+row+"\" RowSpan=\"1\" Width=\"4368\">\n" +
//					"        <PARALIST LineWrap=\"Break\" LinkListID=\"0\" LinkListIDNext=\"0\" TextDirection=\"0\" VertAlign=\"Center\">\n" +
//					"            <P ParaShape=\"15\" Style=\"0\">\n" +
//					"                <TEXT CharShape=\"14\">\n" +
//					"                    <CHAR>"+ String.format("%.2f",per)+"%"+"</CHAR>\n" +
//					"                </TEXT>\n" +
//					"            </P>\n" +
//					"        </PARALIST>\n" +
//					"    </CELL>\n" +
//					"    <CELL BorderFill=\"38\" ColAddr=\"8\" ColSpan=\"1\" Dirty=\"false\" Editable=\"false\" HasMargin=\"false\" Header=\"false\"\n" +
//					"          Height=\"2759\" Protect=\"false\" RowAddr=\""+row+"\" RowSpan=\"1\" Width=\"5589\">\n" +
//					"        <PARALIST LineWrap=\"Break\" LinkListID=\"0\" LinkListIDNext=\"0\" TextDirection=\"0\" VertAlign=\"Center\">\n" +
//					"            <P ParaShape=\"17\" Style=\"0\">\n" +
//					"                <TEXT CharShape=\"14\">\n" +
//					"                    <CHAR>"+dailyTotGrid.get(i).get("ing_cnt").toString()+"</CHAR>\n" +
//					"                </TEXT>\n" +
//					"            </P>\n" +
//					"        </PARALIST>\n" +
//					"    </CELL>\n" +
//					"</ROW>");
//		}
//
//		int rowCount = 2+dailyGrid.size();
//
//		hmlMaker.setAttribute("tb1", "RowCount", String.valueOf(rowCount));
//
//		hmlMaker.setParam("add_row", rowData.toString());
//
//		if(dailyGrid.size()>0){
//			double per = (double)(dailyTotGrid.get(0).get("end_cnt")*100/(double)dailyTotGrid.get(0).get("total_cnt"));
//			hmlMaker.setParam("name0", String.valueOf(dailyGrid.get(0).get("inst_nm")));
//			hmlMaker.setParam("cnt0", dailyGrid.get(0).get("ing_cnt").toString());
//			hmlMaker.setParam("end0",dailyGrid.get(0).get("end_cnt").toString());
//			hmlMaker.setParam("sum0",dailyGrid.get(0).get("total_cnt").toString());
//			hmlMaker.setParam("s_t0",dailyTotGrid.get(0).get("total_cnt").toString());
//			hmlMaker.setParam("s_e0",dailyTotGrid.get(0).get("end_cnt").toString());
//			hmlMaker.setParam("s_p0",String.format("%.2f",per)+"%");
//			hmlMaker.setParam("s_i0",dailyTotGrid.get(0).get("ing_cnt").toString());
//		}

		String sumStartDt = (String)reqMap.get("sumStartDt");
		hmlMaker.setParam("year", "누적 기준은 "+sumStartDt.substring(2,4)+". "+sumStartDt.substring(4,6)+". "+sumStartDt.substring(6,8)+" 이후의 통계임");
		hmlMaker.setParam("year1", "누적 기준은 "+sumStartDt.substring(2,4)+". "+sumStartDt.substring(4,6)+". "+sumStartDt.substring(6,8)+" 이후의 통계임");

		String createTime = DateFormatUtils.format(new Date(), "yyyyMMddHHmmssSSS");

		hmlMaker.saveFile(AppGlobal.homePath+"/export/",createTime+".hwp");
		Map<String, String> resultMap = new HashMap<>();
		resultMap.put("filePath", "/export/" + createTime + ".hwp");
		resultMap.put("fileName", createTime);
		resultMap.put("fileExt", ".hwp");

		return new ReturnData(resultMap);

//		return service.makeReportDailyInciStateDownload(new Criterion(reqMap));
	}

	public String stringToComma(int req){
		DecimalFormat df = new DecimalFormat("#,###");
		return df.format(req);
	}
}
