package com.klid.api.board.accident.controller;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.acc.accidentApply.service.AccidentApplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * 사고신고 통계 Controller
 * - 오늘/연간/기간별/기관별/사고유형별 현황 조회
 */
@RestController
@RequestMapping("/api/board/accident/report-management/statistics")
@RequiredArgsConstructor
public class AccidentStatisticsController {

    private final AccidentApplyService accidentApplyService;

    /**
     * 오늘 현황 조회
     */
    @GetMapping("/today")
    public ResponseEntity<ReturnData> getTodayStatistics(@RequestParam Map<String, Object> reqMap) {
        ReturnData result = accidentApplyService.getTodayStatus(new Criterion(reqMap));
        return toResponseEntity(result);
    }

    /**
     * 연간 현황 조회
     */
    @GetMapping("/yearly")
    public ResponseEntity<ReturnData> getYearlyStatistics(@RequestParam Map<String, Object> reqMap) {
        ReturnData result = accidentApplyService.getYearStatus(new Criterion(reqMap));
        return toResponseEntity(result);
    }

    /**
     * 기간별 현황 조회
     */
    @GetMapping("/period")
    public ResponseEntity<ReturnData> getPeriodStatistics(@RequestParam Map<String, Object> reqMap) {
        ReturnData result = accidentApplyService.getPeriodStatus(new Criterion(reqMap));
        return toResponseEntity(result);
    }

    /**
     * 기관별 현황 조회
     */
    @GetMapping("/institution")
    public ResponseEntity<ReturnData> getInstitutionStatistics(@RequestParam Map<String, Object> reqMap) {
        ReturnData result = accidentApplyService.getInstStatus(new Criterion(reqMap));
        return toResponseEntity(result);
    }

    /**
     * 사고유형별 현황 조회
     */
    @GetMapping("/accident-type")
    public ResponseEntity<ReturnData> getAccidentTypeStatistics(@RequestParam Map<String, Object> reqMap) {
        ReturnData result = accidentApplyService.getAccdTypeStatus(new Criterion(reqMap));
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
