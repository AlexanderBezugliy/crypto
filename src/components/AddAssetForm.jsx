import { useState, useContext, useRef } from "react";
import { Select, Space, Flex, Divider, Form, InputNumber, Button, DatePicker, Result } from 'antd';
import CryptoContext from "../context/crypto-context";

//окно преобретения различной крипты
function AddAssetForm({ onClose }) {
    const [form] = Form.useForm();
    const { crypto, addAsset } = useContext(CryptoContext);
    const [coin, setCoin] = useState(null); //состояние выбранной валюты что бы можно было взаимодействовать 
    const [submitted, setSubmitted] = useState(false); //состояние после отправки формы
    const assetRef = useRef();//создаем Реф(которая не вызывает цикл рендеренга и мы тем самым его оптимезируем)


    const validateMessages = {
        required: "${label} is required!",
        types: {
            number: "${label} is not valid number"
        },
        number: { //минимальное и максимальное значение
            range: "${label} must be between ${min} and ${max}"
        }
    };

    if (submitted) {
        return (
            <Result
                status="success"
                title="New Asset Added"
                subTitle={`Added ${assetRef.current.amount} of ${coin.name} bprice ${assetRef.current.price}`}
                extra={[
                    <Button type="primary" key="console" onClick={onClose} >
                        Close
                    </Button>,
                ]}
            />
        )
    }

    if (!coin) { 
        return (
            <Select
                style={{
                    width: '100%',
                }}
                onSelect={value => setCoin(crypto.find(coin => coin.id === value))}
                placeholder='Select coin'
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
        )
    }

    function onFinish(values) {
        // Проверка на дублирование
        // const assetExists = crypto.some(asset => asset.id === coin.id);
        // if (assetExists) {
        //     console.log("This asset is already added!");
        //     return; // Если актив уже добавлен, не продолжаем выполнение
        // }
        const newAsset = {
            id: coin.id,
            amount: values.amount,
            price: values.price,
            date: values.date ?.$d ?? new Date(),
        }
        assetRef.current = newAsset;
        setSubmitted(true);
        addAsset(newAsset);
    }

    function handleAmountChange(value) {
        form.setFieldsValue({
            total: (value * coin.price).toFixed(2),
        })
    }

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 10,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                price: coin.price.toFixed(2)
            }}
            onFinish={onFinish} 
            validateMessages={validateMessages}  >


            <Flex align='center' >
                <img src={coin.icon} alt={coin.name} style={{ width: 40, marginRight: 10 }} />
                <h2>{coin.name}</h2>
            </Flex>
            <Divider />


            <Form.Item
                label="Amount"
                name="amount"
                rules={[
                    {
                    required: true,
                    type: 'number',
                    min: 0,
                    },
                ]}
                >
                <InputNumber placeholder="Enter coin amount" onChange={handleAmountChange} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="Price" name="price" >
                {/* ставим атрибут в(disabled) потому что цена фиксированная с рынка */}
                <InputNumber disabled style={{ width: '100%' }} /> 
            </Form.Item>

            <Form.Item label="Date & Time" name="date" >
                <DatePicker showTime /> 
            </Form.Item>

            <Form.Item label="Total" name="total" >
                <InputNumber disabled style={{ width: '100%' }} /> 
            </Form.Item>


            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Add asset
                </Button>
            </Form.Item>
        </Form>
    )
}

export default AddAssetForm;