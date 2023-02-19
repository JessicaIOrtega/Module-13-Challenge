const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({ include: [{ model: Product }] })
    .then(categoryData => {
      res.json(categoryData)
    })
    .catch(err => {
      console.log(err)
      res.status(500)
    })

});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({ include: [{ model: Product }] })
    .then(categoryData => {
      res.json(categoryData)
    })
    .catch(err => {
      console.log(err)
      res.status(500)
    })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })
    .then(categoryData => {
      res.json(categoryData)
    })
    .catch(err => {
      console.log(err)
      res.status(500)
    })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: { id: req.params.id }
  }).then(categoryData => {
    if (!categoryData) {
      res.status(404).json({ message: 'No category with this id' })
    } else {
      res.json(categoryData)
    }
  })
    .catch(err => {
      console.log(err)
      res.status(500)
    })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: { id: req.params.id }
  }).then(categoryData => {
    if (!categoryData) {
      res.status(404).json({ message: 'No category with this id' })
    } else {
      res.json(categoryData)
    }
  })
    .catch(err => {
      console.log(err)
      res.status(500)
    })
});

module.exports = router;
