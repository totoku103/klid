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
import com.klid.common.CommonMethod;
import com.klid.common.HwpmlMaker;
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
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.rpt.reportInciPrcsStat.service.ReportInciPrcsStatService;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;

import jakarta.annotation.Resource;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.awt.*;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@RequestMapping("/api/main/rpt/reportInciPrcsStat")
@Controller
public class ReportInciPrcsStatController {

	@Resource(name = "reportInciPrcsStatService")
	private ReportInciPrcsStatService service;

	@RequestMapping(value = "getPrcsStatList")
	public @ResponseBody ReturnData getPrcsStatList(@RequestParam Map<String, Object> reqMap) {
		return service.getPrcsStatList(new Criterion(reqMap));
	}

	@RequestMapping(value = "saveHighChartImg",method = RequestMethod.POST)
	public @ResponseBody ReturnData saveHighChartImg(@RequestBody Map<String, Object> reqMap, HttpServletRequest request, HttpServletResponse response) {
		try {
			String fname = (String)reqMap.get("fname");
			String imgData = (String)reqMap.get("imgData");
			imgData = imgData.replace("data:image/png;base64,", "");
			byte[] byteData = Base64.decodeBase64(imgData.getBytes());
			String imgpath=AppGlobal.homePath+"/export/"+fname;
			FileUtils.writeByteArrayToFile(new File(imgpath), byteData);
			return new ReturnData();
		}catch (IOException e){
			e.printStackTrace();
			return new ReturnData(new ErrorInfo(e));
		}catch (Exception e){
			e.printStackTrace();
			return new ReturnData(new ErrorInfo(e));
		}
	}

	@RequestMapping(value = "exportReportInciPrcsStat",method = RequestMethod.POST)
	public @ResponseBody ReturnData exportReportInciPrcsStat(@RequestBody Map<String, Object> reqMap, HttpServletResponse response) {
		String filename = AppGlobal.reportTemplate + "new_report_hml.hml";

		HwpmlMaker hmlMaker = new HwpmlMaker(filename, "##", "##");

		String fname = (String)reqMap.get("fname");
		String imgpath= AppGlobal.homePath+"/export/"+fname;

		hmlMaker.setImage("chart",imgpath);

//		hmlMaker.setParam("report_title", (String)reqMap.get("sTitle"));

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String today = sdf.format(new Date());
		String sumDay = (String)reqMap.get("startDt");
		String sumEndDt = (String)reqMap.get("endDt");
		hmlMaker.setParam("createDate",today);
		hmlMaker.setParam("startDt",sumDay.substring(2,4)+". "+sumDay.substring(4,6)+". "+sumDay.substring(6,8)+".");
		hmlMaker.setParam("endDt",sumEndDt.substring(2,4)+". "+sumEndDt.substring(4,6)+". "+sumEndDt.substring(6,8)+".");

		ArrayList<LinkedHashMap<String, Integer>> typeGrid = (ArrayList) reqMap.get("prcsStatGrid");
		hmlMaker.insertTableRow("tb1", "row1",typeGrid.size());

		hmlMaker.setParam("addrow","<ROW id=\"row1\">\n" +
				"\t\t<CELL BorderFill=\"2\" ColAddr=\"0\" ColSpan=\"1\" Dirty=\"false\" Editable=\"false\" HasMargin=\"false\" Header=\"false\" Height=\"3546\" Protect=\"false\" RowAddr=\"2\" RowSpan=\"1\" Width=\"24090\"><PARALIST LineWrap=\"Break\" LinkListID=\"0\" LinkListIDNext=\"0\" TextDirection=\"0\" VertAlign=\"Center\">\n" +
				"\t\t\t<P ParaShape=\"13\" Style=\"0\">\n" +
				"\t\t\t<TEXT CharShape=\"1\">\n" +
				"\t\t\t<CHAR>##codeName0##</CHAR>\n" +
				"\t\t\t</TEXT>\n" +
				"\t\t\t</P>\n" +
				"\t\t\t</PARALIST>\n" +
				"\t\t</CELL>\n" +
				"\t\t<CELL BorderFill=\"2\" ColAddr=\"1\" ColSpan=\"1\" Dirty=\"false\" Editable=\"false\" HasMargin=\"false\" Header=\"false\" Height=\"3546\" Protect=\"false\" RowAddr=\"2\" RowSpan=\"1\" Width=\"11337\">\n" +
				"\t\t\t<PARALIST LineWrap=\"Break\" LinkListID=\"0\" LinkListIDNext=\"0\" TextDirection=\"0\" VertAlign=\"Center\">\n" +
				"\t\t\t<P ParaShape=\"13\" Style=\"0\">\n" +
				"\t\t\t<TEXT CharShape=\"1\">\n" +
				"\t\t\t<CHAR>##cnt0##</CHAR>\n" +
				"\t\t\t</TEXT>\n" +
				"\t\t\t</P>\n" +
				"\t\t\t</PARALIST>\n" +
				"\t\t</CELL>\n" +
				"\t\t<CELL BorderFill=\"2\" ColAddr=\"2\" ColSpan=\"1\" Dirty=\"false\" Editable=\"false\" HasMargin=\"false\" Header=\"false\" Height=\"3546\" Protect=\"false\" RowAddr=\"2\" RowSpan=\"1\" Width=\"11338\">\n" +
				"\t\t\t<PARALIST LineWrap=\"Break\" LinkListID=\"0\" LinkListIDNext=\"0\" TextDirection=\"0\" VertAlign=\"Center\">\n" +
				"\t\t\t<P ParaShape=\"13\" Style=\"0\"/>\n" +
				"\t\t\t</PARALIST>\n" +
				"\t\t</CELL>\n" +
				"\t</ROW>");

		hmlMaker.setParam("report_title", "처리상태");
		hmlMaker.setParam("titleName","처리상태");
		hmlMaker.setParam("title","처리상태");
		hmlMaker.setParam("title2","처리상태");
		hmlMaker.setParam("titleCnt","건수");

		for(int i=0; i< typeGrid.size(); i++){
			hmlMaker.setParam("codeName"+i,String.valueOf(typeGrid.get(i).get("name")));
			hmlMaker.setParam("cnt"+i,String.valueOf(stringToComma(typeGrid.get(i).get("y"))));
		}

		String createTime = DateFormatUtils.format(new Date(), "yyyyMMddHHmmssSSS");

		hmlMaker.saveFile(AppGlobal.homePath+"/export/",createTime+".hwp");
		Map<String, String> resultMap = new HashMap<>();
		resultMap.put("filePath", "/export/" + createTime + ".hwp");
		resultMap.put("fileName", createTime);
		resultMap.put("fileExt", ".hwp");

		return new ReturnData(resultMap);
		//return service.exportReportInciPrcsStat(new Criterion(reqMap));
	}

	public String stringToComma(int req){
		DecimalFormat df = new DecimalFormat("#,###");
		return df.format(req);
	}
}
