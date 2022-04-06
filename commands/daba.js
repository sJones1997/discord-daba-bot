const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('daba')
		.setDescription('A cheap yet effect insult')
        .addSubcommand(sub => 
            sub.setName("user")
            .setDescription("User to insult")
            .addUserOption(option => 
                option.setName("target")
                .setDescription("The user mentioned"))),
	async execute(interaction) {
        if(interaction.options.getSubcommand() === "user"){
            const user = interaction.options.getUser("target")
            if(user){
                await interaction.reply(`Sorry, <@${user.id}> did anybody ask?`);
            } else {
                await interaction.reply(`Sorry, did anybody fucking ask?`);
            }
        }
	},
};