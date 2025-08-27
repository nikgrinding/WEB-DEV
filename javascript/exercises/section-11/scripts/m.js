function minMax(nums) {
    let min = null;
    let max = null;
    for (let i = 0; i < nums.length; i++) {
        if (!min || nums[i] < min) {
            min = nums[i];
        }
        if (!max || nums[i] > max) {
            max = nums[i];
        }
    }
    return {min, max};
}
console.log(minMax([]));
console.log(minMax([3]));