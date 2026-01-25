/**
 * Program Name	: SKS_MenuHelper.java
 * <p>
 * Version		:  3.0
 * <p>
 * Creation Date	: 2016. 1. 10.
 * <p>
 * Programmer Name 	: Bae Jung Yeo
 * <p>
 * Copyright 2015 Hamonsoft. All rights reserved.
 * ***************************************************************
 * P R O G R A M    H I S T O R Y
 * ***************************************************************
 * DATE			: PROGRAMMER	: REASON
 */
package com.klid.webapp.common.menu.helper;

import com.klid.common.AppGlobal;
import com.klid.webapp.common.SessionManager;
import com.klid.webapp.common.menu.persistence.MenuMapper;

/**
 * @author jjung
 */
public class NetisMenuHelper extends IMenuHelper {

    private MenuMapper mapper = null;

    public NetisMenuHelper() {

        menuList.put("616D8144-FAF1-4BAE-9BB6-0B8F5F381130", new MenuVO("대시보드", MenuTypeEnum.Klid));
        menuList.put("A800930A-372D-41E2-BEDE-B40FFB5FDFAD", new MenuVO("사고신고 및 처리현황", MenuTypeEnum.Klid));
        menuList.put("B4529762-C067-4731-9129-B84FF840063A", new MenuVO("공지사항", MenuTypeEnum.Klid));
        menuList.put("35E56A6F-B4CF-4255-8300-A55BA44F7BA6", new MenuVO("보안자료실", MenuTypeEnum.Klid));
        menuList.put("11B3C551-A9E2-4361-AC5C-D45751AD5E64", new MenuVO("침해대응정보공유", MenuTypeEnum.Klid));
        menuList.put("28334395-B5A8-421C-AA8B-0A2993FE9E8A", new MenuVO("일일실적보고서", MenuTypeEnum.Klid));
        menuList.put("5429AEB0-797B-43F4-BF52-3CCC97A0EB64", new MenuVO("통합실적보고서", MenuTypeEnum.Klid));
        menuList.put("5D96EB60-4789-4C89-A146-EF33B8D96510", new MenuVO("주간실적보고서", MenuTypeEnum.Klid));
        menuList.put("AF77542E-119A-4DF1-97AB-6A46CD092FDD", new MenuVO("시도별일일사고처리", MenuTypeEnum.Klid));
        menuList.put("3C1DD381-EECB-4AE0-BEE1-6294D4FB7E36", new MenuVO("일일보안관제결과", MenuTypeEnum.Klid));
        menuList.put("D9167E24-F81F-4C44-A2CA-FFD15309478F", new MenuVO("주간동향보고서", MenuTypeEnum.Klid));
        menuList.put("8AABCFD2-E2D6-48F9-A073-166959F4C27F", new MenuVO("일일운영현황", MenuTypeEnum.Klid));
        menuList.put("066A010B-462F-4BE0-AED2-0EE9BC596D4E", new MenuVO("처리중현황", MenuTypeEnum.Klid));
        menuList.put("DA431960-C9EC-4B53-9784-F40FC2759536", new MenuVO("해킹관리대장", MenuTypeEnum.Klid));
        menuList.put("93FFF0B3-E21B-467A-9725-3F89FEF9AECC", new MenuVO("취약점관리대장", MenuTypeEnum.Klid));
        menuList.put("E94671AD-6B5B-446E-BAA4-1C36F2DA5320", new MenuVO("공지사항현황", MenuTypeEnum.Klid));
        menuList.put("631A7816-8BB6-4B8E-BD48-0AB0B716A984", new MenuVO("보안자료실현황", MenuTypeEnum.Klid));
        menuList.put("A54369C9-AB15-4DC1-8181-2175E77E89C4", new MenuVO("사고유형조회", MenuTypeEnum.Klid));
        menuList.put("EB56AED2-8197-4FA4-A5DA-E86E5476D7DB", new MenuVO("공격국가조회", MenuTypeEnum.Klid));
        menuList.put("8747AA42-733A-441E-A3EA-AA18651774DD", new MenuVO("우선순위조회", MenuTypeEnum.Klid));
        menuList.put("ABE1D475-7304-46D3-AE93-3559628E5B0F", new MenuVO("처리상태조회", MenuTypeEnum.Klid));
        menuList.put("374A7C12-9962-4B55-9CC0-E236436DF1CB", new MenuVO("시도조회", MenuTypeEnum.Klid));
        menuList.put("0479E0D9-BBB2-4567-A827-E9173F0DBDC2", new MenuVO("시군구조회", MenuTypeEnum.Klid));
        menuList.put("65242F45-8F8A-480F-8B0E-44585BAB7CD5", new MenuVO("상세조회", MenuTypeEnum.Klid));
        menuList.put("45CA17B5-19CA-4E7F-9E7E-6A014608FD7E", new MenuVO("담당자연락처", MenuTypeEnum.Klid));
        menuList.put("270241B8-AA1C-4BBA-948F-B9AF8BBD74DD", new MenuVO("문의/의견", MenuTypeEnum.Klid));
        menuList.put("205274DC-1ECE-47B7-9DB6-D5D21F01621C", new MenuVO("코드관리", MenuTypeEnum.Klid));
        menuList.put("4F911ABE-7D38-449D-B734-251AEA4472E5", new MenuVO("게시판관리", MenuTypeEnum.Klid));
        menuList.put("1D26DA5D-C6DA-4FD1-8D0B-6B82CC84058A", new MenuVO("사용자관리", MenuTypeEnum.Klid));
        menuList.put("FA5CF53F-A3F9-466F-8533-3E62E94695C3", new MenuVO("사용자관리-승인", MenuTypeEnum.Klid));
        menuList.put("D066C7DE-DBF8-40D7-8835-DE848C850637", new MenuVO("권한그룹관리", MenuTypeEnum.Klid));
        menuList.put("9F76B61A-0219-490C-A8C8-DAC26A949CD5", new MenuVO("그룹관리", MenuTypeEnum.Klid));
        menuList.put("9413D8BE-B9C3-48C1-81AA-178523E09C03", new MenuVO("기관관리", MenuTypeEnum.Klid));
        menuList.put("2070E22A-A433-11E8-898A-408D5CF61E72", new MenuVO("기관별IP대역관리", MenuTypeEnum.Klid));
        menuList.put("0386505C-27DF-4552-B740-61C8BC924DAE", new MenuVO("사용자접속 로그관리", MenuTypeEnum.Klid));
        menuList.put("03C5C746-2606-474E-87D2-92EFCDA89A04", new MenuVO("SMS-EMAIL 이력관리", MenuTypeEnum.Klid));
        menuList.put("A5CD4C10-8242-48ED-8499-5BEB7195E83F", new MenuVO("홈페이지모니터링", MenuTypeEnum.Klid));
        menuList.put("17A68F85-8A7B-4E92-BBB6-86BD2F448441", new MenuVO("위협등급관리", MenuTypeEnum.Klid));
        menuList.put("D8FC033F-0C3D-4822-9DDC-EFCD1FAC521F", new MenuVO("국가별 IP대역관리", MenuTypeEnum.Klid));
        menuList.put("8D6E391F-8DE2-4A57-B182-C34E901408CB", new MenuVO("외부사용자관리", MenuTypeEnum.Klid));
        menuList.put("2DE754D9-7E3D-488B-B44D-4E8B5BC05CB2", new MenuVO("인수인계", MenuTypeEnum.Klid));
        menuList.put("985421E1-1DC4-48D6-A30A-05D5552461AC", new MenuVO("공휴일관리", MenuTypeEnum.Klid));
        menuList.put("54A0FF75-4813-45AC-B4E9-7A5D8B5FCAFD", new MenuVO("헬스체크 URL관리", MenuTypeEnum.Klid));
        menuList.put("1213A8BC-7D38-45FF-B734-92EFCDA89A04", new MenuVO("헬스체크 장애이력", MenuTypeEnum.Klid));
        menuList.put("6E13B83C-BC38-434F-BC34-22EAAD0E6504", new MenuVO("일일 헬스체크 현황", MenuTypeEnum.Klid));
        menuList.put("050EC41F-9CE8-45FF-9E66-B96FAD9AD84F", new MenuVO("위변조 URL", MenuTypeEnum.Klid));
        menuList.put("050EC41F-9CE8-45FF-9E66-B96FAD9AD27F", new MenuVO("위변조 URL 이력", MenuTypeEnum.Klid));
        menuList.put("098EA95B-82DF-40C7-8B20-13BAF660F27E", new MenuVO("행안부 대시보드", MenuTypeEnum.Klid));
        menuList.put("01C5C446-2DA4-46Z3-8B20-P40FJ2759536", new MenuVO("사용자행위 이력관리", MenuTypeEnum.Klid));

        //행안부전용 게시판
        menuList.put("02C5C442-3DA4-16Z3-2B20-J40FJ2759538", new MenuVO("행안부", MenuTypeEnum.Klid));

        //중앙지원센터 대시보드
        menuList.put("CDD67D18-BB3D-4072-985B-7317FE58BB5B", new MenuVO("운영자용", MenuTypeEnum.Klid));
        menuList.put("48E3EC1A-37DB-42FD-AB30-31961F172A46", new MenuVO("대외용", MenuTypeEnum.Klid));
        menuList.put("0611BF56-462A-4AF4-B6B0-54B3079BAF3C", new MenuVO("브리핑용-1", MenuTypeEnum.Klid));
        menuList.put("50920B6F-AD69-4022-A531-025A2341949D", new MenuVO("브리핑용-2", MenuTypeEnum.Klid));

        //행안부 대시보드
        menuList.put("E6EA88D1-D7A5-4DE9-B344-AA1580CA0F5D", new MenuVO("전자정부상황판-1", MenuTypeEnum.Klid));
        menuList.put("2C8BBB60-E18A-4B84-A72F-AB8DA9C6505F", new MenuVO("전자정부상황판-2", MenuTypeEnum.Klid));
        menuList.put("6F5C2378-BCF6-4DAD-98F1-6E216C0006C7", new MenuVO("전자정부상황판-3", MenuTypeEnum.Klid));
        menuList.put("D3208CB4-1904-40C4-9E1A-A92E8F221B7D", new MenuVO("전자정부상황판-4", MenuTypeEnum.Klid));

        //시도 대시보드
        menuList.put("358DB77F-C7BF-441E-B786-8DA16F50B224", new MenuVO("서울", MenuTypeEnum.Klid));
        menuList.put("A54BCEDD-71E0-4610-B54F-47C5E179B348", new MenuVO("부산", MenuTypeEnum.Klid));
        menuList.put("B6DEB8E0-7135-4FEF-9726-539C6D4467AA", new MenuVO("인천", MenuTypeEnum.Klid));
        menuList.put("2BE23BB1-BD42-4EF4-8190-816BF3172AB8", new MenuVO("광주", MenuTypeEnum.Klid));
        menuList.put("C05E605D-B9EE-4531-8B25-A575715201EF", new MenuVO("대전", MenuTypeEnum.Klid));
        menuList.put("E1E1AE1A-5739-4E7C-BAF0-6D4E1B3D885B", new MenuVO("대구 ", MenuTypeEnum.Klid));
        menuList.put("BC9F5710-9614-45D4-B04E-022365B89137", new MenuVO("울산", MenuTypeEnum.Klid));
        menuList.put("9F345282-E4F4-4797-9A78-23A9E3AD79D0", new MenuVO("경기", MenuTypeEnum.Klid));
        menuList.put("12A0B4C9-9FD3-420B-B674-03F5BE0E61CD", new MenuVO("강원", MenuTypeEnum.Klid));
        menuList.put("0A62FD93-DB95-4A08-8626-6874FCCDB8F2", new MenuVO("충북", MenuTypeEnum.Klid));
        menuList.put("F2E896D6-876C-413B-B07F-059B3F025737", new MenuVO("충남", MenuTypeEnum.Klid));
        menuList.put("D363FF37-4166-4945-8794-B74DFF3F2D38", new MenuVO("전북", MenuTypeEnum.Klid));
        menuList.put("FD1F60ED-9BA4-44D9-B8A6-55FA35833F85", new MenuVO("전남", MenuTypeEnum.Klid));
        menuList.put("ED0BF759-4A2A-49D7-A40F-9C71CDCBB703", new MenuVO("경북", MenuTypeEnum.Klid));
        menuList.put("5A2EC6A8-CBA4-4988-BB0E-FBB8F4200F0A", new MenuVO("경남", MenuTypeEnum.Klid));
        menuList.put("FEF9E66D-157E-41EE-A962-AD6034C1B680", new MenuVO("제주", MenuTypeEnum.Klid));
        menuList.put("1BD0D2E0-B9AA-42D3-BD47-777DD5A6815A", new MenuVO("세종", MenuTypeEnum.Klid));


    }

    public String getUrlByGuid(String guid) {
//        String url = "#";
        String url = "/main/main.do?Y";
        String dashType;
        String dashLocal;

        switch (guid.toUpperCase()) {

            case "616D8144-FAF1-4BAE-9BB6-0B8F5F381130": //대시보드
                dashType = "1";
                dashLocal = "0";
                url = "javascript: Master.gotoWebDashLink(" + dashType + "," + dashLocal + "," + "\"webdash/local.do\"" + ");";
                break;
            case "CDD67D18-BB3D-4072-985B-7317FE58BB5B": //운영자용
                dashType = "2";
                dashLocal = "0";
                url = "javascript: Master.gotoWebDashLink(" + dashType + "," + dashLocal + "," + "\"webdash/adminControl.do\"" + ");";
                break;
            case "48E3EC1A-37DB-42FD-AB30-31961F172A46": //대외용
                dashType = "3";
                dashLocal = "0";
                url = "javascript: Master.gotoWebDashLink(" + dashType + "," + dashLocal + "," + "\"webdash/externalControl.do\"" + ");";
                break;
            case "0611BF56-462A-4AF4-B6B0-54B3079BAF3C": //브리핑용-1
                dashType = "4";
                dashLocal = "0";
                url = "javascript: Master.gotoWebDashLink(" + dashType + "," + dashLocal + "," + "\"webdash/BrfMgrControl.do\"" + ");";
                break;
            case "50920B6F-AD69-4022-A531-025A2341949D": //브리핑용-2
                dashType = "5";
                dashLocal = "0";
                url = "javascript: Master.gotoWebDashLink(" + dashType + "," + dashLocal + "," + "\"webdash/externalBrefing.do\"" + ");";
                break;
            case "E6EA88D1-D7A5-4DE9-B344-AA1580CA0F5D": //전자정부상황판-1
                dashType = "6";
                dashLocal = "0";
                url = "javascript: Master.gotoWebDashLink(" + dashType + "," + dashLocal + "," + "\"webdash/mois1.do\"" + ");";
                break;
            case "2C8BBB60-E18A-4B84-A72F-AB8DA9C6505F": //전자정부상황판-2
                dashType = "7";
                dashLocal = "0";
                url = "javascript: Master.gotoWebDashLink(" + dashType + "," + dashLocal + "," + "\"webdash/mois2.do\"" + ");";
                break;
            case "6F5C2378-BCF6-4DAD-98F1-6E216C0006C7": //전자정부상황판-3
                dashType = "8";
                dashLocal = "0";
                url = "javascript: Master.gotoWebDashLink(" + dashType + "," + dashLocal + "," + "\"webdash/mois3.do\"" + ");";
                break;
            case "D3208CB4-1904-40C4-9E1A-A92E8F221B7D": //전자정부상황판-4
                dashType = "9";
                dashLocal = "0";
                url = "javascript: Master.gotoWebDashLink(" + dashType + "," + dashLocal + "," + "\"webdash/mois4.do\"" + ");";
                break;
            case "358DB77F-C7BF-441E-B786-8DA16F50B224": //서울
                dashType = "99";
                dashLocal = "10";
                url = "javascript: Master.gotoWebDashLink(" + dashType + "," + dashLocal + "," + "\"webdash/local.do\"" + ");";
                break;
            case "A54BCEDD-71E0-4610-B54F-47C5E179B348": //부산
                dashType = "99";
                dashLocal = "20";
                url = "javascript: Master.gotoWebDashLink(" + dashType + "," + dashLocal + "," + "\"webdash/local.do\"" + ");";
                break;
            case "B6DEB8E0-7135-4FEF-9726-539C6D4467AA": //인천
                dashType = "99";
                dashLocal = "40";
                url = "javascript: Master.gotoWebDashLink(" + dashType + "," + dashLocal + "," + "\"webdash/local.do\"" + ");";
                break;
            case "2BE23BB1-BD42-4EF4-8190-816BF3172AB8": //광주
                dashType = "99";
                dashLocal = "50";
                url = "javascript: Master.gotoWebDashLink(" + dashType + "," + dashLocal + "," + "\"webdash/local.do\"" + ");";
                break;
            case "C05E605D-B9EE-4531-8B25-A575715201EF": //대전
                dashType = "99";
                dashLocal = "60";
                url = "javascript: Master.gotoWebDashLink(" + dashType + "," + dashLocal + "," + "\"webdash/local.do\"" + ");";
                break;
            case "E1E1AE1A-5739-4E7C-BAF0-6D4E1B3D885B": //대구
                dashType = "99";
                dashLocal = "30";
                url = "javascript: Master.gotoWebDashLink(" + dashType + "," + dashLocal + "," + "\"webdash/local.do\"" + ");";
                break;
            case "BC9F5710-9614-45D4-B04E-022365B89137": //울산
                dashType = "99";
                dashLocal = "70";
                url = "javascript: Master.gotoWebDashLink(" + dashType + "," + dashLocal + "," + "\"webdash/local.do\"" + ");";
                break;
            case "9F345282-E4F4-4797-9A78-23A9E3AD79D0": //경기
                dashType = "99";
                dashLocal = "80";
                url = "javascript: Master.gotoWebDashLink(" + dashType + "," + dashLocal + "," + "\"webdash/local.do\"" + ");";
                break;
            case "12A0B4C9-9FD3-420B-B674-03F5BE0E61CD": //강원
                dashType = "99";
                dashLocal = "90";
                url = "javascript: Master.gotoWebDashLink(" + dashType + "," + dashLocal + "," + "\"webdash/local.do\"" + ");";
                break;
            case "0A62FD93-DB95-4A08-8626-6874FCCDB8F2": //충북
                dashType = "99";
                dashLocal = "100";
                url = "javascript: Master.gotoWebDashLink(" + dashType + "," + dashLocal + "," + "\"webdash/local.do\"" + ");";
                break;
            case "F2E896D6-876C-413B-B07F-059B3F025737": //충남
                dashType = "99";
                dashLocal = "110";
                url = "javascript: Master.gotoWebDashLink(" + dashType + "," + dashLocal + "," + "\"webdash/local.do\"" + ");";
                break;
            case "D363FF37-4166-4945-8794-B74DFF3F2D38": //전북
                dashType = "99";
                dashLocal = "120";
                url = "javascript: Master.gotoWebDashLink(" + dashType + "," + dashLocal + "," + "\"webdash/local.do\"" + ");";
                break;
            case "FD1F60ED-9BA4-44D9-B8A6-55FA35833F85": //전남
                dashType = "99";
                dashLocal = "130";
                url = "javascript: Master.gotoWebDashLink(" + dashType + "," + dashLocal + "," + "\"webdash/local.do\"" + ");";
                break;
            case "ED0BF759-4A2A-49D7-A40F-9C71CDCBB703": //경북
                dashType = "99";
                dashLocal = "140";
                url = "javascript: Master.gotoWebDashLink(" + dashType + "," + dashLocal + "," + "\"webdash/local.do\"" + ");";
                break;
            case "5A2EC6A8-CBA4-4988-BB0E-FBB8F4200F0A": //경남
                dashType = "99";
                dashLocal = "150";
                url = "javascript: Master.gotoWebDashLink(" + dashType + "," + dashLocal + "," + "\"webdash/local.do\"" + ");";
                break;
            case "FEF9E66D-157E-41EE-A962-AD6034C1B680": //제주
                dashType = "99";
                dashLocal = "160";
                url = "javascript: Master.gotoWebDashLink(" + dashType + "," + dashLocal + "," + "\"webdash/local.do\"" + ");";
                break;
            case "1BD0D2E0-B9AA-42D3-BD47-777DD5A6815A": //세종
                dashType = "99";
                dashLocal = "170";
                url = "javascript: Master.gotoWebDashLink(" + dashType + "," + dashLocal + "," + "\"webdash/local.do\"" + ");";
                break;
            case "A800930A-372D-41E2-BEDE-B40FFB5FDFAD": // 사고신고 및 처리현황
                url = "/main/acc/accidentApplyList.do";
                break;
            case "B4529762-C067-4731-9129-B84FF840063A": //공지사항
                url = "/main/sec/noticeBoardList.do";
                break;
            case "35E56A6F-B4CF-4255-8300-A55BA44F7BA6": //보안자료실
                url = "/main/sec/resourceBoardList.do";
                break;
            case "11B3C551-A9E2-4361-AC5C-D45751AD5E64": //침해대응정보공유
                url = "/main/sec/shareBoardList.do";
                break;
            case "28334395-B5A8-421C-AA8B-0A2993FE9E8A": //일일실적보고서
                url = "/main/rpt/reportDailyState.do";
                break;
            case "5429AEB0-797B-43F4-BF52-3CCC97A0EB64": //통합실적보고서
//            url = "/";
                break;
            case "5D96EB60-4789-4C89-A146-EF33B8D96510": //주간실적보고서
                url = "/main/rpt/reportWeeklyState.do";
                break;
            case "AF77542E-119A-4DF1-97AB-6A46CD092FDD": //시도별일일사고처리
                url = "/main/rpt/reportDailyInciState.do";
                break;
            case "3C1DD381-EECB-4AE0-BEE1-6294D4FB7E36": //일일보안관제결과
                url = "/main/rpt/reportSecurityResult.do";
                break;
            case "D9167E24-F81F-4C44-A2CA-FFD15309478F": //주간동향보고서
//			url = "/";
                break;
            case "A54369C9-AB15-4DC1-8181-2175E77E89C4": //사고유형조회
                url = "/main/rpt/reportInciType.do";
                break;
            case "EB56AED2-8197-4FA4-A5DA-E86E5476D7DB": //공격국가조회
                url = "/main/rpt/reportInciAttNatn.do";
                break;
            case "8747AA42-733A-441E-A3EA-AA18651774DD": //우선순위조회
                url = "/main/rpt/reportInciPrty.do";
                break;
            case "ABE1D475-7304-46D3-AE93-3559628E5B0F": //처리상태조회
                url = "/main/rpt/reportInciPrcsStat.do";
                break;
            case "374A7C12-9962-4B55-9CC0-E236436DF1CB": //시도조회
                url = "/main/rpt/reportInciLocal.do";
                break;
            case "0479E0D9-BBB2-4567-A827-E9173F0DBDC2": //시군구조회
                url = "/main/rpt/reportInciSido.do";
                break;
            case "65242F45-8F8A-480F-8B0E-44585BAB7CD5": //상세조회
                url = "/main/rpt/reportInciDetail.do";
                break;
            case "45CA17B5-19CA-4E7F-9E7E-6A014608FD7E": //담당자연락처
                url = "/main/env/userAddrList.do";
                break;
            case "270241B8-AA1C-4BBA-948F-B9AF8BBD74DD": //문의/의견
                url = "/main/sec/qnaBoardList.do";
                break;
            case "205274DC-1ECE-47B7-9DB6-D5D21F01621C": //코드관리
                url = "/main/sys/codeMgmtList.do";
                break;
            case "4F911ABE-7D38-449D-B734-251AEA4472E5": //게시판관리
                url = "/main/sys/boardMgmt.do";
                break;
            case "1D26DA5D-C6DA-4FD1-8D0B-6B82CC84058A": // 사용자관리
                url = "/main/env/userConf.do";
                break;
            case "FA5CF53F-A3F9-466F-8533-3E62E94695C3": // 사용자관리-승인
                url = "/main/env/userManagement.do";
                break;
            case "37EFE475-2428-49B8-95CE-2AA78262631F": // 사용자관리 요청 이력
                url = "/main/env/userManagementHistory.do";
                break;
            case "D066C7DE-DBF8-40D7-8835-DE848C850637": // 권한그룹설정
                url = "/main/env/authGrpConf.do";
                break;
            case "9F76B61A-0219-490C-A8C8-DAC26A949CD5": // 그룹관리
                url = "/main/env/grpMgmt.do";
                break;
            case "9413D8BE-B9C3-48C1-81AA-178523E09C03": //기관관리
                url = "/main/env/instMgmt.do";
                break;
            case "2070E22A-A433-11E8-898A-408D5CF61E72": //기관별IP대역관리
                url = "/main/env/instIPMgmt.do";
                break;
            case "0386505C-27DF-4552-B740-61C8BC924DAE": //사용자접속 로그관리
                url = "/main/hist/userInoutHistMgmt.do";
                break;
            case "03C5C746-2606-474E-87D2-92EFCDA89A04": //SMS-EMAIL 이력관리
                url = "/main/hist/smsEmailHistMgmt.do";
                break;
            case "A5CD4C10-8242-48ED-8499-5BEB7195E83F": //홈페이지모니터링
//            url = "/";
                break;
            case "17A68F85-8A7B-4E92-BBB6-86BD2F448441": //위협등급관리
                url = "/main/sys/riskMgmt.do";
                break;
            case "D8FC033F-0C3D-4822-9DDC-EFCD1FAC521F": //국가별 IP대역관리
                url = "/main/env/nationIPMgmt.do";
                break;
            case "8AABCFD2-E2D6-48F9-A073-166959F4C27F":    //일일운영현황
                url = "/main/rpt/reportCtrsDailyDetail.do";
                break;
            case "066A010B-462F-4BE0-AED2-0EE9BC596D4E":  //처리중현황
                url = "/main/rpt/reportCtrsDailyState.do";
                break;
            case "DA431960-C9EC-4B53-9784-F40FC2759536":  //해킹관리대장
                url = "/main/rpt/reportSecurityHacking.do";
                break;
            case "93FFF0B3-E21B-467A-9725-3F89FEF9AECC":  //취약점관리대장
                url = "/main/rpt/reportSecurityVulnerability.do";
                break;
            case "E94671AD-6B5B-446E-BAA4-1C36F2DA5320":  //공지사항
                url = "/main/rpt/reportNotice.do";
                break;
            case "631A7816-8BB6-4B8E-BD48-0AB0B716A984":  //보안자료실
                url = "/main/rpt/reportSecurityData.do";
                break;
            case "8D6E391F-8DE2-4A57-B182-C34E901408CB": //외부사용자관리
                url = "/main/sys/custUserMgmt.do";
                break;
            case "2DE754D9-7E3D-488B-B44D-4E8B5BC05CB2": //인수인계
                url = "/main/sec/takeOverBoardList.do";
                break;
            case "985421E1-1DC4-48D6-A30A-05D5552461AC": //공휴일관리
                url = "/main/sys/weekMgmt.do";
                break;
            case "54A0FF75-4813-45AC-B4E9-7A5D8B5FCAFD": //헬스체크 URL관리
                url = "/main/home/healthCheckUrl.do";
                break;
            case "1213A8BC-7D38-45FF-B734-92EFCDA89A04": //헬스체크 장애이력
                url = "/main/home/healthCheckHist.do";
                break;
            case "6E13B83C-BC38-434F-BC34-22EAAD0E6504": //일일 헬스체크 현황
                url = "/main/home/healthCheckStat.do";
                break;
            case "050EC41F-9CE8-45FF-9E66-B96FAD9AD84F": //위변조 URL
                url = "/main/home/forgeryUrl.do";
                break;
            case "050EC41F-9CE8-45FF-9E66-B96FAD9AD27F": //위변조 URL 이력
                url = "/main/home/forgeryUrlHist.do";
                break;
            case "098EA95B-82DF-40C7-8B20-13BAF660F27E": //행안부 대시보드
                url = "/main/mois/dashConfig.do";
                break;
            case "01C5C446-2DA4-46Z3-8B20-P40FJ2759536": //사용자 행위 이력
                url = "/main/hist/userActHist.do";
                break;
            case "02C5C442-3DA4-16Z3-2B20-J40FJ2759538": //행안부 게시판 (신규)
                url = "/main/sec/moisBoardList.do";
                break;
//                로그
            case "98561932-0D0E-4312-A969-15FFCD40C09C": // 사용자 접속 로그 현황(요약)
                url = "/main/logs/user-connect-log/summary.do";
                break;
            case "9B82E46D-BD6C-48FC-A4B1-08AB5A612423": // 사용자 접속 로그 현황(일별)
                url = "/main/logs/user-connect-log/daily.do";
                break;
            case "1F64D749-0BA6-4765-80CA-B1E050B9223F": // 사용자 접속 로그 현황(기간별)
                url = "/main/logs/user-connect-log/period.do";
                break;
            case "ECD00E4F-2C5D-46B6-93BB-0A2156EC02AE": // 사용자 접속 로그 현황(기관별)
                url = "/main/logs/user-connect-log/institution.do";
                break;
//
            case "365C0D93-B77E-43EF-90EE-CC709A9EFAEA":  // 사용자 행위 로그 현황(요약)
                url = "/main/logs/user-action-log/summary.do";
                break;
            case "0EF2C268-6946-4910-9C93-29F236B0646E": // 사용자 행위 로그 현황(일별)
                url = "/main/logs/user-action-log/daily.do";
                break;
            case "83626AED-467A-438B-9A67-2F83FB32A01A": // 사용자 행위 로그 현황(기간별)
                url = "/main/logs/user-action-log/period.do";
                break;
            case "545E1470-DC0F-45C8-BA94-E068859A4694": // 사용자 행위 로그 현황(기관별)
                url = "/main/logs/user-action-log/institution.do";
                break;
            default:
                return url;
        }
        return AppGlobal.getCtxPath() + url;
    }
}
