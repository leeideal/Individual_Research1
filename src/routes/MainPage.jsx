import styled from "styled-components";
import gfenceSmall from "../components/img/fenceSmall/gfenceSmall.png";
import bfenceSmall from "../components/img/fenceSmall/bfenceSmall.png";
import pfenceSmall from "../components/img/fenceSmall/pfenceSmall.png";
import rfenceSmall from "../components/img/fenceSmall/rfenceSmall.png";
import yfenceSmall from "../components/img/fenceSmall/yfenceSmall.png";
import glogo from "../components/img/logo/glogo.png";
import blogo from "../components/img/logo/blogo.png";
import plogo from "../components/img/logo/plogo.png";
import rlogo from "../components/img/logo/rlogo.png";
import ylogo from "../components/img/logo/ylogo.png";
import bdesktop from "../components/img/desktop/bdesktop.png";
import pdesktop from "../components/img/desktop/pdesktop.png";
import rdesktop from "../components/img/desktop/rdesktop.png";
import ydesktop from "../components/img/desktop/ydesktop.png";
import { useRecoilValue } from 'recoil';
import { isColor } from "../atoms";
import { useNavigate } from "react-router-dom";
import dImg from"../components/img//Group 207.png"


const Container = styled.body`
    width: 100vw;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-top: ${props => props.theme.navmarginTop};
    font-family: 'Nanum Myeongjo', serif;
`

const Wrapper = styled.section`
    width : ${props => props.theme.width};
    max-width: ${props => props.theme.maxWidth};
    min-height: ${props => props.theme.minHeight};
    margin: auto;
`

const BothSideSection = styled(Wrapper)`
    display: flex;
    
`
const SectionLeft = styled.div`
    width: 50%;
    /* margin-top: ${props => props.marginTop}; */
`
const SectionRight = styled.div`
    width: 50%;
    /* margin-top: ${props => props.marginTop}; */
`

const LogoDiv = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
`
const Logoimg = styled.img`
    width: 70px;
    height: 70px;
`
const LogoTitle = styled.h3`
    font-family: 'Nanum Myeongjo', serif;
    font-size: 70px;
    margin-left: 10px;
    font-weight: 600;
`
const SubTitle = styled.h3`
    width: 100%;
    font-size: 25px;
    font-weight: 600;
    margin-top: 20px;
`
const Btn = styled.button`
    width: 32%;
    height: 40px;
    margin-top: 40px;
    border: none;
    background-color: ${props=>props.theme.SubmitBtnBackColor};
    color: white;
    border-radius: 5px;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`
const Img = styled.img`
    width: 100%;
    margin-top: 50px;
`


function MainPage () {
    const iscolor = useRecoilValue(isColor);
    const navigate = useNavigate()

    console.log(localStorage.getItem("token") || sessionStorage.getItem("token") != null)
    return(
    // <Img src={
    //     iscolor === 1 ? gservice :
    //             iscolor === 2 ? gservice : 
    //                 iscolor === 3 ? gservice : 
    //                     iscolor === 4 ? gservice : gservice 
    // }/>)
        <Container>
            {/* main */}
            <BothSideSection color={true}>
                <SectionLeft style={{marginTop: '20%'}}>
                    <LogoDiv>
                        <Logoimg src={
                            iscolor === 1 ? rlogo :
                                iscolor === 2 ? ylogo : 
                                    iscolor === 3 ? glogo : 
                                        iscolor === 4 ? blogo: plogo
                        } ></Logoimg>
                        <LogoTitle>한울</LogoTitle>
                    </LogoDiv>
                    <SubTitle>당신의 시를 위한 노래추천 서비스</SubTitle>
                    <Btn onClick={()=> localStorage.getItem("token") || sessionStorage.getItem("token") != null ? navigate("/poem") : navigate("/login")}>서비스 시작하기</Btn>
                    <Img src={
                    iscolor === 1 ? rfenceSmall :
                        iscolor === 2 ? yfenceSmall : 
                            iscolor === 3 ? gfenceSmall : 
                                iscolor === 4 ? bfenceSmall: pfenceSmall
                    }></Img>
                </SectionLeft>
                <SectionRight style={{marginTop: '2%'}}>
                    <Img src={
                        iscolor === 1 ? rdesktop :
                            iscolor === 2 ? ydesktop : 
                                iscolor === 3 ? dImg : 
                                    iscolor === 4 ? bdesktop: pdesktop
                    }></Img>
                </SectionRight>
            </BothSideSection>
        </Container>
    )
}
export default MainPage;