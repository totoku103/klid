package com.klid.common.hwplib.reader.bodytext.paragraph.control;

import java.io.IOException;

import com.klid.common.hwplib.object.etc.HWPTag;
import com.klid.common.hwplib.object.bodytext.control.ControlEquation;
import com.klid.common.hwplib.reader.bodytext.paragraph.control.eqed.ForEQEdit;
import com.klid.common.hwplib.reader.bodytext.paragraph.control.gso.part.ForCaption;
import com.klid.common.hwplib.reader.bodytext.paragraph.control.gso.part.ForCtrlHeaderGso;
import com.klid.common.hwplib.util.compoundFile.reader.StreamReader;

/**
 * 수식 컨트롤을 읽기 위한 객체
 * 
 * @author neolord
 */
public class ForControlEquation {
	/**
	 * 수식 컨트롤
	 */
	private ControlEquation eqed;
	/**
	 * 스트림 리더
	 */
	private StreamReader sr;
	/**
	 * 컨트롤 헤더 레코드의 레벨
	 */
	private int ctrlHeaderLevel;

	/**
	 * 생성자
	 */
	public ForControlEquation() {
	}

	/**
	 * 수식 컨트롤을 읽는다.
	 * 
	 * @param eqed
	 *            수식 컨트롤
	 * @param sr
	 *            스트림 리더
	 * @throws IOException
	 */
	public void read(ControlEquation eqed, StreamReader sr) throws IOException {
		this.eqed = eqed;
		this.sr = sr;
		this.ctrlHeaderLevel = sr.getCurrentRecordHeader().getLevel();

		ctrlHeader();
		caption();

		while (sr.isEndOfStream() == false) {
			if (sr.isImmediatelyAfterReadingHeader() == false) {
				sr.readRecordHeder();
			}

			if (ctrlHeaderLevel >= sr.getCurrentRecordHeader().getLevel()) {
				break;
			}
			readBody();
		}
	}

	/**
	 * 수식 컨트롤의 컨트롤 헤더 레코드를 읽는다.
	 * 
	 * @throws IOException
	 */
	private void ctrlHeader() throws IOException {
		ForCtrlHeaderGso.read(eqed.getHeader(), sr);
	}

	/**
	 * 캡션 정보를 읽는다.
	 * 
	 * @throws IOException
	 */
	private void caption() throws IOException {
		sr.readRecordHeder();
		if (sr.getCurrentRecordHeader().getTagID() == HWPTag.LIST_HEADER) {
			eqed.createCaption();
			ForCaption.read(eqed.getCaption(), sr);
		}
	}

	/**
	 * 이미 읽은 레코드 헤더에 따른 레코드 내용을 읽는다.
	 * 
	 * @throws IOException
	 */
	private void readBody() throws IOException {
		switch (sr.getCurrentRecordHeader().getTagID()) {
		case HWPTag.EQEDIT:
			eqEdit();
			break;
		}
	}

	/**
	 * 수식 정보 레코드를 읽는다.
	 * 
	 * @throws IOException
	 */
	private void eqEdit() throws IOException {
		ForEQEdit.read(eqed.getEQEdit(), sr);
	}
}
