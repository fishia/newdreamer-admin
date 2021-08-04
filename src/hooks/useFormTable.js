import { useState, useEffect } from 'react';
import { useAntdTable } from 'ahooks';

function useFormTable(getTableData, option = {}, tableOption = {}) {
    const [selectedRowKeys, setSelectedRowKeys] = useState(() => {
        return [];
    });

    const { refresh, run, params, tableProps, search, loading } = useAntdTable(getTableData, {
        defaultPageSize: 10,
        ...option,
    });

    // 触发查询时清空列表选中项
    useEffect(() => {
        if (selectedRowKeys.length > 0) {
            setSelectedRowKeys([]);
        }
    }, [loading]);

    const { pagination } = tableProps;
    const { current, pageSize } = pagination;
    const newTableProps = {
        ...tableProps,
        pagination,
        startIndex: (current - 1) * pageSize + 1,
        headFootHeight: 115,
        rowSelection: {
            selectedRowKeys,
            onChange(selectedRowKeys) {
                setSelectedRowKeys(selectedRowKeys);
            },
        },
        ...tableOption,
    };

    return {
        search,
        refresh,
        run,
        params,
        tableProps: newTableProps,
        selectedRowKeys,
    };
}

export default useFormTable;
