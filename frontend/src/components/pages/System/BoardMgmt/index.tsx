import { useState, useEffect, useCallback } from 'react'
import { globalAlert } from '@/utils/alert'
import { PageToolbar, ToolbarButton } from '@/components/templates'
import { Modal } from '@/components/organisms'
import { Input } from '@/components/atoms/Input'
import { Label } from '@/components/atoms/Label'
import { Button } from '@/components/ui/button'
import { sysApi } from '@/services/api/sysApi'
import type { BoardSetting } from '@/types'
import { cn } from '@/lib/utils'

export function BoardMgmtPage() {
  const [boards, setBoards] = useState<BoardSetting[]>([])
  const [selectedBoard, setSelectedBoard] = useState<BoardSetting | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editForm, setEditForm] = useState<BoardSetting | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const loadBoards = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await sysApi.getBoardMgmtList()
      setBoards(data)
    } catch (err) {
      console.error('Failed to load boards:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadBoards()
  }, [loadBoards])

  const handleRowClick = useCallback((board: BoardSetting) => {
    setSelectedBoard(board)
  }, [])

  const handleEditClick = useCallback(() => {
    if (!selectedBoard) {
      globalAlert.warning('선택된 데이터가 없습니다.')
      return
    }
    setEditForm({ ...selectedBoard })
    setIsEditModalOpen(true)
  }, [selectedBoard])

  const handleEditChange = useCallback(
    (field: keyof BoardSetting) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!editForm) return
        setEditForm((prev) =>
          prev
            ? {
                ...prev,
                [field]:
                  field === 'fileSize' ? Number(e.target.value) : e.target.value,
              }
            : null
        )
      },
    [editForm]
  )

  const handleEditSave = useCallback(async () => {
    if (!editForm) return
    try {
      await sysApi.updateBoardMgmt(editForm)
      globalAlert.success('저장되었습니다.')
      setIsEditModalOpen(false)
      loadBoards()
    } catch {
      globalAlert.error('저장에 실패했습니다.')
    }
  }, [editForm, loadBoards])

  const handleModalOpenChange = useCallback((open: boolean) => {
    if (!open) setIsEditModalOpen(false)
  }, [])

  return (
    <>
      <PageToolbar>
        <ToolbarButton icon="edit" onClick={handleEditClick} title="수정" />
      </PageToolbar>

      <div className="rounded border border-gray-300">
        <div className="bg-[#22516d] px-4 py-2 text-sm font-bold text-white">
          게시판 관리
        </div>
        <div className="overflow-auto">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border-b border-gray-300 p-2 text-left">게시판명</th>
                <th className="border-b border-gray-300 p-2 text-center">허용확장자</th>
                <th className="border-b border-gray-300 p-2 text-center">Upload용량(MByte)</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-gray-500">
                    로딩 중...
                  </td>
                </tr>
              ) : boards.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-4 text-center text-gray-500">
                    데이터가 없습니다
                  </td>
                </tr>
              ) : (
                boards.map((board) => (
                  <tr
                    key={board.guid}
                    onClick={() => handleRowClick(board)}
                    className={cn(
                      'cursor-pointer hover:bg-gray-50',
                      selectedBoard?.guid === board.guid && 'bg-blue-100'
                    )}
                  >
                    <td className="border-b border-gray-200 p-2">{board.menuName}</td>
                    <td className="border-b border-gray-200 p-2 text-center">
                      {board.fileExt}
                    </td>
                    <td className="border-b border-gray-200 p-2 text-center">
                      {board.fileSize}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        open={isEditModalOpen}
        onOpenChange={handleModalOpenChange}
        title="게시판 수정"
        size="sm"
      >
        {editForm && (
          <div className="space-y-4">
            <div>
              <Label>게시판명</Label>
              <Input
                value={editForm.menuName}
                disabled
                className="mt-1 bg-gray-100"
              />
            </div>
            <div>
              <Label>허용확장자</Label>
              <Input
                value={editForm.fileExt}
                onChange={handleEditChange('fileExt')}
                placeholder="jpg,png,pdf"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Upload용량(MByte)</Label>
              <Input
                type="number"
                value={editForm.fileSize}
                onChange={handleEditChange('fileSize')}
                className="mt-1"
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
                취소
              </Button>
              <Button onClick={handleEditSave}>저장</Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}
