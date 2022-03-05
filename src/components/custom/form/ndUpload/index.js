import { useState } from 'react'
import { omit } from 'lodash'
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
  let tempProps = { ...props }
  if (listType === 'text') {
    tempProps = omit(props, ['viewMode'])
  }
  return (
    <VtxUpload
      {...{
        ...tempProps,
        fileList,
        listType,
        mode,
        multiple: true,
        action: mode === 'single' ? uploadSingleUrl(fileDirectorEnum) : uploadUrl(fileDirectorEnum),
        data: file => {
          return {
            fileDirectorEnum,
            files: file,
          }
        },
        downloadUrl,
        flag, //编辑之后再开启预览
        maxCount,
        onChange: {},
        showUploadList: { showDownloadIcon: viewMode && listType === 'text' },
        onDownload: file => {
          window.open(file?.url, '_blank')
        },
        onSuccess(file) {
          let files = []
          if (mode === 'single') {
            files = [
              {
                id: file && file.response,
                name: file.name,
                type: file.type,
              },
            ]
          } else {
            files = [
              ...fileList,
              {
                id: file && file.response[0],
                name: file.name,
                type: file.type,
              },
            ]
          }
          setFileList(files)
          onChange(files)
          if (mode === 'single') {
            setFlag(flag + 1)
          }
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
