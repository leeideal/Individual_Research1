import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import fenceImg3 from "../img/fence.png"
import fenceImg1 from "../img/rfence.png"
import fenceImg2 from "../img/yfence.png"
import fenceImg4 from "../img/bfence.png"
import fenceImg5 from "../img/pfence.png"
import { LogAPI } from "../../axios";
import { useRecoilValue } from 'recoil';
import { isColor } from "../../atoms";


const Container = styled.section`
    width: 100%;
    margin-top: 30px;
    font-family: 'Nanum Myeongjo', serif;
`

// 울타리 부분
const Fence = styled.section`
    
`

const Img = styled.img`
    width: 100%;
`

const EmotionBox = styled.div`
    margin-top: -4px;
    width: 100%;
    height: 600px;
    border: 5px solid ${props=>props.theme.emotionBoxBorderColor};
    border-radius: 5px;
    background-color: ${props => props.theme.emotionBoxBackColor};
    padding-top: 2%;
    padding-left: 3%;
    padding-right: 3%;
    padding-bottom: 1%;
`
const InnerBox = styled(motion.div)`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
`
const InnerBox2 = styled(motion.div)`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Item2 = styled(motion.div)`
    cursor: pointer;
    background-color: white;
    padding: 8%;
    height: 90%;
    width: 90%;
    border-radius: 10px;
    line-height: 1.8;
    overflow-y: scroll;
    margin-bottom: 30px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    &:active{
        z-index: 100;
    }
`


const Item = styled(motion.div)`
    cursor: pointer;
    background-color: white;
    padding: 6%;
    margin-top: 15px;
    margin-left: 4%;
    margin-right: 4%;
    border-radius: 10px;
    height: fit-content;
    margin-bottom: 30px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
    &:active{
        z-index: 100;
    }
`

const ItemDate = styled.div`
    color : ${props => props.theme.emotionItemColor};
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 10px;
`

const ItemBody = styled.p`
    line-height: 1.5;
    font-weight: 500;
    font-size: 15px;
`

const boxVariants = {
    start: {
      opactiy: 0,
      scale: 0.5
    },
    end : {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        duration: 0.3,
        bounce: 0.3,
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    }
}
const innerVariants = {
    start : {
      opacity: 0,
      y : 10
    },
    end : {
      opacity: 1,
      y : 0
    },
    leaving : {
        opacity: 0,
        y : 100
    }
}

  

// 입력input 부분
const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 4%;
    margin-bottom: 15%;
`

const Toggle = styled(motion.div)`
    cursor: pointer;
    background-color: ${(props) => props.isActive ? props.theme.toggleBtnBackColor : "#DADADA"};
    border: 2px solid ${(props) => props.isActive ? props.theme.toggleBtnBorderColor : "#D0D0D0"};
    height: 40px;
    width: 80px;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color : white;
    font-size: 12px;
    font-weight: 500;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`

const TrueToggle = styled.div`
    
`

const FalseToggle = styled.div`
    
`

const Input = styled.input`
    height: 40px;
    width: 70%;
    border: 1px solid #A2A2A6;
    border-radius: 3px;
    padding: 0 10px;
    ::placeholder {
        color: #A2A2A6;
    }
    :focus {
        outline-color: ${props=>props.theme.SubmitBtnBackColor};
    }
`
const Btn = styled.button`
    height: 40px;
    color:white;
    width: 200px;
    border: none;
    border-radius: 3px;
    background-color: ${props=>props.theme.SubmitBtnBackColor};
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    cursor: pointer;
`

const ToggleCircle = styled(motion.div)`
    width: 32px;
    height: 32px;
    border-radius: 50%;
`

const FirstLine = styled(motion.div)`

`

const SecondLine = styled(motion.div)`
    
`

const ThirdLine = styled(motion.div)`
    
`

const Choose = styled.div`
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: center;
    button{
        width: 150px;
        height: 40px;
        margin-right: 20px;
        border: 3px solid ${props=>props.theme.emotionBoxBorderColor};
        border-radius: 10px;
        background-color: ${props => props.theme.emotionBoxBackColor};
        cursor: pointer;
    }
`

const ChoBtn = styled.div`
    border: 3px solid  ${props => props.theme.emotionBoxBackColor};
        border-radius: 10px;
        background-color: ${props => props.theme.emotionBoxBorderColor};
        display: flex;
        justify-content: center;
        align-items: center;
        width: 150px;
        height: 40px;
        margin-right: 20px;
        color : white;
`

// openai
const { Configuration, OpenAIApi } = require("openai");


function EmptyFence () {
    const [toggle, setToggle] = useState(false);
    const { register, handleSubmit, setValue } = useForm();
    const dragConstraints = useRef(null);
    const fence = useRef();


    // openai관련
    const configuration = new Configuration({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      });
    const openai = new OpenAIApi(configuration);
    const [toAi, setToAi] = useState(""); // 검색어

    // 시인 이름으로 검색한 경우 첫 openai 요청에 대한 값을 받아오는 리스트
    const [api1_Response, setApi1_Response] = useState([]);

    // 어떤 버튼이 눌렸는지
    const [see ,setSee] = useState(false);
    const [content, setContent] = useState(false);


    const onValid = async(data) => {
        let how = ""
        if (toggle){
            how = "PUBLIC"
        }else{
            how = "PRIVATE"
        }
        const result = {
            "content" : data.write,
            "status" : how
        }
        setToAi(data.write);
        try {
            const result = await openai.createCompletion({
              model: "text-davinci-003",
              prompt: `${data.write}의 대표적인 시 3개 알려줘`,
              temperature: 0.5,
              max_tokens: 4000,
            });
            const sentence = result.data.choices[0].text
            const regex = /\d+\.\s(.+)/g;
            const matches = [...sentence.matchAll(regex)];
            const resultList = matches.map(match => match[1]);

            console.log("resultList",resultList);
            setApi1_Response(resultList);
            setSee(i=>!i);

          } catch (e) {
            //console.log(e);
            setApi1_Response(["return값 없음"]);
        }
        setValue("write", "")
    }

    const iscolor = useRecoilValue(isColor)

    return(
        <Container ref={dragConstraints}>
            <Fence>
                <Img ref={fence} src={
                    iscolor === 1 ? fenceImg1 :
                        iscolor === 2 ? fenceImg2 : 
                            iscolor === 3 ? fenceImg3 : 
                                iscolor === 4 ? fenceImg4: fenceImg5
                }></Img>
                <EmotionBox>
                    {
                        content ? <InnerBox2>
                            <Item2>s</Item2>
                        </InnerBox2> : 
                        <InnerBox variants={boxVariants} initial="start" animate="end">
                    {see ?
                    <AnimatePresence>
                        {api1_Response.map((i, prev) =>(
                            <Item
                            key={prev}
                            variants={innerVariants}
                            initial = "start"
                            exit = "leaving"
                            >
                            <ItemDate>{toAi}</ItemDate>
                            <ItemBody>{i}</ItemBody>
                        </Item>
                        ))}
                    </AnimatePresence>
                    
                    :null}
                    
                    </InnerBox>
                    }
                </EmotionBox>
            </Fence>
            <Choose>
                <button>
                    시인검색
                </button>
                <ChoBtn>
                    제목검색
                </ChoBtn>
                <button>
                    오늘의 시 추천
                </button>
            </Choose>
            <Form onSubmit={handleSubmit(onValid)}>
                <Toggle isActive={toggle} onClick={() => setToggle(prev => !prev)}>
                    {toggle ? <><TrueToggle style={{marginRight : "7px"}} >곡 듣기</TrueToggle><ToggleCircle layoutId = "circle" style={{backgroundColor : "white"}}></ToggleCircle></> : 
                    <><ToggleCircle layoutId = "circle" style={{backgroundColor : "#EBEBEB"}}></ToggleCircle><FalseToggle>곡 끄기</FalseToggle></>}
                </Toggle>
                <Input {...register("write", {required : true})} placeholder="오늘 당신의 시는 무엇인가요?" />
                <Btn>작성 완료</Btn>
            </Form>
        </Container>
    )
}
export default EmptyFence;

// 일단 시인 이름 검색 값 받아와서 뿌리는것까지 와뇰