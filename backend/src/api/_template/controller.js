/**
    @author: Anthony D'Alesandro

    Methods available to the client.
*/

const Model = require("./model");

const Controller = {
    /** Function to create a single entry.
     *  @body: contains any {}
     */
    Create: async function (req, res) {
        const newEntry = new Model(req.body);
        const entry = await newEntry.save();
        res.status(200).json({message: "Created entry successfully.", entry});
    },

    /** Function to get a single entry.
     * @requires: req.params.id
     * */
    Get: async function (req, res) {
        if(!req.params.id) return res.status(400).json({message: "Must pass req.id as a parameter."});
        const entry = await Model.findOne({_id: req.params.id}).lean();
        if(!entry) return res.status(400).json({message: `Entry with id ${req.params.id} was not found.`});
        return res.status(200).json({message: `Got ${req.params.id} Successfully.`, entry})
    },

    /** Function to get all entries. */
    GetAll: async function (req, res){
        const entries = await Model.find().lean();
        res.status(200).json(entries);
    },

    /** Updates a single entry.
     * @requires: req.params.id
     * @body: contains any {data1,data2,data3}
     * */
    Update: async function (req, res) {
        const entry = await Model.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}).lean();
        if(!entry) return res.status(400).json({message: `Unknown entry: ${req.params.id}`});
        return res.status(200).json({message: `Updated entry successfully.`, entry})
    },

    /** Deletes a single entry.
     * @requires: req.params.id
     * */
    Delete: async function (req, res) {
        if(!req.params.id) return res.status(400).json({message: `Must pass an id`});
        const entry = await Model.findOneAndDelete({_id: req.params.id}).lean();
        if(!entry) return res.status(400).json({message: `Unknown entry: ${req.params.id}`});
        return res.status(202).json({message: `Deleted entry successfully.`, entry})
    },
}



module.exports = Controller