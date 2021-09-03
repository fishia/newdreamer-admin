import { VtxImage } from '@vtx/components'
import { downloadUrl } from '@/utils/contants'

export default props => {
  const {
    images = [],
    onIndexChange,
    aspectFit = true,
    style = { width: '60px', height: '60px' },
  } = props
  return (
    <VtxImage.PreviewGroup onIndexChange={onIndexChange}>
      <div className="imagesList">
        {images.map((item, i) => (
          <div className="image" key={i} style={style}>
            <VtxImage
              src={item.id ? `${downloadUrl}/${item.id}` : item}
              alt={item.name}
              preview={item.preview || true}
              aspectFit={aspectFit}
            />
          </div>
        ))}
      </div>
    </VtxImage.PreviewGroup>
  )
}
