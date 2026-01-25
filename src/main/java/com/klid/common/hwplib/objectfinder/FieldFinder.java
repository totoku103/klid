package com.klid.common.hwplib.objectfinder;

import com.klid.common.hwplib.object.HWPFile;
import com.klid.common.hwplib.object.bodytext.Section;
import com.klid.common.hwplib.object.bodytext.control.ControlType;
import com.klid.common.hwplib.objectfinder.forField.ForParagraphList;
import com.klid.common.hwplib.textextractor.TextExtractMethod;

import java.io.UnsupportedEncodingException;

/**
 * 필드 객체를 찾는 기능을 포함하는 클래스
 * 
 * @author neolord
 */
public class FieldFinder {
	/**
	 * 누름틀 컨트롤(ClickHere 필드)를 찾는다.
	 * 
	 * @param hwpFile
	 *            한글 파일 객체
	 * @param fieldName
	 *            필드 이름
	 * @param temInField
	 *            필드 안에 텍스트의 텍스트 추출 방법
	 * @return 필드 텍스트
	 * @throws UnsupportedEncodingException 
	 */
	public static String getClickHereText(HWPFile hwpFile, String fieldName,
                                          TextExtractMethod temInField) throws UnsupportedEncodingException {
		String strText = null;
		for (Section s : hwpFile.getBodyText().getSectionList()) {
			strText = ForParagraphList.getFieldText(s,
					ControlType.FIELD_CLICKHERE, fieldName, temInField);
			if (strText != null) {
				break;
			}
		}
		return strText;
	}
}
