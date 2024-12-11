import React, { useContext, useState } from 'react';
import { Layout, Select, Space, Button, Modal, Drawer } from 'antd';
import CryptoContext from '../../context/crypto-context';
import CoinInfoModal from '../CoinInfoModal';
import AddAssetForm from '../AddAssetForm';

 

const headerStyle = {
    width: '100%',
    textAlign: 'center',
    height: 60,
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const AppHeader = () => {
    const [modal, setModal] = useState(false); //состояние модального окна
    const [coin, setCoin] = useState(null); //выбранная валюта
    const [drawer, setDrawer] = useState(false); //состояние бокового дровера
    const { crypto } = useContext(CryptoContext);


    // обработчик выбора валюты и открытие модального окна
    function handleSelect(value) {
        const selectedCoin = crypto.find(c => c.id === value);//найдем криптовалюту по id

        setCoin(selectedCoin);//устанавливаем выбранную валюту
        setModal(true);
    }


    return (
        <Layout.Header style={headerStyle} >

            <Select
                style={{
                    width: 250,
                }}
                value='press to open'
                onSelect={handleSelect}
                options={crypto.map(coin => {
                    return {
                        label: coin.name,
                        value: coin.id,
                        icon: coin.icon,
                    }
                })}
                optionRender={(option) => (
                    <Space>
                        <img style={{width: 25}} src={option.data.icon} alt={option.data.label} /> {option.data.label}
                    </Space>
                )}
            />

            <Button type="primary" onClick={() => setDrawer(true)} >Add Asset</Button>  

            <Modal open={modal} 
                   onCancel={() => setModal(false)} 
                   footer={null} >

                <CoinInfoModal  coin={coin} /> 
            </Modal>
            
            <Drawer width={600} 
                    title="Add Asset" 
                    onClose={() => setDrawer(false)} 
                    open={drawer} 
                    destroyOnClose >

                <AddAssetForm onClose={() => setDrawer(false)} />
            </Drawer>
        </Layout.Header>
    )
}

export default AppHeader;