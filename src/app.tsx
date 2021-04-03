import React, {useRef, useEffect} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import marked from 'marked';
import {updateAction, useSelector, useDispatch} from './store';

const rawText = `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;

function Editor() {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateAction(textareaRef.current!.value));
    }, []);

    return (
        <>
            <Row>Editor</Row>
            <Row style={{height: '80%'}}>
                <textarea ref={textareaRef} onChange={e => dispatch(updateAction(e.target.value))} id="editor" style={{width: '100%', height: '100%'}}>
                {rawText}
                </textarea>
            </Row>
        </>
    );
}

function Marked({text}: {text: string}) {
    const html = marked(text);
    return <div id="preview" className="Container" dangerouslySetInnerHTML={{__html: html}}></div>;
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
