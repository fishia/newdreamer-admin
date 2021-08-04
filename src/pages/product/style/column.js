export const tableFields = [
  ['名称', 'name', { form: {} }],
  ['适用商品类型', 'productType', { form: {} }],
  ['适合产品分类', 'classification', { form: {}, render: () => '个性化定制' }],
  ['更新时间', 'lastModifyTime', { form: {} }],
]
export const parseColumns = data => ({
  ...data,
  optionDTOS: data.optionDTOS?.map(item => ({
    ...item,
    imagesDTOList: item.imagesDTOList?.map(obj => ({
      ...obj,
      image: JSON.parse(obj.image),
    })),
  })),
})
export const parseFormData = data => ({
  ...data,
  optionDTOS: data.optionDTOS?.map(item => ({
    ...item,
    imagesDTOList: item.imagesDTOList?.map(obj => ({
      ...obj,
      image: JSON.stringify(obj.image),
    })),
  })),
})
