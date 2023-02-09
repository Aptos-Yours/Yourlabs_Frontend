import { get, put } from "./AxiosCreate";

class AdminApi {
    getNftAdminPhotoList = async (nftId:number) => {
        const res = await get(`admin/${nftId}`);
        return res.data;
    }
    
    approveNftAdminPhoto = async (applicationId:number, approve:boolean) => {
        const res = await put(`admin`, {
            tableId: applicationId,
            type: approve
        });
        return res.data;
    }
}
export default AdminApi;