import { Input } from 'antd'
import Combogrid from '@/components/custom/comboGrid'
import { requestCustomeVolumeList } from '@/pages/customer/volume/action'
export default props => {
  const { parseFormData = data => ({ ...data }) } = props
  //量体数据
  const volumeCols = [
    {
      title: '名称',
      dataIndex: 'customer_Name',
      width: 100,
    },
    {
      title: '身高',
      dataIndex: 'height',
    },
    { title: '体重', dataIndex: 'weight' },
    { title: '胸围', dataIndex: 'bust' },
    { title: '中腰', dataIndex: 'middle_Waist' },
    { title: '肩宽', dataIndex: 'shoulder_Width' },
    { title: '袖长', dataIndex: 'sleeve_Length' },
    { title: '腰围', dataIndex: 'waistline' },
    { title: '臀围', dataIndex: 'hips' },
  ]
  //查询列表
  const getTableData = ({ current, pageSize }, formData) => {
    let params = {
      page: current - 1,
      size: pageSize,
      ...parseFormData(formData),
    }
    return requestCustomeVolumeList(params).then(data => {
      if (data)
        return {
          total: data.totalElements,
          list: data.content.map(item => ({ ...item, key: item.volume_Id })),
        }
    })
  }
  //模糊搜索
  const searchForms = [
    {
      name: 'name',
      label: '名称',
      render() {
        return <Input placeholder="请输入" />
      },
    },
  ]
  return (
    <Combogrid
      getTableData={getTableData}
      columns={volumeCols}
      searchForms={searchForms}
      placeholder="请选择量体数据"
      {...props}
    />
  )
}
