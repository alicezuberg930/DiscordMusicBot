const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Tiếp tục phát bài hát"),
    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)
        if (!queue) return await interaction.editReply("Không còn bài hát nào trong danh sách chờ")
        queue.setPaused(false)
        await interaction.editReply("Tiếp tục phát nhạc")
    }
}