const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skipto")
        .setDescription("Chuyển đến 1 bài hát được chọn")
        .addNumberOption((option) => option.setName("tracknumber")
            .setDescription("Bài hát muốn chuyển đến")
            .setMinValue(1)
            .setRequired(true)
        ),
    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)
        if (!queue) return await interaction.editReply("Không còn bài hát nào trong danh sách chờ")
        const trackNo = interaction.options.getNumber("tracknumber")
        if (trackNo > queue.tracks.length) return await interaction.editReply("Thứ tự không hợp lệ")
        queue.skipTo(trackNo - 1)
        await interaction.editReply(`Đã chuyển đến bài hát thứ ${trackNo}`)
    }
}