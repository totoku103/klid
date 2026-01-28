package com.klid.api.board.accident.controller;

import com.klid.api.board.accident.client.NciApiClient;
import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.acc.accidentApply.service.AccidentApplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 사고신고 외부 API 연동 Controller
 * - NCI API 연동
 * - 국정원 정보 조회
 * - 개발원 지역 조회
 * - 취약점/해킹 상세 조회
 * - 중복 사고 조회
 * - 멀티이관 완료 확인
 * - 암호화 동기화 관리
 */
@RestController
@RequestMapping("/api/board/accident/report-management")
@RequiredArgsConstructor
public class AccidentExternalApiController {

    private final AccidentApplyService accidentApplyService;
    private final NciApiClient nciApiClient;

    /**
     * NCI API 연동
     */
    @GetMapping("/nci-api")
    public ResponseEntity<String> callNciApi(@RequestParam Map<String, Object> reqMap) {
        String result = nciApiClient.callNciApi(reqMap);
        return ResponseEntity.ok(result);
    }

    /**
     * 국정원 마지막 처리자 정보 조회
     */
    @GetMapping("/ncsc-info")
    public ResponseEntity<ReturnData> getNcscInfo(@RequestParam Map<String, Object> reqMap) {
        try {
            ReturnData result = accidentApplyService.getNcscInfo(new Criterion(reqMap));
            return toResponseEntity(result);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * 개발원 지역 목록 조회
     */
    @GetMapping("/pnt-institutions")
    public ResponseEntity<ReturnData> getPntInstitutions(@RequestParam Map<String, Object> reqMap) {
        try {
            ReturnData result = accidentApplyService.getPntInst(new Criterion(reqMap));
            return toResponseEntity(result);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * 비고(취약점탐지) 세부내용 조회
     */
    @GetMapping("/vulnerability-details")
    public ResponseEntity<ReturnData> getVulnerabilityDetails(@RequestParam Map<String, Object> reqMap) {
        ReturnData result = accidentApplyService.getTbzHomepv(new Criterion(reqMap));
        return toResponseEntity(result);
    }

    /**
     * 비고(해킹) 세부내용 조회
     */
    @GetMapping("/hacking-details")
    public ResponseEntity<ReturnData> getHackingDetails(@RequestParam Map<String, Object> reqMap) {
        ReturnData result = accidentApplyService.getTbzHacking(new Criterion(reqMap));
        return toResponseEntity(result);
    }

    /**
     * 중복 사고 목록 조회
     */
    @GetMapping("/duplicates")
    public ResponseEntity<ReturnData> getDuplicateReports(@RequestParam Map<String, Object> reqMap) {
        ReturnData result = accidentApplyService.getAccDuplList(new Criterion(reqMap));
        return toResponseEntity(result);
    }

    /**
     * 멀티이관 사고 종결 여부 확인
     */
    @GetMapping("/multi-transfer-completion")
    public ResponseEntity<ReturnData> checkMultiTransferCompletion(@RequestParam Map<String, Object> reqMap) {
        ReturnData result = accidentApplyService.getInciMutiEndYn(new Criterion(reqMap));
        return toResponseEntity(result);
    }

    /**
     * 비암호화(이메일) 목록 조회 - 엔지니어용
     */
    @GetMapping("/encryption-sync")
    public ResponseEntity<ReturnData> getEncryptionSyncList(@RequestParam Map<String, Object> reqMap) {
        ReturnData result = accidentApplyService.getEncrySyncList(new Criterion(reqMap));
        return toResponseEntity(result);
    }

    /**
     * 이메일 정보 SEED256 암호화 일괄 업데이트 - 엔지니어용
     */
    @PutMapping("/encryption-sync")
    public ResponseEntity<ReturnData> updateEncryptionSync(@RequestBody Map<String, Object> reqMap) {
        ReturnData result = accidentApplyService.updateEncrySync(new Criterion(reqMap, false));
        return toResponseEntity(result);
    }

    /**
     * 암호화 텍스트 확인
     */
    @PostMapping("/encryption-check")
    public ResponseEntity<ReturnData> checkEncryptedText(@RequestBody Map<String, Object> reqMap) {
        ReturnData result = accidentApplyService.checkEncryText(new Criterion(reqMap, false));
        return toResponseEntity(result);
    }

    private ResponseEntity<ReturnData> toResponseEntity(ReturnData result) {
        return toResponseEntity(result, HttpStatus.OK);
    }

    private ResponseEntity<ReturnData> toResponseEntity(ReturnData result, HttpStatus successStatus) {
        if (result.getHasError()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
        }
        return ResponseEntity.status(successStatus).body(result);
    }
}
