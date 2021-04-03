import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import marked from 'marked';
import {updateAction, useSelector, useDispatch} from './store';

function Editor() {
    const dispatch = useDispatch();
    return (
        <>
            <Row>Editor</Row>
            <Row style={{height: '80%'}}><textarea onChange={e => dispatch(updateAction(e.target.value))} id="editor" style={{width: '100%', height: '100%'}}></textarea></Row>
        </>
    );
}

function Marked({text}: {text: string}) {
    const html = marked(text);
    return <div className="Container" dangerouslySetInnerHTML={{__html: html}}></div>;
}

function Preview() {
    const text = useSelector(state => state.data);
    return (
        <>
            <Row>Preview</Row>
            <Row style={{height: '100%'}}><Marked text={text} /></Row>
        </>
    );
}

export default function App() {
    return (
        <Container fluid style={{height: '100%'}}>
            <Row style={{height: '100%'}}>
                <Col style={{height: '100%'}}><Editor /></Col>
                <Col style={{height: '100%'}}><Preview /></Col>
            </Row>
        </Container>
    );
}
