const nodemailer = require('nodemailer');
const WeatherTable = require('../db/model/WeatherCity');
const ClimateData = require('../db/model/ClimateData');
const Report = require('../db/model/ReportInfo');

var transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sinoptic.zp@gmail.com',
      pass: 'cb8d280d'
    }
    //host: "smtp.mailtrap.io",
    //port: 2525,
    //auth: {
    //    user: "4bb96706d1f4c9",
    //    pass: "44075d705ecfbf"
    //}
});



function GetMessageText (arr1, arr2, StormWarning = "", obj3){
    var text = "";
    if(StormWarning !== ""){
        text += "Штормовое предупреждение про самые важные события \n\n"
        text += StormWarning + '\n';
    }
    text += '\n\n погода в Азовськом морi \n\n'
    text += obj3.AzovText 
    text += '\n\n Погода по запорожской облости \n\n'
    for(var j=0; j< arr1.length; j++){
        text += '\n'+ arr1[j].date+ ' : ' + arr1[j].text;
    }
    for(var j=0; j< obj3.TextWeather.length; j++){
        text += '\n'+ obj3.TextWeather[j].date+ ' : ' + obj3.TextWeather[j].text;
    }
    text += '\n\n Погода по городу Запорожье \n\n'
    for(var n=0; n< arr2.length; n++){
        text += '\n'+ arr2[n].date+ ' : ' + arr2[n].text;
    }
    return text;
}

function GetClimateText(text, Data){
    var text = "";
    text+= '\n\n Климатические данные по городу Запорожье \n\n'
    text+= '\n Средняя температура была зафиксирована в ' + Data.SrTemperature.date + ' И была равна ' + Data.SrTemperature.value;
    text+= '\n Максимальная температура была зафиксирована в ' + Data.MaxTemperature.date + ' И была равна ' + Data.MaxTemperature.value;
    text+= '\n Минимальная температура была зафиксирована в ' + Data.MinTemperature.date + ' И была равна ' + Data.MinTemperature.value;
    return text;
}

module.exports = {
    test: function(emails){
        var PromiseArr =[];
        PromiseArr.push(WeatherTable.GetAll());
        PromiseArr.push(ClimateData.Get());
        PromiseArr.push(Report.Get())
        Promise.all(PromiseArr)
            .then(respons => {
                var text = GetMessageText(respons[0][0].TextWeather, respons[0][1].TextWeather, respons[1][0].StormText, respons[2]);
                text += GetClimateText(text, respons[1][0])
                var obj = {
                    text: text,
                    StormWarning: respons[1][0].StormText
                }
                send(obj);
            });
        var i=0; max= emails.length;
        function send(obj) {

            let mailOptions = {
                from: 'sinoptic.zp@gmail.com',
                to: emails[i].Email,

            }
            if(emails[i].role == 2){
                mailOptions.text = 'Штормовое предупреждение про самое важное \n\n' + obj.StormWarning;
                mailOptions.subject = 'Штормовое предупреждение'
            }else{
                mailOptions.text = obj.text;
                mailOptions.subject = 'Гидрометрический белютень';
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
        }

    }
}
