package com.klid.common.hwplib.reader.bodytext.paragraph.control;

import com.klid.common.hwplib.object.bodytext.control.ControlHiddenComment;
import com.klid.common.hwplib.object.etc.HWPTag;
import com.klid.common.hwplib.reader.bodytext.ForParagraphList;
import com.klid.common.hwplib.object.RecordHeader;
import com.klid.common.hwplib.util.compoundFile.reader.StreamReader;

import java.io.IOException;

/**
 * 숨은 설명 컨트롤을 읽기 위한 객체
 * 
 * @author neolord
 */
public class ForControlHiddenComment {
	/**
	 * 숨은 설명 컨트롤
	 */
	private ControlHiddenComment tcmt;
	/**
	 * 스트림 리더
	 */
	private StreamReader sr;

	/**
	 * 생성자
	 */
	public ForControlHiddenComment() {
	}

	/**
	 * 숨은 설명 컨트롤을 읽는다.
	 * 
	 * @param tcmt
	 *            숨은 설명 컨트롤
	 * @param sr
	 *            스트림 리더
	 * @throws IOException
	 */
	public void read(ControlHiddenComment tcmt, StreamReader sr)
			throws IOException {
		this.tcmt = tcmt;
		this.sr = sr;

		listHeader();
		paragraphList();
	}

	/**
	 * 숨은 설명 컨트롤의 문단 리스트 헤더 레코드을 읽는다.
	 * 
	 * @throws IOException
	 */
	private void listHeader() throws IOException {
		RecordHeader rh = sr.readRecordHeder();
		if (rh.getTagID() == HWPTag.LIST_HEADER) {
			tcmt.getListHeader().setParaCount(sr.readSInt4());
			tcmt.getListHeader().getProperty().setValue(sr.readUInt4());
			sr.skipToEndRecord();
		} else {
			throw new IOException("List header must be located.");
		}
	}

	/**
	 * 문단 리스트를 읽는다.
	 * 
	 * @throws IOException
	 */
	private void paragraphList() throws IOException {
		ForParagraphList.read(tcmt.getParagraphList(), sr);
	}
}
