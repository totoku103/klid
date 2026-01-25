package com.klid.common.hwplib.writer.bodytext.paragraph;

import com.klid.common.hwplib.object.bodytext.control.Control;
import com.klid.common.hwplib.object.bodytext.paragraph.Paragraph;
import com.klid.common.hwplib.util.compoundFile.writer.StreamWriter;
import com.klid.common.hwplib.writer.bodytext.paragraph.control.ForControl;
import com.klid.common.hwplib.writer.bodytext.paragraph.memo.ForMemo;

import java.io.IOException;

/**
 * 문단을 쓰기 위한 객체
 * 
 * @author neolord
 */
public class ForParagraph {
	/**
	 * 문단을 쓴다.
	 * 
	 * @param p
	 *            문단
	 * @param sw
	 *            스트림 라이터
	 * @throws IOException
	 */
	public static void write(Paragraph p, StreamWriter sw) throws IOException {
		ForParaHeader.write(p.getHeader(), sw);

		sw.upRecordLevel();

		ForParaText.write(p, sw);
		ForParaCharShape.write(p.getCharShape(), sw);
		ForParaLineSeq.write(p.getLineSeg(), sw);
		ForParaRangeTag.write(p.getRangeTag(), sw);
		ForMemo.write(p.getMemoList(), sw);
		controls(p, sw);
		
		sw.downRecordLevel();
	}

	/**
	 * 문단에 포함된 컨트롤들을 쓴다.
	 * 
	 * @param p
	 *            문단
	 * @param sw
	 *            스트림 라이터
	 * @throws IOException
	 */
	private static void controls(Paragraph p, StreamWriter sw) throws IOException {
		if (p.getControlList() == null) {
			return;
		}

		for (Control c : p.getControlList()) {
			ForControl.write(c, sw);
		}
	}
}
