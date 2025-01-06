import express from 'express';
import { tasksData } from './tasksData';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Get all tasks
router.get('/', (req, res) => {
    res.json(tasksData);
});

// Get task details by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const task = tasksData.tasks.find(task => task.id === id.toString());
    if (!task) {
        return res.status(404).json({ status: 404, message: 'Task not found' });
    }
    return res.status(200).json(task);
});

// Add a task
router.post('/', (req, res) => {
    const { title, description, deadline, priority, done } = req.body;

    // Validate required fields
    if (!title || !description || !deadline || !priority || typeof done === 'undefined') {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const newTask = {
        id: uuidv4(),
        title,
        description,
        deadline,
        priority,
        done,
        created_at: new Date().toISOString(), // Add created_at timestamp
        updated_at: new Date().toISOString()  // Add updated_at timestamp
    };

    tasksData.tasks.push(newTask); // Add the new task to the tasks array
    tasksData.total_results++; // Increment the total results counter

    res.status(201).json(newTask); // Respond with the created task
});

export default router;
