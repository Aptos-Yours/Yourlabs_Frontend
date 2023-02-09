import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { timeToString } from "../../utils/function/time";
import UserApi from "../../apis/UserApi";
import { ReactComponent as CheckIcon } from '../../asset/svg/check-circle.svg';
import { ReactComponent as ArrowLeft } from '../../asset/svg/arrow-left.svg';
import { ReactComponent as ArrowRight } from '../../asset/svg/arrow-right.svg';
import usePhoneAuthentication from "../../hook/usePhoneAuthentication";
import './index.scss';

function Signup() {
    const userApi = new UserApi();
    const navigation = useNavigate();
    const { phoneNumber, getPhoneNumber, sendVerificationNumber, isVerificationNumberSent, checkVerifyNumber, authentic, validationTime } = usePhoneAuthentication();
    const [nickname, setNickname] = useState('');
    const [agreeToTermList, setAgreeToTermList] = useState<String[]>([]);
    const [snsId, setSnsId] = useState<string>();
    const [profileImage, setProfileImage] = useState();
    const [email, setEmail] = useState();
    const [userVerifyNumber, setUserVerifyNumber] = useState('');

    const termsOfUseList = [
        { id: 'AGE', required: true, text: '만 14세 이상입니다 (필수)', link: null },
        { id: 'SERVICE', required: true, text: '서비스 이용약관 동의(필수)', link: 'https://www.notion.so/propwave/Yours-14cdd37b08e6496184d0d463f1af6746' },
        { id: 'PRIVACY', required: true, text: '개인정보 수집 및 이용에 동의합니다 (필수)', link: 'https://propwave.notion.site/Yours-a10e4ec9568c4e19b178306158370623' },
        { id: 'MARKETING', required: false, text: '마케팅 정보 수신에 동의합니다 (선택)', link: 'https://propwave.notion.site/Yours-a10e4ec9568c4e19b178306158370623' },
    ]

    const agreeToTermHandler = (e: any, termId: String) => {
        if (e.target.checked) {
            setAgreeToTermList([...agreeToTermList, termId]);
        } else {
            setAgreeToTermList(agreeToTermList.filter((term) => term !== termId));
        }
    }

    const agreeToTermAllHandler = () => {
        if (agreeToTermList.length === termsOfUseList.length) {
            setAgreeToTermList([]);
        } else {
            setAgreeToTermList(termsOfUseList.map((term) => term.id));
        }
    }

    const checkFormValidation = ():boolean => {
        for (let term of termsOfUseList) {
            if (term.required) {
                if (!agreeToTermList.includes(term.id)) {
                    return false;
                }
            }
        }
        return !!(nickname && authentic);
    }

    const signup = async () => {
        const newUserData = {
            snsId: snsId,
            nickname: nickname,
            profileImage: profileImage,
            email: email,
            phone: phoneNumber.split('-').join(''),
            social: 'KAKAO',
            isMarketing: agreeToTermList.includes('MARKETING')
        }

        const res = await userApi.signup(newUserData);
        // 회원가입 성공 후 마이페이지로 이동
        navigation('/mypage');
    }

    useEffect(()=>{
        const getKakaoInfo = async () => {
            // kakao sns id, profile image, email 받아오기
            const kakaoToken = new URLSearchParams(window.location.search).get('kakao');
            try {
                const kakaoInfo = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
                    headers: {
                      Authorization: `Bearer ${kakaoToken}`
                    }
                })
                setSnsId(kakaoInfo.data.id.toString());
                setProfileImage(kakaoInfo.data.properties.profile_image);
                setEmail(kakaoInfo.data.kakao_account.email);
            } catch(err) {
                // kakao token이 잘못되었을 시 landing 페이지로 가도록 -> 유효한 카카오 로그인을 통해서만 회원가입 가능하도록
                console.log(err);
                navigation('/landing');
            }
        }
        getKakaoInfo();
    }, [window.location.search])

    const preventToClose = (e:any) => {
        e.preventDefault();
        e.returnValue = '';
    }

    useEffect(()=>{
        window.addEventListener('beforeunload', preventToClose);
        return () => window.removeEventListener('beforeunload', preventToClose);
    }, [])

    return (
        <div className="signup">
            <div className="signup-header">
                <ArrowLeft 
                    className="go-back"
                    onClick={()=>navigation('/landing')}
                />
                <h3>회원가입</h3>
            </div>
            <div className="signup-input-wrapper">
                <div className="input-box">
                    <label className="input-label">닉네임</label>
                    <input
                        className="input-text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                    />
                </div>
                <div className="input-box">
                    <label className="input-label">휴대폰 번호</label>
                    <div className="input-description">
                        국제 번호 사용 시 <a href='http://pf.kakao.com/_xgxkExbxj'>Yours 카카오톡 채널</a>로 별도 문의 바랍니다.
                    </div>
                    <div className="input-phone-number-wrapper">
                        <input
                            className="input-text"
                            onInput={(e)=>getPhoneNumber(e.target as HTMLInputElement)}
                            maxLength={13}
                        />
                        {
                            !isVerificationNumberSent
                            ? <button 
                                className="button" 
                                id="purple"
                                disabled={phoneNumber.length!==13}
                                onClick={()=>{sendVerificationNumber()}}
                            >
                                인증번호 요청
                            </button>
                            : <button
                                className="button" 
                                id="black"
                                onClick={()=>{sendVerificationNumber()}}
                            >
                                인증번호 재요청
                                {
                                    !authentic && 
                                    <div>{ timeToString(validationTime) }</div>
                                }
                            </button>
                        }


                    </div>
                    {
                        isVerificationNumberSent && 
                        <div className="phone-verfication-wrapper">
                            <input
                                type="number"
                                placeholder="인증 번호를 입력해주세요"
                                onChange={(e)=>{setUserVerifyNumber(e.target.value); checkVerifyNumber(e.target.value)}}
                            />
                            {
                                !!(userVerifyNumber.length) && 
                                (
                                    authentic
                                    ? <span className="verify-status" id="success">인증 완료</span>
                                    : <span className="verify-status"  id="fail">인증번호 불일치</span>
                                )
                            }
                        </div>
                    }
                </div>
                <div className="input-box">
                    <label className="input-label">이용 약관 동의</label>
                    <div className="term-of-use-wrapper">
                        <div 
                            className="term-of-use" 
                            id="select-all"
                            onClick={()=>agreeToTermAllHandler()}
                        >
                            <CheckIcon 
                                className="check-icon"
                                id={agreeToTermList.length === termsOfUseList.length ? 'checked' : ''}
                            />
                            전체 동의하기
                        </div>
                        {
                            termsOfUseList.map((term, idx)=>(
                                <>
                                <input
                                    type="checkbox"
                                    id={"term-of-use-" + term.id}
                                    checked={agreeToTermList.includes(term.id)}
                                    onChange={(e)=>agreeToTermHandler(e, term.id)}
                                />
                                <label 
                                    className="term-of-use" 
                                    key={idx}
                                    htmlFor={"term-of-use-" + term.id}
                                >
                                    <CheckIcon 
                                        className="check-icon"
                                    />
                                    <span className="term-of-use-text">{ term.text }</span>
                                    { 
                                        term.link 
                                        && 
                                        <a href={term.link} target="_blank">                                        
                                            <ArrowRight className="term-of-use-link"/> 
                                        </a>

                                    }
                                </label>
                                </>
                            ))
                        }
                    </div>

                </div>

                <button
                    type="submit"
                    className="button signup-input-submit-button"
                    id="purple"
                    onClick={()=>{signup()}}
                    disabled={!checkFormValidation()}
                >
                    시작하기
                </button>
            </div>
        </div>
    )
}
export default Signup;