package com.klid.common.hwplib.writer.bodytext.paragraph;

import com.klid.common.hwplib.object.bodytext.paragraph.Paragraph;
import com.klid.common.hwplib.util.compoundFile.writer.StreamWriter;
import com.klid.common.hwplib.object.bodytext.ParagraphListInterface;

import java.io.IOException;

/**
 * 문단 리스트를 쓰기 위한 객체
 * 
 * @author neolord
 */
public class ForParagraphList {
	/**
	 * 문단 리스트를 쓴다.
	 * 
	 * @param pl
	 *            문단 리스트
	 * @param sw
	 *            스트림 라이터
	 * @throws IOException
	 */
	public static void write(ParagraphListInterface pl, StreamWriter sw)
			throws IOException {
		for (Paragraph p : pl) {
			ForParagraph.write(p, sw);
		}
	}
}
