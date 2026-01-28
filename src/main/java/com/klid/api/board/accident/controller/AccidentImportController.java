package com.klid.api.board.accident.controller;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.acc.accidentApply.service.AccidentApplyService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 사고신고 Import Controller
 * - 엑셀/EML 파일로 사고신고 가져오기
 */
@RestController
@RequestMapping("/api/board/accident/report-management/reports/import")
@RequiredArgsConstructor
public class AccidentImportController {

    private final AccidentApplyService accidentApplyService;

    /**
     * 엑셀로 사고신고 가져오기
     */
    @PostMapping("/excel")
    public ResponseEntity<ReturnData> importFromExcel(@RequestParam Map<String, Object> reqMap, HttpServletResponse response) {
        ReturnData result = new ReturnData(accidentApplyService.importExcel(new Criterion(reqMap)));
        return toResponseEntity(result);
    }

    /**
     * EML로 사고신고 가져오기
     */
    @PostMapping("/eml")
    public ResponseEntity<ReturnData> importFromEml(@RequestParam Map<String, Object> reqMap, HttpServletResponse response) {
        ReturnData result = new ReturnData(accidentApplyService.importEml(new Criterion(reqMap)));
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
