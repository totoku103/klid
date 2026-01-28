package com.klid.webapp.common.file.service;


import lombok.extern.slf4j.Slf4j;
import com.klid.webapp.common.Criterion;
import com.klid.webapp.main.hist.userActHist.persistence.UserActHistMapper;
import org.apache.commons.lang3.StringUtils;
import java.nio.charset.StandardCharsets;
import java.util.regex.Pattern;

@Slf4j
public class FileService {
    protected static final int MAX_CODEPOINTS = 150;
    protected static final int MAX_UTF8_BYTES = 800;
    protected static final Pattern CONTROL_OR_SLASH = Pattern.compile("[\\r\\n\\\\/\\u0000-\\u001F\\u007F]");
    protected final UserActHistMapper userActHistMapper;

    public FileService(final UserActHistMapper userActHistMapper) {
        this.userActHistMapper = userActHistMapper;
    }

    protected String sanitizeAndCap(String input) {
        if (input == null) return "download";
        String s = input.trim();
        s = CONTROL_OR_SLASH.matcher(s).replaceAll("");
        s = s.replace(':', '_').replace('*', '_').replace('?', '_')
                .replace('"', '_').replace('<', '_').replace('>', '_').replace('|', '_');
        if (s.isEmpty()) s = "download";
        s = capByCodepoints(s, MAX_CODEPOINTS);
        s = capByUtf8Bytes(s, MAX_UTF8_BYTES);
        return s;
    }

    protected String capByCodepoints(String s, int maxCps) {
        if (s.codePointCount(0, s.length()) <= maxCps) return s;
        final StringBuilder sb = new StringBuilder();
        int i = 0;
        int cps = 0;
        while (i < s.length() && cps < maxCps) {
            final int cp = s.codePointAt(i);
            sb.appendCodePoint(cp);
            i += Character.charCount(cp);
            cps++;
        }
        return sb.toString();
    }

    protected String capByUtf8Bytes(String s, int maxBytes) {
        final byte[] b = s.getBytes(StandardCharsets.UTF_8);
        if (b.length <= maxBytes) return s;

        final StringBuilder sb = new StringBuilder();
        int i = 0;
        int used = 0;
        while (i < s.length()) {
            final int cp = s.codePointAt(i);
            final String tmp = new String(Character.toChars(cp));
            final int add = tmp.getBytes(StandardCharsets.UTF_8).length;
            if (used + add > maxBytes) break;
            sb.append(tmp);
            used += add;
            i += Character.charCount(cp);
        }
        return sb.toString();
    }

    protected String rfc5987Encode(String s) {
        final StringBuilder sb = new StringBuilder(s.length() + 16);
        final byte[] bytes = s.getBytes(StandardCharsets.UTF_8);
        for (byte c : bytes) {
            final int b = c & 0xFF;
            if ((b >= 'a' && b <= 'z') || (b >= 'A' && b <= 'Z') || (b >= '0' && b <= '9')
                    || b == '!' || b == '#' || b == '$' || b == '&' || b == '+' || b == '-' || b == '.' || b == '^'
                    || b == '_' || b == '`' || b == '|' || b == '~') {
                sb.append((char) b);
            } else {
                sb.append('%');
                final String hex = Integer.toHexString(b).toUpperCase();
                if (hex.length() == 1) sb.append('0');
                sb.append(hex);
            }
        }
        return sb.toString();
    }

    protected String asciiFallback(String input) {
        if (StringUtils.isEmpty(input)) return input;

        return input.replaceAll("[^\\x20-\\x7E]", "_");
    }

    public void insertFileDownloadHistory(int userActHistSeq, String reason, String extraAttr, String fileName) {
        final int i = userActHistMapper.insertFileDownloadHistory(userActHistSeq, reason, extraAttr, fileName);
        if (i == 0) {
            log.error("파일 다운로드 이력 저장 실패. userActHistSeq: " + userActHistSeq + ", reason: " + reason + ", extraAttr: " + extraAttr + ", fileName: " + fileName);
        }
    }

    public int insertUserHistory(String guid,
                                  String refTable,
                                  String regUserId,
                                  String regUserName) {
        Criterion criterionHist = new Criterion();
        criterionHist.addParam("guid", guid);
        criterionHist.addParam("actType", "DOWNLOAD");
        criterionHist.addParam("regUserId", regUserId);
        criterionHist.addParam("refTable", refTable);
        criterionHist.addParam("regUserName", regUserName);
        userActHistMapper.addUserActHist(criterionHist.getCondition());

        final Object seq = criterionHist.getValue("seq");
        final String seqStr = seq.toString();
        final boolean isBlank = StringUtils.isBlank(seqStr);
        if (isBlank) {
            log.error(criterionHist.toString());
        }
        return Integer.parseInt(seqStr);
    }

}
