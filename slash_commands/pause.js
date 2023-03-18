const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Tạm dừng bài hát"),
    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)
        if (!queue) return await interaction.editReply("Không còn bài hát nào trong danh sách chờ")
        queue.setPaused(true)
        await interaction.editReply("Tạm dừng phát nhạc, để tiếp tục dùng lệnh /resume")
    }
}