const router = require('express').Router();
const path = require('path');

router.get('/carousel/js', function (req, res) {
    res.sendFile(path.join(__dirname,'node_modules/bulma-extensions/bulma-carousel/dist/bulma-carousel.min.js'));
});

router.get('/carousel/css', function (req, res) {
    res.sendFile(path.join(__dirname,'node_modules/bulma-extensions/bulma-carousel/dist/bulma-carousel.min.css'));
});


module.exports = router;