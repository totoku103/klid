package com.klid.common.hwplib.reader.bodytext.paragraph.control.gso;

import java.io.IOException;

import com.klid.common.hwplib.object.etc.HWPTag;
import com.klid.common.hwplib.object.RecordHeader;
import com.klid.common.hwplib.object.bodytext.control.gso.ControlArc;
import com.klid.common.hwplib.object.bodytext.control.gso.shapecomponenteach.ShapeComponentArc;
import com.klid.common.hwplib.object.bodytext.control.gso.shapecomponenteach.arc.ArcBorder;
import com.klid.common.hwplib.reader.bodytext.paragraph.control.gso.part.ForTextBox;
import com.klid.common.hwplib.util.compoundFile.reader.StreamReader;

/**
 * 호 컨트롤의 나머지 부분을 읽기 위한 객체
 * 
 * @author neolord
 */
public class ForControlArc {
	/**
	 * 호 컨트롤의 나머지 부분을 읽는다.
	 * 
	 * @param arc
	 *            호 컨트롤
	 * @param sr
	 *            스트림 리더
	 * @throws IOException
	 */
	public static void readRest(ControlArc arc, StreamReader sr) throws IOException {
		RecordHeader rh = sr.readRecordHeder();
		if (rh.getTagID() == HWPTag.LIST_HEADER) {
			arc.createTextBox();
			ForTextBox.read(arc.getTextBox(), sr);
			if (sr.isImmediatelyAfterReadingHeader() == false) {
				rh = sr.readRecordHeder();
			}
		}
		if (rh.getTagID() == HWPTag.SHAPE_COMPONENT_ARC) {
			shapeComponentArc(arc.getShapeComponentArc(), sr);
		}
	}

	/**
	 * 호 개체 속성 레코드를 읽는다.
	 * 
	 * @param sca
	 *            호 개체 속성 레코드
	 * @param sr
	 *            스트림 리더
	 * @throws IOException
	 */
	private static void shapeComponentArc(ShapeComponentArc sca, StreamReader sr)
			throws IOException {
		sca.setArcBorder(ArcBorder.valueOf((byte) sr.readUInt1()));
		sca.setCenterX(sr.readSInt4());
		sca.setCenterY(sr.readSInt4());
		sca.setAxis1X(sr.readSInt4());
		sca.setAxis1Y(sr.readSInt4());
		sca.setAxis2X(sr.readSInt4());
		sca.setAxis2Y(sr.readSInt4());
	}
}
