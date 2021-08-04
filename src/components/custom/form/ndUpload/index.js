import { useState } from 'react'
import { VtxUpload } from '@vtx/components'
import { uploadSingleUrl, downloadUrl, uploadUrl } from '@/utils/contants'

const NdUpload = props => {
  const {
    maxCount = 9,
    viewMode = false,
    fileDirectorEnum,
    listType = 'picture-card',
    mode = 'multiple',
    onChange,
    files = [],
  } = props
  const [fileList, setFileList] = useState(files)
  const [flag, setFlag] = useState(0)

  return (
    <VtxUpload
      {...{
        ...props,
        fileList,
        listType,
        mode,
        action: mode === 'single' ? uploadSingleUrl(fileDirectorEnum) : uploadUrl(fileDirectorEnum),
        data: file => {
          return {
            fileDirectorEnum,
            files: file,
          }
        },
        downloadUrl,
        flag,
        viewMode,
        maxCount,
        onChange: {},
        onSuccess(file) {
          let files = [
            ...fileList,
            {
              id: mode === 'single' ? file && file.response : file && file.response[0],
              name: file.name,
              type: file.type,
            },
          ]
          setFileList(files)
          onChange(files)
          setFlag(flag + 1)
        },
        onError(e) {
          console.log(e)
        },
        onRemove(file) {
          let arr = fileList.filter(item => item.id !== file.id)
          setFileList(arr)
          onChange(arr)
          setFlag(flag + 1)
        },
      }}
    />
  )
}

export default NdUpload
