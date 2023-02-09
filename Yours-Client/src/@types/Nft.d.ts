declare module "NftType" {
    export interface NftInfo {
        id: number;
        nftName: string;
        image: string;
        numberOfOwners: number;
        description: string;
        numberOfRewards: number;
        rewards: rewardType[];
        authType?: 1|2;
        options?: string;
    }
    export interface NftReward {
        id: number;
        rewardName: string;
    }
}