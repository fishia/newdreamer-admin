import { useRef, useState } from 'react'
import RenderMenu from '../components/renderMenu'
import { tableFields } from '../components/column'

export default props => {
  let myref = useRef()
  const [columns, setColumns] = useState([])
  setTimeout(() => {
    if (myref.current) {
      let cols = [...tableFields(myref.current.status)]
      cols.splice(4, 0, [
        '规格修改',
        'sizeChange',
        {
          width: 100,
        },
      ])
      setColumns([...cols])
    }
  }, 0)
  const TableProps = {
    columns,
    classification: 'TAILOR_MADE_PRODUCT',
  }
  return <RenderMenu ref={myref} {...TableProps} />
}
