const mongo = require('mongodb');
const { ObjectId } = require('mongodb');

class EventRepository {

    constructor(collection) {
        this.collection = collection;
    }

    async findById(id) {
        const objectId = new ObjectId(id);
        const result = await this.collection.findOne({_id: objectId});
        return result;
    }

    async findAll() {
        const result = await this.collection.find({});
        return result.toArray();
    }

    async create(event) {
        await this.collection.insertOne(event);
        return event;
    }

    async update(id, data) {
        const objectId = new ObjectId(id);
        const result = await this.collection.updateOne({_id: objectId}, {$set: data});
        return result.modifiedCount === 1;
    }

    async delete(id) {
        const objectId = new ObjectId(id);
        const result = await this.collection.deleteOne({_id: objectId});
        return result.deletedCount === 1;
    }

    async deleteAll() {
        const result = await this.collection.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = EventRepository;