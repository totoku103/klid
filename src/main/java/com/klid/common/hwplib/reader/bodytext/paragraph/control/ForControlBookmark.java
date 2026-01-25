package com.klid.common.hwplib.reader.bodytext.paragraph.control;

import com.klid.common.hwplib.object.etc.HWPTag;
import com.klid.common.hwplib.object.RecordHeader;
import com.klid.common.hwplib.object.bodytext.control.ControlBookmark;
import com.klid.common.hwplib.reader.bodytext.paragraph.control.bookmark.ForCtrlData;
import com.klid.common.hwplib.util.compoundFile.reader.StreamReader;

import java.io.IOException;

/**
 * 책갈피 컨트롤을 읽기 위한 객체
 * 
 * @author neolord
 */
public class ForControlBookmark {
	/**
	 * 책갈피 컨트롤을 읽는다.
	 * 
	 * @param b
	 *            책갈피 컨트롤
	 * @param sr
	 *            스트림 리더
	 * @throws IOException
	 */
	public static void read(ControlBookmark b, StreamReader sr)
			throws IOException {
		ctrlData(b, sr);
	}

	/**
	 * 컨트롤 데이터 레코드를 읽는다.
	 * 
	 * @param b
	 *            컨트롤 데이터 레코드
	 * @param sr
	 *            스트림 리더
	 * @throws IOException
	 */
	private static void ctrlData(ControlBookmark b, StreamReader sr)
			throws IOException {
		RecordHeader rh = sr.readRecordHeder();
		if (rh.getTagID() == HWPTag.CTRL_DATA) {
			b.createCtrlData();
			ForCtrlData.read(b.getCtrlData(), sr);
		}
	}
}
