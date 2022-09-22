import React, { useState, useCallback } from 'react';
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { Editor, Transforms } from 'slate'
import { FaBold, FaItalic, FaCode, FaUnderline } from "react-icons/fa";
import * as S from './styles.jsx'

export const CustomEditor = {
  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.bold === true,
      universal: true,
    })

    return !!match
  },

  isItalicMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.italic === true,
      universal: true,
    })

    return !!match
  },

  isUnderlineMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.underline === true,
      universal: true,
    })

    return !!match
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'code',
    })
    return !!match
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor)
    Editor.addMark(
      editor,
      'bold',
      !isActive
    )
  },

  toggleItalicMark(editor) {
    const isActive = CustomEditor.isItalicMarkActive(editor)
    Editor.addMark(
      editor,
      'italic',
      !isActive
    )
  },

  toggleUnderlineMark(editor) {
    const isActive = CustomEditor.isUnderlineMarkActive(editor)
    Editor.addMark(
      editor,
      'underline',
      !isActive
    )
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor)

    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: n => Editor.isBlock(editor, n) }
    )
  },
}

export const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'Digite...' }],
  },
];


const App = ({ onChange }) => {
  const [editor] = useState(() => withReact(createEditor()));

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, []);

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])

  return (
    <Slate editor={editor} value={initialValue} >
      <S.Container>
        <S.Title>Crie suas anotações</S.Title>
        <S.Header>
          <S.Button onMouseDown={e => {
            e.preventDefault()
            CustomEditor.toggleBoldMark(editor)
          }}
          >
            <FaBold style={{ color: "#3784db" }} />
          </S.Button>
          <S.Button
            onMouseDown={e => {
              e.preventDefault()
              CustomEditor.toggleItalicMark(editor)
            }}
          >
            <FaItalic style={{ color: "#3784db" }} />
          </S.Button>
          <S.Button
            onMouseDown={e => {
              e.preventDefault()
              CustomEditor.toggleCodeBlock(editor)
            }}
          >
            <FaCode style={{ color: "#3784db" }} />
          </S.Button>
          <S.Button
            onMouseDown={e => {
              e.preventDefault()
              CustomEditor.toggleUnderlineMark(editor)
            }}
          ><FaUnderline style={{ color: "#3784db" }} />
          </S.Button>
        </S.Header>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={e => {
            if (!e.ctrlKey) {
              return
            }
            // eslint-disable-next-line default-case
            switch (e.key) {
              case 'p': {
                e.preventDefault();
                CustomEditor.toggleCodeBlock(editor);
                break
              }
              case 'b': {
                e.preventDefault()
                CustomEditor.toggleBoldMark(editor);
                break
              }
              case 'i': {
                e.preventDefault()
                CustomEditor.toggleItalicMark(editor);
                break
              }
            }
          }
          }
        />
      </S.Container>
    </Slate>
  )
}
const CodeElement = props => {
  return (
    <pre {...props.attributes}>
      <code style={{ background: 'var(--gray)', border: '1px solid #cdcccd' }}>{props.children}</code>
    </pre>
  )
}

const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>
}

const Leaf = props => {
  return (
    <span
      {...props.attributes}
      style={
        {
          fontWeight: props.leaf.bold ? 'bold' : 'normal',
          fontStyle: props.leaf.italic ? 'italic' : 'normal',
          textDecoration: props.leaf.underline ? 'underline' : 'normal'
        }
      }
    >
      {props.children}
    </span>
  )
}

export default App;