const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Chuyển qua bài hát tiếp theo trong danh sách"),
    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)
        if (!queue) return await interaction.editReply("Không còn bài hát nào trong danh sách chờ")
        const song = queue.current
        queue.skip(song)
        await interaction.editReply({
            embeds:[
                new EmbedBuilder()
                .setDescription(`${song.title} đã được chuyển qua`)
                .setThumbnail(song.thumbnail)
            ]
        })
    }
}