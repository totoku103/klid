package com.klid.webapp.common.code.persistence;


import com.klid.webapp.common.code.dto.BoardMgmtDto;
import com.klid.webapp.common.code.dto.CodeDto;
import com.klid.webapp.common.code.dto.CustUserDto;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository(value = "codeMapper")
public interface CodeMapper {

    List<CodeDto> selectCommonCode(Map<String, Object> paramMap);

    List<CodeDto> selectLocalCode(Map<String, Object> paramMap);

    List<CodeDto> selectNationCode(Map<String, Object> paramMap);

    List<CodeDto> selectInstCode(Map<String, Object> paramMap);

    //코드관리 목록
    List<CodeDto> getCodeList(Map<String, Object> paramMap);

    //외부사용자관리 목록
    List<CustUserDto> getCustUserList(Map<String, Object> paramMap);

    //외부사용자관리 등록
    int addCustUser(Map<String, Object> paramMap);

    //외부사용자관리 수정
    int updateCustUser(Map<String, Object> paramMap);

    //외부사용자관리 삭제
    int deleteCustUser(Map<String, Object> paramMap);

    //코드등록
    int addCode(Map<String, Object> paramMap);

    //코드수정
    int editCode(Map<String, Object> paramMap);

    int getCodeDuplCnt(Map<String, Object> paramMap);

    //코드삭제
    int delCode(Map<String, Object> paramMap);

    List<BoardMgmtDto> selectBoardMgmtList(Map<String, Object> condition);

    List<BoardMgmtDto> selectBoardMgmt(Map<String, Object> condition);

    //코드수정
    int updateBoardMgmt(Map<String, Object> paramMap);

    //공통코드 - 설문타입 리스트
    List<CodeDto> selectSurveyType(Map<String, Object> paramMap);

    BoardMgmtDto detailBoardMgmtList(Map<String, Object> paramMap);

    CodeDto getCodeFilePath(Map<String, Object> paramMap);

    //대시보드 상단 메시지
    List<CodeDto> selectDashTextCode(Map<String, Object> paramMap);

    List<CodeDto> selectNoticeSrcType();

    int getCustUserRegCnt(Map<String, Object> paramMap);

}
