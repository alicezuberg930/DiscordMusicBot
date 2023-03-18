const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder  } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("bính_tăng")
        .setDescription("Thêm bài hát từ 1 video trên youtube")
        .addSubcommand((subCMD) => subCMD.setName("song")
            .setDescription("Thêm nhạc từ link")
            .addStringOption((option) => option.setName("url").setDescription("Link của bài nhạc").setRequired(true)
            )
        )
        .addSubcommand((subCMD) => subCMD.setName("playlist").
            setDescription("Thêm bài hát từ 1 danh sách phát trên youtube")
            .addStringOption((option) => option.setName("url").setDescription("Link của danh sách phát").setRequired(true)
            )
        )
        .addSubcommand((subCMD) => subCMD.setName("search").
            setDescription("Tìm kiếm nhạc dựa trên từ khóa tìm kiếm")
            .addStringOption((option) => option.setName("keywords").setDescription("Từ khóa tìm kiếm").setRequired(true)
            )
        ),
    run: async ({ client, interaction }) => {
        if (!interaction.member.voice.channel) return interaction.editReply("Chưa tham gia cuộc gọi mà đòi nghe nhạc hả thằng l")
        const queue = await client.player.createQueue(interaction.guild, {
            metadata: interaction.channel,
            autoSelfDeaf: false
        })
        if (!queue.connection) await queue.connect(interaction.member.voice.channel)
        let embed = new EmbedBuilder()

        if (interaction.options.getSubcommand() === "song") {
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO
            })
            if (result.tracks.length === 0) return interaction.editReply("Có cái link copy cũng không xong, sao mày ngu vậy?")
            const song = result.tracks[0]
            await queue.addTrack(song)
            embed.setDescription(`>Bài hát [${song.title}]: (${song.url}) đã được thêm vào danh sách phát`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Thời lượng: ${song.duration}` })

        } else if (interaction.options.getSubcommand() === "playlist") {
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_PLAYLIST
            })
            if (result.tracks.length === 0) return interaction.editReply("có cái link copy cũng không xong, sao mày ngu vậy?")
            const playlist = result.playlist
            await queue.addTracks(result.tracks)
            embed.setDescription(`> ${result.tracks.length} bài hát từ danh sách phát [${playlist.title}]: (${playlist.url}) đã được thêm vào hàng đợi`)
                .setThumbnail(playlist.thumbnail.url)

        } else if (interaction.options.getSubcommand() === "search") {
            let url = interaction.options.getString("keywords")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })
            if (result.tracks.length === 0) return interaction.editReply("có cái link copy cũng không xong, sao mày ngu vậy?")
            const song = result.tracks[0]
            await queue.addTrack(song)
            embed.setDescription(`>Bài hát [${song.title}]: (${song.url}) đã được thêm vào danh sách phát`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Thời lượng: ${song.duration}` })
        }
        if (!queue.playing) await queue.play()
        await interaction.editReply({
            embeds: [embed]
        })
    }
}