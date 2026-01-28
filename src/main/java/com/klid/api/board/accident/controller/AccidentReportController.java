package com.klid.api.board.accident.controller;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.acc.accidentApply.service.AccidentApplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * 사고신고 기본 CRUD Controller
 * - 신고 목록/상세 조회, 등록, 수정, 삭제
 * - 기관 목록 조회
 */
@RestController
@RequestMapping("/api/board/accident/report-management")
@RequiredArgsConstructor
public class AccidentReportController {

    private final AccidentApplyService accidentApplyService;

    /**
     * 신고 목록 조회
     */
    @GetMapping("/reports")
    public ResponseEntity<ReturnData> getReports(@RequestParam Map<String, Object> reqMap) {
        ReturnData result = accidentApplyService.getAccidentApplyList(new Criterion(reqMap));
        return toResponseEntity(result);
    }

    /**
     * 신고 상세 조회
     */
    @GetMapping("/reports/{id}")
    public ResponseEntity<ReturnData> getReportDetail(@PathVariable("id") String id, @RequestParam Map<String, Object> reqMap) {
        reqMap.put("id", id);
        ReturnData result = accidentApplyService.getAccidentDetail(new Criterion(reqMap));
        return toResponseEntity(result);
    }

    /**
     * 신고 등록
     */
    @PostMapping("/reports")
    public ResponseEntity<ReturnData> createReport(@RequestBody Map<String, Object> reqMap) {
        ReturnData result = accidentApplyService.addAccidentApply(new Criterion(reqMap, false));
        return toResponseEntity(result, HttpStatus.CREATED);
    }

    /**
     * 신고 수정
     */
    @PutMapping("/reports/{id}")
    public ResponseEntity<ReturnData> updateReport(@PathVariable("id") String id, @RequestBody Map<String, Object> reqMap) {
        reqMap.put("id", id);
        ReturnData result = accidentApplyService.editAccidentApply(new Criterion(reqMap, false));
        return toResponseEntity(result);
    }

    /**
     * 신고 삭제
     */
    @DeleteMapping("/reports/{id}")
    public ResponseEntity<ReturnData> deleteReport(@PathVariable("id") String id, @RequestBody(required = false) Map<String, Object> reqMap) {
        if (reqMap == null) {
            reqMap = new HashMap<>();
        }
        reqMap.put("id", id);
        ReturnData result = accidentApplyService.deleteAccidentApply(new Criterion(reqMap, false));
        return toResponseEntity(result);
    }

    /**
     * 기관 목록 조회
     */
    @GetMapping("/departments")
    public ResponseEntity<ReturnData> getDepartments(@RequestParam Map<String, Object> reqMap) {
        ReturnData result = accidentApplyService.getAccidenDeptList(new Criterion(reqMap));
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
