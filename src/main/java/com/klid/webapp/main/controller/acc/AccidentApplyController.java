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

package com.klid.webapp.main.controller.acc;

import java.io.*;
import java.net.URLEncoder;
import java.net.UnknownHostException;
import java.util.*;

import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletResponse;

import com.klid.common.AppGlobal;
import com.klid.common.SEED_KISA256;
import com.klid.common.hwplib.object.HWPFile;
import com.klid.common.hwplib.object.bodytext.Section;
import com.klid.common.hwplib.object.bodytext.control.Control;
import com.klid.common.hwplib.object.bodytext.control.ControlTable;

import com.klid.common.hwplib.object.bodytext.control.ControlType;
import com.klid.common.hwplib.object.bodytext.control.table.Row;
import com.klid.common.hwplib.reader.HWPReader;
import com.klid.common.hwplib.tool.objectfinder.FieldFinder;
import com.klid.common.hwplib.tool.objectfinder.SetFieldResult;
import com.klid.common.hwplib.writer.HWPWriter;
import org.apache.commons.lang3.time.DateFormatUtils;

import org.json.JSONException;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ErrorInfo;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.acc.accidentApply.service.AccidentApplyService;



import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import org.apache.hc.client5.http.classic.methods.HttpGet;
import org.apache.hc.client5.http.classic.methods.HttpPost;
import org.apache.hc.client5.http.entity.mime.HttpMultipartMode;
import org.apache.hc.client5.http.entity.mime.MultipartEntityBuilder;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.CloseableHttpResponse;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.core5.http.HttpEntity;

import com.klid.common.Base64Coder;



/**
 * @author imhojong
 *
 */
@RequestMapping("/api/main/acc/accidentApply")
@Controller
public class AccidentApplyController {

	@Resource(name = "accidentApplyService")
	private AccidentApplyService service;

	/** 신고 리스트 받아오기 */
	@RequestMapping(value = "getAccidentList")
	public @ResponseBody ReturnData getAccidentList(@RequestParam Map<String, Object> reqMap) {
		return service.getAccidentApplyList(new Criterion(reqMap));
	}

	/** 신고 등록 */
	@RequestMapping(value = "addAccidentApply", method = RequestMethod.POST)
	public @ResponseBody ReturnData addAccidentApply(@RequestBody Map<String, Object> reqMap) {
		return service.addAccidentApply(new Criterion(reqMap, false));
	}

	/** 신고 수정 */
	@RequestMapping(value = "editAccidentApply", method = RequestMethod.POST)
	public @ResponseBody ReturnData editAccidentApply(@RequestBody Map<String, Object> reqMap) {
		return service.editAccidentApply(new Criterion(reqMap, false));
	}

	/** 신고 삭제 */
	@RequestMapping(value = "deleteAccidentApply", method = RequestMethod.POST)
	public @ResponseBody ReturnData deleteAccidentApply(@RequestBody Map<String, Object> reqMap) {
			return service.deleteAccidentApply(new Criterion(reqMap, false));
	}

	/** 기관 리스트 받아오기 */
	@RequestMapping(value = "getAccidenDeptList")
	public @ResponseBody ReturnData getAccidenDeptList(@RequestParam Map<String, Object> reqMap) {
			return service.getAccidenDeptList(new Criterion(reqMap));
	}

	/** 기관 리스트 받아오기 */
	@RequestMapping(value = "getAccidentDetail")
	public @ResponseBody ReturnData getAccidentDetail(@RequestParam Map<String, Object> reqMap) {
		return service.getAccidentDetail(new Criterion(reqMap));
	}

	/** 신고접수 처리상태 변경(할당,이관,폐기 등) */
	@RequestMapping(value = "updateAccidentProcess", method = RequestMethod.POST)
	public @ResponseBody ReturnData updateAccidentProcess(@RequestBody Map<String, Object> reqMap) {
		return service.updateAccidentProcess(new Criterion(reqMap, false));
	}

	/** 신고접수 다중 이관처리 */
	@RequestMapping(value = "updateMultiAccidentProcess", method = RequestMethod.POST)
	public @ResponseBody ReturnData updateMultiAccidentProcess(@RequestBody Map<String, Object> reqMap) {
		return service.updateMultiAccidentProcess(new Criterion(reqMap, false));
	}


	/** 신고 히스토리 리스트 받아오기 */
	@RequestMapping(value = "getAccidentHistoryList")
	public @ResponseBody ReturnData getAccidentHistoryList(@RequestParam Map<String, Object> reqMap) {
		return service.getAccidentHistoryList(new Criterion(reqMap));
	}

	/** 이관 지역 리스트 */
	@RequestMapping(value = "getLocalList")
	public @ResponseBody ReturnData getLocalList(@RequestParam Map<String, Object> reqMap) {
		return service.getLocalList(new Criterion(reqMap));
	}

	/** 개발원 지역 리스트 */
	@RequestMapping(value = "getPntInst")
	public @ResponseBody ReturnData getPntInst(@RequestParam Map<String, Object> reqMap) {
		try {
			return service.getPntInst(new Criterion(reqMap));
		} catch (Exception e) {
			e.printStackTrace();
			return new ReturnData(new ErrorInfo(e));
		}
	}

	/** 사고신고 한글 문서만들기 */
	@RequestMapping(value = "makeAcciHwpDownload", method = RequestMethod.POST)
	public @ResponseBody ReturnData makeAcciHwpDownload(@RequestBody Map<String, Object> reqMap, HttpServletResponse response) {
		try{


			String filename = AppGlobal.reportTemplate+"acc_report.hwp";
			HWPFile hwpFile = HWPReader.fromFile(filename);
			Section section = hwpFile.getBodyText().getSectionList().get(0);

			Control c = section.getParagraph(1).getControlList().get(0);
			ControlTable table = (ControlTable) c;
			ArrayList<Row> rows = table.getRowList();

			//기관명
			if(reqMap.get("dclInstName")!=null) {
				rows.get(1).getCellList().get(1).getParagraphList().getParagraph(0).createText();
				rows.get(1).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString(reqMap.get("dclInstName").toString());
			}
			//부서
			if(reqMap.get("dclDept")!=null) {
				rows.get(1).getCellList().get(3).getParagraphList().getParagraph(0).createText();
				rows.get(1).getCellList().get(3).getParagraphList().getParagraph(0).getText().addString(reqMap.get("dclDept").toString());
			}
			//성명
			if(reqMap.get("dclCrgr")!=null) {
				rows.get(2).getCellList().get(1).getParagraphList().getParagraph(0).createText();
				rows.get(2).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString(reqMap.get("dclCrgr").toString());
			}
			//이메일
			if(reqMap.get("dclEmail")!=null) {
				rows.get(3).getCellList().get(1).getParagraphList().getParagraph(0).createText();
				rows.get(3).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString(reqMap.get("dclEmail").toString());
			}
			//연락처
			if(reqMap.get("dclHpNo")!=null&&reqMap.get("dclTelNo") != null) {
				rows.get(4).getCellList().get(1).getParagraphList().getParagraph(0).createText();
				//rows.get(4).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString("HP : " + reqMap.get("dclHpNo").toString() + " / " +  "TEL : " + reqMap.get("dclTelNo").toString());
				rows.get(4).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString("TEL : " + reqMap.get("dclTelNo").toString());
			}else if(reqMap.get("dclHpNo")==null&&reqMap.get("dclTelNo") != null){
				rows.get(4).getCellList().get(1).getParagraphList().getParagraph(0).createText();
				rows.get(4).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString(" / " +  "TEL : " + reqMap.get("dclTelNo").toString());
			}else if(reqMap.get("dclHpNo")!=null&&reqMap.get("dclTelNo") != null){
				rows.get(4).getCellList().get(1).getParagraphList().getParagraph(0).createText();
				rows.get(4).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString("HP : " + reqMap.get("dclTelNo").toString() + " / ");
			}
			//사고일시
			if(reqMap.get("inciDt")!=null) {
				rows.get(6).getCellList().get(1).getParagraphList().getParagraph(0).createText();
				rows.get(6).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString(reqMap.get("inciDt").toString());
			}
			//피해IP주소
			if(reqMap.get("dmgIp")!=null) {
				rows.get(6).getCellList().get(3).getParagraphList().getParagraph(0).createText();
				rows.get(6).getCellList().get(3).getParagraphList().getParagraph(0).getText().addString(reqMap.get("dmgIp").toString());
			}
            //피해시스템용도 -> 미사용 영역 사고유형 한글값 들어간 컬럼으로 사용 dclHpNo
			if(reqMap.get("dclHpNo") !=null) {
				rows.get(7).getCellList().get(1).getParagraphList().getParagraph(0).createText();
				rows.get(7).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString(reqMap.get("dclHpNo").toString());
			}
			//운영체제
			if(reqMap.get("osNm")!=null) {
				rows.get(7).getCellList().get(3).getParagraphList().getParagraph(0).createText();
				rows.get(7).getCellList().get(3).getParagraphList().getParagraph(0).getText().addString(reqMap.get("osNm").toString());
			}
			//사고유형
			if(reqMap.get("accdTypName")!=null) {
				rows.get(8).getCellList().get(1).getParagraphList().getParagraph(0).createText();
				rows.get(8).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString(reqMap.get("accdTypName").toString());
			}
//			//피해범위
//			rows.get(8).getCellList().get(3).getParagraphList().getParagraph(0).createText();
//			rows.get(8).getCellList().get(3).getParagraphList().getParagraph(0).getText().addString("");
			//사고내용
			if(reqMap.get("inciDclCont")!=null) {
				String inciDclCont = (String)reqMap.get("inciDclCont");

				ArrayList<String> textList = new ArrayList<String>();
				textList.add(inciDclCont.replaceAll("\\n",System.lineSeparator()));
				//inciDclCont = inciDclCont.replaceFirst("\\n", "");
				//inciDclCont = inciDclCont.replaceAll("[\\u0001-\\u0008\\u000B-\\u001F]", "");
				//textList.add(inciDclCont.replaceAll("[\\u0001-\\u0008\\u000B-\\u001F]", ""));

				SetFieldResult sfr = FieldFinder.setFieldText(hwpFile, ControlType.FIELD_CLICKHERE,"필드1",textList);
			}
//			//공격자정보
			if(reqMap.get("attIp")!=null) {
				rows.get(11).getCellList().get(1).getParagraphList().getParagraph(0).createText();
				rows.get(11).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString(reqMap.get("attIp").toString() + "(" + reqMap.get("attNatnNm").toString() + ")");
			}
//			//피해현황
//			rows.get(12).getCellList().get(1).getParagraphList().getParagraph(0).createText();
//			rows.get(12).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString("");
			//긴급조치실시사항
			if(reqMap.get("inciInvsCont")!=null) {
				String inciInvsCont = (String)reqMap.get("inciInvsCont");

				ArrayList<String> textList = new ArrayList<String>();
				textList.add(inciInvsCont.replaceAll("\\n",System.lineSeparator()));

				SetFieldResult sfr = FieldFinder.setFieldText(hwpFile, ControlType.FIELD_CLICKHERE,"필드2",textList);
//				rows.get(13).getCellList().get(1).getParagraphList().getParagraph(0).createText();
//				rows.get(13).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString(reqMap.get("inciInvsCont").toString());
			}
//			//격리 불가 사유
//			rows.get(14).getCellList().get(1).getParagraphList().getParagraph(0).createText();
//			rows.get(14).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString("");
//			//관련보안제품운영현황
//			rows.get(15).getCellList().get(1).getParagraphList().getParagraph(0).createText();
//			rows.get(15).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString("");
//			//그밖에 사고 관련 내용을 구체적으로 서술
//			rows.get(17).getCellList().get(0).getParagraphList().getParagraph(0).createText();
//			rows.get(17).getCellList().get(0).getParagraphList().getParagraph(0).getText().addString("");

			//시도의견(스밖의 사고관랜 내용에 붙이기로)
			if(reqMap.get("inciBelowCont")!=null) {
				String inciBelowCont = (String)reqMap.get("inciBelowCont");

				ArrayList<String> textList = new ArrayList<String>();
				textList.add(inciBelowCont.replaceAll("\\n",System.lineSeparator()));

				SetFieldResult sfr = FieldFinder.setFieldText(hwpFile, ControlType.FIELD_CLICKHERE,"필드3",textList);
//				rows.get(13).getCellList().get(1).getParagraphList().getParagraph(0).createText();
//				rows.get(13).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString(reqMap.get("inciInvsCont").toString());
			}
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

			/*
			response.setContentType("application/octet-stream");
			response.setHeader("Content-Disposition", "attachment;filename=\"" + filename + "\"");
			response.setHeader("content-Transfer-Encoding", "binary");
			response.setHeader("Pragma", "no-cache;");
			response.setHeader("Expires", "-1");

			ServletOutputStream sos = null;
			InputStream fis = null;
			try {
				sos = response.getOutputStream();
				Path path = Paths.get(filename);
				fis = Files.newInputStream(path);
				FileCopyUtils.copy(fis, sos);
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				if (fis != null) {
					try {
						fis.close();
					} catch (IOException e) {
					}
				}
				if (sos != null) {
					try {
						sos.flush();
						sos.close();
					} catch (IOException e) {
					}
				}
			}
			return new ReturnData();
			*/
		}catch (FileNotFoundException e){
			e.printStackTrace();
			return new ReturnData(new ErrorInfo(e));
		}catch (IOException e){
			e.printStackTrace();
			return new ReturnData(new ErrorInfo(e));
		}catch (IllegalArgumentException e){
			e.printStackTrace();
			return new ReturnData(new ErrorInfo(e));
		}catch (Exception e){
			e.printStackTrace();
			return new ReturnData(new ErrorInfo(e));
		}
	}

	/** 엑셀로 사고신고 */
	@RequestMapping(value = "importExcel")
	public @ResponseBody ReturnData importExcel(@RequestParam Map<String, Object> reqMap, HttpServletResponse response) {
		return new ReturnData(service.importExcel(new Criterion(reqMap)));
	}

	/** eml로 사고신고 */
	@RequestMapping(value = "importEml")
	public @ResponseBody ReturnData importEml(@RequestParam Map<String, Object> reqMap, HttpServletResponse response) {
		return new ReturnData(service.importEml(new Criterion(reqMap)));
	}

	/** 사고접수 - 비고(취약점탐지) 세부내용 */
	@RequestMapping(value = "getTbzHomepv")
	public @ResponseBody ReturnData getTbzHomepv(@RequestParam Map<String, Object> reqMap) {
		return service.getTbzHomepv(new Criterion(reqMap));
	}

	/** 사고접수 - 비고(해킹) 세부내용 */
	@RequestMapping(value = "getTbzHacking")
	public @ResponseBody ReturnData getTbzHacking(@RequestParam Map<String, Object> reqMap) {
		return service.getTbzHacking(new Criterion(reqMap));
	}

	/** 피해 아이피 리스트 */
	@RequestMapping(value = "getDmgIpList")
	public @ResponseBody ReturnData getDmgIpList(@RequestParam Map<String, Object> reqMap) {
		return service.getDmgIpList(new Criterion(reqMap));
	}

	/** 공격 아이피 리스트 */
	@RequestMapping(value = "getAttIpList")
	public @ResponseBody ReturnData getAttIpList(@RequestParam Map<String, Object> reqMap) {
			return service.getAttIpList(new Criterion(reqMap));
	}

	@RequestMapping(value = "getTodayStatus")
	public @ResponseBody ReturnData getTodayStatus(@RequestParam Map<String, Object> reqMap) {
		return service.getTodayStatus(new Criterion(reqMap));
	}

	@RequestMapping(value = "getYearStatus")
	public @ResponseBody ReturnData getYearStatus(@RequestParam Map<String, Object> reqMap) {
			return service.getYearStatus(new Criterion(reqMap));
	}

	@RequestMapping(value = "getPeriodStatus")
	public @ResponseBody ReturnData getPeriodStatus(@RequestParam Map<String, Object> reqMap) {
			return service.getPeriodStatus(new Criterion(reqMap));
	}

	@RequestMapping(value = "getInstStatus")
	public @ResponseBody ReturnData getInstStatus(@RequestParam Map<String, Object> reqMap) {
		return service.getInstStatus(new Criterion(reqMap));
	}

	@RequestMapping(value = "getAccdTypeStatus")
	public @ResponseBody ReturnData getAccdTypeStatus(@RequestParam Map<String, Object> reqMap) {
		return service.getAccdTypeStatus(new Criterion(reqMap));
	}

	/** 입력아이피 국가 검색 */
	@RequestMapping(value = "getIpByNationNm", method = RequestMethod.POST)
	public @ResponseBody ReturnData checkIp(@RequestParam Map<String, Object> reqMap) throws UnknownHostException {
		return service.getIpByNationNm(new Criterion(reqMap));
	}

	/** 입력아이피 기관 검색 */
	@RequestMapping(value = "getInstByIP", method = RequestMethod.POST)
	public @ResponseBody ReturnData getInstByIP(@RequestParam Map<String, Object> reqMap) throws UnknownHostException {
		return service.getInstByIP(new Criterion(reqMap));
	}



	/** 엔지니어 - 사고접수 비암호화(이메일) 목록 */
	@RequestMapping(value = "getEncrySyncList")
	public @ResponseBody ReturnData getEncrySyncList(@RequestParam Map<String, Object> reqMap) {
			return service.getEncrySyncList(new Criterion(reqMap));
	}

	/** 엔지니어 - 사고접수 기존 이메일 정보들 SEED256 암호화 적용 일괄 update */
	@RequestMapping(value = "updateEncrySync", method = RequestMethod.POST)
	public @ResponseBody ReturnData updateEncrySync(@RequestBody Map<String, Object> reqMap) {
			return service.updateEncrySync(new Criterion(reqMap, false));
	}

	/** 국정원 마지막 처리자 정보 */
	@RequestMapping(value = "getNcscInfo")
	public @ResponseBody ReturnData getNcscInfo(@RequestParam Map<String, Object> reqMap) {
		try {
			return service.getNcscInfo(new Criterion(reqMap));
		} catch (Exception e) {
			e.printStackTrace();
			return new ReturnData(new ErrorInfo(e));
		}
	}

	@RequestMapping(value = "checkEncryText", method = RequestMethod.POST)
	public @ResponseBody ReturnData checkEncryText(@RequestBody Map<String, Object> reqMap) {
		return service.checkEncryText(new Criterion(reqMap, false));
	}

	//
	@RequestMapping(value = "getAccDuplList")
	public @ResponseBody ReturnData getAccDuplList(@RequestParam Map<String, Object> reqMap) {
		return service.getAccDuplList(new Criterion(reqMap));
	}

	/** 멀티이관 사고 종결 여부 체크 */
	@RequestMapping(value = "getInciMutiEndYn")
	public@ResponseBody  ReturnData getInciMutiEndYn(@RequestParam Map<String, Object> reqMap) {
		return service.getInciMutiEndYn(new Criterion(reqMap));
	}

	@RequestMapping(value = "getNciApi")
	public @ResponseBody String getNciApi(@RequestParam Map<String, Object> reqMap) {
		String ip = "10.46.126.53";
		String port = "8080";
		String result = "";
		try {
			String urlKey = "http://"+ip+":"+port+"/api/inci/key";

//			JSONObject jokey = (JSONObject) new JSONParser().parse(get(urlKey));
			JSONObject jokey = new JSONObject();
			jokey.put("key",urlKey);
			String key = jokey.get("key").toString();

			//list 요청
			String url = "http://"+ip+":"+port+"/api/inci/upload";

			String type = "RES";

			Calendar cal = Calendar.getInstance();

			JSONObject jo = new JSONObject();
			JSONObject j = new JSONObject();

			String email = "";
			if(reqMap.get("email") != null){
				email =  SEED_KISA256.Decrypt(reqMap.get("email").toString());
			}

			j.put("incidentId", reqMap.get("incidentId")); //ncscNo
			j.put("responseDateTime", reqMap.get("responseDateTime")); //처리시간
			j.put("institutionName", reqMap.get("institutionName")); //조치기관
			j.put("name", reqMap.get("name")); //조치자
			j.put("email",email);
			j.put("phone","");
			j.put("cellularPhone","");
			j.put("fax", "");
			j.put("responseType", "조치완료"); //여부값

			//String responseContent = (String)reqMap.get("responseContent");
			String responseContent = reqMap.get("responseContent").toString();
			String NcscContEncoder = new String(Base64Coder.encode(responseContent.getBytes("EUC-KR")));

			j.put("responseContent",NcscContEncoder );

			jo.put("responseInfo", j);


			CloseableHttpClient client = HttpClients.createDefault();
			HttpPost httppost = new HttpPost(url);

			MultipartEntityBuilder build = MultipartEntityBuilder.create();
			build.setMode(HttpMultipartMode.LEGACY);

			build.addTextBody("key", key);
			build.addTextBody("type",type);
			build.addTextBody("obj", URLEncoder.encode(jo.toJSONString(),"UTF-8"));


			httppost.setEntity(build.build());
			CloseableHttpResponse res = client.execute(httppost);

			HttpEntity reEntity = res.getEntity();

			String msg = "";
			if(reEntity != null){
				BufferedReader rd = new BufferedReader(new InputStreamReader(reEntity.getContent(),"UTF-8"));

				String line = "";
				while ((line = rd.readLine())!=null){
					msg += line;
				}
				rd.close();
			}
			result = msg;

		}catch (JSONException e) {
			e.printStackTrace();
		}
		catch (Exception e) {
			e.printStackTrace();
		}


		return result;
	}

	public String get(String url){

		StringBuffer buffer = new StringBuffer();
		BufferedReader rd = null;
		try {

			CloseableHttpClient client = HttpClients.createDefault();

			HttpGet httpget = new HttpGet(url);

			httpget.setHeader("Content-Type","application/json");

			CloseableHttpResponse res = client.execute(httpget);
			HttpEntity reEntity = res.getEntity();
			if(reEntity != null){

				rd = new BufferedReader(new InputStreamReader(reEntity.getContent(),"UTF-8"));
				String line = "";
				while ((line = rd.readLine()) != null) {
					buffer.append(line);

				}
			}

			rd.close();

		} catch (Exception e) {
			e.printStackTrace();
		}
		return buffer.toString();
	}
}

