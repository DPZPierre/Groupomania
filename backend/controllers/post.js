const postModel = require("../models/post");
const PostModel = require("../models/post");
const UserModel = require("../models/user");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");

exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data : " + err);
  }).sort({ createdAt: -1 });
};

exports.createPost = async (req, res) => {
  const newPost = new postModel({
    userId: req.body.userId,
    message: req.body.message,
    picture: `http://localhost:3000/images/${
      req.file ? req.file.filename : ""
    }`,
    likers: [],
    comments: [],
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    console.log(err);
  }
};

exports.updatePost = async (req, res) => {
  let newPictureUrl;
  let post = await PostModel.findOne({ ObjectID: req.params.id });
  if (req.file) {
    newPictureUrl = `http://localhost:3000/images/${
      req.file ? req.file.filename : ""
    }`;

    if (post.picture) {
      const filename = post.picture.split("/images/")[1];
      return fs.unlink(`images/${filename}`, (error) => {
        if(error) console.log(error);
        PostModel.findByIdAndUpdate(
          req.params.id,
          { $set: { message: req.body.message, picture: newPictureUrl } },
          { new: true },
          (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Update error : " + err);
          }
        );
      });
    }
  }

  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  const updatedRecord = {
    message: req.body.message,
    picture: newPictureUrl,
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
  PostModel.findOne({ ObjectID: req.params.id })
    .then((post) => {
      if (!req.params.id) {
        res.status(401).send("Not authorized");
      } else {
        const filename = post.picture.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          PostModel.findByIdAndRemove(req.params.id)
            .then(() => {
              res.status(200).json({ message: "Your post has been deleted !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
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
      { new: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));

    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

exports.removeLikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));

    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id },
      },
      { new: true }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

exports.commentPost = (req, res) => {
  console.log(req.body)
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
            commenterEmail: req.body.email,
          },
        },
      },
      { new: true }
    )
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
      { new: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }));
  } catch (err) {
    return res.status(400).send(err);
  }
};
