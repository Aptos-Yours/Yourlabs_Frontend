import transferImg from '../../asset/image/transfer.png';

type transferLoadingProp = {
    nftName:string;
    transactionId:string;
}

function TransferComplete({ nftName, transactionId }:transferLoadingProp) {
    return (
        <div className="trasfer-status-container">
            <img className="transfer-icon" src={transferImg}/>
            <div className="transfer-status-wrapper">
                <h2 className="eng">{ nftName }</h2>
                <h3>NFT를<br/>전송했어요</h3>
            </div>

            <div className="trasfer-transaction-wrapper"
                onClick={()=>{window.open(`https://goerli.etherscan.io/tx/${transactionId}`)}}
            >
                <h4 className="transfer-transaction-title eng">Transaction</h4>
                <div className="transfer-transaction-id">
                    { transactionId }
                </div>
                <h6 className="transfer0transaction-text">(view on block explorer)</h6>
            </div>

            <div className="transfer-confirm-wrapper">
                <button
                    className="button button--sticky"
                    id="purple"
                >
                    확인
                </button>
                <h5 className="transfer-confirm-text">수수료는 유얼스가 냈어요!</h5>
            </div>
        </div>
    )
}
export default TransferComplete;