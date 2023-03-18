const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("quit")
        .setDescription("Dừng phát nhạc và thoát khỏi kênh gọi"),
    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)
        if (!queue) return await interaction.editReply("Không còn bài hát nào trong danh sách chờ")
        queue.destroy()
        await interaction.editReply("Tạm biết nhé dit me may! ^^")
    }
}