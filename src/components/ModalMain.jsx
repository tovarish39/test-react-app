export default function ModalMain({
    show,
    currentIdInstance,
    currentApiTokenInstance,
    onSignOut,
    currentPhone,
    onBlurPhone,
    onKeyDownPhone,
    onSendMessage,
    onClickIcon,
    refEl,
    messages
}) {
    const isNone = (show) ? '' : 'none'
    return (
        <>
            <div className={`Modal ModalMain ${isNone}`}>
                <div className="d-flex h-100">

                    <div id="leftSide">
                        <input onBlur={onBlurPhone} onKeyDown={onKeyDownPhone} className="form-control mb-4" placeholder="Введите номер..." />
                        <div id="chatBar" className="h-10 rounded p-3">
                            {(currentPhone.length !== 0) &&
                                <div> Введён номер <b> {currentPhone}</b></div>
                            }
                        </div>
                    </div>


                    <div id="rightSide" className="d-flex flex-column">


                        <div id="rightSideHead" className=" d-flex justify-content-between align-items-center">
                            <div className="ml-2vw">currentIdInstance =&gt; <b>{' '}{currentIdInstance}</b></div>
                            <div>currentApiTokenInstance =&gt;<b>{' '}{currentApiTokenInstance}</b></div>
                            <div id="singOut" className="pointer ml-auto" onClick={onSignOut}>Выйти</div>
                        </div>
                        <div id="rightSideMain" className="d-flex flex-column justify-content-end h-100 p-2">
                            {messages.map((message, index) => {
                                return (
                                    <div key={index} className={`message ${(message.fromSelf) ? 'right' : 'left'}-message p-2 rounded`}>
                                        {message.text}
                                    </div>
                                )
                            })}

                            <div className="d-flex align-items-end mt-4">
                                <textarea ref={refEl} onKeyDown={onSendMessage} className="form-control mh-auto ml-2vw" rows="3" style={{ resize: 'none' }}></textarea>
                                <svg onClick={onClickIcon} className="opacity-06 m-3 pointer" viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24" ><path fill="currentColor" d="M1.101,21.757L23.8,12.028L1.101,2.3l0.011,7.912l13.623,1.816L1.112,13.845 L1.101,21.757z"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}