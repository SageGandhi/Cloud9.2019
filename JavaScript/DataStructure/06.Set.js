function Set() {
    this.items = {};
    this.add = function(value) {
        if (!this.has(value)) {
            this.items[value] = value;
            return true;
        }
        return false;
    }
    this.delete = function(value) {
        if (this.has(value)) {
            delete this.items[value];
            return true;
        }
        return false;
    }
    this.has = function(value) {
        /*return value in this.items;*/
        return this.items.hasOwnProperty(value);
    }
    this.clear = function() {
        this.items = {};
    }
    this.size = function() {
        /*return Object.keys(this.items).length;*/
        let keys = 0;
        for (let key in this.items) {
            if (this.items.hasOwnProperty(key)) {
                keys++;
            }
        }
        return keys;
    }
    this.values = function() {
        let values = [];
        for (let key in this.items) {
            if (this.items.hasOwnProperty(key)) {
                values.push(this.items[key]);
            }
        }
        return values;
    }
    this.union = function(other) {
        let unionSet = new Set(),
            selfVals = this.values(),
            otherVals = other.values();
        for (let thisIndx = 0; thisIndx < selfVals.length; thisIndx++) unionSet.add(selfVals[thisIndx]);
        for (let otherIndx = 0; otherIndx < otherVals.length; otherIndx++) unionSet.add(otherVals[otherIndx]);
        return unionSet;
    }
    this.intersection = function(otherSet) {
        let intersectionSet = new Set(),
            selfVals = this.values();
        for (let thisIndx = 0; thisIndx < selfVals.length; thisIndx++) {
            if (otherSet.has(selfVals[thisIndx])) {
                intersectionSet.add(selfVals[thisIndx]);
            }
        }
        return intersectionSet;
    }
    this.difference = function(otherSet) {
        let differenceSet = new Set(),
            selfVals = this.values();
        for (let thisIndx = 0; thisIndx < selfVals.length; thisIndx++) {
            if (!otherSet.has(selfVals[thisIndx])) {
                differenceSet.add(selfVals[thisIndx]);
            }
        }
        return differenceSet;
    }
    this.isSubset = function(otherSet) {
        let selfVals = this.values();
        if (this.size() > otherSet.size()) return false;
        for (let thisIndx = 0; thisIndx < selfVals.length; thisIndx++) {
            if (!otherSet.has(selfVals[thisIndx])) {
                return false;
            }
        }
        return true;
    }
}
