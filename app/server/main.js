import "/imports/startup/server/Accounts";
import "/imports/startup/server/Publications";
import "/imports/startup/server/Mongo";
import { Meteor } from "meteor/meteor";
import { Email } from "meteor/email";


Meteor.methods({
    buyEmail: function (email, book, image, buyerName) {
        process.env.MAIL_URL = `smtps://textxchange.team%40gmail.com:Textxchange4ever%3F@smtp.gmail.com:465`;

        let message = "Hello,<br>";
        message += buyerName + " is interested in your book,&quot;" + book + "&quot;. In order to follow up on this transaction, please email them at, " + email + " to setup an exchange.<br>";
        message += ".<br><br>";
        message += "<center><img src= " + image + " width=\"15%\" /></center><br>";
        message += "Happy Exchanging,<br> textXchange team";

        this.unblock();

        Email.send({
            to: email,
            from: "textxchange.team@gmail.com",
            subject: "Textbook Buyer Notification!",
            html: message
        });
    },

    registerEmail: function (email, firstName) {
        process.env.MAIL_URL = `smtps://textxchange.team%40gmail.com:Textxchange4ever%3F@smtp.gmail.com:465`;

        let message = "<center><img src='https://cdn.discordapp.com/attachments/641715894984245258/646252553176219668/textXchange_Logo_4.png' height=\"150\" width=\"150\"/></center><br>";
        message += "Hello " + firstName + ",<br>";
        message += "Congrats on registering this email at textXchange, to access your account you can login <a href='http://textxchange.meteorapp.com/#/'> here</a>.<br>";
        message += "<br><br>";
        message += "Happy Exchanging,<br> textXchange team";

        this.unblock();

        Email.send({
            to: email,
            from: "textxchange.team@gmail.com",
            subject: "Account Registration Confirmation",
            html: message
        });
    }


});

