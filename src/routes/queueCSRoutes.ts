import { Router } from 'express';
import { QueueCsClient } from '../databases/queueCS';
const queueCsClient = new QueueCsClient();

const router = Router();

var counter = 0

//@route    POST /simple-bank/queue-cs
//@desc     Add data of queue CS
router.post('/queue', async (req, res, next) => {
    if(req)
    counter++
    try {
        await queueCsClient.addData(counter);
    } catch (error) {
        throw error;
    }

    res.json({
        success: 'Queue CS Added'+counter
    });
});

//@route    GET /simple-bank/queue-cs
//@desc     Get all queue data
router.get('/all-queueCS', async (req, res, next) => {
    let queue;
    try {
        queue = await queueCsClient.getData();
    } catch (error) {
        return next(error);
    }

    res.json(queue);
});

//@route    GET /simple-bank/queue-cs
//@desc     Get queue by Id
router.get('/queue/:id', async (req, res, next) => {
    const id = req.params.id;
    let queue;
    try {
        queue = await queueCsClient.getDataById(id)
    } catch (error) {
        return next(error);
    }

    res.json(queue);
});

//@route    DELETE /simple-bank/queue-cs
//@desc     Delete queue by id
router.delete('/queue/:id', async (req, res, next) => {
    const id = req.params.id;
    let queue;
    try {
        await queueCsClient.deleteDataById(id)
    } catch (error) {
        return next(error);
    }

    res.json({
        message: 'Queue CS ${id} deleted!',
    });
});

//@route    DELETE /simple-bank/queue-cs/
//@desc     delete all queue CS
router.delete('/', async (req, res, next) => {
    let queue
    try {
        queue = await queueCsClient.deleteData()
    } catch (error) {
        return next(error)
    }
    res.json({ message: 'All queue deleted' })
})

export default router;