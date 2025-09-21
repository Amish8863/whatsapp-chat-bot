const { Client, LocalAuth } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth()
});

client.on('qr', qr => {
    console.log("Scan the QR code below to log in")
    qrcode.generate(qr, { small: true })
});

client.on('message', async () => {
    console.log("client is ready")

    const chats = await client.getChats();
    // console.log("Chats: ", chats.filter(item => item.isGroup).sort((a, b) => b.name.localeCompare(a.name)))

    // const contact = await message.getContact();
    // const lastChatId = contact.id._serialized;

    const groupName = 'Evening Badminton '
    const group = chats.find(chat => chat.isGroup && chat.name === groupName)
    const lastChat = chats.find(chat => chat.lastMessage)

    console.log("group?.lastMessage: ", group.lastMessage)

    if (group) {

        if (group?.lastMessage?.author !== '919405445945@c.us') {
            client.sendMessage(group.id._serialized, 'Namaskaar!, Aapka din mangalmay ho')
                .then(() => {
                    console.log(`Message is sent to the ${groupName}`)
                }).catch((err) => {
                    console.error("Error while sending meesage to groupt: ", err)
                })
        } else {
            client.sendMessage(group.id._serialized, 'Namaskar!, Aap Bhosdiwaale')
                .then(() => {
                    console.log(`Message is sent to the ${groupName}`)
                }).catch((err) => {
                    console.error("Error while sending meesage to groupt: ", err)
                })
            console.log("lastMessage.from is not matched!!")
        }
    } else {
        console.log("Group name is not found")
    }

    // const number = '919457029208'
    // const chatId = number + '@c.us';

    // client.sendMessage(chatId, "hello via whatsapp web automation").then(() => console.log('message sent')).catch((err) => console.log('Error while sending the message: ', err))

})

client.initialize();