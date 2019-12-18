import '/imports/startup/server/Accounts';
import '/imports/startup/server/Publications';
import '/imports/startup/server/Mongo';
import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { Accounts } from 'meteor/accounts-base';

Meteor.startup(function () {
    process.env.MAIL_URL = 'smtps://textxchange.team%40gmail.com:Textxchange4ever%3F@smtp.gmail.com:465';
    });

Meteor.methods({
  // eslint-disable-next-line meteor/audit-argument-checks
    buyEmail: function (email, book, image, buyerName, buyerEmail) {
        process.env.MAIL_URL = 'smtps://textxchange.team%40gmail.com:Textxchange4ever%3F@smtp.gmail.com:465';

        let message = 'Hello,<br>';
      // eslint-disable-next-line max-len
        message += `${buyerName} is interested in your book,&quot;${book}&quot;. In order to follow up on this transaction, please email them at, ${buyerEmail} to setup an exchange.<br>`;
        message += '.<br><br>';
        message += `<center><img src= ${image} width="15%" /></center><br>`;
        message += 'Happy Exchanging,<br> textXchange team';

        this.unblock();

        Email.send({
            to: email,

            from: 'textxchange.team@gmail.com',
            subject: 'Textbook Buyer Notification!',
            html: message,
        });
    },

    verification: function () {
        const userId = Meteor.userId();
        if (userId) {
            return Accounts.sendVerificationEmail(userId);
        }
        return '';
    },

    // eslint-disable-next-line meteor/audit-argument-checks
    registerEmail: function (email, firstName) {
        process.env.MAIL_URL = 'smtps://textxchange.team%40gmail.com:Textxchange4ever%3F@smtp.gmail.com:465';

        // eslint-disable-next-line max-len
        let message = "<center><img src='https://cdn.discordapp.com/attachments/641715894984245258/646252553176219668/textXchange_Logo_4.png' height=\"150\" width=\"150\"/></center><br>";
        message += `Hello ${firstName},<br>`;
        // eslint-disable-next-line max-len
        message += "Congrats on registering this email at textXchange, to access your account you can login <a href='http://textxchange.meteorapp.com/#/signin'> here</a>.<br>";
        message += '<br><br>';
        message += 'Happy Exchanging,<br> textXchange team';

        this.unblock();

        Email.send({
            to: email,
            from: 'textxchange.team@gmail.com',
            subject: 'Account Registration Confirmation',
            html: message,
        });
    },
});

Accounts.emailTemplates.verifyEmail = {
    from() {
        return 'textxchange.team@gmail.com';
    },
    subject() {
        return 'TextXchange - Account Verification';
    },
    html(user, url) {
        const newurl = url.replace('verify-email', 'verifyemail');
        // eslint-disable-next-line max-len
        let message = "<center><img src='https://cdn.discordapp.com/attachments/641715894984245258/646252553176219668/textXchange_Logo_4.png' height=\"150\" width=\"150\"/></center><br>";
        message += 'Hello incoming textXchanghe user, <br><br>';
        // eslint-disable-next-line max-len
        message += 'Congrats on starting your journey at textXchange, Please verify your account ';
        message += `<a href=${newurl} >Click Me!</a>.<br>`;
        message += '<br>';
        message += 'Happy Exchanging,<br> textXchange team<br><br><br>';
        // eslint-disable-next-line max-len
        message += 'If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team at textxchange.team@gmail.com.';
        return message;
    },
};
