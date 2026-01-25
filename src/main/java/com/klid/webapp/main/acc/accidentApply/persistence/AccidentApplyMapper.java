package com.klid.webapp.main.acc.accidentApply.persistence;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.ResultHandler;
import org.springframework.stereotype.Repository;

import com.klid.webapp.common.file.dto.AttachfileDto;
import com.klid.webapp.main.acc.accidentApply.dto.AccidentApplyDto;
import com.klid.webapp.main.acc.accidentApply.dto.AccidentHistoryDto;

/**
 * @author imhojong
 *
 */
@Repository("accidentApplyMapper")
public interface AccidentApplyMapper {
	/** 신고 목록	 */
	List<AccidentApplyDto> getAccidentApplyList(Map<String, Object> paramMap);

	void selectAccidentApplyList(Map<String, Object> paramMap, ResultHandler resultHandler);
	
	/** 신고  등록 */
	int addAccidentApply(Map<String, Object> paramMap);

	/** 신고  수정 */
	void editAccidentApply(Map<String, Object> paramMap);

	/** 신고  삭제 */
	void deleteAccidentApply(Map<String, Object> paramMap);
	
	/** 기관목록	 */
	List<AccidentApplyDto> getAccidenDeptList(Map<String, Object> paramMap);

	AccidentApplyDto getAccidentLDetail(Map<String, Object> paramMap);
	
	/** 첨부파일 보기 */
	List<AttachfileDto> selectAttachFileList(Map<String, Object> paramMap);
	
	/** 신고  상태 변경 */
	void updateAccidentProcess(Map<String, Object> paramMap);
	
	/** 신고  상태 변경(이관기간이 복수일 경우) */
	int updateMultiAccidentProcess(Map<String, Object> paramMap);
	
	/** 신고  히스토리 등록 */
	int addAccidentHistory(Map<String, Object> paramMap);
	
	List<AccidentHistoryDto> getAccidentHistoryList(Map<String, Object> paramMap);
	
	List<Map<String, Object>> getLocalList(Map<String, Object> paramMap);

	/** 신고 주중 주말 수정 **/
	int updateAccidentWeek(Map<String, Object> paramMap);

	String selectAccdTypCd(Map<String, Object> paramMap);

	AccidentApplyDto selectDmgInstCd(Map<String, Object> paramMap);

	AccidentApplyDto selectAttNationCd(Map<String, Object> paramMap);
	AccidentApplyDto selectDmgNationCd(Map<String, Object> paramMap);

	/** 피해기관 IP 등록 **/
	int addDmgIp(Map<String, Object> paramMap);

	/** 피해기관 IP 수정 **/
	int updateDmgIp(Map<String, Object> paramMap);

	/** 공격기관 IP 등록 **/
	int addAttIp(Map<String, Object> paramMap);

	/** 공격기관 IP 수정 **/
	int updateAttIp(Map<String, Object> paramMap);

	/** 사고 신고 비고: 해킹 목록 **/
	AccidentApplyDto getTbzHacking(Map<String, Object> paramMap);

	/** 사고 신고 비고: 해킹 등록 **/
	int addTbzHacking(Map<String, Object> paramMap);

	int updateTbzHacking (Map<String, Object> paramMap);

	/** 사고 신고 비고: 취약점탐지 등록 **/
	int addTbzHomepv(Map<String, Object> paramMap);

	/** 사고 신고 비고: 취약점탐지 목록 **/
	AccidentApplyDto getTbzHomepv(Map<String, Object> paramMap);

	/** 사고 신고 비고: 취약점탐지 수정 **/
	int updateTbzHomepv (Map<String, Object> paramMap);

	List<AccidentApplyDto> getDmgIpList(Map<String, Object> paramMap);

	void deleteDmgIp(Map<String, Object> paramMap);

	List<AccidentApplyDto> getAttIpList(Map<String, Object> paramMap);

	void deleteAttIp(Map<String, Object> paramMap);

	List<AccidentApplyDto> selectTodayStatus(Map<String, Object> paramMap);

	List<AccidentApplyDto> selectYearStatus(Map<String, Object> paramMap);

	List<AccidentApplyDto> selectPeriodStatus(Map<String, Object> paramMap);

	List<AccidentApplyDto> selectInstStatus(Map<String, Object> paramMap);

	List<AccidentApplyDto> selectAccdTypeStatus(Map<String, Object> paramMap);

	AccidentApplyDto getInstByIP(Map<String, Object> paramMap);

	AccidentApplyDto getIpByNationNm(Map<String, Object> paramMap);

	AccidentApplyDto getNmByInstCd(Map<String, Object> paramMap);

	AccidentApplyDto getAccdTypByDttNm(Map<String, Object> paramMap);

	int updateSigunAccApply (Map<String, Object> paramMap);

	List<AccidentApplyDto> getEncrySyncList(Map<String, Object> paramMap);

	int updateEncrySync(Map<String, Object> paramMap);

	AccidentApplyDto getNcscInfo(Map<String, Object> paramMap);

	AccidentApplyDto getNcscUserInfo(Map<String, Object> paramMap);

	List<Map<String, Object>> getPntInst(Map<String, Object> paramMap);

	List<AccidentApplyDto> getAccDuplList(Map<String, Object> paramMap);

	//int getInciMutiEndYn(Map<String, Object> paramMap);
	AccidentApplyDto getInciMutiEndYn(Map<String, Object> paramMap);

	int deleteMultiReject(Map<String, Object> paramMap);

}
