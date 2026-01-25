package com.klid.webapp.common.file.service;

import com.klid.webapp.main.hist.userActHist.persistence.UserActHistMapper;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.WriteListener;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("ExcelFileService 테스트")
class ExcelFileServiceTest {

    private ExcelFileService excelFileService;

    @BeforeEach
    void setUp() {
        UserActHistMapper mockUserActHistMapper = new UserActHistMapper() {
            @Override
            public void addUserActHist(Map<String, Object> paramMap) {
                paramMap.put("seq", 1);
            }

            @Override
            public List<com.klid.webapp.main.hist.userActHist.dto.UserActHistDto> selectUserActHist(Map<String, Object> paramMap) {
                return null;
            }

            @Override
            public int insertFileDownloadHistory(int userActHistSeq, String reason, String extraAttr, String fileName) {
                return 1;
            }
        };
        excelFileService = new ExcelFileService(mockUserActHistMapper);
    }

    @Test
    @DisplayName("기본 케이스 테스트")
    void testGetFile_기본케이스() throws IOException {
        // Given
        ByteArrayOutputStream outputCapture = new ByteArrayOutputStream();
        HttpServletResponse mockResponse = createMockResponse(outputCapture);

        String fileName = "test";
        String sheetName = "TestSheet";
        List<String> headers = Arrays.asList("이름", "나이", "이메일");

        List<Map<String, Object>> rows = new ArrayList<>();
        Map<String, Object> row1 = new LinkedHashMap<>();
        row1.put("이름", "홍길동");
        row1.put("나이", 30);
        row1.put("이메일", "hong@example.com");
        rows.add(row1);

        Map<String, Object> row2 = new LinkedHashMap<>();
        row2.put("이름", "김철수");
        row2.put("나이", 25);
        row2.put("이메일", "kim@example.com");
        rows.add(row2);

        // When
        excelFileService.getFile(mockResponse, "guid", "refTable", "userId", "userName",
                fileName, sheetName, headers, rows, "reason", "extra");

        // Then
        byte[] excelBytes = outputCapture.toByteArray();
        assertNotNull(excelBytes);
        assertTrue(excelBytes.length > 0);

        try (Workbook workbook = new XSSFWorkbook(new ByteArrayInputStream(excelBytes))) {
            Sheet sheet = workbook.getSheet("TestSheet");
            assertNotNull(sheet);

            Row headerRow = sheet.getRow(0);
            assertEquals("이름", headerRow.getCell(0).getStringCellValue());
            assertEquals("나이", headerRow.getCell(1).getStringCellValue());
            assertEquals("이메일", headerRow.getCell(2).getStringCellValue());

            Row dataRow1 = sheet.getRow(1);
            assertEquals("홍길동", dataRow1.getCell(0).getStringCellValue());
            assertEquals(30.0, dataRow1.getCell(1).getNumericCellValue(), 0.01);
            assertEquals("hong@example.com", dataRow1.getCell(2).getStringCellValue());

            Row dataRow2 = sheet.getRow(2);
            assertEquals("김철수", dataRow2.getCell(0).getStringCellValue());
            assertEquals(25.0, dataRow2.getCell(1).getNumericCellValue(), 0.01);
            assertEquals("kim@example.com", dataRow2.getCell(2).getStringCellValue());
        }
    }

    @Test
    @DisplayName("시트명 없이 테스트")
    void testGetFile_시트명없이() throws IOException {
        ByteArrayOutputStream outputCapture = new ByteArrayOutputStream();
        HttpServletResponse mockResponse = createMockResponse(outputCapture);
        List<String> headers = Arrays.asList("컬럼1", "컬럼2");

        excelFileService.getFile(mockResponse, "guid", "refTable", "userId", "userName",
                "test", null, headers, new ArrayList<>(), "reason", "extra");

        byte[] excelBytes = outputCapture.toByteArray();
        try (Workbook workbook = new XSSFWorkbook(new ByteArrayInputStream(excelBytes))) {
            Sheet sheet = workbook.getSheetAt(0);
            assertEquals("Sheet1", sheet.getSheetName());
        }
    }

    @Test
    @DisplayName("빈 시트명 테스트")
    void testGetFile_빈시트명() throws IOException {
        ByteArrayOutputStream outputCapture = new ByteArrayOutputStream();
        HttpServletResponse mockResponse = createMockResponse(outputCapture);
        List<String> headers = Arrays.asList("컬럼1", "컬럼2");

        excelFileService.getFile(mockResponse, "guid", "refTable", "userId", "userName",
                "test", "   ", headers, new ArrayList<>(), "reason", "extra");

        byte[] excelBytes = outputCapture.toByteArray();
        try (Workbook workbook = new XSSFWorkbook(new ByteArrayInputStream(excelBytes))) {
            Sheet sheet = workbook.getSheetAt(0);
            assertEquals("Sheet1", sheet.getSheetName());
        }
    }

    @Test
    @DisplayName("다양한 데이터 타입 테스트")
    void testGetFile_다양한데이터타입() throws IOException {
        ByteArrayOutputStream outputCapture = new ByteArrayOutputStream();
        HttpServletResponse mockResponse = createMockResponse(outputCapture);
        String sheetName = "DataTypes";
        List<String> headers = Arrays.asList("문자열", "정수", "실수", "불린", "날짜", "NULL");

        Date testDate = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        List<Map<String, Object>> rows = new ArrayList<>();
        Map<String, Object> row = new LinkedHashMap<>();
        row.put("문자열", "테스트");
        row.put("정수", 123);
        row.put("실수", 45.67);
        row.put("불린", true);
        row.put("날짜", testDate);
        row.put("NULL", null);
        rows.add(row);

        excelFileService.getFile(mockResponse, "guid", "refTable", "userId", "userName",
                "test", sheetName, headers, rows, "reason", "extra");

        byte[] excelBytes = outputCapture.toByteArray();
        try (Workbook workbook = new XSSFWorkbook(new ByteArrayInputStream(excelBytes))) {
            Sheet sheet = workbook.getSheet("DataTypes");
            Row dataRow = sheet.getRow(1);

            assertEquals("테스트", dataRow.getCell(0).getStringCellValue());
            assertEquals(123.0, dataRow.getCell(1).getNumericCellValue(), 0.01);
            assertEquals(45.67, dataRow.getCell(2).getNumericCellValue(), 0.01);
            assertTrue(dataRow.getCell(3).getBooleanCellValue());
            assertEquals(sdf.format(testDate), dataRow.getCell(4).getStringCellValue());

            Cell nullCell = dataRow.getCell(5);
            assertTrue(nullCell == null || nullCell.getCellType() == CellType.BLANK);
        }
    }

    @Test
    @DisplayName("Long 타입 테스트")
    void testGetFile_Long타입() throws IOException {
        ByteArrayOutputStream outputCapture = new ByteArrayOutputStream();
        HttpServletResponse mockResponse = createMockResponse(outputCapture);
        List<String> headers = Arrays.asList("ID");

        List<Map<String, Object>> rows = new ArrayList<>();
        Map<String, Object> row = new LinkedHashMap<>();
        row.put("ID", 9999999999L);
        rows.add(row);

        excelFileService.getFile(mockResponse, "guid", "refTable", "userId", "userName",
                "test", null, headers, rows, "reason", "extra");

        byte[] excelBytes = outputCapture.toByteArray();
        try (Workbook workbook = new XSSFWorkbook(new ByteArrayInputStream(excelBytes))) {
            Sheet sheet = workbook.getSheetAt(0);
            Row dataRow = sheet.getRow(1);
            assertEquals(9999999999.0, dataRow.getCell(0).getNumericCellValue(), 0.01);
        }
    }

    @Test
    @DisplayName("Boolean 타입 테스트")
    void testGetFile_Boolean타입() throws IOException {
        ByteArrayOutputStream outputCapture = new ByteArrayOutputStream();
        HttpServletResponse mockResponse = createMockResponse(outputCapture);
        List<String> headers = Arrays.asList("활성화", "비활성화");

        List<Map<String, Object>> rows = new ArrayList<>();
        Map<String, Object> row = new LinkedHashMap<>();
        row.put("활성화", true);
        row.put("비활성화", false);
        rows.add(row);

        excelFileService.getFile(mockResponse, "guid", "refTable", "userId", "userName",
                "test", null, headers, rows, "reason", "extra");

        byte[] excelBytes = outputCapture.toByteArray();
        try (Workbook workbook = new XSSFWorkbook(new ByteArrayInputStream(excelBytes))) {
            Sheet sheet = workbook.getSheetAt(0);
            Row dataRow = sheet.getRow(1);
            assertTrue(dataRow.getCell(0).getBooleanCellValue());
            assertFalse(dataRow.getCell(1).getBooleanCellValue());
        }
    }

    @Test
    @DisplayName("빈 데이터 테스트")
    void testGetFile_빈데이터() throws IOException {
        ByteArrayOutputStream outputCapture = new ByteArrayOutputStream();
        HttpServletResponse mockResponse = createMockResponse(outputCapture);
        List<String> headers = Arrays.asList("컬럼1", "컬럼2", "컬럼3");

        excelFileService.getFile(mockResponse, "guid", "refTable", "userId", "userName",
                "test", null, headers, new ArrayList<>(), "reason", "extra");

        byte[] excelBytes = outputCapture.toByteArray();
        try (Workbook workbook = new XSSFWorkbook(new ByteArrayInputStream(excelBytes))) {
            Sheet sheet = workbook.getSheetAt(0);
            assertEquals(1, sheet.getPhysicalNumberOfRows());

            Row headerRow = sheet.getRow(0);
            assertEquals("컬럼1", headerRow.getCell(0).getStringCellValue());
            assertEquals("컬럼2", headerRow.getCell(1).getStringCellValue());
            assertEquals("컬럼3", headerRow.getCell(2).getStringCellValue());
        }
    }

    @Test
    @DisplayName("대량 데이터 테스트")
    void testGetFile_대량데이터() throws IOException {
        ByteArrayOutputStream outputCapture = new ByteArrayOutputStream();
        HttpServletResponse mockResponse = createMockResponse(outputCapture);
        List<String> headers = Arrays.asList("번호", "이름", "값");

        List<Map<String, Object>> rows = new ArrayList<>();
        for (int i = 0; i < 1000; i++) {
            Map<String, Object> row = new LinkedHashMap<>();
            row.put("번호", i);
            row.put("이름", "이름" + i);
            row.put("값", i * 1.5);
            rows.add(row);
        }

        excelFileService.getFile(mockResponse, "guid", "refTable", "userId", "userName",
                "test", null, headers, rows, "reason", "extra");

        byte[] excelBytes = outputCapture.toByteArray();
        try (Workbook workbook = new XSSFWorkbook(new ByteArrayInputStream(excelBytes))) {
            Sheet sheet = workbook.getSheetAt(0);
            assertEquals(1001, sheet.getPhysicalNumberOfRows());

            Row firstDataRow = sheet.getRow(1);
            assertEquals(0.0, firstDataRow.getCell(0).getNumericCellValue(), 0.01);
            assertEquals("이름0", firstDataRow.getCell(1).getStringCellValue());
            assertEquals(0.0, firstDataRow.getCell(2).getNumericCellValue(), 0.01);

            Row lastDataRow = sheet.getRow(1000);
            assertEquals(999.0, lastDataRow.getCell(0).getNumericCellValue(), 0.01);
            assertEquals("이름999", lastDataRow.getCell(1).getStringCellValue());
            assertEquals(1498.5, lastDataRow.getCell(2).getNumericCellValue(), 0.01);
        }
    }

    @Test
    @DisplayName("헤더 스타일 검증")
    void testGetFile_헤더스타일검증() throws IOException {
        ByteArrayOutputStream outputCapture = new ByteArrayOutputStream();
        HttpServletResponse mockResponse = createMockResponse(outputCapture);
        List<String> headers = Arrays.asList("컬럼1");

        excelFileService.getFile(mockResponse, "guid", "refTable", "userId", "userName",
                "test", null, headers, new ArrayList<>(), "reason", "extra");

        byte[] excelBytes = outputCapture.toByteArray();
        try (Workbook workbook = new XSSFWorkbook(new ByteArrayInputStream(excelBytes))) {
            Sheet sheet = workbook.getSheetAt(0);
            Row headerRow = sheet.getRow(0);
            Cell headerCell = headerRow.getCell(0);
            CellStyle headerStyle = headerCell.getCellStyle();

            assertEquals(HorizontalAlignment.CENTER, headerStyle.getAlignment());
            assertEquals(VerticalAlignment.CENTER, headerStyle.getVerticalAlignment());
            assertEquals(FillPatternType.SOLID_FOREGROUND, headerStyle.getFillPattern());
            assertEquals(BorderStyle.THIN, headerStyle.getBorderBottom());
            assertEquals(BorderStyle.THIN, headerStyle.getBorderTop());
            assertEquals(BorderStyle.THIN, headerStyle.getBorderLeft());
            assertEquals(BorderStyle.THIN, headerStyle.getBorderRight());
        }
    }

    @Test
    @DisplayName("바디 스타일 검증")
    void testGetFile_바디스타일검증() throws IOException {
        ByteArrayOutputStream outputCapture = new ByteArrayOutputStream();
        HttpServletResponse mockResponse = createMockResponse(outputCapture);
        List<String> headers = Arrays.asList("컬럼1");

        List<Map<String, Object>> rows = new ArrayList<>();
        Map<String, Object> row = new LinkedHashMap<>();
        row.put("컬럼1", "값1");
        rows.add(row);

        excelFileService.getFile(mockResponse, "guid", "refTable", "userId", "userName",
                "test", null, headers, rows, "reason", "extra");

        byte[] excelBytes = outputCapture.toByteArray();
        try (Workbook workbook = new XSSFWorkbook(new ByteArrayInputStream(excelBytes))) {
            Sheet sheet = workbook.getSheetAt(0);
            Row dataRow = sheet.getRow(1);
            Cell dataCell = dataRow.getCell(0);
            CellStyle bodyStyle = dataCell.getCellStyle();

            assertEquals(VerticalAlignment.CENTER, bodyStyle.getVerticalAlignment());
            assertEquals(BorderStyle.THIN, bodyStyle.getBorderBottom());
            assertEquals(BorderStyle.THIN, bodyStyle.getBorderTop());
            assertEquals(BorderStyle.THIN, bodyStyle.getBorderLeft());
            assertEquals(BorderStyle.THIN, bodyStyle.getBorderRight());
        }
    }

    @Test
    @DisplayName("날짜 포맷 검증")
    void testGetFile_날짜포맷검증() throws IOException {
        ByteArrayOutputStream outputCapture = new ByteArrayOutputStream();
        HttpServletResponse mockResponse = createMockResponse(outputCapture);
        List<String> headers = Arrays.asList("생성일");

        Calendar calendar = Calendar.getInstance();
        calendar.set(2024, Calendar.MARCH, 15, 14, 30, 45);
        Date testDate = calendar.getTime();

        List<Map<String, Object>> rows = new ArrayList<>();
        Map<String, Object> row = new LinkedHashMap<>();
        row.put("생성일", testDate);
        rows.add(row);

        excelFileService.getFile(mockResponse, "guid", "refTable", "userId", "userName",
                "test", null, headers, rows, "reason", "extra");

        byte[] excelBytes = outputCapture.toByteArray();
        try (Workbook workbook = new XSSFWorkbook(new ByteArrayInputStream(excelBytes))) {
            Sheet sheet = workbook.getSheetAt(0);
            Row dataRow = sheet.getRow(1);
            String dateValue = dataRow.getCell(0).getStringCellValue();

            assertTrue(dateValue.matches("\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}"));
            assertTrue(dateValue.startsWith("2024-03-15"));
        }
    }

    @Test
    @DisplayName("특수문자 처리 테스트")
    void testGetFile_특수문자처리() throws IOException {
        ByteArrayOutputStream outputCapture = new ByteArrayOutputStream();
        HttpServletResponse mockResponse = createMockResponse(outputCapture);
        List<String> headers = Arrays.asList("이름", "설명");

        List<Map<String, Object>> rows = new ArrayList<>();
        Map<String, Object> row = new LinkedHashMap<>();
        row.put("이름", "홍길동 <test>");
        row.put("설명", "Line1\nLine2\tTab");
        rows.add(row);

        excelFileService.getFile(mockResponse, "guid", "refTable", "userId", "userName",
                "test", null, headers, rows, "reason", "extra");

        byte[] excelBytes = outputCapture.toByteArray();
        try (Workbook workbook = new XSSFWorkbook(new ByteArrayInputStream(excelBytes))) {
            Sheet sheet = workbook.getSheetAt(0);
            Row dataRow = sheet.getRow(1);
            assertEquals("홍길동 <test>", dataRow.getCell(0).getStringCellValue());
            assertEquals("Line1\nLine2\tTab", dataRow.getCell(1).getStringCellValue());
        }
    }

    @Test
    @DisplayName("ExcelRequestDto Getter/Setter 테스트")
    void testExcelRequestDto_Getters_Setters() {
        ExcelFileService.ExcelRequestDto dto = new ExcelFileService.ExcelRequestDto();

        dto.setFileName("test.xlsx");
        dto.setSheetName("Sheet1");
        dto.setHeaders(Arrays.asList("H1", "H2"));

        List<Map<String, Object>> rows = new ArrayList<>();
        Map<String, Object> row = new HashMap<>();
        row.put("H1", "value1");
        rows.add(row);
        dto.setRows(rows);

        assertEquals("test.xlsx", dto.getFileName());
        assertEquals("Sheet1", dto.getSheetName());
        assertEquals(2, dto.getHeaders().size());
        assertEquals("H1", dto.getHeaders().get(0));
        assertEquals("H2", dto.getHeaders().get(1));
        assertEquals(1, dto.getRows().size());
        assertEquals("value1", dto.getRows().get(0).get("H1"));
    }

    @Test
    @DisplayName("그룹 헤더 테스트")
    void testGetFile_그룹헤더() throws IOException {
        ByteArrayOutputStream outputCapture = new ByteArrayOutputStream();
        HttpServletResponse mockResponse = createMockResponse(outputCapture);

        String fileName = "test";
        String sheetName = "GroupHeaderTest";

        List<String> groupHeaders = Arrays.asList("개인정보", "개인정보", "개인정보", "성적", "성적");
        List<String> headers = Arrays.asList("이름", "나이", "이메일", "수학", "영어");

        List<Map<String, Object>> rows = new ArrayList<>();
        Map<String, Object> row1 = new LinkedHashMap<>();
        row1.put("이름", "홍길동");
        row1.put("나이", 30);
        row1.put("이메일", "hong@example.com");
        row1.put("수학", 95);
        row1.put("영어", 88);
        rows.add(row1);

        excelFileService.getFile(mockResponse, "guid", "refTable", "userId", "userName",
                fileName, sheetName, groupHeaders, headers, rows, "reason", "extra");

        byte[] excelBytes = outputCapture.toByteArray();
        assertNotNull(excelBytes);
        assertTrue(excelBytes.length > 0);

        try (Workbook workbook = new XSSFWorkbook(new ByteArrayInputStream(excelBytes))) {
            Sheet sheet = workbook.getSheet("GroupHeaderTest");
            assertNotNull(sheet);

            Row groupHeaderRow = sheet.getRow(0);
            assertEquals("개인정보", groupHeaderRow.getCell(0).getStringCellValue());
            assertEquals("성적", groupHeaderRow.getCell(3).getStringCellValue());

            int numMergedRegions = sheet.getNumMergedRegions();
            assertTrue(numMergedRegions >= 2, "그룹 헤더가 병합되어야 합니다");

            Row headerRow = sheet.getRow(1);
            assertEquals("이름", headerRow.getCell(0).getStringCellValue());
            assertEquals("나이", headerRow.getCell(1).getStringCellValue());
            assertEquals("이메일", headerRow.getCell(2).getStringCellValue());
            assertEquals("수학", headerRow.getCell(3).getStringCellValue());
            assertEquals("영어", headerRow.getCell(4).getStringCellValue());

            Row dataRow1 = sheet.getRow(2);
            assertEquals("홍길동", dataRow1.getCell(0).getStringCellValue());
            assertEquals(30.0, dataRow1.getCell(1).getNumericCellValue(), 0.01);
            assertEquals("hong@example.com", dataRow1.getCell(2).getStringCellValue());
            assertEquals(95.0, dataRow1.getCell(3).getNumericCellValue(), 0.01);
            assertEquals(88.0, dataRow1.getCell(4).getNumericCellValue(), 0.01);
        }
    }

    @Test
    @DisplayName("그룹 헤더 빈값 포함 테스트")
    void testGetFile_그룹헤더_빈값포함() throws IOException {
        ByteArrayOutputStream outputCapture = new ByteArrayOutputStream();
        HttpServletResponse mockResponse = createMockResponse(outputCapture);

        String fileName = "test";
        String sheetName = "GroupHeaderEmptyTest";

        List<String> groupHeaders = Arrays.asList("그룹A", "그룹A", "", "그룹B", null);
        List<String> headers = Arrays.asList("컬럼1", "컬럼2", "컬럼3", "컬럼4", "컬럼5");

        List<Map<String, Object>> rows = new ArrayList<>();

        excelFileService.getFile(mockResponse, "guid", "refTable", "userId", "userName",
                fileName, sheetName, groupHeaders, headers, rows, "reason", "extra");

        byte[] excelBytes = outputCapture.toByteArray();
        assertNotNull(excelBytes);
        assertTrue(excelBytes.length > 0);

        try (Workbook workbook = new XSSFWorkbook(new ByteArrayInputStream(excelBytes))) {
            Sheet sheet = workbook.getSheet("GroupHeaderEmptyTest");
            assertNotNull(sheet);

            Row groupHeaderRow = sheet.getRow(0);
            assertEquals("그룹A", groupHeaderRow.getCell(0).getStringCellValue());
            assertEquals("", groupHeaderRow.getCell(2).getStringCellValue());
            assertEquals("그룹B", groupHeaderRow.getCell(3).getStringCellValue());

            Row headerRow = sheet.getRow(1);
            assertEquals("컬럼1", headerRow.getCell(0).getStringCellValue());
            assertEquals("컬럼5", headerRow.getCell(4).getStringCellValue());
        }
    }

    @Test
    @DisplayName("그룹 헤더 없이 테스트")
    void testGetFile_그룹헤더없이() throws IOException {
        ByteArrayOutputStream outputCapture = new ByteArrayOutputStream();
        HttpServletResponse mockResponse = createMockResponse(outputCapture);

        List<String> headers = Arrays.asList("컬럼1", "컬럼2");
        List<Map<String, Object>> rows = new ArrayList<>();

        excelFileService.getFile(mockResponse, "guid", "refTable", "userId", "userName",
                "test", "TestSheet", null, headers, rows, "reason", "extra");

        byte[] excelBytes = outputCapture.toByteArray();
        try (Workbook workbook = new XSSFWorkbook(new ByteArrayInputStream(excelBytes))) {
            Sheet sheet = workbook.getSheetAt(0);

            Row headerRow = sheet.getRow(0);
            assertNotNull(headerRow);
            assertEquals("컬럼1", headerRow.getCell(0).getStringCellValue());

            assertEquals(1, sheet.getPhysicalNumberOfRows());
        }
    }

    // Helper methods
    private HttpServletResponse createMockResponse(final ByteArrayOutputStream outputCapture) {
        return new HttpServletResponse() {
            private final Map<String, String> headers = new HashMap<>();

            @Override
            public void addCookie(Cookie cookie) {}

            @Override
            public boolean containsHeader(String name) {
                return headers.containsKey(name);
            }

            @Override
            public String encodeURL(String url) {
                return url;
            }

            @Override
            public String encodeRedirectURL(String url) {
                return url;
            }

            @Override
            public void sendError(int sc, String msg) throws IOException {}

            @Override
            public void sendError(int sc) throws IOException {}

            @Override
            public void sendRedirect(String location) throws IOException {}

            @Override
            public void sendRedirect(String location, int sc, boolean clearBuffer) throws IOException {}

            @Override
            public void setDateHeader(String name, long date) {
                headers.put(name, String.valueOf(date));
            }

            @Override
            public void addDateHeader(String name, long date) {
                headers.put(name, String.valueOf(date));
            }

            @Override
            public void setHeader(String name, String value) {
                headers.put(name, value);
            }

            @Override
            public void addHeader(String name, String value) {
                headers.put(name, value);
            }

            @Override
            public void setIntHeader(String name, int value) {
                headers.put(name, String.valueOf(value));
            }

            @Override
            public void addIntHeader(String name, int value) {
                headers.put(name, String.valueOf(value));
            }

            @Override
            public void setStatus(int sc) {}

            @Override
            public int getStatus() {
                return 200;
            }

            @Override
            public String getHeader(String name) {
                return headers.get(name);
            }

            @Override
            public Collection<String> getHeaders(String name) {
                return Collections.singletonList(headers.get(name));
            }

            @Override
            public Collection<String> getHeaderNames() {
                return headers.keySet();
            }

            @Override
            public String getCharacterEncoding() {
                return "UTF-8";
            }

            @Override
            public String getContentType() {
                return null;
            }

            @Override
            public ServletOutputStream getOutputStream() throws IOException {
                return new ServletOutputStream() {
                    @Override
                    public void write(int b) throws IOException {
                        outputCapture.write(b);
                    }

                    @Override
                    public void write(byte[] b) throws IOException {
                        outputCapture.write(b);
                    }

                    @Override
                    public void write(byte[] b, int off, int len) throws IOException {
                        outputCapture.write(b, off, len);
                    }

                    @Override
                    public boolean isReady() {
                        return true;
                    }

                    @Override
                    public void setWriteListener(WriteListener writeListener) {}
                };
            }

            @Override
            public PrintWriter getWriter() throws IOException {
                return new PrintWriter(outputCapture);
            }

            @Override
            public void setCharacterEncoding(String charset) {}

            @Override
            public void setContentLength(int len) {}

            @Override
            public void setContentLengthLong(long len) {}

            @Override
            public void setContentType(String type) {}

            @Override
            public void setBufferSize(int size) {}

            @Override
            public int getBufferSize() {
                return 0;
            }

            @Override
            public void flushBuffer() throws IOException {}

            @Override
            public void resetBuffer() {}

            @Override
            public boolean isCommitted() {
                return false;
            }

            @Override
            public void reset() {}

            @Override
            public void setLocale(Locale loc) {}

            @Override
            public Locale getLocale() {
                return Locale.getDefault();
            }
        };
    }
}
