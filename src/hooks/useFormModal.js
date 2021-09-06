import { useState, useEffect } from 'react'
import useRequest from '@ahooksjs/use-request'

function useOnOk({ setVisible, onOk }) {
  if (!onOk) {
    return {}
  }
  const { run, loading } = useRequest(onOk, { manual: true })

  return {
    confirm: fieldsValue =>
      run(fieldsValue).then(status => {
        status && setVisible(false)
      }),
    confirmLoading: loading,
  }
}

function useFormModal({ modal, defaultFormData }) {
  const [visible, setVisible] = useState(false)
  const [formData, setFormData] = useState({})

  useEffect(() => {
    setFormData(defaultFormData || {})
  }, [defaultFormData])

  const { onOk, ...restModalProps } = modal
  const { confirm, confirmLoading } = useOnOk({ setVisible, onOk })

  const modalProps = {
    visible,
    onCancel() {
      setVisible(false)
    },
    confirmLoading,
    ...restModalProps,
  }

  return { modalProps, setVisible, formData, setFormData, confirm, onOk }
}

export default useFormModal
