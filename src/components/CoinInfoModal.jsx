import { Flex, Tag, Divider, Typography} from 'antd';


// отвечает за конкретную информацию выбранной монеты
function CoinInfoModal({ coin }) { 
    return (
        <>
            <Flex align='center' >
                <img src={coin.icon} alt={coin.name} style={{ width: 40, marginRight: 10 }} />
                <h2>({coin.symbol}) {coin.name}</h2>
            </Flex>

            <Divider />

            <Typography.Paragraph>
                <strong>1 hour: </strong>
                <Tag color={coin.priceChange1h > 0 ? 'green' : 'red'}>
                    {coin.priceChange1h}%
                </Tag>

                <strong>1 day: </strong>
                <Tag color={coin.priceChange1d > 0 ? 'green' : 'red'}>
                    {coin.priceChange1d}%
                </Tag>

                <strong>1 week: </strong>
                <Tag color={coin.priceChange1w > 0 ? 'green' : 'red'}>
                    {coin.priceChange1w}%
                </Tag>
            </Typography.Paragraph>

            <Typography.Paragraph>
                <strong>Price: </strong>
                {coin.price.toFixed(2)}$
            </Typography.Paragraph>
            <Typography.Paragraph>
                <strong>Price BTC: </strong>
                {coin.priceBtc}
            </Typography.Paragraph>
            <Typography.Paragraph>
                <strong>Market Cap: </strong>
                {coin.marketCap}$
            </Typography.Paragraph>
            {coin.contractAddress ?
                <Typography.Paragraph>
                    <strong>Contract Address: </strong>
                    {coin.contractAddress}
                </Typography.Paragraph>
            : null}
        </>
    )
}

export default CoinInfoModal;