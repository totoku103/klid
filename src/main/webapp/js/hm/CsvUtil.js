/**
 * 범용 CSV 유틸
 * - 어떤 배열 데이터(2차원 배열)든 CSV로 만들어 파일 다운로드
 * - RFC 4180 호환(필요 시 자동 인용 처리, 따옴표 이스케이프)
 */
const CSV = (() => {
  // 셀 문자열화(따옴표 2배, 필요 시 전체 인용)
  function stringifyCell(value, delimiter = ",", quote = '"') {
    const s = value == null ? "" : String(value);
    const mustQuote =
      s.includes(delimiter) ||
      s.includes("\n") ||
      s.includes("\r") ||
      s.includes(quote) ||
      /^\s|\s$/.test(s); // 앞/뒤 공백 보존
    const escaped = s.replaceAll(quote, quote + quote);
    return mustQuote ? `${quote}${escaped}${quote}` : escaped;
  }

  // 2차원 배열 → CSV 문자열
  function toCSV(rows, { headers, delimiter = ",", eol = "\r\n", quote = '"' } = {}) {
    const lines = [];
    if (headers && headers.length) {
      lines.push(headers.map(v => stringifyCell(v, delimiter, quote)).join(delimiter));
    }
    for (const row of rows) {
      lines.push(row.map(v => stringifyCell(v, delimiter, quote)).join(delimiter));
    }
    return lines.join(eol);
  }

  // 파일 다운로드
  function downloadCSV(csvString, filename, { addBOM = true } = {}) {
    const blob = new Blob([(addBOM ? "\ufeff" : "") + csvString], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", filename);
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // 타임스탬프(YYYYMMDDHHmm)
  function timestamp() {
    const now = new Date();
    const pad = n => String(n).padStart(2, "0");
    return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}`;
  }

  // 통합 내보내기
  function exportCSV(rows, {
    headers,
    filenameBase = "export",
    delimiter = ",",
    eol = "\r\n",
    quote = '"',
    addBOM = true,
  } = {}) {
    const csv = toCSV(rows, { headers, delimiter, eol, quote });
    const filename = `${filenameBase}_${timestamp()}.csv`;
    downloadCSV(csv, filename, { addBOM });
  }

  return { toCSV, downloadCSV, exportCSV, timestamp };
})();