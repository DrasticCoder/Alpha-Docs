import React,{useCallback,useEffect,useState,useRef} from 'react';
import {io } from 'socket.io-client';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export default function TextEditor() {

  const [socket, setSocket] = useState();
  const [quill, setQuill] = useState();

  
  useEffect(() => {
    const s = io('http://localhost:3000');
    setSocket(s);
  
    return () => {
      s.disconnect()
    }
  }, [])

  useEffect(() => {
    if(socket == null || quill == null) return
    const handler = (delta, oldDelta, source) => {
      if (source !== 'user') return;
      socket.emit('send-changes', delta)
    }

    quill.on('text-change', handler)

    return () => {
      quill.off('text-change', handler)
    } 
  }, [quill, socket])

  useEffect(() => {
    if(socket == null || quill == null) return
    const handler = delta => {
      quill.updateContents(delta)
    }

    socket.on('receive-changes', handler)

    return () => {
      socket.off('receive-changes', handler)
    } 
  }, [quill, socket])
  
  const TOOLBAR_OPTIONS = [
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean']
  ];
  
  const wrapperRef = useCallback(wrapper => {
    if (wrapper == null) return;
    wrapper.innerHTML = '';
    const editor = document.createElement('div');
    wrapper.append(editor);
    const  q =  new Quill(editor, {theme: 'snow',modules:{toolbar:TOOLBAR_OPTIONS}});
    setQuill(q);
  }, []);

  return (
    <div className="container" ref={wrapperRef}>
    </div>
  )
}
