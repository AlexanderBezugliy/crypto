import { Layout, Card, Statistic, Space, List, Typography, Spin, Tag } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { capitalize } from '../../utils';
import { useContext } from 'react';
import CryptoContext from '../../context/crypto-context';



const siderStyle = {
    padding: '1rem',
};

const AppSider = () => {
    const { assets, loading} = useContext(CryptoContext);

    if (loading) { 
        return <Spin fullscreen />;
    }

    return (
        <Layout.Sider width="25%" style={siderStyle}>
            {
                assets.map(asset => {
                    return (
                        <Card key={asset.id} style={{ marginBottom: '1rem' }} >
                            <Statistic  title={
                                            <Space>
                                                <img
                                                    src={asset.icon} // URL иконки валюты
                                                    alt={asset.id} // Альтернативный текст
                                                    style={{ display: 'flex', width: 20, height: 20, marginRight: 4 }} // Стили для иконки
                                                />
                                                {capitalize(asset.id)} {/* Название валюты */}
                                            </Space>}
                                        value={asset.totalAmount} //общее количество в долларах
                                        precision={2}
                                        valueStyle={{ color: asset.grow ? '#3f8600' : '#cf1322' }}
                                        prefix={ asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined /> }
                                        suffix="$"  />
                            
                            <List size='small'
                                dataSource={[
                                    {title: 'Total Profit', value: asset.totalProfit, widthTag: true},
                                    {title: 'Total Amount', value: asset.amount, isPlain: true},
                                ]}
                                renderItem={(item) => (
                                    <List.Item>
                                        <span>{item.title}</span>

                                        <span>
                                            {item.widthTag ? 
                                                <Tag color={asset.grow ? 'green' : 'red'}>
                                                    {asset.growPercent}%
                                                </Tag>
                                             : null}
                                            {item.isPlain ? item.value : null}
                                            {!item.isPlain ? 
                                                <Typography.Text type={asset.grow ? 'success' : 'danger'}>
                                                    {item.value.toFixed(2)}$
                                                </Typography.Text> 
                                            : null}
                                        </span>
                                    </List.Item>
                                )} />
                        </Card>
                    )
                })
            }
        </Layout.Sider>
    )
}

export default AppSider;
