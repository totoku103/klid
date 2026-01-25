package com.klid.common.hwplib.writer.bodytext;

import com.klid.common.hwplib.object.bodytext.Section;
import com.klid.common.hwplib.util.compoundFile.writer.StreamWriter;
import com.klid.common.hwplib.writer.bodytext.paragraph.ForParagraphList;
import com.klid.common.hwplib.writer.bodytext.paragraph.control.secd.ForBatangPageInfo;

import java.io.IOException;

/**
 * 구역을 쓰기 위한 객체
 * 
 * @author neolord
 */
public class ForSection {
	/**
	 * 구역을 쓴다.
	 * 
	 * @param s
	 *            구역
	 * @param sw
	 *            스트림 라이터
	 * @throws IOException
	 */
	public static void write(Section s, StreamWriter sw) throws IOException {
		ForParagraphList.write(s, sw);
		if (s.getLastBatangPageInfo() != null) {
			sw.upRecordLevel();
			ForBatangPageInfo.write(s.getLastBatangPageInfo(), sw);
			sw.downRecordLevel();
		}
	}
}
