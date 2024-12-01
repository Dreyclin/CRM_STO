const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const bcrypt = require('bcrypt')
const salt = 10;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
mongoose.connect("mongodb+srv://dreyclin:faqyou011103!@crmcluster.gqan7.mongodb.net/?retryWrites=true&w=majority&appName=CRMCluster")

const userSchema = mongoose.Schema({
    autoServiceId: String,
    email: String,
    password: String
})

const clientSchema = mongoose.Schema({
    name: String,
    phoneNumber: [String],
    car: {
        brand: String,
        model: String,
        number: String
    },
    personalDiscount: Number
})
const recordSchema = mongoose.Schema({
    clientName: String,
    clientId: String,
    car: String,
    carNumber: String,
    services: [{
        serviceName: String,
        cost: Number
    }],
    totalCost: {type: Number, default: 0},
    finalCost: Number,
    description: String,
    date: Date,
    duration: {
        from: Number,
        to: Number
    },
    status: String
})

const optionsSchema = mongoose.Schema({
    statusWorkOptions: {
        type: [String],
        default: ["Новый", "В работе", "Ждет клиента"]
    },
    servicesOptions: {
        type: [{
            service: String,
            cost: Number
        }],
        default: []
    }
})

const autoServiceSchema = mongoose.Schema({
    name: String,
    days: {
        type: [{
            dayDate: Date,
            records: [recordSchema],
        }],
        default: []
    },
    clients: {
        type: [clientSchema],
        default: []
    },
    options: {
        type: optionsSchema,
        default: {
            statusWorkOptions: ["Новый", "В работе", "Ждет клиента"],
            servicesOptions: []
        }
    }
})

const Option = mongoose.model("Option", optionsSchema)
const User = mongoose.model("User", userSchema);
const Record = mongoose.model("Record", recordSchema);
const Client = mongoose.model("Client", clientSchema);
const AutoService = mongoose.model("AutoService", autoServiceSchema);

app.get('/', (req, res) => {
    console.log("Hello!");
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        console.log(user);
        if (user === null || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Неверный логин/пароль или вы не зарегистрированы' });
        }
        const autoServiceId = user.autoServiceId;
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.json({ token, autoServiceId, user: { id: user._id, email: user.email } })
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

app.post('/checkAuth', async (req, res) => {
    let token;
    console.log('Authorization header:', req.headers.authorization);
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'Нет токена, авторизация отклонена' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        const user = await User.findById(req.user.id).select('-password');
        const { email, id } = user;
        res.json({ message: 'Доступ разрешен', user: { id: id, email: email } });
    } catch (err) {
        return res.status(401).json({ message: 'Неверный токен' });
    }
})

app.post('/reg', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email });

    if (user) {
        res.status(400).json({ message: "Пользователь уже существует!" })
    } else {
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = new User({
            email: email,
            password: hashedPass
        })

        await newUser.save()

        res.status(200).json({ message: "Пользователь успешно зарегистрирован" })
    }



})

app.post('/loadRecords', async (req, res) => {
    const autoServiceId = req.body.autoServiceId;
    try {
        const autoService = await AutoService.findOne({ _id: autoServiceId });
        if (autoService.days) {
            res.status(200).json(autoService.days);
        } else {
            res.status(200).json({ days: null });
        }
    } catch (error) {
        res.status(401).json({ message: "Ошибка на сервере" })
    }
})

app.post('/changeStatus', async (req, res) => {
    try {
        const autoServiceId = req.body.autoServiceId;
        const date = new Date(req.body.day);
        const recordId = req.body.recordId;
        const status = req.body.status;
        const autoService = await AutoService.findOne({_id: autoServiceId});
        if(autoService){
            const dayIndex = autoService.days.findIndex(day => new Date(day.dayDate).getTime() === date.getTime())
            console.log(dayIndex);
            if(dayIndex != -1){
                const record = autoService.days[dayIndex].records.id(recordId);
                if(record) {
                    record.status = status;
                    autoService.days[dayIndex].records = autoService.days[dayIndex].records.filter(r => r.status !== "Закрыт");
                    autoService.days = autoService.days.filter(day => day.records.length > 0);

                    autoService.save().then(() => {
                        res.status(200).json(autoService.days);
                    });
                } else {
                    res.status(400).json({message: "Запись не найдена!"});
                } 
            } else {
                res.status(400).json({message: "День не найден!"});
            }
        } else {
            res.status(400).json({message: "Автосервис не найден!"});
        }
    } catch (error) {
        res.status(401).json({message: "Ошибка на сервере"});
    }

})

app.post('/setService', async (req, res) => {
    try {
        const autoServiceId = req.body.autoServiceId;
        const date = new Date(req.body.day);
        const recordId = req.body.recordId;
    
        const autoService = await AutoService.findOne({ _id: autoServiceId });
        if (autoService) {
            const dayIndex = autoService.days.findIndex(day => new Date(day.dayDate).getTime() === date.getTime());
            if (dayIndex !== -1) {
                const record = autoService.days[dayIndex].records.id(recordId);
                if (record) {
                    const serviceDescription = `${req.body.service.serviceName} - ${req.body.service.cost}`;
                    record.description = record.description
                        ? `${record.description}\n${serviceDescription}`
                        : serviceDescription;

                    const currentTotalCost = record.totalCost || 0;
                    record.totalCost = currentTotalCost + req.body.service.cost;
                    
                    autoService.days[dayIndex].records = autoService.days[dayIndex].records.filter(r => r.status !== "Закрыт");
                    autoService.days = autoService.days.filter(day => day.records.length > 0);
                    await autoService.save();
                    res.status(200).json(autoService.days);
                } else {
                    res.status(400).json({ message: "Запись не найдена!" });
                }
            } else {
                res.status(400).json({ message: "День не найден!" });
            }
        } else {
            res.status(400).json({ message: "Автосервис не найден!" });
        }
    } catch (error) {
        res.status(401).json({ message: "Ошибка на сервере" });
    }
    });

app.post("/addRecord", async (req, res) => {
    try {
        const autoServiceId = req.body.autoServiceId;
        const client = req.body.client;
        const clientId = req.body.clientId;
        const car = req.body.car;
        const carNumber = req.body.carNumber;
        const description = req.body.description;
        const date = new Date(req.body.date);
        const { from, to } = req.body.duration;
        const status = req.body.status;
    
        const autoService = await AutoService.findOne({ _id: autoServiceId });
    
        const newRecord = new Record ({
            clientName: client,
            clientId: clientId,
            car: car,
            carNumber: carNumber,
            description: description,
            date: date,
            duration: {
                from: from,
                to: to
            },
            status: status
        })
    
        const dayIndex = autoService.days.findIndex(day => new Date(day.dayDate).getTime() === date.getTime());
        
        console.log(dayIndex);
    
        if(dayIndex != -1) {
            autoService.days[dayIndex].records.push(newRecord);
        } else {
            autoService.days.push({dayDate: new Date(date), records: newRecord}) 
        }
    
        autoService.days.sort((a, b) => new Date(a.dayDate).getTime() - new Date(b.dayDate).getTime());

        autoService.save().then(() => {
            res.status(200).json(autoService.days);
        });
    } catch (error) {
        res.status(500).json({message: "Ошибка на сервере!"})
    }
   
})

app.post("/loadClients", async(req, res) => {
    try {
        const autoServiceId =  req.body.autoServiceId;
        const autoService = await AutoService.findOne({_id: autoServiceId});
    
        if(autoService) {
            res.status(200).json(autoService.clients);
        } else {
            res.status(401).json({message: "Нет автосервиса"})
        }
    } catch (error) {
        res.status(500).json({message: "Ошибка на сервере"})
    }
})

app.post("/addClient", async(req, res) => {
    try {
        console.log(req.body);
        const autoServiceId = req.body.autoServiceId;
        const name = req.body.name;
        const brand = req.body.car.brand;
        const model = req.body.car.model;
        const numbers = req.body.car.number;
        const phoneNumbers = req.body.phoneNumber;
        const personalDiscount = req.body.personalDiscount;

        const autoService = await AutoService.findOne({_id: autoServiceId});

        if(autoService){
            const newClient = new Client({
                name: name,
                phoneNumber: phoneNumbers,
                car: {
                    brand: brand,
                    model: model,
                    number: numbers
                },
                personalDiscount: personalDiscount
            })
            autoService.clients.push(newClient);

            await autoService.save();
            res.status(200).json(autoService.clients);
        } else {
            res.status(401).json({message: "Автосервис не найден"})
        }
    } catch (error) {
        res.status(500).json({message: "Ошибка на сервере!"})
    }
})

app.post("/updateClient", async (req, res) => {
    try {
        const autoServiceId = req.body.autoServiceId;
        const clientId = req.body._id;
        console.log(autoServiceId, clientId);
        const name = req.body.name;
        const brand = req.body.car.brand;
        const model = req.body.car.model;
        const numbers = req.body.car.number;
        const phoneNumbers = req.body.phoneNumber;
        const personalDiscount = req.body.personalDiscount;
    
        const autoService = await AutoService.findOne({_id: autoServiceId});
    
        if(autoService){
            const client = await autoService.clients.id(clientId);
            if(client){
                client.name = name;
                client.phoneNumber = phoneNumbers;
                client.car = {
                    brand: brand,
                    model: model,
                    number: numbers
                };
                client.personalDiscount = personalDiscount;
        
                await autoService.save();
                res.status(200).json(autoService.clients);
            } else {
                res.status(401).json("Клиент не найден!");
            }
          
        } else {
            res.status(401).json({message: "Автосервис не найден"})
        }
    } catch (error) {
        res.status(500).json({message: "Ошибка на сервере!"})
    }
})

app.post('/loadOptions', async(req, res) => {
    try {
        const autoServiceId = req.body.autoServiceId
        const autoService = await AutoService.findOne({_id: autoServiceId})
        if(autoService){
            const options = await autoService.options;
            console.log(options);
            res.status(200).json(options);
        } else {
            res.status(401).json({message: "Автосервис не найден!"})
        }
    } catch (error) {
        res.status(500).json({message: "Ошибка на сервере!"})
    }
})

app.post('/addStatusRecord', async(req, res) => {
    try {
        const autoServiceId = req.body.autoServiceId;
        const newOption = req.body.status;
        const autoService = await AutoService.findOne({_id: autoServiceId})
    
        if(autoService){
            const statusWorkOptions = await autoService.options.statusWorkOptions;
    
            if(statusWorkOptions){
                statusWorkOptions.push(newOption);
    
                await autoService.save()
                res.status(200).json(autoService.options)
            } else {
                res.status(401).json({message: "Не найдено!"})
            }
        } else {
            res.status(401).json({message: "Автосервис не найден!"})
        }
    } catch (error) {
        res.status(500).json({message: "Ошибка на сервере"})
    }
   
})

app.post('/addService', async(req, res) => {
    // try {
        const autoServiceId = req.body.autoServiceId;
        const newService = {
            service: req.body.service.serviceName,
            cost: req.body.service.cost
        };
        const autoService = await AutoService.findOne({_id: autoServiceId})
    
        if(autoService){
            const serviceOptions = await autoService.options.servicesOptions;
            console.log(serviceOptions)
            if(serviceOptions){
                serviceOptions.push(newService);
    
                await autoService.save()
                res.status(200).json(autoService.options)
            } else {
                res.status(401).json({message: "Не найдено!"})
            }
        } else {
            res.status(401).json({message: "Автосервис не найден!"})
        }
    // } catch (error) {
    //     res.status(500).json({message: "Ошибка на сервере"})
    // }
})


app.post('/insertAutoservice/:name', async (req, res) => {
    try {
        const autoService = new AutoService({ name: req.params.name });
        await autoService.save();
        
        console.log("AutoService successfully added");
        res.status(201).json({ message: "AutoService successfully added", data: autoService });
    } catch (error) {
        console.error("Error adding AutoService:", error);
        res.status(500).json({ message: "Failed to add AutoService", error: error.message });
    }
});

app.listen(5000, (req, res) => {
    console.log("APP IS LISTENING ON PORT 5000");
})