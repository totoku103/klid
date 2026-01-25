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
package com.klid.webapp.main.home.healthCheck.service;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.*;

import jakarta.annotation.Resource;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;

import com.klid.common.AppGlobal;
import com.klid.common.util.XLSFileBuilder;
import com.klid.webapp.common.*;
import com.klid.webapp.common.controller.FileController;
import com.klid.webapp.main.hist.userActHist.persistence.UserActHistMapper;
import com.klid.webapp.main.home.healthCheck.dto.HealthCheckUrlDto;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.stereotype.Service;

import com.klid.webapp.main.home.healthCheck.persistence.HealthCheckUrlMapper;

@Service("healthCheckUrlService")
public class HealthCheckUrlServiceImpl extends MsgService implements HealthCheckUrlService {

	@Resource(name = "healthCheckUrlMapper")
	private HealthCheckUrlMapper mapper;

	@Resource(name = "userActHistMapper")
	private UserActHistMapper userActHistMapper;

	@Override
	public ReturnData getHealthCheckUrl(Criterion criterion) {
		return new ReturnData(mapper.selectHealthCheckUrl(criterion.getCondition()));
	}

	@Override
	public ReturnData addHealthCheckUrl(Criterion criterion) throws Exception {

		mapper.addHealthCheckUrl(criterion.getCondition());

		//이력등록
		Criterion criterionHist = new Criterion();
		criterionHist.addParam("guid", "54A0FF75-4813-45AC-B4E9-7A5D8B5FCAFD");
		criterionHist.addParam("actType", "C");
		criterionHist.addParam("regUserId", SessionManager.getUser().getUserId());
		criterionHist.addParam("refTable", "HM_HC_URL");
        criterionHist.addParam("regUserName", SessionManager.getUser().getUserName());
		userActHistMapper.addUserActHist(criterionHist.getCondition());

		return new ReturnData(criterion.getValue("seqNo"));
	}

	@Override
	public ReturnData editHealthCheckUrl(Criterion criterion) {
		mapper.editHealthCheckUrl(criterion.getCondition());

		//이력등록
		Criterion criterionHist = new Criterion();
		criterionHist.addParam("guid", "54A0FF75-4813-45AC-B4E9-7A5D8B5FCAFD");
		criterionHist.addParam("actType", "U");
		criterionHist.addParam("regUserId", SessionManager.getUser().getUserId());
		criterionHist.addParam("refTable", "HM_HC_URL");
        criterionHist.addParam("regUserName", SessionManager.getUser().getUserName());
		userActHistMapper.addUserActHist(criterionHist.getCondition());

		return new ReturnData(criterion.getCondition());
	}

	@Override
	public ReturnData editWatchOn(Criterion criterion) {
		mapper.editWatchOn(criterion.getCondition());
		//이력등록
		Criterion criterionHist = new Criterion();
		criterionHist.addParam("guid", "54A0FF75-4813-45AC-B4E9-7A5D8B5FCAFD");
		criterionHist.addParam("actType", "U");
		criterionHist.addParam("regUserId", SessionManager.getUser().getUserId());
		criterionHist.addParam("refTable", "HM_HC_URL");
		criterionHist.addParam("regUserName", SessionManager.getUser().getUserName());
		userActHistMapper.addUserActHist(criterionHist.getCondition());

		return new ReturnData(criterion.getCondition());
	}

	@Override
	public ReturnData editWatchOff(Criterion criterion) {
		mapper.editWatchOff(criterion.getCondition());
		//이력등록
		Criterion criterionHist = new Criterion();
		criterionHist.addParam("guid", "54A0FF75-4813-45AC-B4E9-7A5D8B5FCAFD");
		criterionHist.addParam("actType", "U");
		criterionHist.addParam("regUserId", SessionManager.getUser().getUserId());
		criterionHist.addParam("refTable", "HM_HC_URL");
		criterionHist.addParam("regUserName", SessionManager.getUser().getUserName());
		userActHistMapper.addUserActHist(criterionHist.getCondition());

		return new ReturnData(criterion.getCondition());
	}

	@Override
	public ReturnData getDetailHealthCheckUrl(Criterion criterion){

		Map<String, Object> returnList = new HashMap<String, Object>();

		returnList.put("contents", mapper.selectDetailHealthCheckUrl(criterion.getCondition()));

		return new ReturnData(returnList);
	}

	@Override
	public ReturnData delHealthCheckUrl(Criterion criterion) {
		mapper.delHealthCheckUrl(criterion.getCondition());

		//이력등록
		Criterion criterionHist = new Criterion();
		criterionHist.addParam("guid", "54A0FF75-4813-45AC-B4E9-7A5D8B5FCAFD");
		criterionHist.addParam("actType", "D");
		criterionHist.addParam("regUserId", SessionManager.getUser().getUserId());
		criterionHist.addParam("refTable", "HM_HC_URL");
        criterionHist.addParam("regUserName", SessionManager.getUser().getUserName());
		userActHistMapper.addUserActHist(criterionHist.getCondition());

		return new ReturnData(criterion.getCondition());
	}

	@Override
	public ReturnData getHealthCheckHist(Criterion criterion){

		return new ReturnData(mapper.selectHealthCheckHist(criterion.getCondition()));
	}

	@Override
	public ReturnData getHealthCheckStat(Criterion criterion){

		return new ReturnData(mapper.selectHealthCheckStat(criterion.getCondition()));
	}

	@Override
	public ReturnData export(Criterion criterion) {
		ReturnData returnData = null;
		ServletOutputStream sos = null;
		try {
			String fileNm = "헬스체크 URL";
			String sheetNm = "URL";
			String[][] headers = new String[][] {
					{ "시도", "200" }, { "시군구", "200" },{"홈페이지명", "200"},
					{ "URL", "200" }, { "장애여부", "200" },{"구분", "200"},
					{ "사용여부", "200" }, { "집중감시", "200" },{"등록시간", "200"}
			};

			XLSFileBuilder xls = new XLSFileBuilder();
			xls.newSheet(sheetNm);

			xls.nextRow();

			// 리스트 조회 row
			xls.addHeaders(headers);
			xls.nextRow();

			List<HealthCheckUrlDto> list = mapper.selectHealthCheckUrl(criterion.getCondition());
//			if (!excelData.getHasError()) {
//				List<NationIPMgmtDto> list = (List<NationIPMgmtDto>) excelData.getResultData();
				if (list != null && list.size() > 0) {
//					ConvertUtil convertUtil = new ConvertUtil();
					int colIdx = 0;
					int sheetCnt=0;
					int maxinumRow = 10000; // 한 시트에 데이터를 몇개까지 넣을지에 대한 값
					for (int i=0; i<list.size(); i++) {
						HealthCheckUrlDto dto = list.get(i);
						colIdx = 0;
						xls.setDataValue(colIdx++, dto.getParentName(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getInstNm(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getInstCenterNm(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getUrl(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, getValueByType(dto.getLastRes(),3), xls.centerValueStyle);
						xls.setDataValue(colIdx++, getValueByType(dto.getMoisYn(),2), xls.centerValueStyle);
						xls.setDataValue(colIdx++, getValueByType(dto.getUseYn(),1), xls.centerValueStyle);
						xls.setDataValue(colIdx++, getValueByType(dto.getCheckYn(),1), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getUpdtime(), xls.centerValueStyle);

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
//			}

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

	private String getValueByType(int value, int type){
		String returnStr = "";
		switch (type){
			case 1: //예 아니오
				returnStr = "아니오";
				if(value == 1){
					returnStr = "예";
				}
				return returnStr;
			case 2: // 지자체 중앙부처
				returnStr = "지자체";
				if(value == 1){
					returnStr = "중앙부처";
				}
				return returnStr;
			case 3: //장애 정상
				returnStr = "장애";
				if(value == 200){
					returnStr = "정상";
				}
				return returnStr;
				default:
					return returnStr;
		}
	}

	@Override
	public ReturnData importXls(Criterion criterion) {

		ReturnData returnData = new ReturnData();

		BufferedReader br = null;

		String filename = FileController.xlsFilePath+"\\"+FileController.xlsFileName;

		try {

			HSSFWorkbook workbook = new HSSFWorkbook(new FileInputStream(filename));
			HSSFSheet sheet = workbook.getSheetAt(0);

			int rows = sheet.getPhysicalNumberOfRows();

			List<Integer> dtos = mapper.selectRelateInstCd(criterion.getCondition());

			int lastSeq = mapper.selectLastSeq();

			List<HealthCheckUrlDto> list = new ArrayList<>();

			for(int i=2; i<=rows; i++){
				int homeInstCd = (int)(sheet.getRow(i).getCell(0)).getNumericCellValue();
				String homeName = (sheet.getRow(i).getCell(1)).getStringCellValue();
				String homeUrl = (sheet.getRow(i).getCell(2)).getStringCellValue();
				int homeUseYn = (int)(sheet.getRow(i).getCell(3)).getNumericCellValue();
				int homeChkYn = (int)(sheet.getRow(i).getCell(4)).getNumericCellValue();
				int homeChkSidoYn = (int)(sheet.getRow(i).getCell(5)).getNumericCellValue();
				HealthCheckUrlDto dto = new HealthCheckUrlDto();
				dto.setInstCd(homeInstCd);
				if(dtos.contains(homeInstCd)){
					dto.setResCd(i);
					dto.setSeqNo(lastSeq);
					dto.setInstCenterNm(homeName);
					dto.setUrl(homeUrl);
					dto.setUseYn(homeUseYn);
					dto.setLastRes(200);
					dto.setMoisYn(0);
					dto.setCheckYn(homeChkYn);
					dto.setCheckSidoYn(homeChkSidoYn);
					list.add(dto);
					lastSeq = lastSeq+1;
				}else {

				}
			}

			if(list.size()>0){
				HashMap<String, Object> map = new HashMap<>();
				map.put("dtos", dtos);

				List<HealthCheckUrlDto> urls = mapper.selectUrls(map);

				list = duplicateReturn(list,urls);
				map.put("list",list);

				if(list.size()>0)
					mapper.addHealthCheckMultiUrl(map);
			}

			returnData.setResultData("OK");
		} catch (Exception e) {
			e.printStackTrace();
			returnData = new ReturnData(new ErrorInfo(e));
		} finally {
			if(br != null){
				try {
					br.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}

		return returnData;
	}

	private List<HealthCheckUrlDto> duplicateReturn(List<HealthCheckUrlDto> list, List<HealthCheckUrlDto> urls){

		ArrayList<Integer> duplList = new ArrayList<>();

		for(int i=0; i<list.size(); i++){
			for(int j=0; j<urls.size(); j++){
				if(list.get(i).getUrl().equals(urls.get(j).getUrl())){
					if(list.get(i).getInstCd()==urls.get(j).getInstCd()){
						if(!duplList.contains(i)) {
							duplList.add(i);
						}
					}
				}
			}
		}

		for(int i=duplList.size();i>0;i--){
			list.remove((int)duplList.get(i-1));
		}

		return list;
	}
}
