package com.klid.webapp.common.file.service;

import lombok.extern.slf4j.Slf4j;
import com.klid.webapp.main.hist.userActHist.persistence.UserActHistMapper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import jakarta.servlet.http.HttpServletResponse;
import java.io.OutputStreamWriter;
import java.io.Writer;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
@Transactional
@Slf4j
public class CsvFileService extends FileService {


    public CsvFileService(final UserActHistMapper userActHistMapper) {
        super(userActHistMapper);
    }

    public void getFile(HttpServletResponse response,
                        String guid,
                        String refTable,
                        String regUserId,
                        String regUserName,
                        String fileName,
                        List<String> headers,
                        List<List<String>> rows,
                        String reason,
                        String extraAttr) throws Exception {
        writeCsv(response, fileName, headers, rows);

        final int userActHistSeq = insertUserHistory(guid, refTable, regUserId, regUserName);
        insertFileDownloadHistory(userActHistSeq, reason, extraAttr, fileName);
    }

    private void writeCsv(HttpServletResponse response,
                          String fileName,
                          List<String> headers,
                          List<List<String>> rows) throws Exception {

        final String safeName = sanitizeAndCap(fileName);
        final String asciiFallback = asciiFallback(safeName);
        final String encodedStar = rfc5987Encode(safeName);

        String contentDisp = "attachment; filename=\"" + asciiFallback + "\"; filename*=UTF-8''" + encodedStar;
        if (contentDisp.length() > 7000) {
            contentDisp = "attachment; filename=\"download.csv\"; filename*=UTF-8''download.csv";
        }

        // 응답 헤더 설정 (동기)
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/csv; charset=UTF-8");
        response.setHeader("Content-Disposition", contentDisp);
        response.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
        response.setHeader("X-Content-Type-Options", "nosniff");

        //    Excel 호환용 UTF-8 BOM
        response.getOutputStream().write(0xEF);
        response.getOutputStream().write(0xBB);
        response.getOutputStream().write(0xBF);

        try (Writer w = new OutputStreamWriter(response.getOutputStream(), StandardCharsets.UTF_8)) {
            // 헤더 행
            if (headers != null && !headers.isEmpty()) {
                writeRow(w, headers);
            }
            // 데이터 행
            if (rows != null) {
                for (List<String> row : rows) {
                    writeRow(w, row);
                }
            }
            w.flush();
        }
    }

    private void writeRow(Writer w, List<String> fields) throws Exception {
        final StringBuilder sb = new StringBuilder(128);
        for (int i = 0; i < fields.size(); i++) {
            if (i > 0) sb.append(',');
            sb.append(escapeCsv(fields.get(i)));
        }
        sb.append("\r\n");
        w.write(sb.toString());
    }

    // RFC4180-ish 이스케이프
    private String escapeCsv(String s) {
        if (StringUtils.isBlank(s)) s = "";

        final boolean hasQuote = s.indexOf('"') >= 0;
        final boolean needsQuote = hasQuote || s.indexOf(',') >= 0 || s.indexOf('\n') >= 0 || s.indexOf('\r') >= 0;

        if (hasQuote) s = s.replace("\"", "\"\"");
        return needsQuote ? ("\"" + s + "\"") : s;
    }
}