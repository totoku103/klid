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
package com.klid.webapp.main.env.instIPMgmt.service;

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
import com.klid.common.util.ConvertUtil;
import com.klid.common.util.XLSFileBuilder;
import com.klid.webapp.main.env.instIPMgmt.dto.InstIPMgmtDto;
import com.klid.webapp.main.env.instIPMgmt.persistence.InstIPMgmtMapper;

@Service("instIPMgmtService")
public class InstIPMgmtServiceImpl extends MsgService implements InstIPMgmtService {

	@Resource(name = "instIPMgmtMapper")
	private InstIPMgmtMapper mapper;

	@Resource(name = "userActHistMapper")
	private UserActHistMapper userActHistMapper;

	@Override
	public ReturnData getInstIPMgmtList(Criterion criterion){
		if(criterion.containsKey("sInstIp")){
			String sInstIp = criterion.getValue("sInstIp").toString();
			if(!sInstIp.equals("")){
				long sInstIp_long = ConvertUtil.ipv4ToLong(sInstIp);
				criterion.addParam("sInstIp", sInstIp_long);
			}
		}
		return new ReturnData(mapper.selectInstIPMgmtList(criterion.getCondition()));
	}

	@Override
	public ReturnData getInstIPMgmtList_instCd(Criterion criterion){
		return new ReturnData(mapper.selectInstIPList_instCd(criterion.getCondition()));
	}

	@Override
	public ReturnData addInstIPMgmt(Criterion criterion){
		String sipStr = criterion.getValue("sip").toString();
		String eipStr = criterion.getValue("eip").toString();
		
		long sip = ConvertUtil.ipv4ToLong(sipStr);
		long eip = ConvertUtil.ipv4ToLong(eipStr);
		criterion.addParam("sip", sip);
		criterion.addParam("eip", eip);
		
		mapper.insertInstIP(criterion.getCondition());

		//이력등록
		Criterion criterionHist = new Criterion();
		criterionHist.addParam("guid", "2070E22A-A433-11E8-898A-408D5CF61E72");
		criterionHist.addParam("actType", "C");
		criterionHist.addParam("regUserId", SessionManager.getUser().getUserId());
		criterionHist.addParam("refTable", "TSMINSTIP");
		criterionHist.addParam("regUserName", SessionManager.getUser().getUserName());
		userActHistMapper.addUserActHist(criterionHist.getCondition());

		return new ReturnData("SUCCESS");
	}

	@Override
	public ReturnData saveInstIPMgmt(Criterion criterion){
		String sipStr = criterion.getValue("sip").toString();
		String eipStr = criterion.getValue("eip").toString();
		
		long sip = ConvertUtil.ipv4ToLong(sipStr);
		long eip = ConvertUtil.ipv4ToLong(eipStr);
		criterion.addParam("sip", sip);
		criterion.addParam("eip", eip);
		
		mapper.updateInstIP(criterion.getCondition());

		//이력등록
		Criterion criterionHist = new Criterion();
		criterionHist.addParam("guid", "2070E22A-A433-11E8-898A-408D5CF61E72");
		criterionHist.addParam("actType", "U");
		criterionHist.addParam("regUserId", SessionManager.getUser().getUserId());
		criterionHist.addParam("refTable", "TSMINSTIP");
		criterionHist.addParam("regUserName", SessionManager.getUser().getUserName());
		userActHistMapper.addUserActHist(criterionHist.getCondition());

		return new ReturnData("SUCCESS");
	}

	@Override
	public ReturnData delInstIPMgmt(Criterion criterion) {
		// 18.08.13] 추후, 이력을 남길 상황에 대비해 serviceImpl에서 한개씩 삭제하도록 작업
		List<Map<String, Object>> list = (List<Map<String, Object>>) criterion.getValue("instCds");
		for(Map<String, Object> map : list){
			long seq = NumberUtils.toLong(map.get("seq").toString());
			long instCd = NumberUtils.toLong(map.get("instCd").toString());
			Map<String, Object> tmpMap = criterion.getCondition();
			tmpMap.put("seq", seq);
			tmpMap.put("instCd", instCd);
			mapper.deleteInstIP(tmpMap);
		}

		Criterion criterionHist = new Criterion();
		criterionHist.addParam("guid", "2070E22A-A433-11E8-898A-408D5CF61E72");
		criterionHist.addParam("actType", "D");
		criterionHist.addParam("regUserId", SessionManager.getUser().getUserId());
		criterionHist.addParam("refTable", "TSMINSTIP");
		criterionHist.addParam("regUserName", SessionManager.getUser().getUserName());
		userActHistMapper.addUserActHist(criterionHist.getCondition());

		return new ReturnData("SUCCESS");
	}

	@Override
	public ReturnData export(HttpServletResponse response, Criterion criterion) {
		ReturnData returnData = null;
		ServletOutputStream sos = null;
		try {
			String fileNm = "기관별IP대역관리";
			String sheetNm = "기관별IP대역관리";
			String[][] headers = new String[][] { 
				{ "번호", "120" }, { "차상위기관", "150" }, { "기관명", "300" }, { "망구분", "100" }, { "IP", "250" }, { "설명", "250" }
			};
			XLSFileBuilder xls = new XLSFileBuilder();
			xls.newSheet(sheetNm);
			xls.addHeaders(headers);
			xls.nextRow();
			
			ReturnData excelData = getInstIPMgmtList(criterion);
			if (!excelData.getHasError()) {
				List<InstIPMgmtDto> list = (List<InstIPMgmtDto>) excelData.getResultData();
				int totalCnt = list.size() + 1;
				if (list != null && list.size() > 0) {
//					ConvertUtil convertUtil = new ConvertUtil();
					int colIdx = 0;
					int sheetCnt=0;
					int maxinumRow = 10000; // 한 시트에 데이터를 몇개까지 넣을지에 대한 값
					for (int i=0; i<list.size(); i++) {
						InstIPMgmtDto dto = list.get(i);
						colIdx = 0;
						xls.setDataValue(colIdx++, (totalCnt - dto.getNo())+"", xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getPntSInstCdNm(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getInstNm());
						xls.setDataValue(colIdx++, dto.getIpCd(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getSipEip(), xls.centerValueStyle);
						xls.setDataValue(colIdx++, dto.getIpCont(), xls.centerValueStyle);

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
