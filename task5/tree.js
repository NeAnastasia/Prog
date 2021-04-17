window.addEventListener("DOMContentLoaded", function() {
    let data;
    let example;
    let tree = [];
    let classIndex, classCount, classes;

    class tree_element {
        constructor(value) {
            this.value = value;
            this.branches = {};
            this.leaf = 0; // 0 - узел, 1 - лист
            this.cl;
        }
    }

    function getData() {
        data = document.getElementById('vvod').value;
        data = data.split("\n");
        for (let ind = 0; ind < data.length; ind++) {
            data[ind] = data[ind].split(";");
        }
    }

    function getExample() {
        example = document.getElementById('vvod2').value;
        example = example.split(";");
    }

    function infoAtribute(index) {
        let atr = [];
        data.forEach(exp => {
            atr.push(exp[index])
        });

        // let unique = atr.filter((v, i, s) => s.indexOf(v) === s.lastIndexOf(v));
        let unique = Array.from(new Set(atr));
        return unique;
    }

    function aboutClass() {
        classIndex = data[0].length - 1;
        classes = infoAtribute(classIndex);
        classCount = classes.length;
    }

    function infoT(T) {
        let infoT = 0;
        classes.forEach(cl => {
            let count = 0;
            T.forEach(a => {
                if (a[classIndex] === cl) count++;
            });

            infoT += (count / T.length) * Math.log2(count / T.length)
        });
        infoT *= -1;
        return infoT;
    }

    function digitAtr(a, exp) {
        let infoFirst = infoT(exp);
        let gain = [];
        let atr = [];
        exp.forEach(pr => {
            atr.push(pr[a]);
        });
        atr.sort((a, b) => a - b);

        for (let i = 1; i < atr.length - 1; i++) {
            let THi = (atr[i] + atr[i + 1]) / 2;
            let less = [];
            let more = [];
            exp.forEach(pr => {
                if (parseFloat(pr[a]) < THi) {
                    less.push(pr);
                }
                else {
                    more.push(pr);
                }
            });

            let infoXT = (less.length / exp.length) * infoT(less);
            infoXT += (more.length / exp.length) * infoT(more);

            gain.push([infoFirst - infoXT, THi]);
        }

        let max = gain[0];
        gain.forEach(el => {
            if (parseFloat(el[0]) > parseFloat(max[0])) max = el;
        });

        return max; // значение инфы, пороговое значение
    }

    function chooseAtribute(exp) {
        let gain = [];
        let infoFirst = infoT(exp);

        for (let a = 0; a < classIndex; a++) {
            let infoXT = 0;
            let  atr = infoAtribute(a);

            if (atr[0][0] >= '0' && atr[0][0] <= '9') {
                gain.push(digitAtr(a, exp));
            }
            else {
                atr.forEach(vid => {
                    let Ti = [];
                    exp.forEach(pr => {
                        if (pr[a] === vid) Ti.push(pr);
                    });
    
                    infoXT += (Ti.length / exp.length) * infoT(Ti)
                });
    
                gain.push([infoFirst - infoXT]);
            }             
        }

        let choice = 0;
        for (let atr = 0; atr < gain.length; atr++) {
            if (parseFloat(gain[atr][0]) > parseFloat(gain[choice][0])) {
                choice = atr;
            }
        }

        choice = [choice];
        if (gain[choice].length == 2) {
            choice.push(gain[choice][1]);
        }
        return choice;
    }
    
    function branching(a) {
        let node = chooseAtribute(a);
        let knot = new tree_element(node[0]);
        if (node.length == 1) {
            let atribute = infoAtribute(node[0])

            atribute.forEach(vid => {
                let x = [];
                let cl = [];
                a.forEach(el => {
                    if (el[node[0]] == vid) {
                        x.push(el);
                        cl.push(el[classIndex]);
                    }
                });

                let unique = Array.from(new Set(cl));

                if (unique.length != 1) {
                    knot.branches[vid] = branching(x);
                }
                else {
                    let leaf = new tree_element();
                    leaf.leaf = 1;
                    leaf.cl = unique[0];
                    knot.branches[vid] = leaf;
                }
            });
        }
        // else {
        //     let x = [], y = [];
        //     let clx = [], cly = [];
        //     a.forEach(el => {
        //         if (el[node[0]] < node[1]) {
        //             x.push(el);
        //             clx.push(el[classIndex]);
        //         }
        //         else {
        //             y.push(el);
        //             cly.push(el[classIndex])
        //         }
        //     });

        //     let unique = clx.filter((v, i, s) => s.indexOf(v) === s.lastIndexOf(v));
        //     if (unique.length != 1) {
        //         branching(x);
        //     }
        //     let unique = clx.filter((v, i, s) => s.indexOf(v) === s.lastIndexOf(v));
        //     if (unique.length != 1) {
        //         branching(y);
        //     }
        // }

        tree.push(knot);
        return knot;
    }

    function search() {
        let pr = tree[tree.length - 1];

        while (pr.leaf != 1) {
            let next = example[pr.value];
            pr = pr.branches[next];
        }
        
        return pr.cl;
    }

    document.getElementById("start").addEventListener("click", function(e) {
        getData();
        aboutClass();
        branching(data);

        getExample();
        console.log(search(example));
    })

})