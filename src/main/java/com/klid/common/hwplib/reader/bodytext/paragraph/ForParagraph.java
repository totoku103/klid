package com.klid.common.hwplib.reader.bodytext.paragraph;

import java.io.IOException;

import com.klid.common.hwplib.object.bodytext.control.Control;
import com.klid.common.hwplib.object.bodytext.control.ControlType;
import com.klid.common.hwplib.object.bodytext.paragraph.Paragraph;
import com.klid.common.hwplib.object.etc.HWPTag;
import com.klid.common.hwplib.reader.bodytext.paragraph.control.ForControl;
import com.klid.common.hwplib.reader.bodytext.paragraph.control.gso.ForGsoControl;
import com.klid.common.hwplib.reader.bodytext.paragraph.memo.ForMemo;
import com.klid.common.hwplib.util.compoundFile.reader.StreamReader;

/**
 * 하나의 문단을 읽기 위한 객체
 * 
 * @author neolord
 */
public class ForParagraph {
	/**
	 * 스트림 리더
	 */
	private StreamReader sr;

	/**
	 * 문단 헤더의 level
	 */
	private short paraHeaderLevel;

	/**
	 * 문단 객체
	 */
	private Paragraph paragraph;

	/**
	 * 생성자
	 */
	public ForParagraph() {
	}

	/**
	 * 하나의 문단을 읽는다.
	 * 
	 * @param paragraph
	 *            문단 객체
	 * @param sr
	 *            스트림 리더
	 * @throws IOException
	 */
	public void read(Paragraph paragraph, StreamReader sr) throws IOException {
		if (sr.getCurrentRecordHeader().getTagID() != HWPTag.PARA_HEADER) {
			throw new IOException("This is not paragraph.");
		}

		this.sr = sr;
		this.paragraph = paragraph;
		this.paraHeaderLevel = sr.getCurrentRecordHeader().getLevel();

		paraHeader();
		while (sr.isEndOfStream() == false) {
			if (sr.isImmediatelyAfterReadingHeader() == false) {
				sr.readRecordHeder();
			}
			if (isOutOfParagraph(sr) || isFollowLastBatangPageInfo(sr)) {
				break;
			}
			readBody();
		}
	}

	/**
	 * 문단 헤더 레코드를 읽는다.
	 * 
	 * @throws IOException
	 */
	private void paraHeader() throws IOException {
		ForParaHeader.read(paragraph.getHeader(), sr);
	}

	/**
	 * 읽은 레코드 헤더가 문단 바깥쪽인지 여부를 반환한다.
	 * 
	 * @param sr
	 *            스트림 리더
	 * @return 읽은 레코드 헤더가 문단 바깥쪽인지 여부
	 */
	private boolean isOutOfParagraph(StreamReader sr) {
		return this.paraHeaderLevel >= sr.getCurrentRecordHeader().getLevel();
	}

	/**
	 * 마지막 바탕쪽 정보가 뒤에 붙어 있는지 여부를 반환한다.
	 * 
	 * @param sr
	 *            스트림 리더
	 * @return 마지막 바탕쪽 정보가 뒤에 붙어 있는지 여부
	 */
	private boolean isFollowLastBatangPageInfo(StreamReader sr) {
		return this.paraHeaderLevel == 0 && sr.getCurrentRecordHeader().getTagID() == HWPTag.LIST_HEADER
				&& sr.getCurrentRecordHeader().getLevel() == 1;
	}

	/**
	 * 이미 읽은 레코드 헤더에 따른 레코드 내용을 읽는다.
	 * 
	 * @throws IOException
	 */
	private void readBody() throws IOException {
		switch (sr.getCurrentRecordHeader().getTagID()) {
		case HWPTag.PARA_TEXT:
			paraText();
			break;
		case HWPTag.PARA_CHAR_SHAPE:
			paraCharShape();
			break;
		case HWPTag.PARA_LINE_SEG:
			paraLineSeg();
			break;
		case HWPTag.PARA_RANGE_TAG:
			paraRangeTag();
			break;
		case HWPTag.CTRL_HEADER:
			control();
			break;
		case HWPTag.MEMO_LIST:
			memo();
			break;
		default:
			skipETCRecord();
			break;
		}
	}

	/**
	 * 문단의 텍스트 레코드을 읽는다.
	 * 
	 * @throws IOException
	 */
	private void paraText() throws IOException {
		ForParaText.read(paragraph, sr);
	}

	/**
	 * 문단의 문자 모양 레코드를 읽는다.
	 * 
	 * @throws IOException
	 */
	private void paraCharShape() throws IOException {
		ForParaCharShape.read(paragraph, sr);
	}

	/**
	 * 문단의 레이아웃 레코드를 읽는다.
	 * 
	 * @throws IOException
	 */
	private void paraLineSeg() throws IOException {
		ForParaLineSeq.read(paragraph, sr);
	}

	/**
	 * 문단의 영역 태그 레코드를 읽는다.
	 * 
	 * @throws IOException
	 */
	private void paraRangeTag() throws IOException {
		ForParaRangeTag.read(paragraph, sr, sr.getCurrentRecordHeader().getSize());
	}

	/**
	 * 문단에 포함된 컨트롤을 읽는다.
	 * 
	 * @throws IOException
	 */
	private void control() throws IOException {
		long id = sr.readUInt4();
		if (id == ControlType.Gso.getCtrlId()) {
			ForGsoControl fgc = new ForGsoControl();
			fgc.read(paragraph, sr);
		} else {
			Control c = paragraph.addNewControl(id);
			ForControl.read(c, sr);
		}
	}

	/**
	 * 메모리를 읽는다.
	 * 
	 * @throws IOException
	 */
	private void memo() throws IOException {
		ForMemo.read(paragraph.addNewMemo(), sr);
	}

	/**
	 * 기타 레코드를 스킵한다.
	 * 
	 * @throws IOException
	 */
	private void skipETCRecord() throws IOException {
		byte[] buffer = new byte[(int) sr.getCurrentRecordHeader().getSize()];
		sr.readBytes(buffer);
	}
}
