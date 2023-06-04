import styled from "styled-components";
import PageHeader from "../components/PageHeader";
import EmptyFence from '../components/emptyemotion/EmptyFence';

const Container = styled.body`
    width: 100vw;
    display: flex;
    justify-content: center;
    margin-top: ${props => props.theme.navmarginTop};
`

const Wrapper = styled.section`
    width : ${props => props.theme.width};
    max-width: ${props => props.theme.maxWidth};
    min-height: ${props => props.theme.minHeight};
`

const pageheader = {
    title : "한울 듣기",
    body1: "오늘의 감정은 어떤가요? 기쁜 일이 있었나요? 아니면 속상했던 일이나 말하기 힘든 일?",
    body2 : "당신을 위로해주고 격려해줄 시와 음악을 통해서 오늘 하루를 마무리해봐요!",
    width : "128px"
}


function EmptyEmotion() {
    return (
        <Container>
            <Wrapper>
                <PageHeader props={pageheader} />
                <EmptyFence />
            </Wrapper>
        </Container>
    );
}

export default EmptyEmotion;