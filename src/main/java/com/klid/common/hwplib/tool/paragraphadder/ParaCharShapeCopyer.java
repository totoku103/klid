package com.klid.common.hwplib.tool.paragraphadder;

import com.klid.common.hwplib.object.bodytext.paragraph.charshape.CharPositonShapeIdPair;
import com.klid.common.hwplib.object.bodytext.paragraph.charshape.ParaCharShape;
import com.klid.common.hwplib.tool.paragraphadder.docinfo.DocInfoAdder;

public class ParaCharShapeCopyer {
	public static void copy(ParaCharShape source, ParaCharShape target, DocInfoAdder docInfoAdder) {
		for (CharPositonShapeIdPair cpsp : source.getPositonShapeIdPairList()) {
			target.addParaCharShape(cpsp.getPositon(), docInfoAdder.forCharShape().processById((int) cpsp.getShapeId()));
		}
	}
}
