var LineToAdd = -1;
var ActionNow = null;

const app = new Vue({
    el: "#app",
    data: {
        linesOn: [false, false, false, false, false, false, false, false, false, false, false, false]
    },
    methods: {
        addLine(i) {
            ActionNow = null;
            PointerRemove.x = -50;
            PointerRemove.y = -50;
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
        },
        clearLineButtons() {
            for (var i = 0; i < this.linesOn.length; i++) {
                Vue.set(this.linesOn, i, false);
            }
        },
        actionRemove() {
            LineToAdd = -1;
            this.clearLineButtons();
            ActionNow = "remove";
        }
    }
});