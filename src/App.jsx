import { useState, useRef, useEffect } from "react";
import Background from "./components/Background";
import ModalAuth from "./components/ModalAuth";
import ModalMain from "./components/ModalMain";
import { sendingMessage, getUpdate } from "./sub/request";


export default function App() {
    const [showModalAuth          , setShowModalAuth]           = useState(true)
    const [showModalMain          , setShowModalMain]           = useState(false)
    const [currentIdInstance      , setCurrentIdInstance]       = useState('')
    const [currentApiTokenInstance, setCurrentApiTokenInstance] = useState('')
    const [currentPhone           , setCurrentPhone]            = useState('')
    const [messages               , setMessages]                = useState([])

    const textareaMessageElement = useRef(null)

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (currentPhone.length !== 0)
                getUpdate(currentPhone, currentIdInstance, currentApiTokenInstance, messages, setMessages)

        }, 2000)

        return () => {
            clearInterval(intervalId);
        };
    }, [currentPhone.length, getUpdate, Date.now()])

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

    function pushPhone(e) {
        const phone = e.target.value
        setCurrentPhone(phone)
    }

    function handleBlurPhone(e) { pushPhone(e) }

    function handleKeyDownPhone(e) { if (e.key === "Enter") pushPhone(e) }

    async function handleSendMessage(e) {
        const message = e.target.value.trim()
        if (e.key !== "Enter") return
        if (message.length === 0) return
        await sendingMessage(message, setMessages, currentIdInstance, currentApiTokenInstance, currentPhone, messages)
        e.target.value = ''
    }

    async function handleClickIcon() {
        const message = textareaMessageElement.current.value.trim()
        if (message.length === 0) return
        await sendingMessage(message, setMessages, currentIdInstance, currentApiTokenInstance, currentPhone, messages)
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