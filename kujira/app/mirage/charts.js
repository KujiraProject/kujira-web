export {
    getOsdsChartData,
    getNodesChartData
};

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getApprovedColor(id) {
    var approvedColorsArray = ["#FF7F50", "#CD5C5C", "#F08080", "#E9967A", "#FA8072", "#FFA07A", "#FF4500", "#FF8C00", "#FFA500", "#FFD700"];
    return approvedColorsArray[id];
}

function getOsdsChartData() {
    return {
        data: [{
                "type": 'osdsChartData',
                "id": 0,
                "name": "up",
                "color": getApprovedColor(0),
                "value": getRandomNumber(1, 99),
            }, {
                "type": 'osdsChartData',
                "id": 1,
                "name": "in",
                "color": getApprovedColor(1),
                "value": getRandomNumber(1, 99),
            }, {
                "type": 'osdsChartData',
                "id": 2,
                "name": "down",
                "color": getApprovedColor(2),
                "value": getRandomNumber(1, 99),
            }, {
                "type": 'osdsChartData',
                "id": 3,
                "name": "out",
                "color": getApprovedColor(3),
                "value": getRandomNumber(1, 99),
            }, {
                "type": 'osdsChartData',
                "id": 4,
                "name": "test1",
                "color": getApprovedColor(4),
                "value": getRandomNumber(1, 99),
            }, {
                "type": 'osdsChartData',
                "id": 5,
                "name": "test2",
                "color": getApprovedColor(5),
                "value": getRandomNumber(1, 99),
            },

            {
                "type": 'osdsChartData',
                "id": 6,
                "name": "test3",
                "color": getApprovedColor(6),
                "value": getRandomNumber(1, 99),
            }
        ]
    };
}

function getNodesChartData() {
    return {
        data: [{
            "type": 'nodesChartData',
            "id": 0,
            "name": "up",
            "color": getApprovedColor(0),
            "value": getRandomNumber(1, 99),
        }, {
            "type": 'nodesChartData',
            "id": 1,
            "name": "in",
            "color": getApprovedColor(1),
            "value": getRandomNumber(1, 99),
        }, {
            "type": 'nodesChartData',
            "id": 2,
            "name": "down",
            "color": getApprovedColor(2),
            "value": getRandomNumber(1, 99),
        }, {
            "type": 'nodesChartData',
            "id": 3,
            "name": "out",
            "color": getApprovedColor(3),
            "value": getRandomNumber(1, 99),
        }]
    };
}
