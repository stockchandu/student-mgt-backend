const router = require("express").Router();
const Contest = require("../model/contest.model");

//create new contest
router.post("/create_contest", async (req, res) => {

    try {
        const { title, deadline, type, tags, time, author } = req.body;
        const createContest = new Contest({
            title, deadline, type, tags, time, author
        });
        createContest.save();
        return res.status(200).send(createContest);
    }
    catch (error) {
        return res.status(400).send(error);
    }

})

//get all contest 
router.get("/get_all_contest", async (req, res) => {
    try {
        const page = +req.query.page || 1;
        const size = +req.query.size || 5;
        const type = req.query.type;
        const deadline = req.query.deadline;
        const search = req.query.search;
        const author = req.query.author;
        const title = req.query.title;
        const offset = (page - 1) * size;

        if (type) {
            const contestByType = await Contest
                .find({ type: { $eq: type } })
                .skip(offset)
                .limit(size)
                .lean()
                .exec();
            return res.status(200).send({ contestByType });
        }

        else if (deadline) {
            const contestByDeadline = await Contest
                .find({ deadline: { $eq: deadline } })
                .skip(offset)
                .limit(size)
                .lean()
                .exec();
            return res.status(200).send({ contestByDeadline });
        }

        else if (search) {
            const contestBySearch = await Contest
                .find({ title: search })
                .skip(offset)
                .limit(size)
                .lean()
                .exec();
            return res.status(200).send({ contestBySearch });
        }

        else if (author) {
            const contestByAuthor = await Contest
                .find({ author: author })
                .skip(offset)
                .limit(size)
                .lean()
                .exec();
            return res.status(200).send({ contestByAuthor });
        }
        else if (title) {
            const contestByTitle = await Contest
                .find({ title: { $eq: title } })
                .skip(offset)
                .limit(size)
                .lean()
                .exec();
            return res.status(200).send({ contestByTitle });
        }

        else {
            const allContest = await Contest
                .find()
                .skip(offset)
                .limit(size)
                .lean()
                .exec();

            const totalDocuments = await Contest.find().countDocuments();
            const totalPage = Math.ceil(totalDocuments / size);

            return res.status(200).send({ allContest, totalPage });

        }


    } catch (error) {
        return res.status(400).send({ error });
    }

})

//delete contest 
router.delete("/contest/:id", async (req, res) => {
    try {
        const deleteContest = await Contest
            .findByIdAndDelete(req.params.id)
        return res.status(200).send({ deleteContest });
    } catch (error) {
        return res.status(400).send({ error });
    }
})

//contest filter by type and deadline
// router.get("/filter_contest", async (req, res) => {

//     try {
//         const type = req.query.type;
//         const deadline = req.query.deadline;

//         if (type === "DSA" || type === "dsa") {
//             const contestByType = await Contest
//                 .find({ type: { $eq: type } })
//                 .lean()
//                 .exec();
//             return res.status(200).send({ contestByType });
//         }

//         else {
//             const contestByDeadline = await Contest
//                 .find({ deadline: { $eq: deadline } })
//                 .lean()
//                 .exec();
//             return res.status(200).send({ contestByDeadline });
//         }
//     }
//     catch (error) {
//         return res.status(400).send({ error });
//     }
// })




module.exports = router;