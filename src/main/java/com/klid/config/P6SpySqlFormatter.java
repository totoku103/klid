package com.klid.config;

import com.p6spy.engine.logging.Category;
import com.p6spy.engine.spy.appender.MessageFormattingStrategy;

import java.util.Locale;

/**
 * P6Spy SQL 로깅 포맷터
 * SQL을 한 줄로 출력하고 파라미터가 바인딩된 상태로 보여줌
 */
public class P6SpySqlFormatter implements MessageFormattingStrategy {

    @Override
    public String formatMessage(int connectionId, String now, long elapsed,
                                String category, String prepared, String sql, String url) {
        if (sql == null || sql.trim().isEmpty()) {
            return "";
        }

        // SQL을 한 줄로 변환 (개행, 탭, 연속 공백 제거)
        String formattedSql = formatSingleLine(sql);

        // STATEMENT 카테고리만 로깅 (COMMIT, ROLLBACK 등 제외)
        if (Category.STATEMENT.getName().equals(category)) {
            return String.format("[P6Spy] | %dms | %s", elapsed, formattedSql);
        }

        return "";
    }

    private String formatSingleLine(String sql) {
        return sql
                .replaceAll("\\s+", " ")  // 연속 공백, 탭, 개행을 단일 공백으로
                .trim();
    }
}
