/**
 * Program Name : SmsEmailHistMgmtServiceImpl.java
 *
 * Version  :  1.0
 *
 * Creation Date : 2018. 08. 17
 *
 * Programmer Name  : devbong
 *
 * Copyright 2018 Hamonsoft. All rights reserved.
 */
package com.klid.webapp.main.hist.smsEmailHist.service;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jakarta.annotation.Resource;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletResponse;

import com.klid.common.SEED_KISA256;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.stereotype.Service;

import com.klid.common.AppGlobal;
import com.klid.common.util.XLSFileBuilder;
import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ErrorInfo;
import com.klid.webapp.common.MsgService;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.hist.smsEmailHist.dto.SmsEmailHistMgmtDto;
import com.klid.webapp.main.hist.smsEmailHist.persistence.SmsEmailHistMgmtMapper;

@Service("smsEmailHistMgmtService")
public class SmsEmailHistMgmtServiceImpl extends MsgService implements SmsEmailHistMgmtService {

    @Resource(name = "smsEmailHistMgmtMapper")
    private SmsEmailHistMgmtMapper mapper;

    @Override
    public ReturnData getSmsHist(Criterion criterion){
		List<SmsEmailHistMgmtDto> smsHistList =mapper.selectSmsHist(criterion.getCondition());
		if(smsHistList.size() > 0){
			for(int i=0; i<smsHistList.size(); i++){
				//전화번호 복호화.
				smsHistList.get(i).setCellNo(SEED_KISA256.Decrypt(smsHistList.get(i).getCellNo()));
			}
		}
        return new ReturnData(smsHistList);
    }

    @Override
    public ReturnData getEmailHist(Criterion criterion) {
        return new ReturnData(mapper.selectEmailHist(criterion.getCondition()));
    }

    /** 엑셀 출력 */
	@Override
	public ReturnData export_sms(HttpServletResponse response, Criterion criterion){
		ReturnData returnData = null;
		ServletOutputStream sos = null;
		try {
			String fileNm = "SMS 이력관리";
			String sheetNm = "SMS 이력관리";
			String[][] headers = new String[][] { 
				{ "일시", "150" }, { "휴대폰번호", "200" }, { "메시지내용", "400" }, { "수신자명", "150" }
			};
			
			ReturnData excelData = getSmsHist(criterion);
			
			XLSFileBuilder xls = new XLSFileBuilder();
			xls.newSheet(sheetNm);
			
			// 토탈 조회 row
			List<SmsEmailHistMgmtDto> list = null;
			if (!excelData.getHasError()) {
				list = (List<SmsEmailHistMgmtDto>) excelData.getResultData();
			}
			
			// 리스트 조회 row
			xls.addHeaders(headers);
			xls.nextRow();
			
			
			if (list != null && list.size() > 0) {
//					ConvertUtil convertUtil = new ConvertUtil();
				int colIdx = 0;
				int sheetCnt=0;
				int maxinumRow = 10000; // 한 시트에 데이터를 몇개까지 넣을지에 대한 값
				for (int i=0; i<list.size(); i++) {
					SmsEmailHistMgmtDto dto = list.get(i);
					colIdx = 0;
					xls.setDataValue(colIdx++, dto.getYmdhms(), xls.centerValueStyle);
					xls.setDataValue(colIdx++, dto.getCellNo());
					xls.setDataValue(colIdx++, dto.getShortMsg());
					xls.setDataValue(colIdx++, dto.getCellName(), xls.centerValueStyle);
					//xls.setDataValue(colIdx++, dto.getSndDate(), xls.centerValueStyle);

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

	/** 엑셀 출력 */
	@Override
	public ReturnData export_email(HttpServletResponse response, Criterion criterion) {
		ReturnData returnData = null;
		ServletOutputStream sos = null;
		try {
			String fileNm = "EMAIL 이력관리";
			String sheetNm = "EMAIL 이력관리";
			String[][] headers = new String[][] { 
				{ "일시", "150" }, { "메일ID", "200" }, { "제목", "250" }, { "내용", "400" }, { "메일발송일시", "150" }
			};
			
			ReturnData excelData = getSmsHist(criterion);
			
			XLSFileBuilder xls = new XLSFileBuilder();
			xls.newSheet(sheetNm);
			
			// 토탈 조회 row
			List<SmsEmailHistMgmtDto> list = null;
			if (!excelData.getHasError()) {
				list = (List<SmsEmailHistMgmtDto>) excelData.getResultData();
			}
			
			// 리스트 조회 row
			xls.addHeaders(headers);
			xls.nextRow();
			
			
			if (list != null && list.size() > 0) {
//					ConvertUtil convertUtil = new ConvertUtil();
				int colIdx = 0;
				int sheetCnt=0;
				int maxinumRow = 10000; // 한 시트에 데이터를 몇개까지 넣을지에 대한 값
				for (int i=0; i<list.size(); i++) {
					SmsEmailHistMgmtDto dto = list.get(i);
					colIdx = 0;
					xls.setDataValue(colIdx++, dto.getYmdhms(), xls.centerValueStyle);
					xls.setDataValue(colIdx++, dto.getMailId());
					xls.setDataValue(colIdx++, dto.getMailTitle());
					xls.setDataValue(colIdx++, dto.getMailMsg());
					xls.setDataValue(colIdx++, dto.getMailSndDate(), xls.centerValueStyle);

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
