import findValueByKey from "./findValueByKey"

const host = 'https://api.green-api.com'

async function deleleReceipt(receiptId) { fetch(`${host}/waInstance${currentIdInstance}/deleteNotification/${currentApiTokenInstance}/${receiptId}`, { method: "DELETE" }) }

async function getUpdate(currentPhone, currentIdInstance, currentApiTokenInstance, messages, setMessages) {
    try {

        if (currentPhone.length === 0) return
        const update = await fetch(`${host}/waInstance${currentIdInstance}/receiveNotification/${currentApiTokenInstance}`)
        if (update.status !== 200) return
        const result = await update.json()

        if (result == null) return
        const receiptId = result['receiptId']
        console.log(result.body)
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!')
        const text = findValueByKey(result, 'textMessage')
        if (text) {
            setMessages([...messages, { text: text, fromSelf: false }])
        }
        await deleleReceipt(receiptId, currentIdInstance, currentApiTokenInstance, receiptId)

    } catch (error) {
        console.log(error)
    }


}

async function sendingMessage(message, setMessages, currentIdInstance, currentApiTokenInstance, currentPhone, messages) {
    try {
        const response = await fetch(`${host}/waInstance${currentIdInstance}/sendMessage/${currentApiTokenInstance}`, {
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

    } catch (error) {
        console.log(error)
    }
}

export {sendingMessage, deleleReceipt, getUpdate}