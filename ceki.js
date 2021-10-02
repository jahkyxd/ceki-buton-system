//komutlara buttons.js dosya oluşturun alttaki kodu oraya girin

buttons = global.buttons

module.exports = {
    name: "buttons",
    aliases: [],
    owner: true,
    execute: async (client, message, args, embed, author, channel, guild) => {
        const ceki = args[0]
        if (!ceki) return

        if (ceki === "role") {
            message.delete()
            const Giveaway = new buttons.MessageButton()
                .setStyle("red")
                .setLabel("Çekiliş Katılımcısı")
                .setID("Giveaway");
            const Activity = new buttons.MessageButton()
                .setStyle("green")
                .setLabel("Etkinlik Katılımcısı")
                .setID("Activity");

            channel.send(`Merhaba!\n\nRollerimizi alarak sunucumuzda bir sürü şeyden haberdar olabilirsiniz.\n\nAşağıda bulunan butonlardan rollerinizi alarak **duyurularımızdan ve etkinliklerimizden** faydalanabilirsiniz.\n\n\`NOT:\` Hepiniz bu kanalı görebilmektesiniz. Bu sunucumuzda everyone here atılmayacağından dolayı kesinlikle rollerinizi almayı unutmayın.`,
                {
                    buttons: [Giveaway, Activity]
                });
        }

        if (ceki === "info") {
            message.delete()
            const one = new buttons.MessageButton()
                .setStyle("green")
                .setLabel("I")
                .setID("one")

            const two = new buttons.MessageButton()
                .setStyle("green")
                .setLabel("II")
                .setID("two")

            const three = new buttons.MessageButton()
                .setStyle("green")
                .setLabel("III")
                .setID("three")

            const four = new buttons.MessageButton()
                .setStyle("green")
                .setLabel("IV")
                .setID("four")

            const five = new buttons.MessageButton()
                .setStyle("green")
                .setLabel("V")
                .setID("five")
            message.channel.send("Merhaba!\n\n Aşşağıdaki butonlarla etkileşime girerek sunucumuzdaki durumunuz hakkında bilgi edinebilirsiniz!\n\n\n**I**: ``Sunucumuza daha önce kayıt olduğunuz isimleri gösterir.``\n**II**: ``Sunucumuza daha önce kayıt olurken hangi yetkililerimiz kayıt ettiğine bakarsınız.``\n**III**: ``Sicil ve ceza puan kaydınıza bakarsınız.``\n**IV**: ``Üstünüzde bulunan rollere bakarsınız.``\n**V**: ``Sunucumuza katılma tarihine bakarsınız.``", {
                 buttons: [one, two, three, four, five] })
        }
    }
}

//maine
const buttons = (global.buttons = require('discord-buttons'));
buttons(client)

client.on("clickButton", async button => {
    if (button.id === "one") {
        const names = db.get(`isimler_${button.clicker.id}`)
        await button.reply.think(true);
        if (!names) return button.reply.edit("Sunucumuza daha önce kayıt olmamışsınız confirmation odalarına girerek kayıt olabilirsiniz")
        await button.reply.edit(`Sunucumuza daha önceden kayıt olduğunuz isimler:\n${names.map((data, n) => `**${n + 1}.** ${data}`).join("\n")}`);
    };
    if (button.id === "two") {
        const kke = db.get(`kke_${button.clicker.id}`)
        await button.reply.think(true)
        if (!kke) return button.reply.edit("Sunucumuza daha önce kayıt olmamışsınız confirmation odalarına girerek kayıt olabilirsiniz")
        await button.reply.edit(`Sunucumuza daha önceden kayıt olurken sizi kayıt eden yetkililerimiz:\n${kke.map(data => `${data}`).join("\n")}!`)
    };
    if (button.id === "three") {
        const sicil = db.get(`sicil_${button.clicker.id}`);
        const points = db.get(`points_${button.clicker.id}`) || 0
        await button.reply.think(true);
        if (!sicil) return button.reply.edit("Şuana kadar ceza almamışsınız");
        await button.reply.edit(`Şuanki toplam ceza puanınız: ${points}, aldığınız cezalar ise: ${sicil.map(data => `${data}`).join("\n")}!`)
    };
    if (button.id === "four") {
        await button.reply.think(true);
        await button.reply.edit(`${button.clicker.member.roles.cache.filter(xd => xd.name !== "@everyone").map(x => x).join("\n")}`);
    };
    if (button.id === "five") {
        const member = button.guild.members.cache.get(button.clicker.id)
        await button.reply.think(true);
        await button.reply.edit(`Sunucumuza ${moment(member.joinedAt).format("LLL")} tarihinde katılmışsınız`)
    }
})
