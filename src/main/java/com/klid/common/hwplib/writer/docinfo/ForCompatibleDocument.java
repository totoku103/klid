package com.klid.common.hwplib.writer.docinfo;

import java.io.IOException;

import com.klid.common.hwplib.object.docinfo.CompatibleDocument;
import com.klid.common.hwplib.object.etc.HWPTag;
import com.klid.common.hwplib.util.compoundFile.writer.StreamWriter;

/**
 * 호환 문서 레코드를 쓰기 위한 객체
 * 
 * @author neolord
 * 
 */
public class ForCompatibleDocument {
	/**
	 * 호환 문서 레코드를 쓴다.
	 * 
	 * @param cd
	 *            호환 문서 레코드
	 * @param sw
	 *            스트림 라이터
	 * @throws IOException
	 */
	public static void write(CompatibleDocument cd, StreamWriter sw)
			throws IOException {
		recordHeader(sw);

		sw.writeUInt4(cd.getTargetProgream().getValue());
	}

	/**
	 * 호환 문서 레코드의 레코드 헤더를 쓴다.
	 * 
	 * @param sw
	 *            스트림 라이터
	 * @throws IOException
	 */
	private static void recordHeader(StreamWriter sw) throws IOException {
		sw.writeRecordHeader(HWPTag.COMPATIBLE_DOCUMENT, 4);
	}
}
