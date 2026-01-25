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
package com.klid.webapp.main.rpt.reportCollection.service;

import com.klid.common.AppGlobal;
import com.klid.common.util.XLSFileBuilder;
import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ErrorInfo;
import com.klid.webapp.common.MsgService;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.rpt.reportCollection.dto.*;
import com.klid.webapp.main.rpt.reportCollection.dto.ReportDailyDto;
import com.klid.webapp.main.rpt.reportCollection.persistence.ReportCollectionMapper;
import com.klid.webapp.main.rpt.reportDailyState.persistence.ReportDailyStateMapper;
import com.klid.webapp.webdash.adminControl.dto.InciCntDto;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.poi.hssf.usermodel.*;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.usermodel.Font;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import jakarta.annotation.Resource;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;
import java.awt.Color;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.List;

@Service("reportCollectionService")
public class ReportCollectionServiceImpl extends MsgService implements ReportCollectionService {

	@Resource(name = "reportCollectionMapper")
	private ReportCollectionMapper mapper;

	@Resource(name = "reportDailyStateMapper")
	private ReportDailyStateMapper dailymapper;

	@Override
	public ReturnData getRetrieveSecurityHackingDetail(Criterion criterion) {
		return new ReturnData(mapper.getRetrieveSecurityHackingDetail(criterion.getCondition()));
	}

	@Override
	public ReturnData getSecuListDetail(Criterion criterion)  {
		return new ReturnData(mapper.getSecuListDetail(criterion.getCondition()));
	}

	@Override
	public ReturnData getNoticeListDetail(Criterion criterion){
		return new ReturnData(mapper.getNoticeListDetail(criterion.getCondition()));
	}

	@Override
	public ReturnData getRetrieveSecurityVulnerabilityDetail(Criterion criterion) {
		return new ReturnData(mapper.getRetrieveSecurityVulnerabilityDetail(criterion.getCondition()));
	}

	@Override
	public ReturnData getRetrieveIncidentDetail(Criterion criterion)  {
		return new ReturnData(mapper.getRetrieveIncidentDetail(criterion.getCondition()));
	}

	@Override
	public ReturnData exportNoticeList(HttpServletResponse response, Criterion criterion) {
		ReturnData returnData = null;
		ServletOutputStream sos = null;
		try {
			String fileNm = "공지사항현황";
			String sheetNm = "공지사항현황";
			String[][] headers = new String[][] {
					{ "순번", "100" }, { "분류", "200" }, { "제목", "900" },
					{ "소속", "200" }, { "게시자", "200" }, { "등록일", "200" }
			};
			XLSFileBuilder xls = new XLSFileBuilder();
			xls.newSheet(sheetNm);
			xls.addHeaders(headers);
			xls.nextRow();

			ReturnData excelData = getNoticeListDetail(criterion);
			if (!excelData.getHasError()) {
				List<ReportNoticeDto> list = (List<ReportNoticeDto>) excelData.getResultData();
				int totalCnt = list.size() + 1;
				if (list != null && list.size() > 0) {
					int colIdx = 0;
					int sheetCnt=0;
					int maxinumRow = 10000; // 한 시트에 데이터를 몇개까지 넣을지에 대한 값
					for (int i=0; i<list.size(); i++) {
						ReportNoticeDto dto = list.get(i);
						colIdx = 0;
						xls.setDataValue(colIdx++, i+1, xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getCateName(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getBultnTitle(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getInstNm(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getUserName(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getRegDate(), xls.centerValueStyle);

						xls.nextRow();

						// 엑셀에 row 추가할 때 maxinumRow 건 넘어가면 다음 시트에 넣도록 작업
						if((i+1)%maxinumRow==0){
							sheetCnt++;
							xls.newSheet(sheetNm+"_"+sheetCnt);
							xls.addHeaders(headers);
							xls.nextRow();
						}
					}
				}
			}

			String createTime = DateFormatUtils.format(new Date(), "yyyyMMddHHmmssSSS");
			String fileName = AppGlobal.homePath + "/export/" + createTime + ".xls";
			xls.save(fileName);
			Map<String, String> resultMap = new HashMap<String, String>();
			resultMap.put("filePath", "/export/" + createTime + ".xls");
			resultMap.put("fileName", fileNm);
			returnData = new ReturnData(resultMap);
		} catch (Exception e) {
			e.printStackTrace();
			returnData = new ReturnData(new ErrorInfo(e));
		} finally {
			if (sos != null) {
				try {
					sos.flush();
				} catch (IOException e) {
					sos = null;
				}
				try {
					sos.close();
				} catch (IOException e) {
					sos = null;
				}
			}
		}
		return returnData;
	}

	@Override
	public ReturnData exportSecuList(HttpServletResponse response, Criterion criterion){
		ReturnData returnData = null;
		ServletOutputStream sos = null;
		try {
			String fileNm = "보안자료실현황";
			String sheetNm = "보안자료실현황";
			String[][] headers = new String[][] {
					{ "순번", "100" }, { "분류", "200" }, { "제목", "900" },
					{ "소속", "200" }, { "게시자", "200" }, { "등록일", "200" }
			};
			XLSFileBuilder xls = new XLSFileBuilder();
			xls.newSheet(sheetNm);
			xls.addHeaders(headers);
			xls.nextRow();

			ReturnData excelData = getSecuListDetail(criterion);
			if (!excelData.getHasError()) {
				List<ReportSecurityDataDto> list = (List<ReportSecurityDataDto>) excelData.getResultData();
				int totalCnt = list.size() + 1;
				if (list != null && list.size() > 0) {
					int colIdx = 0;
					int sheetCnt=0;
					int maxinumRow = 10000; // 한 시트에 데이터를 몇개까지 넣을지에 대한 값
					for (int i=0; i<list.size(); i++) {
						ReportSecurityDataDto dto = list.get(i);
						colIdx = 0;
						xls.setDataValue(colIdx++, i+1, xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getCateName(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getBultnTitle(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getInstNm(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getUserName(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getRegDate(), xls.centerValueStyle);

						xls.nextRow();

						// 엑셀에 row 추가할 때 maxinumRow 건 넘어가면 다음 시트에 넣도록 작업
						if((i+1)%maxinumRow==0){
							sheetCnt++;
							xls.newSheet(sheetNm+"_"+sheetCnt);
							xls.addHeaders(headers);
							xls.nextRow();
						}
					}
				}
			}

			String createTime = DateFormatUtils.format(new Date(), "yyyyMMddHHmmssSSS");
			String fileName = AppGlobal.homePath + "/export/" + createTime + ".xls";
			xls.save(fileName);
			Map<String, String> resultMap = new HashMap<String, String>();
			resultMap.put("filePath", "/export/" + createTime + ".xls");
			resultMap.put("fileName", fileNm);
			returnData = new ReturnData(resultMap);
		} catch (Exception e) {
			e.printStackTrace();
			returnData = new ReturnData(new ErrorInfo(e));
		} finally {
			if (sos != null) {
				try {
					sos.flush();
				} catch (IOException e) {
					sos = null;
				}
				try {
					sos.close();
				} catch (IOException e) {
					sos = null;
				}
			}
		}
		return returnData;
	}

	@Override
	public ReturnData exportRetrieveSecurityHacking(HttpServletResponse response, Criterion criterion) {
		ReturnData returnData = null;
		ServletOutputStream sos = null;
		try {
			String fileNm = "해킹관리대장";
			String sheetNm = "해킹관리대장";
			String[][] headers = new String[][] {
					{ "순번", "100" }, { "사고번호", "200" }, { "피해기관", "100" },
					{ "해킹일자", "80" }, { "사고대상", "200" }, { "IP정보", "200" },
					{ "도메인", "200" }, { "망구분", "120" },
					{ "내용", "200" }, { "공격유형", "200" }, { "비고", "200" },
					{ "언론보도", "200" }, { "사고히스토리", "200" }, { "분석히스토리", "200" },{ "종결", "120" }
			};
			XLSFileBuilder xls = new XLSFileBuilder();
			xls.newSheet(sheetNm);
			xls.addHeaders(headers);
			xls.nextRow();

			ReturnData excelData = getRetrieveSecurityHackingDetail(criterion);
			if (!excelData.getHasError()) {
				List<ReportHackingDto> list = (List<ReportHackingDto>) excelData.getResultData();
				if (list != null && list.size() > 0) {
					int colIdx = 0;
					int sheetCnt=0;
					int maxinumRow = 10000; // 한 시트에 데이터를 몇개까지 넣을지에 대한 값
					int seqNo = 1;
					for (int i=0; i<list.size(); i++) {
						ReportHackingDto dto = list.get(i);
						colIdx = 0;
						xls.setDataValue(colIdx++, seqNo++, xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getInciNo(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getDmgInstNm(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getHackingDt(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getInciTarget(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getIpAddress(), xls.centerValueStyle);
						//xls.setDataValue(colIdx++, dto.getInstType(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getDomainNm(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getNetDiv(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getHackingCont(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getAttackTypeNm(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getRemark(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getMediaReport(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getInciHistory(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getAnalysisHistory(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getInciPrcsStatNm(), xls.centerValueStyle);

						xls.nextRow();

						// 엑셀에 row 추가할 때 maxinumRow 건 넘어가면 다음 시트에 넣도록 작업
						if((i+1)%maxinumRow==0){
							sheetCnt++;
							xls.newSheet(sheetNm+"_"+sheetCnt);
							xls.addHeaders(headers);
							xls.nextRow();
						}
					}
				}
			}

			String createTime = DateFormatUtils.format(new Date(), "yyyyMMddHHmmssSSS");
			String fileName = AppGlobal.homePath + "/export/" + createTime + ".xls";
			xls.save(fileName);
			Map<String, String> resultMap = new HashMap<String, String>();
			resultMap.put("filePath", "/export/" + createTime + ".xls");
			resultMap.put("fileName", fileNm);
			returnData = new ReturnData(resultMap);
		} catch (Exception e) {
			e.printStackTrace();
			returnData = new ReturnData(new ErrorInfo(e));
		} finally {
			if (sos != null) {
				try {
					sos.flush();
				} catch (IOException e) {
					sos = null;
				}
				try {
					sos.close();
				} catch (IOException e) {
					sos = null;
				}
			}
		}
		return returnData;
	}

	@Override
	public ReturnData exportRetrieveSecurityVulnerability(HttpServletResponse response, Criterion criterion) {
		ReturnData returnData = null;
		ServletOutputStream sos = null;
		try {
			String fileNm = "취약점관리대장";
			String sheetNm = "취약점관리대장";
			String[][] headers = new String[][] {
					{ "순번", "80" }, { "사고번호", "200" }, { "취약점내용", "300" },
					{ "피해기관명", "80" }, { "접수일자", "80" }, { "조치사항", "800" },
					{ "시도결과", "200" }
			};
			XLSFileBuilder xls = new XLSFileBuilder();
			xls.newSheet(sheetNm);
			xls.addHeaders(headers);
			xls.nextRow();

			ReturnData excelData = getRetrieveSecurityVulnerabilityDetail(criterion);
			if (!excelData.getHasError()) {
				List<ReportSecurityVulnerabilityDto> list = (List<ReportSecurityVulnerabilityDto>) excelData.getResultData();
				int totalCnt = list.size() + 1;
				if (list != null && list.size() > 0) {
					int colIdx = 0;
					int sheetCnt=0;
					int maxinumRow = 10000; // 한 시트에 데이터를 몇개까지 넣을지에 대한 값
					for (int i=0; i<list.size(); i++) {
						ReportSecurityVulnerabilityDto dto = list.get(i);
						colIdx = 0;
						xls.setDataValue(colIdx++, i+1, xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getInciNo(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getInciTtl(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getInstNm(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getInciAcpnDt(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getVulnerbilityCont(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getHstyCont(), xls.centerValueStyle);
						xls.nextRow();

						// 엑셀에 row 추가할 때 maxinumRow 건 넘어가면 다음 시트에 넣도록 작업
						if((i+1)%maxinumRow==0){
							sheetCnt++;
							xls.newSheet(sheetNm+"_"+sheetCnt);
							xls.addHeaders(headers);
							xls.nextRow();
						}
					}
				}
			}

			String createTime = DateFormatUtils.format(new Date(), "yyyyMMddHHmmssSSS");
			String fileName = AppGlobal.homePath + "/export/" + createTime + ".xls";
			xls.save(fileName);
			Map<String, String> resultMap = new HashMap<String, String>();
			resultMap.put("filePath", "/export/" + createTime + ".xls");
			resultMap.put("fileName", fileNm);
			returnData = new ReturnData(resultMap);
		} catch (Exception e) {
			e.printStackTrace();
			returnData = new ReturnData(new ErrorInfo(e));
		} finally {
			if (sos != null) {
				try {
					sos.flush();
				} catch (IOException e) {
					sos = null;
				}
				try {
					sos.close();
				} catch (IOException e) {
					sos = null;
				}
			}
		}
		return returnData;
	}

	@Override
	public ReturnData exportRetrieveIncidentDetail(HttpServletResponse response, Criterion criterion) {
		ReturnData returnData = null;
		ServletOutputStream sos = null;
		try {
			String fileNm = "처리중현황";
			String sheetNm = "처리중현황";
			String[][] headers = new String[][] {
					{ "순번", "80" }, { "사고번호", "200" }, { "피해기관", "100" },
					{ "사고처리기관", "200" }, { "제목(탐지명)", "500" }, { "사고유형", "200" },
					{ "접수날짜", "200" },{ "처리상태", "200" },{ "마지막수정날짜", "200" }, { "경과일(일)", "100" }
			};
			XLSFileBuilder xls = new XLSFileBuilder();
			xls.newSheet(sheetNm);
			xls.addHeaders(headers);
			xls.nextRow();

			criterion.addParam("type","proceed");
			ReturnData excelData = getRetrieveIncidentDetail(criterion);
			if (!excelData.getHasError()) {
				List<ReportDailyDto> list = (List<ReportDailyDto>) excelData.getResultData();
				int totalCnt = list.size() + 1;
				if (list != null && list.size() > 0) {
					int colIdx = 0;
					int sheetCnt=0;
					int maxinumRow = 10000; // 한 시트에 데이터를 몇개까지 넣을지에 대한 값
					for (int i=0; i<list.size(); i++) {
						ReportDailyDto dto = list.get(i);
						colIdx = 0;
						xls.setDataValue(colIdx++, i+1, xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getInciNo(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getDmgInstNm(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getDclInstNm(), xls.centerValueStyle);

						if(dto.getInciDttNm() != null && !dto.getInciDttNm().equals("") && !dto.getInciDttNm().equals("null")){
							xls.setDataValue(colIdx++, dto.getInciTtl() + "[" + dto.getInciDttNm() +"]", xls.centerValueStyle);
						} else {
							xls.setDataValue(colIdx++, dto.getInciTtl(), xls.centerValueStyle);
						}
						xls.setDataValue(colIdx++, dto.getAttCodeName(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getInciAcpnDt(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getInciPrcsStatCodeNm(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getInciUpdDt(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getTermDay(), xls.centerValueStyle);
						/*xls.setDataValue(colIdx++, dto.getAttCodeName(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getInciAcpnDate(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getInciAcpnTime(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getInciPrcsStatNm(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getDclCrgr(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getNationNm(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getPrty(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getSigun(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getTermDay(), xls.centerValueStyle);*/
						xls.nextRow();

						// 엑셀에 row 추가할 때 maxinumRow 건 넘어가면 다음 시트에 넣도록 작업
						if((i+1)%maxinumRow==0){
							sheetCnt++;
							xls.newSheet(sheetNm+"_"+sheetCnt);
							xls.addHeaders(headers);
							xls.nextRow();
						}
					}
				}
			}

			String createTime = DateFormatUtils.format(new Date(), "yyyyMMddHHmmssSSS");
			String fileName = AppGlobal.homePath + "/export/" + createTime + ".xls";
			xls.save(fileName);
			Map<String, String> resultMap = new HashMap<String, String>();
			resultMap.put("filePath", "/export/" + createTime + ".xls");
			resultMap.put("fileName", fileNm);
			returnData = new ReturnData(resultMap);
		} catch (Exception e) {
			e.printStackTrace();
			returnData = new ReturnData(new ErrorInfo(e));
		} finally {
			if (sos != null) {
				try {
					sos.flush();
				} catch (IOException e) {
					sos = null;
				}
				try {
					sos.close();
				} catch (IOException e) {
					sos = null;
				}
			}
		}
		return returnData;
	}


	@Override
	public ReturnData exportReportCtrsDaily(HttpServletResponse response, Criterion criterion) {
		ReturnData returnData = null;
		ServletOutputStream sos = null;
		String minusOne=null, minusTwo=null,minusThree=null, minusFour=null,minusFive=null,minusSix=null,minusSeven=null;
		try{
			String startDt = criterion.getValue("startDt").toString();
			String endDt = criterion.getValue("endDt").toString();

			SimpleDateFormat dt = new SimpleDateFormat("yyyyMMddHHmmss");
			Date endDate = dt.parse(endDt);

			Calendar c = Calendar.getInstance();
			c.setTime(endDate);
			c.add(Calendar.DATE, -7);
			criterion.addParam("weekDt", dt.format(c.getTime()));

			List<ReportCollectionDto> typeList = mapper.selectInciWarnCnt(criterion.getCondition());
			List<ReportCollectionDto> localList = mapper.selectLocalInciWarnCnt(criterion.getCondition());

			Date compareDt=dt.parse(endDt);

			Calendar compareC = Calendar.getInstance();
			compareC.setTime(compareDt);
			compareC.add(Calendar.DATE, -1);
			 minusOne = dt.format(compareC.getTime());
			compareC.add(Calendar.DATE, -1);
			 minusTwo = dt.format(compareC.getTime());
			compareC.add(Calendar.DATE, -1);
			 minusThree = dt.format(compareC.getTime());
			compareC.add(Calendar.DATE, -1);
			 minusFour = dt.format(compareC.getTime());
			compareC.add(Calendar.DATE, -1);
			 minusFive = dt.format(compareC.getTime());
			compareC.add(Calendar.DATE, -1);
			 minusSix = dt.format(compareC.getTime());
			compareC.add(Calendar.DATE, -1);
			 minusSeven = dt.format(compareC.getTime());

			List<InciCntDto> minusOneList = new ArrayList<>();
			List<InciCntDto> minusTwoList = new ArrayList<>();
			List<InciCntDto> minusThreeList = new ArrayList<>();
			List<InciCntDto> minusFourList = new ArrayList<>();
			List<InciCntDto> minusFiveList = new ArrayList<>();
			List<InciCntDto> minusSixList = new ArrayList<>();
			List<InciCntDto> minusSevenList = new ArrayList<>();
			List<InciCntDto> typeSumList = new ArrayList<>();
			List<InciCntDto> localSumList = new ArrayList<>();

			if(endDt.substring(8,endDt.length()).equals("235959")){
				for(ReportCollectionDto sumJson : typeList) {
					if(sumJson.getRegTime().substring(0,8).equals(minusOne.substring(0,8))){//1일전
						minusOneList= sumTypeJson(sumJson.getValue(), minusOneList);
					}else if(sumJson.getRegTime().substring(0,8).equals(minusTwo.substring(0,8))){//2일전
						minusTwoList= sumTypeJson(sumJson.getValue(), minusTwoList);
					}else if(sumJson.getRegTime().substring(0,8).equals(minusThree.substring(0,8))){//3일전
						minusThreeList=sumTypeJson(sumJson.getValue(), minusThreeList);
					}else if(sumJson.getRegTime().substring(0,8).equals(minusFour.substring(0,8))){//4일전
						minusFourList=sumTypeJson(sumJson.getValue(), minusFourList);
					}else if(sumJson.getRegTime().substring(0,8).equals(minusFive.substring(0,8))){//5일전
						minusFiveList=sumTypeJson(sumJson.getValue(), minusFiveList);
					}else if(sumJson.getRegTime().substring(0,8).equals(minusSix.substring(0,8))){//6일전
						minusSixList=sumTypeJson(sumJson.getValue(), minusSixList);
					}else{//오늘
						minusSevenList=sumTypeJson(sumJson.getValue(), minusSevenList);
					}
					typeSumList = sumTypeJson(sumJson.getValue(), typeSumList);
				}
			}else{
				for(ReportCollectionDto sumJson : typeList) {
					double regTime= Double.parseDouble(sumJson.getRegTime());

					if(regTime>Double.parseDouble(minusSeven)&&regTime<Double.parseDouble(minusSix)){//6일전
						minusSixList=sumTypeJson(sumJson.getValue(), minusSixList);
					}else if(regTime>Double.parseDouble(minusSix)&&regTime<Double.parseDouble(minusFive)){//5일전
						minusFiveList=sumTypeJson(sumJson.getValue(), minusFiveList);
					}else if(regTime>Double.parseDouble(minusFive)&&regTime<Double.parseDouble(minusFour)){//4일전
						minusFourList=sumTypeJson(sumJson.getValue(), minusFourList);
					}else if(regTime>Double.parseDouble(minusFour)&&regTime<Double.parseDouble(minusThree)){//3일전
						minusThreeList=sumTypeJson(sumJson.getValue(), minusThreeList);
					}else if(regTime>Double.parseDouble(minusThree)&&regTime<Double.parseDouble(minusTwo)){//2일전
						minusTwoList=sumTypeJson(sumJson.getValue(), minusTwoList);
					}else if(regTime>Double.parseDouble(minusTwo)&&regTime<Double.parseDouble(minusOne)){//1일전
						minusOneList=sumTypeJson(sumJson.getValue(), minusOneList);
					}else{//오늘
						minusSevenList=sumTypeJson(sumJson.getValue(), minusSevenList);
					}
					typeSumList = sumTypeJson(sumJson.getValue(), typeSumList);
				}
			}

			for(ReportCollectionDto sumJson : localList) {
				localSumList = sumTypeJson(sumJson.getValue(), localSumList);
			}

			String filename = AppGlobal.reportTemplate + "report_daily.xls";

			FileInputStream inputStream = new FileInputStream(filename);
			HSSFWorkbook workbook = new HSSFWorkbook(inputStream);
			FormulaEvaluator evaluator = workbook.getCreationHelper().createFormulaEvaluator();
			HSSFSheet sheet = workbook.getSheetAt(0);

			//기간
			HSSFRow row = sheet.getRow(2);
			HSSFCell cell = row.getCell(9);
			startDt = startDt.substring(0,4)+"-"+startDt.substring(4,6)+"-"+startDt.substring(6,8)+" "+startDt.substring(8,10)+":"+startDt.substring(10,12);
			endDt = endDt.substring(0,4)+"-"+endDt.substring(4,6)+"-"+endDt.substring(6,8)+" "+endDt.substring(8,10)+":"+endDt.substring(10,12);
			cell.setCellValue(startDt+"~"+endDt);

			//7일치 날짜
			row = sheet.getRow(5);
			if(endDt.substring(8,endDt.length()).equals("235959")){
				cell = row.getCell(3);
				cell.setCellValue(minusSix.substring(4,6)+"-"+minusSix.substring(6,8));
				cell = row.getCell(4);
				cell.setCellValue(minusFive.substring(4,6)+"-"+minusFive.substring(6,8));
				cell = row.getCell(5);
				cell.setCellValue(minusFour.substring(4,6)+"-"+minusFour.substring(6,8));
				cell = row.getCell(6);
				cell.setCellValue(minusThree.substring(4,6)+"-"+minusThree.substring(6,8));
				cell = row.getCell(7);
				cell.setCellValue(minusTwo.substring(4,6)+"-"+minusTwo.substring(6,8));
				cell = row.getCell(8);
				cell.setCellValue(minusOne.substring(4,6)+"-"+minusOne.substring(6,8));
				cell = row.getCell(9);
				String today =criterion.getValue("endDt").toString();
				cell.setCellValue(today.substring(4,6)+"-"+today.substring(6,8));
			}else{
				cell = row.getCell(3);
				cell.setCellValue(minusSeven.substring(4,6)+"-"+minusSeven.substring(6,8));
				cell = row.getCell(4);
				cell.setCellValue(minusSix.substring(4,6)+"-"+minusSix.substring(6,8));
				cell = row.getCell(5);
				cell.setCellValue(minusFive.substring(4,6)+"-"+minusFive.substring(6,8));
				cell = row.getCell(6);
				cell.setCellValue(minusFour.substring(4,6)+"-"+minusFour.substring(6,8));
				cell = row.getCell(7);
				cell.setCellValue(minusThree.substring(4,6)+"-"+minusThree.substring(6,8));
				cell = row.getCell(8);
				cell.setCellValue(minusTwo.substring(4,6)+"-"+minusTwo.substring(6,8));
				cell = row.getCell(9);
				cell.setCellValue(minusOne.substring(4,6)+"-"+minusOne.substring(6,8));
			}

			//7일치 비인가접근
			row = sheet.getRow(7);
			cell = row.getCell(3);
			for(InciCntDto dto:minusSixList){
				if(dto.getName().equals("비인가접근")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}
			cell = row.getCell(4);
			for(InciCntDto dto:minusFiveList){
				if(dto.getName().equals("비인가접근")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}
			cell = row.getCell(5);
			for(InciCntDto dto:minusFourList){
				if(dto.getName().equals("비인가접근")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}
			cell = row.getCell(6);
			for(InciCntDto dto:minusThreeList){
				if(dto.getName().equals("비인가접근")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}
			cell = row.getCell(7);
			for(InciCntDto dto:minusTwoList){
				if(dto.getName().equals("비인가접근")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}
			cell = row.getCell(8);
			for(InciCntDto dto:minusOneList){
				if(dto.getName().equals("비인가접근")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}
			cell = row.getCell(9);
			for(InciCntDto dto:minusSevenList){
				if(dto.getName().equals("비인가접근")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}

			//7일치 서비스거부공격
			row = sheet.getRow(8);
			cell = row.getCell(3);
			for(InciCntDto dto:minusSixList){
				if(dto.getName().equals("서비스거부")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}
			cell = row.getCell(4);
			for(InciCntDto dto:minusFiveList){
				if(dto.getName().equals("서비스거부")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}
			cell = row.getCell(5);
			for(InciCntDto dto:minusFourList){
				if(dto.getName().equals("서비스거부")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}
			cell = row.getCell(6);
			for(InciCntDto dto:minusThreeList){
				if(dto.getName().equals("서비스거부")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}
			cell = row.getCell(7);
			for(InciCntDto dto:minusTwoList){
				if(dto.getName().equals("서비스거부")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}
			cell = row.getCell(8);
			for(InciCntDto dto:minusOneList){
				if(dto.getName().equals("서비스거부")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}
			cell = row.getCell(9);
			for(InciCntDto dto:minusSevenList){
				if(dto.getName().equals("서비스거부")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}

			//7일치 악성코드
			row = sheet.getRow(9);
			cell = row.getCell(3);
			for(InciCntDto dto:minusSixList){
				if(dto.getName().equals("악성코드")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}
			cell = row.getCell(4);
			for(InciCntDto dto:minusFiveList){
				if(dto.getName().equals("악성코드")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}
			cell = row.getCell(5);
			for(InciCntDto dto:minusFourList){
				if(dto.getName().equals("악성코드")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}
			cell = row.getCell(6);
			for(InciCntDto dto:minusThreeList){
				if(dto.getName().equals("악성코드")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}
			cell = row.getCell(7);
			for(InciCntDto dto:minusTwoList){
				if(dto.getName().equals("악성코드")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}
			cell = row.getCell(8);
			for(InciCntDto dto:minusOneList){
				if(dto.getName().equals("악성코드")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}
			cell = row.getCell(9);
			for(InciCntDto dto:minusSevenList){
				if(dto.getName().equals("악성코드")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}

			//7일치 웹해킹
			row = sheet.getRow(10);
			cell = row.getCell(3);
			for(InciCntDto dto:minusSixList){
				if(dto.getName().equals("웹해킹")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}
			cell = row.getCell(4);
			for(InciCntDto dto:minusFiveList){
				if(dto.getName().equals("웹해킹")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}
			cell = row.getCell(5);
			for(InciCntDto dto:minusFourList){
				if(dto.getName().equals("웹해킹")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}
			cell = row.getCell(6);
			for(InciCntDto dto:minusThreeList){
				if(dto.getName().equals("웹해킹")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}
			cell = row.getCell(7);
			for(InciCntDto dto:minusTwoList){
				if(dto.getName().equals("웹해킹")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}
			cell = row.getCell(8);
			for(InciCntDto dto:minusOneList){
				if(dto.getName().equals("웹해킹")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}
			cell = row.getCell(9);
			for(InciCntDto dto:minusSevenList){
				if(dto.getName().equals("웹해킹")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}

			//7일치 정보수집
			row = sheet.getRow(11);
			cell = row.getCell(3);
			for(InciCntDto dto:minusSixList){
				if(dto.getName().equals("정보수집")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}
			cell = row.getCell(4);
			for(InciCntDto dto:minusFiveList){
				if(dto.getName().equals("정보수집")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}
			cell = row.getCell(5);
			for(InciCntDto dto:minusFourList){
				if(dto.getName().equals("정보수집")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}
			cell = row.getCell(6);
			for(InciCntDto dto:minusThreeList){
				if(dto.getName().equals("정보수집")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}
			cell = row.getCell(7);
			for(InciCntDto dto:minusTwoList){
				if(dto.getName().equals("정보수집")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}
			cell = row.getCell(8);
			for(InciCntDto dto:minusOneList){
				if(dto.getName().equals("정보수집")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}
			cell = row.getCell(9);
			for(InciCntDto dto:minusSevenList){
				if(dto.getName().equals("정보수집")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}

			//7일치 기타
			row = sheet.getRow(12);
			cell = row.getCell(3);
			for(InciCntDto dto:minusSixList){
				if(dto.getName().equals("기타")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}
			cell = row.getCell(4);
			for(InciCntDto dto:minusFiveList){
				if(dto.getName().equals("기타")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}
			cell = row.getCell(5);
			for(InciCntDto dto:minusFourList){
				if(dto.getName().equals("기타")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}
			cell = row.getCell(6);
			for(InciCntDto dto:minusThreeList){
				if(dto.getName().equals("기타")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}
			cell = row.getCell(7);
			for(InciCntDto dto:minusTwoList){
				if(dto.getName().equals("기타")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}
			cell = row.getCell(8);
			for(InciCntDto dto:minusOneList){
				if(dto.getName().equals("기타")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}
			cell = row.getCell(9);
			for(InciCntDto dto:minusSevenList){
				if(dto.getName().equals("기타")){
					cell.setCellValue(dto.getEvtCnt());
				}
			}

			row = sheet.getRow(33);
			for(InciCntDto dto : localSumList){
				switch (dto.getName()){
					case "서울":
						cell = row.getCell(3);
						cell.setCellValue(dto.getEvtCnt());
						break;
					case "부산":
						cell = row.getCell(4);
						cell.setCellValue(dto.getEvtCnt());
						break;
					case "대구":
						cell = row.getCell(5);
						cell.setCellValue(dto.getEvtCnt());
						break;
					case "인천":
						cell = row.getCell(6);
						cell.setCellValue(dto.getEvtCnt());
						break;
					case "광주":
						cell = row.getCell(7);
						cell.setCellValue(dto.getEvtCnt());
						break;
					case "대전":
						cell = row.getCell(8);
						cell.setCellValue(dto.getEvtCnt());
						break;
					case "울산":
						cell = row.getCell(9);
						cell.setCellValue(dto.getEvtCnt());
						break;
					case "경기":
						cell = row.getCell(10);
						cell.setCellValue(dto.getEvtCnt());
						break;
					case "강원":
						cell = row.getCell(11);
						cell.setCellValue(dto.getEvtCnt());
						break;
					case "충북":
						cell = row.getCell(12);
						cell.setCellValue(dto.getEvtCnt());
						break;
					case "충남":
						cell = row.getCell(13);
						cell.setCellValue(dto.getEvtCnt());
						break;
					case "전북":
						cell = row.getCell(14);
						cell.setCellValue(dto.getEvtCnt());
						break;
					case "전남":
						cell = row.getCell(15);
						cell.setCellValue(dto.getEvtCnt());
						break;
					case "경북":
						cell = row.getCell(16);
						cell.setCellValue(dto.getEvtCnt());
						break;
					case "경남":
						cell = row.getCell(17);
						cell.setCellValue(dto.getEvtCnt());
						break;
					case "제주":
						cell = row.getCell(18);
						cell.setCellValue(dto.getEvtCnt());
						break;
					case "세종":
						cell = row.getCell(19);
						cell.setCellValue(dto.getEvtCnt());
						break;
				}
			}

			row = sheet.getRow(6);
			cell = row.getCell(3);
			cell.setCellType(CellType.FORMULA);
			cell.setCellFormula("SUM(D8:D13)");

			cell = row.getCell(4);
			cell.setCellType(CellType.FORMULA);
			cell.setCellFormula("SUM(E8:E13)");

			cell = row.getCell(5);
			cell.setCellType(CellType.FORMULA);
			cell.setCellFormula("SUM(F8:F13)");

			cell = row.getCell(6);
			cell.setCellType(CellType.FORMULA);
			cell.setCellFormula("SUM(G8:G13)");

			cell = row.getCell(7);
			cell.setCellType(CellType.FORMULA);
			cell.setCellFormula("SUM(H8:H13)");

			cell = row.getCell(8);
			cell.setCellType(CellType.FORMULA);
			cell.setCellFormula("SUM(I8:I13)");

			cell = row.getCell(2);
			cell.setCellType(CellType.FORMULA);
			cell.setCellFormula("SUM(D7:J7)");

			row = sheet.getRow(7);
			cell = row.getCell(2);
			cell.setCellType(CellType.FORMULA);
			cell.setCellFormula("SUM(D8:J8)");

			row = sheet.getRow(8);
			cell = row.getCell(2);
			cell.setCellType(CellType.FORMULA);
			cell.setCellFormula("SUM(D9:J9)");

			row = sheet.getRow(9);
			cell = row.getCell(2);
			cell.setCellType(CellType.FORMULA);
			cell.setCellFormula("SUM(D10:J10)");

			row = sheet.getRow(10);
			cell = row.getCell(2);
			cell.setCellType(CellType.FORMULA);
			cell.setCellFormula("SUM(D11:J11)");

			row = sheet.getRow(11);
			cell = row.getCell(2);
			cell.setCellType(CellType.FORMULA);
			cell.setCellFormula("SUM(D12:J12)");

			row = sheet.getRow(12);
			cell = row.getCell(2);
			cell.setCellType(CellType.FORMULA);
			cell.setCellFormula("SUM(D13:J13)");

			row = sheet.getRow(33);
			cell = row.getCell(2);
			cell.setCellType(CellType.FORMULA);
			cell.setCellFormula("SUM(D34:T34)");

			List<com.klid.webapp.main.rpt.reportDaily.dto.ReportDailyDto> reportDayStatList = dailymapper.selectReportDayType(criterion.getCondition());

			sheet = workbook.getSheetAt(1);
			//개발원
			row = sheet.getRow(6);
			cell = row.getCell(3);
			cell.setCellValue(reportDayStatList.get(0).getInci_type_inst1());
			//국정원
			row = sheet.getRow(7);
			cell = row.getCell(3);
			cell.setCellValue(reportDayStatList.get(0).getInci_type_inst2());
			//관리원
			row = sheet.getRow(8);
			cell = row.getCell(3);
			cell.setCellValue(reportDayStatList.get(0).getInci_type_inst3());

			row = sheet.getRow(9);
			cell = row.getCell(3);
			cell.setCellType(CellType.FORMULA);
			cell.setCellFormula("SUM(D7:D9)");

			//악성코드
			row = sheet.getRow(12);
			cell = row.getCell(3);
			cell.setCellValue(reportDayStatList.get(3).getTotal_cnt());

			//DDos
			row = sheet.getRow(13);
			cell = row.getCell(3);
			cell.setCellValue(0);

			//해킹
			row = sheet.getRow(14);
			cell = row.getCell(3);
			cell.setCellValue(0);

			//기타
			row = sheet.getRow(15);
			cell = row.getCell(3);
			cell.setCellValue(reportDayStatList.get(6).getTotal_cnt());

			row = sheet.getRow(16);
			cell = row.getCell(3);
			cell.setCellType(CellType.FORMULA);
			cell.setCellFormula("SUM(D13:D16)");

			ArrayList<LinkedHashMap<String,Object>> detailGrid6 = (ArrayList<LinkedHashMap<String,Object>>)criterion.getValue("detailGrid6");
			ArrayList<LinkedHashMap<String,Object>> detailGrid5 = (ArrayList<LinkedHashMap<String,Object>>)criterion.getValue("detailGrid5");
			ArrayList<LinkedHashMap<String,Object>> detailGrid4 = (ArrayList<LinkedHashMap<String,Object>>)criterion.getValue("detailGrid4");
			ArrayList<LinkedHashMap<String,Object>> detailGrid3 = (ArrayList<LinkedHashMap<String,Object>>)criterion.getValue("detailGrid3");
			ArrayList<LinkedHashMap<String,Object>> detailGrid2 = (ArrayList<LinkedHashMap<String,Object>>)criterion.getValue("detailGrid2");
			ArrayList<LinkedHashMap<String,Object>> detailGrid = (ArrayList<LinkedHashMap<String,Object>>)criterion.getValue("detailGrid");

			//사고 접수	피해기관	신고기관	탐지명	공격유형	접수일자	접수일시	처리상태
			//"inciNo" -> "CT00-19-0124006"
			//"dmgInstNm" -> "강원"
			//"dclInstNm" -> "국가정보자원관리원"
			//"inciTtlDtt" -> "통-210.179.205.35[정보유출(코드삽입 공격)]"
			//"attCodeName" -> "웹취약점공격"
			//"inciAcpnDt" -> "2019-01-24 06:44:35.0"
			//"inciPrcsStatCodeNm" -> "이관"

			setGridDataPush(detailGrid,sheet,19,"접수현황",workbook);
			setGridDataPush(detailGrid2,sheet,22+detailGrid.size(),"종결현황",workbook);
			setGridDataPush(detailGrid3,sheet,25+detailGrid.size()+detailGrid2.size(),"폐기종결현황",workbook);
			setGridDataPush(detailGrid4,sheet,28+detailGrid.size()+detailGrid2.size()+detailGrid3.size(),"오탐종결현황",workbook);
			setGridDataPush(detailGrid5,sheet,31+detailGrid.size()+detailGrid2.size()+detailGrid3.size()+detailGrid4.size(),"주의관제종결현황",workbook);
			setGridDataPush(detailGrid6,sheet,34+detailGrid.size()+detailGrid2.size()+detailGrid3.size()+detailGrid4.size()+detailGrid5.size(),"시도종결현황",workbook);

			workbook.getCreationHelper().createFormulaEvaluator().evaluateAll();
			//workbook.setForceFormulaRecalculation(true);

			String fileNm = "일일운영현황";
			String sheetNm = "접수전체현황";

			/****
			 * 1월 23일 수정 - 기존 엑셀 사용 X
			 */
//			String[][] headers = new String[][] {
//					{ "순번", "80" }, { "사고번호", "200" }, { "피해기관", "100" },
//					{ "사고처리기관", "200" }, { "제목(탐지명)", "500" }, { "사고유형", "200" },
//					{ "접수날짜", "200" },  { "처리상태", "200" },
//					{ "마지막수정날짜", "200" }, { "경과일(일)", "100" }
//
//			};
//
//			XLSFileBuilder xls = new XLSFileBuilder();
//			xls.newSheet(sheetNm);
//			xls.addHeaders(headers);
//			xls.nextRow();
//
//			//접수전체현황
//			criterion.addParam("type","all");
//			ReturnData excelData = getRetrieveIncidentDetail(criterion);
//
//			if (!excelData.getHasError()) {
//				List<ReportDailyDto> list = (List<ReportDailyDto>) excelData.getResultData();
//				if (list != null && list.size() > 0) {
//					int colIdx = 0;
//					int sheetCnt=0;
//					int maxinumRow = 10000; // 한 시트에 데이터를 몇개까지 넣을지에 대한 값
//					for (int i=0; i<list.size(); i++) {
//						ReportDailyDto dto = list.get(i);
//						colIdx = 0;
//						xls.setDataValue(colIdx++, i + 1, xls.centerValueStyle); //순번
//						xls.setDataValue(colIdx++, dto.getInciNo(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getDmgInstNm(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getDclInstNm(), xls.centerValueStyle);
//
//						if(dto.getInciDttNm() != null && !dto.getInciDttNm().equals("") && !dto.getInciDttNm().equals("null")){
//							xls.setDataValue(colIdx++, dto.getInciTtl() + "[" + dto.getInciDttNm() +"]", xls.centerValueStyle);
//						} else {
//							xls.setDataValue(colIdx++, dto.getInciTtl(), xls.centerValueStyle);
//						}
//						xls.setDataValue(colIdx++, dto.getAttCodeName(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciAcpnDt(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciPrcsStatCodeNm(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciUpdDt(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getTermDay(), xls.centerValueStyle);
//						//xls.setDataValue(colIdx++, dto.getInciTtlDtt(), xls.centerValueStyle);
//						//xls.setDataValue(colIdx++, dto.getAttCodeName(), xls.centerValueStyle);
//						//xls.setDataValue(colIdx++, dto.getInciAcpnDate(), xls.centerValueStyle);
//						//xls.setDataValue(colIdx++, dto.getInciAcpnTime(), xls.centerValueStyle);
//						//xls.setDataValue(colIdx++, dto.getInciPrcsStatNm(), xls.centerValueStyle);
//						//xls.setDataValue(colIdx++, dto.getInciPrcsStatCodeNm(), xls.centerValueStyle);
//						//xls.setDataValue(colIdx++, dto.getDclCrgr(), xls.centerValueStyle);
//						//xls.setDataValue(colIdx++, dto.getNationNm(), xls.centerValueStyle);
//						//xls.setDataValue(colIdx++, dto.getPrty(), xls.centerValueStyle);
//						//xls.setDataValue(colIdx++, dto.getSigun(), xls.centerValueStyle);
//						xls.nextRow();
//
//						// 엑셀에 row 추가할 때 maxinumRow 건 넘어가면 다음 시트에 넣도록 작업
//						if((i+1)%maxinumRow==0){
//							sheetCnt++;
//							xls.newSheet(sheetNm+"_"+sheetCnt);
//							xls.addHeaders(headers);
//							xls.nextRow();
//						}
//					}
//				}
//			}
//
//			sheetNm = "진행현황";
//			xls.newSheet(sheetNm);
//			xls.addHeaders(headers);
//			xls.nextRow();
//
//			//진행현황
//			criterion.addParam("type","proceed");
//			ReturnData excelData2 = getRetrieveIncidentDetail(criterion);
//
//			if (!excelData2.getHasError()) {
//				List<ReportDailyDto> list = (List<ReportDailyDto>) excelData2.getResultData();
//				if (list != null && list.size() > 0) {
//					int colIdx = 0;
//					int sheetCnt=0;
//					int maxinumRow = 10000; // 한 시트에 데이터를 몇개까지 넣을지에 대한 값
//					for (int i=0; i<list.size(); i++) {
//						ReportDailyDto dto = list.get(i);
//						colIdx = 0;
//						xls.setDataValue(colIdx++, i+1, xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciNo(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getDmgInstNm(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getDclInstNm(), xls.centerValueStyle);
//
//						if(dto.getInciDttNm() != null && !dto.getInciDttNm().equals("") && !dto.getInciDttNm().equals("null")){
//							xls.setDataValue(colIdx++, dto.getInciTtl() + "[" + dto.getInciDttNm() +"]", xls.centerValueStyle);
//						} else {
//							xls.setDataValue(colIdx++, dto.getInciTtl(), xls.centerValueStyle);
//						}
//						xls.setDataValue(colIdx++, dto.getAttCodeName(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciAcpnDt(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciPrcsStatCodeNm(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciUpdDt(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getTermDay(), xls.centerValueStyle);
//
//						/*xls.setDataValue(colIdx++, dto.getAttCodeName(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciAcpnDate(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciAcpnTime(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciPrcsStatNm(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciPrcsStatCodeNm(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getDclCrgr(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getNationNm(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getPrty(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getSigun(), xls.centerValueStyle);*/
//						xls.nextRow();
//
//						// 엑셀에 row 추가할 때 maxinumRow 건 넘어가면 다음 시트에 넣도록 작업
//						if((i+1)%maxinumRow==0){
//							sheetCnt++;
//							xls.newSheet(sheetNm+"_"+sheetCnt);
//							xls.addHeaders(headers);
//							xls.nextRow();
//						}
//					}
//				}
//			}
//
//			sheetNm = "종결현황";
//			xls.newSheet(sheetNm);
//			xls.addHeaders(headers);
//			xls.nextRow();
//
//			//종결현황
//			criterion.addParam("type","closed");
//			ReturnData excelData3= getRetrieveIncidentDetail(criterion);
//
//			if (!excelData3.getHasError()) {
//				List<ReportDailyDto> list = (List<ReportDailyDto>) excelData3.getResultData();
//				if (list != null && list.size() > 0) {
//					int colIdx = 0;
//					int sheetCnt=0;
//					int maxinumRow = 10000; // 한 시트에 데이터를 몇개까지 넣을지에 대한 값
//					for (int i=0; i<list.size(); i++) {
//						ReportDailyDto dto = list.get(i);
//						colIdx = 0;
//						xls.setDataValue(colIdx++, i+1, xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciNo(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getDmgInstNm(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getDclInstNm(), xls.centerValueStyle);
//
//						if(dto.getInciDttNm() != null && !dto.getInciDttNm().equals("") && !dto.getInciDttNm().equals("null")){
//							xls.setDataValue(colIdx++, dto.getInciTtl() + "[" + dto.getInciDttNm() +"]", xls.centerValueStyle);
//						} else {
//							xls.setDataValue(colIdx++, dto.getInciTtl(), xls.centerValueStyle);
//						}
//						xls.setDataValue(colIdx++, dto.getAttCodeName(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciAcpnDt(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciPrcsStatCodeNm(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciUpdDt(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getTermDay(), xls.centerValueStyle);
//						/*xls.setDataValue(colIdx++, dto.getAttCodeName(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciAcpnDate(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciAcpnTime(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciPrcsStatNm(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciPrcsStatCodeNm(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getDclCrgr(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getNationNm(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getPrty(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getSigun(), xls.centerValueStyle);*/
//						xls.nextRow();
//
//						// 엑셀에 row 추가할 때 maxinumRow 건 넘어가면 다음 시트에 넣도록 작업
//						if((i+1)%maxinumRow==0){
//							sheetCnt++;
//							xls.newSheet(sheetNm+"_"+sheetCnt);
//							xls.addHeaders(headers);
//							xls.nextRow();
//						}
//					}
//				}
//			}
//
//			sheetNm = "폐기현황";
//			xls.newSheet(sheetNm);
//			xls.addHeaders(headers);
//			xls.nextRow();
//
//			//폐기현황
//			criterion.addParam("type","abrogated");
//			ReturnData excelData4= getRetrieveIncidentDetail(criterion);
//
//			if (!excelData4.getHasError()) {
//				List<ReportDailyDto> list = (List<ReportDailyDto>) excelData4.getResultData();
//				if (list != null && list.size() > 0) {
//					int colIdx = 0;
//					int sheetCnt=0;
//					int maxinumRow = 10000; // 한 시트에 데이터를 몇개까지 넣을지에 대한 값
//					for (int i=0; i<list.size(); i++) {
//						ReportDailyDto dto = list.get(i);
//						colIdx = 0;
//						xls.setDataValue(colIdx++, i+1, xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciNo(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getDmgInstNm(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getDclInstNm(), xls.centerValueStyle);
//
//						if(dto.getInciDttNm() != null && !dto.getInciDttNm().equals("") && !dto.getInciDttNm().equals("null")){
//							xls.setDataValue(colIdx++, dto.getInciTtl() + "[" + dto.getInciDttNm() +"]", xls.centerValueStyle);
//						} else {
//							xls.setDataValue(colIdx++, dto.getInciTtl(), xls.centerValueStyle);
//						}
//						xls.setDataValue(colIdx++, dto.getAttCodeName(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciAcpnDt(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciPrcsStatCodeNm(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciUpdDt(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getTermDay(), xls.centerValueStyle);
//						/*xls.setDataValue(colIdx++, dto.getAttCodeName(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciAcpnDate(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciAcpnTime(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciPrcsStatNm(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciPrcsStatCodeNm(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getDclCrgr(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getNationNm(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getPrty(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getSigun(), xls.centerValueStyle);*/
//						xls.nextRow();
//
//						// 엑셀에 row 추가할 때 maxinumRow 건 넘어가면 다음 시트에 넣도록 작업
//						if((i+1)%maxinumRow==0){
//							sheetCnt++;
//							xls.newSheet(sheetNm+"_"+sheetCnt);
//							xls.addHeaders(headers);
//							xls.nextRow();
//						}
//					}
//				}
//			}
//
//			sheetNm = "오탐현황";
//			xls.newSheet(sheetNm);
//			xls.addHeaders(headers);
//			xls.nextRow();
//
//			//오탐현황
//			criterion.addParam("type","mistake");
//			ReturnData excelData5= getRetrieveIncidentDetail(criterion);
//
//			if (!excelData5.getHasError()) {
//				List<ReportDailyDto> list = (List<ReportDailyDto>) excelData5.getResultData();
//				if (list != null && list.size() > 0) {
//					int colIdx = 0;
//					int sheetCnt=0;
//					int maxinumRow = 10000; // 한 시트에 데이터를 몇개까지 넣을지에 대한 값
//					for (int i=0; i<list.size(); i++) {
//						ReportDailyDto dto = list.get(i);
//						colIdx = 0;
//						xls.setDataValue(colIdx++, i+1, xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciNo(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getDmgInstNm(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getDclInstNm(), xls.centerValueStyle);
//
//						if(dto.getInciDttNm() != null && !dto.getInciDttNm().equals("") && !dto.getInciDttNm().equals("null")){
//							xls.setDataValue(colIdx++, dto.getInciTtl() + "[" + dto.getInciDttNm() +"]", xls.centerValueStyle);
//						} else {
//							xls.setDataValue(colIdx++, dto.getInciTtl(), xls.centerValueStyle);
//						}
//						xls.setDataValue(colIdx++, dto.getAttCodeName(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciAcpnDt(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciPrcsStatCodeNm(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciUpdDt(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getTermDay(), xls.centerValueStyle);
//						/*xls.setDataValue(colIdx++, dto.getAttCodeName(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciAcpnDate(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciAcpnTime(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciPrcsStatNm(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciPrcsStatCodeNm(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getDclCrgr(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getNationNm(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getPrty(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getSigun(), xls.centerValueStyle);*/
//						xls.nextRow();
//
//						// 엑셀에 row 추가할 때 maxinumRow 건 넘어가면 다음 시트에 넣도록 작업
//						if((i+1)%maxinumRow==0){
//							sheetCnt++;
//							xls.newSheet(sheetNm+"_"+sheetCnt);
//							xls.addHeaders(headers);
//							xls.nextRow();
//						}
//					}
//				}
//			}
//
//			sheetNm = "주의관제현황";
//			xls.newSheet(sheetNm);
//			xls.addHeaders(headers);
//			xls.nextRow();
//
//			//주의관제현황
//			criterion.addParam("type","control");
//			ReturnData excelData6= getRetrieveIncidentDetail(criterion);
//
//			if (!excelData6.getHasError()) {
//				List<ReportDailyDto> list = (List<ReportDailyDto>) excelData6.getResultData();
//				if (list != null && list.size() > 0) {
//					int colIdx = 0;
//					int sheetCnt=0;
//					int maxinumRow = 10000; // 한 시트에 데이터를 몇개까지 넣을지에 대한 값
//					for (int i=0; i<list.size(); i++) {
//						ReportDailyDto dto = list.get(i);
//						colIdx = 0;
//						xls.setDataValue(colIdx++, i+1, xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciNo(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getDmgInstNm(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getDclInstNm(), xls.centerValueStyle);
//
//						if(dto.getInciDttNm() != null && !dto.getInciDttNm().equals("") && !dto.getInciDttNm().equals("null")){
//							xls.setDataValue(colIdx++, dto.getInciTtl() + "[" + dto.getInciDttNm() +"]", xls.centerValueStyle);
//						} else {
//							xls.setDataValue(colIdx++, dto.getInciTtl(), xls.centerValueStyle);
//						}
//						xls.setDataValue(colIdx++, dto.getAttCodeName(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciAcpnDt(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciPrcsStatCodeNm(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciUpdDt(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getTermDay(), xls.centerValueStyle);
//						/*xls.setDataValue(colIdx++, dto.getAttCodeName(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciAcpnDate(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciAcpnTime(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciPrcsStatNm(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciPrcsStatCodeNm(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getDclCrgr(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getNationNm(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getPrty(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getSigun(), xls.centerValueStyle);*/
//						xls.nextRow();
//
//						// 엑셀에 row 추가할 때 maxinumRow 건 넘어가면 다음 시트에 넣도록 작업
//						if((i+1)%maxinumRow==0){
//							sheetCnt++;
//							xls.newSheet(sheetNm+"_"+sheetCnt);
//							xls.addHeaders(headers);
//							xls.nextRow();
//						}
//					}
//				}
//			}
//
//			sheetNm = "시도종결현황";
//			xls.newSheet(sheetNm);
//
//			headers = new String[][] {
//					{ "순번", "80" }, { "사고번호", "200" }, { "피해기관", "100" },
//					{ "사고처리기관", "200" }, { "제목(탐지명)", "500" }, { "사고유형", "200" },
//					{ "접수날짜", "200" },  { "처리상태", "200" },{ "시도처리상태", "200" },
//					{ "마지막수정날짜", "200" }
//			};
//
//			xls.addHeaders(headers);
//			xls.nextRow();
//
//			//주의관제현황
//			criterion.addParam("type","sidoClosed");
//			ReturnData excelData7= getRetrieveIncidentDetail(criterion);
//
//			if (!excelData7.getHasError()) {
//				List<ReportDailyDto> list = (List<ReportDailyDto>) excelData7.getResultData();
//				if (list != null && list.size() > 0) {
//					int colIdx = 0;
//					int sheetCnt=0;
//					int maxinumRow = 10000; // 한 시트에 데이터를 몇개까지 넣을지에 대한 값
//					for (int i=0; i<list.size(); i++) {
//						ReportDailyDto dto = list.get(i);
//						colIdx = 0;
//						xls.setDataValue(colIdx++, i+1, xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciNo(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getDmgInstNm(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getDclInstNm(), xls.centerValueStyle);
//
//						if(dto.getInciDttNm() != null && !dto.getInciDttNm().equals("") && !dto.getInciDttNm().equals("null")){
//							xls.setDataValue(colIdx++, dto.getInciTtl() + "[" + dto.getInciDttNm() +"]", xls.centerValueStyle);
//						} else {
//							xls.setDataValue(colIdx++, dto.getInciTtl(), xls.centerValueStyle);
//						}
//						xls.setDataValue(colIdx++, dto.getAttCodeName(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciAcpnDt(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciPrcsStatCodeNm(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getTransInciPrcsStatCodeNm(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciUpdDt(), xls.centerValueStyle);
////						xls.setDataValue(colIdx++, dto.getTermDay(), xls.centerValueStyle);
//						/*xls.setDataValue(colIdx++, dto.getAttCodeName(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciAcpnDate(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciAcpnTime(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciPrcsStatNm(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getInciPrcsStatCodeNm(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getDclCrgr(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getNationNm(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getPrty(), xls.centerValueStyle);
//						xls.setDataValue(colIdx++, dto.getSigun(), xls.centerValueStyle);*/
//						xls.nextRow();
//
//						// 엑셀에 row 추가할 때 maxinumRow 건 넘어가면 다음 시트에 넣도록 작업
//						if((i+1)%maxinumRow==0){
//							sheetCnt++;
//							xls.newSheet(sheetNm+"_"+sheetCnt);
//							xls.addHeaders(headers);
//							xls.nextRow();
//						}
//					}
//				}
//			}

			//미사용 시트 제거
			/*sheetNm = "시도종결현황";
			xls.newSheet(sheetNm);
			xls.addHeaders(headers);
			xls.nextRow();

			//시도종결현황
			criterion.addParam("type","sidoCompleted");
			ReturnData excelData7= getRetrieveIncidentDetail(criterion);

			if (!excelData7.getHasError()) {
				List<ReportDailyDto> list = (List<ReportDailyDto>) excelData7.getResultData();
				if (list != null && list.size() > 0) {
					int colIdx = 0;
					int sheetCnt=0;
					int maxinumRow = 10000; // 한 시트에 데이터를 몇개까지 넣을지에 대한 값
					for (int i=0; i<list.size(); i++) {
						ReportDailyDto dto = list.get(i);
						colIdx = 0;
						xls.setDataValue(colIdx++, dto.getSeqNo(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getInciNo(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getDmgInstNm(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getDclInstNm(), xls.centerValueStyle);

						if(dto.getInciDttNm() != null && !dto.getInciDttNm().equals("") && !dto.getInciDttNm().equals("null")){
							xls.setDataValue(colIdx++, dto.getInciTtl() + "[" + dto.getInciDttNm() +"]", xls.centerValueStyle);
						} else {
							xls.setDataValue(colIdx++, dto.getInciTtl(), xls.centerValueStyle);
						}

						xls.setDataValue(colIdx++, dto.getAttCodeName(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getInciAcpnDate(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getInciAcpnTime(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getInciPrcsStatNm(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getInciPrcsStatCodeNm(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getDclCrgr(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getNationNm(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getPrty(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getSigun(), xls.centerValueStyle);
						xls.nextRow();

						// 엑셀에 row 추가할 때 maxinumRow 건 넘어가면 다음 시트에 넣도록 작업
						if((i+1)%maxinumRow==0){
							sheetCnt++;
							xls.newSheet(sheetNm+"_"+sheetCnt);
							xls.addHeaders(headers);
							xls.nextRow();
						}
					}
				}
			}

			sheetNm = "시도오탐현황";
			xls.newSheet(sheetNm);
			xls.addHeaders(headers);
			xls.nextRow();

			//시도오탐현황
			criterion.addParam("type","sidoMistake");
			ReturnData excelData8= getRetrieveIncidentDetail(criterion);

			if (!excelData8.getHasError()) {
				List<ReportDailyDto> list = (List<ReportDailyDto>) excelData8.getResultData();
				if (list != null && list.size() > 0) {
					int colIdx = 0;
					int sheetCnt=0;
					int maxinumRow = 10000; // 한 시트에 데이터를 몇개까지 넣을지에 대한 값
					for (int i=0; i<list.size(); i++) {
						ReportDailyDto dto = list.get(i);
						colIdx = 0;
						xls.setDataValue(colIdx++, dto.getSeqNo(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getInciNo(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getDmgInstNm(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getDclInstNm(), xls.centerValueStyle);

						if(dto.getInciDttNm() != null && !dto.getInciDttNm().equals("") && !dto.getInciDttNm().equals("null")){
							xls.setDataValue(colIdx++, dto.getInciTtl() + "[" + dto.getInciDttNm() +"]", xls.centerValueStyle);
						} else {
							xls.setDataValue(colIdx++, dto.getInciTtl(), xls.centerValueStyle);
						}

						xls.setDataValue(colIdx++, dto.getAttCodeName(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getInciAcpnDate(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getInciAcpnTime(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getInciPrcsStatNm(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getInciPrcsStatCodeNm(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getDclCrgr(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getNationNm(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getPrty(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getSigun(), xls.centerValueStyle);
						xls.nextRow();

						// 엑셀에 row 추가할 때 maxinumRow 건 넘어가면 다음 시트에 넣도록 작업
						if((i+1)%maxinumRow==0){
							sheetCnt++;
							xls.newSheet(sheetNm+"_"+sheetCnt);
							xls.addHeaders(headers);
							xls.nextRow();
						}
					}
				}
			}

			sheetNm = "시도주의관제현황";
			xls.newSheet(sheetNm);
			xls.addHeaders(headers);
			xls.nextRow();

			//시도주의관제현황
			criterion.addParam("type","sidoControl");
			ReturnData excelData9= getRetrieveIncidentDetail(criterion);

			if (!excelData9.getHasError()) {
				List<ReportDailyDto> list = (List<ReportDailyDto>) excelData9.getResultData();
				if (list != null && list.size() > 0) {
					int colIdx = 0;
					int sheetCnt=0;
					int maxinumRow = 10000; // 한 시트에 데이터를 몇개까지 넣을지에 대한 값
					for (int i=0; i<list.size(); i++) {
						ReportDailyDto dto = list.get(i);
						colIdx = 0;
						xls.setDataValue(colIdx++, dto.getSeqNo(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getInciNo(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getDmgInstNm(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getDclInstNm(), xls.centerValueStyle);
						if(dto.getInciDttNm() != null && !dto.getInciDttNm().equals("") && !dto.getInciDttNm().equals("null")){
							xls.setDataValue(colIdx++, dto.getInciTtl() + "[" + dto.getInciDttNm() +"]", xls.centerValueStyle);
						} else {
							xls.setDataValue(colIdx++, dto.getInciTtl(), xls.centerValueStyle);
						}
						xls.setDataValue(colIdx++, dto.getAttCodeName(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getInciAcpnDate(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getInciAcpnTime(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getInciPrcsStatNm(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getInciPrcsStatCodeNm(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getDclCrgr(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getNationNm(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getPrty(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getSigun(), xls.centerValueStyle);
						xls.nextRow();

						// 엑셀에 row 추가할 때 maxinumRow 건 넘어가면 다음 시트에 넣도록 작업
						if((i+1)%maxinumRow==0){
							sheetCnt++;
							xls.newSheet(sheetNm+"_"+sheetCnt);
							xls.addHeaders(headers);
							xls.nextRow();
						}
					}
				}
			}*/

			String createTime = DateFormatUtils.format(new Date(), "yyyyMMddHHmmssSSS");
			String fileName = AppGlobal.homePath + "/export/" + createTime + ".xls";
			File file = new File(fileName);
			if (!file.getParentFile().exists()) {
				boolean res = file.getParentFile().mkdirs();
				if (!res) {
					throw new Exception("Cannot create directory: " + file.getParentFile().getAbsolutePath());
				}
			}
			final FileOutputStream fos = new FileOutputStream(file);
			try {
				workbook.write(fos);
			} finally {
				if (fos != null) {
					fos.flush();
					fos.close();
				}
			}
//			xls.save(fileName);
			Map<String, String> resultMap = new HashMap<String, String>();
			resultMap.put("filePath", "/export/" + createTime + ".xls");
			resultMap.put("fileName", fileNm);
			returnData = new ReturnData(resultMap);
		} catch (Exception e) {
			e.printStackTrace();
			returnData = new ReturnData(new ErrorInfo(e));
		} finally {
			if (sos != null) {
				try {
					sos.flush();
				} catch (IOException e) {
					sos = null;
				}
				try {
					sos.close();
				} catch (IOException e) {
					sos = null;
				}
			}
		}
		return returnData;
	}

	public List<InciCntDto> sumTypeJson(String values, List<InciCntDto> list){
		JSONObject jsonObj = new JSONObject(values);
		Iterator<String> keys = jsonObj.keys();
		Map<String, Integer> map = new HashMap<>();
		while(keys.hasNext()) {
			String key = keys.next();
			int value = jsonObj.getInt(key);
			if(map.containsKey(key)) {
				map.put(key, map.get(key) + value);
			}
			else {
				map.put(key, value);
			}
		}
		Iterator<String> mapKeys =  map.keySet().iterator();
		while(mapKeys.hasNext()) {
			String mapKey = mapKeys.next();
			InciCntDto dto = new InciCntDto(mapKey, map.get(mapKey));

			boolean equals= false;
			for(int i=0; i<list.size(); i++){
				if(list.get(i).getName().equals(dto.getName())){
					equals=true;
					list.get(i).setEvtCnt(list.get(i).getEvtCnt()+dto.getEvtCnt());
				}
			}
			if(!equals)
				list.add(dto);
		}

		return list;
	}

	public void setGridDataPush(ArrayList<LinkedHashMap<String,Object>> grid, HSSFSheet sheet, int startRow, String title, Workbook workbook) {

		//NO 사고 접수	피해기관	신고기관	탐지명	공격유형	접수일자	접수일시	처리상태
		CellStyle headerStyle = workbook.createCellStyle();
		Font headerFont = workbook.createFont();
		CellStyle noStyle = workbook.createCellStyle();
		CellStyle dataStyle = workbook.createCellStyle();
		HSSFPalette palette = ((HSSFWorkbook) workbook).getCustomPalette();
		HSSFColor poiColor = null;
		int r=0,g=0,b=0;
		Color awtColor = Color.decode("#FFCC99");
		r = awtColor.getRed();
		g = awtColor.getGreen();
		b = awtColor.getBlue();
		poiColor = palette.findColor((byte) r, (byte) g, (byte) b);
		if (poiColor == null) {
			palette.setColorAtIndex(HSSFColor.HSSFColorPredefined.TAN.getIndex(), (byte)r, (byte)g, (byte)b);
			poiColor = palette.getColor(HSSFColor.HSSFColorPredefined.TAN.getIndex());
		}

		headerFont.setBold(true);
		headerStyle.setAlignment(HorizontalAlignment.CENTER);
		headerStyle.setFillForegroundColor(poiColor.getIndex());
		headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		headerStyle.setFont(headerFont);
		headerStyle.setBorderTop(BorderStyle.THIN);
		headerStyle.setBorderBottom(BorderStyle.THIN);
		headerStyle.setBorderLeft(BorderStyle.THIN);
		headerStyle.setBorderRight(BorderStyle.THIN);

		noStyle.setAlignment(HorizontalAlignment.CENTER);
		noStyle.setFillForegroundColor(poiColor.getIndex());
		noStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		noStyle.setBorderTop(BorderStyle.THIN);
		noStyle.setBorderBottom(BorderStyle.THIN);
		noStyle.setBorderLeft(BorderStyle.THIN);
		noStyle.setBorderRight(BorderStyle.THIN);

		dataStyle.setAlignment(HorizontalAlignment.CENTER);
		dataStyle.setBorderTop(BorderStyle.THIN);
		dataStyle.setBorderBottom(BorderStyle.THIN);
		dataStyle.setBorderLeft(BorderStyle.THIN);
		dataStyle.setBorderRight(BorderStyle.THIN);

		HSSFRow row = sheet.createRow(startRow);
		HSSFCell cell = row.getCell(1);
		if (cell == null) {
			cell = row.createCell(1);
		}
		cell.setCellValue(title);

		row = sheet.createRow(startRow+1);
		cell = row.getCell(1);
		if (cell == null) {
			cell = row.createCell(1);
		}
		cell.setCellValue("NO");
		cell.setCellStyle(headerStyle);
		cell = row.getCell(2);
		if (cell == null) {
			cell = row.createCell(2);
		}
		cell.setCellValue("사고 접수");
		cell.setCellStyle(headerStyle);
		cell = row.getCell(3);
		if (cell == null) {
			cell = row.createCell(3);
		}
		cell.setCellValue("피해기관");
		cell.setCellStyle(headerStyle);
		cell = row.getCell(4);
		if (cell == null) {
			cell = row.createCell(4);
		}
		cell.setCellValue("신고기관");
		cell.setCellStyle(headerStyle);
		cell = row.getCell(5);
		if (cell == null) {
			cell = row.createCell(5);
		}
		cell.setCellValue("탐지명");
		cell.setCellStyle(headerStyle);
		cell = row.getCell(6);
		if (cell == null) {
			cell = row.createCell(6);
		}
		cell.setCellValue("공격유형");
		cell.setCellStyle(headerStyle);
		cell = row.getCell(7);
		if (cell == null) {
			cell = row.createCell(7);
		}
		cell.setCellValue("접수일자");
		cell.setCellStyle(headerStyle);
		cell = row.getCell(8);
		if (cell == null) {
			cell = row.createCell(8);
		}
		cell.setCellValue("접수일시");
		cell.setCellStyle(headerStyle);
		cell = row.getCell(9);
		if (cell == null) {
			cell = row.createCell(9);
		}
		cell.setCellValue("처리상태");
		cell.setCellStyle(headerStyle);
		if (grid.size() > 0) {
			for (int i = 0; i < grid.size(); i++) {

				int rownumber = i+1;
				row = sheet.createRow(startRow+ 2 + i);
//				HSSFRow row = sheet.getRow(startRow + i);
				cell = row.getCell(1);
				if (cell == null) {
					cell = row.createCell(1);
				}
				cell.setCellValue(String.valueOf(rownumber));
				cell.setCellStyle(noStyle);
				cell = row.getCell(2);
				if (cell == null) {
					cell = row.createCell(2);
				}
				cell.setCellValue(String.valueOf(grid.get(i).get("inciNo")));
				cell.setCellStyle(dataStyle);
				cell = row.getCell(3);
				if (cell == null) {
					cell = row.createCell(3);
				}
				cell.setCellValue(String.valueOf(grid.get(i).get("dmgInstNm")));
				cell.setCellStyle(dataStyle);
				cell = row.getCell(4);
				if (cell == null) {
					cell = row.createCell(4);
				}
				cell.setCellValue(String.valueOf(grid.get(i).get("dclInstNm")));
				cell.setCellStyle(dataStyle);
				cell = row.getCell(5);
				if (cell == null) {
					cell = row.createCell(5);
				}
				cell.setCellValue(String.valueOf(grid.get(i).get("inciTtlDtt")));
				cell.setCellStyle(dataStyle);
				cell = row.getCell(6);
				if (cell == null) {
					cell = row.createCell(6);
				}
				cell.setCellValue(String.valueOf(grid.get(i).get("attCodeName")));
				cell.setCellStyle(dataStyle);
				cell = row.getCell(7);
				if (cell == null) {
					cell = row.createCell(7);
				}
				cell.setCellValue(String.valueOf(grid.get(i).get("inciAcpnDt")).substring(0, 10));
				cell.setCellStyle(dataStyle);
				cell = row.getCell(8);
				if (cell == null) {
					cell = row.createCell(8);
				}
				cell.setCellValue(String.valueOf(grid.get(i).get("inciAcpnDt")).substring(11, 19));
				cell.setCellStyle(dataStyle);
				cell = row.getCell(9);
				if (cell == null) {
					cell = row.createCell(9);
				}
				String prcsStr = String.valueOf(grid.get(i).get("inciPrcsStatCodeNm"));
				if (prcsStr.equals("오탐종결") || prcsStr.equals("주의관제종결") || prcsStr.equals("폐기종결") ||
						prcsStr.equals("주의관제종결") || prcsStr.equals("종결")) {
					prcsStr = "처리완료";
				} else {
					prcsStr = "처리중";
				}
				cell.setCellValue(prcsStr);
				cell.setCellStyle(dataStyle);
			}
		}
	}

}
