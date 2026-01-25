/**
 * Program Name	: DashConfigServiceImpl.java
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
package com.klid.webapp.main.sys.custUserMgmt.service;

import com.klid.common.SEED_KISA256;
import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.MsgService;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.sys.custUserMgmt.dto.CustUserMgmtDto;
import com.klid.webapp.main.sys.custUserMgmt.persistence.CustUserMgmtMapper;
import org.springframework.stereotype.Service;

import jakarta.annotation.Resource;
import java.util.List;

@Service("custUserMgmtService")
public class CustUserMgmtServiceImpl extends MsgService implements CustUserMgmtService {

	@Resource(name = "custUserMgmtMapper")
	private CustUserMgmtMapper mapper;

	/** SMS 사용자 리스트 받아오기 */
	@Override
	public ReturnData getSmsUserList(Criterion criterion) {
		List<CustUserMgmtDto> custUserList =mapper.getSmsUserList(criterion.getCondition());
		if(custUserList.size() > 0){
			for(int i=0; i<custUserList.size(); i++){
				if(custUserList.get(i).getMoblPhnNo() != null){
					if(custUserList.get(i).getMoblPhnNo().length()>14){
						//전화번호 복호화.
						custUserList.get(i).setMoblPhnNo(SEED_KISA256.Decrypt(custUserList.get(i).getMoblPhnNo()));
					}
				}
			}
		}
		return new ReturnData(custUserList);
	}

	@Override
	public ReturnData getSmsOfUserList(Criterion criterion) {
		List<CustUserMgmtDto> custUserList =mapper.getSmsOfUserList(criterion.getCondition());
		if(custUserList.size() > 0){
			for(int i=0; i<custUserList.size(); i++){
				if(custUserList.get(i).getMoblPhnNo() != null){
					if(custUserList.get(i).getMoblPhnNo().length()>14){
						//전화번호 복호화.
						custUserList.get(i).setMoblPhnNo(SEED_KISA256.Decrypt(custUserList.get(i).getMoblPhnNo()));
					}
				}
			}
		}
		return new ReturnData(custUserList);
	}

	/** 사용자 폰번호 받아오기 */
	@Override
	public ReturnData selectUserPhone(Criterion criterion){
		CustUserMgmtDto custUserPhone =mapper.selectUserPhone(criterion.getCondition());

		if(!custUserPhone.getOffcTelno().equals(null)){
			if(custUserPhone.getOffcTelno().length() > 14){
				//전화번호 복호화.
				custUserPhone.setOffcTelno(SEED_KISA256.Decrypt(custUserPhone.getOffcTelno()));
			}
		}
		return new ReturnData(custUserPhone);
	}

	@Override
	public ReturnData getSmsGroup(Criterion criterion) {
		return new ReturnData(mapper.selectSmsGroup(criterion.getCondition()));
	}

	@Override
	public ReturnData addSmsGroup(Criterion criterion) {
		ReturnData returnData = new ReturnData();
		mapper.insertSmsGroup(criterion.getCondition());
		returnData.setResultData(getAddOkMessage());
		return returnData;
	}

	@Override
	public ReturnData editSmsGroup(Criterion criterion) {
		ReturnData returnData = new ReturnData();
		mapper.updateSmsGroup(criterion.getCondition());
		returnData.setResultData(getAddOkMessage());
		return returnData;
	}

	@Override
	public ReturnData delSmsGroup(Criterion criterion) {
		ReturnData returnData = new ReturnData();

		//삭제될 그룹에 포함된 사용자 group_seq는 전체 그룹 1로 변경
		mapper.updateSmsTopGroup(criterion.getCondition());

		//그룹제거
		mapper.deleteSmsGroup(criterion.getCondition());

		returnData.setResultData(getAddOkMessage());
		return returnData;
	}

}
