package com.klid.api.board.accident.controller;

import com.klid.api.board.accident.service.AccidentHwpDocumentService;
import com.klid.webapp.common.ReturnData;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 사고신고 문서 생성 Controller
 * - HWP 문서 생성
 */
@RestController
@RequestMapping("/api/board/accident/report-management/reports")
@RequiredArgsConstructor
public class AccidentDocumentController {

    private final AccidentHwpDocumentService accidentHwpDocumentService;

    /**
     * 사고신고 한글 문서 생성
     */
    @PostMapping("/hwp-document")
    public ResponseEntity<ReturnData> createHwpDocument(@RequestBody Map<String, Object> reqMap, HttpServletResponse response) {
        try {
            Map<String, String> resultMap = accidentHwpDocumentService.createHwpDocument(reqMap);
            return ResponseEntity.ok(new ReturnData(resultMap));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
