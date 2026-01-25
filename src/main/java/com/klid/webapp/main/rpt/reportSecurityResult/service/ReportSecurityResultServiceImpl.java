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
package com.klid.webapp.main.rpt.reportSecurityResult.service;

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
import com.klid.webapp.main.rpt.reportSecurityResult.persistence.ReportSecurityResultMapper;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.stereotype.Service;

import jakarta.annotation.Resource;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.*;

@Service("reportSecurityResultService")
public class ReportSecurityResultServiceImpl extends MsgService implements ReportSecurityResultService {

	@Resource(name = "reportSecurityResultMapper")
	private ReportSecurityResultMapper mapper;

	/** 일일 보안관제결과 통보양식 - 통계 */
	@Override
	public ReturnData getResultTotal(Criterion criterion) {
		//criterion.addParam("instCd", AppGlobal.instCd);
		return new ReturnData(mapper.selectResultTotal(criterion.getCondition()));
	}

	/** 일일 보안관제결과 통보양식 - 악성코드 리스트 */
	@Override
	public ReturnData getResultList(Criterion criterion) {
		//criterion.addParam("instCd", AppGlobal.instCd);
		return new ReturnData(mapper.selectResultList(criterion.getCondition()));
	}

	/** 일일 보안관제결과 통보양식 - 악성코드외 리스트 */
	@Override
	public ReturnData getResultExceptlist(Criterion criterion) {
		return new ReturnData(mapper.selectResultExceptlist(criterion.getCondition()));
	}

	@Override
	public ReturnData makeReportDownload(Criterion criterion) {
		try {
			Map<String, Object> reqMap = criterion.getCondition();

			String filename = AppGlobal.reportTemplate+"report_security.hwp";
			HWPFile hwpFile = HWPReader.fromFile(filename);
			Section section = hwpFile.getBodyText().getSectionList().get(0);

			Control c = section.getParagraph(2).getControlList().get(0);
			ControlTable table = (ControlTable) c;
			ArrayList<Row> rows = table.getRowList();

			Calendar cal = Calendar.getInstance();
			int year = cal.get ( cal.YEAR );
			int month = cal.get ( cal.MONTH ) + 1 ;
			int date = cal.get ( cal.DATE ) ;

			ArrayList<LinkedHashMap> totalGrid = (ArrayList)reqMap.get("totalGrid");

			rows.get(1).getCellList().get(3).getParagraphList().getParagraph(0).createText();
			rows.get(1).getCellList().get(3).getParagraphList().getParagraph(0).getText().addString(year+"년"+month+"월"+date+"일");
			rows.get(5).getCellList().get(3).getParagraphList().getParagraph(0).createText();
			rows.get(5).getCellList().get(3).getParagraphList().getParagraph(1).createText();
			if(Integer.parseInt(reqMap.get("hwpTime").toString()) < 10){
				rows.get(5).getCellList().get(3).getParagraphList().getParagraph(0).getText().addString(reqMap.get("hwpStartDt").toString()+" "+"0"+reqMap.get("hwpTime").toString()+":00 ~ ");
				rows.get(5).getCellList().get(3).getParagraphList().getParagraph(1).getText().addString(reqMap.get("hwpEndDt").toString()+" "+"0"+reqMap.get("hwpTime").toString()+":00");
			}else{
				rows.get(5).getCellList().get(3).getParagraphList().getParagraph(0).getText().addString(reqMap.get("hwpStartDt").toString()+" "+reqMap.get("hwpTime").toString()+":00 ~ ");
				rows.get(5).getCellList().get(3).getParagraphList().getParagraph(1).getText().addString(reqMap.get("hwpEndDt").toString()+" "+reqMap.get("hwpTime").toString()+":00");
			}
			rows.get(6).getCellList().get(1).getParagraphList().getParagraph(0).createText();
			rows.get(6).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString("■ 총 "+String.valueOf((int)totalGrid.get(0).get("totCnt")+"건 처리 (웜바이러스 "+String.valueOf((int)totalGrid.get(0).get("wormCnt")+"건)")));
			rows.get(6).getCellList().get(1).getParagraphList().getParagraph(1).createText();
			rows.get(6).getCellList().get(1).getParagraphList().getParagraph(1).getText().addString("o 국가사이버안전센터 : "+String.valueOf((int)totalGrid.get(0).get("nisCnt")+"건"));
			rows.get(6).getCellList().get(1).getParagraphList().getParagraph(3).createText();
			rows.get(6).getCellList().get(1).getParagraphList().getParagraph(3).getText().addString("o 중앙지원센터 : "+String.valueOf((int)totalGrid.get(0).get("cntCnt")+"건"));
			rows.get(6).getCellList().get(1).getParagraphList().getParagraph(5).createText();
			rows.get(6).getCellList().get(1).getParagraphList().getParagraph(5).getText().addString("o 통합전산센터 : "+String.valueOf((int)totalGrid.get(0).get("tngCnt")+"건"));
			rows.get(7).getCellList().get(1).getParagraphList().getParagraph(0).createText();
			rows.get(7).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString("■ 세 부 처 리 내 용 (* 웜바이러스 제외) : 총 "+String.valueOf((int)totalGrid.get(0).get("webCnt")+ "건 * 첨부파일 참고"));


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
