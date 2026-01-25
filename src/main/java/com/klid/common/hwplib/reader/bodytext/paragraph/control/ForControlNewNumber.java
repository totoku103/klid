package com.klid.common.hwplib.reader.bodytext.paragraph.control;

import java.io.IOException;

import com.klid.common.hwplib.object.bodytext.control.ControlNewNumber;
import com.klid.common.hwplib.object.bodytext.control.ctrlheader.CtrlHeaderNewNumber;
import com.klid.common.hwplib.util.compoundFile.reader.StreamReader;

/**
 * 새 번호 지정 컨트롤을 읽기 위한 객체
 * 
 * @author neolord
 */
public class ForControlNewNumber {
	/**
	 * 새 번호 지정 컨트롤을 읽는다.
	 * 
	 * @param nwno
	 *            새 번호 지정 컨트롤
	 * @param sr
	 *            스트림 리더
	 * @throws IOException
	 */
	public static void read(ControlNewNumber nwno, StreamReader sr)
			throws IOException {
		ctrlHeader(nwno.getHeader(), sr);
	}

	/**
	 * 새 번호 지정 컨트롤의 컨트롤 헤더 레코드를 읽는다.
	 * 
	 * @param header
	 *            새 번호 지정 컨트롤의 컨트롤 헤더 레코드
	 * @param sr
	 *            스트림 리더
	 * @throws IOException
	 */
	private static void ctrlHeader(CtrlHeaderNewNumber header, StreamReader sr)
			throws IOException {
		header.getProperty().setValue(sr.readUInt4());
		header.setNumber(sr.readUInt2());
	}
}
