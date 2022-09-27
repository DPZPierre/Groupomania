const postModel = require("../models/post");
const PostModel = require("../models/post");
const UserModel = require("../models/user");
const ObjectID = require("mongoose").Types.ObjectId;
const { uploadErrors } = require("../utils/errors");


exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  }).sort({ createdAt: -1 });
};


exports.createPost = async (req, res) => {
  let fileName;
  const newPost = new postModel({
    userId: req.body.userId,
    message: req.body.message,
    picture: req.file !== null ? "./uploads/posts/" + fileName : "",
    likers: [],
    comments: [],
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    const errors = uploadErrors(err)
    return res.status(400).send(errors);
  }
};


exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const updatedRecord = {
    message: req.body.message,
  };

  PostModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Update error : " + err);
    }
  );
};

exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
  });
};


exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      { new: true })
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));

    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(400).send(err);
    }
};


exports.disLikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));

    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id },
      },
      { new: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(400).send(err);
    }
};


exports.commentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(400).send(err);
    }
};


exports.editCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findById(req.params.id, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      if (!theComment) return res.status(404).send("Comment not found");
      theComment.text = req.body.text;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};


exports.deleteCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(400).send(err);
    }
};






// const Post = require('../models/post');
// const fs = require('fs');

// exports.createPost = (req, res, next) => {
//   const postObject = JSON.parse(req.body.post);
//   delete postObject._id;
//   delete postObject._userId;
//   const post = new Post({
//       ...postObject,
//       userId: req.auth.userId,
//       message: req.body.message,
//       imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
//       comments: [],
//   });

//   post.save()
//   .then(() => { res.status(201).json({message: 'Post enregistré !'})})
//   .catch(error => { res.status(400).json( { error })})
// };

// exports.getOnePost = (req, res, next) => {
//   Post.findOne({
//     _id: req.params.id
//   }).then(
//     (post) => {
//       res.status(200).json(post);
//     }
//   ).catch(
//     (error) => {
//       res.status(404).json({
//         error: error
//       });
//     }
//   );
// };

// exports.modifyPost = (req, res, next) => {
//   const postObject = req.file ? {
//       ...JSON.parse(req.body.post),
//       imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//   } : { ...req.body };

//   delete postObject._userId;
//   Post.findOne({_id: req.params.id})
//       .then((post) => {
//           if (post.userId != req.auth.userId) {
//               res.status(401).json({ message : 'Not authorized'});
//           } else {
//               Post.updateOne({ _id: req.params.id}, { ...postObject, _id: req.params.id})
//               .then(() => res.status(200).json({message : 'Post modifié!'}))
//               .catch(error => res.status(401).json({ error }));
//           }
//       })
//       .catch((error) => {
//           res.status(400).json({ error });
//       });
// };

// exports.deletePost = (req, res, next) => {
//   Post.findOne({ _id: req.params.id})
//       .then(post => {
//           if (post.userId != req.auth.userId) {
//               res.status(401).json({message: 'Not authorized'});
//           } else {
//               const filename = post.imageUrl.split('/images/')[1];
//               fs.unlink(`images/${filename}`, () => {
//                   Post.deleteOne({_id: req.params.id})
//                       .then(() => { res.status(200).json({message: 'Post supprimé !'})})
//                       .catch(error => res.status(401).json({ error }));
//               });
//           }
//       })
//       .catch( error => {
//           res.status(500).json({ error });
//       });
// };

// exports.getAllPosts = (req, res, next) => {
//   Post.find().then(
//     (posts) => {
//       res.status(200).json(posts);
//     }
//   ).catch(
//     (error) => {
//       res.status(400).json({
//         error: error
//       });
//     }
//   );
// };

// exports.likeAndDislikePost = (req, res, next) => {
//   const like = req.body.like;
//   const userId = req.body.userId;
//   const postId = req.params.id;
  
//   if (like === 1) {
//         Post.updateOne({ _id: postId }, { $push: { usersLiked: userId }, $inc: { likes: +1 }})
//           .then(() => res.status(200).json({ message: "Like mis à jour" }))
//           .catch((error) => res.status(400).json({ error }))
//   }

//   if (like === 0) {
//         Post.findOne({ _id: postId })
//            .then((post) => {
//             if (post.usersLiked.includes(userId)) { 
//               Post.updateOne({ _id: postId }, { $pull: { usersLiked: userId }, $inc: { likes: -1 }})
//                 .then(() => res.status(200).json({ message: "Like mis à jour" }))
//                 .catch((error) => res.status(400).json({ error }))
//             }
//             if (post.usersDisliked.includes(userId)) { 
//               Post.updateOne({ _id: postId }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 }})
//                 .then(() => res.status(200).json({ message: "Dislike mis à jour" }))
//                 .catch((error) => res.status(400).json({ error }))
//             }
//           })
//           .catch((error) => res.status(404).json({ error }))
//         }

//   if (like === -1) {
//         Post.updateOne({ _id: postId }, { $push: { usersDisliked: userId }, $inc: { dislikes: +1 }})
//           .then(() => { res.status(200).json({ message: "Dislike mis à jour" }) })
//           .catch((error) => res.status(400).json({ error }))
 
//   } 

// }
