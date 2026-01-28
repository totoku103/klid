package com.klid.api.board.accident.service;

import com.klid.common.AppGlobal;
import com.klid.common.hwplib.object.HWPFile;
import com.klid.common.hwplib.object.bodytext.Section;
import com.klid.common.hwplib.object.bodytext.control.Control;
import com.klid.common.hwplib.object.bodytext.control.ControlTable;
import com.klid.common.hwplib.object.bodytext.control.ControlType;
import com.klid.common.hwplib.object.bodytext.control.table.Row;
import com.klid.common.hwplib.reader.HWPReader;
import com.klid.common.hwplib.tool.objectfinder.FieldFinder;
import com.klid.common.hwplib.writer.HWPWriter;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * 사고신고 HWP 문서 생성 서비스 구현체
 */
@Service
public class AccidentHwpDocumentServiceImpl implements AccidentHwpDocumentService {

    @Override
    public Map<String, String> createHwpDocument(Map<String, Object> reqMap) throws Exception {
        String filename = AppGlobal.reportTemplate + "acc_report.hwp";
        HWPFile hwpFile = HWPReader.fromFile(filename);
        Section section = hwpFile.getBodyText().getSectionList().get(0);

        Control c = section.getParagraph(1).getControlList().get(0);
        ControlTable table = (ControlTable) c;
        ArrayList<Row> rows = table.getRowList();

        // 기관명
        if (reqMap.get("dclInstName") != null) {
            rows.get(1).getCellList().get(1).getParagraphList().getParagraph(0).createText();
            rows.get(1).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString(reqMap.get("dclInstName").toString());
        }
        // 부서
        if (reqMap.get("dclDept") != null) {
            rows.get(1).getCellList().get(3).getParagraphList().getParagraph(0).createText();
            rows.get(1).getCellList().get(3).getParagraphList().getParagraph(0).getText().addString(reqMap.get("dclDept").toString());
        }
        // 성명
        if (reqMap.get("dclCrgr") != null) {
            rows.get(2).getCellList().get(1).getParagraphList().getParagraph(0).createText();
            rows.get(2).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString(reqMap.get("dclCrgr").toString());
        }
        // 이메일
        if (reqMap.get("dclEmail") != null) {
            rows.get(3).getCellList().get(1).getParagraphList().getParagraph(0).createText();
            rows.get(3).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString(reqMap.get("dclEmail").toString());
        }
        // 연락처
        if (reqMap.get("dclHpNo") != null && reqMap.get("dclTelNo") != null) {
            rows.get(4).getCellList().get(1).getParagraphList().getParagraph(0).createText();
            rows.get(4).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString("TEL : " + reqMap.get("dclTelNo").toString());
        } else if (reqMap.get("dclHpNo") == null && reqMap.get("dclTelNo") != null) {
            rows.get(4).getCellList().get(1).getParagraphList().getParagraph(0).createText();
            rows.get(4).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString(" / " + "TEL : " + reqMap.get("dclTelNo").toString());
        } else if (reqMap.get("dclHpNo") != null && reqMap.get("dclTelNo") != null) {
            rows.get(4).getCellList().get(1).getParagraphList().getParagraph(0).createText();
            rows.get(4).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString("HP : " + reqMap.get("dclTelNo").toString() + " / ");
        }
        // 사고일시
        if (reqMap.get("inciDt") != null) {
            rows.get(6).getCellList().get(1).getParagraphList().getParagraph(0).createText();
            rows.get(6).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString(reqMap.get("inciDt").toString());
        }
        // 피해IP주소
        if (reqMap.get("dmgIp") != null) {
            rows.get(6).getCellList().get(3).getParagraphList().getParagraph(0).createText();
            rows.get(6).getCellList().get(3).getParagraphList().getParagraph(0).getText().addString(reqMap.get("dmgIp").toString());
        }
        // 피해시스템용도 -> 사고유형 한글값
        if (reqMap.get("dclHpNo") != null) {
            rows.get(7).getCellList().get(1).getParagraphList().getParagraph(0).createText();
            rows.get(7).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString(reqMap.get("dclHpNo").toString());
        }
        // 운영체제
        if (reqMap.get("osNm") != null) {
            rows.get(7).getCellList().get(3).getParagraphList().getParagraph(0).createText();
            rows.get(7).getCellList().get(3).getParagraphList().getParagraph(0).getText().addString(reqMap.get("osNm").toString());
        }
        // 사고유형
        if (reqMap.get("accdTypName") != null) {
            rows.get(8).getCellList().get(1).getParagraphList().getParagraph(0).createText();
            rows.get(8).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString(reqMap.get("accdTypName").toString());
        }
        // 사고내용
        if (reqMap.get("inciDclCont") != null) {
            String inciDclCont = (String) reqMap.get("inciDclCont");
            ArrayList<String> textList = new ArrayList<>();
            textList.add(inciDclCont.replaceAll("\\n", System.lineSeparator()));
            FieldFinder.setFieldText(hwpFile, ControlType.FIELD_CLICKHERE, "필드1", textList);
        }
        // 공격자정보
        if (reqMap.get("attIp") != null) {
            rows.get(11).getCellList().get(1).getParagraphList().getParagraph(0).createText();
            rows.get(11).getCellList().get(1).getParagraphList().getParagraph(0).getText().addString(reqMap.get("attIp").toString() + "(" + reqMap.get("attNatnNm").toString() + ")");
        }
        // 긴급조치실시사항
        if (reqMap.get("inciInvsCont") != null) {
            String inciInvsCont = (String) reqMap.get("inciInvsCont");
            ArrayList<String> textList = new ArrayList<>();
            textList.add(inciInvsCont.replaceAll("\\n", System.lineSeparator()));
            FieldFinder.setFieldText(hwpFile, ControlType.FIELD_CLICKHERE, "필드2", textList);
        }
        // 시도의견
        if (reqMap.get("inciBelowCont") != null) {
            String inciBelowCont = (String) reqMap.get("inciBelowCont");
            ArrayList<String> textList = new ArrayList<>();
            textList.add(inciBelowCont.replaceAll("\\n", System.lineSeparator()));
            FieldFinder.setFieldText(hwpFile, ControlType.FIELD_CLICKHERE, "필드3", textList);
        }

        File file = new File(AppGlobal.homePath + "/export");
        if (!file.exists()) {
            file.mkdirs();
        }

        String createTime = DateFormatUtils.format(new Date(), "yyyyMMddHHmmssSSS");
        filename = AppGlobal.homePath + "/export/" + createTime + ".hwp";
        HWPWriter.toFile(hwpFile, filename);

        Map<String, String> resultMap = new HashMap<>();
        resultMap.put("filePath", "/export/" + createTime + ".hwp");
        resultMap.put("fileName", createTime);
        resultMap.put("fileExt", ".hwp");
        return resultMap;
    }
}
