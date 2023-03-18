const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Thông tin các lệnh cơ bản"),
    run: async ({ client, interaction }) => {
        await interaction.editReply({
            embeds: [new EmbedBuilder()
                .setDescription(`Xin chào! mình là bé cáo liliana đáng yêu và sau đây là các lệnh của mình ^^\n `
                    + `1. /bính_tăng song -> [để phát 1 bài hát copy url cuả 1 video mà bạn muốn phát]\n`
                    + `2. /bính_tăng playlist -> [để phát 1 bài hát copy url cuả 1 playlist mà bạn muốn phát]\n`
                    + `3. /bính_tăng search -> [Nhập tên bài hát bạn muốn nghe để mình tìm và phát]\n`
                    + `4. /info [Hiển thị thông tin của bài hát hiện đang phát]\n`
                    + `5. /pause -> [Tạm dừng phát bài hát hiện tại] \n`
                    + `6. /queue page -> [Nhập số trang để xem thông tin của 10 bài hát tại trang đó]\n`
                    + `7. /quit -> [Dừng phát nhạc và thoát khỏi voice chat]\n`
                    + `8. /resume -> [Tiếp tục phát bài hát đã dừng]\n`
                    + `9. /shuffle -> [Xáo trộn thứ tự của danh sách phát]\n`,
                    + `10. /skip -> [Chuyển qua bài hát tiếp theo]\n`
                    + `11. /skipto tracknumber -> [Nhập số thứ tự bài muốn bài muốn phát trong danh sách (chức năng còn bị lỗi)]`)
                .setThumbnail("https://i.pinimg.com/originals/dd/b1/38/ddb138a7358c747271e6972c4d208a4c.jpg")
            ]
        })
    }
}