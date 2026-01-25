package com.klid.common.hwplib.reader.bodytext.paragraph.control;

import java.io.IOException;

import com.klid.common.hwplib.object.bodytext.control.ctrlheader.CtrlHeaderFootnote;
import com.klid.common.hwplib.object.bodytext.control.footnoteendnote.ListHeaderForFootnodeEndnote;
import com.klid.common.hwplib.object.bodytext.control.sectiondefine.NumberShape;
import com.klid.common.hwplib.object.etc.HWPTag;
import com.klid.common.hwplib.reader.bodytext.ForParagraphList;
import com.klid.common.hwplib.object.RecordHeader;
import com.klid.common.hwplib.object.bodytext.control.ControlFootnote;
import com.klid.common.hwplib.util.compoundFile.reader.StreamReader;

/**
 * 각주 컨트롤을 읽기 위한 객체
 * 
 * @author neolord
 */
public class ForControlFootnote {
	/**
	 * 각주 컨트롤
	 */
	private ControlFootnote fn;
	/**
	 * 스트림 리더
	 */
	private StreamReader sr;

	/**
	 * 생성자
	 */
	public ForControlFootnote() {
	}

	/**
	 * 각주 컨트롤을 읽는다.
	 * 
	 * @param fn
	 *            각주 컨트롤
	 * @param sr
	 *            스트림 리더
	 * @throws IOException
	 */
	public void read(ControlFootnote fn, StreamReader sr) throws IOException {
		this.fn = fn;
		this.sr = sr;

		ctrlHeader();
		listHeader();
		paragraphList();
	}

	/**
	 * 각주 컨트롤의 컨트롤 헤더 레코드를 읽는다.
	 * 
	 * @throws IOException
	 */
	private void ctrlHeader() throws IOException {
		CtrlHeaderFootnote h = fn.getHeader();
		h.setNumber(sr.readUInt4());
		h.setBeforeDecorationLetter(sr.readWChar());
		h.setAfterDecorationLetter(sr.readWChar());
		h.setNumberShape(NumberShape.valueOf((short) sr.readUInt4()));
		h.setInstanceId(sr.readUInt4());
	}

	/**
	 * 각주 컨트롤의 문단 리스트 헤더 레코드를 읽는다.
	 * 
	 * @throws IOException
	 */
	private void listHeader() throws IOException {
		RecordHeader rh = sr.readRecordHeder();
		if (rh.getTagID() == HWPTag.LIST_HEADER) {
			ListHeaderForFootnodeEndnote lh = fn.getListHeader();
			lh.setParaCount(sr.readSInt4());
			lh.getProperty().setValue(sr.readUInt4());
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
		ForParagraphList.read(fn.getParagraphList(), sr);
	}
}
