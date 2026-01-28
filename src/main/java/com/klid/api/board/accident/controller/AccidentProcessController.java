package com.klid.api.board.accident.controller;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.acc.accidentApply.service.AccidentApplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 사고신고 처리 Controller
 * - 처리상태 변경 (할당, 이관, 폐기 등)
 * - 다중 이관 처리
 * - 히스토리 조회
 * - 이관 지역 조회
 */
@RestController
@RequestMapping("/api/board/accident/report-management")
@RequiredArgsConstructor
public class AccidentProcessController {

    private final AccidentApplyService accidentApplyService;

    /**
     * 신고 처리상태 변경 (할당, 이관, 폐기 등)
     */
    @PutMapping("/reports/{id}/process")
    public ResponseEntity<ReturnData> updateReportProcess(@PathVariable("id") String id, @RequestBody Map<String, Object> reqMap) {
        reqMap.put("id", id);
        ReturnData result = accidentApplyService.updateAccidentProcess(new Criterion(reqMap, false));
        return toResponseEntity(result);
    }

    /**
     * 신고 다중 이관 처리
     */
    @PutMapping("/reports/batch-transfer")
    public ResponseEntity<ReturnData> batchTransferReports(@RequestBody Map<String, Object> reqMap) {
        ReturnData result = accidentApplyService.updateMultiAccidentProcess(new Criterion(reqMap, false));
        return toResponseEntity(result);
    }

    /**
     * 신고 히스토리 목록 조회
     */
    @GetMapping("/reports/{id}/histories")
    public ResponseEntity<ReturnData> getReportHistories(@PathVariable("id") String id, @RequestParam Map<String, Object> reqMap) {
        reqMap.put("id", id);
        ReturnData result = accidentApplyService.getAccidentHistoryList(new Criterion(reqMap));
        return toResponseEntity(result);
    }

    /**
     * 이관 지역 목록 조회
     */
    @GetMapping("/transfer-regions")
    public ResponseEntity<ReturnData> getTransferRegions(@RequestParam Map<String, Object> reqMap) {
        ReturnData result = accidentApplyService.getLocalList(new Criterion(reqMap));
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
