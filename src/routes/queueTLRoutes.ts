import { Router } from 'express';
import { QueueTlClient } from '../databases/queueTL';
const queueTlClient = new QueueTlClient();

const router = Router();

var counter = 0

//@route    POST /simple-bank/queue-tl
//@desc     Add data of Queue TL
router.post('/queue', async (req, res, next) => {
    if (req)
        counter++
    try {
        await queueTlClient.addData(counter);
    } catch (error) {
        throw error;
    }

    res.json({
        success: 'Queue TL Added' + counter
    });
});

//@route    GET /simple-bank/queue-tl
//@desc     Get all queue data
router.get('/all-queueTl', async (req, res, next) => {
    let queue;
    try {
        queue = await queueTlClient.getData();
    } catch (error) {
        return next(error);
    }

    res.json(queue);
});

//@route    GET /simple-bank/queue-tl
//@desc     Get queue by Id
router.get('/queue/:id', async (req, res, next) => {
    const id = req.params.id;
    let queue;
    try {
        queue = await queueTlClient.getDataById(id)
    } catch (error) {
        return next(error);
    }

    res.json(queue);
});

//@route    DELETE /simple-bank/queue-tl
//@desc     Delete queue by id
router.delete('/queue/:id', async (req, res, next) => {
    const id = req.params.id;
    let queue;
    try {
        await queueTlClient.deleteDataById(id)
    } catch (error) {
        return next(error);
    }

    res.json({
        message: 'Queue TL ${id} deleted!',
    });
});

//@route    DELETE /simple-bank/queue-tl/
//@desc     delete all Queue TL
router.delete('/', async (req, res, next) => {
    let queue
    try {
        queue = await queueTlClient.deleteData()
    } catch (error) {
        return next(error)
    }
    res.json({ message: 'All queue deleted' })
})

export default router;