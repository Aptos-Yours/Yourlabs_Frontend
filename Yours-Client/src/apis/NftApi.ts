import { addCreateNft, setCreateNftIdList, setOwnNftIdList, setTransferNftIdList } from '../redux/nft/nftAction';
import { destroy, get, patch, post } from './AxiosCreate';
import store from '../redux/store';

class NFTApi {
    getMypageNftList = async (type:String) => {
        const res = await get(`/nft?type=${type}`);
        return res.data.data;
    }

    getMypageNftSearch = async (type:String, searchWord:String) => {
        const res = await get(`search?type=${type}&keyword=${searchWord}`);
        return res.data;
    }

    getUserOwnNftIdList = async () => {
        const res = await get(`nft/own`);
        store.dispatch(setOwnNftIdList(res.data.data));
        return res.data.data;
    }

    getUserCreateNftIdList = async () => {
        const res = await get(`nft/creation`);
        store.dispatch(setCreateNftIdList(res.data.data));
        return res.data.data;
    }

    getUserTransferNftIdList = async () => {
        const res = await get(`nft/send`);
        store.dispatch(setTransferNftIdList(res.data.data));
        return res.data.data;
    }

    getNftDetail = async (nftId:number) => {
        const res = await get(`nft/${nftId}/detail`);
        return res.data;
    }

    getNftOwnerList = async (nftId:number) => {
        const res = await get(`nft/${nftId}/owners`);
        return res.data;
    }

    /* NFT 생성하기 */
    createNft = async (badge:object) => {
        const res = await post('nft', badge);
        store.dispatch(addCreateNft(res.data.data.id));
        return res.data;
    }

    sendVerifyEmail = async (nftId:number , email:string) => {
        const res = await post('nft/email', {
            nftId: nftId,
            email: email
        });
        return res.data;
    }

    verifyNftByEmail = async (code:string|null) => {
        let _code = "";
        if (code) {
            for (let ch of code) {
                if (ch === ' ') {
                    _code += '+';
                } else {
                    _code += ch;
                }
            }
        }

        const res = await post('/nft/email/verification', {
            code: _code
        });
        return res.data;
    }

    sendUserVerifyPhoto = async (formData:any) => {
        const res = await post('nft/verification/photo', formData);
        return res.data;
    }

    nftPhotoVerificationPending = async (nftId:number) => {
        const res = await get(`nft/${nftId}/photo`);
        return res.data.data;
    }

    transferNft = async (nftId:number, address:string) => {
        const res = await post(`nft/${nftId}/transfer`, {
            walletAddress: address
        });
        return res.data.data;
    }

    // reward 관련
    createNftReward = async (nftId:number, rewardName:string, description:string) => {
        const res = await post(`nft/${nftId}/reward`, {
            rewardName: rewardName,
            description: description
        });
        return res.data.data;
    }

    getNftRewardDetail = async (rewardId:number) => {
        const res = await get(`nft/${rewardId}/reward/detail`);
        return res.data.data;
    }

    editNftReward = async (nftId:number, rewardId:number, rewardName:string, description:string) => {
        const res = await patch(`nft/${nftId}/reward`, {
            rewardId: rewardId,
            rewardName: rewardName,
            description: description
        });
        return res.data.data;
    }

    deleteNftReward = async (nftId:number, rewardId:number) => {
        const res = await destroy(`nft/${nftId}/${rewardId}`);
        return res.data;
    }
}
export default NFTApi;