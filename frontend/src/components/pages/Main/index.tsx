import { useCallback } from 'react'
import { globalAlert } from '@/utils/alert'
import { useNavigate } from 'react-router'
import { useUserStore } from '@/stores/userStore'
import { useMainData } from './hooks/useMainData'
import {
  AlarmStepWidget,
  AccidentStatusWidget,
  Top5Widget,
  BoardListWidget,
  MonitoringWidget,
} from './components'

export function MainPage() {
  const navigate = useNavigate()
  const { user } = useUserStore()
  const { data, isLoading } = useMainData()

  const handleNoticeMore = useCallback(() => {
    navigate('/main/sec/noticeBoardList')
  }, [navigate])

  const handleQnaMore = useCallback(() => {
    navigate('/main/sec/qnaBoardList')
  }, [navigate])

  const handleMonitoringMore = useCallback(() => {
    navigate('/main/home/forgeryUrl')
  }, [navigate])

  const handleNoticeClick = useCallback((id: string) => {
    window.open(`/main/board/pNoticeBoardContents?boardNo=${id}`, '_blank', 'width=1000,height=750')
  }, [])

  const handleQnaClick = useCallback(
    (id: string) => {
      const qna = data.qnaList.find((q) => q.bultnNo === id)
      if (qna?.isSecret === 'Y') {
        if (user?.authRole.main !== 'AUTH_MAIN_1' && qna.userId !== user?.userId) {
          globalAlert.info('비밀글입니다.')
          return
        }
      }
      window.open(`/main/board/pQnaBoardContents?boardNo=${id}`, '_blank', 'width=1000,height=650')
    },
    [data.qnaList, user]
  )

  const handleHealthClick = useCallback(
    (instCd: string) => {
      navigate(`/main/home/healthCheckUrl?instCd=${instCd}`)
    },
    [navigate]
  )

  const handleForgeryClick = useCallback(
    (instCd: string) => {
      navigate(`/main/home/forgeryUrl?instCd=${instCd}`)
    },
    [navigate]
  )

  const noticeItems = data.noticeList.map((item) => ({
    id: item.bultnNo,
    title: item.bultnTitle,
    date: item.regDate,
  }))

  const qnaItems = data.qnaList.map((item) => ({
    id: item.bultnNo,
    title: item.bultnTitle,
    date: item.regDate,
  }))

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-lg">로딩 중...</div>
      </div>
    )
  }

  return (
    <div className="h-full overflow-auto bg-gray-50 p-4">
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="w-[320px] shrink-0">
            <AlarmStepWidget threatLevel={data.threatLevel} />
          </div>
          <div className="flex-1">
            <AccidentStatusWidget
              accidentStatus={data.accidentStatus}
              yearStatus={data.yearStatus}
              periodSetting={data.periodSetting}
              periodStatus={data.periodStatus}
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <Top5Widget
            title="피해기관 Top 5"
            items={data.instTop5}
            headerColor="#22516d"
          />
          <Top5Widget
            title="피해유형 Top 5"
            items={data.accdTypeTop5}
            headerColor="#2f6a7c"
          />
          <BoardListWidget
            title="공지사항"
            items={noticeItems}
            onMoreClick={handleNoticeMore}
            onItemClick={handleNoticeClick}
          />
          <BoardListWidget
            title="문의/의견"
            items={qnaItems}
            onMoreClick={handleQnaMore}
            onItemClick={handleQnaClick}
          />
        </div>

        <MonitoringWidget
          monitoringCount={data.monitoringCount}
          monitoringList={data.monitoringList}
          onMoreClick={handleMonitoringMore}
          onHealthClick={handleHealthClick}
          onForgeryClick={handleForgeryClick}
        />
      </div>
    </div>
  )
}
