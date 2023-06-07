import { useState, useRef, useEffect } from "react";
import Background from "./components/Background";
import ModalAuth from "./components/ModalAuth";
import ModalMain from "./components/ModalMain";

function findValueByKey(node, key) {
    if (typeof node !== 'object') return null;
    
    if (node.hasOwnProperty(key)) {
      return node[key];
    }
  
    for (const prop in node) {
      const result = findValueByKey(node[prop], key);
      if (result !== null) return result;
    }
    return null;
  }
  

export default function App() {
    const [showModalAuth, setShowModalAuth] = useState(true)
    const [showModalMain, setShowModalMain] = useState(false)
    const [currentIdInstance, setCurrentIdInstance] = useState('')
    const [currentApiTokenInstance, setCurrentApiTokenInstance] = useState('')
    const [currentPhone, setCurrentPhone] = useState('')
    const [messages, setMessages] = useState([])

    const textareaMessageElement = useRef(null)
    const host = 'https://api.green-api.com'

    // useEffect(()=>{
    //     const intervalId = setInterval(()=>{
    //         if (currentPhone.length !== 0) getUpdate()
    //     }, 2000)



    //     return () => {
    //         clearInterval(intervalId);
    //       };
    // },[currentPhone.length, getUpdate, Date.now()])

    

    function handleSubmitIsAuthorised(e) {
        e.preventDefault()
        const form = new FormData(e.target)
        const idInstance = form.get('idInstance')
        const apiTokenInstance = form.get('apiTokenInstance')
        setCurrentIdInstance(idInstance)
        setCurrentApiTokenInstance(apiTokenInstance)
        setShowModalAuth(!showModalAuth)
        setShowModalMain(!showModalMain)
        e.target.reset()
    }
    function handleSignOut() {
        setShowModalAuth(!showModalAuth)
        setShowModalMain(!showModalMain)
    }


    async function deleleReceipt(receiptId) { fetch(`${host}/waInstance${currentIdInstance}/deleteNotification/${currentApiTokenInstance}/${receiptId}`, { method: "DELETE" }) }

    async function getUpdate() {
        if (currentPhone.length === 0) return
        const update = await fetch(`${host}/waInstance${currentIdInstance}/receiveNotification/${currentApiTokenInstance}`)
        const result = await update.json()

        if (result == null) return
        const receiptId = result['receiptId']
        // const sendByApi = result.body['sendByApi']

        setTimeout(()=>{},500)
        console.log(result.body)
        // console.log(sendByApi === undefined)
        // console.log((result.body['messageData']))
        // console.log((result.body['messageData']['textMessageData']))

        const text = findValueByKey(result, 'textMessage')
        console.log(text)

        // if ((sendByApi === undefined) && (result.body['messageData']) && (result.body['messageData']['textMessageData'])) {
        if (text) {
console.log('here')
            // const text = result.body['messageData']['textMessageData']['textMessage']
            console.log(text)
            setMessages([...messages, { text: text, fromSelf: false }])
        }
        await deleleReceipt(receiptId)
        console.log(`deleted  ${receiptId}`)
    }

    function pushPhone(e) {
        const phone = e.target.value
        setCurrentPhone(phone)
    }

    function handleBlurPhone(e) { pushPhone(e) }
    function handleKeyDownPhone(e) { if (e.key === "Enter") pushPhone(e) }


    async function sendingMessage(message) {
        const response = await fetch(`https://api.green-api.com/waInstance${currentIdInstance}/sendMessage/${currentApiTokenInstance}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "chatId": `${currentPhone}@c.us`,
                "message": message
            })
        })
        if (response.status !== 200) {
            alert('Неверные данные запроса')
            return
        }
        setMessages([...messages, { text: message, fromSelf: true }])
    }

    async function handleSendMessage(e) {
        const message = e.target.value.trim()
        if (e.key !== "Enter") return
        if (message.length === 0) return
        await sendingMessage(message)
        e.target.value = ''
    }




    async function handleClickIcon() {
        const message = textareaMessageElement.current.value.trim()
        if (message.length === 0) return
        await sendingMessage(message)
        textareaMessageElement.current.value = ''
    }

    return (
        <>
            <Background />

            <ModalAuth
                show={showModalAuth}
                onSubmitIsAuthorised={handleSubmitIsAuthorised}
            />

            <ModalMain
                show={showModalMain}
                currentIdInstance={currentIdInstance}
                currentApiTokenInstance={currentApiTokenInstance}
                onSignOut={handleSignOut}
                currentPhone={currentPhone}
                onBlurPhone={handleBlurPhone}
                onKeyDownPhone={handleKeyDownPhone}
                onSendMessage={handleSendMessage}
                onClickIcon={handleClickIcon}
                refEl={textareaMessageElement}
                messages={messages}
            />
        </>
    )
}