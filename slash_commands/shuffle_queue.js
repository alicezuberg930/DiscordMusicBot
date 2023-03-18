const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder().setName("shuffle").setDescription("Xáo trộn danh sách phát"),
    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guidId)
        if (!queue) {
            return await interaction.editReply("Chưa có bài hát nào trong hàng đợi")
        }
        queue.shuffle()
        await interaction.editReply(`Danh sách phát của ${queue.tracks.length} bài hát đã được xáo trộn!`)
    }
}