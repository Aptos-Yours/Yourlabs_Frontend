import { useNavigate, useParams } from "react-router-dom";
import MiniHeader from "../../../components/miniHeader/MiniHeader";
import { useNft } from "../../../hook/useNft";
import { ReactComponent as PlusIcon } from "../../../asset/svg/plus.svg";
import './index.scss';

function NftRewardSetting() {
    const navigation = useNavigate();
    const { nftId } = useParams();
    const { nftInfo } = useNft({ nftId: Number(nftId) });

    return (
        <div className="nft-setting-reward">
            <MiniHeader 
                title={"혜택 관리"}
            />
            <h2 className="title">
                혜택 <span className="reward-length">{ nftInfo?.rewards.length }</span>
            </h2>
            <div className="nft-setting-reward-wrapper">
                {
                    !!(nftInfo?.rewards.length)
                    ? <>
                    {
                        nftInfo?.rewards.map((reward, idx) => (
                            <div 
                                className="nft-reward-elem" 
                                key={idx}
                                onClick={()=>{navigation(`${reward.id}`)}}
                            >
                                <h3 className="nft-reward-name">{ reward.rewardName }</h3>
                            </div>
                        ))
                    }
                    <div className="reward-add-button-wrapper">
                        <button
                            className="reward-add-button"
                            onClick={()=>{navigation('add')}}
                        >
                            <PlusIcon />
                            <h5>혜택 추가하기</h5>
                        </button>
                    </div>
                    </>
                    : <div className="reward-empty">
                        <h3 className="reward-empty-text">
                            이 NFT는 혜택이 없습니다!<br/>
                            혜택을 설정하러 가볼까요?
                        </h3>
                        <button
                            className="reward-add-button"
                            onClick={()=>{navigation('add')}}
                        >
                            <PlusIcon />
                            <h5>혜택 추가하기</h5>
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}
export default NftRewardSetting;