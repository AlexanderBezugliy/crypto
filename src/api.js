import { cryptoAssets, cryptoData } from "./data";

const fakeFetchCryptoAssets = () => {

    return (
        new Promise(resolve => {
            setTimeout(() => {
                resolve(cryptoAssets)
            }, 500)
        })
    )
}

const fakeFetchCryptoData = () => {

    return (
        new Promise(resolve => {
            setTimeout(() => {
                resolve(cryptoData);
            }, 500);
        })
    )
}

export {fakeFetchCryptoAssets, fakeFetchCryptoData};