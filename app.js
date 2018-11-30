var LineToAdd = -1;

const app = new Vue({
    el: "#app",
    data: {
        linesOn: [false, false, false, false]//0-left, 1-top, 2-right...
    },
    methods: {
        addLine(i) {
            var isAdding = false;
            this.linesOn.forEach(function (item, index, array) {
                if (index === i) {
                    Vue.set(array, index, !array[index]);
                    if (array[index]) {
                        isAdding = true;
                    }
                } else {
                    array[index] = false;
                }
            });
            if (isAdding) {
                LineToAdd = i;
            } else {
                LineToAdd = -1;
            }
        }
    }
});