/**
 * Program Name	: EngineerViewController.java
 *
 * Version		:  1.0
 *
 * Creation Date	: 2016. 2. 22.
 *
 * Programmer Name 	: Song Young Wook
 *
 * Copyright 2014 Hamonsoft. All rights reserved.
 * ***************************************************************
 *                P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.main.controller;

import jakarta.annotation.Resource;

import com.klid.webapp.common.CustomException;
import com.klid.webapp.common.SessionManager;
import com.klid.webapp.common.dto.UserDto;
import com.klid.webapp.common.enums.UserManagementProcessTypes;
import com.klid.webapp.main.controller.env.UserManagementController;
import com.klid.webapp.main.controller.env.UserManagementHistoryController;
import com.klid.webapp.main.env.userManagementHistory.dto.LatestCommUserRequestProcessStateDto;
import com.klid.webapp.main.env.userManagementHistory.service.UserManagementHistoryService;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.klid.common.CommonController;
import com.klid.webapp.engineer.menuMgmt.service.MenuMgmtService;
import com.klid.webapp.engineer.popup.service.PopupService;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author imhojong
 *
 */
@RequestMapping("/main/popup")
@Controller
public class PopupViewController extends CommonController {

    private final Logger log = LoggerFactory.getLogger(PopupViewController.class);
    private final UserManagementHistoryService userManagementHistoryService;

    public PopupViewController(final UserManagementHistoryService userManagementHistoryService) {
        this.userManagementHistoryService = userManagementHistoryService;
    }


    /*====================================
     *  	COMM
     ====================================*/
	@RequestMapping("comm/pGridColsMgr.do") public void pGridColsMgr(Model model) {}
	// 비밀번호 변경
	@RequestMapping("env/pUserConfPasswordEdit.do") public void userConfPasswordEdit(Model model) {}
	/*
	* ============================================= 침해사고대응 =============================================
	*/

	@RequestMapping("home/pHomeAlert.do") public void pHomeAlert(Model model) {}

	@RequestMapping("home/pImportXls.do") public void pImportXls(Model model) {}


	//신고접수 등록
	@RequestMapping("acc/pAccidentAdd.do") public void pAccidentAdd(Model model) {}

	//신고복사
	@RequestMapping("acc/pAccidentCopy.do") public void pAccidentCopy(Model model) {}

	//기관조회
	@RequestMapping("acc/pAccidentDeptList.do") public void pAccidentDeptList(Model model) {}

	//신고접수 상세
	@RequestMapping("acc/pAccidentDetail.do") public void pAccidentDetail(Model model) {}

	//신고접수 수정
	@RequestMapping("acc/pAccidentEdit.do") public void pAccidentEdit(Model model) {}

	//신고접수 처리 공통 팝업
	@RequestMapping("acc/pAccidentProcess.do") public void pAccidentConf(Model model) {}

	//신고접수 히스토리 상세
	@RequestMapping("acc/pAccidentHistory.do") public void pAccidentHistory(Model model) {}

	//신고접수 EML 넣기
	@RequestMapping("acc/pImportEmlCsv.do") public void pImportEmlCsv(Model model) {}

	//국가 팝업
	@RequestMapping("comm/pNationList.do") public void pNationList(Model model) {}

	//사고 IP 중복 확인 팝업
	@RequestMapping("comm/pAccDuplList.do") public void pAccDuplList(Model model) {}
	/*
	* ============================================= 코드관리 =============================================
	*/

	//코드 레벨1(대메뉴 코드)등록
	@RequestMapping("sys/pCodeLv1Add.do") public void pCodeLv1Add(Model model) {}

	//코드 레벨1(대메뉴 코드)수정/상세
	@RequestMapping("sys/pCodeLv1Edit.do") public void pCodeLv1Edit(Model model) {}

	//코드 레벨2(중메뉴 코드)등록
	@RequestMapping("sys/pCodeLv2Add.do") public void pCodeLv2Add(Model model) {}

	//코드 레벨2(대메뉴 코드)수정/상세
	@RequestMapping("sys/pCodeLv2Edit.do") public void pCodeLv2Edit(Model model) {}

	//코드 레벨3(소ㅓ뉴 코드)등록
	@RequestMapping("sys/pCodeLv3Add.do") public void pCodeLv3Add(Model model) {}

	//코드 레벨3(소메뉴 코드)수정
	@RequestMapping("sys/pCodeLv3Edit.do") public void pCodeLv3Edit(Model model) {}

	//게시판 설정 수정
	@RequestMapping("sys/pBoardMgmtEdit.do") public void pBoardMgmtEdit(Model model) {}

	//외부사용자등록
	@RequestMapping("sys/pCustUserAdd.do") public void pCustUserAdd(Model model) {}

	//외부사용자수정
	@RequestMapping("sys/pCustUserEdit.do") public void pCustUserEdit(Model model) {}

	/*
	* ============================================= 기관관리 =============================================
	*/
	//기관관리 정보 등록
	@RequestMapping("env/pInstAdd.do") public void pInstAdd(Model model) {}
	//기관관리 정보 수정
	@RequestMapping("env/pInstEdit.do") public void pInstEdit(Model model) {}

	/*
	* ============================================= 기관IP관리 =============================================
	*/
	//기관관리 정보 등록
	@RequestMapping("env/pInstIPAdd.do") public void pInstIPAdd(Model model) {}
	//기관관리 정보 수정
	@RequestMapping("env/pInstIPEdit.do") public void pInstIPEdit(Model model) {}


	/*
	* ============================================= 국가별IP대역관리 =============================================
	*/
	// 국가별IP Import
	@RequestMapping("env/pNationIPImport.do") public void pNationIPImport(Model model) {}
	// 국가별IP 리스트 조회
	@RequestMapping("env/pNationIPList.do") public void pNationIPList(Model model) {}


	/*
	* ============================================= 위협등급관리 =============================================
	*/
	//등급관리변경팝업
	@RequestMapping("sys/pRiskMgmtEdit.do") public void pRiskMgmtEdit(Model model) {}

	//등급관리 히스토리 등록 팝업
	@RequestMapping("sys/pRiskHistoryWrite.do") public void pRiskHistoryWrite(Model model) {}

	//등급 설정 팝업
	@RequestMapping("sys/pThreatSet.do") public void pThreatSet(Model model) {}

	//예경보 변경이력
	@RequestMapping("sys/pThreatHistList.do") public void pThreatHistList(Model model) {}

	//기간 설정 팝업
	@RequestMapping("sys/pPeriodSet.do") public void pPeriodSet(Model model) {}

	@RequestMapping({"sys/pPolicyInfo", "sys/pPolicyInfo.do"}) public void pPolicyInfo(Model model) {}

	//SMS그룹 등록
	@RequestMapping("sys/pSmsGrpAdd.do") public void pSmsGrpAdd(Model model) {}

	//SMS그룹 수정
	@RequestMapping("sys/pSmsGrpEdit.do") public void pSmsGrpEdit(Model model) {}

	/*
	* ============================================= 사용자관리 =============================================
	*/
	//사용자 등록
	@RequestMapping("env/pUserConfAdd.do") public void pUserConfAdd(Model model) {}
    @RequestMapping("env/pUserManagementAdd.do") public void pUserManagementAdd(Model model) {
        UserManagementController.validateUserAuthorization();
    }

	//사용자 수정
	@RequestMapping("env/pUserConfEdit.do") public void pUserConfEdit(Model model) {}
	@RequestMapping("env/pUserManagementEdit.do") public void pUserManagementEdit(Model model) {}

    @RequestMapping(value = "env/pUserManagementRequestConfirm", method = RequestMethod.POST)
    public void pUserManagementRequestConfirm(
            @RequestParam Integer commUserRequestSeq,
            @RequestParam Integer originUserSeq,
            Model model
    ) {
        UserManagementHistoryController.checkAuthenticate();
        if (commUserRequestSeq == null) {
            log.error("commUserRequestSeq is null");
            throw new RuntimeException("param is null");
        }

        final LatestCommUserRequestProcessStateDto latestProcessState = userManagementHistoryService.getLatestProcessState(commUserRequestSeq);
        switch (latestProcessState.getLatestProcessState()) {
            case APPROVAL:
                log.info("승인된 요청입니다. commUserRequestSeq: " + commUserRequestSeq);
                throw new CustomException("승인된 요청입니다.");
            case REJECTION:
                log.info("반려된 요청입니다. commUserRequestSeq: " + commUserRequestSeq);
                throw new CustomException("반려된 요청입니다.");
            case CANCELLATION_REQUEST:
                log.info("요청이 취소되었습니다. commUserRequestSeq: " + commUserRequestSeq);
                throw new CustomException("요청이 취소되었습니다.");
            default:
        }
    }

	//사용자 상세
	@RequestMapping("env/pUserConfDetail.do") public void pUserConfDetail(Model model) {}

	@RequestMapping("env/pUserSelfConfEdit.do") public void pUserSelfConfEdit(Model model) {}

	//비밀번호 기간 만료 변경 팝업
	@RequestMapping("env/expire/pUserPassExpireReset.do") public void pUserConfPasswordEditByPre(Model model) {}

	@RequestMapping("env/expire/pUserPasswordChange.do") public void pUserPasswordChange(@RequestParam(value = "message", required = false) String message, Model model) {
        final SessionManager.LiteLoginInfo liteLoginInfo = SessionManager.getLiteLoginInfo();
        model.addAttribute("userId", liteLoginInfo.getUserId());
        model.addAttribute("message", message);
    }

    @RequestMapping("env/pUserHistoryExcelDownload.do")
    public void pUserHistoryExcelDownload(Model model) {
        UserManagementHistoryController.checkAuthenticate();
    }

	/*
	* ============================================= 홈페이지 모니터링 =============================================
	*/
	//헬스체크URL 등록
	@RequestMapping("home/pHealthCheckUrlAdd.do") public void pHealthCheckUrlAdd(Model model) {}

	//헬스체크URL 수정
	@RequestMapping("home/pHealthCheckUrlEdit.do") public void pHealthCheckUrlEdit(Model model) {}

	/**
	 * ============================================= 인수인계 =============================================
	 */
	// 인수인계 등록
	@RequestMapping("sec/pTakeOverBoardListAdd.do") public void pTakeOverBoardListAdd(Model model) {}
	// 인수인계 수정
	@RequestMapping("sec/pTakeOverBoardListEdit.do") public void pTakeOverBoardListEdit(Model model) {}

	/**
	 * ============================================= SMS 전송 =============================================
	 */
	// SMS 전송 팝업
	@RequestMapping("sys/pCustUserSms.do") public void pCustUserSms(Model model) {}

	/**
	 * ============================================= 국가수정 =============================================
	 */
	// 국가수정 팝업
	@RequestMapping("env/pNationEdit.do") public void pNationEdit(Model model) {}

	/**
	 * ============================================= 보고서 =============================================
	 */
	// 국가수정 팝업
	@RequestMapping("rpt/pNcscAlert.do") public void pNcscAlert(Model model) {}
}
