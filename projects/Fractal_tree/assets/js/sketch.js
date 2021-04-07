let tree = [];
let leaves = [];
let count = 0;
let strokeWeightVariable = 9;
let gravity;
let wind;

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    background(25);
    gravity = createVector(0, 0.2);
    let begin = createVector(width / 2, height);
    let end = createVector(width / 2, height - 250);
    tree.push(new Branch(begin, end, strokeWeightVariable));
}

function mouseClicked() {
    growTree();
}

function growTree() {
    if (strokeWeightVariable > 1) {
        for (let i = tree.length - 1; i >= 0; i--) {
            if (!tree[i].branched) {
                tree.push(tree[i].branch(1));
                tree.push(tree[i].branch(-1));
            }
            tree[i].branched = true;
        }
        count++;
        strokeWeightVariable -= 1;
    }
}

function draw() {
    background(25);
    let grow = true;
    tree.forEach(branch => {
        branch.update();
        branch.show();
        if (branch.grown && !branch.branched && !branch.leaf) {
            leaves.push(new Leaf(branch.end.copy()));
            branch.leaf = true;
        }else if (!branch.grown){
            grow = false;
        }
    });
    if(grow && leaves.length <= 0){
        growTree();
    }

    leaves.forEach(leaf => {
        leaf.update();
        leaf.show();
    });
    for (let i = leaves.length - 1; i >= 0; i--) {
        if (leaves[i].pos.y > height) {
            leaves.splice(i, 1);
        }
    }
}
