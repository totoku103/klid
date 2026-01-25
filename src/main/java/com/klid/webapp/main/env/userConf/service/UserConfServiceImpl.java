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
package com.klid.webapp.main.env.userConf.service;

import jakarta.annotation.Resource;

import com.klid.webapp.common.*;
import org.springframework.stereotype.Service;
import com.klid.webapp.common.dto.UserDto;

import com.klid.webapp.main.env.userConf.persistence.UserConfMapper;
import com.klid.common.SEED_KISA256;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import com.klid.webapp.main.hist.userActHist.persistence.UserActHistMapper;

@Service("userConfService")
public class UserConfServiceImpl extends MsgService implements UserConfService {

	@Resource(name = "userConfMapper")
	private UserConfMapper mapper;

	@Resource(name = "userActHistMapper")
	private UserActHistMapper userActHistMapper;

	@Override
	public ReturnData getUserAddrList(Criterion criterion)  {
		return new ReturnData(mapper.selectUserAddrList(criterion.getCondition()));
	}

	@Override
	public ReturnData getUserConfList(Criterion criterion) {
		List<UserDto> list = mapper.selectUserConfList(criterion.getCondition());
		//핸드폰, 이메일 암호화 적용시 해당 로직에서 복호화 이후 set
		for(int i=0; i<list.size(); i++){

			if(list.get(i).getMoblPhnNo() != null){
				String decryptValue = SEED_KISA256.Decrypt(list.get(i).getMoblPhnNo().toString());
				list.get(i).setMoblPhnNo(decryptValue);
			}

			if(list.get(i).getEmailAddr() != null){
				String decryptValue = SEED_KISA256.Decrypt(list.get(i).getEmailAddr().toString());
				list.get(i).setEmailAddr(decryptValue);
			}

		}
		return new ReturnData(list);
	}
	
	@Override
	public ReturnData addUser(Criterion criterion) {
		ReturnData returnData = new ReturnData();

		//SEED-256 encoder
		String pwd = criterion.getValue("password").toString();
		criterion.addParam("password", SEED_KISA256.Encrypt(pwd));

		String emailAddr = criterion.getValue("emailAddr").toString();
		criterion.addParam("emailAddr", SEED_KISA256.Encrypt(emailAddr));

		String moblPhnNo = criterion.getValue("moblPhnNo").toString();
		criterion.addParam("moblPhnNo", SEED_KISA256.Encrypt(moblPhnNo));

 		mapper.addUser(criterion.getCondition());

 		//유저등록시 이력 insert
		Criterion criterionHist = new Criterion();
		criterionHist.addParam("guid", "1D26DA5D-C6DA-4FD1-8D0B-6B82CC84058A"); //사용자관리 GUID
		criterionHist.addParam("actType", "C"); //등록 = C
		criterionHist.addParam("regUserId", SessionManager.getUser().getUserId());
		criterionHist.addParam("refTable", "COMM_USER");
        criterionHist.addParam("regUserName", SessionManager.getUser().getUserName());

		userActHistMapper.addUserActHist(criterionHist.getCondition());

		returnData.setResultData(getAddOkMessage());

		return returnData;
	}

	@Override
	public ReturnData editUser(Criterion criterion)  {
		//SEED-256 encoder
		String emailAddr = criterion.getValue("emailAddr").toString();
		criterion.addParam("emailAddr", SEED_KISA256.Encrypt(emailAddr));

		String moblPhnNo = criterion.getValue("moblPhnNo").toString();
		criterion.addParam("moblPhnNo", SEED_KISA256.Encrypt(moblPhnNo));

		mapper.editUser(criterion.getCondition());

		//유저수정시 이력 insert
		Criterion criterionHist = new Criterion();
		criterionHist.addParam("guid", "1D26DA5D-C6DA-4FD1-8D0B-6B82CC84058A"); //사용자관리 GUID
		criterionHist.addParam("actType", "U"); //수정 = U
		criterionHist.addParam("regUserId", SessionManager.getUser().getUserId());
		criterionHist.addParam("refTable", "COMM_USER");
        criterionHist.addParam("regUserName", SessionManager.getUser().getUserName());

		userActHistMapper.addUserActHist(criterionHist.getCondition());
		return new ReturnData(criterion.getCondition());
	}

	@Override
	public ReturnData editSelfUser(Criterion criterion) {
		criterion.addParam("userId", SessionManager.getUser().getUserId());
		//SEED-256 encoder
		String emailAddr = criterion.getValue("emailAddr").toString();
		criterion.addParam("emailAddr", SEED_KISA256.Encrypt(emailAddr));

		String moblPhnNo = criterion.getValue("moblPhnNo").toString();
		criterion.addParam("moblPhnNo", SEED_KISA256.Encrypt(moblPhnNo));

		mapper.editSelfUser(criterion.getCondition());
		return new ReturnData(criterion.getCondition());
	}
	

	@Override
	public ReturnData editUserPassword(Criterion criterion) {
		if (SessionManager.getUser() != null){
			criterion.addParam("userId", SessionManager.getUser().getUserId());
		}
		String pwd = criterion.getValue("password").toString();
		criterion.addParam("password", SEED_KISA256.Encrypt(pwd));

		String errMsg = "비밀번호는 영문자(대+소문자)/숫자/특수문자 포함 8자 이상입니다.";

		if (pwd.length() < 8) {
			throw new CustomException(errMsg);
		}

		if (!pwd.matches(".*[0-9].*")) {
			throw new CustomException(errMsg);
		}
		if (!pwd.matches(".*[A-Z]{1,}.*")) {
			throw new CustomException(errMsg);
		}
		if (!pwd.matches(".*[!@#$%^&*()_+=|/~`].*")) {
			throw new CustomException(errMsg);
		}
		mapper.updateUserPassword(criterion.getCondition());
		return new ReturnData(getMessage("msg.save.ok"));
	}

	@Override
	public ReturnData getUserIdDuplicateCnt(Criterion criterion)  {
		return new ReturnData(mapper.selectUserIdDuplicateCnt(criterion.getCondition()));
	}

	@Override
	public ReturnData getDetailUser(Criterion criterion){

		Map<String, Object> returnList = new HashMap<String, Object>();
		UserDto userdto = mapper.selectDetailUser(criterion.getCondition());

		if(userdto.getMoblPhnNo() != null){
			SEED_KISA256.Decrypt(userdto.getMoblPhnNo().toString());
			userdto.setMoblPhnNo(SEED_KISA256.Decrypt(userdto.getMoblPhnNo().toString()));
		}

		if(userdto.getEmailAddr() != null){
			SEED_KISA256.Decrypt(userdto.getEmailAddr().toString());
			userdto.setEmailAddr(SEED_KISA256.Decrypt(userdto.getEmailAddr().toString()));
		}

		returnList.put("contents", userdto);
		return new ReturnData(returnList);
	}

	@Override
	public ReturnData getAuthList(Criterion criterion)  {
		return new ReturnData(mapper.selectAuthList(criterion.getCondition()));
	}

	@Override
	public ReturnData userPassReset(Criterion criterion)  {
		String resetPass = criterion.getValue("userId").toString();

		criterion.addParam("password", SEED_KISA256.Encrypt(resetPass));

		mapper.userPassReset(criterion.getCondition());
		return new ReturnData(criterion.getCondition());
	}

	@Override
	public ReturnData userLockReset(Criterion criterion) {
		mapper.userLockReset(criterion.getCondition());
		return new ReturnData(criterion.getCondition());
	}

	@Override
	public ReturnData passwordCheck(Criterion criterion) {
		String prePassword = criterion.getValue("prePassword").toString(); //이전
		String newPwd = criterion.getValue("password").toString(); //새비밀번호

		criterion.addParam("password", SEED_KISA256.Encrypt(prePassword));
		int checkPrePassword = mapper.passwordCheck(criterion.getCondition());
		if(checkPrePassword == 0){
			throw new CustomException("이전 비밀번호가 일치하지 않습니다.");
		}

		criterion.addParam("password", SEED_KISA256.Encrypt(newPwd));
		mapper.updateUserPassword(criterion.getCondition());

		return new ReturnData("변경되었습니다.");
	}

	@Override
	public ReturnData updateLoginFailCnt(Criterion criterion)  {
		mapper.updateLoginFailCnt(criterion.getCondition());
		return new ReturnData(criterion.getCondition());
	}

	@Override
	public ReturnData updateLoginFailCntReset(Criterion criterion)  {
		mapper.updateLoginFailCntReset(criterion.getCondition());
		return new ReturnData(criterion.getCondition());
	}

	@Override
	public ReturnData updateLoginLock(Criterion criterion)  {
		mapper.updateLoginLock(criterion.getCondition());
		return new ReturnData(criterion.getCondition());
	}

	@Override
	public ReturnData delUser(Criterion criterion)  {
		mapper.delUser(criterion.getCondition());

		//이력등록
		Criterion criterionHist = new Criterion();
		criterionHist.addParam("guid", "1D26DA5D-C6DA-4FD1-8D0B-6B82CC84058A");
		criterionHist.addParam("actType", "D");
		criterionHist.addParam("regUserId", SessionManager.getUser().getUserId());
		criterionHist.addParam("refTable", "COMM_USER");
		criterionHist.addParam("regUserName", SessionManager.getUser().getUserName());
		userActHistMapper.addUserActHist(criterionHist.getCondition());

		return new ReturnData(criterion.getCondition());
	}

	@Override
	public ReturnData getPushUsers(Criterion criterion) {
		return new ReturnData(mapper.selectPushUsers(criterion.getCondition()));
	}

	@Override
	public int getAllUserPassReset(Criterion criterion) {
		criterion.addParam("userId",  null);
		//사용자 전체 목록 리스트 조회
		List<UserDto> list = mapper.selectUserConfList(criterion.getCondition());

		int updateCnt = 0;
		for(int i=0; i<list.size(); i++){
			//update문 조건절 -> 사용자 ID
			criterion.addParam("userId",  list.get(i).getUserId());

			//본인 아이디로 암호화하여 패스워드 설정
			String resetPass = list.get(i).getUserId();
			criterion.addParam("password", SEED_KISA256.Encrypt(resetPass));

			//테스트용 'center1', 'si_seoul', 'si_gwang', 'hamontest' 는 제외
			mapper.updateAllUserPassReset(criterion.getCondition());

			updateCnt ++;

		}

		return updateCnt;
	}

	@Override
	public ReturnData checkMyId(Criterion criterion){

		Map<String, Object> returnList = new HashMap<String, Object>();
        String checkAuthYn = "N";

        if(SessionManager.getUser().getUserId().equals(criterion.getValue("userId"))){
            checkAuthYn = "Y";
            criterion.addParam("userId", SessionManager.getUser().getUserId());
            UserDto userdto = mapper.selectDetailUser(criterion.getCondition());

            if(userdto.getMoblPhnNo() != null){
                SEED_KISA256.Decrypt(userdto.getMoblPhnNo().toString());
                userdto.setMoblPhnNo(SEED_KISA256.Decrypt(userdto.getMoblPhnNo().toString()));
            }

            if(userdto.getEmailAddr() != null){
                SEED_KISA256.Decrypt(userdto.getEmailAddr().toString());
                userdto.setEmailAddr(SEED_KISA256.Decrypt(userdto.getEmailAddr().toString()));
            }

            returnList.put("contents", userdto);
            returnList.put("checkAuthYn", checkAuthYn);
        }else{
            returnList.put("checkAuthYn", checkAuthYn);
        }
        return new ReturnData(returnList);
	}

	@Override
	public ReturnData checkUserAuth(Criterion criterion) {
		int checkCnt = 0;
		//사고제어(이관,승인,반려 등) 권한은 메인권한이 관리자급에만 존재 (AUTH_MAIN_2, AUTH_MAIN_3, AUTH_MAIN_4)
		String userMainAuth = SessionManager.getUser().getAuthMain();
		if("AUTH_MAIN_2".equals(userMainAuth)){
			checkCnt ++;
		}
		if("AUTH_MAIN_3".equals(userMainAuth)){
			checkCnt ++;
		}
		if("AUTH_MAIN_4".equals(userMainAuth)){
			checkCnt ++;
		}
		return new ReturnData(checkCnt);
	}

}
