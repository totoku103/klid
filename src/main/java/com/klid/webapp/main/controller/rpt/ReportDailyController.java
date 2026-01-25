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
import com.klid.common.hwplib.object.bodytext.control.table.Row;
import com.klid.common.hwplib.reader.HWPReader;
import com.klid.common.hwplib.writer.HWPWriter;
import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ErrorInfo;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.rpt.reportDaily.service.ReportDailyService;

import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;

import jakarta.annotation.Resource;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.ArrayList;
import java.util.Map;

@RequestMapping("/api/main/rpt/reportDaily")
@Controller
public class ReportDailyController {

	@Resource(name = "reportDailyService")
	private ReportDailyService service;


	@RequestMapping(value = "getReportDayStat")
	public @ResponseBody ReturnData getReportDayStat(@RequestParam Map<String, Object> reqMap) {
		return service.getReportDayStat(new Criterion(reqMap));
	}

	@RequestMapping(value = "getReportDailyDownload")
	public ReturnData getReportDailyDownload(@RequestParam Map<String, Object> reqMap, HttpServletResponse response) {
		try {
			String filename = AppGlobal.getProjectPath()+"/src/main/webapp/WEB-INF/reportTemplate/report_daily_two.hwp";
			HWPFile hwpFile = HWPReader.fromFile(filename);
			Section section = hwpFile.getBodyText().getSectionList().get(0);

			Control c = section.getParagraph(1).getControlList().get(0);
			ControlTable table = (ControlTable) c;
			ArrayList<Row> rows = table.getRowList();
			rows.get(1).getCellList().get(0).getParagraphList().getParagraph(0).createText();
			rows.get(1).getCellList().get(0).getParagraphList().getParagraph(0).getText().addString("근무자1");
			rows.get(1).getCellList().get(1).getParagraphList().getParagraph(0).createText();
			rows.get(1).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString("근무시간1");
			rows.get(1).getCellList().get(2).getParagraphList().getParagraph(0).createText();
			rows.get(1).getCellList().get(2).getParagraphList().getParagraph(0).getText().addString("비고1");
			rows.get(2).getCellList().get(0).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(0).getParagraphList().getParagraph(0).getText().addString("근무자2");
			rows.get(2).getCellList().get(1).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString("근무시간2");
			rows.get(2).getCellList().get(2).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(2).getParagraphList().getParagraph(0).getText().addString("비고2");

			c = section.getParagraph(5).getControlList().get(0);
			table = (ControlTable) c;
			rows = table.getRowList();
			rows.get(2).getCellList().get(1).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString("등록1");
			rows.get(2).getCellList().get(2).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(2).getParagraphList().getParagraph(0).getText().addString("완료1");
			rows.get(2).getCellList().get(3).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(3).getParagraphList().getParagraph(0).getText().addString("진행1");
			rows.get(2).getCellList().get(4).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(4).getParagraphList().getParagraph(0).getText().addString("총계2");
			rows.get(2).getCellList().get(5).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(5).getParagraphList().getParagraph(0).getText().addString("완료2");
			rows.get(2).getCellList().get(6).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(6).getParagraphList().getParagraph(0).getText().addString("진행2");

			c = section.getParagraph(12).getControlList().get(0);
			table = (ControlTable) c;
			rows = table.getRowList();
			rows.get(2).getCellList().get(1).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString("요청1");
			rows.get(2).getCellList().get(2).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(2).getParagraphList().getParagraph(0).getText().addString("완료1");
			rows.get(2).getCellList().get(3).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(3).getParagraphList().getParagraph(0).getText().addString("진행1");
			rows.get(2).getCellList().get(4).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(4).getParagraphList().getParagraph(0).getText().addString("총계2");
			rows.get(2).getCellList().get(5).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(5).getParagraphList().getParagraph(0).getText().addString("완료2");
			rows.get(2).getCellList().get(6).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(6).getParagraphList().getParagraph(0).getText().addString("진행2");

			c = section.getParagraph(15).getControlList().get(0);
			table = (ControlTable) c;
			rows = table.getRowList();
			rows.get(2).getCellList().get(1).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString("계1");
			rows.get(2).getCellList().get(2).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(2).getParagraphList().getParagraph(0).getText().addString("개발원1");
			rows.get(2).getCellList().get(3).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(3).getParagraphList().getParagraph(0).getText().addString("국정원1");
			rows.get(2).getCellList().get(4).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(4).getParagraphList().getParagraph(0).getText().addString("통합센터1");
			rows.get(2).getCellList().get(5).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(5).getParagraphList().getParagraph(0).getText().addString("누계1");

			c = section.getParagraph(19).getControlList().get(0);
			table = (ControlTable) c;
			rows = table.getRowList();
			rows.get(2).getCellList().get(1).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString("합계1");
			rows.get(2).getCellList().get(2).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(2).getParagraphList().getParagraph(0).getText().addString("웹해킹1");
			rows.get(2).getCellList().get(3).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(3).getParagraphList().getParagraph(0).getText().addString("악성코드1");
			rows.get(2).getCellList().get(4).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(4).getParagraphList().getParagraph(0).getText().addString("기타1");
			rows.get(2).getCellList().get(5).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(5).getParagraphList().getParagraph(0).getText().addString("합계2");
			rows.get(2).getCellList().get(6).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(6).getParagraphList().getParagraph(0).getText().addString("수정1");
			rows.get(2).getCellList().get(7).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(7).getParagraphList().getParagraph(0).getText().addString("삭제1");

			c = section.getParagraph(24).getControlList().get(0);
			table = (ControlTable) c;
			rows = table.getRowList();
			rows.get(2).getCellList().get(1).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString("합계1");
			rows.get(2).getCellList().get(2).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(2).getParagraphList().getParagraph(0).getText().addString("장애1");
			rows.get(2).getCellList().get(3).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(3).getParagraphList().getParagraph(0).getText().addString("점검1");
			rows.get(2).getCellList().get(4).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(4).getParagraphList().getParagraph(0).getText().addString("기타1");
			rows.get(2).getCellList().get(5).getParagraphList().getParagraph(0).createText();
			rows.get(2).getCellList().get(5).getParagraphList().getParagraph(0).getText().addString("누계1");

			filename = "D:/Project/2018/klid/source/project/Klid/src/main/webapp/WEB-INF/reportTemplate/report_daily_three.hwp";
			HWPWriter.toFile(hwpFile,filename);

//			File file = new File(filename);
//			ServletOutputStream sos = response.getOutputStream();
//			InputStream is = new FileInputStream(file);
//
//			response.setContentType("application/force-download");
//			response.setHeader("Content-Disposition","attachment; filename="+"bong.hwp");
//			FileCopyUtils.copy(is,sos);
//			response.flushBuffer();
//			is.close();

			return new ReturnData();
		} catch (IOException ioe) {
			ioe.printStackTrace();
			return new ReturnData(new ErrorInfo(ioe));
		} catch (IllegalArgumentException iae){
			iae.printStackTrace();
			return new ReturnData(new ErrorInfo(iae));
		} catch (Exception e) {
			e.printStackTrace();
			return new ReturnData(new ErrorInfo(e));
		}
	}

}
