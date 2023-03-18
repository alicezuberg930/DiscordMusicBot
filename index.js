const discord = require('discord.js')
const env = require("dotenv");
const { REST } = require("@discordjs/rest")
const { Routes, GatewayIntentBits } = require("discord-api-types/v9")
const fs = require("fs");
const { Player } = require("discord-player");

env.config()
const bot_token = process.env.TOKEN;
const client_id = "1085924875740381245"
const guild_ids = ["1086013450708336791", "603123160367497217"];
const client = new discord.Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages]
})
client.slashcommands = new discord.Collection()
client.player = new Player(client, {
    ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25
    }
})
let commands = []
const slash_files = fs.readdirSync("./slash_commands").filter(file => file.endsWith(".js"))
for (const file of slash_files) {
    const slash_file = require(`./slash_commands/${file}`)
    client.slashcommands.set(slash_file.data.name, slash_file)
    commands.push(slash_file.data.toJSON())
} const restAPI = new REST({ version: "9" }).setToken(bot_token)
for (let i = 0; i < guild_ids.length; i++) {
    restAPI.put(Routes.applicationGuildCommands(client_id, guild_ids[i]), { body: commands })
        .then(() => {
            console.log("success")
        }).catch((err) => {
            console.log(err)
        })
}
console.log("deployed slash commands");
client.on("ready", () => { console.log(`Logged in as ${client.user.tag}`) })
client.on("interactionCreate", (interaction) => {
    async function handleCommand() {
        if (!interaction.isCommand()) return
        const slashCMD = client.slashcommands.get(interaction.commandName)
        if (!slashCMD) return await interaction.reply("Sao m ngu vậy, lệnh đơn giản cũng sai")
        await interaction.deferReply()
        await slashCMD.run({ client, interaction })
    }
    handleCommand()
})
client.login(bot_token)