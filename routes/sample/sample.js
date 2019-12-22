const sample = {
    getSample: function (req, res) {
        res.send('----GET SAMPLE----');
    },
    samplePost: function (req, res) {
        res.json({
            status: 200,
            message: "Success"
        });
    }
};

module.exports = sample;