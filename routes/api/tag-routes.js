const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [{
      model: Product,
      as: 'product_id'
    }]
  })
    .then(tagData => {
      res.json(tagData)
    })
    .catch(err => {
      console.log(err)
      res.status(500)
    })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: { id: req.params.id },
    include: [{ model: Product }]
  })
    .then(tagData => {
      res.json(tagData)
    })
    .catch(err => {
      console.log(err)
      res.status(500)
    })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
    .then(tagData => {
      res.json(tagData)
    })
    .catch(err => {
      console.log(err)
      res.status(500)
    })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: { id: req.params.id }
  }).then(tagData => {
    if (!tagData) {
      res.status(404).json({ message: 'No tag with this id' })
    } else {
      res.json(tagData)
    }
  })
    .catch(err => {
      console.log(err)
      res.status(500)
    })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy(req.body, {
    where: { id: req.params.id }
  }).then(tagData => {
    if (!tagData) {
      res.status(404).json({ message: 'No tag with this id' })
    } else {
      res.json(tagData)
    }
  })
    .catch(err => {
      console.log(err)
      res.status(500)
    })
});

module.exports = router;