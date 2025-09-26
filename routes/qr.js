const { exec } = require("child_process");
const { upload } = require('../utils/mega');
const express = require('express');
let router = express.Router()
const pino = require("pino");
let { toBuffer } = require("qrcode");
const path = require('path');
const fs = require("fs-extra");
const { Boom } = require("@hapi/boom");//
// List of audio URLs
const audioUrls = [
    "https://files.catbox.moe/brusa6.mp4",
      "https://files.catbox.moe/3j1zy4.mp4",
      "https://files.catbox.moe/4g3dwj.mp4",
      "https://files.catbox.moe/su4wyp.mp4",
      "https://files.catbox.moe/8cuz5m.mp4",
      "https://files.catbox.moe/pdjieu.mp4",
      "https://files.catbox.moe/esixn9.mp4",
      "https://files.catbox.moe/dqj2fq.mp4",
      "https://files.catbox.moe/dnyop2.mp4"
];

// Function to get a random audio URL
function getRandomAudioUrl() {
    const randomIndex = Math.floor(Math.random() * audioUrls.length);
    return audioUrls[randomIndex];
};

  const { default: makeWASocket, useMultiFileAuthState, makeCacheableSignalKeyStore, delay, Browsers, DisconnectReason } = require("@whiskeysockets/baileys");

// Store active sessions
const activeSessions = new Map();

// Clean up auth directory on start
if (fs.existsSync('./auth_info_baileys')) {
    fs.emptyDirSync(__dirname + '/auth_info_baileys');
}

router.get('/', async (req, res) => {
    const sessionId = Date.now().toString();
         async function generateQRSession() {
         const { state, saveCreds } = await useMultiFileAuthState(`./auth_info_baileys`);

        try {
            let socket = makeWASocket({
                 auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: "fatal" }).child({ level: "fatal" })),
                },
                printQRInTerminal: false,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                browser: Browsers.macOS("Safari"),
            });

            // Store session reference
            activeSessions.set(sessionId, { socket });

            socket.ev.on('creds.update', saveCreds);

            socket.ev.on("connection.update", async (update) => {
                const { connection, lastDisconnect, qr } = update;

                if (qr && !res.headersSent) {
                    try {
                        const qrBuffer = await toBuffer(qr);
                        const qrBase64 = `data:image/png;base64,${qrBuffer.toString('base64')}`;

                        return res.json({
                            success: true,
                            qr: qrBase64,
                            sessionId: sessionId
                        });
                    } catch (error) {
                        console.error("Error generating QR Code:", error);
                        return res.status(500).json({
                            success: false,
                            error: "Failed to generate QR code"
                        });
                    }
                }

                if (connection === "open") {
                    try {
                        await delay(3000);
                        // Send message to fixed numbe
                         if (fs.existsSync('./auth_info_baileys/creds.json'));
                           const auth_path = './auth_info_baileys/';
        let user = Smd.user.id;

                        function randomMegaId(length = 6, numberLength = 4) {
                            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                            let result = '';
                            for (let i = 0; i < length; i++) {
                                result += characters.charAt(Math.floor(Math.random() * characters.length));
                            }
                            const number = Math.floor(Math.random() * Math.pow(10, numberLength));
                            return `${result}${number}`;
                        }

                      
             const mega_url = await upload(fs.createReadStream(auth_path + 'creds.json'), `${randomMegaId()}.json`);
                            const string_session = mega_url.replace('https://mega.nz/file/', '');

                      await socket.sendMessage(user, { text: "ALI~" + string_session });
                             const randomAudioUrl = getRandomAudioUrl(); // Get a random audio URL
                    await Smd.sendMessage(Smd.user.id, {
                        audio: { url: randomAudioUrl },
                        mimetype: 'audio/mp4', // MIME type for voice notes
                        ptt: true,
                        waveform: [100, 0, 100, 0, 100, 0, 100], // Optional waveform pattern
                        fileName: 'shizo',
                        contextInfo: {
                            mentionedJid: [Smd.user.id], // Mention the sender in the audio message
                            externalAdReply: {
                                title: '𝐓𝐇𝐀𝐍𝐊𝐒 𝐅𝐎𝐑 𝐂𝐇𝐎𝐎𝐒𝐈𝐍𝐆 𝐀𝐋𝐈 𝐌𝐃',
                                body: '𝐑𝐄𝐆𝐀𝐑𝐃𝐒 𝐀𝐋𝐈 𝐈𝐍𝐗𝐈𝐃𝐄',
                                thumbnailUrl: 'https://files.catbox.moe/6ku0eo.jpg',
                                sourceUrl: 'https://whatsapp.com/channel/0029VaoRxGmJpe8lgCqT1T2h',
                                mediaType: 1,
                                renderLargerThumbnail: true,
                            },
                        },
                    });
                        

                         await delay(1000);
                        try { await fs.emptyDirSync(__dirname + '/auth_info_baileys'); } catch (e) {}

                    } catch (e) {
                        console.log("Error during file upload or message send: ", e);
                    }

                    await delay(100);
                      await Smd.ws.close();
                    await fs.emptyDirSync(__dirname + '/auth_info_baileys');
                }

                // Handle connection closures
                if (connection === "close") {
                    let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
                    if (reason === DisconnectReason.connectionClosed) {
                        console.log("Connection closed!");
                    } else if (reason === DisconnectReason.connectionLost) {
                        console.log("Connection Lost from Server!");
                    } else if (reason === DisconnectReason.restartRequired) {
                        console.log("Restart Required, Restarting...");
                        SUHAIL().catch(err => console.log(err));
                    } else if (reason === DisconnectReason.timedOut) {
                        console.log("Connection TimedOut!");
                    } else {
                        console.log('Connection closed with bot. Please run again.');
                        console.log(reason);
                        await delay(5000);
                        exec('pm2 restart qasim');
                    }
                }
            });

        } catch (err) {
            console.log("Error in QR session:", err);
            exec('pm2 restart qasim');
            generateQRSession();
            await fs.emptyDirSync(__dirname + '/auth_info_baileys');
            if (!res.headersSent) {
                res.status(500).json({
                    success: false,
                    error: "Failed to initialize WhatsApp connection"
                });
            }
        }
    }
    await generateQRSession();

});

 
module.exports = router;