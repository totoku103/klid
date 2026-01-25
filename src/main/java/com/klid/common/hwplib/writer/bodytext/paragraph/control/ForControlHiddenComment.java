package com.klid.common.hwplib.writer.bodytext.paragraph.control;

import java.io.IOException;

import com.klid.common.hwplib.object.bodytext.control.ControlHiddenComment;
import com.klid.common.hwplib.object.etc.HWPTag;
import com.klid.common.hwplib.util.compoundFile.writer.StreamWriter;
import com.klid.common.hwplib.writer.bodytext.paragraph.ForParagraphList;
import com.klid.common.hwplib.writer.bodytext.paragraph.control.hiddencomment.ForListHeaderForHiddenComment;
import com.klid.common.hwplib.object.bodytext.control.ctrlheader.CtrlHeader;

/**
 * 숨은 설명 컨트롤을 쓰기 위한 객체
 * 
 * @author neolord
 */
public class ForControlHiddenComment {
	/**
	 * 숨은 설명 컨트롤을 쓴다.
	 * 
	 * @param hc
	 *            숨은 설명 컨트롤
	 * @param sw
	 *            스트림 라이터
	 * @throws IOException
	 */
	public static void write(ControlHiddenComment hc, StreamWriter sw)
			throws IOException {
		ctrlHeader(hc.getHeader(), sw);

		sw.upRecordLevel();

		ForListHeaderForHiddenComment.write(hc.getListHeader(), sw);
		ForParagraphList.write(hc.getParagraphList(), sw);

		sw.downRecordLevel();
	}

	/**
	 * 숨은 설명 컨트롤의 컨트롤 헤더 레코드를 쓴다.
	 * 
	 * @param h
	 *            숨은 설명 컨트롤의 컨트롤 헤더 레코드
	 * @param sw
	 *            스트림 라이터
	 * @throws IOException
	 */
	private static void ctrlHeader(CtrlHeader h, StreamWriter sw)
			throws IOException {
		recordHeader(sw);
		sw.writeUInt4(h.getCtrlId());
	}

	/**
	 * 컨트롤 헤더 레코드의 레코드 헤더를 쓴다.
	 * 
	 * @param sw
	 *            스트림 라이터
	 * @throws IOException
	 */
	private static void recordHeader(StreamWriter sw) throws IOException {
		sw.writeRecordHeader(HWPTag.CTRL_HEADER, 4);
	}
}
