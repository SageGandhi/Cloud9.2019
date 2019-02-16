function BinarySearchTree() {
    function Node(key) {
        this.key = key;
        this.left = this.right = null;
    }
    this.rootNode = null;
    this.insert = function(key) {
        let nodeToInserted = new Node(key);
        if (!this.rootNode) {
            this.rootNode = nodeToInserted;
        }
        else {
            insertNewNode(this.rootNode, nodeToInserted);
        }
    }
    let insertNewNode = function(root, nodeToInserted) {
            if (nodeToInserted.key < root.key) {
                if (!root.left) {
                    root.left = nodeToInserted;
                }
                else {
                    insertNewNode(root.left, nodeToInserted);
                }
            }
            else {
                if (!root.right) {
                    root.right = nodeToInserted;
                }
                else {
                    insertNewNode(root.right, nodeToInserted);
                }
            }
        },
        inOrderTraverseNode = function(currentRootNode, visitorCallBack) {
            if (currentRootNode) {
                inOrderTraverseNode(currentRootNode.left, visitorCallBack);
                visitorCallBack(currentRootNode.key);
                inOrderTraverseNode(currentRootNode.right, visitorCallBack);
            }
        },
        preOrderTraverseNode = function(currentRootNode, visitorCallBack) {
            if (currentRootNode) {
                visitorCallBack(currentRootNode.key);
                preOrderTraverseNode(currentRootNode.left, visitorCallBack);
                preOrderTraverseNode(currentRootNode.right, visitorCallBack);
            }
        },
        postOrderTraverseNode = function(currentRootNode, visitorCallBack) {
            if (currentRootNode) {
                postOrderTraverseNode(currentRootNode.left, visitorCallBack);
                postOrderTraverseNode(currentRootNode.right, visitorCallBack);
                visitorCallBack(currentRootNode.key);
            }
        },
        minValueNode = function(root) {
            if (root.left) {
                return minValueNode(root.left);
            }
            return root;
        },
        maxValueNode = function(root) {
            if (root.right) {
                return maxValueNode(root.right);
            }
            return root;
        },
        searchNode = function(currentNode, key) {
            if (!currentNode) {
                return undefined;
            }
            else if (key > currentNode.key) {
                return searchNode(currentNode.right, key);
            }
            else if (key < currentNode.key) {
                return searchNode(currentNode.left, key);
            }
            else {
                return currentNode.key;
            }
        },
        removeNode = function(currentRootNode, key) {
            if (!currentRootNode) {
                console.log(`Value Not Found For Key: ${key}`);
                return null;
            }
            if (key > currentRootNode.key) {
                currentRootNode.right = removeNode(currentRootNode.right, key);
                return currentRootNode;
            }
            else if (key < currentRootNode.key) {
                currentRootNode.left = removeNode(currentRootNode.left, key);
                return currentRootNode;
            }
            else {
                if (currentRootNode.left === null && currentRootNode.right === null) {
                    /*currentRootNode = null;return currentRootNode;*/
                    return null; //Node  Without A Child Got Deleted
                    // removeNode[0011,0003]
                    // =>removeNode[0011.Left,0003]=>removeNode[0007,0003]=>0011.Left=0007,Return 0011
                    // =>removeNode[0007.Left,0003]=>removeNode[0005,0003]=>0007.Left=0005,Return 0007
                    // =>removeNode[0005.Left,0003]=>removeNode[0003,0003]=>0005.Left=Null,Return 0005
                    // =>removeNode[0003,0003]=>Return Null
                }
                if (currentRootNode.left === null) { //Single Right Child,Replace Parent With Right Child
                    currentRootNode = currentRootNode.right;
                    return currentRootNode;
                }
                else if (currentRootNode.right === null) { //Single Left Child,Replace Parent With Left Child
                    currentRootNode = currentRootNode.left;
                    return currentRootNode;
                }
                //Have Both Child,Find Minimum In Right Subtree,Swap This Node Value With Current Node
                //As This Value Will Be Less Than All Right SubTree Node But Greater Than All Left SubTree Nodes Due To Binary Search Tree Property
                //For Right SubTree,We Need To Remove Duplicate Least Number Node
                else {
                    let minValNode = minValueNode(currentRootNode.right);
                    currentRootNode.key = minValNode.key;
                    currentRootNode.right = removeNode(currentRootNode.right, minValNode.key);
                    return currentRootNode;
                }
            }
        };
    this.inOrderTraverse = function(visitorCallBack) {
        //Traverse In Order:Smallest To Largest:Sorting A Tree,Second Time Visit From Root
        inOrderTraverseNode(this.rootNode, visitorCallBack);
    }
    this.preOrderTraverse = function(visitorCallBack) {
        //First Time Visit From Root
        preOrderTraverseNode(this.rootNode, visitorCallBack);
    }
    this.postOrderTraverse = function(visitorCallBack) {
        //Last Time Visit From Root
        postOrderTraverseNode(this.rootNode, visitorCallBack);
    }
    this.minValue = function() {
        if (this.rootNode) {
            return minValueNode(this.rootNode).key;
        }
        return undefined;
    }
    this.maxValue = function() {
        if (this.rootNode) {
            return maxValueNode(this.rootNode).key;
        }
        return undefined;
    }
    this.search = function(key) {
        return searchNode(this.rootNode, key);
    }
    this.remove = function(key) {
        removeNode(this.rootNode, key);
    }
}
(function() {
    let binarySearchTree = new BinarySearchTree();
    [11, 7, 15, 5, 3, 9, 8, 10, 13, 12, 14, 20, 18, 25, 6].forEach(item => binarySearchTree.insert(item));
    /*[3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 20, 25]*/
    let inOrder = [],preOrder = [],postOrder = [];
    binarySearchTree.inOrderTraverse(function(item) { inOrder.push(item); });
    binarySearchTree.preOrderTraverse(function(item) { preOrder.push(item) });
    binarySearchTree.postOrderTraverse(function(item) { postOrder.push(item) });
    console.log(`InOrder=>${inOrder}/PreOrder=>${preOrder}/PostOrder=>${postOrder}`);

    console.log(`MinValue=>${binarySearchTree.minValue()},MaxValue=>${binarySearchTree.maxValue()}`);
    console.log(`Searching 25=>${binarySearchTree.search(25)},Searching 100=>${binarySearchTree.search(100)}`);
    binarySearchTree.remove(100); //Not Exist,No Change
    binarySearchTree.remove(3); //No Left & Right Child
    binarySearchTree.remove(5); //Only Right Child,No Left Child
    binarySearchTree.remove(10); //No Left & Right Child
    binarySearchTree.remove(9); //Only Left Child,No Right Child
    binarySearchTree.remove(11); //Root Removal,12 Will Be In Root
    
    inOrder = [];preOrder = [];postOrder = [];
    binarySearchTree.inOrderTraverse(function(item) { inOrder.push(item); });
    binarySearchTree.preOrderTraverse(function(item) { preOrder.push(item) });
    binarySearchTree.postOrderTraverse(function(item) { postOrder.push(item) });
    console.log(`InOrder=>${inOrder}/PreOrder=>${preOrder}/PostOrder=>${postOrder}`);
    //Page 195
}());
