import { VtxImage } from '@vtx/components'
import { downloadUrl } from '@/utils/contants'

export default props => {
  const { images = [], onIndexChange } = props
  return (
    <VtxImage.PreviewGroup onIndexChange={onIndexChange}>
      <div className="imagesList">
        {images.map((item, i) => (
          <div className="image" key={i}>
            <VtxImage
              src={`${downloadUrl}/${item.id}`}
              alt={item.name}
              preview={item.preview || true}
              aspectFit
            />
          </div>
        ))}
      </div>
    </VtxImage.PreviewGroup>
  )
}
