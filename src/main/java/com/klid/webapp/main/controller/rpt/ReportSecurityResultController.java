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
import com.klid.webapp.main.rpt.reportSecurityResult.dto.ReportResultListDto;
import com.klid.webapp.main.rpt.reportSecurityResult.persistence.ReportSecurityResultMapper;
import com.klid.webapp.main.rpt.reportSecurityResult.service.ReportSecurityResultService;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletResponse;
import java.text.DecimalFormat;
import java.util.*;

@RequestMapping("/api/main/rpt/reportSecurityResult")
@Controller
public class ReportSecurityResultController {

	@Resource(name = "reportSecurityResultMapper")
	private ReportSecurityResultMapper mapper;

	@Resource(name = "reportSecurityResultService")
	private ReportSecurityResultService service;

	@RequestMapping(value = "getResultTotal")
	public @ResponseBody ReturnData getResultTotal(@RequestParam Map<String, Object> reqMap) {
			return service.getResultTotal(new Criterion(reqMap));
	}

	@RequestMapping(value = "getResultList")
	public @ResponseBody ReturnData getResultList(@RequestParam Map<String, Object> reqMap) {
		return service.getResultList(new Criterion(reqMap));
	}

	@RequestMapping(value = "getResultExceptlist")
	public @ResponseBody ReturnData getResultExceptlist(@RequestParam Map<String, Object> reqMap) {
			return service.getResultExceptlist(new Criterion(reqMap));
	}

	@RequestMapping(value = "makeReportSecurityDownload", method = RequestMethod.POST)
	public @ResponseBody ReturnData makeReportDownload(@RequestBody Map<String, Object> reqMap, HttpServletResponse response) {

		String filename = AppGlobal.reportTemplate + "report_security.hml";

		HwpmlMaker hmlMaker = new HwpmlMaker(filename, "##", "##");

		List<ReportResultListDto> titles = mapper.selectSecurityTitle(reqMap);
		/**
		 * inciDttNm = L_mal_02_Bitcoin_20180118
		 * dclInstNm = 중앙지원센터
		 * searchNm = 경기(1),충남(1)
		 */
		StringBuilder nisData = new StringBuilder("");
		StringBuilder cntData = new StringBuilder("");
		StringBuilder tngData = new StringBuilder("");
		String strDttnm;

		for(int i=0; i<titles.size(); i++){
			strDttnm=titles.get(i).getInciDttNm().replace("$","\\$").replace("&","&amp;");

			switch (titles.get(i).getDclInstCd()){

				case 1100000:
					cntData.append(" - "+strDttnm+" "+titles.get(i).getSearchNm()+"</CHAR></TEXT></P><P><TEXT CharShape=\"3\"><CHAR>");
					break;
				case 1400000:
					nisData.append(" - "+strDttnm+"</CHAR></TEXT></P><P><TEXT CharShape=\"3\"><CHAR>");
					break;
				case 1500000:
					tngData.append(" - "+strDttnm+" "+titles.get(i).getSearchNm()+"</CHAR></TEXT></P><P><TEXT CharShape=\"3\"><CHAR>");
					break;
			}
		}
		hmlMaker.setParam("nis_data",nisData.toString());
		hmlMaker.setParam("cnt_data",cntData.toString());
		hmlMaker.setParam("tng_data",tngData.toString());

		String startDt = (String) reqMap.get("startDt");//"startDt" -> "20190121060000"
		String endDt = (String) reqMap.get("endDt");//"endDt" -> "20190122055959"
		int intStartDt = Integer.parseInt(startDt.substring(0,8));
		int intEndDt = Integer.parseInt(endDt.substring(0,8));

		startDt= startDt.substring(2,4)+". "+startDt.substring(4,6)+". "+startDt.substring(6,8) + " "+startDt.substring(8,10)+":"+startDt.substring(10,12);
		endDt= endDt.substring(2,4)+". "+endDt.substring(4,6)+". "+endDt.substring(6,8) + " "+endDt.substring(8,10)+":"+endDt.substring(10,12);

		String strDate = "";

		if((intEndDt-intStartDt)>1){
			strDate = String.valueOf(intStartDt)+String.valueOf(intEndDt-1).substring(6,8);
			strDate = strDate.substring(0,4)+"년 "+strDate.substring(4,6)+"월 "+strDate.substring(6,8)+"~"+strDate.substring(8,10)+"일";
		}else{
			strDate = String.valueOf(intStartDt);
			strDate = strDate.substring(0,4)+"년 "+strDate.substring(4,6)+"월 "+strDate.substring(6,8)+"일";
		}

		hmlMaker.setParam("strDate", strDate);
		hmlMaker.setParam("periodDate", startDt+"~"+endDt);

		ArrayList<LinkedHashMap<String, Integer>> totalGrid = (ArrayList) reqMap.get("totalGrid");
		/**
		 * "nisCnt" -> "0"
		 *  "cntCnt" -> "3"
		 *  "tngCnt" -> "0"
		 *  "totCnt" -> "48"
		 *  "wormCnt" -> "3"
		 *  "webCnt" -> "45"
		 */
		hmlMaker.setParam("worm_cnt", String.valueOf(stringToComma((int)totalGrid.get(0).get("totCnt"))));
		hmlMaker.setParam("worm_cnt1", String.valueOf(stringToComma((int)totalGrid.get(0).get("wormCnt"))));
		hmlMaker.setParam("web_cnt", String.valueOf(stringToComma((int)totalGrid.get(0).get("webCnt"))));
		hmlMaker.setParam("nis_cnt", String.valueOf(stringToComma((int)totalGrid.get(0).get("nisCnt"))));
		hmlMaker.setParam("cnt_cnt", String.valueOf(stringToComma((int)totalGrid.get(0).get("cntCnt"))));
		hmlMaker.setParam("tng_cnt", String.valueOf(stringToComma((int)totalGrid.get(0).get("tngCnt"))));

		ArrayList<LinkedHashMap<String, Object>> listGrid = (ArrayList) reqMap.get("listGrid");
		/**
		 * "inciDttNm" -> "L_mal_02_Bitcoin_20180118"
		 * "dclInstNm" -> "중앙지원센터"
		 * "attdTypCdNm" -> "악성코드공격"
		 * "dmgInstNm" -> "충남"
		 * "inciDttTtlNm" -> "27.101.55.11[L_mal_02_Bitcoin_20180118]"
		 * "inciTtl" -> "27.101.55.11"
		 * */

		ArrayList<LinkedHashMap<String, Object>> exceptlistGrid = (ArrayList) reqMap.get("exceptlistGrid");
		/**
		 *"inciAcpnDt" -> "2019-01-21 06:53:43.0",
		 * "inciNo" -> "CT00-19-0121005",
		 * "instNm" -> "강원",
		 * "accdTypCdNm" -> "웹취약점공격",
		 * "ipAddr" -> "47.102.110.175"
		 */

		StringBuilder rowData = new StringBuilder("");
		if(exceptlistGrid.size()>1) {
			for (int i = 1; i < exceptlistGrid.size(); i++) {
				int row = 9 + (i * 3);
				String ipAddr=null;//공격아이피가 null 인경우, 보고서 에러(널포인터)때문에 추가(20190508)
				if (exceptlistGrid.get(i).get("ipAddr") ==null) {
					ipAddr="";
				}else ipAddr = exceptlistGrid.get(i).get("ipAddr").toString();
				rowData.append("<ROW>\n" +
						"    <CELL BorderFill=\"4\" ColAddr=\"0\" ColSpan=\"3\" Dirty=\"false\" Editable=\"false\" HasMargin=\"false\" Header=\"false\"\n" +
						"          Height=\"7944\" Protect=\"false\" RowAddr=\"" + row + "\" RowSpan=\"3\" Width=\"2342\">\n" +
						"        <PARALIST LineWrap=\"Break\" LinkListID=\"0\" LinkListIDNext=\"0\" TextDirection=\"0\" VertAlign=\"Center\">\n" +
						"            <P ParaShape=\"17\" Style=\"0\">\n" +
						"                <TEXT CharShape=\"9\">\n" +
						"                    <CHAR>" + (i + 1) + "</CHAR>\n" +
						"                </TEXT>\n" +
						"                <TEXT CharShape=\"3\"/>\n" +
						"            </P>\n" +
						"        </PARALIST>\n" +
						"    </CELL>\n" +
						"    <CELL BorderFill=\"5\" ColAddr=\"3\" ColSpan=\"4\" Dirty=\"false\" Editable=\"false\" HasMargin=\"false\" Header=\"false\"\n" +
						"          Height=\"1848\" Protect=\"false\" RowAddr=\"" + row + "\" RowSpan=\"1\" Width=\"7514\">\n" +
						"        <PARALIST LineWrap=\"Break\" LinkListID=\"0\" LinkListIDNext=\"0\" TextDirection=\"0\" VertAlign=\"Center\">\n" +
						"            <P ParaShape=\"0\" Style=\"0\">\n" +
						"                <TEXT CharShape=\"9\">\n" +
						"                    <CHAR>시간</CHAR>\n" +
						"                </TEXT>\n" +
						"                <TEXT CharShape=\"9\"/>\n" +
						"            </P>\n" +
						"        </PARALIST>\n" +
						"    </CELL>\n" +
						"    <CELL BorderFill=\"5\" ColAddr=\"7\" ColSpan=\"5\" Dirty=\"false\" Editable=\"false\" HasMargin=\"false\" Header=\"false\"\n" +
						"          Height=\"1848\" Protect=\"false\" RowAddr=\"" + row + "\" RowSpan=\"1\" Width=\"15365\">\n" +
						"        <PARALIST LineWrap=\"Break\" LinkListID=\"0\" LinkListIDNext=\"0\" TextDirection=\"0\" VertAlign=\"Center\">\n" +
						"            <P ParaShape=\"0\" Style=\"0\">\n" +
						"                <TEXT CharShape=\"3\">\n" +
						"                    <CHAR>" + exceptlistGrid.get(i).get("inciAcpnDt").toString().substring(0, 16) + "</CHAR>\n" +
						"                </TEXT>\n" +
						"            </P>\n" +
						"        </PARALIST>\n" +
						"    </CELL>\n" +
						"    <CELL BorderFill=\"5\" ColAddr=\"12\" ColSpan=\"1\" Dirty=\"false\" Editable=\"false\" HasMargin=\"false\" Header=\"false\"\n" +
						"          Height=\"1848\" Protect=\"false\" RowAddr=\"" + row + "\" RowSpan=\"1\" Width=\"5677\">\n" +
						"        <PARALIST LineWrap=\"Break\" LinkListID=\"0\" LinkListIDNext=\"0\" TextDirection=\"0\" VertAlign=\"Center\">\n" +
						"            <P ParaShape=\"0\" Style=\"0\">\n" +
						"                <TEXT CharShape=\"9\">\n" +
						"                    <CHAR>유형</CHAR>\n" +
						"                </TEXT>\n" +
						"                <TEXT CharShape=\"9\"/>\n" +
						"            </P>\n" +
						"        </PARALIST>\n" +
						"    </CELL>\n" +
						"    <CELL BorderFill=\"7\" ColAddr=\"13\" ColSpan=\"4\" Dirty=\"false\" Editable=\"false\" HasMargin=\"false\" Header=\"false\"\n" +
						"          Height=\"1848\" Protect=\"false\" RowAddr=\"" + row + "\" RowSpan=\"1\" Width=\"16632\">\n" +
						"        <PARALIST LineWrap=\"Break\" LinkListID=\"0\" LinkListIDNext=\"0\" TextDirection=\"0\" VertAlign=\"Center\">\n" +
						"            <P ParaShape=\"0\" Style=\"0\">\n" +
						"                <TEXT CharShape=\"3\">\n" +
						"                    <CHAR>" + exceptlistGrid.get(i).get("accdTypCdNm").toString() + "</CHAR>\n" +
						"                </TEXT>\n" +
						"            </P>\n" +
						"        </PARALIST>\n" +
						"    </CELL>\n" +
						"</ROW><ROW>\n" +
						"<CELL BorderFill=\"6\" ColAddr=\"3\" ColSpan=\"4\" Dirty=\"false\" Editable=\"false\" HasMargin=\"false\" Header=\"false\"\n" +
						"      Height=\"3048\" Protect=\"false\" RowAddr=\"" + (row + 1) + "\" RowSpan=\"1\" Width=\"7514\">\n" +
						"    <PARALIST LineWrap=\"Break\" LinkListID=\"0\" LinkListIDNext=\"0\" TextDirection=\"0\" VertAlign=\"Center\">\n" +
						"        <P ParaShape=\"0\" Style=\"0\">\n" +
						"            <TEXT CharShape=\"9\">\n" +
						"                <CHAR>공격IP<LINEBREAK/>(공격,기관)</CHAR>" +
						"            </TEXT>\n" +
						"        </P>\n" +
						"    </PARALIST>\n" +
						"</CELL>\n" +
						"<CELL BorderFill=\"6\" ColAddr=\"7\" ColSpan=\"1\" Dirty=\"false\" Editable=\"false\" HasMargin=\"false\" Header=\"false\"\n" +
						"      Height=\"3048\" Protect=\"false\" RowAddr=\"" + (row + 1) + "\" RowSpan=\"1\" Width=\"8490\">\n" +
						"    <PARALIST LineWrap=\"Break\" LinkListID=\"0\" LinkListIDNext=\"0\" TextDirection=\"0\" VertAlign=\"Center\">\n" +
						"        <P ParaShape=\"0\" Style=\"0\">\n" +
						"            <TEXT CharShape=\"3\">\n" +
						"                <CHAR>" + ipAddr + "</CHAR>\n" +
						"            </TEXT>\n" +
						"        </P>\n" +
						"    </PARALIST>\n" +
						"</CELL>\n" +
						"<CELL BorderFill=\"6\" ColAddr=\"8\" ColSpan=\"4\" Dirty=\"false\" Editable=\"false\" HasMargin=\"false\" Header=\"false\"\n" +
						"      Height=\"3048\" Protect=\"false\" RowAddr=\"" + (row + 1) + "\" RowSpan=\"1\" Width=\"6875\">\n" +
						"    <PARALIST LineWrap=\"Break\" LinkListID=\"0\" LinkListIDNext=\"0\" TextDirection=\"0\" VertAlign=\"Center\">\n" +
						"        <P ParaShape=\"0\" Style=\"0\">\n" +
						"            <TEXT CharShape=\"9\">\n" +
						"                <CHAR>경유IP<LINEBREAK/>(국적,기관)</CHAR>" +
						"            </TEXT>\n" +
						"        </P>\n" +
						"    </PARALIST>\n" +
						"</CELL>\n" +
						"<CELL BorderFill=\"6\" ColAddr=\"12\" ColSpan=\"1\" Dirty=\"false\" Editable=\"false\" HasMargin=\"false\" Header=\"false\"\n" +
						"      Height=\"3048\" Protect=\"false\" RowAddr=\"" + (row + 1) + "\" RowSpan=\"1\" Width=\"5677\">\n" +
						"    <PARALIST LineWrap=\"Break\" LinkListID=\"0\" LinkListIDNext=\"0\" TextDirection=\"0\" VertAlign=\"Center\">\n" +
						"        <P ParaShape=\"0\" Style=\"0\">\n" +
						"            <TEXT CharShape=\"9\"/>\n" +
						"        </P>\n" +
						"    </PARALIST>\n" +
						"</CELL>\n" +
						"<CELL BorderFill=\"6\" ColAddr=\"13\" ColSpan=\"3\" Dirty=\"false\" Editable=\"false\" HasMargin=\"false\" Header=\"false\"\n" +
						"      Height=\"3048\" Protect=\"false\" RowAddr=\"" + (row + 1) + "\" RowSpan=\"1\" Width=\"7492\">\n" +
						"    <PARALIST LineWrap=\"Break\" LinkListID=\"0\" LinkListIDNext=\"0\" TextDirection=\"0\" VertAlign=\"Center\">\n" +
						"        <P ParaShape=\"0\" Style=\"0\">\n" +
						"            <TEXT CharShape=\"9\">\n" +
						"                <CHAR>피해IP<LINEBREAK/>(국적,기관)</CHAR>" +
						"            </TEXT>\n" +
						"        </P>\n" +
						"    </PARALIST>\n" +
						"</CELL>\n" +
						"<CELL BorderFill=\"8\" ColAddr=\"16\" ColSpan=\"1\" Dirty=\"false\" Editable=\"false\" HasMargin=\"false\" Header=\"false\"\n" +
						"      Height=\"3048\" Protect=\"false\" RowAddr=\"" + (row + 1) + "\" RowSpan=\"1\" Width=\"9140\">\n" +
						"    <PARALIST LineWrap=\"Break\" LinkListID=\"0\" LinkListIDNext=\"0\" TextDirection=\"0\" VertAlign=\"Center\">\n" +
						"        <P ParaShape=\"0\" Style=\"0\">\n" +
						"            <TEXT CharShape=\"3\">\n" +
						"                <CHAR>" + exceptlistGrid.get(i).get("instNm").toString() + "</CHAR>\n" +
						"            </TEXT>\n" +
						"        </P>\n" +
						"    </PARALIST>\n" +
						"</CELL>\n" +
						"</ROW><ROW>\n" +
						"<CELL BorderFill=\"1\" ColAddr=\"3\" ColSpan=\"4\" Dirty=\"false\" Editable=\"false\" HasMargin=\"false\" Header=\"false\"\n" +
						"      Height=\"3048\" Protect=\"false\" RowAddr=\"" + (row + 2) + "\" RowSpan=\"1\" Width=\"7514\">\n" +
						"    <PARALIST LineWrap=\"Break\" LinkListID=\"0\" LinkListIDNext=\"0\" TextDirection=\"0\" VertAlign=\"Center\">\n" +
						"        <P ParaShape=\"0\" Style=\"0\">\n" +
						"            <TEXT CharShape=\"9\">\n" +
						"                <CHAR>조사내용</CHAR>\n" +
						"            </TEXT>\n" +
						"            <TEXT CharShape=\"9\"/>\n" +
						"        </P>\n" +
						"    </PARALIST>\n" +
						"</CELL>\n" +
						"<CELL BorderFill=\"2\" ColAddr=\"7\" ColSpan=\"10\" Dirty=\"false\" Editable=\"false\" HasMargin=\"false\" Header=\"false\"\n" +
						"      Height=\"3048\" Protect=\"false\" RowAddr=\"" + (row + 2) + "\" RowSpan=\"1\" Width=\"37774\">\n" +
						"    <PARALIST LineWrap=\"Break\" LinkListID=\"0\" LinkListIDNext=\"0\" TextDirection=\"0\" VertAlign=\"Center\">\n" +
						"        <P ParaShape=\"14\" Style=\"0\">\n" +
						"            <TEXT CharShape=\"3\">\n" +
						"                <CHAR>o 사고등록 및 이관실시 <LINEBREAK/>o 해당 취약점 제거 및 웹서버 취약점 점검요청\n" +
						"                </CHAR>\n" +
						"            </TEXT>\n" +
						"            <TEXT CharShape=\"3\"/>\n" +
						"        </P>\n" +
						"    </PARALIST>\n" +
						"</CELL>\n" +
						"</ROW>");
			}

			int rowCount = 9 + (exceptlistGrid.size() * 3);

			hmlMaker.setAttribute("tb1", "RowCount", String.valueOf(rowCount));

			hmlMaker.setParam("add_row", rowData.toString());
		}
		if(exceptlistGrid.size()>0){
			hmlMaker.setParam("row0", "1");
			hmlMaker.setParam("etc_time0", exceptlistGrid.get(0).get("inciAcpnDt").toString().substring(0,16));
			hmlMaker.setParam("etc_type0",exceptlistGrid.get(0).get("accdTypCdNm").toString());
			hmlMaker.setParam("etc_att0",exceptlistGrid.get(0).get("ipAddr").toString());
			hmlMaker.setParam("etc_inst0",exceptlistGrid.get(0).get("instNm").toString());
		}else{
			hmlMaker.setParam("row0", "1");
			hmlMaker.setParam("etc_time0", "");
			hmlMaker.setParam("etc_type0","");
			hmlMaker.setParam("etc_att0","");
			hmlMaker.setParam("etc_inst0","");
		}

		String createTime = DateFormatUtils.format(new Date(), "yyyyMMddHHmmssSSS");

		hmlMaker.saveFile(AppGlobal.homePath+"/export/",createTime+".hwp");
		Map<String, String> resultMap = new HashMap<>();
		resultMap.put("filePath", "/export/" + createTime + ".hwp");
		resultMap.put("fileName", createTime);
		resultMap.put("fileExt", ".hwp");

		return new ReturnData(resultMap);
//		return service.makeReportDownload(new Criterion(reqMap));
	}

	public String stringToComma(int req){
		DecimalFormat df = new DecimalFormat("#,###");
		return df.format(req);
	}
}
