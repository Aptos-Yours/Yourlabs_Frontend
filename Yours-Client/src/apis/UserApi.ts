import { get, patch, post } from './AxiosCreate';
import store from '../redux/store';
import { setAuth, setEmail, setId, setName, setPhoneNumber, setProfileImage } from '../redux/userData/userDataAction';

type userType = {
    id:number,
    snsId?:string,
    name:string,
    image:string,
    email:string,
    phoneNumber:string,
    social?:string,
}

class UserApi {
    loginHandler = async (kakaoToken:string) => {
        const userInfo = await this.checkKakaoUser(kakaoToken);
        if (!userInfo.signUp) {
            window.location.href=`/signup?kakao=${kakaoToken}`;
        } else {
            this.setToken(userInfo.accessToken, userInfo.refreshToken);
            this.getUserInfo();
            window.location.href=`/mypage`;
        }
    }

    getToken = async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        const res = await get('/auth/token', {
            headers: {
                refreshToken: refreshToken
            }
        });
        localStorage.setItem('accessToken', res.data.data.accessToken);
    }

    getSetUserInfo = async () => {
        const res = await this.getUserInfo();
        this.setUserInfo(res.data);
    }

    getUserInfo = async () => {
        const res = await get('/user/profile');
        return res.data;
    }

    setToken = (accessToken:string, refreshToken:string) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
    }

    setUserInfo = (user:userType) => {
        store.dispatch(setName(user.name));
        store.dispatch(setProfileImage(user.image));
        store.dispatch(setId(user.id));
        store.dispatch(setEmail(user.email));
        store.dispatch(setPhoneNumber(user.phoneNumber));
        store.dispatch(setAuth(true));
    }

    signup = async (newUserData:object) => {
        const res = await post('auth/signup', newUserData);
        this.setToken(res.data.accessToken, res.data.refreshToken);
        await this.getSetUserInfo();
        return res.data;
    }

    checkKakaoUser = async (kakaoToken:string) => {
        const res = await post(`auth/kakao`, {
            token: kakaoToken
        });
        return res.data.data;
    }
    
    sendPhoneVerificationNumber = async (phoneNumber:string) => {
        const res = await post(`sms/send`, {
            phoneNumber: phoneNumber
        });
        return res.data;
    }

    sendEmailVerificationNumber = async (email:string) => {
        const res = await post(`user/email/send`, {
            email: email
        });
        return res.data;
    }

    checkVerificationNumber = async (authText:string, authCode:string) => {
        const res = await post(`auth/verification`, {
            authText: authText,
            authCode: authCode
        });
        return !!(res.data.data);
    }

    editUserName = async (name:string) => {
        const res = await patch(`user/profile/nickname`, {
            nickname: name
        });
        store.dispatch(setName(name));
        return res.data.data;
    }

    editUserPhoneNumber = async (phoneNumber:string) => {
        const res = await patch(`user/profile/phone`, {
            phoneNumber: phoneNumber
        });
        store.dispatch(setPhoneNumber(phoneNumber));
        return res.data.data;
    }

    editUserEmail = async (email:string) => {
        const res = await patch(`user/profile/email`, {
            email: email
        });
        store.dispatch(setEmail(email));
        return res.data.data;
    }

    editUserProfileImage = async (profileImgFormdata:any) => {
        const res = await patch(`user/profile/photo`, profileImgFormdata);
        store.dispatch(setProfileImage(res.data.data.profileImage));
        return res.data.data;
    }
}
export default UserApi;