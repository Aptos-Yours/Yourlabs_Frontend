import { useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/footer';
import Navbar from './components/navbar';
import Oauth from './pages/oauth/Oauth';
import Landing from './pages/landing';
import Signup from './pages/signup';
import Mypage from './pages/mypage';
import { checkAuth } from './utils/function/checkAuth';
import NftDetail from './pages/nftDetail';
import PrivateOutlet from './router/PrivateOutlet';
import CreateNft from './pages/nftCreate';
import ScrollToTop from './utils/ScrollToTop';
import { useSelector } from 'react-redux';
import NotFound from './pages/error/NotFound';
import GetNft from './pages/getNft';
import GetNftSuccess from './pages/getNftSuccess';
import NftEmailVerify from './pages/nftEmailVerify';
import NftAdmin from './pages/nftAdmin';
import NftTransfer from './pages/nftTransfer';
import Alert from './components/alert/Alert';
import NftSetting from './pages/nftSetting';
import NftRewardSetting from './pages/nftSetting/reward';
import AddReward from './pages/nftSetting/reward/AddReward';
import RewardDetail from './pages/nftSetting/reward/RewardDetail';
import RewardEdit from './pages/nftSetting/reward/RewardEdit';
import NftOwnerOutlet from './router/NftOwnerOutlet';
import EditProfile from './pages/editProfile';

function App() {
  const auth = useSelector((state:any)=>state.userData.auth);

  useLayoutEffect(()=>{
    checkAuth();
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Alert />
        <ScrollToTop />
        <div className="app-content" id="app-content">
        <Routes>
            <Route path="/landing" element={<Landing />}/>
            <Route path="/oauth" element={<Oauth />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/nft/:nftId/detail" element={<NftDetail />}/>
            <Route path="/nft/email" element={<NftEmailVerify />}/>
            
            {/* Private Outlet */}
            <Route element={<PrivateOutlet />}>
              <Route path="/mypage" element={<Mypage />}/>
              <Route path="/profile/edit" element={<EditProfile />}/>

              {/* nft ?????? */}
              <Route path="/nft">
                <Route path="create" element={<CreateNft />}/>
                <Route path=":nftId">
                  <Route path="get" element={<GetNft />}/>
                  <Route path="get/success" element={<GetNftSuccess />}/>
                  <Route path="transfer" element={<NftTransfer />}/>
                </Route>
              </Route>
            </Route>

            {/* Nft Owner??? ????????? ??? ?????? ????????? */}
            <Route path="/nft/:nftId/setting" element={<NftOwnerOutlet />}>
              <Route index element={<NftSetting />}/>
              <Route path="admin" element={<NftAdmin />}/>
              <Route path="reward">
                <Route index element={<NftRewardSetting />}/>
                <Route path="add" element={<AddReward />} />
                <Route path=":rewardId" element={<RewardDetail />}/>
                <Route path=":rewardId/edit" element={<RewardEdit />} />
              </Route>
            </Route>

            {/* ?????? ????????? */}
            <Route path="/" element={auth ? <Navigate to="/mypage"/> : <Navigate to="/landing"/>}/>

            {/* 404 ????????? ?????? */}
            <Route path="/error" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/error"/>} />
        </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
