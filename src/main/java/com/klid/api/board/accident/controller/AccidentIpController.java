package com.klid.api.board.accident.controller;

import com.klid.webapp.common.Criterion;
import com.klid.webapp.common.ReturnData;
import com.klid.webapp.main.acc.accidentApply.service.AccidentApplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.UnknownHostException;
import java.util.Map;

/**
 * 사고신고 IP 관련 Controller
 * - 피해/공격 IP 목록 조회
 * - IP로 국가명/기관 조회
 */
@RestController
@RequestMapping("/api/board/accident/report-management")
@RequiredArgsConstructor
public class AccidentIpController {

    private final AccidentApplyService accidentApplyService;

    /**
     * 피해 IP 목록 조회
     */
    @GetMapping("/damage-ips")
    public ResponseEntity<ReturnData> getDamageIps(@RequestParam Map<String, Object> reqMap) {
        ReturnData result = accidentApplyService.getDmgIpList(new Criterion(reqMap));
        return toResponseEntity(result);
    }

    /**
     * 공격 IP 목록 조회
     */
    @GetMapping("/attack-ips")
    public ResponseEntity<ReturnData> getAttackIps(@RequestParam Map<String, Object> reqMap) {
        ReturnData result = accidentApplyService.getAttIpList(new Criterion(reqMap));
        return toResponseEntity(result);
    }

    /**
     * IP로 국가명 조회
     */
    @PostMapping("/ip/nation")
    public ResponseEntity<ReturnData> getNationByIp(@RequestParam Map<String, Object> reqMap) throws UnknownHostException {
        ReturnData result = accidentApplyService.getIpByNationNm(new Criterion(reqMap));
        return toResponseEntity(result);
    }

    /**
     * IP로 기관 조회
     */
    @PostMapping("/ip/institution")
    public ResponseEntity<ReturnData> getInstitutionByIp(@RequestParam Map<String, Object> reqMap) throws UnknownHostException {
        ReturnData result = accidentApplyService.getInstByIP(new Criterion(reqMap));
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
