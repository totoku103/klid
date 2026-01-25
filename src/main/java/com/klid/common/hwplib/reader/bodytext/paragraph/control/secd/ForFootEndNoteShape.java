package com.klid.common.hwplib.reader.bodytext.paragraph.control.secd;

import java.io.IOException;

import com.klid.common.hwplib.object.bodytext.control.sectiondefine.FootEndNoteShape;
import com.klid.common.hwplib.object.docinfo.borderfill.BorderThickness;
import com.klid.common.hwplib.object.docinfo.borderfill.BorderType;
import com.klid.common.hwplib.util.compoundFile.reader.StreamReader;

/**
 * 각주/미주 모양 레코드를 읽기 위한 객체
 * 
 * @author neolord
 */
public class ForFootEndNoteShape {
	/**
	 * 각주/미주 모양 레코드를 읽는다.
	 * 
	 * @param fens
	 *            각주/미주 모양 레코드
	 * @param sr
	 *            스트림 리더
	 * @throws IOException
	 */
	public static void read(FootEndNoteShape fens, StreamReader sr)
			throws IOException {
		fens.getProperty().setValue(sr.readUInt4());
		fens.setUserSymbol(sr.readWChar());
		fens.setBeforeDecorativeLetter(sr.readWChar());
		fens.setAfterDecorativeLetter(sr.readWChar());
		fens.setStartNumber(sr.readUInt2());
		fens.setDivideLineLength(sr.readUInt4());
		fens.setDivideLineTopMargin(sr.readUInt2());
		fens.setDivideLineBottomMargin(sr.readUInt2());
		fens.setBetweenNotesMargin(sr.readUInt2());
		fens.setDivideLineSort(BorderType.valueOf((byte) sr
				.readUInt1()));
		fens.setDivideLineThickness(BorderThickness.valueOf((byte) sr
				.readUInt1()));
		fens.getDivideLineColor().setValue(sr.readUInt4());
	}

}
