package com.klid.common.hwplib.reader.bodytext;

import com.klid.common.hwplib.object.bodytext.paragraph.Paragraph;
import com.klid.common.hwplib.object.bodytext.ParagraphListInterface;
import com.klid.common.hwplib.reader.bodytext.paragraph.ForParagraph;
import com.klid.common.hwplib.util.compoundFile.reader.StreamReader;

import java.io.IOException;

/**
 * 문단 리스트를 읽는 객체
 * 
 * @author neolord
 */
public class ForParagraphList {
	/**
	 * 문단 리스트을 읽는다.
	 * 
	 * @param pli
	 *            문단 리스트 객체
	 * @param sr
	 *            스트림 리더
	 * @throws IOException
	 */
	public static void read(ParagraphListInterface pli, StreamReader sr)
			throws IOException {
		ForParagraph fp = new ForParagraph();
		sr.readRecordHeder();
		while (sr.isEndOfStream() == false) {
			Paragraph para = pli.addNewParagraph();
			fp.read(para, sr);
			if (para.getHeader().isLastInList()) {
				break;
			}
		}
	}
}
