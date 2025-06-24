import { useRef } from 'react'
import { AutoScrollList, type AutoScrollListRef } from '../index'

type SampleData = {
  id: number
  title: string
  description: string
}

const sampleData: SampleData[] = [
  { id: 1, title: '第一行内容', description: '这是第一行的详细描述信息' },
  {
    id: 2,
    title: '第二行内容',
    description: '这是第二行的详细描述信息，内容稍微长一些',
  },
  { id: 3, title: '第三行内容', description: '这是第三行的详细描述' },
  {
    id: 4,
    title: '第四行内容',
    description: '这是第四行的详细描述信息，包含更多的文本内容，用于测试不同高度的行',
  },
  { id: 5, title: '第五行内容', description: '这是第五行' },
  { id: 6, title: '第六行内容', description: '这是第六行的详细描述信息' },
  {
    id: 7,
    title: '第七行内容',
    description: '这是第七行的内容，用于演示滚动效果',
  },
  {
    id: 8,
    title: '第八行内容',
    description: '最后一行内容，滚动到这里会触发回调',
  },
  {
    id: 9,
    title: '第九行内容',
    description: '最后一行内容，滚动到这里会触发回调',
  },
]

const renderRowItem = (item: (typeof sampleData)[0], index: number) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
      marginBottom: '8px',
    }}
  >
    <div style={{ fontWeight: 500, color: '#1f2937' }}>{item.title}</div>
    <div style={{ fontSize: '14px', color: '#6b7280' }}>{item.description}</div>
    <div style={{ fontSize: '12px', color: '#9ca3af' }}>行号: {index + 1}</div>
  </div>
)

export default function AutoScrollListExample() {
  const scrollContainerRef = useRef<AutoScrollListRef>(null)

  const handleReachBottom = () => {
    console.log('Reached bottom of the list')
  }

  return (
    <>
      <div style={{ marginBottom: '24px' }}>
        <button onClick={() => scrollContainerRef.current?.play()}>play</button>
        <button onClick={() => scrollContainerRef.current?.pause()}>pause</button>
        <button onClick={() => scrollContainerRef.current?.scrollToTop()}>scrollToTop</button>
      </div>

      <div style={{ width: '200px', height: '200px', background: '#f3f4f6' }}>
        <AutoScrollList<SampleData>
          ref={scrollContainerRef}
          data={sampleData}
          loop={true}
          rowItem={renderRowItem}
          autoPlay={true}
          scrollDelay={2000}
          onReachBottom={handleReachBottom}
        />
      </div>
    </>
  )
}
