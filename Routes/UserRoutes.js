const { Router } = require('express');
const router = Router();
const { getAllUsers, createUser, getUserById } = require('../Controllers/UserController');
const { getProfileByUserId, createProfileByUserId, updateProfileByUserId } = require('../Controllers/UserController');
const { getCoursesByUser } = require('../Controllers/EnrollementController');

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:id', getUserById);

router.post('/:userId/profile', createProfileByUserId);
router.get('/:userId/profile', getProfileByUserId);
router.put('/:userId/profile', updateProfileByUserId);

router.get('/:userId/courses', getCoursesByUser);

module.exports = router;
