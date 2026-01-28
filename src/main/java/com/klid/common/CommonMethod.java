
package com.klid.common;

import lombok.extern.slf4j.Slf4j;
import java.awt.*;
import java.io.*;
import java.net.InetAddress;
import java.nio.ByteBuffer;
import java.sql.Date;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ResourceBundle;
import java.util.StringTokenizer;
import java.util.regex.Pattern;

import com.klid.common.hwplib.object.HWPFile;
import com.klid.common.hwplib.object.bodytext.Section;
import com.klid.common.hwplib.object.bodytext.control.ctrlheader.CtrlHeaderGso;
import com.klid.common.hwplib.object.bodytext.control.ctrlheader.gso.*;
import com.klid.common.hwplib.object.bodytext.control.gso.ControlRectangle;
import com.klid.common.hwplib.object.bodytext.control.gso.GsoControlType;
import com.klid.common.hwplib.object.bodytext.control.gso.shapecomponent.ShapeComponentNormal;
import com.klid.common.hwplib.object.bodytext.control.gso.shapecomponent.lineinfo.*;
import com.klid.common.hwplib.object.bodytext.control.gso.shapecomponent.shadowinfo.ShadowInfo;
import com.klid.common.hwplib.object.bodytext.control.gso.shapecomponent.shadowinfo.ShadowType;
import com.klid.common.hwplib.object.bodytext.control.gso.shapecomponenteach.ShapeComponentRectangle;
import com.klid.common.hwplib.object.bodytext.paragraph.Paragraph;
import com.klid.common.hwplib.object.docinfo.BinData;
import com.klid.common.hwplib.object.docinfo.bindata.BinDataCompress;
import com.klid.common.hwplib.object.docinfo.bindata.BinDataState;
import com.klid.common.hwplib.object.docinfo.bindata.BinDataType;
import com.klid.common.hwplib.object.docinfo.borderfill.fillinfo.FillInfo;
import com.klid.common.hwplib.object.docinfo.borderfill.fillinfo.ImageFill;
import com.klid.common.hwplib.object.docinfo.borderfill.fillinfo.ImageFillType;
import com.klid.common.hwplib.object.docinfo.borderfill.fillinfo.PictureEffect;

@Slf4j
public class CommonMethod {
    public void insertShapeWithImage(HWPFile hwpFile, String imageFilePath, Rectangle rectangle) throws IOException {

        int streamIndex = addBinData(hwpFile,imageFilePath);
        int binDataID = addBinDataInDocInfo(hwpFile, streamIndex, "png");
        addGsoControl(hwpFile, binDataID, rectangle);
    }

    private int addBinData(HWPFile hwpFile, String imageFilePath) throws IOException {
        int streamIndex = hwpFile.getBinData().getEmbeddedBinaryDataList().size() + 1;

        String streamName = getStreamName(streamIndex,"png");
        byte[] fileBinary = loadFile(imageFilePath);

        hwpFile.getBinData().addNewEmbeddedBinaryData(streamName, fileBinary, BinDataCompress.ByStroageDefault);

        return streamIndex;
    }

    private String getStreamName(int streamIndex, String imageFileExt) {
        return "Bin" + String.format("%04X", streamIndex) + "." + imageFileExt;
    }

    private byte[] loadFile(String filePath) throws IOException {
        File file = new File(filePath);
        byte[] buffer = new byte[(int) file.length()];
        InputStream ios = null;
        try {
            ios = new FileInputStream(file);
            ios.read(buffer);
        } finally {
            try {
                if (ios != null)
                    ios.close();
            } catch (IOException e) {
                ios = null;
            }
        }
        return buffer;
    }

    private int addBinDataInDocInfo(HWPFile hwpFile,int streamIndex, String imageFileExt) {
        BinData bd = new BinData();
        bd.getProperty().setType(BinDataType.Embedding);
        bd.getProperty().setCompress(BinDataCompress.ByStroageDefault);
        bd.getProperty().setState(BinDataState.NotAcceess);
        bd.setBinDataID(streamIndex);
        bd.setExtensionForEmbedding(imageFileExt);
        hwpFile.getDocInfo().getBinDataList().add(bd);
        return hwpFile.getDocInfo().getBinDataList().size();
    }

    private void addGsoControl(HWPFile hwpFile, int binDataID, Rectangle rectangle) {
        ControlRectangle controlRectangle = createRectangleControlAtFirstParagraph(hwpFile);

        int instanceID = 0x5bb840e1;

        setCtrlHeaderGso(controlRectangle, instanceID, rectangle);
        setShapeComponent(controlRectangle, binDataID, rectangle);
        setShapeComponentRectangle(controlRectangle, rectangle);
    }

    private ControlRectangle createRectangleControlAtFirstParagraph(HWPFile hwpFile) {
        Section firstSection = hwpFile.getBodyText().getSectionList().get(0);
        Paragraph firstParagraph = firstSection.getParagraph(0);

        // 문단에서 사각형 컨트롤의 위치를 표현하기 위한 확장 문자를 넣는다.
        firstParagraph.getText().addExtendCharForGSO();

        // 문단에 사각형 컨트롤 추가한다.
        return (ControlRectangle) firstParagraph.addNewGsoControl(GsoControlType.Rectangle);
    }

    private void setCtrlHeaderGso(ControlRectangle controlRectangle, int instanceID, Rectangle rectangle) {
        CtrlHeaderGso hdr = controlRectangle.getHeader();
        GsoHeaderProperty prop = hdr.getProperty();
        prop.setLikeWord(false);
        prop.setApplyLineSpace(false);
        prop.setVertRelTo(VertRelTo.Para);
        prop.setVertRelativeArrange(RelativeArrange.TopOrLeft);
        prop.setHorzRelTo(HorzRelTo.Para);
        prop.setHorzRelativeArrange(RelativeArrange.TopOrLeft);
        prop.setVertRelToParaLimit(true);
        prop.setAllowOverlap(true);
        prop.setWidthCriterion(WidthCriterion.Absolute);
        prop.setHeightCriterion(HeightCriterion.Absolute);
        prop.setProtectSize(false);
        prop.setTextFlowMethod(TextFlowMethod.TopAndBottom);
        prop.setTextHorzArrange(TextHorzArrange.BothSides);
        prop.setObjectNumberSort(ObjectNumberSort.Figure);

        hdr.setyOffset(fromMM(rectangle.y));
        hdr.setxOffset(fromMM(rectangle.x));
        hdr.setWidth(fromMM(rectangle.width));
        hdr.setHeight(fromMM(rectangle.height));
        hdr.setzOrder(0);
        hdr.setOutterMarginLeft(0);
        hdr.setOutterMarginRight(0);
        hdr.setOutterMarginTop(0);
        hdr.setOutterMarginBottom(0);
        hdr.setInstanceId(instanceID);
        hdr.setPreventPageDivide(false);
        hdr.setExplanation(null);
    }

    private int fromMM(int mm) {
        if (mm == 0) {
            return 1;
        }

        return (int) ((double) mm * 72000.0f / 254.0f + 0.5f);
    }

    private void setShapeComponent(ControlRectangle controlRectangle,int binDataID, Rectangle rectangle) {
        ShapeComponentNormal sc = (ShapeComponentNormal) controlRectangle.getShapeComponent();
        sc.setOffsetX(0);
        sc.setOffsetY(0);
        sc.setGroupingCount(0);
        sc.setLocalFileVersion(1);
        sc.setWidthAtCreate(fromMM(rectangle.width));
        sc.setHeightAtCreate(fromMM(rectangle.height));
        sc.setWidthAtCurrent(fromMM(rectangle.width));
        sc.setHeightAtCurrent(fromMM(rectangle.height));
        sc.setRotateAngle(0);
        sc.setRotateXCenter(fromMM(rectangle.width / 2));
        sc.setRotateYCenter(fromMM(rectangle.height / 2));

        sc.createLineInfo();
        LineInfo li = sc.getLineInfo();
        li.getProperty().setLineEndShape(LineEndShape.Flat);
        li.getProperty().setStartArrowShape(LineArrowShape.None);
        li.getProperty().setStartArrowSize(LineArrowSize.MiddleMiddle);
        li.getProperty().setEndArrowShape(LineArrowShape.None);
        li.getProperty().setEndArrowSize(LineArrowSize.MiddleMiddle);
        ;
        li.getProperty().setFillStartArrow(true);
        li.getProperty().setFillEndArrow(true);
        li.getProperty().setLineType(LineType.None);
        li.setOutlineStyle(OutlineStyle.Normal);
        li.setThickness(0);
        li.getColor().setValue(0);

        sc.createFillInfo();
        FillInfo fi = sc.getFillInfo();
        fi.getType().setPatternFill(false);
        fi.getType().setImageFill(true);
        fi.getType().setGradientFill(false);
        fi.createImageFill();
        ImageFill imgF = fi.getImageFill();
        imgF.setImageFillType(ImageFillType.FitSize);
        imgF.getPictureInfo().setBrightness((byte) 0);
        imgF.getPictureInfo().setContrast((byte) 0);
        imgF.getPictureInfo().setEffect(PictureEffect.RealPicture);
        imgF.getPictureInfo().setBinItemID(binDataID);

        sc.createShadowInfo();
        ShadowInfo si = sc.getShadowInfo();
        si.setType(ShadowType.None);
        si.getColor().setValue(0xc4c4c4);
        si.setOffsetX(283);
        si.setOffsetY(283);
        si.setTransparnet((short) 0);

        sc.setMatrixsNormal();
    }

    private void setShapeComponentRectangle(ControlRectangle controlRectangle, Rectangle rectangle) {
        ShapeComponentRectangle scr = controlRectangle.getShapeComponentRectangle();
        scr.setRoundRate((byte) 0);
        scr.setX1(0);
        scr.setY1(0);
        scr.setX2(fromMM(rectangle.width));
        scr.setY2(0);
        scr.setX3(fromMM(rectangle.width));
        scr.setY3(fromMM(rectangle.height));
        scr.setX4(0);
        scr.setY4(fromMM(rectangle.height));
    }
}