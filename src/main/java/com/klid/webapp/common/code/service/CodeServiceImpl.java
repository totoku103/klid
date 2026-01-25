/**
 * Program Name	: LoginServiceImpl.java
 * <p>
 * Version		:  1.0
 * <p>
 * Creation Date	: 2015. 1. 28.
 * <p>
 * Programmer Name 	: Bae Jung Yeo
 * <p>
 * Copyright 2014 Hamonsoft. All rights reserved.
 * ***************************************************************
 * P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.common.code.service;

import com.klid.common.SEED_KISA256;
import com.klid.webapp.common.*;
import com.klid.webapp.common.code.dto.CustUserDto;
import com.klid.webapp.common.code.persistence.CodeMapper;
import com.klid.webapp.main.acc.accidentApply.persistence.AccidentApplyMapper;
import com.klid.webapp.main.hist.userActHist.persistence.UserActHistMapper;
import org.springframework.stereotype.Service;

import jakarta.annotation.Resource;
import java.util.List;

@Service("codeService")
public class CodeServiceImpl extends MsgService implements CodeService {

	@Resource(name = "codeMapper")
	private CodeMapper mapper;

	@Resource(name = "accidentApplyMapper")
	private AccidentApplyMapper accidentApplyMapper;

	@Resource(name = "userActHistMapper")
	private UserActHistMapper userActHistMapper;

	@Override
	public ReturnData getCommonCode(Criterion criterion)  {
		return new ReturnData(mapper.selectCommonCode(criterion.getCondition()));
	}

	@Override
	public ReturnData getLocalCode(Criterion criterion) {
		return new ReturnData(mapper.selectLocalCode(criterion.getCondition()));
	}

	@Override
	public ReturnData getNationCode(Criterion criterion)  {
		return new ReturnData(mapper.selectNationCode(criterion.getCondition()));
	}

	@Override
	public ReturnData getInstCode(Criterion criterion)  {
		return new ReturnData(mapper.selectInstCode(criterion.getCondition()));
	}
	
	@Override
	public ReturnData addCode(Criterion criterion) {
		/*int duplCnt = mapper.selectGrpDuplCnt(criterion.getCondition());
		if (duplCnt > 0) {
			return new ReturnData(new ErrorInfo("중복된 그룹명이 존재합니다."));
		}*/
		mapper.addCode(criterion.getCondition());

		//이력등록
		Criterion criterionHist = new Criterion();
		criterionHist.addParam("guid", "205274DC-1ECE-47B7-9DB6-D5D21F01621C");
		criterionHist.addParam("actType", "C");
		criterionHist.addParam("regUserId", SessionManager.getUser().getUserId());
		criterionHist.addParam("refTable", "COMM_CODE");
        criterionHist.addParam("regUserName", SessionManager.getUser().getUserName());
		userActHistMapper.addUserActHist(criterionHist.getCondition());

		return new ReturnData();
	}

	@Override
	public ReturnData editCode(Criterion criterion) {
		/*int duplCnt = mapper.selectGrpDuplCnt(criterion.getCondition());
		if (duplCnt > 0) {
			return new ReturnData(new ErrorInfo("중복된 그룹명이 존재합니다."));
		}*/
		mapper.editCode(criterion.getCondition());

		//이력등록
		Criterion criterionHist = new Criterion();
		criterionHist.addParam("guid", "205274DC-1ECE-47B7-9DB6-D5D21F01621C");
		criterionHist.addParam("actType", "U");
		criterionHist.addParam("regUserId", SessionManager.getUser().getUserId());
		criterionHist.addParam("refTable", "COMM_CODE");
        criterionHist.addParam("regUserName", SessionManager.getUser().getUserName());
		userActHistMapper.addUserActHist(criterionHist.getCondition());

		return new ReturnData();
	}

	@Override
	public ReturnData getCodeList(Criterion criterion) {
		return new ReturnData(mapper.getCodeList(criterion.getCondition()));
	}

	@Override
	public ReturnData getCodeDuplCnt(Criterion criterion) {
		return new ReturnData(mapper.getCodeDuplCnt(criterion.getCondition()));
	}

	@Override
	public ReturnData addWeekDay(Criterion criterion) {
		mapper.addCode(criterion.getCondition());
		accidentApplyMapper.updateAccidentWeek(criterion.getCondition());
		return new ReturnData();
	}

	@Override
	public ReturnData delWeekDay(Criterion criterion) {
		mapper.delCode(criterion.getCondition());
		accidentApplyMapper.updateAccidentWeek(criterion.getCondition());
		return new ReturnData();
	}

	@Override
	public ReturnData getCustUserList(Criterion criterion) {
		List<CustUserDto> custUserList =mapper.getCustUserList(criterion.getCondition());
		if(custUserList.size() > 0){
			for(int i=0; i<custUserList.size(); i++){
				if(!custUserList.get(i).getCustCellNo().equals(" ")){
					if(custUserList.get(i).getCustCellNo().length()>14){
						//전화번호 복호화.
						custUserList.get(i).setCustCellNo(SEED_KISA256.Decrypt(custUserList.get(i).getCustCellNo()));
					}
				}
			}
		}

		return  new ReturnData(custUserList);
	}

	@Override
	public ReturnData addCustUser(Criterion criterion) {
		int createMaxCnt = 10;
		criterion.addParam("sUserId",SessionManager.getUser().getUserId());
		int checkRegCnt = mapper.getCustUserRegCnt(criterion.getCondition());
		if(checkRegCnt >= createMaxCnt){
			return new ReturnData(new ErrorInfo("최근 1시간 이내 등록 가능 수를 초과하였습니다."));
		}
		String custCellNo = criterion.getValue("custCellNo").toString();
		criterion.addParam("custCellNo", SEED_KISA256.Encrypt(custCellNo));
		mapper.addCustUser(criterion.getCondition());

		//이력등록
		Criterion criterionHist = new Criterion();
		criterionHist.addParam("guid", "8D6E391F-8DE2-4A57-B182-C34E901408CB");
		criterionHist.addParam("actType", "C");
		criterionHist.addParam("regUserId", SessionManager.getUser().getUserId());
		criterionHist.addParam("refTable", "CUST_USER_MGMT");
        criterionHist.addParam("regUserName", SessionManager.getUser().getUserName());
		userActHistMapper.addUserActHist(criterionHist.getCondition());

		return new ReturnData();
	}

	@Override
	public ReturnData editCustUser(Criterion criterion) {
		String custCellNo = criterion.getValue("custCellNo").toString();
		criterion.addParam("custCellNo", SEED_KISA256.Encrypt(custCellNo));
		mapper.updateCustUser(criterion.getCondition());

		//이력등록
		Criterion criterionHist = new Criterion();
		criterionHist.addParam("guid", "8D6E391F-8DE2-4A57-B182-C34E901408CB");
		criterionHist.addParam("actType", "U");
		criterionHist.addParam("regUserId", SessionManager.getUser().getUserId());
		criterionHist.addParam("refTable", "CUST_USER_MGMT");
        criterionHist.addParam("regUserName", SessionManager.getUser().getUserName());
		userActHistMapper.addUserActHist(criterionHist.getCondition());

		return new ReturnData();
	}

	@Override
	public ReturnData delCustUser(Criterion criterion) {
		mapper.deleteCustUser(criterion.getCondition());

		//이력등록
		Criterion criterionHist = new Criterion();
		criterionHist.addParam("guid", "8D6E391F-8DE2-4A57-B182-C34E901408CB");
		criterionHist.addParam("actType", "D");
		criterionHist.addParam("regUserId", SessionManager.getUser().getUserId());
		criterionHist.addParam("refTable", "CUST_USER_MGMT");
        criterionHist.addParam("regUserName", SessionManager.getUser().getUserName());
		userActHistMapper.addUserActHist(criterionHist.getCondition());

		return new ReturnData();
	}

	@Override
	public ReturnData getBoardMgmtList(Criterion criterion) {
		return  new ReturnData(mapper.selectBoardMgmtList(criterion.getCondition()));
	}

	@Override
	public ReturnData getBoardMgmt(Criterion criterion) {
		return  new ReturnData(mapper.selectBoardMgmt(criterion.getCondition()));
	}

	@Override
	public ReturnData editBoardMgmt(Criterion criterion) {

		//이력등록(게시판관리)
		Criterion criterionHist = new Criterion();
		criterionHist.addParam("guid", "4F911ABE-7D38-449D-B734-251AEA4472E5");
		criterionHist.addParam("actType", "U");
		criterionHist.addParam("regUserId", SessionManager.getUser().getUserId());
		criterionHist.addParam("refTable", "COMM_CODE");
        criterionHist.addParam("regUserName", SessionManager.getUser().getUserName());
		userActHistMapper.addUserActHist(criterionHist.getCondition());

		return  new ReturnData(mapper.updateBoardMgmt(criterion.getCondition()));
	}

	@Override
	public ReturnData getSurveyType(Criterion criterion)  {
		return new ReturnData(mapper.selectSurveyType(criterion.getCondition()));
	}

	@Override
	public ReturnData getDetailBoardMgmtList(Criterion criterion) {
		return  new ReturnData(mapper.detailBoardMgmtList(criterion.getCondition()));
	}

	@Override
	public ReturnData getCodeFilePath(Criterion criterion) {
		return  new ReturnData(mapper.getCodeFilePath(criterion.getCondition()));
	}

	@Override
	public ReturnData getDashTextCode(Criterion criterion) {
		return  new ReturnData(mapper.selectDashTextCode(criterion.getCondition()));
	}

	@Override
	public ReturnData getNoticeSrcType(Criterion criterion) {
		return  new ReturnData(mapper.selectNoticeSrcType());
	}
}
