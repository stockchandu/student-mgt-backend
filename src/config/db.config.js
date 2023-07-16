const mongoose = require("mongoose");
const databasConnect = () => {
    return mongoose.connect("mongodb+srv://general:96325896@cluster0.ekwij.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
};
module.exports = databasConnect;