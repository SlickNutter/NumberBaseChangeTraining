angular.module('BaseChangeTraining', [])
    .controller('BaseChangeTrainingController', function () {
        let controller = this,
            max = 255,
            min = 0,
            numberOfExercises = 4;
        let getRandomInt = function () {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        let decToHex = function (dec) {
            return (dec).toString(16);
        };
        let decToBin = function (dec) {
            return (dec).toString(2);
        };
        controller.practiceArray = [];
        for (let i = numberOfExercises; i > 0; --i) {
            exercise = {};
            exercise.decimal = getRandomInt();
            exercise.hexadecimal = decToHex(exercise.decimal);
            exercise.hexadecimalAnswer = 0;
            exercise.binary = decToBin(exercise.decimal);
            exercise.binaryAnswer = 0;
            exercise.status = 'unanswered';

            controller.practiceArray.push(exercise);
        }
        controller.checkAnswers = function () {
            let length = controller.practiceArray.length;
            for (i = length - 1; i >= 0; --i) {
                let exercise = controller.practiceArray[i];
                if (exercise.hexadecimal == exercise.hexadecimalAnswer && exercise.binary == exercise.binaryAnswer) {
                    exercise.status = 'correct';
                } else {
                    exercise.status = 'wrong';
                }
            }
            console.log(controller.practiceArray);
        };
        controller.answerStatus = {unanswered: '', correct: 'success', wrong: 'warning'}
    })
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when("/base-change/training", {
            templateUrl: "/app/BaseChange/Training/training.html",
            controller: "BaseChangeTrainingController",
            controllerAs: "BCTraining"
        });
    }]);