angular.module('BaseChangeTraining', [])
    .controller('BaseChangeTrainingController', function () {
        let controller = this,
            max = 255,
            min = 0,
            numberOfExercises = 13;
        controller.practiceArray = [];
        controller.known = 'decimal';
        controller.current = 'decimal';
        let getRandomInt = function () {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        let decToHex = function (dec) {
            return (dec).toString(16);
        };
        let decToBin = function (dec) {
            return (dec).toString(2);
        };
        controller.createPracticeArray = function () {
            controller.known = controller.current;
            controller.practiceArray = [];
            for (let i = numberOfExercises; i > 0; --i) {
                exercise = {};
                exercise.decimal = getRandomInt();
                exercise.hexadecimal = decToHex(exercise.decimal);
                exercise.binary = decToBin(exercise.decimal);
                exercise.decimalAnswer = (controller.known === 'decimal' ? exercise.decimal : 0);
                exercise.hexadecimalAnswer = (controller.known === 'hexadecimal'? exercise.hexadecimal : 0);
                exercise.binaryAnswer = (controller.known === 'binary'? exercise.binary : 0);
                exercise.status = 'unanswered';
                controller.practiceArray.push(exercise);
            }
        };
        controller.createPracticeArray();
        controller.checkAnswers = function () {
            let length = controller.practiceArray.length;
            for (let i = length - 1; i >= 0; --i) {
                let exercise = controller.practiceArray[i];
                if (exercise.hexadecimal == exercise.hexadecimalAnswer && exercise.binary == exercise.binaryAnswer) {
                    exercise.status = 'correct';
                } else {
                    exercise.status = 'wrong';
                }
            }
        };
        controller.answerStatus = {
            unanswered: '',
            correct: 'success',
            wrong: 'danger'
        };
        controller.disable = function (base) {
            console.log(controller.known, base);
            return controller.known === base;
        };
    })
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when("/base-change/training", {
            templateUrl: "/app/BaseChange/Training/training.html",
            controller: "BaseChangeTrainingController",
            controllerAs: "BCTraining"
        });
    }]);