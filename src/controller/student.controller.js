const router = require("express").Router();
const Student = require("../model/student.model");

//create new users
router.post("/student_data", async (req, res) => {

    try {
        let { name, city, age, education, gender, contact } = req.body;
        const userStudent = new Student({
            name, city, age, education, gender, contact
        })
        
        userStudent.save();
        return res.status(200).send(userStudent)
    } catch (error) {
        return res.status(400).send({ error });
    }
})

//create new users
router.get("/studentlist", async (req, res) => {

    try {
        // const username = req.query.name;
        const page = +req.query.page || 1;
        const size = +req.query.size || 10;
        const offset = (page - 1) * size;

        const findStudentName = await Student
            .find()
            .lean()
            .exec();

        const totalUserCount = await Student.find().countDocuments();
        const totalPages = Math.ceil(totalUserCount / size);
        return res.status(200).send({ findStudentName, totalPages });
    } catch (error) {
        return res.status(400).send({ error });
    }
})


//sort student by name 
router.get("/studentlist/filter", async (req, res) => {
    try {
        const age = req.query.age
        const name = req.query.name


        if (age === "ascending_order") {
            const StudentAgeAscending = await Student
                .aggregate(
                    [
                        { $sort: { age: 1 } }
                    ]
                )
            return res.status(200).send({ StudentAgeAscending });
        }

        else if (age === "descending_order") {
            const StudentAgeDescending = await Student
                .aggregate(
                    [
                        { $sort: { age: -1 } }
                    ]
                )
            return res.status(200).send({ StudentAgeDescending });
        }

        else if (name === "descending_order") {
            const StudentNameDescending = await Student
                .aggregate(
                    [
                        { $sort: { name: -1 } }
                    ]
                )
            return res.status(200).send({ StudentNameDescending });
        }

        else if (name === "ascending_order") {
            const StudentNameAscending = await Student
                .aggregate(
                    [
                        { $sort: { name: 1 } }
                    ]
                )
            return res.status(200).send({ StudentNameAscending });
        }

    } catch (error) {
        return res.status(400).send({ error });
    }
})

//delete students 
router.delete("/studentlist/:id", async (req, res) => {
    try {
        const findStudentName = await Student
            .findByIdAndDelete(req.params.id)
        return res.status(200).send({ findStudentName });
    } catch (error) {
        return res.status(400).send({ error });
    }
})

//to find a individual users
router.get("/filter_name", async (req, res) => {
    const username = req.query.name;
    const page = +req.query.page || 1;
    const size = +req.query.size || 10;
    const offset = (page - 1) * size;

    const findStudentName = await Student
        .find({ name: username })
        .skip(offset)
        .limit(size)
        .lean()
        .exec();

    const totalUserCount = await Student.find().countDocuments();
    const totalPages = Math.ceil(totalUserCount / size);
    return res.status(200).send({ findStudentName, totalPages });

})

//to find age wise students
router.get("/filter_age", async (req, res) => {
    const userage = +req.query.age;
    const page = +req.query.page || 1;
    const size = +req.query.size || 10;
    const offset = (page - 1) * size;

    const findStudentAge = await Student.find({ age: userage })
        .skip(offset)
        .limit(size)
        .lean()
        .exec();

    const totalUserCount = await Student.find().countDocuments();
    const totalPages = Math.ceil(totalUserCount / size);
    return res.status(200).send({ findStudentAge, totalPages });
})

module.exports = router;