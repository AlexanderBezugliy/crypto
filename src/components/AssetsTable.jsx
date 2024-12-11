import React from 'react';
import { Table } from 'antd';
import CryptoContext from '../context/crypto-context';
import { useContext } from 'react';



const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Price, $',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.amount - b.amount,
  },
];

function AssetsTable() {
    const { assets } = useContext(CryptoContext);

    const data = assets.map(asset => {
        return {
            key: asset.id,
            name: asset.name,
            price: asset.price,
            amount: asset.amount,
        }
    })

    return (
        <Table pagination={false} columns={columns} dataSource={data}  />
    )
}

export default AssetsTable;