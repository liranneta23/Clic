const { Expo } = require("expo-server-sdk")

const sendPushNotification = async (message) => {
  console.log(message)
  const expo = new Expo()
  const chunks = expo.chunkPushNotifications([
    {
      to: message.targetExpoPushToken.map((target) => target.expoPushToken),
      sound: "default",
      title: message.title,
      body: message.body,
      data: { id: message.data },
    },
  ])

  const sendChunks = async () => {
    // This code runs synchronously. We're waiting for each chunk to be send.
    // A better approach is to use Promise.all() and send multiple chunks in parallel.
    chunks.forEach(async (chunk) => {
      console.log("Sending Chunk backend", chunk)
      try {
        const tickets = await expo.sendPushNotificationsAsync(chunk)
        console.log("Tickets", tickets)
      } catch (error) {
        console.log("Error sending chunk", error)
      }
    })
  }

  await sendChunks()
}

module.exports = sendPushNotification
