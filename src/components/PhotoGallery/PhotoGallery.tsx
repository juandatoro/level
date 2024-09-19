import { PhotoAlbum, type RenderPhoto } from 'react-photo-album'
import Lightbox from 'yet-another-react-lightbox'
import Zoom from 'yet-another-react-lightbox/plugins/zoom'
import type { Photo } from './helpers'
import { useState } from 'react'
import 'yet-another-react-lightbox/styles.css'

const renderPhotoComponent: RenderPhoto<Photo> = ({
  photo,
  layoutOptions,
  imageProps: { alt, style, ...restImageProps },
}) => {
  const imageContent = (
    <div
      style={{
        boxSizing: 'content-box',
        alignItems: 'center',
        width: style?.width,
        padding: `${layoutOptions.padding - 2}px`,
      }}
    >
      <img alt={alt} style={{ ...style, width: '100%', padding: 0 }} {...restImageProps} />
      {photo.showTitle && <h2>{photo.title}</h2>}
    </div>
  )

  return photo.isLink ? <a href={photo.url}>{imageContent}</a> : imageContent
}

export type PhotoGalleryProps = {
  photos: Photo[]
  columns?: number
  isLightbox?: boolean
}

export const PhotoGallery = ({ photos, columns = 3, isLightbox = false }: PhotoGalleryProps) => {
  const [index, setIndex] = useState(-1)

  return (
    <div>
      <PhotoAlbum
        layout='columns'
        columns={columns}
        photos={photos}
        renderPhoto={renderPhotoComponent}
        onClick={({ index: current }) => setIndex(current)}
      />
      {isLightbox && (
        <Lightbox
          plugins={[Zoom]}
          zoom={{
            maxZoomPixelRatio: 5,
            zoomInMultiplier: 2,
            doubleTapDelay: 300,
            doubleClickDelay: 300,
            doubleClickMaxStops: 2,
            keyboardMoveDistance: 50,
            wheelZoomDistanceFactor: 100,
            pinchZoomDistanceFactor: 5,
            scrollToZoom: true,
          }}
          index={index}
          slides={photos}
          open={index >= 0}
          close={() => setIndex(-1)}
        />
      )}
    </div>
  )
}
