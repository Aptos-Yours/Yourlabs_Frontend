type adminDetailProp = {
    detailInfo:any;
    photoDescription:string | undefined;
    approveAction:Function;
    discardAction:Function;
}

function AdminDetail({ detailInfo, photoDescription, approveAction, discardAction }:adminDetailProp) {

    return (
        <div className="nftadmin-detail">
            <div className="user-profile-wrapper">
                <img className="profile-image" src={detailInfo?.profileImage}/>
                <h3>{detailInfo?.name} 님의 요청입니다.</h3>
            </div>
            
            <h3 className="content-subtitle">인증 사진 설명 :</h3>
            <h5 className="nftadmin-description">
                { photoDescription }
            </h5>

            <img 
                className="nftadmin-detail-image"
                src={detailInfo?.image}
            />

            <div className="button-wrapper">
                <button
                    className="button"
                    id="black"
                    onClick={()=>{discardAction(detailInfo.id)}}
                >
                    거절
                </button>
                <button
                    className="button"
                    id="purple"
                    onClick={()=>{approveAction(detailInfo.id)}}
                >
                    승인
                </button>
            </div>
        </div>
    )
}
export default AdminDetail;