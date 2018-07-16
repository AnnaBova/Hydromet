const mongoose = require('mongoose');
const TimeGaps = require('./model/TimeGaps');
const Station = require('./model/Station');
const WeatherTable = require('./model/CityWeatherTable');
const Regular_observable = require('./model/Regular_observable');
const UserController = require('./model/user');
const Chart = require('./model/Chart');
const Email = require('./model/Email');
const radionatioal = require('./model/radiotional');
const ClimateData = require('./model/ClimateData');
const ClimateRecords = require('./model/ClimateRecords');
const DangerGydrolygy = require('./model/DangerGydrolygy');
const DecadeBulletin = require('./model/DecadBulletin');
const event = require('./model/Events');
const meteorologPhenomena = require('./model/MeteorologPhenomena');
const waterTemperature = require('./model/waterTemerature');
const WeatherCity = require('./model/WeatherCity');
const WeatherObservable = require('./model/WeatherObservable');
const ClimateCharacteristic = require('./model/ClimateCharacteristic');

var DangerGydrolygyText = `
    Гідрологічна ситуація спокійна, рівні води знаходяться у межах русел.
Утримання тривалий час жаркої і сухої погоди влітку 2016 року зумовило формування низьких
і дуже низьких рівнів і витрат води більшості річок України з наближенням їх до критеріїв маловоддя, при яких ускладнюються
функціонування водогосподарського комплексу держави і забезпечення водою населення.

Збереження до кінця серпня переважно сухої погоди спричинить подальше зменшення водності річок
і ускладнення гідрологічної ситуації.`;

var decad = `<p>Третя декада січня відзначилась різним температурним режимом та дефіцитом опадів.
В період 21-25 січня на території області відмічалась тепла погода, зумовлена виносом теплого повітря
з Атлантики. 26 січня, після проходження холодного арктичного фронту, відбулось суттєве похолодання
.</p><p><br></p><p><span style="color: rgb(0, 152, 209);">Середня</span>&nbsp;за декаду&nbsp;<span
style="color: rgb(0, 152, 209);">температура повітря</span>&nbsp;була на 2-3° нижчою за норму і становила 5-9° морозу.
У минулому році в цей період було на 1-3° тепліше.</p><p><br></p><p><span style="color: rgb(0, 152, 209);">Максимальна температура
</span>&nbsp;повітря підвищувалась до 1-3° тепла, поверхня грунту на більшій частині території нагрівалась при цьому до 1-10° тепла.</p><p><br>
</p><p><span style="color: rgb(0, 152, 209);">Мінімальна температура</span>&nbsp;повітря січня знижувалась до 17-21° морозу, поверхня грунту
охолоджувалась на 1-3° інтенсивніше.</p><p><br></p><p>Незначні&nbsp;<span style="color: rgb(0, 152, 209);">опади</span>&nbsp;у вигляді снігу
та мокрого снігу спостерігались на всій території області. Кількість їх за декаду становила 0,8-4 мм, що відповідає 6-26% від декадної норми.
У відповідній декаді минулого року опадів випало 3-12 мм.</p><p><br></p><p><span style="color: rgb(0, 152, 209);">Глибина промерзання</span>&nbsp;
грунту на кінець декади на більшій частині території становила 30-49 см, у м.Запоріжжі
– 9 см.</p><p><br></p><p><span style="color: rgb(0, 152, 209);">Сніговий покрив</span>&nbsp;на полях з зимуючими
культурами середньою висотою 1-4 см в останній день декади спостерігався майже на всій території області. У м.Запоріжжі висота
снігового покриву становила 14 см.</p><p><br></p><p><span style="color: rgb(0, 152, 209);">Середня</span>&nbsp;за декаду
відносна&nbsp;<span style="color: rgb(0, 152, 209);">вологість повітря</span>&nbsp;була нижчою за норму і становила 75-83%.</p><p><br></p><p>
<span style="color: rgb(0, 152, 209);">Вітер</span>&nbsp;протягом декади переважав помірний, у смт. Пришиб 29 січня він посилювався
до 15 м/с.</p><p><br></p><p>Упродовж декади озимі культури, багаторічні трави та плодові культури знаходились у стані зимового спокою. На більшій
частині території області несприятливих агрометеорологічних умов для перезимівлі не спостерігалось. У періоди сильних морозів мінімальна
температура грунту на глибині залягання вузла кущіння на більшості спостережних ділянок знижувалась до 9-11° морозу, на спостережних ділянках у
Михайлівському районі – до 14° морозу, що небезпечно для посівів озимого ячменю та озимого ріпаку. Ситуацію на цих ділянках ускладнювало також
збереження вже упродовж двох декад притертої до грунту льодової кірки. В останній день декади товщина її в середньому становила
5 мм.</p><p><br></p><p>За розрахунками критична температура вимерзання озимої пшениці станом на 01 лютого становила 15.0-20.9°
морозу.</p><p><br></p>`;

var CharacteristicArr = [
`Запорізька область розташована в степовій зоні на півдні України. Клімат області – степовий атлантико-
континентальний. Характер атмосферної циркуляції визначається частою зміною циклонів та антициклонів.
Циклони приходять протягом року із заходу, північного та південного заходу та з півдня. Вони приносять
з собою морські повітряні маси з Атлантики і Арктики. Вторгнення континентальних повітряних мас із Азії
(антициклони) обумовлює взимку різкі похолодання, а влітку – засуху.`,
`Зима починається наприкінці листопада – на початку грудня. Вона помірно-холодна, малосніжна, переважає
нестійка погода з чисельними відлигами, після яких відбуваються різкі похолодання. Весна зазвичай
наступає в першій декаді березня. Характерною особливістю весни є інтенсивне наростання тепла, завдяки
цьому весняні процеси розвиваються швидко і весна зазвичай буває короткою. Літо переважно спекотне та
сухе. В окремі періоди переміщення холодніших повітряних мас супроводжується активною грозовою
діяльністю, виникають небезпечні метеорологічні явища: сильні зливи, шквали, град. Осінь зазвичай
наступає у третій декаді вересня. Для осені характерне повернення тепла на загальному фоні зниження
температури та початок заморозків`,
`На півдні області виділяється приморська
кліматична зона, яка охоплює вузьку смугу від
узбережжя Азовського моря до границі
розповсюдження морського бризую Ширина цієї
смуги в середньому 50 кми. Завдяки бризовій
циркуляції більше безхмарних днів, внаслідок
чого збільшується кількість сумарної сонячної
радіації. В холодний період року Азовське море
сприяє послабленню морозів, а влітку –
зниженню температури, підвищенню вологості
повітря, посиленню вітру.`,
`Середьорічна температура повітря в північній половині області коливається від +8,2 до +9,4°, в південній –
від +9,6 до +10,2°. Середня температура повітря найтеплішого місяця (липня) +22,0° (максимальні
температури +39-40°), а найбільш холодного (січня) – 4,1° морозу (мінімальні температури 31-33° морозу).
В лютому можливі морози до 27-30°.`,
`Тривалість безморозного періоду на більшій частині території області в середньому складає 193 дні, у
північно-східних районах області – 164 дні. Перші морози бувають у першій половині жовтня, в північно-
східних районах – у другій половині вересня. Закінчуються морози як правило у квітні, в окремі роки – у
першій половині травня.`,
`Середньорічна швидкість вітру 3 м/с. Переважают вітри північного та півнчно-східного напрямків.
Максимальна швидкість вітру в 1969 році досягала 40 м/с.`,
`Річна кількість опадів в північній половині
області – 480-510 мм, в південній – 430-475 мм.
Випадіння опадів взагалі відрізняється
нерівномірністю і значними коливаннями їх
кількості, що приводить до нерівномірного
зволоження в різні роки. Протягом року опади
теж випадають нерівномірно, за рахунок
сильних злив більше їх у теплий період року.
Середньорічна відносна вологість повітря
становить 71-77%.`]

var observableItem = [
    {
        Station: "zaporozhye",
        MaxTemperature: "+21",
        MinTemperature: "+10",
        Precipitation: "244.4",
        Phenomen: "sun"
    },
    {
        Station: "prism",
        MaxTemperature: "+21",
        MinTemperature: "+10",
        Precipitation: "2.4",
        Phenomen: "sun"
    },
    {
        Station: "berdyansk",
        MaxTemperature: "+21",
        MinTemperature: "+10",
        Precipitation: "244.4",
        Phenomen: "sun"
    },
    {
        Station: "gylyaypole",
        MaxTemperature: "+21",
        MinTemperature: "+10",
        Precipitation: "244.4",
        Phenomen: "sun"
    },
    {
        Station: "botievye",
        MaxTemperature: "+21",
        MinTemperature: "+10",
        Precipitation: "244.4",
        Phenomen: "sun"
    },
    {
        Station: "kyrylivka",
        MaxTemperature: "+21",
        MinTemperature: "+10",
        Precipitation: "244.4",
        Phenomen: "sun"
    },
    {
        Station: "melitopol",
        MaxTemperature: "+21",
        MinTemperature: "+10",
        Precipitation: "244.4",
        Phenomen: "sun"
    }
]

var WeatherObservableObj = {
    day: "20",
    mounth: "листопада",
    year: "2017",
    text: "В зпехе все впоряде",
    StationWeather: observableItem
}




var WeatherDay =
[
    {
        title: "Понедельник",
        date: "20.11",
        day:{
            weather: "sun",
            temperature: "+12",
            wind: "2.2",
            DirectionWind: "up"
        },
        night:{
            weather: "sun",
            temperature: "+12",
            wind: "2.2",
            DirectionWind: "up"
        }
    },
    {
        title: "Вторник",
        date: "20.11",
        day:{
            weather: "sun",
            temperature: "+12",
            wind: "2.2",
            DirectionWind: "up"
        },
        night:{
            weather: "sun",
            temperature: "+12",
            wind: "2.2",
            DirectionWind: "up"
        }
    },
    {
        title: "Среда",
        date: "20.11",
        day:{
            weather: "sun",
            temperature: "+12",
            wind: "2.2",
            DirectionWind: "up"
        },
        night:{
            weather: "sun",
            temperature: "+12",
            wind: "2.2",
            DirectionWind: "up"
        }
    },
    {
        title: "Четверг",
        date: "20.11",
        day:{
            weather: "sun",
            temperature: "+12",
            wind: "2.2",
            DirectionWind: "up"
        },
        night:{
            weather: "sun",
            temperature: "+12",
            wind: "2.2",
            DirectionWind: "up"
        }
    },
    {
        title: "Пятница",
        date: "20.11",
        day:{
            weather: "sun",
            temperature: "+12",
            wind: "2.2",
            DirectionWind: "up"
        },
        night:{
            weather: "sun",
            temperature: "+12",
            wind: "2.2",
            DirectionWind: "up"
        }
    }
]

var TextWeatherDay = [
    {
        date: "20.11",
        text: "В запорожье тепло"
    },
    {
        date: "21.11",
        text: "В запорожье тепло"
    },
    {
        date: "22.11",
        text: "В запорожье тепло"
    },
    {
        date: "23.11",
        text: "В запорожье тепло"
    },
    {
        date: "24.11",
        text: "В запорожье тепло"
    }
]

var WeatherData = [
    {
        WeatherTable: WeatherDay,
        TextWeather: TextWeatherDay,
    },
    {
        WeatherTable: WeatherDay,
        TextWeather: TextWeatherDay,
    }
]

var waterObj = {
    Date: "20.12.2017",
    Dnipro: {
        Observable: "08",
        Temperature: "24.4"
    },
    Azov: {
        Observable: "00",
        Temperature: "18.7"
    }
}

var events = [
    {
        title: "",
        date: "",
        Picture: "",
        description: "",
        Text: "",
    }
]

var ClimateRecordsArr = [
    {
        date: "20.12",
        value: "12",
        post: "Пришиб",
    },
    {
        date: "20.12",
        value: "12",
        post: "Пришиб",
    },
    {
        date: "20.12",
        value: "12",
        post: "Пришиб",
    },
    {
        date: "20.12",
        value: "12",
        post: "Пришиб",
    },
    {
        date: "20.12",
        value: "12",
        post: "Пришиб",
    },
    {
        date: "20.12",
        value: "12",
        post: "Пришиб",
    },
    {
        date: "20.12",
        value: "12",
        post: "Пришиб",
    }
]

var ClimateRecordObjArr = [
    {
        id: 1,
        modalTitle: "Максимальна температура повітря",
        date: "20.12",
        value: "+25",
        post: "Пришиб",
        table: ClimateRecordsArr
    },
    {
        id: 2,
        modalTitle: "Мінімальна температура повітря",
        date: "20.12",
        value: "+25",
        post: "Пришиб",
        table: ClimateRecordsArr
    },
    {
        id: 3,
        modalTitle: "Максимальна температура на поверхні ґрунту",
        date: "20.12",
        value: "+25",
        post: "Пришиб",
        table: ClimateRecordsArr
    },
    {
        id: 4,
        modalTitle: "Мінімальна температура на поверхні ґрунту",
        date: "20.12",
        value: "+25",
        post: "Пришиб",
        table: ClimateRecordsArr
    },
    {
        id: 5,
        modalTitle: "Максимальна швидкість вітру",
        date: "20.12",
        value: "+25",
        post: "Пришиб",
        table: ClimateRecordsArr
    },
    {
        id: 6,
        modalTitle: "Найбільша висота снігового покриву на метеорологічному майданчику",
        date: "20.12",
        value: "+25",
        post: "Пришиб",
        table: ClimateRecordsArr
    },
    {
        id: 7,
        modalTitle: "Найбільша місячна кількість опадів",
        date: "20.12",
        value: "+25",
        post: "Пришиб",
        table: ClimateRecordsArr
    },
    {
        id: 8,
        modalTitle: "Найбільша добова кількість опадів",
        date: "20.12",
        value: "+25",
        post: "Пришиб",
        table: ClimateRecordsArr
    }

]

var ClimateDataObject = {
    StormText: "",
    day: "20",
    mounth: "листопада",
    year: "2017",
    DateBulletin: "13 години 20 января 2017",
    SrTemperature: {
        date: "2007",
        value: "+10"
    },
    MaxTemperature: {
        date: "2009",
        value: "+27"
    },
    MinTemperature: {
        date: "2010",
        value: "+3"
    }
}

var meteorologPhenomenaArr = [
    {
        id: 1,
        modalName: "Вітер, у т.ч. шквали, смерчі",
        modalConvention: "максимальна швидкість",
        table: ClimateRecordsArr
    },
    {
        id: 2,
        modalName: "Сильна ожеледь",
        modalConvention: "диаметр",
        table: ClimateRecordsArr
    },
    {
        id: 3,
        modalName: "Сильні хуртовини",
        modalConvention: "швидкість вітру",
        table: ClimateRecordsArr
    },
    {
        id: 4,
        modalName: "Дуже сильні снігопади",
        modalConvention: "кількість опадів",
        table: ClimateRecordsArr
    },
    {
        id: 5,
        modalName: "Дуже сильний дощ",
        modalConvention: "кількість опадів",
        table: ClimateRecordsArr
    },
    {
        id: 6,
        modalName: "Сильне налипання мокрого снігу",
        modalConvention: "діаметр відкладень (д)",
        table: ClimateRecordsArr
    },
    {
        id: 7,
        modalName: "Сильна пилова буря",
        modalConvention: "швидкість вітру",
        table: ClimateRecordsArr
    },
    {
        id: 8,
        modalName: "Сильний туман",
        modalConvention: "видимість",
        table: ClimateRecordsArr
    },
    {
        id: 9,
        modalName: "Сильний мороз",
        modalConvention: "температура повітря",
        table: ClimateRecordsArr
    },
    {
        id: 10,
        modalName: "Сильна спека",
        modalConvention: "температура повітря",
        table: ClimateRecordsArr
    },
    {
        id: 11,
        modalName: "Крупний град",
        modalConvention: "діаметр",
        table: ClimateRecordsArr
    },
    {
        id: 12,
        modalName: "Сильні зливи",
        modalConvention: "кількість опадів",
        table: ClimateRecordsArr
    },
    {
        id: 13,
        modalName: "Тривалі дощі",
        modalConvention: "кількість опадів",
        table: ClimateRecordsArr
    }
]

var radiotionalArr = [
    {
        Date:"20.12.2017",
        Station: "zaporozhye",
        value: "24"
    },
    {
        Date:"20.12.2017",
        Station: "berdyansk",
        value: "24"
    },
    {
        Date:"20.12.2017",
        Station: "melitopol",
        value: "24"
    },
    {
        Date:"20.12.2017",
        Station: "botievye",
        value: "24"
    },
    {
        Date:"20.12.2017",
        Station: "prism",
        value: "24"
    },
    {
        Date:"20.12.2017",
        Station: "kyrylivka",
        value: "24"
    },
    {
        Date:"20.12.2017",
        Station: "gulyaypole",
        value: "24"
    }
]

var EmailArr = [
    {
        "Email": "first@zoda.gov.ua",
        "role": 1
    },
    {
        "Email": "babanin_oo@zoda.gov.ua",
        "role": 1
    },
    {
        "Email": "mns@express.net.ua",
        "role": 1
    },
    {
        "Email": "pucs@ukr.net",
        "role": 1
    },
    {
        "Email": "ods@zp.dsns.gov.ua",
        "role": 1
    },
    {
        "Email": "dispetcher@zp.dsns.gov.ua",
        "role": 1
    },
    {
        "Email": "cppl@ukr.net",
        "role": 1
    },
    {
        "Email": "metprishib@ukr.net",
        "role": 1
    },
    {
        "Email": "mgberd@ukr.net,",
        "role": 1
    },
    {
        "Email": "meteomel@ukr.net",
        "role": 1
    },
    {
        "Email": "msbotievo@meteo.gov.ua",
        "role": 1
    },
    {
        "Email": "gulyaypole@meteo.gov.ua",
        "role": 1
    },
    {
        "Email": "mila@atv.zp.ua",
        "role": 1
    },
    {
        "Email": "trk@atv.zp.ua",
        "role": 1
    },
    {
        "Email": "milaray1@gmail.com",
        "role": 1
    },
    {
        "Email": "news@ztv.zp.ua",
        "role": 1
    },
    {
        "Email": "wgaeva@mig.com.ua",
        "role": 1
    },
    {
        "Email": "роslugy-bdr.05@patrol.police.gov.ua",
        "role": 2
    }
]

var chartArr = [
    {
        "label": "Пыль",
        "backgroundColor": "rgb(0, 255, 0)",
        "data": [13, 10, 5, 2, 20]
    },
    {
        "label": "Двооксид сірки",
        "backgroundColor": "rgb(255, 0, 68)",
        "data": [1.3, 10, 5, 2, 20]
    },
    {
        "label": "Оксид вуглецю",
        "backgroundColor": "rgb(0, 171, 255)",
        "data": [1.3, 10, 5, 2, 20, 30, 45]
    },
    {
        "label": "Двооксид азоту",
        "backgroundColor": "rgb(171, 0, 255)",
        "data": [1.3, 10, 5, 2, 20, 30, 45]
    },
    {
        "label": "Оксид азоту",
        "backgroundColor": "rgb(255, 247, 0)",
        "data": [1.3, 10, 5, 2, 20, 30, 45]
    },
    {
        "label": "Фенол",
        "backgroundColor": "rgb(255, 99, 132)",
        "data": [1.3, 10, 5, 2, 20, 30, 45]
    },
    {
        "label": "Хлористий водень",
        "backgroundColor": "rgb(152, 96, 0)",
        "data": [1.3, 10, 5, 2, 20, 30, 45]
    },
    {
        "label": "Фтористий водень",
        "backgroundColor": "rgb(230, 168, 42)",
        "data": [1.3, 10, 5, 2, 20, 30, 45]
    },
    {
        "label": "Формальдегід",
        "backgroundColor": "rgb(0, 7, 223)",
        "data": [1.3, 10, 5, 2, 20, 30, 45]
    }
]

var UsersArray = [
    {
        login: "vgzcgm",
        password: "oksana",
        role: "1",
        station: "zaporozhye"
    },
    {
        login: "prishib",
        password: "lintur",
        role: "1",
        station: "prism"
    },
    {
        login: "kirilovka",
        password: "gontar",
        role: "1",
        station: "kyrylivka"
    },
    {
        login: "melitopol",
        password: "valentina",
        role: "1",
        station: "melitopol"
    },
    {
        login: "gylyapole",
        password: "semenuta",
        role: "1",
        station: "gulyaypole"
    },
    {
        login: "botievo",
        password: "khistov",
        role: "1",
        station: "botievye"
    },
    {
        login: "berdyansk",
        password: "svetlana",
        role: "1",
        station: "berdyansk"
    },
    {
        login: "sappi",
        password: "martunenko",
        role: "2",

    },
    {
        login: "vgmz",
        password: "sorokina",
        role: "3",
    },
    {
        login: "sinoptik",
        password: "pogoda",
        role: "4",
    },
    {
        login: "klszps",
        password: "moskovka",
        role: "5",
    }
]

var ObservArr = [
    {
        title: "р. Берда",
        Position: "с. Осипенко"
    },
    {
        title: "р. Обитічна",
        Position: "м. Приморськ"
    },
    {
        title: "р. Лозуватка",
        Position: "с. Новоолексіївка"
    },
    {
        title: "р. Молочна",
        Position: "м. Токмак"
    },
    {
        title: "р. Молочна",
        Position: "с. Терпіння"
    },
    {
        title: "Дніпровське вдсх.",
        Position: "м. Запоріжжя - верхній б'єф"
    },
    {
        title: "Каховське вдсх.",
        Position: "с. Благовіщенка"
    },
    {
        title: "Каховське вдсх.",
        Position: "с. Плавні"
    },
    {
        title: "Каховське вдсх.",
        Position: "с. Розумівка"
    }
]

var StationArray = [
    {
        "Title":'zaporozhye',
        "addres":"м. Запоріжжя, вул. Блакитна, 4, територія аеропорту Запоріжжя",
        "email": "metzaporozh@meteo.gov.ua",
        "full_name": "Авіаційна метеорологічна станція цивільна Запоріжжя",
        "photo": 4
    },
    {
        "Title":'prism',
        "addres":"смт. Пришиб Михайлівський район, пров. Східний, 18",
        "email": "mspryshyb@meteo.gov.ua",
        "full_name": "Метеорологічна станція Пришиб",
        "photo": 4
    },
    {
        "Title":'kyrylivka',
        "addres":"с. Семенівка Пологівського району, вул. Дружби, 151",
        "email": "",
        "full_name": "Метеорологічна станція Кирилівка",
        "photo": 3
    },
    {
        "Title":'gulyaypole',
        "addres":"м. Гуляйполе, вул. Потайна, 16",
        "email": "msgulyaypole@meteo.gov.ua",
        "full_name": "Метеорологічна станція Гуляйполе",
        "photo": 1
    },
    {
        "Title":'botievye',
        "addres":"с. Ботієве Приазовського району, вул. Тараса Шевченка, 68",
        "email": "msbotievo@meteo.gov.ua",
        "full_name": "Метеорологічна станція Ботієве",
        "photo": 3
    },
    {
        "Title":'melitopol',
        "addres":"м. Мелітополь, вул. Вакуленчука, 99",
        "email": "msmelitopol@meteo.gov.ua",
        "full_name": "Метеорологічна станція  Мелітополь",
        "photo": 4
    },
    {
        "Title":'berdyansk',
        "addres":"м. Бердянськ, вул. Горького,6, територія  морського торговельного порту",
        "email": "msberdyansk@meteo.gov.ua",
        "full_name": "Морська гідрометеорологічна станція Бердянськ",
        "photo": 4
    }
]

var TimeGapsArray = [
    {
        Summer: "00",
        Winter: "02"
    },
    {
        Summer: "03",
        Winter: "05"
    },
    {
        Summer: "06",
        Winter: "08"
    },
    {
        Summer: "09",
        Winter: "11"
    },
    {
        Summer: "12",
        Winter: "14"
    },
    {
        Summer: "15",
        Winter: "17"
    },
    {
        Summer: "18",
        Winter: "20"
    },
    {
        Summer: "21",
        Winter: "23"
    }
]

function InitCityWeatrherTable(){
    var object = {
     "date": "20.10.2017"
    }
    var weather = {
       "temperature": "",
       "wind":"",
       "pressure": "",
       "DirectionWind":"",
       "phenomena": ""
    }
    const StationArr = [];
    const TimeGapsArr = [];
    for(var i=0; i<7; i++){
       StationArr.push(Station.GetIdStation(StationArray[i]['Title']));
    }
    for(var j=0; j<8; j++){
       TimeGapsArr.push(TimeGaps.GetIdTimeGaps(TimeGapsArray[j]['Summer']));
    }
    Promise.all(StationArr).then(res => {
       Promise.all(TimeGapsArr).then(respons => {
            for(var i=0;i< res.length; i++){
                object.StationID = res[i][0].id;
                for(var j=0;j<respons.length; j++){
                   object.TimeGapsId = respons[j][0].id;
                   object.Weather = weather;
                  WeatherTable.AddEntry(object);
                }
            }
       })
       .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

module.exports = {
    Init: function(){
        ClimateCharacteristic.Init(CharacteristicArr);
        ClimateRecords.Init(ClimateRecordObjArr)
        ClimateData.Init(ClimateDataObject)
        TimeGaps.Init(TimeGapsArray);
        Station.Init(StationArray);
        Regular_observable.Init(ObservArr);
        Email.Init(EmailArr);
        Chart.Init(chartArr);
        radionatioal.Init(radiotionalArr);
        DangerGydrolygy.Init({text: DangerGydrolygyText});
        DecadeBulletin.Init({Decad: decad});
        event.Init(events);
        meteorologPhenomena.Init(meteorologPhenomenaArr);
        waterTemperature.Init(waterObj);
        WeatherCity.Init(WeatherData)
        WeatherObservable.Init(WeatherObservableObj);
        InitCityWeatrherTable();
        setTimeout(() => {
            UserController.Init(UsersArray).then(data => console.log('Initial'))
        },5000)
    },
    UnInit: function(){
        ClimateCharacteristic.UnInit();
        ClimateRecords.UnInit();
        ClimateData.UnInit();
        TimeGaps.UnInit();
        Station.UnInit();
        UserController.UnInit();
        Regular_observable.UnInit();
        Email.UnInit();
        Chart.UnInit();
        radionatioal.UnInit();
        WeatherTable.UnInit();
        DangerGydrolygy.UnInit();
        DecadeBulletin.UnInit();
        event.UnInit();
        meteorologPhenomena.UnInit();
        waterTemperature.UnInit();
        WeatherCity.UnInit();
        WeatherObservable.UnInit();
        console.log('UnInited');
    },
    InitCityWeatrherTable: InitCityWeatrherTable
}
