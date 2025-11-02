const User = require('../Models/User');
const asyncHandler = require('express-async-handler');
const Profile = require('../Models/Profile');

const getAllUsers = asyncHandler (async(req, res) => {
    const Users = await User.find();
    res.status(200).json(Users);
});

const createUser = asyncHandler(async(req,res)=>{
        const {username,email}=req.body;
        if(!username || !email ){
            res.status(400);
            throw new Error("Veuillez remplir tous les champs");
        }
        const user = await User.create({username,email});
        res.status(201).json({message:'User crée avec succés',user});

});

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).populate('courses');
    if (!user) {
        res.status(404);
        throw new Error('Utilisateur non trouvé');
    }
    res.status(200).json(user);
});

const createProfileByUserId = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { bio, website } = req.body;  // on n'utilise que les champs du schéma

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error('Utilisateur non trouvé');
  }

  const profileExist = await Profile.findOne({ user: userId });
  if (profileExist) {
    res.status(400);
    throw new Error('Le profil existe déjà pour cet utilisateur');
  }

  const profile = await Profile.create({ user: userId, bio, website });
  res.status(201).json({ message: 'Profil créé avec succès', profile });
});

const getProfileByUserId = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const profile = await Profile.findOne({ user: userId }).populate('user');
  if (!profile) {
    res.status(404);
    throw new Error('Profil non trouvé');
  }

  res.status(200).json(profile);
});

const updateProfileByUserId = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { bio, website } = req.body;  // on n'utilise que bio et website

  const profile = await Profile.findOneAndUpdate(
    { user: userId },
    { bio, website },
    { new: true, runValidators: true }
  );

  if (!profile) {
    res.status(404);
    throw new Error('Profil non trouvé');
  }

  res.status(200).json({ message: 'Profil mis à jour avec succès', profile });
});

module.exports = {getAllUsers,createUser,getUserById, createProfileByUserId, getProfileByUserId, updateProfileByUserId};