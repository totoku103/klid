import api from './axios'
import type {
  BoardCategory,
  NoticeItem,
  QnaItem,
  ShareItem,
  ResourceItem,
  BoardDetail,
  NoticeSearchParams,
  QnaSearchParams,
  MoisBoardItem,
  TakeOverBoardItem,
} from '@/types'

interface ListResponse<T> {
  resultData: T[]
}

export const boardApi = {
  getBoardTypeList: async (groupType: string): Promise<BoardCategory[]> => {
    const response = await api.get<ListResponse<BoardCategory>>(
      '/main/sec/noticeBoard/getBoardTypeList.do',
      { params: { groupType } }
    )
    return response.data.resultData
  },

  getNoticeSrcType: async (): Promise<{ comCode2: string; codeName: string }[]> => {
    const response = await api.get<ListResponse<{ comCode2: string; codeName: string }>>(
      '/code/getNoticeSrcType.do'
    )
    return response.data.resultData
  },

  getNoticeList: async (params: NoticeSearchParams): Promise<NoticeItem[]> => {
    const response = await api.get<ListResponse<NoticeItem>>(
      '/main/sec/noticeBoard/getBoardList.do',
      { params }
    )
    return response.data.resultData
  },

  getNoticeDetail: async (boardNo: string): Promise<BoardDetail> => {
    const response = await api.get<BoardDetail>(
      '/main/board/getNoticeBoardDetail.do',
      { params: { boardNo } }
    )
    return response.data
  },

  createNotice: async (data: FormData): Promise<void> => {
    await api.post('/main/board/insertNoticeBoard.do', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  updateNotice: async (data: FormData): Promise<void> => {
    await api.post('/main/board/updateNoticeBoard.do', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  deleteNotice: async (boardNo: string): Promise<void> => {
    await api.post('/main/board/deleteNoticeBoard.do', { boardNo })
  },

  getQnaList: async (params: QnaSearchParams): Promise<QnaItem[]> => {
    const response = await api.get<ListResponse<QnaItem>>(
      '/main/sec/qnaBoard/getBoardList.do',
      { params }
    )
    return response.data.resultData
  },

  getQnaDetail: async (boardNo: string): Promise<BoardDetail> => {
    const response = await api.get<BoardDetail>(
      '/main/board/getQnaBoardDetail.do',
      { params: { boardNo } }
    )
    return response.data
  },

  createQna: async (data: FormData): Promise<void> => {
    await api.post('/main/board/insertQnaBoard.do', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  updateQna: async (data: FormData): Promise<void> => {
    await api.post('/main/board/updateQnaBoard.do', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  deleteQna: async (boardNo: string): Promise<void> => {
    await api.post('/main/board/deleteQnaBoard.do', { boardNo })
  },

  createQnaReply: async (data: FormData): Promise<void> => {
    await api.post('/main/board/insertQnaReply.do', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  getShareList: async (params: { title?: string; bultnCont?: string }): Promise<ShareItem[]> => {
    const response = await api.get<ListResponse<ShareItem>>(
      '/main/sec/shareBoard/getBoardList.do',
      { params }
    )
    return response.data.resultData
  },

  getShareDetail: async (boardNo: string): Promise<BoardDetail> => {
    const response = await api.get<BoardDetail>(
      '/main/board/getShareBoardDetail.do',
      { params: { boardNo } }
    )
    return response.data
  },

  createShare: async (data: FormData): Promise<void> => {
    await api.post('/main/board/insertShareBoard.do', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  getResourceCategoryList: async (): Promise<BoardCategory[]> => {
    const response = await api.get<ListResponse<BoardCategory>>(
      '/main/sec/resourceBoard/getCategoryList.do'
    )
    return response.data.resultData
  },

  getResourceList: async (params: {
    cateNo?: string
    title?: string
    bultnCont?: string
  }): Promise<ResourceItem[]> => {
    const response = await api.get<ListResponse<ResourceItem>>(
      '/main/sec/resourceBoard/getBoardList.do',
      { params }
    )
    return response.data.resultData
  },

  getResourceDetail: async (boardNo: string): Promise<BoardDetail> => {
    const response = await api.get<BoardDetail>(
      '/main/board/getResourceBoardDetail.do',
      { params: { boardNo } }
    )
    return response.data
  },

  createResource: async (data: FormData): Promise<void> => {
    await api.post('/main/board/insertResourceBoard.do', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },

  downloadFile: (fileSeq: number): string => {
    return `/main/board/downloadFile.do?fileSeq=${fileSeq}`
  },

  increaseReadCount: async (boardNo: string, boardType: string): Promise<void> => {
    await api.post('/main/board/increaseReadCount.do', { boardNo, boardType })
  },

  getMoisBoardList: async (params: {
    title?: string
    bultnCont?: string
    sInstCd?: string
    sPntInstCd?: string
    sAuthMain?: string
  }): Promise<MoisBoardItem[]> => {
    const response = await api.get<ListResponse<MoisBoardItem>>(
      '/main/sec/resourceBoard/getMoisBoardList.do',
      { params }
    )
    return response.data.resultData
  },

  getTakeOverBoardList: async (params: {
    title?: string
    bultnCont?: string
    sInstCd?: string
    sPntInstCd?: string
    sAuthMain?: string
    date1?: string
    date2?: string
    readFlag?: number
    isCloseFlag?: number
  }): Promise<TakeOverBoardItem[]> => {
    const response = await api.get<ListResponse<TakeOverBoardItem>>(
      '/main/sec/takeOverBoard/getBoardList.do',
      { params }
    )
    return response.data.resultData
  },
}
