const express = require('express');
const router = express.Router();
const messageController = require('../controllers/MessageController');
const taskController = require('../controllers/TaskController');
const eventController = require('../controllers/EventController');

// Rotas para mensagens
router.post('/telegram/webhook', messageController.processTelegramWebhook);
router.post('/whatsapp/webhook', messageController.processWhatsAppWebhook);
router.get('/messages', messageController.listMessages);

// Rotas para tarefas
router.post('/tasks', taskController.createTask);
router.get('/tasks', taskController.listTasks);
router.put('/tasks/:taskId', taskController.updateTask);
router.delete('/tasks/:taskId', taskController.deleteTask);

// Rotas para eventos
router.post('/events', eventController.createEvent);
router.get('/events', eventController.listEvents);
router.put('/events/:eventId', eventController.updateEvent);
router.delete('/events/:eventId', eventController.deleteEvent);

module.exports = router;
