import { createContext, useState, useEffect } from "react";
import { fakeFetchCryptoAssets, fakeFetchCryptoData } from "../api";
import { percentDifference } from "../utils";

const CryptoContext = createContext({//общее количество данных
    assets: [],
    crypto: [],
    loading: false
})

export function CryptoContextProvider({ children }) {
    const [loading, setLoading] = useState(false);
    const [crypto, setCrypto] = useState([]); // Список криптовалют
    const [assets, setAssets] = useState([]); // Активы пользователя
    

    function mapAssets(assets, result) {
        return assets.map(asset => {
            const coin = result.find(c => c.id === asset.id);//заменил cryptoData на result

            return {
                grow: asset.price < coin.price,// если цена меньше цены coin то тогда пошел рост
                growPercent: percentDifference(asset.price, coin.price),//прирост процента роста
                totalAmount: asset.amount * coin.price,//сколько в деньгах есть конкретной монеты(берем количство текущей крипты и умнажаем на текущую стоимость)
                totalProfit: asset.amount * coin.price - asset.amount * asset.price,//сколько мы заработали/не заработали
                name: coin.name,
                icon: coin.icon, 
                ...asset
            };
        })
    }

    useEffect(() => {
        async function preload() {
            setLoading(true);
            try {
                const { result: cryptoData } = await fakeFetchCryptoData();
                const assets = await fakeFetchCryptoAssets();

                setCrypto(cryptoData); // Устанавливаем список криптовалют
                setAssets(mapAssets(assets, cryptoData));
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            } finally {
                setLoading(false);
            }
        }
        preload();
    }, [])

    function addAsset(newAsset) {
        setAssets(prev => mapAssets([...prev, newAsset], crypto))
    }

    return <CryptoContext.Provider value={{loading, crypto, assets, addAsset}}>{children}</CryptoContext.Provider>
}

export default CryptoContext;