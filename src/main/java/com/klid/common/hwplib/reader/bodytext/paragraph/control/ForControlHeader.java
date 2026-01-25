package com.klid.common.hwplib.reader.bodytext.paragraph.control;

import java.io.IOException;

import com.klid.common.hwplib.object.bodytext.control.ControlHeader;
import com.klid.common.hwplib.object.bodytext.control.ctrlheader.header.HeaderFooterApplyPage;
import com.klid.common.hwplib.object.bodytext.control.headerfooter.ListHeaderForHeaderFooter;
import com.klid.common.hwplib.object.etc.HWPTag;
import com.klid.common.hwplib.reader.bodytext.ForParagraphList;
import com.klid.common.hwplib.util.compoundFile.reader.StreamReader;
import com.klid.common.hwplib.object.RecordHeader;

/**
 * 머리말 컨트롤을 읽기 위한 객체
 * 
 * @author neolord
 */
public class ForControlHeader {
	/**
	 * 머리말 컨트롤
	 */
	private ControlHeader head;
	/**
	 * 스트림 리더
	 */
	private StreamReader sr;

	/**
	 * 생성자
	 */
	public ForControlHeader() {
	}

	/**
	 * 머리말 컨트롤을 읽는다.
	 * 
	 * @param head
	 *            머리말 컨트롤
	 * @param sr
	 *            스트림 리더
	 * @throws IOException
	 */
	public void read(ControlHeader head, StreamReader sr) throws IOException {
		this.head = head;
		this.sr = sr;

		ctrlHeader();
		listHeader();
		paragraphList();
	}

	/**
	 * 머리말 컨트롤의 컨트롤 헤더 레코드를 읽는다.
	 * 
	 * @throws IOException
	 */
	private void ctrlHeader() throws IOException {
		head.getHeader().setApplyPage(
				HeaderFooterApplyPage.valueOf((byte) sr.readUInt4()));
		if (sr.isEndOfRecord() == false) {
			head.getHeader().setCreateIndex(sr.readSInt4());
		}
	}

	/**
	 * 머리말 컨트롤의 문단 리스트 헤더 레코드를 읽는다.
	 * 
	 * @throws Exception
	 */
	private void listHeader() throws IOException {
		RecordHeader rh = sr.readRecordHeder();
		if (rh.getTagID() == HWPTag.LIST_HEADER) {
			ListHeaderForHeaderFooter lh = head.getListHeader();
			lh.setParaCount(sr.readSInt4());
			lh.getProperty().setValue(sr.readUInt4());
			lh.setTextWidth(sr.readUInt4());
			lh.setTextHeight(sr.readUInt4());
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
		ForParagraphList.read(head.getParagraphList(), sr);
	}
}
