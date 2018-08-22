const nodemailer = require('nodemailer');
const Email = require('../db/model/Email');


var transport = nodemailer.createTransport({
    host:'smtp.ukr.net',
    port: 465,
    secure:true,
    auth:{
        user: 'zcgm@ukr.net',
        pass: 'gjujlf'
    }
});

module.exports = {
    test: async function(){
        const emails = await Email.GetAll().exec();
            emails.map(async item => {
                let mailOptions = {
                    from: 'zcgm@ukr.net',
                    to: item.Email,
                }
                if(item.role === 2){
                    mailOptions.subject = 'Штормове попередження';
                    mailOptions.attachments = [{
                        filename: 'Штормове попередження.pdf',
                        path: 'http://localhost:3001/storm_warning'
                    }];
                }else{
                    mailOptions.subject = 'Гідрометеорологічний бюлетень';
                    mailOptions.attachments = [{
                        filename:'Бюлетень.pdf',
                        path: 'http://localhost:3001/report'
                    }];
                }               
                
                transport.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                    i++;
                    console.log('Message sent: %s', info.messageId);
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                    if(i< max){
                        setTimeout(send, 3000, obj);
                    }
            });
        });
    }
}
