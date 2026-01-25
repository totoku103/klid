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
package com.klid.webapp.main.env.instMgmt.service;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jakarta.annotation.Resource;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;

import com.klid.webapp.common.*;
import com.klid.webapp.main.hist.userActHist.persistence.UserActHistMapper;
import org.apache.commons.lang3.math.NumberUtils;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.stereotype.Service;

import com.klid.common.AppGlobal;
import com.klid.common.util.XLSFileBuilder;
import com.klid.webapp.main.env.instMgmt.dto.InstMgmtDto;
import com.klid.webapp.main.env.instMgmt.persistence.InstMgmtMapper;

@Service("instMgmtService")
public class InstMgmtServiceImpl extends MsgService implements InstMgmtService {

	@Resource(name = "instMgmtMapper")
	private InstMgmtMapper mapper;

	@Resource(name = "userActHistMapper")
	private UserActHistMapper userActHistMapper;

	@Override
	public ReturnData getInstMgmtList(Criterion criterion) {
		return new ReturnData(mapper.selectInstMgmtList(criterion.getCondition()));
	}

	@Override
	public ReturnData getInstMgmtInfo(Criterion criterion)  {
		return new ReturnData(mapper.selectInstMgmtInfo(criterion.getCondition()));
	}
	

	@Override
	public ReturnData getInstCdChk(Criterion criterion)  {
		ReturnData rd =new ReturnData(mapper.selectInstMgmtInfo(criterion.getCondition()));
		if (!rd.getHasError()) {
			List<InstMgmtDto> list = (List<InstMgmtDto>) rd.getResultData();
			if (list != null && list.size() > 0) {
				return new ReturnData("OVERLAP");
			}
		}
		return new ReturnData("SUCCESS");
	}

	@Override
	public ReturnData addInstMgmt(Criterion criterion) {
		
		// 이미 존재하는지 확인
		List<InstMgmtDto> _list = mapper.selectInstMgmtInfo(criterion.getCondition());
		if(_list.size()==0){
			
			criterion.addParam("gLocalCd", AppGlobal.localCd);
			criterion.addParam("gIncidentTypeCd", AppGlobal.incidentTypeCd);
			criterion.addParam("gIncidentNo", AppGlobal.incidentNo);
			
			mapper.insertInst(criterion.getCondition());

			//이력등록
			Criterion criterionHist = new Criterion();
			criterionHist.addParam("guid", "9413D8BE-B9C3-48C1-81AA-178523E09C03");
			criterionHist.addParam("actType", "C");
			criterionHist.addParam("regUserId", SessionManager.getUser().getUserId());
			criterionHist.addParam("refTable", "TSMINST");
			criterionHist.addParam("regUserName", SessionManager.getUser().getUserName());
			userActHistMapper.addUserActHist(criterionHist.getCondition());

			return new ReturnData("SUCCESS");
		}else{
			return new ReturnData("FAIL");
		}
		
	}

	@Override
	public ReturnData saveInstMgmt(Criterion criterion)  {
		mapper.updateInst(criterion.getCondition());

		//이력등록
		Criterion criterionHist = new Criterion();
		criterionHist.addParam("guid", "9413D8BE-B9C3-48C1-81AA-178523E09C03");
		criterionHist.addParam("actType", "U");
		criterionHist.addParam("regUserId", SessionManager.getUser().getUserId());
		criterionHist.addParam("refTable", "TSMINST");
		criterionHist.addParam("regUserName", SessionManager.getUser().getUserName());
		userActHistMapper.addUserActHist(criterionHist.getCondition());

		return new ReturnData("SUCCESS");
	}

	@Override
	public ReturnData delInstMgmt(Criterion criterion)  {
		// 18.08.13] 추후, 이력을 남길 상황에 대비해 serviceImpl에서 한개씩 삭제하도록 작업
		List<Map<String, Object>> list = (List<Map<String, Object>>) criterion.getValue("instCds");
		for(Map<String, Object> map : list){
			long instCd = NumberUtils.toLong(map.get("instCd").toString());
			Map<String, Object> tmpMap = criterion.getCondition();
			tmpMap.put("instCd", instCd);
			mapper.deleteInst(tmpMap);
		}

		//이력등록
		Criterion criterionHist = new Criterion();
		criterionHist.addParam("guid", "9413D8BE-B9C3-48C1-81AA-178523E09C03");
		criterionHist.addParam("actType", "D");
		criterionHist.addParam("regUserId", SessionManager.getUser().getUserId());
		criterionHist.addParam("refTable", "TSMINST");
		criterionHist.addParam("regUserName", SessionManager.getUser().getUserName());
		userActHistMapper.addUserActHist(criterionHist.getCondition());

		return new ReturnData("SUCCESS");
	}

	@Override
	public ReturnData export(HttpServletResponse response, Criterion criterion){
		ReturnData returnData = null;
		ServletOutputStream sos = null;
		try {
			String fileNm = "기관관리";
			String sheetNm = "기관관리";
			String[][] headers = new String[][] { 
				{ "기관코드", "150" }, { "기관명", "200" }, { "차상위기관", "200" }, 
				{ "지역", "150" }, { "유형분류 중", "150" }, { "유형분류 소", "150" }, { "사용여부", "100" }, { "등록일시", "150" }
			};
			XLSFileBuilder xls = new XLSFileBuilder();
			xls.newSheet(sheetNm);
			xls.addHeaders(headers);
			xls.nextRow();
			
			ReturnData excelData = getInstMgmtList(criterion);
			if (!excelData.getHasError()) {
				List<InstMgmtDto> list = (List<InstMgmtDto>) excelData.getResultData();
				if (list != null && list.size() > 0) {
//					ConvertUtil convertUtil = new ConvertUtil();
					int colIdx = 0;
					int sheetCnt=0;
					int maxinumRow = 10000; // 한 시트에 데이터를 몇개까지 넣을지에 대한 값
					for (int i=0; i<list.size(); i++) {
						InstMgmtDto dto = list.get(i);
						colIdx = 0;
						xls.setDataValue(colIdx++, dto.getInstCd(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getInstNm());
						xls.setDataValue(colIdx++, dto.getPntSInstCdNm());
						xls.setDataValue(colIdx++, dto.getLocalCdNm(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getTypeMidNm(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getTypeSmlNm(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getUseYnNm(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getRegDt(), xls.centerValueStyle);

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

}
