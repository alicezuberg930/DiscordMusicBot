const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("queue")
        .setDescription("Hiển thị hàng đợi")
        .addNumberOption((option) => option.setName("page")
            .setDescription("Thứ tự trang của hàng đợi")
            .setMinValue(1)
        ),
    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)
        if (!queue || !queue.playing) {
            return await interaction.editReply("Chưa có bài hát nào trong hàng đợi")
        }
        const totalPages = Math.ceil(queue.tracks.length / 10) || 1
        const page = (interaction.options.getNumber("page") || 1) - 1
        if (page > totalPages) return await interaction.editReply(`Trang không hợp lệ, chỉ có tổng cộng ${totalPages} trang`)
        const queueString = queue.tracks.slice(page * 10, page * 10 + 10).map((song, i) => {
            return `> ${page * 10 + i + 1}: [${song.duration}] ${song.title} -- @${song.requestedBy.id}`
        }).join("\n")
        const currentSong = queue.current
        await interaction.editReply({
            embeds: [
                new EmbedBuilder().
                    setDescription(`**Hiện đang phát bài**\n` + (currentSong ? `\`[${currentSong.duration}]\`[${currentSong.title}](${currentSong.url})` : "None") + '\n\n**Danh sách phát**\n' + queueString)
                    .setFooter({
                        text: `Page ${page + 1} trong ${totalPages}`
                    })
                    .setThumbnail(currentSong.thumbnail)
            ]
        })
    }
}