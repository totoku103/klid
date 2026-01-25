package com.klid.webapp.common.file.service;

import com.klid.webapp.main.hist.userActHist.persistence.UserActHistMapper;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.poifs.crypt.EncryptionInfo;
import org.apache.poi.poifs.crypt.EncryptionMode;
import org.apache.poi.poifs.crypt.Encryptor;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletResponse;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.security.GeneralSecurityException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class ExcelFileService extends FileService {

    private static final String DEFAULT_DATE_PATTERN = "yyyy-MM-dd HH:mm:ss";

    public ExcelFileService(final UserActHistMapper userActHistMapper) {
        super(userActHistMapper);
    }

    /**
     * 오케스트레이션 지점:
     * - 파일 생성
     * - 감사 이력 기록(필요 시)
     * - HttpServletResponse 로 스트리밍
     */
    public void getFile(HttpServletResponse response,
                        String guid,
                        String refTable,
                        String regUserId,
                        String regUserName,
                        String fileName,
                        String sheetName,
                        List<String> headers,
                        List<Map<String, Object>> rows,
                        String reason,
                        String extraAttr) {
        getFile(response, guid, refTable, regUserId, regUserName, fileName, sheetName, null, headers, rows, reason, extraAttr);
    }

    /**
     * 오케스트레이션 지점 (그룹 헤더 지원):
     * - 파일 생성 (그룹 헤더 포함)
     * - 감사 이력 기록(필요 시)
     * - HttpServletResponse 로 스트리밍
     *
     * @param groupHeaders 그룹 헤더 (null이면 그룹 헤더 없음, 연속된 같은 값은 병합됨)
     *                     예: Arrays.asList("개인정보", "개인정보", "개인정보", "성적", "성적")
     */
    public void getFile(HttpServletResponse response,
                        String guid,
                        String refTable,
                        String regUserId,
                        String regUserName,
                        String fileName,
                        String sheetName,
                        List<String> groupHeaders,
                        List<String> headers,
                        List<Map<String, Object>> rows,
                        String reason,
                        String extraAttr) {

        // 1) Excel 바이트 생성
        final byte[] bytes = buildExcelBytes(sheetName, groupHeaders, headers, rows);

        // 2) 응답 헤더 설정 + 스트리밍
        writeToResponse(response, ensureXlsxExtension(fileName), bytes);

        final int userActHistSeq = insertUserHistory(guid, refTable, regUserId, regUserName);
        insertFileDownloadHistory(userActHistSeq, reason, extraAttr, fileName);
    }

    /**
     * 오케스트레이션 지점 (Map 기반 헤더 지원):
     * - headers를 Map<String, String> 형태로 받아서 처리
     * - key: rows의 데이터 필드명, value: 엑셀 헤더에 표시할 텍스트
     *
     * @param groupHeaders 그룹 헤더
     * @param headerMaps 헤더 매핑 리스트 (각 Map은 key-value 쌍 1개만 포함)
     */
    public void getFileWithMapHeaders(HttpServletResponse response,
                                      String guid,
                                      String refTable,
                                      String regUserId,
                                      String regUserName,
                                      String fileName,
                                      String sheetName,
                                      List<String> groupHeaders,
                                      List<Map<String, String>> headerMaps,
                                      List<Map<String, Object>> rows,
                                      String reason,
                                      String extraAttr) {

        // 1) Excel 바이트 생성
        final byte[] bytes = buildExcelBytesWithMapHeaders(sheetName, groupHeaders, headerMaps, rows);

        // 2) 응답 헤더 설정 + 스트리밍
        writeToResponse(response, ensureXlsxExtension(fileName), bytes);

        final int userActHistSeq = insertUserHistory(guid, refTable, regUserId, regUserName);
        insertFileDownloadHistory(userActHistSeq, reason, extraAttr, fileName);
    }

    /**
     * 오케스트레이션 지점 (Map 기반 헤더 지원 + 비밀번호 암호화):
     * - headers를 Map<String, String> 형태로 받아서 처리
     * - key: rows의 데이터 필드명, value: 엑셀 헤더에 표시할 텍스트
     * - password가 제공되면 엑셀 파일을 암호화
     *
     * @param groupHeaders 그룹 헤더
     * @param headerMaps 헤더 매핑 리스트 (각 Map은 key-value 쌍 1개만 포함)
     * @param password 엑셀 파일 암호화에 사용할 비밀번호 (null이면 암호화 안 함)
     */
    public void getFileWithMapHeadersAndPassword(HttpServletResponse response,
                                                 String guid,
                                                 String refTable,
                                                 String regUserId,
                                                 String regUserName,
                                                 String fileName,
                                                 String sheetName,
                                                 List<String> groupHeaders,
                                                 List<Map<String, String>> headerMaps,
                                                 List<Map<String, Object>> rows,
                                                 String reason,
                                                 String extraAttr,
                                                 String password) {

        // 1) Excel 바이트 생성
        byte[] bytes = buildExcelBytesWithMapHeaders(sheetName, groupHeaders, headerMaps, rows);

        // 2) 비밀번호가 제공된 경우 암호화
        if (password != null && !password.trim().isEmpty()) {
            bytes = encryptExcelBytes(bytes, password);
        }

        // 3) 응답 헤더 설정 + 스트리밍
        writeToResponse(response, ensureXlsxExtension(fileName), bytes);

        final int userActHistSeq = insertUserHistory(guid, refTable, regUserId, regUserName);
        insertFileDownloadHistory(userActHistSeq, reason, extraAttr, fileName);
    }

    // -------------------- 내부 구현부 (Workbook 생성/시트 작성/바이트화) --------------------

    private byte[] buildExcelBytes(String sheetName, List<String> headers, List<Map<String, Object>> rows) {
        return buildExcelBytes(sheetName, null, headers, rows);
    }

    private byte[] buildExcelBytes(String sheetName, List<String> groupHeaders, List<String> headers, List<Map<String, Object>> rows) {
        Workbook wb = new XSSFWorkbook();
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        try {
            buildSheet(wb, safeSheetName(sheetName), groupHeaders, headers, rows);
            wb.write(bos);
            return bos.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("엑셀 생성 실패", e);
        } finally {
            try {
                wb.close();
            } catch (IOException ignore) {
            }
            try {
                bos.close();
            } catch (IOException ignore) {
            }
        }
    }

    private byte[] buildExcelBytesWithMapHeaders(String sheetName, List<String> groupHeaders, List<Map<String, String>> headerMaps, List<Map<String, Object>> rows) {
        Workbook wb = new XSSFWorkbook();
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        try {
            buildSheetWithMapHeaders(wb, safeSheetName(sheetName), groupHeaders, headerMaps, rows);
            wb.write(bos);
            return bos.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("엑셀 생성 실패", e);
        } finally {
            try {
                wb.close();
            } catch (IOException ignore) {
            }
            try {
                bos.close();
            } catch (IOException ignore) {
            }
        }
    }

    private void buildSheet(Workbook wb, String sheetName, List<String> groupHeaders, List<String> headers, List<Map<String, Object>> rows) {
        final Sheet sheet = wb.createSheet(sheetName);

        // 스타일
        final CellStyle headerStyle = wb.createCellStyle();
        final Font headerFont = wb.createFont();
        headerFont.setBold(true);
        headerStyle.setFont(headerFont);
        headerStyle.setAlignment(HorizontalAlignment.CENTER);
        headerStyle.setVerticalAlignment(VerticalAlignment.CENTER);
        headerStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        setThinBorder(headerStyle);

        final CellStyle bodyStyle = wb.createCellStyle();
        setThinBorder(bodyStyle);
        bodyStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        int currentRow = 0;

        // 그룹 헤더 (있는 경우)
        if (groupHeaders != null && !groupHeaders.isEmpty()) {
            final Row groupHeaderRow = sheet.createRow(currentRow++);

            // 그룹 헤더 생성 및 병합 처리
            int i = 0;
            while (i < groupHeaders.size()) {
                final String groupValue = groupHeaders.get(i);
                final Cell cell = groupHeaderRow.createCell(i);

                if (groupValue != null && !groupValue.trim().isEmpty()) {
                    cell.setCellValue(groupValue);
                } else {
                    cell.setCellValue("");
                }
                cell.setCellStyle(headerStyle);

                // 같은 값이 연속되는 경우 병합
                int mergeEnd = i;
                if (groupValue != null && !groupValue.trim().isEmpty()) {
                    while (mergeEnd + 1 < groupHeaders.size() &&
                           groupValue.equals(groupHeaders.get(mergeEnd + 1))) {
                        mergeEnd++;
                        // 병합될 셀도 생성해야 함 (POI 요구사항)
                        final Cell mergeCell = groupHeaderRow.createCell(mergeEnd);
                        mergeCell.setCellStyle(headerStyle);
                    }

                    // 병합 (2개 이상의 셀인 경우에만)
                    if (mergeEnd > i) {
                        sheet.addMergedRegion(new CellRangeAddress(currentRow - 1, currentRow - 1, i, mergeEnd));
                    }
                }

                i = mergeEnd + 1;
            }
        }

        // 일반 헤더
        final Row headerRow = sheet.createRow(currentRow++);
        for (int i = 0; i < headers.size(); i++) {
            final Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers.get(i));
            cell.setCellStyle(headerStyle);
        }

        // 바디
        final SimpleDateFormat sdf = new SimpleDateFormat(DEFAULT_DATE_PATTERN);
        if (rows != null) {
            for (Map<String, Object> rowMap : rows) {
                final Row row = sheet.createRow(currentRow++);
                for (int i = 0; i < headers.size(); i++) {
                    final String key = headers.get(i);
                    final Object value = rowMap != null ? rowMap.get(key) : null;
                    final Cell cell = row.createCell(i);
                    cell.setCellStyle(bodyStyle);
                    writeCellValue(cell, value, sdf);
                }
            }
        }

        // 컬럼 너비 자동 조정
        for (int i = 0; i < headers.size(); i++) {
            sheet.autoSizeColumn(i);
            final int width = sheet.getColumnWidth(i);
            sheet.setColumnWidth(i, Math.min(width + 512, 255 * 256));
        }
    }

    /**
     * Map 기반 헤더를 사용하여 시트 생성
     * @param headerMaps 각 Map은 key=datafield, value=headerText 형태
     */
    private void buildSheetWithMapHeaders(Workbook wb, String sheetName, List<String> groupHeaders, List<Map<String, String>> headerMaps, List<Map<String, Object>> rows) {
        final Sheet sheet = wb.createSheet(sheetName);

        // 스타일
        final CellStyle headerStyle = wb.createCellStyle();
        final Font headerFont = wb.createFont();
        headerFont.setBold(true);
        headerStyle.setFont(headerFont);
        headerStyle.setAlignment(HorizontalAlignment.CENTER);
        headerStyle.setVerticalAlignment(VerticalAlignment.CENTER);
        headerStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        setThinBorder(headerStyle);

        final CellStyle bodyStyle = wb.createCellStyle();
        setThinBorder(bodyStyle);
        bodyStyle.setVerticalAlignment(VerticalAlignment.CENTER);

        int currentRow = 0;

        // headerMaps에서 key(datafield)와 value(headerText) 추출
        final java.util.List<String> dataFields = new java.util.ArrayList<>();
        final java.util.List<String> headerTexts = new java.util.ArrayList<>();

        if (headerMaps != null) {
            for (Map<String, String> headerMap : headerMaps) {
                if (headerMap != null && !headerMap.isEmpty()) {
                    // 각 Map은 1개의 entry만 가짐
                    for (Map.Entry<String, String> entry : headerMap.entrySet()) {
                        dataFields.add(entry.getKey());
                        headerTexts.add(entry.getValue());
                        break; // 첫 번째 entry만 사용
                    }
                }
            }
        }

        // 그룹 헤더 (있는 경우)
        if (groupHeaders != null && !groupHeaders.isEmpty()) {
            final Row groupHeaderRow = sheet.createRow(currentRow++);

            // 그룹 헤더 생성 및 병합 처리
            int i = 0;
            while (i < groupHeaders.size()) {
                final String groupValue = groupHeaders.get(i);
                final Cell cell = groupHeaderRow.createCell(i);

                if (groupValue != null && !groupValue.trim().isEmpty()) {
                    cell.setCellValue(groupValue);
                } else {
                    cell.setCellValue("");
                }
                cell.setCellStyle(headerStyle);

                // 같은 값이 연속되는 경우 병합
                int mergeEnd = i;
                if (groupValue != null && !groupValue.trim().isEmpty()) {
                    while (mergeEnd + 1 < groupHeaders.size() &&
                           groupValue.equals(groupHeaders.get(mergeEnd + 1))) {
                        mergeEnd++;
                        // 병합될 셀도 생성해야 함 (POI 요구사항)
                        final Cell mergeCell = groupHeaderRow.createCell(mergeEnd);
                        mergeCell.setCellStyle(headerStyle);
                    }

                    // 병합 (2개 이상의 셀인 경우에만)
                    if (mergeEnd > i) {
                        sheet.addMergedRegion(new CellRangeAddress(currentRow - 1, currentRow - 1, i, mergeEnd));
                    }
                }

                i = mergeEnd + 1;
            }
        }

        // 일반 헤더 (headerTexts 사용)
        final Row headerRow = sheet.createRow(currentRow++);
        for (int i = 0; i < headerTexts.size(); i++) {
            final Cell cell = headerRow.createCell(i);
            cell.setCellValue(headerTexts.get(i));
            cell.setCellStyle(headerStyle);
        }

        // 바디 (dataFields를 key로 사용하여 rows에서 값 추출)
        final SimpleDateFormat sdf = new SimpleDateFormat(DEFAULT_DATE_PATTERN);
        if (rows != null) {
            for (Map<String, Object> rowMap : rows) {
                final Row row = sheet.createRow(currentRow++);
                for (int i = 0; i < dataFields.size(); i++) {
                    final String key = dataFields.get(i);
                    final Object value = rowMap != null ? rowMap.get(key) : null;
                    final Cell cell = row.createCell(i);
                    cell.setCellStyle(bodyStyle);
                    writeCellValue(cell, value, sdf);
                }
            }
        }

        // 컬럼 너비 자동 조정
        for (int i = 0; i < headerTexts.size(); i++) {
            sheet.autoSizeColumn(i);
            final int width = sheet.getColumnWidth(i);
            sheet.setColumnWidth(i, Math.min(width + 512, 255 * 256));
        }
    }

    private void writeCellValue(Cell cell, Object value, SimpleDateFormat sdf) {
        if (value == null) {
            // POI 3.15에 setBlank() 없음: 새 셀은 BLANK 상태이므로 아무 것도 하지 않음
            return;
        }
        if (value instanceof Number) {
            final Number n = (Number) value;
            cell.setCellValue(n.doubleValue());
        } else if (value instanceof Boolean) {
            final Boolean b = (Boolean) value;
            cell.setCellValue(b.booleanValue());
        } else if (value instanceof Date) {
            final Date d = (Date) value;
            // 현재는 문자열로 출력 (엑셀 날짜 타입 원하시면 DataFormat 스타일 부여 로직 추가)
            cell.setCellValue(sdf.format(d));
        } else {
            cell.setCellValue(String.valueOf(value));
        }
    }

    /**
     * 엑셀 파일 바이트를 암호화합니다.
     * Apache POI의 OOXML 암호화 기능을 사용하여 AES-128 암호화를 적용합니다.
     *
     * @param excelBytes 암호화할 엑셀 파일 바이트
     * @param password 암호화에 사용할 비밀번호
     * @return 암호화된 엑셀 파일 바이트
     */
    private byte[] encryptExcelBytes(byte[] excelBytes, String password) {
        POIFSFileSystem fs = null;
        ByteArrayOutputStream encryptedBaos = null;

        try {
            // 1. 암호화 정보 생성 (AES-128 사용)
            fs = new POIFSFileSystem();
            EncryptionInfo info = new EncryptionInfo(EncryptionMode.agile);
            Encryptor encryptor = info.getEncryptor();
            encryptor.confirmPassword(password);

            // 2. 암호화된 스트림에 원본 엑셀 데이터 쓰기
            OutputStream encryptedStream = encryptor.getDataStream(fs);
            encryptedStream.write(excelBytes);
            encryptedStream.close();

            // 3. 암호화된 파일시스템을 바이트 배열로 변환
            encryptedBaos = new ByteArrayOutputStream();
            fs.writeFilesystem(encryptedBaos);

            return encryptedBaos.toByteArray();

        } catch (IOException e) {
            throw new RuntimeException("엑셀 파일 암호화 중 IO 오류 발생", e);
        } catch (GeneralSecurityException e) {
            throw new RuntimeException("엑셀 파일 암호화 중 보안 오류 발생", e);
        } finally {
            // 리소스 정리
            if (fs != null) {
                try {
                    fs.close();
                } catch (IOException ignore) {
                }
            }
            if (encryptedBaos != null) {
                try {
                    encryptedBaos.close();
                } catch (IOException ignore) {
                }
            }
        }
    }

    private static void setThinBorder(CellStyle style) {
        style.setBorderBottom(BorderStyle.THIN);
        style.setBorderTop(BorderStyle.THIN);
        style.setBorderLeft(BorderStyle.THIN);
        style.setBorderRight(BorderStyle.THIN);
    }

    // -------------------- 응답/파일명 유틸 --------------------

    private void writeToResponse(HttpServletResponse response, String fileNameWithExt, byte[] bytes) {
        final String safeName = sanitizeAndCap(fileNameWithExt);
        final String encodedStar = rfc5987Encode(safeName);

        String contentDisp = "attachment; filename=\"" + safeName + "\"; filename*=UTF-8''" + encodedStar;
        if (contentDisp.length() > 7000) {
            contentDisp = "attachment; filename=\"download.xlsx\"; filename*=UTF-8''download.xlsx";
        }

        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setHeader("Content-Disposition", contentDisp);
        response.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
        response.setHeader("X-Content-Type-Options", "nosniff");
        response.setContentLength(bytes.length);

        try {
            OutputStream os = response.getOutputStream();
            os.write(bytes);
            os.flush(); // 컨테이너가 스트림 close
        } catch (IOException e) {
            throw new RuntimeException("엑셀 응답 쓰기 실패", e);
        }
    }

    private static String ensureXlsxExtension(String name) {
        if (StringUtils.isBlank(name)) return "download.xlsx";
        String n = name.trim();
        return n.toLowerCase().endsWith(".xlsx") ? n : (n + ".xlsx");
    }

    private static String safeSheetName(String name) {
        String n = StringUtils.isBlank(name) ? "Sheet1" : name.trim();
        // 시트명 금지 문자: : \ / ? * [ ]
        n = n.replaceAll("[:\\\\/\\?\\*\\[\\]]", "_");
        // 31자 제한
        return n.length() > 31 ? n.substring(0, 31) : n;
    }

    // -------------------- 요청 DTO (내부 클래스로 유지) --------------------
    public static class ExcelRequestDto {
        private String fileName;
        private String sheetName;
        private List<String> headers;
        private List<Map<String, Object>> rows;

        public String getFileName() {
            return fileName;
        }

        public void setFileName(final String fileName) {
            this.fileName = fileName;
        }

        public String getSheetName() {
            return sheetName;
        }

        public void setSheetName(final String sheetName) {
            this.sheetName = sheetName;
        }

        public List<String> getHeaders() {
            return headers;
        }

        public void setHeaders(final List<String> headers) {
            this.headers = headers;
        }

        public List<Map<String, Object>> getRows() {
            return rows;
        }

        public void setRows(final List<Map<String, Object>> rows) {
            this.rows = rows;
        }
    }
}