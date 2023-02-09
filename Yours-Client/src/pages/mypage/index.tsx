import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useMypageMenu from "./useMypageMenu";
import NftElem from "../../components/nft/NftElem";
import RewardElem from "../../components/reward";
import { ReactComponent as SearchIcon } from "../../asset/svg/search.svg";
import './index.scss';

function Mypage() {
    const navigation = useNavigate();
    const name = useSelector((state: any) => state.userData.name);
    const { menuDataList, currMenu, setCurrMenu, searchWord, setSearchWord, searchData } = useMypageMenu();

    useEffect(()=>{
        const selectedMenuX = document.getElementById('selected-menu')?.getBoundingClientRect().x;
        const menuShowBar = document.getElementById('show-selected-menu');
        const initialX = document?.getElementsByClassName('mypage-menu')[0]?.getBoundingClientRect().x;
        if (menuShowBar && selectedMenuX && initialX) 
            menuShowBar.style.left = `${selectedMenuX - initialX}px`;
        
    }, [currMenu])

    return (
        <div className="mypage">
            <div className="my-profile-wrapper">
                <span className="my-profile-yours">Sincerely Yours</span>
                <div className="my-profile-name">{ name }</div>
                <button 
                    className="my-profile-edit"
                    onClick={()=>{navigation('/profile/edit')}}
                >
                    edit
                </button>
            </div>

            <div className="mypage-menu-wrapper">
                <div className="mypage-menu-header">
                {
                    menuDataList?.map((menuData, idx) => (
                        <div 
                            className="mypage-menu" 
                            key={idx}
                            id={currMenu === menuData.type ? 'selected-menu' : ''}
                            onClick={()=>setCurrMenu(menuData.type)}
                        >
                            { menuData.title }
                            <span className="mypage-menu-content-length">{ menuData.contentLength }</span>
                        </div>
                    ))
                }
                <div className="show-selected-menu" id="show-selected-menu"/>
                </div>

                <div className="mypage-menu-content-searchbar">
                    <SearchIcon />
                    <input
                        type="text"
                        value={searchWord}
                        placeholder="Search by name"
                        onChange={(e)=>{setSearchWord(e.target.value)}}
                    />
                </div>

                <div className="mypage-menu-nft-container">
                {
                    (searchWord.length ? searchData : menuDataList?.find((menuData:any)=>menuData.type === currMenu)?.data)?.map((content, idx) => (
                        currMenu !== 'reward'
                        ? <NftElem 
                            nftInfo={content}
                        />
                        : content.rewards.map((reward:any, idx:number) => (
                            <RewardElem
                                nftId={content.id} 
                                nftName={content.nftName}
                                reward={reward}
                            />
                        ))
                    ))
                }
                </div>
            </div>
        </div>
    )
}
export default Mypage;