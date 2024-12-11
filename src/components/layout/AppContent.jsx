import React from 'react';
import { Layout } from 'antd';
import { useContext } from 'react';
import CryptoContext from '../../context/crypto-context';
import PortfolioChart from '../PortfolioChart';
import AssetsTable from '../AssetsTable';


const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    color: '#fff',
    backgroundColor: '#001529',
    padding: '1rem'
};

const AppContent = () => {
    const { assets, crypto } = useContext(CryptoContext);

    return (
        <Layout.Content style={contentStyle}>
            <h2 style={{textAlign: 'left'}}>
                Portfolio:
                <span style={{marginLeft: 10}}>
                    {
                        assets.map(asset => {
                                const coin = crypto.find((c) => c.id === asset.id)
                                return asset.amount * coin.price
                        }).reduce((acc, value) => {
                                return (
                                    acc += value
                                )
                        }, 0).toFixed(2)
                    }
                    $
                </span>
            </h2>

            <PortfolioChart />

            <AssetsTable />
        </Layout.Content>
    )
}

export default AppContent;