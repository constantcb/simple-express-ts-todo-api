import { Router, Request, Response } from "express";
import { Task} from "../models/Task";
import { body,validationResult } from "express-validator";

const router = Router()
let tasks: Task[] = []

export default router

const taskValidationRules = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('completed').isBoolean().withMessage('Completed must be a boolean'),
]

router.post('/', taskValidationRules, async (req: Request, res: Response) => {
    const errs = validationResult(req)

    if(!errs.isEmpty){
        return res.status(400).json({errs : errs.array()})
    }

    const task: Task = {
        id: tasks.length + 1,
        title: req.body.title,
        description: req.body.description,
        completed: false
    }

    tasks.push(task)
    res.status(201).json(task)
})

router.get('/',async (req: Request, res: Response) => {
    res.json(tasks)
})

router.get('/:id', taskValidationRules,async (req:Request, res: Response) => {
    const errs = validationResult(req)
    if(!errs.isEmpty){
        return res.status(400).json({errs : errs.array()})
    }
    const task = tasks.find((t) => t.id === parseInt(req.params.id))

    if(!task){
        res.status(400).send('Task not found')
    }else{
        res.json(task)
    }

})

router.put('/:id',taskValidationRules, async (req: Request, res: Response) => {
    const errs = validationResult(req)
    if(!errs.isEmpty){
        return res.status(400).json({errs : errs.array()})
    }
    const task = tasks.find((t) => t.id === parseInt(req.params.id))

    if(!task){
        res.status(400).send('Task not found')
    }else{
        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.completed = req.body.completed || task.completed;

        res.json(task);
    }
})

router.delete('/:id', async (req: Request, res: Response) => {
    const index = tasks.findIndex((t) => t.id === parseInt(req.params.id))
    console.log("index " + index)
    if(index === -1){
        res.status(400).send('Task not found')
    }else{
        console.log(tasks)
        tasks.splice(index,1)
        res.status(204).send(tasks);
    }
})